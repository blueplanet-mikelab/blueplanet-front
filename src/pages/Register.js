import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import firebase from '../firebase/config';
import * as ROUTES from '../constants/routes';

import { LogInLink } from './LogIn';
import LogInFacebook from '../components/authentication/LogInFacebook';
import LogInGoogle from '../components/authentication/LogInGoogle';

import axios from 'axios';
const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const RegisterPage = () => (
  <div>
    <h1>Create your Account</h1>
    <RegisterForm />
    <LogInLink />
    <LogInFacebook />
    <LogInGoogle />
  </div>
)

const RegisterLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.REGISTER}>Register</Link>
  </p>
);

const INITIAL_STATE = {
  fullName: '',
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

    const { fullName, email, password } = this.state;
    const newUser = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password
    };
    axios.post(`http://${backend_url}/users/register`, newUser)

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
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
      fullName,
      email,
      password,
      confirmPassword,
      error
    } = this.state;

    const isInvalid = password !== confirmPassword || password === '' || email === '' || fullName === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="fullName"
          value={fullName}
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