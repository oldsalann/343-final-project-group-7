import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class Contact extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading:true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 3000);
  }

  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGlkZS0iLCJhIjoiY2plZ2JxYjk2MDJ5NTJ3cGl5bnFobXkxaiJ9.ia8SLIYusJpY5XT9_wjvIA"
    });

    const { loading } = this.state;

    if (loading) {
      return null;
    }

    return(
      <MuiThemeProvider>
        <div>
          <Map
            style="mapbox://styles/mapbox/light-v9"
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
                }}>
                <h1>Popup</h1>
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
              style={{margin:20}}
            />
            <CardText style={{margin:20}}>
              <p>Email</p>
              <br></br>
              <p>Phone</p>
              <TextField
                hintText="Name"
                floatingLabelText="Name"
              /><br/>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
              /><br/>
              <TextField
                hintText="Subject"
                floatingLabelText="Subject"
              /><br/>
              
            </CardText>
            <RaisedButton label={<a style={{fontFamily: 'Dancing Script'}}>Submit <i class="far fa-paper-plane"></i></a>} style={{margin:30}}/>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Contact;

