import React, { Component } from 'react';
import logo from './logo.svg';
import MtSvgLines from 'react-mt-svg-lines'; 
import SvgSignature from './signature'
import './App.css';

export class Animation extends React.Component {
  render() {
    return(
      <div>
        { <MtSvgLines
              animate={ true }
              duration={ 2000 }
              stagger={ 100 }
              timing="ease-in"
              playback="forwards"
            >
              <SvgSignature />
        </MtSvgLines>}
      </div>
    )}
}
