import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "#141414" }} className="navbar navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
        <i className="fas fa-video homeLogo"> Home </i>
        </Link>
        {/* <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <Link to="/login" className="bd-tw-button button is-dark">
                  <span>Login</span>
                </Link>
              </p>
              <p className="control">
                <Link to="/signup" className="button is-success">
                  <span>Signup</span>
                </Link>
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
