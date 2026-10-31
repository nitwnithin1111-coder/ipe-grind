// Cloud Firestore Database & Sync Engine for IPE Grind
// Provides seamless bi-directional synchronization, offline tolerance, and personalized recommendations
window.IPE_DB = (function() {
  let db = null;
  let unsubscribeSnapshot = null;
  let saveDebounceTimer = null;
  let isSyncing = false;

  function init() {
    if (typeof firebase === 'undefined' || !window.isFirebaseConfigured || !window.isFirebaseConfigured()) {
      return;
    }
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(window.FIREBASE_CONFIG);
      }
      db = firebase.firestore();
      // Enable offline persistence for Firestore if supported
      db.enablePersistence({ synchronizeTabs: true }).catch(err => {
        if (err.code === 'failed-precondition' || err.code === 'unimplemented') {
          // Normal for multiple tabs or unsupported browsers
          console.log('Firestore persistence skipped:', err.code);
        }
      });
    } catch (e) {
      console.warn('Firestore init warning:', e);
    }
  }

  // Called when user logs in with Google
  async function syncOnLogin(user) {
    if (!db || !user || user.isGuest) return;

    try {
      isSyncing = true;
      const userRef = db.collection('users').doc(user.uid);
      const doc = await userRef.get();

      const localMastered = Array.from(window.IPE_STORAGE.getMastered());
      const localRevise = Array.from(window.IPE_STORAGE.getRevise());
      const localBookmarks = Array.from(window.IPE_STORAGE.getBookmarks());
      const localXP = window.IPE_STORAGE.getXP();
      const localStreak = window.IPE_STORAGE.getStreakData();
      const localBadges = Array.from(window.IPE_STORAGE.getBadges());
      const localUser = window.IPE_STORAGE.getUser();

      if (doc.exists) {
        const remote = doc.data() || {};
        const remoteProgress = remote.progress || {};

        // Merge Mastered sets
        const mergedMastered = Array.from(new Set([...(remoteProgress.mastered || []), ...localMastered]));
        // Merge Revise sets
        const mergedRevise = Array.from(new Set([...(remoteProgress.revise || []), ...localRevise]));
        // Merge Bookmarks
        const mergedBookmarks = Array.from(new Set([...(remoteProgress.bookmarks || []), ...localBookmarks]));
        // Merge Badges
        const mergedBadges = Array.from(new Set([...(remoteProgress.badges || []), ...localBadges]));
        // Merge XP (take highest)
        const mergedXP = Math.max(Number(remoteProgress.xp || 0), Number(localXP || 0));
        // Merge Streaks
        const remoteStreak = remoteProgress.streak || {};
        const mergedStreak = {
          current: Math.max(remoteStreak.current || 1, localStreak.current || 1),
          highest: Math.max(remoteStreak.highest || 1, localStreak.highest || 1),
          lastDate: remoteStreak.lastDate || localStreak.lastDate
        };

        // Write merged back to local storage
        localStorage.setItem('ipe_mastered_ids', JSON.stringify(mergedMastered));
        localStorage.setItem('ipe_revise_ids', JSON.stringify(mergedRevise));
        localStorage.setItem('ipe_bookmark_ids', JSON.stringify(mergedBookmarks));
        localStorage.setItem('ipe_unlocked_badges', JSON.stringify(mergedBadges));
        localStorage.setItem('ipe_total_xp', JSON.stringify(mergedXP));
        localStorage.setItem('ipe_streak_data', JSON.stringify(mergedStreak));

        // Update Firestore with combined master document
        await userRef.set({
          profile: {
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
            targetAim: localUser.targetAim || remote.profile?.targetAim || '60/60 Topper',
            lastActive: firebase.firestore.FieldValue.serverTimestamp()
          },
          progress: {
            mastered: mergedMastered,
            revise: mergedRevise,
            bookmarks: mergedBookmarks,
            badges: mergedBadges,
            xp: mergedXP,
            streak: mergedStreak,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }
        }, { merge: true });

      } else {
        // Initial setup for first-time user: upload existing local progress
        await userRef.set({
          profile: {
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
            targetAim: localUser.targetAim || '60/60 Topper',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastActive: firebase.firestore.FieldValue.serverTimestamp()
          },
          progress: {
            mastered: localMastered,
            revise: localRevise,
            bookmarks: localBookmarks,
            badges: localBadges,
            xp: localXP,
            streak: localStreak,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }
        });
      }

      // Attach real-time listener for cross-device updates
      attachListener(user.uid);

      // Refresh app view
      if (window.IPE_APP && window.IPE_APP.updateStatsUI) {
        window.IPE_APP.updateStatsUI();
      }
      if (window.IPE_FEED && window.IPE_FEED.renderVirtualFeed) {
        window.IPE_FEED.renderVirtualFeed();
      }

    } catch (e) {
      console.error('Error during Firestore syncOnLogin:', e);
    } finally {
      isSyncing = false;
    }
  }

  function attachListener(uid) {
    if (unsubscribeSnapshot) unsubscribeSnapshot();
    if (!db || !uid) return;

    unsubscribeSnapshot = db.collection('users').doc(uid).onSnapshot((doc) => {
      if (isSyncing || !doc.exists) return;
      const data = doc.data();
      if (!data || !data.progress) return;

      const progress = data.progress;
      if (progress.mastered) localStorage.setItem('ipe_mastered_ids', JSON.stringify(progress.mastered));
      if (progress.revise) localStorage.setItem('ipe_revise_ids', JSON.stringify(progress.revise));
      if (progress.bookmarks) localStorage.setItem('ipe_bookmark_ids', JSON.stringify(progress.bookmarks));
      if (progress.badges) localStorage.setItem('ipe_unlocked_badges', JSON.stringify(progress.badges));
      if (progress.xp !== undefined) localStorage.setItem('ipe_total_xp', JSON.stringify(progress.xp));
      if (progress.streak) localStorage.setItem('ipe_streak_data', JSON.stringify(progress.streak));

      if (window.IPE_APP && window.IPE_APP.updateStatsUI) {
        window.IPE_APP.updateStatsUI();
      }
    }, err => {
      console.warn('Firestore snapshot listener error:', err);
    });
  }

  // Debounced push to cloud whenever student answers, bookmarks, or earns XP
  function triggerSave() {
    if (!db) return;
    const user = window.IPE_AUTH ? window.IPE_AUTH.getUser() : null;
    if (!user || user.isGuest) return;

    if (saveDebounceTimer) clearTimeout(saveDebounceTimer);
    saveDebounceTimer = setTimeout(async () => {
      try {
        const userRef = db.collection('users').doc(user.uid);
        await userRef.set({
          profile: {
            name: user.name,
            targetAim: window.IPE_STORAGE.getUser().targetAim || '60/60 Topper',
            lastActive: firebase.firestore.FieldValue.serverTimestamp()
          },
          progress: {
            mastered: Array.from(window.IPE_STORAGE.getMastered()),
            revise: Array.from(window.IPE_STORAGE.getRevise()),
            bookmarks: Array.from(window.IPE_STORAGE.getBookmarks()),
            badges: Array.from(window.IPE_STORAGE.getBadges()),
            xp: window.IPE_STORAGE.getXP(),
            streak: window.IPE_STORAGE.getStreakData(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }
        }, { merge: true });
      } catch (err) {
        console.warn('Debounced Firestore save warning:', err);
      }
    }, 1500);
  }

  // Personalized Intelligence & Weak Area Identification
  function getPersonalizationInsights() {
    const mastered = window.IPE_STORAGE.getMastered();
    const revise = window.IPE_STORAGE.getRevise();
    const bookmarks = window.IPE_STORAGE.getBookmarks();
    const allChapters = window.IPE_DATA ? window.IPE_DATA.chapters : {};

    const chapterStats = [];

    for (const chId in allChapters) {
      const ch = allChapters[chId];
      if (!ch || !ch.questions) continue;

      let chMastered = 0;
      let chRevise = 0;

      ch.questions.forEach(q => {
        if (mastered.has(q.id)) chMastered++;
        if (revise.has(q.id)) chRevise++;
      });

      const total = ch.questions.length;
      const pct = total > 0 ? Math.round((chMastered / total) * 100) : 0;

      chapterStats.push({
        id: chId,
        title: ch.title,
        subject: ch.subject,
        weightage: ch.weightageMarks || 4,
        total,
        mastered: chMastered,
        revise: chRevise,
        percent: pct,
        isWeak: chRevise > 0 || (pct < 30 && total > 0)
      });
    }

    // Sort weak chapters by priority: high weightage + high revise count
    const weakChapters = chapterStats
      .filter(c => c.isWeak)
      .sort((a, b) => (b.revise * 2 + b.weightage) - (a.revise * 2 + a.weightage))
      .slice(0, 4);

    // Guaranteed LAQ Focus recommendations (TSBIE high yield 8M)
    const laqChapters = chapterStats
      .filter(c => ['phy-ch01', 'phy-ch06', 'phy-ch14', 'chem-ch07', 'chem-ch11', 'chem-ch03'].includes(c.id));

    return {
      weakChapters,
      laqChapters,
      totalMastered: mastered.size,
      totalRevise: revise.size,
      totalBookmarks: bookmarks.size
    };
  }

  return {
    init,
    syncOnLogin,
    triggerSave,
    getPersonalizationInsights
  };
})();
