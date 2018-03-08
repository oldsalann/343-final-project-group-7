import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

export class Portfolio extends Component {
    render() {
        let storage = firebase.storage();
        let storageRef = storage.ref();
        console.log(storageRef);
        return(
            <div>
                <ImageContainer storageItem={storageRef} />
            </div>
        );
    }
}

export class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    }
    handleSet(setUrl) {
        this.setState({url:setUrl})
    }
    componentDidMount() {
        let storage = firebase.storage();
        let storageRef = storage.ref();
        let imgRef = storageRef.child('images/28768591_10211716205604473_1060917020_o.jpg');
        let setUrl = undefined;
        imgRef.getDownloadURL().then((url) => {
            setUrl = url;
            this.setState({url:setUrl})
        }).catch(function(error) {
            console.error(error);
        });
    }
    render() {
        return(
            <div>
                {this.state.url !== '' &&
                    <ImageCard src={this.state.url}/>
                }
            </div>
        );
    }
}

export class ImageCard extends Component {
    render() {
        return(
            <div>
                <img src={this.props.src} alt="test" />
            </div>
        );
    }
}
