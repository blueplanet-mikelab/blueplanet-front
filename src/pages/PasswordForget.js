import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../firebase/config';
import * as ROUTES from '../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>Forget your Password?</h1>
    <PasswordForgetForm />
  </div>
)

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;

    firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      })
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="E-mail"
        />
        <button disabled={isInvalid} type="submit">Reset My Password</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };