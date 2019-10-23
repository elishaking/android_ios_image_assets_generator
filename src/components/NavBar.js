import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
  return (
    <nav id="navbar">
      <h1>
        <img src="./assets/img/logo.svg" alt="Logo" />
        <span>Skyblazar</span>
      </h1>

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
