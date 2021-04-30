import React, { Component } from "react";
import axios from "axios";
import history from "../history";

class LogInForm extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCancelButton = () => {
    history.push(`/${this.props.match.params.id}`);
  };

  // procura o usuário na API IronRest e verifica se a senha está correta
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseUsername = await axios.get(
        "https://ironrest.herokuapp.com/MovieJunkie"
      );
      const userbyName = responseUsername.data.filter(
        (databaseUser) => databaseUser.username === this.state.username
      );
      if (userbyName.length > 0) {
        if (
          parseInt(userbyName[0].password) === parseInt(this.state.password)
        ) {
          history.push(`/${userbyName[0]._id}/`);
          this.props.handleLogIn(true);
        } else {
          window.alert("Wrong username or password!");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="container d-flex justify-content-center mt-5">
        <form onSubmit={this.handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              className="form-control"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          {/* Username */}
          {/* Password */}
          <div className="mb-4">
            <label className="label">Password</label>
            <input
              name="password"
              className="form-control"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          {/* Password */}

          {/* Buttons */}

          <div className="d-flex justify-content-around">
            <button className="btn btn-success" type="submit">
              Submit
            </button>
            <button
              onClick={this.handleCancelButton}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>

          {/* Buttons */}
        </form>
      </div>
    );
  }
}

export default LogInForm;
