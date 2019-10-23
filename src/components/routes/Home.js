//@ts-check
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Home.scss';

import NavBar from '../NavBar';

export default class Home extends Component {
  state = {
    dropText: "Select/Drop Image"
  };

  /**
   * @param {File[]} files
   * @param {import('react-dropzone').DropEvent} event
   */
  dropped = (files, event) => {
    console.log(files);
  };

  dragEnter = () => {
    this.setState({ dropText: "Drop Image" });
  };

  dragLeave = () => {
    this.setState({ dropText: "Select/Drop Image" });
  };

  render() {
    return (
      <div id="home">
        <NavBar />

        <div className="main">
          <div className="drop-container">
            <Dropzone
              onDropAccepted={this.dropped}
              onDragEnter={this.dragEnter}
              onDragLeave={this.dragLeave} >
              {
                ({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="select">
                    <input {...getInputProps()} />

                    <p>{this.state.dropText}</p>
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
