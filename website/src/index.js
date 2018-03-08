import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBt9jzrid526vBoZy5RCtsSqTScEFvDgtA",
    authDomain: "info343-final-1383b.firebaseapp.com",
    databaseURL: "https://info343-final-1383b.firebaseio.com",
    projectId: "info343-final-1383b",
    storageBucket: "info343-final-1383b.appspot.com",
    messagingSenderId: "684285196604"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
