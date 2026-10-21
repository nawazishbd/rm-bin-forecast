/* ============================================================
   RM Bin Forecast · Firebase configuration
   ------------------------------------------------------------
   Paste the values from your Firebase project here.

   Where to find them:
     Firebase Console → Project settings (gear icon) →
     "Your apps" → the web app (</>) → "SDK setup and configuration"
     → Config → copy the object.

   IMPORTANT: keep the quotes, replace only the text between them.
   This file is safe to publish — these keys identify the project,
   they do not grant access. Firestore security rules do the guarding.
   ============================================================ */

window.FIREBASE_CONFIG = {
  apiKey:            "PASTE_API_KEY",
  authDomain:        "PASTE_PROJECT_ID.firebaseapp.com",
  projectId:         "PASTE_PROJECT_ID",
  storageBucket:     "PASTE_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "PASTE_SENDER_ID",
  appId:             "PASTE_APP_ID"
};

/* Optional extras you can set later (not required to start) */
window.RMF_OPTIONS = {
  /* Show the "Photo of formulation" upload in the Formulas tab.
     Needs Cloud Functions on the Blaze plan — leave false for now. */
  photoUpload: false
};
