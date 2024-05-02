// NavigationBar.js

import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav>
      <div className="logo">
        Mill Cart 🛒
      </div>
      <div className="pages">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/login">Login / Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
