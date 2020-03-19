import React, { Component } from "react";
import { withRouter } from 'react-router';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Menu } from 'antd';
import "../css/head.css";
import logo from "../images/orbit.png";

class HeaderPage extends Component {
  goHomePage = () => {
    window.location.href = "/"
  }
  goForumPage = () => {
    window.location.href = "/forums"
  }
  goUserProfilePage = () => {
    window.location.href = "/userprofile"
  }

  render() {
    return (
      <div className='header-container'>
        <div className="logo">
          <img alt="blueplanetLogo" src={logo} style={{ width: '30px', height: '30px', marginRight: '5px' }} />
          BluePlanet
                </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[this.props.page]}
          style={{ lineHeight: '50px' }}
          className="menu-tabs"
        >
          <Menu.Item key="1" onClick={this.goHomePage}>Home</Menu.Item>
          <Menu.Item key="2" onClick={this.goForumPage}>Forum</Menu.Item>
          <Menu.Item key="3" onClick={this.goUserProfilePage} >My Triplist</Menu.Item>
          <Menu.Item key="4">Log In/Out</Menu.Item>
          <Menu.Item key="5" id='lang' >EN/TH</Menu.Item>
        </Menu>
      </div>)
  }

}

export default withRouter(HeaderPage);
