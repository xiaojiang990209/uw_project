import "./App.css";
import "./index.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import StoreProvider from "./contexts/StoreProvider";
import Register from "./containers/Register/Register";
import Login from "./containers/Register/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./containers/Dashboard";
import Course from "./containers/Course/Course";
import Navbar from "./containers/Navbar/Navbar";
import MatchableJoin from "./containers/Matchable/MatchableJoin";
import theme from "./theme";
import { menu_options } from './utils/constants';

const Container = styled.div`
  width: 75%;
  margin: ${({theme}) => theme.unit.large}px auto;
`;

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
