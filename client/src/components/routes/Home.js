//@ts-check
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './Home.scss';

import NavBar from '../NavBar';

const ERROR_STYLE = {
  border: "1px solid red",
  boxShadow: "0 0 6px 0px #ff0000b5"
};

export default class Home extends Component {
  state = {
    dropText: "Select/Drop Image(s)",
    images: [],
    loadingAndroid: false,
    loadingIOS: false,
    errorStyle: {}
  };

  /**
   * @param {File[]} imageFiles
   * @param {import('react-dropzone').DropEvent} event
   */
  dropped = (imageFiles, event) => {
    this.setState({ dropText: "Select/Drop Image(s)", errorStyle: {} })
    imageFiles.forEach((imageFile) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const newImage = {
            file: imageFile,
            dataUrl: e.target.result,
            name: imageFile.name.replace(`.${imageFile.type.split("/")[1]}`, "").replace(".jpg", "") || imageFile.name,
            size: [img.width, img.height]
          }
          this.setState({ images: [newImage, ...this.state.images] });
        };
        img.src = e.target.result.toString();
      };

      reader.readAsDataURL(imageFile);
    });
  };

  dragEnter = () => {
    this.setState({ dropText: "Drop Image" });
  };

  dragLeave = () => {
    this.setState({ dropText: "Select/Drop Image(s)" });
  };

  dragRejected = () => {
    this.setState({ dropText: "Select/Drop Image(s)", errorStyle: ERROR_STYLE })
  };

  generateAssets = (os = "android") => {
    if (this.state.images.length == 0) return;

    const loadingKey = os === "android" ? "loadingAndroid" : "loadingIOS";
    this.setState({ [loadingKey]: true });

    const uniqueLink = Date.now().toString();
    fetch(`/${os}/${uniqueLink}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.images.map((image) => ({
        name: image.name,
        size: { width: image.size[0].toString(), height: image.size[1].toString() },
        dataUrl: image.dataUrl
      })))
    }).then((res) => res.blob().then((blob) => {
      this.setState({ [loadingKey]: false });
      if (blob.size === 0 || blob.type === "") return;

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `assets_${uniqueLink.substring(7, 13)}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }));
  };

  generateAndroid = () => {
    this.generateAssets();
    // console.log(JSON.stringify(this.state.images.map((image) => ({ name: image.name, size: image.size, dataUrl: image.dataUrl }))));
  };

  generateIOS = () => {
    this.generateAssets("ios");
  };

  deleteImage = (index) => {
    let { images } = this.state;
    images.splice(index, 1);
    this.setState({ images });
  };

  deleteAll = () => {
    this.setState({ images: [] });
  };

  render() {
    const { images, loadingAndroid, loadingIOS, errorStyle } = this.state;
    return (
      <div id="home">
        <NavBar />

        <div className="main">
          <div className="drop-container">
            <Dropzone
              onDropAccepted={this.dropped}
              onDragEnter={this.dragEnter}
              onDragLeave={this.dragLeave}
              onDropRejected={this.dragRejected}
              accept="image/png">
              {
                ({ getRootProps, getInputProps, isDragReject }) => (
                  <div {...getRootProps()} className="select" style={errorStyle}>
                    <input {...getInputProps()} />

                    <p>{this.state.dropText}</p>
                    {/* <small>1000x1000 recommended</small> */}
                    {errorStyle === ERROR_STYLE && (<small className="error">File type not accepted</small>)}
                  </div>
                )
              }
            </Dropzone>
            {
              images.length > 0 && (
                <div className="img-display">
                  <svg id="all" onClick={this.deleteAll} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <g id="Group_18" data-name="Group 18" transform="translate(-1239 -428)">
                      <g id="Rectangle_9" data-name="Rectangle 9" transform="translate(1239 428)" fill="#8f8f8f" stroke="#acacac" strokeWidth="2">
                        <rect width="20" height="20" rx="6" stroke="none" />
                        <rect x="1" y="1" width="18" height="18" rx="5" fill="none" />
                      </g>
                      <g id="Group_17" data-name="Group 17" transform="translate(1.192 22.192)">
                        <line id="Line_1" data-name="Line 1" x2="8.617" y2="8.617" transform="translate(1243.5 411.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
                        <line id="Line_2" data-name="Line 2" x1="8.617" y2="8.617" transform="translate(1243.5 411.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
                      </g>
                    </g>
                  </svg>
                  {
                    images.map((image, index) => (
                      <div key={index} className="img-container">
                        <div className="img">
                          <img src={image.dataUrl} alt="" />
                          <svg id="single" onClick={(e) => this.deleteImage(index)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <g id="Group_18" data-name="Group 18" transform="translate(-1239 -428)">
                              <g id="Rectangle_9" data-name="Rectangle 9" transform="translate(1239 428)" fill="#8f8f8f" stroke="#acacac" strokeWidth="2">
                                <rect width="20" height="20" rx="6" stroke="none" />
                                <rect x="1" y="1" width="18" height="18" rx="5" fill="none" />
                              </g>
                              <g id="Group_17" data-name="Group 17" transform="translate(1.192 22.192)">
                                <line id="Line_1" data-name="Line 1" x2="8.617" y2="8.617" transform="translate(1243.5 411.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
                                <line id="Line_2" data-name="Line 2" x1="8.617" y2="8.617" transform="translate(1243.5 411.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
                              </g>
                            </g>
                          </svg>
                        </div>
                        <p>{image.name} </p>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>

          {
            loadingAndroid ? <p className="loading">Loading..</p> : (
              <button className="android" onClick={this.generateAndroid}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26.468" height="30.868" viewBox="0 0 26.468 30.868">
                  <path id="android-brands" d="M35.97,43.824v7.982a1.889,1.889,0,0,1-1.9,1.909A2.057,2.057,0,0,1,32,51.806V43.824a2.056,2.056,0,0,1,2.075-1.9A1.9,1.9,0,0,1,35.97,43.824Zm.744,10.822a2.036,2.036,0,0,0,2.04,2.04h1.372l.021,4.211a1.9,1.9,0,0,0,3.8,0V56.686h2.564V60.9a1.913,1.913,0,0,0,3.825,0V56.686h1.392a2.033,2.033,0,0,0,2.026-2.04V42.28H36.715ZM53.809,41.611H36.639a7.747,7.747,0,0,1,4.384-6.851l-1.317-2.433a.266.266,0,1,1,.462-.262l1.337,2.454a9.312,9.312,0,0,1,7.465,0l1.33-2.447a.266.266,0,1,1,.462.262L49.445,34.76A7.765,7.765,0,0,1,53.809,41.611ZM42.043,37.786a.724.724,0,0,0-.724-.724.724.724,0,0,0,0,1.447A.724.724,0,0,0,42.043,37.786Zm7.816,0a.713.713,0,1,0-.7.724A.72.72,0,0,0,49.859,37.786Zm6.534,4.143a1.89,1.89,0,0,0-1.9,1.9v7.982a1.9,1.9,0,0,0,1.9,1.909,2.053,2.053,0,0,0,2.075-1.909V43.824A2.041,2.041,0,0,0,56.393,41.929Z" transform="translate(-32 -31.929)" fill="#fff" />
                </svg>

                <span>GENERATE ASSETS</span>
              </button>
            )
          }

          {
            loadingIOS ? <p className="loading">Loading..</p> : (
              <button className="ios" onClick={this.generateIOS}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25.944" height="30.874" viewBox="0 0 25.944 30.874">
                  <path id="apple-brands" d="M25.691,48.315a6.435,6.435,0,0,1,3.446-5.845A7.406,7.406,0,0,0,23.3,39.4c-2.447-.193-5.121,1.427-6.1,1.427-1.034,0-3.405-1.358-5.266-1.358C8.087,39.527,4,42.532,4,48.646a17.18,17.18,0,0,0,.993,5.6c.882,2.53,4.067,8.733,7.389,8.63,1.737-.041,2.964-1.234,5.225-1.234,2.192,0,3.329,1.234,5.266,1.234,3.35-.048,6.231-5.686,7.072-8.223a6.833,6.833,0,0,1-4.253-6.334ZM21.79,37a6.492,6.492,0,0,0,1.654-5,7.309,7.309,0,0,0-4.68,2.406A6.594,6.594,0,0,0,17,39.361,5.789,5.789,0,0,0,21.79,37Z" transform="translate(-4 -32)" fill="#fff" />
                </svg>

                <span>GENERATE ASSETS</span>
              </button>
            )
          }
        </div>
      </div>
    )
  }
}
