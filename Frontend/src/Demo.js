import React, { useState, useEffect } from "react";
const Demo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedSession = localStorage.getItem("isLoggedIn");
    if (storedSession === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h3>Welcome User!</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>Please Log In</h3>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};
export default Demo;
