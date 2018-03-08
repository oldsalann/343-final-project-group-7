import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


class Contact extends Component {
  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGlkZS0iLCJhIjoiY2plZ2JxYjk2MDJ5NTJ3cGl5bnFobXkxaiJ9.ia8SLIYusJpY5XT9_wjvIA"
    });

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
          <Card style={{position:"absolute",
                        margin:100,
                        width:"40vw",
                        height:"80vh",
                        right:0}}>
            <CardHeader
              title="URL Avatar"
              subtitle="Subtitle"
              avatar="images/jsa-128.jpg"
            />
            <CardMedia>
              <img src="" alt="" />
            </CardMedia>
            <RaisedButton label={<a style={{fontFamily: 'Dancing Script'}}>Submit <i class="far fa-paper-plane"></i></a>} style={{margin:20}}/>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Contact;

