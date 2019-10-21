import "./App.css";
import "./index.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import jwt_decode from 'jwt-decode';
// import setAuthToken from './utils/setAuthToken';
import { ThemeProvider } from "styled-components";

// import { setCurrentUser, logoutUser } from './actions/authActions';
import StoreProvider from "./contexts/StoreProvider";
import Register from "./containers/Register/Register";
import Login from "./containers/Register/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./components/dashboard";
import Course from "./containers/Course/Course";
import theme from "./theme";

import setAuthToken from './utils/setAuthToken';

class App extends Component {
  // componentDidMount() {
  //   if (localStorage.jwtToken) {
  //     const token = localStorage.jwtToken;
  //     setAuthToken(token);
  //     const decoded = jwt_decode(token);
  //     store.dispatch(setCurrentUser(decoded));
  //
  //     const currentTime = Date.now() / 1000;
  //     if (decoded.exp < currentTime) {
  //       store.dispatch(logoutUser());
  //       window.location.href = './login';
  //     }
  //   }
  // }

  render() {
    return (
      <StoreProvider history={this.props.history}>
        <ThemeProvider theme={theme}>
          <Router>
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/course" component={Course}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
          </Router>
        </ThemeProvider>
      </StoreProvider>
    );
  }
}

export default App;
