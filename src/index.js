import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import './js/config.js';
import './js/firebaseInit.js';
import './js/app-scripts.js';

console.log("index.js Headers and Imports loaded - React, Auth, firebase and app scripts ");

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

ReactDOM.render(<App />, document.getElementById('root'));

console.log("index.js loaded");

