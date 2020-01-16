import React, {Component } from "react";
import { withRouter } from 'react-router';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu} from 'antd';

const { Header} = Layout;

class HeaderPage extends Component {

    render() {
        return (
            <div>
              
                    <div className="logo" />
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['3']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1" style={{ marginLeft: 825 }}>Home</Menu.Item>
                        <Menu.Item key="2">About us</Menu.Item>
                        <Menu.Item key="3">Forum</Menu.Item>
                        <Menu.Item key="3">My Triplist</Menu.Item>

                    </Menu>
                
            </div>)
    }

}

export default withRouter(HeaderPage);
