// Google Authentication & User Personalization Module for IPE Grind
// Integrates Firebase Auth with automatic local-storage fallback
window.IPE_AUTH = (function() {
  let currentUser = null;
  let authInitialized = false;

  function init() {
    if (typeof firebase === 'undefined' || !window.isFirebaseConfigured || !window.isFirebaseConfigured()) {
      console.log('IPE Auth: Running in Offline / Local Guest mode (Firebase not configured).');
      loadLocalUser();
      updateAuthUI();
      return;
    }

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(window.FIREBASE_CONFIG);
      }

      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .catch(err => console.warn('Persistence warning:', err));

      firebase.auth().onAuthStateChanged((user) => {
        authInitialized = true;
        if (user) {
          currentUser = {
            uid: user.uid,
            name: user.displayName || 'Board Aspirant',
            email: user.email || '',
            photoURL: user.photoURL || '',
            isGuest: false,
            lastLogin: Date.now()
          };

          // Save current user locally as cache
          window.IPE_STORAGE.setUser({
            name: currentUser.name,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            targetAim: window.IPE_STORAGE.getUser().targetAim || '60/60 Topper',
            isGuest: false,
            uid: currentUser.uid
          });

          // Trigger Firestore sync if DB module is ready
          if (window.IPE_DB && window.IPE_DB.syncOnLogin) {
            window.IPE_DB.syncOnLogin(currentUser);
          }

          if (window.IPE_GAME && window.IPE_GAME.showXPToast) {
            window.IPE_GAME.showXPToast(20, `Welcome back, ${currentUser.name.split(' ')[0]}! 🌟`);
          }
        } else {
          loadLocalUser();
        }
        updateAuthUI();
      });

    } catch (e) {
      console.error('Firebase Auth initialization error:', e);
      loadLocalUser();
      updateAuthUI();
    }
  }

  function loadLocalUser() {
    const saved = window.IPE_STORAGE.getUser();
    currentUser = {
      uid: saved.uid || 'guest_local',
      name: saved.name || 'Guest Aspirant',
      email: saved.email || '',
      photoURL: saved.photoURL || '',
      targetAim: saved.targetAim || '60/60 Topper',
      isGuest: true
    };
  }

  async function signInWithGoogle() {
    if (typeof firebase === 'undefined' || !window.isFirebaseConfigured || !window.isFirebaseConfigured()) {
      alert("Firebase is not yet configured for Google Login.\n\nTo enable cloud sync:\n1. Open js/firebase-config.js\n2. Paste your free Firebase web credentials from console.firebase.google.com\n\nYour progress is currently saved 100% securely on this device!");
      return;
    }

    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      provider.setCustomParameters({ prompt: 'select_account' });

      // Show temporary signing-in status
      const authBtn = document.getElementById('google-signin-btn');
      if (authBtn) {
        authBtn.innerHTML = '<span class="loading-spinner"></span> Connecting Google...';
        authBtn.disabled = true;
      }

      const result = await firebase.auth().signInWithPopup(provider);
      console.log('Google Sign-In successful:', result.user.displayName);

    } catch (err) {
      console.error('Google Sign-In error:', err);
      if (err.code === 'auth/popup-blocked') {
        // Fallback to redirect
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          await firebase.auth().signInWithRedirect(provider);
        } catch (redirErr) {
          alert('Popup was blocked by your browser. Please allow popups or try again.');
        }
      } else if (err.code === 'auth/unauthorized-domain') {
        alert('This domain is not authorized in your Firebase Console. Go to Firebase Console -> Authentication -> Settings -> Authorized Domains and add your current host (e.g. localhost or your vercel.app domain).');
      } else {
        alert('Sign-In Error: ' + (err.message || 'Could not complete Google Sign-In.'));
      }
      updateAuthUI();
    }
  }

  async function signOut() {
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
      try {
        await firebase.auth().signOut();
      } catch (e) {
        console.warn('Sign-out error:', e);
      }
    }
    window.IPE_STORAGE.logoutUser();
    loadLocalUser();
    updateAuthUI();
    if (window.IPE_GAME && window.IPE_GAME.showXPToast) {
      window.IPE_GAME.showXPToast(0, 'Logged out successfully. Running in guest mode.');
    }
  }

  function updateAuthUI() {
    const user = getUser();
    
    // Header Avatar / Name
    const headerUserBtn = document.getElementById('header-user-btn');
    const headerUserName = document.getElementById('header-user-name');
    const headerProfileBtn = document.getElementById('header-profile-btn');
    
    if (headerUserName) {
      headerUserName.textContent = user.isGuest ? 'Guest' : user.name.split(' ')[0];
    }

    if (headerProfileBtn) {
      if (!user.isGuest && user.photoURL) {
        headerProfileBtn.innerHTML = `<img src="${user.photoURL}" alt="${user.name}" class="header-user-avatar" style="width:24px; height:24px; border-radius:50%; object-fit:cover; border:1.5px solid var(--accent);" />`;
      } else {
        headerProfileBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        `;
      }
    }

    // Profile Modal elements
    const authStatusNote = document.getElementById('auth-status-note');
    const nameInput = document.getElementById('auth-input-name');
    const aimSelect = document.getElementById('auth-select-aim');
    const googleBtnContainer = document.getElementById('auth-google-btn-container');

    if (nameInput) nameInput.value = user.name || '';
    if (aimSelect && user.targetAim) aimSelect.value = user.targetAim;

    if (authStatusNote) {
      if (user.isGuest) {
        authStatusNote.innerHTML = `
          <div class="auth-guest-banner">
            <div class="auth-guest-icon">👤</div>
            <div class="auth-guest-text">
              <strong>Guest Mode</strong> • Progress saved locally on this browser.
              <div class="auth-guest-sub">Sign in with Google to sync across phone, tablet & laptop!</div>
            </div>
          </div>
        `;
      } else {
        authStatusNote.innerHTML = `
          <div class="auth-signed-in-card">
            ${user.photoURL ? `<img src="${user.photoURL}" class="auth-signed-avatar" alt="${user.name}">` : `<div class="auth-signed-avatar-fallback">🎓</div>`}
            <div class="auth-signed-info">
              <div class="auth-signed-name">${user.name} <span class="auth-cloud-badge">☁️ Cloud Synced</span></div>
              <div class="auth-signed-email">${user.email}</div>
            </div>
            <button class="auth-signout-btn" onclick="window.IPE_AUTH.signOut()" title="Log out">Sign Out</button>
          </div>
        `;
      }
    }

    if (googleBtnContainer) {
      if (user.isGuest) {
        googleBtnContainer.style.display = 'block';
        googleBtnContainer.innerHTML = `
          <button type="button" class="btn-google-signin" id="google-signin-btn" onclick="window.IPE_AUTH.signInWithGoogle()">
            <svg class="google-svg-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        `;
      } else {
        googleBtnContainer.style.display = 'none';
      }
    }
  }

  function getUser() {
    if (!currentUser) loadLocalUser();
    return currentUser;
  }

  return {
    init,
    signInWithGoogle,
    signOut,
    getUser,
    updateAuthUI
  };
})();
