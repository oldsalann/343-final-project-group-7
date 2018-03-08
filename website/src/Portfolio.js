import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

export class Portfolio extends Component {
    render() {
        return(
            <div>
                <ImageContainer />
            </div>
        );
    }
}

export class ImageContainer extends Component {
    render() {
        // get images
        var storage = firebase.storage();
        var storageRef = storage.ref();
        console.log(storageRef);
        return(
            <div>
                
            </div>
        );
    }
}

export class ImageCard extends Component {
    render() {
        return(
            <div>
                
            </div>
        );
    }
}
