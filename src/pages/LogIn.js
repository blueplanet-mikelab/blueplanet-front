import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import firebase from '../firebase/config';
import * as ROUTES from '../constants/routes';

import { RegisterLink } from './Register';
import { PasswordForgetLink } from './PasswordForget';
import LogInFacebook from '../components/authentication/LogInFacebook';
import LogInGoogle from '../components/authentication/LogInGoogle';

const LogInPage = () => (
  <div>
    <h1>Welcome Back</h1>
    <LogInForm />
    <RegisterLink />
    <PasswordForgetLink />
    <LogInFacebook />
    <LogInGoogle />
  </div>
);

const LogInLink = () => (
  <p>
    Already have an account? <Link to={ROUTES.LOGIN}>Sign In</Link>
  </p>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class LogInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      })
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="E-mail"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">SIGN IN</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const LogInForm = withRouter(LogInFormBase)

export default LogInPage;
export { LogInForm, LogInLink };