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
    setTimeout(() => this.setState({ loading: false }), 1500);
  }


  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGlkZS0iLCJhIjoiY2plZ2JxYjk2MDJ5NTJ3cGl5bnFobXkxaiJ9.ia8SLIYusJpY5XT9_wjvIA"
    });

    if (this.state.loading) {
      return null;
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
              />
              <TextField
                hintText="Email"
                floatingLabelText="Email"
              />
              <TextField
                hintText="Subject"
                fullWidth={true}
                floatingLabelText="Subject"
              />
              <TextField
                hintText="Message"
                floatingLabelText="Message"
                multiLine={true}
                fullWidth={true}
                rows={3}
                rowsMax={3}
              />
            </CardText>
            <RaisedButton label={<a style={{fontFamily: 'Dancing Script'}}>Submit <i className="far fa-paper-plane"></i></a>} style={{marginTop:5, marginLeft:30, marginBottum: 30, marginRight: 30}}/>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Contact;

