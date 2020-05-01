import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../auth/Auth';

import '../css/passforget.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Row, Col, Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import * as ROUTES from '../constants/routes';

const PasswordForgetPage = () => (
  <div className='container bg'>
    <div className='container form-box' id='forgot-box'>
      <Row className='form-header'>
        <p>Forgot your Password?</p>
        <hr id='devider-hr' />
      </Row>
      <Row className='form-content'>
        <PasswordForgetForm />
      </Row>
    </div>
  </div>
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

    sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
      <Form
        className='forgot-form'
        onSubmit={this.onSubmit}
      >
        <p id='inform'>
          Don’t worry,<br />
          we will send you and email allowing you to reset it.
        </p>
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
        </Row>
        <Form.Item className='form-submit'>
          <Col span={24}>
            <Button htmlType='submit' className='forgot-button' disabled={isInvalid}>
              Reset my Password
              </Button>
          </Col>
          <Col span={24}>
            <p id='login-link'>
              Remember your Password? <Link id='link-login' to={ROUTES.LOGIN}>Sign In</Link>
            </p>
          </Col>
        </Form.Item>
        {error && <p>{error.message}</p>}
      </Form>
    )
  }
}

export default PasswordForgetPage;

export { PasswordForgetForm };