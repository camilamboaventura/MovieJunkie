import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import history from "../history";

import Navbar from "./Navbar";
import NavbarB4 from "./NavbarB4";
import Home from "./Home";
import Footer from "./Footer";
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
            <Switch>
              <Route path="/:userId" component={Navbar} />
              <Route path="/:userId/:whatever" component={Navbar} />
            </Switch>
          ) : (
            <Route path="/" component={NavbarB4} />
          )}
          <Switch>
            {this.state.isLoggedIn ? (
              <Route exact path="/:userId" component={Home} />
            ) : (
              <Route exact path="/" component={Home} />
            )}
            {this.state.isLoggedIn ? (
              <Route
                path="/:userId/details/:location/:id"
                component={SeeMoreDetails}
              />
            ) : (
              <Route path="/details/:location/:id" component={SeeMoreDetails} />
            )}
            <Route exact path="/login">
              <LogInForm
                handleLogIn={this.handleLogIn}
                history={this.props.history}
              />
            </Route>
            <Route exact path="/signup">
              <SignUpForm
                handleLogIn={this.handleLogIn}
                history={this.props.history}
              />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
