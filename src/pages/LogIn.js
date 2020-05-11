import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useSession, signInWithEmailAndPassword } from '../auth/Auth';

import 'antd/dist/antd.css';
import '../css/login.css';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import * as ROUTES from '../constants/routes';

import LogInFacebook from '../components/login/LogInFacebook';
import LogInGoogle from '../components/login/LogInGoogle';

const LogInPage = () => {
  const { currentUser } = useSession()
  console.log(currentUser)
  if (currentUser) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className='container bg'>
      <div className='container form-box'>
        <Row className='form-header'>
          <p>Welcome Back!</p>
          <hr id='devider-hr' />
        </Row>
        <Row className='form-content'>
          <LogInForm />
          <hr id='devider-hr' />
        </Row>
        <Row className='form-social'>
          {/* <LogInFacebook /> */}
          <LogInGoogle />
        </Row>
      </div>
    </div>
  );
};

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
    signInWithEmailAndPassword(email, password)
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
      <Form
        name='normal_login'
        className='login-form'
        onSubmit={this.onSubmit}
      >
        <Row>
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
        </Row>
        <Row>
          <Form.Item>
            <Col span={12} id='remember-col'>
              <Form.Item name='remember' value='checked'>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} id='forget-col'>
              <Link className='login-form-forgot' to={ROUTES.PASSWORD_FORGET}>
                Forgot password
              </Link>
            </Col>
          </Form.Item>
        </Row>
        <Form.Item className='form-submit'>
          <Col span={24}>
            <Button htmlType='submit' className='login-form-button' disabled={isInvalid}>
              SIGN IN
              </Button>
          </Col>
          <Col span={24}>
            <p id='register-link'>
              Don’t have an Account? <Link id='link-register' to={ROUTES.REGISTER}>Register</Link>
            </p>
          </Col>
        </Form.Item>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const LogInForm = withRouter(LogInFormBase)

export default LogInPage;
export { LogInForm };