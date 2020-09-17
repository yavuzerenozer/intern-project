import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home/landing";
import Sample from "./components/home/sample";
import Steps from "./components/stepper/steps";
import Maps from "./components/maps/maps";
import NotFound from "./components/home/notfound";

class App extends Component {
  state = { isLoggedIn: 0 };

  handleLog = () => {
    this.setState({ isLoggedIn: 1 });
  };
  render() {
    return (
      <div>
        <Switch>
          <Route path="/sample" component={Sample} />
          <Route path="/maps/:mapID?" component={Maps} />
          <Route
            path="/select-confirm"
            component={(props) => (
              <Steps isLoggedIn={this.state.isLoggedIn} {...props} />
            )}
          />
          <Route path="/not-found" component={NotFound} />
          <Route
            path="/"
            exact
            component={(props) => (
              <Home handleLog={this.handleLog} {...props} />
            )}
          />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
