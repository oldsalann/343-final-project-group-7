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
                              marginTop: 50,
                              width:"40vw",
                              height:"80vh",
                              right:0}}>
                  <CardHeader
                    title={<h2 style={{fontFamily: 'Philosopher'}}> ABOUT BRYAN </h2>}
                    avatar={avatar}
                    style={{marginTop:20, marginLeft:20, marginBottum: 20, marginRight: 20}}
                  />
                  <CardText style={{marginTop:5, marginLeft:20, marginBottum: 20, marginRight: 20}}>
                    <p>
                    Hello!
                    <br></br>
                    <br></br>
                    &ensp;&ensp;&ensp;&ensp;&ensp;
                    My name is Bryan Nakata and I&#39;ve been working in photography and film ever since my freshman year of high school. I have completed five media related courses: photography, multimedia film, and three years of broadcast media. In addition, I have taken college courses such as Digital Cinema Production. By the age of 15, I had already started producing a full length documentary film. The film premiered two years later to over 300 people, raising over $4,000 in DVD sales for my school. Along with this work, I also have done numerous projects in both photography and film. My work has been even featured on the Facebook pages of the University of Washington and the Seattle Seahawks.             
                    <br></br>
                    &ensp;&ensp;&ensp;&ensp;&ensp;
                    Currently I am studying at the University of Washington and majoring in communications journalism. I also work as a digital media producer at the University of Washington, Seattle Seahawks and in the summer, CBS Seattle. In my current and past jobs, I have created videos on multiple topics such as highlighting undocumented student immigrants, covering MLK week, telling the stories of students, filming football stars, and more. As a photographer, I do events, creative images along with portraits. If you are looking for a hardworking photographer or cinematographer with plenty of experience and a positive attitude, please contact me. Thank you for looking at my page and I hope to hear from you soon!
                    </p>
                   
                    
                  </CardText>
                </Card>
              </div>
              <img className="image" style={{border: "none", width: "100%"}} src={this.props.src} data-lightbox="roadtrip" data-title="My caption" alt="test" />
            </MuiThemeProvider>
            
        );
    }
}