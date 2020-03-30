import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { signOut } from '../../firebase/actions';
import * as ROUTES from '../../constants/routes';

class LogOut extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    signOut()
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

export default withRouter(LogOut);