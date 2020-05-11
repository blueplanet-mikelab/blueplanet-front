import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import { useSession, signOut } from '../auth/Auth';

import 'antd/dist/antd.css';
import '../css/navigation.css';
import { Menu, Row, Col } from 'antd';
import logo from "../images/orbit.png";

const Navigation = () => {
  const { currentUser } = useSession()

  return (
    <Row className='header-container'>
      <Col span={12} className='logo'>
        <Link to={ROUTES.HOME} style={{ color: 'white' }}>
          <img alt='blueplanetLogo' src={logo} /> &nbsp;&nbsp; BluePlanet
              </Link>
      </Col>
      <Col span={12}>
        <Menu mode='horizontal'>
          <Menu.Item>
            <Link to={ROUTES.HOME}>Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={ROUTES.FORUMS}>Forums</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={ROUTES.PROFILE}>My Triplist</Link>
          </Menu.Item>
          <Menu.Item>
            {currentUser
              ? <Link to={ROUTES.HOME} onClick={async () => {
                await signOut();
                window.location.reload(false);
              }}>
                Log Out
                </Link>
              : <Link to={ROUTES.LOGIN}>Log In</Link>}
          </Menu.Item>
          <Menu.Item>
            <Link to={'/'}>EN / TH</Link>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  )
}

export default Navigation;