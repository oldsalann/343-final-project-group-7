import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import firebase from 'firebase';
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import avatar from './img/avatar.jpg';
import ReactTable from "react-table";
import "react-table/react-table.css";




export class Contact extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      adminMail: '',
      password: '',
      name: '',
      email: '',
      time: '',
      subject:'',
      message:'',
      repeatPassword:'',
      form: {},
      signin: false,
      submitted: false,
      fill : true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  // Open admin login form 
  handleOpen = () => {
    this.setState({open: true});
  };

  // Close admin login form  
  handleClose = () => {
    this.setState({open: false});
  };

  // Change form value depend on the user input 
  handleChange(event) {
    let value = event.target.value;
    let field = event.target.name;
    let change = {};
    change[field] = value;
    this.setState(change);
  }

  // Show success submit button 
  handleSubmit() {
    this.setState({ submitted: true }, () => {
        setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  }

  // Validation for the user fill out everything 
  fillOut() {
    if (this.state.name == '' || this.state.email == '' || this.state.subject == '' || this.state.message == '') {
      this.setState({ fill: false }, () => {
        setTimeout(() => this.setState({ fill: true }), 5000);
    });
    } else {
      this.setState({
        fill : true
      });
    }
  }

  // Sign in admin page 
  handleSignIn(adminMail, password) {
    firebase.auth().signInWithEmailAndPassword(adminMail, password)
        .catch(err => {
            console.log(err);
            this.setState({ errorMessage: err.message })
        })
    firebase.auth().onAuthStateChanged(firebaseuser => {
          if (firebaseuser) {
              this.setState({
                  signin:true
              })
          } else {
              this.setState({
                  signin:false
              })
          }
      })
      this.clearMessage();
      
  }

  // Add form information to database 
  postForm(e) {
    e.preventDefault();
    this.fillOut()
    if (this.state.name == '' || this.state.email == '' || this.state.subject == '' || this.state.message == '') {
      return null;
    }
    this.handleSubmit()
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

  // reflesh message after submit 
  clearMessage() {
    this.setState({
        name: '',
        email: '',
        time:'',
        subject:'',
        message:'',
        adminMail:'',
        password:'',
        repeatPassword: '',
    });
  }

  // Password match function 
  componentWillMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== this.state.password) {
            return false;
        }
        return true;
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
        label="Login"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleSignIn(this.state.adminMail, this.state.password) }
      />,
    ];

    var valueLink = {
      value: this.state.name,
      requestChange: this.handleChange
    };

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
                        height:"85vh",
                        right:0}}>
            <CardHeader
              title={<h2 style={{fontFamily: 'Philosopher'}}>SAY HELLO... </h2>}
              avatar={avatar}
              style={{marginTop:20, marginLeft:20, marginBottum: 20, marginRight: 20}}
            />
            <ValidatorForm
                ref="form"
            >
            <CardText style={{marginTop:5, marginLeft:20, marginBottum: 20, marginRight: 20}}>
              <p style={{fontFamily: 'Philosopher'}}>Email : </p>
              <br></br>
              <p style={{fontFamily: 'Philosopher'}}>Phone : </p>
              <TextValidator
                hintText="Name"
                floatingLabelText="Name"
                name='name'
                value={this.state.name}
                onChange={(event) => { this.handleChange(event) }}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <TextValidator
                floatingLabelText="Email"
                hintText="Email"
                floatingLabelText="Email"
                name='email'
                value={this.state.email}
                onChange={(event) => { this.handleChange(event) }}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                />
              <TextValidator
                hintText="Subject"
                fullWidth={true}
                floatingLabelText="Subject"
                name='subject'
                value={this.state.subject}
                onChange={(event) => { this.handleChange(event) }}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <TextValidator
                hintText="Message"
                floatingLabelText="Message"
                multiLine={true}
                fullWidth={true}
                rows={3}
                rowsMax={3}
                name='message'
                value={this.state.message}
                onChange={(event) => { this.handleChange(event) }}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </CardText>
            <RaisedButton label={
                              (!this.state.fill && <a style={{fontFamily: 'Philosopher', color: "red"}}>Fill out everything! <i className="far fa-paper-plane"></i></a>)
                              ||(this.state.submitted && <a style={{fontFamily: 'Philosopher'}}>Your form is Submitted! <i className="far fa-paper-plane"></i></a>)
                              || (!this.state.submitted && <a style={{fontFamily: 'Philosopher'}}>Submit <i className="far fa-paper-plane"></i></a>) 
                              
                          }
                          disabled={this.state.submitted} 
                          style={{marginTop:5, marginLeft:30, marginBottum: 30, marginRight: 30}} 
                          onClick={(e) => this.postForm(e) }/>
            <RaisedButton label={<a style={{fontFamily: 'Philosopher'}}>Admin</a>} onClick={this.handleOpen} />
            </ValidatorForm>
            <Dialog
              title="Admin login"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Only Staff can login this page 
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
              >
              <TextValidator
                hintText="email"
                floatingLabelText="Email"
                name='adminMail'
                value={this.state.adminMail}
                onChange={(event) => { this.handleChange(event) }}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                /><br/>
              <TextValidator
                hintText="password"
                floatingLabelText ="password"
                type="password" 
                name="password"
                value={this.state.password}
                onChange={(event) => { this.handleChange(event) }}
                validators={['required']}
                errorMessages={['this field is required']}
                /><br/>
              <TextValidator
                floatingLabelText="Repeat password"
                value={this.state.repeatPassword}
                onChange={(event) => { this.handleChange(event) }}
                name="repeatPassword"
                type="password"
                validators={['isPasswordMatch', 'required']}
                errorMessages={['password mismatch', 'this field is required']}
                    
                />
              </ValidatorForm>
            </Dialog> 
          </Card>
        </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

