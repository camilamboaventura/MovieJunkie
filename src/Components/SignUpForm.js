import React, { Component } from "react";
import axios from "axios";
import history from "../history";

class SignUpForm extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    termsAgreement: false,
    toWatchList: [],
    watchedList: [],
    waitingNewSeasonList: [],
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCancelButton = () => {
    history.push(`/${this.props.match.params.id}`);
  };

  // ao criar o usuário e dar o submit, o usuário é criado na API IronRest
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://ironrest.herokuapp.com/MovieJunkie",
        this.state
      );
      const responseUsername = await axios.get(
        "https://ironrest.herokuapp.com/MovieJunkie"
      );
      const userbyName = responseUsername.data.filter(
        (databaseUser) => databaseUser.username === this.state.username
      );
      history.push(`/${userbyName[0]._id}`);
      this.props.handleLogIn(true);
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
              placeholder="Choose your Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          {/* Username */}
          {/* E-mail */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              className="form-control"
              type="email"
              placeholder="Your e-mail"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          {/* E-mail */}
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

export default SignUpForm;
