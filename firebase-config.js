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
  apiKey:            "AIzaSyAVzYHUMeBEqA7Call1w8WljwIXm563PgM",
  authDomain:        "rm-bin-forecast.firebaseapp.com",
  projectId:         "rm-bin-forecast",
  storageBucket:     "rm-bin-forecast.firebasestorage.app",
  messagingSenderId: "847083972592",
  appId:             "1:847083972592:web:b25968561706e97e339f35"
};

/* Optional extras you can set later (not required to start) */
window.RMF_OPTIONS = {
  /* Show the "Photo of formulation" upload in the Formulas tab.
     Needs Cloud Functions on the Blaze plan — leave false for now. */
  photoUpload: false
};
