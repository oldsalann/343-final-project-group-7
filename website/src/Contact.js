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


class Contact extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading:true,
      open: false,
      adminMail: '',
      password: '',
      name: '',
      email: '',
      subject:'',
      message:'',
      form: {}
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500);
    
    let db = firebase.database().ref('form');
    db.on('value', function (snap) {
      let channels = [];
      snap.forEach(function (childNodes) {
          channels.push(childNodes.key);

      });
    })
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
            () => {
              this.props.history.push('/Admin');
            }
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

    
    if (this.state.loading) {
      return null;
    }

    if (this.state.open) {
      return(
        <MuiThemeProvider> 
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
        </MuiThemeProvider>
      );
    }

    return(
      <MuiThemeProvider>
        <div>
          <Map
            style="mapbox://styles/hide-/cjei9kt8x1tmj2smilcc8cb5e"
            containerStyle={{
              height: "100vh",
              width: "100vw",
              position: "absolute"
            }}
            center={
              [-122.200676,47.610378]
            }
            >
              <Popup
                coordinates={[-122.335167,47.608013]}
                offset={{
                  'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
                }}
                >
                <h3 style={{fontFamily: 'Dancing Script'}}>Bryan Nakata</h3>
              </Popup>
          </Map>
          <Card style={{position:"fixed",
                        margin:100,
                        width:"40vw",
                        height:"80vh",
                        right:0}}>
            <CardHeader
              title={<h2 style={{fontFamily: 'Dancing Script'}}>SAY HELLO... </h2>}
              avatar="images/jsa-128.jpg"
              style={{marginTop:20, marginLeft:20, marginBottum: 20, marginRight: 20}}
            />
            <CardText style={{marginTop:5, marginLeft:20, marginBottum: 20, marginRight: 20}}>
              <p style={{fontFamily: 'Dancing Script'}}>Email : </p>
              <br></br>
              <p style={{fontFamily: 'Dancing Script'}}>Phone : </p>
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
            <RaisedButton label={<a style={{fontFamily: 'Dancing Script'}}>Submit <i className="far fa-paper-plane"></i></a>} style={{marginTop:5, marginLeft:30, marginBottum: 30, marginRight: 30}} onClick={(e) => this.postForm(e) }/>
            <RaisedButton label={<a style={{fontFamily: 'Dancing Script'}}>Admin</a>} onClick={this.handleOpen} />
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
      </MuiThemeProvider>
    );
  }
}

export default Contact;

