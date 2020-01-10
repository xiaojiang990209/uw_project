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
import MatchableJoin from "../Matchable/MatchableJoin";
import MatchableCreate from "../Matchable/MatchableCreate";
import MatchedGroupDisplay from '../Matchable/MatchedGroupDisplay';
import Navbar from "../../components/Navbar";
import Landing from "../Landing";
import News from "../ListPage/News";
import InfoSession from "../ListPage/InfoSession";
import FavouriteCourse from "../ListPage/FavouriteCourse";
import Login from "../Register/Login";
import Register from "../Register/Register";
import ComingSoon from '../../components/ComingSoon'
import FBPost from '../ListPage/FBPost';

class App extends Component {
  render() {
    return (
      <StoreProvider history={this.props.history}>
        <ThemeProvider theme={theme}>
          <Router>
            <MainContainer>
              <Navbar options={menu_options} history={this.props.history}/>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              <PrivateRoute exact path='/matchable/join' component={ComingSoon} />
              <PrivateRoute exact path='/matchable/create' component={ComingSoon} />
              <PrivateRoute exact path='/matchable/groups/:groupId' component={MatchedGroupDisplay} />
              <Route exact path="/news" component={News} />
              <Route exact path="/infosession" component={InfoSession} />
              <Route exact path="/posts/:type/:city" component={FBPost}/>
              <Switch>
                <Route exact path="/course" component={Course}/>
                <PrivateRoute exact path="/course/favourite" component={FavouriteCourse} />
                <Route exact path="/course/:subject" component={CourseSubject}/>
                <Route exact path="/course/:subject/:catalog_number" component={CourseDetail}/>
              </Switch>
            </MainContainer>
          </Router>
        </ThemeProvider>
      </StoreProvider>
    );
  }
}

export default App;
