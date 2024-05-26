(async () => {
    try {
        const response = await fetch('/firebaseConfig.json');
        const firebaseConfig = await response.json();

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

        console.log("Firebase Auth initialized:", window.auth);
    } catch (error) {
        console.error('Error fetching Firebase config:', error);
    }
})();