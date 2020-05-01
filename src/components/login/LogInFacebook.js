import React from 'react';
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.css';
import '../../css/loginSocial.css';
import { Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

import { signInWithFacebook } from '../../firebase/actions';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const onClick = (event) => {
  event.preventDefault();
  signInWithFacebook()
};

const LogInFacebook = () => {
  return (
    <Button id='login-facebook' type='submit' onClick={onClick}>
      <div className='container'>
        <IconFont
          id='icon-facebook'
          type='icon-facebook'
        />
        <p>Sign In with Facebook</p>
      </div>
    </Button>
  )
}

export default withRouter(LogInFacebook);