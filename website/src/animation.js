import React, { Component } from 'react';
import logo from './logo.svg';
import MtSvgLines from 'react-mt-svg-lines'; 
import SvgSignature from './signature'
import './App.css';

// The component which handles the animation in the navbar, the top left corner
export class Animation extends React.Component {
  render() {
    return(
      <div>
        { <MtSvgLines
              animate={ true }
              duration={ 3000 }
              stagger={ 100 }
              timing="ease-in"
              playback="forwards"
            >
              <SvgSignature />
        </MtSvgLines>}
      </div>
    )}
}
