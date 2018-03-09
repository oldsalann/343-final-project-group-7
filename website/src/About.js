import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import firebase from 'firebase';
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import avatar from './img/avatar.jpg'

export class About extends Component {
    constructor(props){
        super(props)
        this.state = {
          url: ''
        };
      }
    componentDidMount() {
        let storage = firebase.storage();
        let storageRef = storage.ref();
        let allImages = [
                            storageRef.child('images/28768591_10211716205604473_1060917020_o.jpg'),
                            storageRef.child('images/28810468_10211716206404493_1130485339_o.jpg'),
                            storageRef.child('images/28821832_10211716205724476_361433538_o.jpg'),
                            storageRef.child('images/28822563_10211716206724501_7716507_o.jpg'),
                            storageRef.child('images/28822675_10211716205764477_205517830_o.jpg'),
                            storageRef.child('images/28876315_10211716205484470_662176243_o.jpg'),
                            storageRef.child('images/28876651_10211716205644474_1999308415_o.jpg'),
                            storageRef.child('images/28876962_10211716205924481_1460516792_o.jpg'),
                            storageRef.child('images/28877159_10211716205524471_1202501323_o.jpg'),
                            storageRef.child('images/28877208_10211716205684475_1126602387_o.jpg'),
                            storageRef.child('images/28879500_10211716206124486_921311484_o.jpg')
                        ];
        let imgNum = this.getRandomInt(0, allImages.length);
        let indexedVal = allImages[imgNum];
        this.getUrl(indexedVal);
    }

    // function used from 'MDN web docs'
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getUrl(imgRef) {
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
            <AboutCard src={this.state.url}/>
          );
    }
}

export class AboutCard extends Component {
    render() {
        return(
            <MuiThemeProvider>
              <div>  
                <Card style={{position:"fixed",
                              margin:100,
                              width:"40vw",
                              height:"80vh",
                              right:0}}>
                  <CardHeader
                    title={<h2 style={{fontFamily: 'Philosopher'}}> ABOUT BRYAN </h2>}
                    avatar={avatar}
                    style={{marginTop:20, marginLeft:20, marginBottum: 20, marginRight: 20}}
                  />
                  <CardText style={{marginTop:5, marginLeft:20, marginBottum: 20, marginRight: 20}}>
                    <p> Hi, my name is Bryan Nakata and I am a 3rd year student at the University of Washington. I am majoring
                        in the communications program and this is my website... </p>
                   
                    
                  </CardText>
                </Card>
              </div>
              <img className="image" style={{border: "none", width: "100%"}} src={this.props.src} data-lightbox="roadtrip" data-title="My caption" alt="test" />
            </MuiThemeProvider>
            
        );
    }
}