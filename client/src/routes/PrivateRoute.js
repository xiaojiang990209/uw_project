import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, session, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      session.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps)(PrivateRoute);
