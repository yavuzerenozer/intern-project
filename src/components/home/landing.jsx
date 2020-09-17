import React, { Component } from "react";
import bg from "./login.png";
import inst from "./instructions.png";
import logo from "./logo1.png";

class Home extends Component {
  handleLogin = () => {
    let props = this.props;
    window.JF.init({
      appName: "Maps",
      accessType: "full",
    });

    window.JF.login(
      () => {
        let japiKey = window.JF.getAPIKey();
        window.japiKey = japiKey;
        window.JF.getUser((response) => {
          window.JFUserInfo = response;
          window.jusername = response.username;
        });
        props.handleLog();
        props.history.replace("/select-confirm");
      },
      function error() {
        window.alert("Could not authorize user");
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-none navbar-light ml-5 mr-5 mt-3 ">
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
              className="collapse navbar-collapse justify-content-end mt-4"
              id="collapsibleNavbar"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="http://localhost:3000/sample">
                    <h2 className="display-heading2">Sample JotMap |</h2>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://www.jotform.com/contact/"
                  >
                    <h2 className="display-heading2">JotMap Help</h2>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <br />

          <div className="row hero">
            <div className="col-md-7">
              <h1 className="display-heading">
                Create a map from your JotForm submissions.
              </h1>
              <h2 className="">
                <small className="text-muted">
                  To create a Jotmap, you'll need Jotform submissions with
                  address fields.
                </small>
              </h2>
              <h2 className="">
                <small className="text-muted ">
                  Your Jotform submissions will be mapped.
                </small>
              </h2>
              <hr />
              <img src={inst} alt="Instructions" style={{ height: "200px" }} />
              <hr />
              <button
                onClick={this.handleLogin}
                className="btn btn-success btn-lg"
              >
                Authorize JotMap
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
