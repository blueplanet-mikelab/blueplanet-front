import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined
  style={{ fontSize: '50px', margin: '100px', color: '#FB3640' }}
  spin
/>;

const SpinLoading = () => {
  return (
    <Spin indicator={antIcon} />
  )
}

export default SpinLoading;