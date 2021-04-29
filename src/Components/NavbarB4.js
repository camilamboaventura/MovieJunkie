import React from "react";
import { Link } from "react-router-dom";

import popCornPicture from "../Images/Popcorn.png";

function NavbarB4() {
  return (
    <nav style={{ backgroundColor: "black" }} className="navbar navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
          <img src={popCornPicture} className="logo-navbar" alt="Logo navbar" />{" "}
          Home
        </Link>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="d-flex field is-grouped">
              <p className="control">
                <Link to="/login" className="bd-tw-button button is-dark">
                  <span>LogIn</span>
                </Link>
              </p>
              <p className="control" style={{ marginLeft: "10px" }}>
                <Link to="/signup" className="button is-success">
                  <span>SignUp</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarB4;
