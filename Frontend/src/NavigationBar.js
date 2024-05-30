// NavigationBar.js

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    setIsLoggedIn(false);
    history.push("/login");
  };

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
            <Link to="/cart">Cart</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login / Register</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
