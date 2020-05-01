import React, { Component, useContext } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { AuthContext, signUpWithEmailAndPassword } from '../auth/Auth';

import 'antd/dist/antd.css';
import '../css/register.css';
import { Row, Col, Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

import * as ROUTES from '../constants/routes';

import LogInFacebook from '../components/login/LogInFacebook';
import LogInGoogle from '../components/login/LogInGoogle';

const RegisterPage = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to={ROUTES.HOME} />;
  };

  return (
    <div className='container bg'>
      <div className='container form-box' id='register-box'>
        <Row className='form-header'>
          <p>Create your Account</p>
          <hr id='devider-hr' />
        </Row>
        <Row className='form-content'>
          <RegisterForm />
          <hr id='devider-hr' />
        </Row>
        <Row className='form-social'>
          <LogInFacebook />
          <LogInGoogle />
        </Row>
      </div>
    </div>
  );
}

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

    const { displayName, email, password } = this.state;
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
    const { displayName, email, password, confirmPassword, error } = this.state;
    const isInvalid = password !== confirmPassword || password === '' || email === '' || displayName === '';

    return (
      <Form
        className='register-form'
        onSubmit={this.onSubmit}
      >
        <Row>
          <Form.Item
            name='displayName' rules={[{ required: true, message: 'Full Name is required.' }]}
          >
            <Input
              name='displayName'
              value={displayName}
              prefix={<UserOutlined className='site-form-item-icon' />}
              type='text'
              placeholder='Full Name'
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item
            name='email' rules={[{ required: true, message: 'E-Mail is required.' }]}
          >
            <Input
              name='email'
              value={email}
              prefix={<MailOutlined className='site-form-item-icon' />}
              type='email'
              placeholder='E - Mail'
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item
            name='password' rules={[{ required: true, message: 'Password is required.' }]}
          >
            <Input
              name='password'
              value={password}
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item
            name='confirmPassword' rules={[{ required: true, message: 'Confirm Password is required.' }]}
          >
            <Input
              name='confirmPassword'
              value={confirmPassword}
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Confirm Password'
              onChange={this.onChange}
            />
          </Form.Item>
        </Row>
        <Form.Item className='form-submit'>
          <Col span={24}>
            <Button htmlType='submit' className='register-form-button' disabled={isInvalid}>
              REGISTER
              </Button>
          </Col>
          <Col span={24}>
            <p id='login-link'>
              Already have an Account? <Link id='link-login' to={ROUTES.LOGIN}>Sign In</Link>
            </p>
          </Col>
        </Form.Item>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const RegisterForm = withRouter(RegisterFormBase);

export default RegisterPage;
export { RegisterForm };