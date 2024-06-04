/* global google firebase */
/*
Security Notes NEWLY Updated for sync: Firebase configuration does not contain any sensitive information.
The actual authentication is handled by Firebase's servers.
CHANGE THESE TO YOUR OWN FIREBASE .
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

  // Correct FedCM Implementation
  function initializeFedCM() {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      google.accounts.id.initialize({
        client_id: '786766490017-dr5go1indng9pokg2q7f1ghn93ubeoul.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        use_fedcm_for_prompt: true // Enable FedCM
      });

      // Optionally, show the One Tap prompt automatically
      google.accounts.id.prompt();
      console.log("initializeFedCM: One Tap prompt automatically shown");

    } else {
      console.error('Google Identity Services library not loaded.');
    }
  }

  document.addEventListener('gisLoaded', function () {
    console.log("Google Identity Services library is ready");
    try {
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        initializeFedCM();
      } else {
        console.error('Google Identity Services library not available.');
      }
    } catch (error) {
      console.error("Error initializing FedCM:", error);
    }
  });

  function handleCredentialResponse(credential) {
    const assertionResponse = credential.response;
    if (assertionResponse) {
      const credentialId = assertionResponse.id;
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(credentialId))
        .then(result => {
          console.log("User signed in with FedCM:", result.user);
          return result.user.getIdToken();
        })
        .then(token => {
          console.log("Token retrieved successfully:", token);
          const userId = firebase.auth().currentUser.uid;
          return firebase.database().ref('/neurons/' + userId).once('value');
        })
        .then(snapshot => {
          const neuronData = snapshot.val();
          console.log("Neuron data retrieved from database:", neuronData);
          updateNeurons(neuronData);
        })
        .catch(error => {
          console.error("Error during sign-in or data retrieval:", error);
        });
    } else {
      console.log("No assertion response received or response is invalid");
    }
  }

  // Existing function to update neurons in the UI
  function updateNeurons(neuronData) {
    // Your existing code to update neurons in the UI
  }
};
