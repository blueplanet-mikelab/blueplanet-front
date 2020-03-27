import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

import "../../css/loginFacebook.css";

import { signInWithFacebook } from '../../firebase/actions';
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

    signInWithFacebook()
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
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