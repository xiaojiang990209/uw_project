import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import StoreProvider from "../../contexts/StoreProvider";
import PrivateRoute from "../../routes/PrivateRoute";
import theme from "../../theme";

import { menu_options } from '../../utils/constants';
import { MainContainer } from './components';

import Course from "../Course/Course";
import CourseDetail from "../Course/CourseDetail";
import CourseSubject from "../Course/CourseSubject";
import Dashboard from "../Dashboard";
import MatchableJoin from "../Matchable/MatchableJoin";
import MatchableCreate from "../Matchable/MatchableCreate";
import Navbar from "../Navbar/Navbar";
import Login from "../Register/Login";
import Register from "../Register/Register";

class App extends Component {
  render() {
    return (
      <StoreProvider history={this.props.history}>
        <ThemeProvider theme={theme}>
          <Router>
            <Navbar options={menu_options}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={Login}/>
            <MainContainer>
              <PrivateRoute exact path="/course" component={Course}/>
              <PrivateRoute exact path="/course/:subject" component={CourseSubject}/>
              <PrivateRoute exact path="/course/:subject/:catalog_number" component={CourseDetail}/>
              <PrivateRoute exact path='/matchable/join' component={MatchableJoin} />
              <PrivateRoute exact path='/matchable/create' component={MatchableCreate} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              </Switch>
            </MainContainer>
          </Router>
        </ThemeProvider>
      </StoreProvider>
    );
  }
}

export default App;
