// Fetch the Firebase configuration from firebaseConfig.json
fetch('/firebaseConfig.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(config => {
    // Initialize Firebase
    firebase.initializeApp(config);
    firebase.database().ref().child('.info/connected').on('value', (snapshot) => {
      const connected = snapshot.val();
      console.log(`Connected: ${connected}`);
    });

    console.log("Firebase initialized:", firebase);

    // Make Firebase services globally accessible
    window.auth = firebase.auth();
    window.db = firebase.database();
    window.GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

    console.log("Firebase Auth initialized:", auth);
  })
  .catch(error => {
    console.error('Error fetching Firebase configuration:', error);
  });
