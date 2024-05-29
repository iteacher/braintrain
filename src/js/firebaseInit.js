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

  // Add event listener for Google Identity Services
  window.addEventListener('gisLoaded', function() {
    window.google.accounts.id.initialize({
      client_id: '786766490017-dr5go1indng9pokg2q7f1ghn93ubeoul.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });
    window.google.accounts.id.prompt();
  });

  // Handle the credential response
  function handleCredentialResponse(response) {
    const credential = response.credential;
    if (credential) {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(credential))
        .then(result => {
          console.log("User signed in with One Tap:", result.user);
          return result.user.getIdToken();
        })
        .then(token => {
          console.log("Token retrieved successfully:", token);
        })
        .catch(error => {
          console.error("Error during sign-in or token retrieval:", error);
        });
    } else {
      console.log("No credential received or credential is invalid");
    }
  }

  // Add a listener to check authentication state
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("User is signed in");
      user.getIdToken().then(token => {
        console.log("Token retrieved successfully:", token);
      }).catch(error => {
        console.error("Error retrieving a token:", error);
      });
    } else {
      console.log("No user is signed in");
      // Do not attempt to retrieve a token
    }
  });

  

};
