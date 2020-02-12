import React, { Component } from "react";
import { withRouter } from 'react-router';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Menu, Row } from 'antd';
import "../css/head.css";

class HeaderPage extends Component {
    goHomePage = () => {
        window.location.href = "/"
    }
    goForumPage = () => {
        window.location.href = "/forums"
    }

    render() {
        return (
            <div className='header-container'>
                <div className="logo">
                    
                </div>
                <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={[this.props.page]}
                        style={{ lineHeight: '50px' }}
                    >
                        <Menu.Item key="1" onClick={this.goHomePage}>Home</Menu.Item>
                        <Menu.Item key="2">About us</Menu.Item>
                        <Menu.Item key="3" onClick={this.goForumPage}>Forum</Menu.Item>
                        <Menu.Item key="4" id='home' >My Triplist</Menu.Item>
                        <Menu.Item key="5" id='lang' >EN/TH</Menu.Item>


                    </Menu>
                

            </div>)
    }

}

export default withRouter(HeaderPage);
