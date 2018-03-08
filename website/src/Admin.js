import React, { Component } from 'react';
import firebase from 'firebase';
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class Admin extends Component {

    handleSignOut() {
        firebase.auth().signOut().then(
            () => {
                this.props.history.push('/Contact');
            }
        );
    }

    render() {

        return(
        <MuiThemeProvider>
            <Card style={{margin:100}}>
            <div>
                <RaisedButton label="Sign out" 
                              onClick={() => this.handleSignOut()} 
                              style={{ smargin: 'auto' }} />
            </div>
            </Card>
        </MuiThemeProvider>
        );
    }
}

export default Admin;

