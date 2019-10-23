//@ts-check
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Home.scss';

import NavBar from '../NavBar';

export default class Home extends Component {
  state = {
    dropText: "Select/Drop Image(s)",
    files: []
  };

  /**
   * @param {File[]} files
   * @param {import('react-dropzone').DropEvent} event
   */
  dropped = (files, event) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile = {
          file: e.target.result,
          name: file.name
        }
        this.setState({ files: [newFile, ...this.state.files] });
      };
      reader.readAsDataURL(file);
    });

  };

  dragEnter = () => {
    this.setState({ dropText: "Drop Image" });
  };

  dragLeave = () => {
    this.setState({ dropText: "Select/Drop Image(s)" });
  };

  render() {
    const { files } = this.state;
    return (
      <div id="home">
        <NavBar />

        <div className="main">
          <div className="drop-container">
            <Dropzone
              onDropAccepted={this.dropped}
              onDragEnter={this.dragEnter}
              onDragLeave={this.dragLeave}
              accept={['image/png', 'image/jpeg']}>
              {
                ({ getRootProps, getInputProps, isDragReject }) => (
                  <div {...getRootProps()} className="select">
                    <input {...getInputProps()} />

                    <p>{this.state.dropText}</p>
                    <small>1000x1000 recommended</small>
                    {isDragReject && (<small className="error">File type not accepted</small>)}
                  </div>
                )
              }
            </Dropzone>
            {
              files.length > 0 && (
                <div className="img-display">
                  {
                    files.map((file) => (
                      <div>
                        <img src={file.file} alt="" />
                        <p>{file.name} </p>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
