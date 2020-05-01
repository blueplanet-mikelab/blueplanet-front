import React from 'react';
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.css';
import '../../css/loginSocial.css';
import { Button } from 'antd';

import { signInWithGoogle } from '../../auth/Auth';

const onClick = (event) => {
  event.preventDefault();
  signInWithGoogle()
};

const LogInGoogle = () => {
  return (
    <Button id='login-google' type='submit' onClick={onClick}>
      <div className='container'>
        <img id='icon-google' alt='google' src='https://img.icons8.com/color/48/000000/google-logo.png' />
        <p>Sign In with Google</p>
      </div>
    </Button>
  )
}

export default withRouter(LogInGoogle);