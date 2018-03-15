import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import AtvImg from 'react-img-atv';


const rootDivStyle = {
    position: 'relative',
    top: window.innerHeight/4,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  export class Homepage extends React.Component {
    render() {
      return(
        <div style={rootDivStyle}>
          { <AtvImg
            layers={[
              'https://firebasestorage.googleapis.com/v0/b/info343-final-1383b.appspot.com/o/images%2F28821832_10211716205724476_361433538_o.jpg?alt=media&token=6253d35f-90f9-428d-8e74-53eb745f423f',
              'https://firebasestorage.googleapis.com/v0/b/info343-final-1383b.appspot.com/o/Logo%20name%2FTest.png?alt=media&token=fa7dc230-3c09-4aa2-91d9-6f6e2159a6d5',
            ]}
            staticFallback="http://kloc.pm/images/kloc-icon-flattened.jpg"
            isStatic={false}
            className={'thisIsOptional'}
            style={{ width: 900, height: 300 }}
          />    }
          {/* <MtSvgLines
                animate={ true }
                duration={ 5000 }
                stagger={ 100 }
                timing="ease-in"
                playback="forwards"
              >
                <SvgSignature />
          </MtSvgLines> */}
        </div>
      )}
  }
  