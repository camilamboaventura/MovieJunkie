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
      this.props.handleLogIn(true);
      history.push(`/${this.state.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="container d-flex justify-content-center">
        <form onSubmit={this.handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>

            <div className="control has-icons-left has-icons-right">
              <input
                name="username"
                className="input"
                type="text"
                placeholder="Choose your Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          {/* Username */}
          {/* E-mail */}
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                name="email"
                className="input"
                type="email"
                placeholder="Your e-mail"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          {/* E-mail */}
          {/* Password */}
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                name="password"
                className="input"
                type="password"
                placeholder="password input"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          {/* Password */}
          {/* Buttons */}
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                Submit
              </button>
            </div>
            <div className="control">
              <button
                onClick={this.handleCancelButton}
                className="button is-link is-light"
              >
                Cancel
              </button>
            </div>
          </div>
          {/* Buttons */}
        </form>
      </div>
    );
  }
}

export default SignUpForm;
