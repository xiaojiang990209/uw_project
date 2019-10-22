import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../ducks/session';
import { Form, Input, FormGroup, Button } from 'reactstrap';
import * as _ from 'lodash';
import RegisterContainer from './components/RegisterContainer';
import RegisterFormWrapper from './components/RegisterFormWrapper';
import RegisterErrorContainer from './components/RegisterErrorContainer';

let timeout;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loginError: null,
    };
  }

  componentDidMount() {
    if (this.props.session.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.loginError !== this.state.loginError) {
      timeout = setTimeout(() => {
        this.setState({
          loginError: false,
        });
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(timeout);
  }

  handleFormChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    const { email, password } = this.state;
    const { loginUser, history } = this.props;
    e.preventDefault();
    loginUser(
      {
        email,
        password,
      },
      history
    ).catch((err) => {
      const errText = _.get(err, ['response', 'data', 'error']);
      this.setState({
        loginError: errText,
      });
    });
  };

  render() {
    const { email, password, loginError } = this.state;

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
                type="email"
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
        {loginError && (
          <RegisterErrorContainer>
            <div>img {loginError}</div>
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
  { loginUser }
)(Login);
