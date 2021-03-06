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
import MatchableSubjectGroup from "../Matchable/MatchableGroups/MatchableSubjectGroup";
import UserMatchableGroups from "../Matchable/UserGroups";
import MatchableCourseGroup from "../Matchable/MatchableGroups/MatchableCourseGroup";
import MatchableCreate from "../Matchable/CreateMatchableGroup";
import MatchedGroupDisplay from '../Matchable/MatchableGroups/MatchedGroupDisplay';
import Navbar from "../../components/Navbar";
import Landing from "../Landing";
import News from "../ListPage/News";
import InfoSession from "../ListPage/InfoSession";
import FavouriteCourse from "../ListPage/FavouriteCourse";
import Login from "../Register/Login";
import Register from "../Register/Register";
import FBPost from '../ListPage/FBPost';
import UserProfile from '../User/UserProfile';

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
              <PrivateRoute exact path='/matchable/groups' component={MatchableSubjectGroup} />
              <PrivateRoute exact path='/matchable/groups/subject/:subject' component={MatchableCourseGroup} />
              <PrivateRoute exact path='/matchable/create' component={MatchableCreate} />
              <PrivateRoute exact path='/matchable/my-groups' component={UserMatchableGroups} />
              <PrivateRoute exact path='/matchable/groups/:groupId' component={MatchedGroupDisplay} />
              <PrivateRoute exact path='/user' component={UserProfile} />
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
