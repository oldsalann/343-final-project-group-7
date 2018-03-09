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



export class Contact extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading:true,
      open: false,
      adminMail: '',
      password: '',
      name: '',
      email: '',
      time: '',
      subject:'',
      message:'',
      form: {},
      signin: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange(event) {
    event.preventDefault();
    let value = event.target.value;
    let field = event.target.name;
    let change = {};
    change[field] = value;
    this.setState(change);
  }

  handleSignIn(adminMail, password) {
    firebase.auth().signInWithEmailAndPassword(adminMail, password)
        .catch(err => {
            console.log(err);
            this.setState({ errorMessage: err.message })
        }).then(
            this.setState({
              signin: true
            })
          );
  }

  postForm(e) {
    e.preventDefault();
    const formRef = firebase.database().ref('form');
    const form = {
      name: this.state.name,
      email: this.state.email,
      time: firebase.database.ServerValue.TIMESTAMP,
      subject: this.state.subject,
      message: this.state.message,
    }
    console.log(form)
    formRef.push(form);
    this.clearMessage();
  }

  clearMessage() {
    this.setState({
        name: '',
        email: '',
        time:'',
        subject:'',
        message:''
    });
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGlkZS0iLCJhIjoiY2plZ2JxYjk2MDJ5NTJ3cGl5bnFobXkxaiJ9.ia8SLIYusJpY5XT9_wjvIA"
    });

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleSignIn(this.state.adminMail, this.state.password) }
      />,
    ];

    var valueLink = {
      value: this.state.name,
      requestChange: this.handleChange
    };

    if (this.state.loading) {
      return null;
    }

    if (this.state.signin) {
      return <Redirect to="/Admin"/>
    }

    

    return(
      <MuiThemeProvider>
        <Router>
        <div>
          
          <Card style={{position:"fixed",
                        margin:100,
                        marginTop: 50,
                        width:"40vw",
                        height:"80vh",
                        right:0}}>
            <CardHeader
              title={<h2 style={{fontFamily: 'Philosopher'}}>SAY HELLO... </h2>}
              avatar={avatar}
              style={{marginTop:20, marginLeft:20, marginBottum: 20, marginRight: 20}}
            />
            <CardText style={{marginTop:5, marginLeft:20, marginBottum: 20, marginRight: 20}}>
              <p style={{fontFamily: 'Philosopher'}}>Email : </p>
              <br></br>
              <p style={{fontFamily: 'Philosopher'}}>Phone : </p>
              <TextField
                hintText="Name"
                floatingLabelText="Name"
                name='name'
                value={this.state.name}
                onChange={(event) => { this.handleChange(event) }}
              />
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                name='email'
                value={this.state.email}
                onChange={(event) => { this.handleChange(event) }}
              />
              <TextField
                hintText="Subject"
                fullWidth={true}
                floatingLabelText="Subject"
                name='subject'
                value={this.state.subject}
                onChange={(event) => { this.handleChange(event) }}
              />
              <TextField
                hintText="Message"
                floatingLabelText="Message"
                multiLine={true}
                fullWidth={true}
                rows={3}
                rowsMax={3}
                name='message'
                value={this.state.message}
                onChange={(event) => { this.handleChange(event) }}
              />
            </CardText>
            <RaisedButton label={<a style={{fontFamily: 'Philosopher'}}>Submit <i className="far fa-paper-plane"></i></a>} style={{marginTop:5, marginLeft:30, marginBottum: 30, marginRight: 30}} onClick={(e) => this.postForm(e) }/>
            <RaisedButton label={<a style={{fontFamily: 'Philosopher'}}>Admin</a>} onClick={this.handleOpen} />
            <Dialog
              title="Admin login"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              The actions in this window were passed in as an array of React objects.
              <TextField 
                hintText="email"
                floatingLabelText="Email"
                name='adminMail'
                value={this.state.adminMail}
                onChange={(event) => { this.handleChange(event) }}
              /><br/>
              <TextField
                hintText="password"
                floatingLabelText ="password"
                type="password" 
                name="password"
                value={this.state.password}
                onChange={(event) => { this.handleChange(event) }}
              />
            </Dialog> 
          </Card>
        </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

