import "./App.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import StoreProvider from "../../contexts/StoreProvider";
import Register from "../../containers/Register/Register";
import Login from "../../containers/Register/Login";
import PrivateRoute from "../../routes/PrivateRoute";
import Dashboard from "../../containers/Dashboard";
import Course from "../../containers/Course/Course";
import Navbar from "../../containers/Navbar/Navbar";
import MatchableJoin from "../../containers/Matchable/MatchableJoin";
import MatchableCreate from "../../containers/Matchable/MatchableCreate";
import theme from "../../theme";
import { menu_options } from '../../utils/constants';
import { Container } from './components';

class App extends Component {
  render() {
    return (
      <StoreProvider history={this.props.history}>
        <ThemeProvider theme={theme}>
          <Router>
            <Navbar options={menu_options}/>
            <Container>
              <Route exact path="/" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <PrivateRoute exact path="/course" component={Course}/>
              <PrivateRoute exact path='/matchable/join' component={MatchableJoin} />
              <PrivateRoute exact path='/matchable/create' component={MatchableCreate} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              </Switch>
            </Container>
          </Router>
        </ThemeProvider>
      </StoreProvider>
    );
  }
}

export default App;