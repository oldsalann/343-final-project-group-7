import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Contact } from './Contact';
import { About } from './About';
import { Homepage } from './Homepage';
import { Portfolio } from './Portfolio';



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

  // renders router and navbar
  render() {
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
                <div className='container-fluid'>
                  <Switch>
                    <Route exact path="/" component={Homepage} />
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

// for visual purposes
class Nav extends Component {
  
}
export default App;