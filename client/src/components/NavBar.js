import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
  return (
    <nav id="navbar">
      <a href="https://skyblazar.com">
        <h1>
          {/* <img src="./assets/img/logo.svg" alt="Logo" /> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="42.757" height="42.761" viewBox="0 0 42.757 42.761">
            <g id="Group_5" data-name="Group 5" transform="translate(-9.498 -7.306)">
              <g id="Group_1" data-name="Group 1" transform="translate(9.498 7.306)">
                <path id="Path_1" data-name="Path 1" d="M30.921,50.067a21.649,21.649,0,0,1-3.527-.291A21.375,21.375,0,1,1,41.232,9.982a1.526,1.526,0,1,1-1.478,2.669,18.332,18.332,0,1,0,7.558,7.933,1.525,1.525,0,1,1,2.735-1.351A21.384,21.384,0,0,1,30.921,50.067Z" transform="translate(-9.498 -7.306)" fill="#1a1818" />
              </g>
              <g id="Group_2" data-name="Group 2" transform="translate(16.217 14.405)">
                <path id="Path_2" data-name="Path 2" d="M638.586,686.1a1.643,1.643,0,0,1-1.643-1.643,14.6,14.6,0,0,1,11.38-14.241,1.643,1.643,0,1,1,.721,3.206,11.384,11.384,0,0,0-8.815,11.035A1.643,1.643,0,0,1,638.586,686.1Z" transform="translate(-636.943 -670.178)" fill="#fe9d2b" />
              </g>
              <g id="Group_3" data-name="Group 3" transform="translate(33.647 27.043)">
                <path id="Path_3" data-name="Path 3" d="M2266,1865.694a1.643,1.643,0,0,1-.562-3.187,11.389,11.389,0,0,0,7.539-10.622,1.643,1.643,0,0,1,3.286,0,14.685,14.685,0,0,1-9.7,13.71A1.636,1.636,0,0,1,2266,1865.694Z" transform="translate(-2264.354 -1850.242)" fill="#fe9d2b" />
              </g>
              <g id="Group_4" data-name="Group 4" transform="translate(23.307 13.523)">
                <path id="Path_4" data-name="Path 4" d="M1322.352,588.762h0a1.974,1.974,0,0,0-2.536-.714l-16.742,8.214a.491.491,0,0,0-.074.044,7.553,7.553,0,1,0,11.063,6.7,7.392,7.392,0,0,0-.938-3.608l8.749-8.005A1.974,1.974,0,0,0,1322.352,588.762Z" transform="translate(-1298.907 -587.847)" fill="#1a1818" />
              </g>
            </g>
          </svg>

          <span>Skyblazar</span>
        </h1>
      </a>

      <ul>
        <li>
          <Link to="/" className="svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19.986" viewBox="0 0 20 19.986">
              <path id="home" d="M21.743,12.331l-9-10a1.03,1.03,0,0,0-1.486,0l-9,10A1,1,0,0,0,3,14H5v7a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V14h2a1,1,0,0,0,.743-1.669ZM12,16a3,3,0,1,1,3-3A3,3,0,0,1,12,16Z" transform="translate(-2 -2.014)" />
            </svg>
          </Link>

          <span><Link to="/">Home</Link></span>
        </li>
        <li>
          <a href="https://skyblazar.com#contact" className="svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path id="contact" d="M21,2H6A2,2,0,0,0,4,4V7H2V9H4v2H2v2H4v2H2v2H4v3a2,2,0,0,0,2,2H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM13,5a3,3,0,1,1-3,3A3.011,3.011,0,0,1,13,5Zm6,13H7v-.75c0-2.219,2.7-4.5,6-4.5s6,2.281,6,4.5Z" transform="translate(-2 -2)" />
            </svg>
          </a>

          <span><a href="https://skyblazar.com#contact">Contact</a></span>
        </li>
      </ul>
    </nav>
  )
}
