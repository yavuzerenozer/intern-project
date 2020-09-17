import React from "react";
import logo from "../home/logo1.png";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-none navbar-expand-lg navbar-light mt-2">
        <a className="navbar-brand" href="http://localhost:3000">
          <img src={logo} width="200" alt=""></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end mt-2"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000/sample">
                <h2 className="display-heading2">Sample JotMap |</h2>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.jotform.com/contact/">
                <h2 className="display-heading2">JotMap Help</h2>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <br />
    </div>
  );
};

export default Navbar;
