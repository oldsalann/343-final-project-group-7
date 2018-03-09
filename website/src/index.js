import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.css';
import App from './App';
import firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';


let config = {
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
