import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Contact } from './Contact';
import { About } from './About';
import Admin from './Admin';
import { Homepage } from './Homepage';
import { Portfolio } from './Portfolio';
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";



// main app controlling all components
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  // authorize user
  componentDidMount() {
    
  }

  renderContact() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGlkZS0iLCJhIjoiY2plZ2JxYjk2MDJ5NTJ3cGl5bnFobXkxaiJ9.ia8SLIYusJpY5XT9_wjvIA"
    });
    return (
      <div>
        <Map
          style="mapbox://styles/hide-/cjei9kt8x1tmj2smilcc8cb5e"
          containerStyle={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            zIndex: -100
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
        <Contact></Contact>
      </div>
    );

  }

  // renders router and navbar
  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGlkZS0iLCJhIjoiY2plZ2JxYjk2MDJ5NTJ3cGl5bnFobXkxaiJ9.ia8SLIYusJpY5XT9_wjvIA"
    });
    return (
        <div>
          <div>
            <Router>
              <div>
                <nav className="navbar fixed-top navbar-expand-md navbar-toggleable-md navbar-dark bg-dark">
                  <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav mr-auto'>
                      <li className='navbar-brand mr-3' id='font'>Bryan Nakata</li>
                    </ul>
                    <ul className='navbar-nav mr-right'>
                      <li className='nav-item mr-3 mt-auto mb-auto'><Link to="/" className="brand">Home</Link></li>
                      <li className='nav-item mr-3 mt-auto mb-auto'><Link to="/About" className="brand">About</Link></li>
                      <li className='nav-item mr-3 mt-auto mb-auto'><Link to="/Contact" className="brand">Contact</Link></li>
                      <li className='nav-item mt-auto mb-auto'><Link to="/Portfolio" className="brand">Portfolio</Link></li>
                    </ul>
                  </div>
                </nav>
                <div className='container-fluid' style={{padding:0}}>
                  <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/Profile" component={Portfolio} />
                    <Route path="/Upload" component={About} />
                    <Route path="/Contact" render={() => this.renderContact()} />
                    <Route path="/Admin" component={Admin} />
                  </Switch>
                </div>
              </div>
              </Router>
            </div>
        </div>
    );
  }
}

// for visual purposes
class Nav extends Component {
  
}
export default App;