import React, { Component } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import img3 from "./pictures/img3.jpg";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        userName: "",
        email: "",
        companyName: "",
        gstIn: "",
        password: "",
        ConfirmPassword: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    
    fetch("https://mill-cart-application-backend.onrender.com/display_msg")
      .then((response) => response.json())
      .then((json) => this.setState({ message: json.display_msg }));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://mill-cart-application-backend.onrender.com/register", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.formData.userName,
        email: this.state.formData.email,
        companyName: this.state.formData.companyName,
        gst: this.state.formData.gstIn,
        password: this.state.formData.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => this.setState({ message: json.display_msg }));
  };

  render() {
    const { formData, message } = this.state;

    return (
      <div className="logc11" style={{ backgroundImage: `URL(${img3})` }}>
        <div className="logc22">
          <center>
            <h2> Register </h2>
          </center>
         
          <form onSubmit={this.handleSubmit}>
            <div className="inside2">
              <label>User Name: </label>
              <div>
                <input
                  name="userName"
                  type="text"
                  value={formData.userName}
                  onChange={this.handleChange}
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
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Company Name:</label>
                <div>
                  <input
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gst IN:</label>
                <div>
                  <input
                    name="gstIn"
                    type="text"
                    value={formData.gstIn}
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Confirm Password:</label>
                <div>
                  <input
                    type="password"
                    name="ConfirmPassword"
                    value={formData.ConfirmPassword}
                    onChange={this.handleChange}
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
          {message && <p>{message}</p>}
        </div>
        <div className="acc">
          <p>
            <center>
              Already have an account? <Link to="/Login">Login</Link>{" "}
            </center>
          </p>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
