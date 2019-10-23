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
        <li><Link to="/">Home</Link></li>
        <li><a href="https://skyblazar.com#contact">Contact</a></li>
      </ul>
    </nav>
  )
}
