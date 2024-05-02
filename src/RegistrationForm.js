import React, { useState } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import img3 from "./pictures/img3.jpg";
function RegistrationForm() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    companyName: "",
    gstIn: "",
    password: "",
    ConfirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/user", {
      method: "POST",
      body: JSON.stringify({
        userName: formData.userName,
        email: formData.email,
        companyName: formData.companyName,
        gstIn: formData.gstIn,
        password: formData.password,
        ConfirmPassword: formData.ConfirmPassword,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    alert("Congrats Your are successfully created a new account");
  };
  return (
    <div className="logc11" style={{ backgroundImage: `URL(${img3})` }}>
      <div className="logc22">
        <center>
          {" "}
          <h2> Register </h2>
        </center>
        <form onSubmit={handleSubmit}>
          <div className="inside2">
            <label>User Name: </label>
            <div>
              <input
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label>Company Name:</label>
              <div>
                <input
                  name="text"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label>Gst IN:</label>
              <div>
                <input
                  name="text"
                  type="text"
                  value={formData.gstIn}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label>Confirm Password:</label>
              <div>
                <input
                  type="Password"
                  name="ConfirmPassword"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="butn">
            <div>
              <button className="btn1" type="submit">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="acc">
        <p>
          {" "}
          <center>
            Already hava an account ? <Link to="/Login">Login</Link>{" "}
          </center>
        </p>
      </div>
    </div>
  );
}
export default RegistrationForm;