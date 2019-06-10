import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../../actions/authActions";
//import './App.css';
//import Menu from '../Menu/Menu'
import { Provider } from 'react-redux';
import store from '../../store'

import NavBar from '../NavBar';
import Landing from '../Landing';
import Register from '../Register';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import Dashboard from '../dashboard';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <NavBar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
   )
  }
}


/*
const App = ({children}) =>
  <div className='flex-container'>
    <Menu />
    <div id="main-content">
      {children}
    </div>
  </div>
*/

export default App;
