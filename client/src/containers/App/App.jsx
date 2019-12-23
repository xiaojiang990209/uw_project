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
import { MainContainer } from './components';
import CourseDisplay from "../Course/CourseDisplay";
import MatchedGroupDisplay from '../Matchable/MatchedGroupDisplay';

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
              <PrivateRoute exact path="/course/:term/:subject/:catalog_number" component={CourseDisplay} />
              <PrivateRoute exact path="/course" component={Course}/>
              <PrivateRoute exact path='/matchable/join' component={MatchableJoin} />
              <PrivateRoute exact path='/matchable/create' component={MatchableCreate} />
              <PrivateRoute exact path='/matchable/groups/:groupId' component={MatchedGroupDisplay} />
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
