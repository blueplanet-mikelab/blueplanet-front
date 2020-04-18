import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../css/passforget.css";

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Form, Input, Divider, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import firebase from '../firebase/config';
import * as ROUTES from '../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1 id="forgot-your-pass">Forget your Password?</h1>
    <PasswordForgetForm />
  </div>
)

const PasswordForgetLink = () => (
  <p id="form-forgot">
    <Link style={{ color: '#10828C' }} to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
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
      <div id="background-passForget" style={{ width: "302px" }}>
        <Form onSubmit={this.onSubmit}>
          <div id="inform">
            <p>Don’t worry,</p>
            <p>we will send you and email allowing you to reset it.</p>
          </div>
          <Form.Item name="email" id="email" style={{ left: "521px" }}>
            <Input
              id="input-email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="E-mail" />
          </Form.Item>
          <Button
            id="reset-btn"
            disabled={isInvalid}
            htmlType="submit"
            type="submit">Reset My Password
        </Button>
          {error && <p>{error.message}</p>}
        </Form>
      </div>
    )
  }
}

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };