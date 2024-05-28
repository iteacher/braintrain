/* global firebase */
/*
Security Note: Firebase configuration does not contain any sensitive information.
The actual authentication is handled by Firebase's servers.
CHANGE THESE TO YOUR OWN FIREBASE.
*/

window.onload = function() {

  const firebaseConfig = {
    apiKey: "AIzaSyD_potT3TgBJvHKhhPSKNQ-kR84BPfdBu8",
    authDomain: "braintrain-3bf0f.firebaseapp.com",
    databaseURL: "https://braintrain-3bf0f-default-rtdb.firebaseio.com",
    projectId: "braintrain-3bf0f",
    storageBucket: "braintrain-3bf0f.appspot.com",
    messagingSenderId: "786766490017",
    appId: "1:786766490017:web:2e11eb3f0b450ad9b503e0",
    measurementId: "G-BSCSQCBFQW"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Make firebase globally accessible
  window.firebase = firebase;

  // Make Firebase services globally accessible
  window.auth = firebase.auth();
  window.db = firebase.database();
  window.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

  console.log("firebaseInit.js loaded", window.auth);

  // Signal that Firebase is ready
  window.firebaseReady = true;

  // Dispatch custom event indicating Firebase is ready
  const firebaseReadyEvent = new Event('firebaseReady');
  document.dispatchEvent(firebaseReadyEvent);

};
