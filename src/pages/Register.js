import React, { Component, useContext } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/Auth';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Divider } from 'antd';

import * as ROUTES from '../constants/routes';
import { signUpWithEmailAndPassword } from '../firebase/actions';

import { LogInLink } from './LogIn';
import LogInFacebook from '../components/logging/LogInFacebook';
import LogInGoogle from '../components/logging/LogInGoogle';

const RegisterPage = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to={ROUTES.HOME} />;
  };
  return (
    <div>
    <h1>Create your Account</h1>
    <RegisterForm />
    <LogInLink />
    <LogInFacebook />
    <LogInGoogle />
  </div>
  );
}

const RegisterLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.REGISTER}>Register</Link>
    <Divider />
  </p>

);

const INITIAL_STATE = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: null
}

class RegisterFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { z, email, password } = this.state;
    const newUser = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.password
    };

    signUpWithEmailAndPassword(newUser)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      error
    } = this.state;

    const isInvalid = password !== confirmPassword || password === '' || email === '' || displayName === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="displayName"
          value={displayName}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="E-Mail"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="confirmPassword"
          value={confirmPassword}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />

        <button disabled={isInvalid} type="submit">REGISTER</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const RegisterForm = withRouter(RegisterFormBase);

export default RegisterPage;
export { RegisterForm, RegisterLink };