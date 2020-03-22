import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';

import "../../css/loginGoogle.css";

import firebase from '../../firebase/config';
import * as ROUTES from '../../constants/routes';

class LogInGoogle extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = (event) => {
    event.preventDefault();

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((socialAuthUser) => {
        // var token = socialAuthUser.credential.accessToken;
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);

        return firebase.auth()
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email
          })
      })
      .catch((error) => {
        this.setState({ error });
      })
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <Button id="login-google" type="submit">
          <img id="icon-google" src="https://img.icons8.com/color/48/000000/google-logo.png" />
          Sign In with Google</Button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default withRouter(LogInGoogle);