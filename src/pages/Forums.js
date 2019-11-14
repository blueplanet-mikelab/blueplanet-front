import React, { Component } from 'react';
import axios from 'axios';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Icon, Divider, Row, Col, Tag} from 'antd';

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
            thumbnails: [],
            votes: [],
            popular: [],
        };
    }

    CreateLink = threads => {
        if (threads.length === 0) {
          return []
        }
        const id = [...Array(10).keys()].map(function (i) {
          return "https://pantip.com/topic/" + threads[i].topic_id
        })
        console.log("link: " + id);
        return id
      }

      CreateVote = threads => {
        if (threads.length === 0) {
          return []
        }
        const vote = [...Array(10).keys()].map(function (i) {
          return threads[i].totalVote
        })
        return vote
      }

      CreatePopular = threads => {
        if (threads.length === 0) {
          return []
        }
        const pop = [...Array(10).keys()].map(function (i) {
          return threads[i].popularity
        })
        return pop
      }


      CreateTopic = threads => {
        if (threads.length === 0) {
          return []
        }
        const Topic = [...Array(10).keys()].map(function (i) {
          return threads[i].title
        })
        console.log("topic: " + Topic);
        return Topic
      }

      CreateDay = threads => {
        if (threads.length === 0) {
          return []
        }
        const date = [...Array(10).keys()].map(function (i) {
          return threads[i].duration.label
        })
        console.log("date: " + date);
        return date
      }

      CreatePhoto = threads => {
        if (threads.length === 0) {
          return []
        }
        const photo = [...Array(10).keys()].map(function (i) {
          return threads[i].thumbnail
        })
        console.log("thumbnail: " + photo);
        return photo
      }

      CreateBudget = threads => {
        if (threads.length === 0) {
            return []
        }
        const money = [...Array(10).keys()].map(i => {
            var num = (threads[i].budget.toString()).length
            if(threads[i].budget.toString() === "-1"){
                return []
            }
            return "฿".repeat(num)
        })
        console.log("money"+money)
        return money
      }

      CreatePost = () => {
        if (this.state.threads === 0) {
            console.log("flf1"+ this.state.threads);
            return []
        }
        if(this.state.links.length === 0){
            console.log("flf2" + this.state.links);
            return []
        }

        if(this.state.titles.length === 0){
            console.log("flf3" + this.state.titles);
            return []
        }

        if(this.state.day.length === 0){
            console.log("flf4" + this.state.day);
            return []
        }
        if(this.state.budgets.length === 0){
            console.log("flf5" + this.state.budgets);
            return []
        }

        const post = [...Array(10).keys()].map(function (i) {
            return <div>><Row  style={{
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
                <a href={this.state.links[i]} style = {{color: '#181741'}}>{this.state.titles[i]}</a>
                <Row style={{paddingTop: 10}}>
                    <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[i]}</Tag> 
                    <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[i]}</Tag>
                </Row>
                <Row style={{paddingTop: 10}}> 
                <div className="icons-list"><Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> upvoted
                    <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                    <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                </div>
                </Row>
                    </Col>
                </Row>
                <Divider />
            </div>
         })
        return post;
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
                    budgets: this.CreateBudget(res.data),
                    thumbnails: this.CreatePhoto(res.data),
                    votes: this.CreateVote(res.data),
                    popular: this.CreatePopular(res.data),

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
        const ColoredLine = ({ color }) => (
            <hr
                style={{
                    color: color,
                    backgroundColor: color,
                    height: 1,
                    border: "0.5px"
                }}
            />
        );
        return (
            <div>
                <Layout>
      <Header className="header" style={{ background: '#fff' }}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['3']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1" style={{marginLeft: 875}}>Home</Menu.Item>
          <Menu.Item key="2">About us</Menu.Item>
          <Menu.Item key="3">Forum</Menu.Item>
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
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 20,
              margin: 0,
              minHeight: 575,
            }}
          >
            Forum / 
            {/* post1 */}
            <Row style={{ background: '#fff', paddingTop: 5, fontSize: "14px", }}>
                <Col span={4} >
                    <img style={{ width: 90, height: 90}}
                    alt="example"
                    src={this.state.thumbnails[0]}/>
                </Col>
                <Col span={20} > 
                    <a href={this.state.links[0]} style = {{color: '#181741'}}>{this.state.titles[0]}</a>
                    <Row style={{paddingTop: 10}}>
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[0]}</Tag> 
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[0]}</Tag>
                    </Row>
                    <Row style={{paddingTop: 10}}> 
                        <div className="icons-list">
                            <Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> {this.state.votes[0]} upvoted
                            <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                            <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                        </div>
                    </Row>
                </Col>
            </Row>
            <ColoredLine color="rgba(130, 142, 180, 0.5)" />
            {/* post2 */}
            <Row style={{ background: '#fff', paddingTop: 5, fontSize: "14px", }}>
                <Col span={4} >
                    <img style={{ width: 90, height: 90}}
                    alt="example"
                    src={this.state.thumbnails[1]}/>
                </Col>
                <Col span={20} > 
                    <a href={this.state.links[1]} style = {{color: '#181741'}}>{this.state.titles[1]}</a>
                    <Row style={{paddingTop: 10}}>
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[1]}</Tag> 
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[1]}</Tag>
                    </Row>
                    <Row style={{paddingTop: 10}}> 
                        <div className="icons-list">
                            <Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> {this.state.votes[1]}  upvoted
                            <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                            <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                        </div>
                    </Row>
                </Col>
            </Row>
            <ColoredLine color="rgba(130, 142, 180, 0.5)" />
            {/* post3 */}
            <Row style={{ background: '#fff', paddingTop: 5, fontSize: "14px", }}>
                <Col span={4} >
                    <img style={{ width: 90, height: 90}}
                    alt="example"
                    src={this.state.thumbnails[2]}/>
                </Col>
                <Col span={20} > 
                    <a href={this.state.links[2]} style = {{color: '#181741'}}>{this.state.titles[2]}</a>
                    <Row style={{paddingTop: 10}}>
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[2]}</Tag> 
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[2]}</Tag>
                    </Row>
                    <Row style={{paddingTop: 10}}> 
                        <div className="icons-list">
                            <Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> {this.state.votes[2]}  upvoted
                            <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                            <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                        </div>
                    </Row>
                </Col>
            </Row>
            <ColoredLine color="rgba(130, 142, 180, 0.5)" />
             {/* post4 */}
             <Row style={{ background: '#fff', paddingTop: 5, fontSize: "14px", }}>
                <Col span={4} >
                    <img style={{ width: 90, height: 90}}
                    alt="example"
                    src={this.state.thumbnails[3]}/>
                </Col>
                <Col span={20} > 
                    <a href={this.state.links[3]} style = {{color: '#181741'}}>{this.state.titles[3]}</a>
                    <Row style={{paddingTop: 10}}>
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[3]}</Tag> 
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[3]}</Tag>
                    </Row>
                    <Row style={{paddingTop: 10}}> 
                        <div className="icons-list">
                            <Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> {this.state.votes[3]}  upvoted
                            <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                            <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                        </div>
                    </Row>
                </Col>
            </Row>
            <ColoredLine color="rgba(130, 142, 180, 0.5)" />
             {/* post5 */}
             <Row style={{ background: '#fff', paddingTop: 5, fontSize: "14px", }}>
                <Col span={4} >
                    <img style={{ width: 90, height: 90}}
                    alt="example"
                    src={this.state.thumbnails[4]}/>
                </Col>
                <Col span={20} > 
                    <a href={this.state.links[4]} style = {{color: '#181741'}}>{this.state.titles[4]}</a>
                    <Row style={{paddingTop: 10}}>
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[4]}</Tag> 
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[4]}</Tag>
                    </Row>
                    <Row style={{paddingTop: 10}}> 
                        <div className="icons-list">
                            <Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> {this.state.votes[4]}  upvoted
                            <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                            <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                        </div>
                    </Row>
                </Col>
            </Row>
            <ColoredLine color="rgba(130, 142, 180, 0.5)" />
            {/* post6 */}
            <Row style={{ background: '#fff', paddingTop: 5, fontSize: "14px", }}>
                <Col span={4} >
                    <img style={{ width: 90, height: 90}}
                    alt="example"
                    src={this.state.thumbnails[5]}/>
                </Col>
                <Col span={20} > 
                    <a href={this.state.links[5]} style = {{color: '#181741'}}>{this.state.titles[5]}</a>
                    <Row style={{paddingTop: 10}}>
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[5]}</Tag> 
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[5]}</Tag>
                    </Row>
                    <Row style={{paddingTop: 10}}> 
                        <div className="icons-list">
                            <Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> {this.state.votes[5]}  upvoted
                            <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                            <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                        </div>
                    </Row>
                </Col>
            </Row>
            <ColoredLine color="rgba(130, 142, 180, 0.5)" />
            {/* post7 */}
            <Row style={{ background: '#fff', paddingTop: 5, fontSize: "14px", }}>
                <Col span={4} >
                    <img style={{ width: 90, height: 90}}
                    alt="example"
                    src={this.state.thumbnails[6]}/>
                </Col>
                <Col span={20} > 
                    <a href={this.state.links[6]} style = {{color: '#181741'}}>{this.state.titles[6]}</a>
                    <Row style={{paddingTop: 10}}>
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[6]}</Tag> 
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[6]}</Tag>
                    </Row>
                    <Row style={{paddingTop: 10}}> 
                        <div className="icons-list">
                            <Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> {this.state.votes[6]} upvoted
                            <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                            <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                        </div>
                    </Row>
                </Col>
            </Row>
            <ColoredLine color="rgba(130, 142, 180, 0.5)" />
            {/* post8 */}
            <Row style={{ background: '#fff', paddingTop: 5, fontSize: "14px", }}>
                <Col span={4} >
                    <img style={{ width: 90, height: 90}}
                    alt="example"
                    src={this.state.thumbnails[7]}/>
                </Col>
                <Col span={20} > 
                    <a href={this.state.links[7]} style = {{color: '#181741'}}>{this.state.titles[7]}</a>
                    <Row style={{paddingTop: 10}}>
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[7]}</Tag> 
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[7]}</Tag>
                    </Row>
                    <Row style={{paddingTop: 10}}> 
                        <div className="icons-list">
                            <Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> {this.state.votes[7]} upvoted
                            <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                            <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                        </div>
                    </Row>
                </Col>
            </Row>
            <ColoredLine color="rgba(130, 142, 180, 0.5)" />
             {/* post9 */}
             <Row style={{ background: '#fff', paddingTop: 5, fontSize: "14px", }}>
                <Col span={4} >
                    <img style={{ width: 90, height: 90}}
                    alt="example"
                    src={this.state.thumbnails[83]}/>
                </Col>
                <Col span={20} > 
                    <a href={this.state.links[8]} style = {{color: '#181741'}}>{this.state.titles[8]}</a>
                    <Row style={{paddingTop: 10}}>
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[8]}</Tag> 
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[8]}</Tag>
                    </Row>
                    <Row style={{paddingTop: 10}}> 
                        <div className="icons-list">
                            <Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> {this.state.votes[8]} upvoted
                            <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                            <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                        </div>
                    </Row>
                </Col>
            </Row>
            <ColoredLine color="rgba(130, 142, 180, 0.5)" />
             {/* post10 */}
             <Row style={{ background: '#fff', paddingTop: 5, fontSize: "14px", }}>
                <Col span={4} >
                    <img style={{ width: 90, height: 90}}
                    alt="example"
                    src={this.state.thumbnails[9]}/>
                </Col>
                <Col span={20} > 
                    <a href={this.state.links[9]} style = {{color: '#181741'}}>{this.state.titles[9]}</a>
                    <Row style={{paddingTop: 10}}>
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.day[9]}</Tag> 
                        <Tag color="rgba(130, 142, 180, 0.5)">{this.state.budgets[9]}</Tag>
                    </Row>
                    <Row style={{paddingTop: 10}}> 
                        <div className="icons-list">
                            <Icon type="plus" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> {this.state.votes[9]} upvoted
                            <Icon type="fire" theme="filled" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> popular
                            <Icon type="share-alt" style={{ fontSize: '14px', color: '#828EB4', padding: 2}}/> shared
                        </div>
                    </Row>
                </Col>
            </Row>
            <ColoredLine color="rgba(130, 142, 180, 0.5)" />
          </Content>
        </Layout>
      </Layout>
    </Layout>
            </div>
        )
    }
}