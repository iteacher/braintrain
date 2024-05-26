async function getFirebaseConfig() {
    const response = await fetch('/env');
    const config = await response.json();
    return config;
}

getFirebaseConfig().then(firebaseConfig => {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.database().ref().child('.info/connected').on('value', (snapshot) => {
        const connected = snapshot.val();
        console.log(`Connected: ${connected}`);
    });
}).catch(error => {
    console.error('Error fetching Firebase config:', error);
});

console.log('Environment Variables:', REACT_APP_API_KEY);


// firebaseInit.js
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