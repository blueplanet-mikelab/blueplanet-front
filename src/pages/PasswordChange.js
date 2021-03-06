import React, { Component } from 'react';

import firebase from '../firebase/config';

const INITIAL_STATE = {
  password: '',
  confirmPassword: '',
  error: null
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { password } = this.state;

    firebase.auth().currentUser
      .updatePassword(password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { password, confirmPassword, error } = this.state;

    const isInvalid = password !== confirmPassword || password === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="confirmPassword"
          value={confirmPassword}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">Reset My Password</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default PasswordChangeForm;