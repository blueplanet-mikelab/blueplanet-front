import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import firebase from '../../firebase/config';
import * as ROUTES from '../../constants/routes';

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        this.props.history.push(ROUTES.HOME);
      });
  }

  render() {
    return (
      <p onClick={this.onClick}>Log Out</p>
    )
  }
}

export default withRouter(Logout);