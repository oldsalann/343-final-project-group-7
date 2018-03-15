import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase';
import { Form, Icon, Input, Button, Checkbox, Menu } from 'antd';
import { Contact } from './Contact';
import { About } from './About';
import { Animation } from './animation';
import Admin from './Admin';
import { Homepage } from './Homepage';
import { Portfolio } from './Portfolio';
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import ReactTable from "react-table";
import "react-table/react-table.css";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


// main app controlling all components
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home'
    }
  }

  renderContact() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1IjoiaGlkZS0iLCJhIjoiY2plZ2JxYjk2MDJ5NTJ3cGl5bnFobXkxaiJ9.ia8SLIYusJpY5XT9_wjvIA"
    });
    return (
      <div>
        <Router>
          <Map
            style="mapbox://styles/hide-/cjei9kt8x1tmj2smilcc8cb5e"
            containerStyle={{
              height: "100vh",
              width: "100vw",
              position: "absolute",
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
                <h3 style={{fontFamily: 'Philosopher'}}>Bryan Nakata</h3>
              </Popup>
          </Map>
        </Router>
        <Contact></Contact>
      </div>
    );
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
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
                {
/*                 <nav className="navbar fixed-top navbar-expand-md navbar-toggleable-md navbar-light bg-light">
                  <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav mr-auto'>
                    <Link style={{display: 'inline-block'}} to="/" className="brand"> <Animation /> </Link>
                    </ul>
                    <ul className='navbar-nav mr-right'>
                    <Icon type="picture" className="mr-2 mt-1"/><Link style={{display: 'inline-block'}} to="/Portfolio" className="brand mr-3">Portfolio</Link>
                    <Icon type="user" className="mr-2 mt-1"/><Link style={{display: 'inline-block'}} to="/About" className="brand mr-3">About</Link>
                    <Icon type="form" className="mr-2 mt-1"/><Link style={{display: 'inline-block'}}to="/Contact" className="brand mr-3">Contact</Link>
                    </ul>
                  </div>
                </nav> */
                }
                
                {<Menu // Navbar 
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                  <Menu.Item key="home">
                    <Link style={{display: 'inline-block'}} to="/" className="brand"> <Animation /> </Link>
                  </Menu.Item>
                  <Menu.Item style={{float: 'right'}} key="contact">
                    <Icon type="form" /><Link style={{display: 'inline-block'}}to="/Contact" className="brand">Contact</Link>
                  </Menu.Item>
                  <Menu.Item style={{float: 'right', display: 'inline-block'}}key="about">
                    <Icon type="user" /><Link style={{display: 'inline-block'}} to="/About" className="brand">About</Link>
                  </Menu.Item>
                
                  <Menu.Item style={{float: 'right'}} key="portfolio">
                    <Icon type="picture" /><Link style={{display: 'inline-block'}} to="/Portfolio" className="brand">Portfolio</Link>
                  </Menu.Item>
                </Menu>}
                <div className='container-fluid' style={{padding:0}}>
                  <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route path="/Profile" component={Portfolio} />
                    <Route path="/Upload" component={About} />
                    <Route path="/Contact" render={(props) => this.renderContact(props)} />
                    <Route path="/Admin" component={Admin} />
                    <Route path="/Portfolio" component={Portfolio} />
                    <Route path="/About" component={About} />
                    <Route path="/Contact" component={Contact} />
                  </Switch>
                </div>
              </div>
              </Router>
            </div>
        </div>
    );
  }
}

export default App;