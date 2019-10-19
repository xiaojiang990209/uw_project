import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { Form, Input, FormGroup, Button } from 'reactstrap';

import RegisterContainer from './components/RegisterContainer';
import RegisterFormWrapper from './components/RegisterFormWrapper';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleFormChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };

  render() {
    const { email, password } = this.state;

    return (
      <RegisterContainer theme={this.props.theme}>
        <h3>UW Project</h3>
        <RegisterFormWrapper>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                className="form-input"
                onChange={this.handleFormChange}
                value={email}
                name="email"
                type="text"
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
            <div className="row">
              <div className="col-8 auth__link">
                <Link to="/register">Don't have an account ?</Link>
              </div>
              <div className="col-4">
                <Button outline color="primary" type="submit">
                  Sign in
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
  { loginUser }
)(Login);
