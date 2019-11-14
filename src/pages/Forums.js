import React, { Component } from 'react';
import axios from 'axios';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Breadcrumb, Icon, Divider, Row, Col, Tag} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Forums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: [],
            titles: [],
            links: [],
            day: [],
            budgets: [],
        };
    }

    CreateLink = threads => {
        if (threads.length === 0) {
          return []
        }
        const id = [...Array(10).keys()].map(function (i) {
          return "https://pantip.com/topic/" + threads[i].topic_id
        })
        return id
      }


      CreateTopic = threads => {
        if (threads.length === 0) {
          return []
        }
        const Topic = [...Array(10).keys()].map(function (i) {
          return threads[i].title
        })
        return Topic
      }

      CreateDay = threads => {
        if (threads.length === 0) {
          return []
        }
        const date = [...Array(10).keys()].map(function (i) {
          return threads[i].duration.label
        })
        return date
      }

      CreateBudget = threads => {
        if (threads.length === 0) {
            return []
        }
        const money = [...Array(10).keys()].map(i => {
            console.log(threads);
            var num = (threads[i].budget.toString()).length
            return "฿".repeat(num)
        })
        console.log(money)
        return money
      }


    handleClick = e => {
        console.log('click ', e);
      };

    componentDidMount() {
        axios
            .get('http://localhost:3001/forums')
            .then(res => {
                this.setState({
                    threads: res.data,
                    titles: this.CreateTopic(res.data),
                    links: this.CreateLink(res.data),
                    day: this.CreateDay(res.data),
                    budgets: this.CreateBudget(res.data)
                });
            })
            .catch((err) => console.log(err));
    }

    // threadList() {
    //     return this.state.threads.map((currentThread, i) => {
    //         // return List of threads
    //     })
    // }

    render() {
        return (
            <div>
                <Layout>
      <Header className="header" style={{ background: '#fff' }}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  subnav 1
                </span>
              }
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  subnav 2
                </span>
              }
            >
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />
                  subnav 3
                </span>
              }
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: '#fff',
              padding: 20,
              margin: 0,
              minHeight: 575,
            }}
          >
            Forum / Singapore
            
            <Row  style={{
              background: '#fff',
              paddingTop: 5,
              fontSize: "14px",
            }}>
            
      <Col span={4} >
            <img style={{ width: 90, height: 90}}
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
        </Col>
      <Col span={20} > 
      <a href={this.state.links[0]} style = {{color: '#181741'}}>{this.state.titles[0]}</a>
      <Row style={{paddingTop: 10}}><Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[0]}</Tag> <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[0]}</Tag></Row>
      <Row style={{paddingTop: 10}}> 
          <div className="icons-list"><Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> upvoted
          <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
         <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared</div>
          </Row>
      </Col>
    </Row>
    <Divider />
          </Content>
        </Layout>
      </Layout>
    </Layout>
            </div>
        )
    }
}