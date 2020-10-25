import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';

import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import NoMatch from "./pages/nomatch";
import Patient from "./pages/patient/Patient";
import Login from "./pages/login";
import DisplayPatient from "./pages/DisplayPatient";
import './scss/app.scss';
import Registration from "./pages/registration";

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#007066",
    },
  },
});
theme.background= 'linear-gradient(0deg, #006351 0%, #007066 100%)'
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
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />
          <Route exact path={`${process.env.PUBLIC_URL}/registration`} component={Registration} />
          <Route exact path={`${process.env.PUBLIC_URL}/home`} component={Home} />
          <Route exact path={`${process.env.PUBLIC_URL}/patient`} component={Patient} />
          <Route exact path={`${process.env.PUBLIC_URL}/patient/:id`} component={DisplayPatient} />
          <Route component={NoMatch} />
        </Switch>
        </ThemeProvider>
      </main>
    );
  }
}
