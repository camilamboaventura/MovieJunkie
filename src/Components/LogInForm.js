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
      <div className="container columns is-mobile mt-6">
        <form
          className="column is-half is-offset-one-quarter"
          onSubmit={this.handleSubmit}
        >
          {/* Username */}
          <div className="field">
            <label className="label">Username</label>

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

export default LogInForm;
