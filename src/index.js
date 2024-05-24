import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import './styles/styles.css';

console.log("Doing index.js");


// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/braintrain/coi-serviceworker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

// Google OneTapLogin
const OneTapLogin = () => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log("Login successful:", tokenResponse);
        },
        onError: errorResponse => {
            console.error("Login failed:", errorResponse);
        },
        ux_mode: 'popup',
    });

    return (
        <button onClick={() => login()}>Sign in with Google</button>
    );
};

const App = () => (
    <GoogleOAuthProvider clientId="786766490017-dr5go1indng9pokg2q7f1ghn93ubeoul.apps.googleusercontent.com">
        <OneTapLogin />
    </GoogleOAuthProvider>
);

console.log("Done index.js P2");


ReactDOM.render(<App />, document.getElementById('root'));

console.log("Done index.js P1");

