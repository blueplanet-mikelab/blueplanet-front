import React, { Component, useContext } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { AuthContext, signUpWithEmailAndPassword } from '../auth/Auth';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Form, Input, Divider, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

import * as ROUTES from '../constants/routes';

import "../css/register.css";

import { LogInLink } from './LogIn';
import LogInFacebook from '../components/login/LogInFacebook';
import LogInGoogle from '../components/login/LogInGoogle';

const RegisterPage = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to={ROUTES.HOME} />;
  };

  return (
    <div>
      <h1 id="head-create">Create your Account</h1>
      <RegisterForm />
      <LogInLink />
      <LogInFacebook />
      <LogInGoogle />
    </div>
  );
}

const RegisterLink = () => (
  <p id="register">
    Don't have an account? <Link id="link-regis" to={ROUTES.REGISTER}>Register</Link>
    <Divider />
  </p>

);

const INITIAL_STATE = {
  displayName: '',
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

    const { z, email, password } = this.state;
    const newUser = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.password
    };

    signUpWithEmailAndPassword(newUser)
      .then(() => {
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
      displayName,
      email,
      password,
      confirmPassword,
      error
    } = this.state;

    const isInvalid = password !== confirmPassword || password === '' || email === '' || displayName === '';

    return (
      <div id="background-regis" style={{ width: "302px" }}>
        <Form onSubmit={this.onSubmit}>
          <Form.Item name="displayName" id="displayName" style={{ left: "390px" }}>
            <Input
              id="input-displayname"
              prefix={<UserOutlined className="site-form-item-icon" />}
              name="displayName"
              value={displayName}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name" />
          </Form.Item>
          <Form.Item name="email" id="email" style={{ left: "390px" }}>
            <Input
              id="input-email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="E-mail" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password
              id="input-password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="confirmPassword">
            <Input.Password
              id="input-confirmpassword"
              prefix={<LockOutlined className="site-form-item-icon" />}
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              id="register-btn"
              lassName="login-form-button"
              disabled={isInvalid}
              htmlType="submit"
              type="submit">REGISTER
            </Button>
          </Form.Item>
          {error && <p>{error.message}</p>}
        </Form>
      </div>
    );
  }
}

const RegisterForm = withRouter(RegisterFormBase);

export default RegisterPage;
export { RegisterForm, RegisterLink };