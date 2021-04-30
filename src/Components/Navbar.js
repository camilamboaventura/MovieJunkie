import React from "react";
import { Link } from "react-router-dom";

import popCornPicture from "../Images/Popcorn.png";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "black" }} className="navbar navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
          <img src={popCornPicture} className="logo-navbar" alt="Logo navbar" />{" "}
          MovieJunkie
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
