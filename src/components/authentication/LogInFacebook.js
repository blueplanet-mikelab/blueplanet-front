import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

import "../../css/loginFacebook.css";

import firebase from '../../firebase/config';
import * as ROUTES from '../../constants/routes';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

class LogInFacebook extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = (event) => {
    event.preventDefault();

    var provider = new firebase.auth.FacebookAuthProvider();
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
        <Button id="login-facebook" type="submit">
          <IconFont
            id="icon-facebook"
            type="icon-facebook"
            style={{ fontSize: '32px' }} />Sign In with Facebook</Button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default withRouter(LogInFacebook);