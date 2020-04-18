import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
import { AuthContext, signOut } from '../auth/Auth';

import 'antd/dist/antd.css';
import "../css/head.css";
import { Menu } from 'antd';
import logo from "../images/orbit.png";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='header-container'>
      <Menu mode='horizontal'>
        <Menu.Item style={{ float: 'left' }}>
          <div className='logo'>
            <Link to={ROUTES.HOME} style={{ color: 'white' }}>
              <img alt='blueplanetLogo' src={logo} /> &nbsp;&nbsp; BluePlanet
              </Link>
          </div>
        </Menu.Item>
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
            ? <Link to={ROUTES.HOME} onClick={() => signOut()}>Log Out</Link>
            : <Link to={ROUTES.LOGIN}>Log In</Link>}
        </Menu.Item>
        <Menu.Item>
          <Link to={'/'}>EN / TH</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navigation;