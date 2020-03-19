import React from 'react';
import { Link } from 'react-router-dom';

import LogOutButton from './user/Logout';
import * as ROUTES from '../constants/routes';

import 'antd/dist/antd.css';
import "../css/head.css";
import { Menu } from 'antd';
import logo from "../images/orbit.png";

const Navigation = ({ authUser }) => {
  return (
    <div className='header-container'>
      <Link to={ROUTES.HOME}>
        <div className="logo">
          <img alt="blueplanetLogo" src={logo} style={{ width: '30px', height: '30px', marginRight: '5px' }} />
          BluePlanet
    </div>
      </Link>
      <Menu
        theme="light"
        mode="horizontal"
        // defaultSelectedKeys={[this.props.page]}
        style={{ lineHeight: '50px' }}
        className="menu-tabs"
      >
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
          {authUser ? <LogOutButton /> : <Link to={ROUTES.LOGIN}>Log In</Link>}
        </Menu.Item>
        <Menu.Item>
          <Link to={'/'}>EN / TH</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navigation;