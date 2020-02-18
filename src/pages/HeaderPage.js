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

    goUserProfile = () => {
        window.location.href = "/userprofile"
    }

    render() {
        return (
            <div className='header-container'>
                <div className="logo" style={{ width: '50%', height: '50%', color: '#ffffff' }}>
                    <img alt="example" src={logo} style={{ width: '4%', height: '4%' }} />
                    BluePlanet
                </div>
                <div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={[this.props.page]}
                        style={{ lineHeight: '50px' }}
                    >
                        <Menu.Item key="1" onClick={this.goHomePage}>Home</Menu.Item>
                        <Menu.Item key="2" onClick={this.goForumPage}>Forum</Menu.Item>
                        <Menu.Item key="3" id='home' onClick={this.goUserProfile} >My Triplist</Menu.Item>
                        <Menu.Item key="4" id='lang' >EN/TH</Menu.Item>


                    </Menu>
                </div>


            </div>)
    }

}

export default withRouter(HeaderPage);
