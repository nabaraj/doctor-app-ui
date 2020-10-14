import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';

import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import NoMatch from "./pages/nomatch";
import Login from "./pages/login";
import './scss/app.scss';
import Registration from "./pages/registration";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showShareBox: false,
    };
  }
  render() {
    return (
      <main>
      <CssBaseline/>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />
          <Route exact path={`${process.env.PUBLIC_URL}/registration`} component={Registration} />
          <Route exact path={`${process.env.PUBLIC_URL}/home`} component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    );
  }
}
