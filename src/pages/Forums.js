import React, { Component } from 'react';
import axios from 'axios';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Icon, Divider, Row, Col, Tag, Select, Radio, Input, Slider} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;

export default class Forums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: [],
            data: [],
            value: 1,
            fullData: []
        };
    }

    handleClick = e => {
        console.log("click ", e);
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
    };
   
    componentDidMount() {
        axios
          .get("http://localhost:3001/forums")
          .then(res => {
            const datas = res.data;
            const data = [...Array(10).keys()].map(i => {
              return {
                title: datas[i].title,
                link: "https://pantip.com/topic/" + datas[i].topic_id,
                day: datas[i].duration.label,
                budget: "฿".repeat(datas[i].budget.toString().length),
                thumbnail: datas[i].thumbnail,
                vote: datas[i].totalVote,
                popular: datas[i].popularity,
                country: datas[i].countries.nameEnglish
              };
            });
            this.setState(
              {
                threads: datas,
                data: data,
                fullData: data
              },
              () => {
                console.log(this.state.data);
                console.log(this.state.fullData);
                console.log(data);
              }
            );
          })
          .catch(err => console.log(err));
      }
    
      CreatePost = () => {
        console.log("data"+this.state.data)
        return this.state.data.map(d => {
          return (
            <div>
              <Row style={{ background: "#fff", paddingTop: 5, fontSize: "14px" }}>
                <Col span={4}>
                  <img
                    style={{ width: 90, height: 90 }}
                    alt="example"
                    src={d.thumbnail}
                  />
                </Col>
                <Col span={20}>
                  <a href={d.link} style={{ color: "#181741" }}>
                    {d.title}
                  </a>
                  <Row style={{ paddingTop: 10 }}>
                    <Tag color="rgba(130, 142, 180, 0.5)">{d.day}</Tag>
                    <Tag color="rgba(130, 142, 180, 0.5)">{d.budget}</Tag>
                  </Row>
                  <Row style={{ paddingTop: 10 }}>
                    <div className="icons-list">
                      <Icon
                        type="plus"
                        style={{ fontSize: "14px", color: "#828EB4", padding: 2 }}
                      />{" "}
                      {d.vote} upvoted
                      <Icon
                        type="fire"
                        theme="filled"
                        style={{ fontSize: "14px", color: "#828EB4", padding: 2 }}
                      />{" "}
                      popular
                      <Icon
                        type="share-alt"
                        style={{ fontSize: "14px", color: "#828EB4", padding: 2 }}
                      />{" "}
                      shared
                    </div>
                  </Row>
                </Col>
                <Divider />
              </Row>
            </div>
          );
        });
      };
    // threadList() {
    //     return this.state.threads.map((currentThread, i) => {
    //         // return List of threads
    //     })
    // }

    handleChange = (value) => {
        console.log("data: "+this.state.data);
        console.log("fulldata: "+this.state.fullData);
        this.setState({ data: this.state.fullData.filter(d => d.country === value )},
        ()=>
      
        console.log("data"+this.state.data)
        );
    }
   
    render() {

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            marginLeft: 22,
            marginRight: 10,
          };

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

        const ColoredShortLine = ({ color }) => (
            <hr
                style={{
                    color: color,
                    backgroundColor: color,
                    height: 1,
                    border: "0.5px",
                    marginLeft: 22,
                    marginRight: 22,


                }}
            />
        );

        const children = [];
        children.push(<Option value="Japan" label="Japan">Japan</Option>);
        children.push(<Option value="Thailand" label="Thailand">Thailand</Option>);

        function onChange(value) {
            console.log('onChange: ', value);
        }
          
        function onAfterChange(value) {
            console.log('onAfterChange: ', value);
        }
        
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
                <Sider width={220} style={{ background: '#fff' }}>
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
                            Country
                        </span>
                        }
                        >
                            <Select
                            mode="multiple"
                            style={{ width: '77%', marginLeft: 22, marginRight: 15 }}
                            placeholder="Please select"
                          
                            onChange={this.handleChange}
                            >
                            {children}
                            </Select>
                        </SubMenu>
                        <ColoredShortLine color="rgba(130, 142, 180, 0.5)" />
                        
                        <SubMenu
                        key="sub2"
                        title={
                        <span>
                            <Icon type="laptop" />
                            Duration
                        </span>
                        }
                        >
                            <Radio.Group onChange={this.onChange} value={this.state.value}>
                                <Radio style={radioStyle} value={1}>Option A</Radio>
                                <Radio style={radioStyle} value={2}>Option B</Radio>
                                <Radio style={radioStyle} value={3}>Option C</Radio>
                            </Radio.Group>
                        </SubMenu>
                        <ColoredShortLine color="rgba(130, 142, 180, 0.5)" />

                        <SubMenu
                        key="sub3"
                        title={
                        <span>
                            <Icon type="notification" />
                            Budget per Person
                        </span>
                        }
                        >
                            <Slider
                            range
                            min={1}
                            max={100000}
                            step={1}
                            defaultValue={[20, 50]}
                            onChange={onChange}
                            onAfterChange={onAfterChange}
                            style={{marginLeft: 22, marginRight: 22}}
                            />
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
            
            {this.CreatePost()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
            </div>
        )
    }
}