// Firebase Configuration for IPE Grind
// To enable Google Login & Cloud Firestore Sync across devices:
// 1. Create a free project at https://console.firebase.google.com
// 2. Enable 'Authentication' -> 'Google' sign-in provider
// 3. Enable 'Cloud Firestore' database
// 4. Copy your Web App config object below:

window.FIREBASE_CONFIG = window.FIREBASE_CONFIG || {
  apiKey: "AIzaSy_YOUR_API_KEY_HERE",
  authDomain: "ipe-grind-app.firebaseapp.com",
  projectId: "ipe-grind-app",
  storageBucket: "ipe-grind-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Check if Firebase config is customized (not default placeholder)
window.isFirebaseConfigured = function() {
  return window.FIREBASE_CONFIG && 
         window.FIREBASE_CONFIG.apiKey && 
         !window.FIREBASE_CONFIG.apiKey.includes('YOUR_API_KEY');
};
