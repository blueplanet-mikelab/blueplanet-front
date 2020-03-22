import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import "../css/login.css";

import firebase from '../firebase/config';
import * as ROUTES from '../constants/routes';

import { RegisterLink } from './Register';
import { PasswordForgetLink } from './PasswordForget';
import LogInFacebook from '../components/authentication/LogInFacebook';
import LogInGoogle from '../components/authentication/LogInGoogle';

const LogInPage = () => (
  <div>
    <h1 id="welcome-login">Welcome Back</h1>
    <LogInForm />
    <RegisterLink />
    <PasswordForgetLink />
    <LogInFacebook />
    <LogInGoogle />
  </div>
);

const LogInLink = () => (
  <p>
    Already have an account? <Link to={ROUTES.LOGIN}>Sign In</Link>
  </p>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class LogInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      })
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';
    return (
      <div>
        <Form
          onSubmit={this.onSubmit}
          name="normal_login"
          className="login-form">
          <Form.Item name="email">
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="E-mail" />
          </Form.Item>
          <Form.Item name="password">
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox
                    id="remember">
                    <span id="label-remember">Remember me</span></Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <a id="login-form-forgot" href="">
                  Forgot password?
                </a>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button
              id="sign-in"
              lassName="login-form-button"
              disabled={isInvalid}
              htmlType="submit"
              type="submit">SIGN IN
            </Button>
          </Form.Item>
          {error && <p>{error.message}</p>}
        </Form>
      </div>
    );
  }
}


const LogInForm = withRouter(LogInFormBase)

export default LogInPage;
export { LogInForm, LogInLink };