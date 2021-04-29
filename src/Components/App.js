import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "../history";

import Navbar from "./Navbar";
import NavbarB4 from "./NavbarB4";
import Home from "./Home";
import SeeMoreDetails from "./SeeMoreDetails";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  handleLogIn = (isLoggedIn) => {
    this.setState({ isLoggedIn: isLoggedIn });
  };

  render() {
    return (
      <div className="App">
        <Router history={history}>
          {this.state.isLoggedIn ? (
            <Route path="/:id" component={Navbar} />
          ) : (
            <Route path="/" component={NavbarB4} />
          )}
          <Switch>
            {this.state.isLoggedIn ? (
              <Route exact path="/:id" component={Home} />
            ) : (
              <Route exact path="/" component={Home} />
            )}
            <Route exact path="/login">
              <LogInForm
                handleLogIn={this.handleLogIn}
                // history={this.props.history}
              />
            </Route>
            <Route exact path="/signup">
              <SignUpForm
                handleLogIn={this.handleLogIn}
                // history={this.props.history}
              />
            </Route>
            <Route path="/details/:location/:id" component={SeeMoreDetails} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
