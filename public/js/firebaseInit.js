// firebaseInit.js
const firebaseConfig = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    databaseURL: REACT_APP_DATABASE_URL,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
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
