import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Home.scss';

import NavBar from '../NavBar';

export default class Home extends Component {
  render() {
    return (
      <div id="home">
        <NavBar />

        <div className="main">
          <div className="drop-container">
            <Dropzone>
              {
                ({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="select">
                    <input {...getInputProps()} />

                    <p>Select Image</p>
                    <small>1000x1000 recommended</small>
                  </div>
                )
              }
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}
