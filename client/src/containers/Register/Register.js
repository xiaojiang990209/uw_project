import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { FormGroup, Input, Form, Button } from 'reactstrap';

import RegisterContainer from './components/RegisterContainer';
import RegisterFormWrapper from './components/RegisterFormWrapper';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleFormChange = (e) => this.setState({ [e.target.name]: e.target.value });

  submitForm = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;
    return (
      <RegisterContainer theme={this.props.theme}>
        <h3>UW Project</h3>
        <RegisterFormWrapper>
          <Form onSubmit={this.submitForm}>
            <FormGroup>
              <Input
                className="form-input"
                name="name"
                onChange={this.handleFormChange}
                value={name}
                type="text"
                required
                placeholder="Name"
                minLength="3"
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="form-input"
                type="email"
                name="email"
                onChange={this.handleFormChange}
                value={email}
                required
                placeholder="Email Address"
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="form-input"
                type="password"
                name="password"
                value={password}
                onChange={this.handleFormChange}
                required
                placeholder="Password"
                minLength="6"
              />
            </FormGroup>
            <FormGroup>
              <Input
                className="form-input"
                name="confirmPassword"
                type="password"
                onChange={this.handleFormChange}
                value={confirmPassword}
                required
                placeholder="Confirm Your Password"
              />
            </FormGroup>
            <div className="row">
              <div className="col-6 auth__link">
                <Link to="/login">Have an account?</Link>
              </div>
              <div className="col-6">
                <Button color="primary" outline type="submit">
                  Create Account
                </Button>
              </div>
            </div>
          </Form>
        </RegisterFormWrapper>
      </RegisterContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
