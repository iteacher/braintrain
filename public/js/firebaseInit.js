// firebaseInit.js
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_REACT_APP_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_REACT_APP_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_REACT_APP_MEASUREMENT_ID
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
