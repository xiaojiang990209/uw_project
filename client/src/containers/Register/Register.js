import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../ducks/session';
import { FormGroup, Input, Form, Button } from 'reactstrap';

import RegisterContainer from './components/RegisterContainer';
import RegisterFormWrapper from './components/RegisterFormWrapper';
import RegisterErrorContainer from './components/RegisterErrorContainer';
import * as _ from 'lodash';

let timeout;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      registerError: null,
    };
  }

  componentDidMount() {
    if (this.props.session.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.registerError !== this.state.registerError) {
      timeout = setTimeout(() => {
        this.setState({
          registerError: false,
        });
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(timeout);
  }

  handleFormChange = (e) => this.setState({ [e.target.name]: e.target.value });

  submitForm = (e) => {
    const { registerUser, history } = this.props;
    const { name, email, password, confirmPassword } = this.state;
    e.preventDefault();

    if (password !== confirmPassword) {
      this.setState({
        registerError: 'Please confirm the passwords are the same',
      });
      return;
    }

    registerUser(
      {
        name,
        email,
        password,
        confirmPassword,
      },
      history
    ).catch((err) => {
      const errText = JSON.stringify(_.get(err, ['response', 'data', 'error']));
      this.setState({
        registerError: errText,
      });
    });
  };

  render() {
    const { name, email, password, confirmPassword, registerError } = this.state;
    return (
      <RegisterContainer theme={this.props.theme}>
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
                value={confirmPassword}
                onChange={this.handleFormChange}
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
        {registerError && (
          <RegisterErrorContainer>
            <div>img {registerError}</div>
          </RegisterErrorContainer>
        )}
      </RegisterContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
