import React, { Component } from 'react';
import axios from 'axios';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Icon, Divider, Row, Col, Tag, Select, Radio, InputNumber, Slider, Checkbox} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;

const includesCountry = (a,b) =>  a.some(x => b.includes(x))
const checkTheme = (a,b) =>  a.some(x => b.includes(x))
const checkMonth = (a,b) =>  a.some(x => b.includes(x))

export default class Forums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: [],
            data: [],
            value: 1,
            fullData: [],
            inputMinValue: 10000,
            inputMaxValue: 100000,
        };
    }

    handleClick = e => {
        console.log("click ", e);
    };

    onChangeBudget = value => {
      this.setState({
        inputMinValue: value,
      });
    };

    onChangeBudgetMax = value => {
      this.setState({
        inputMaxValue: value,
      });
    };

    onBlur() {
      console.log('blur');
    }
    
    onFocus() {
      console.log('focus');
    }
    
    onSearch(val) {
      console.log('search:', val);
    }

    handleChange = (value) => {
      console.log("data: "+this.state.data);
      console.log("fulldata: "+this.state.fullData);
      this.setState({ data: this.state.fullData.filter(d => 
        includesCountry(d.country, value) 
        )}
      );   
    };
    
    onChangeTheme = (e) =>  {
      console.log("e.target.value: " + e.target.value);
      this.setState({ data: this.state.fullData.filter(d => {
        console.log(d.theme)
        return checkTheme(d.theme, e.target.value) }) 
      });    
    }

      onChangeMonth = (value) => {
        console.log(`selected ${value}`);
        this.setState({ data: this.state.fullData.filter(d => {
          console.log(d.month);
          if(d.month != null) {
            return checkMonth(d.month, value)
          } 
        }) 
        });    
      }  

      onChangeDuration = e => {
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
            const data = [...Array(20).keys()].map(i => {
              return {
                title: datas[i].title,
                link: "https://pantip.com/topic/" + datas[i].topic_id,
                day: datas[i].duration.label,
                budget: "฿".repeat(datas[i].budget.toString().length),
                thumbnail: datas[i].thumbnail,
                vote: datas[i].totalVote,
                popular: datas[i].popularity,
                country: datas[i].countries.map(c => c.nameEnglish),
                typeday: datas[i].duration.days,
                theme: datas[i].theme.map(c => c.theme),
                month: datas[i].month
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
     
   
    render() {

      const { inputMinValue, inputMaxValue } = this.state;

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
        children.push(<Option value="Taiwan" label="Thailand">Taiwan</Option>);
        
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
                            <Radio.Group onChange={this.onChangeDuration} value={this.state.value}>
                                <Radio style={radioStyle} value={1}>1 - 3 Days</Radio>
                                <Radio style={radioStyle} value={2}>4 - 6 Days</Radio>
                                <Radio style={radioStyle} value={3}>7 - 9 Days</Radio>
                                <Radio style={radioStyle} value={4}>10 - 12 Days</Radio>
                                <Radio style={radioStyle} value={5}>More than 12 Days</Radio>
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
                         min={0}
                         max={100000}
                         style={{ marginLeft: 22, marginRight: 22 }}
                         onChange={this.onChangeBudget}
                         onAfterChange={this.onChangeBudgetMax}
                         value={[inputMinValue,inputMaxValue]}
                         defaultValue={[25000, 100000]}
                         />
                         <InputNumber
                         min={0}
                         max={100000}
                         style={{ marginLeft: 22, marginRight: 15, width: 75 }}
                         value={inputMinValue}
                         onChange={this.onChangeBudget}
                         />
                         <InputNumber
                         min={0}
                         max={100000}
                         style={{ marginLeft: 2, marginRight: 22, width: 75}}
                         value={inputMaxValue}
                         onChange={this.onChangeBudgetMax}
                         />
       
                        </SubMenu>
                        <ColoredShortLine color="rgba(130, 142, 180, 0.5)" />
                        
                        <SubMenu
                        key="sub4"
                        title={
                        <span>
                            <Icon type="notification" />
                            Month
                        </span>
                        }
                        >
                          <Select
                          showSearch
                          style={{ marginLeft: 22, marginRight: 22, width: 150 }}
                          placeholder="Filter by Month"
                          optionFilterProp="children"
                          onChange={this.onChangeMonth}
                          onFocus={this.onFocus}
                          onBlur={this.onBlur}
                          onSearch={this.onSearch}
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }>
                            <Option value="January">January</Option>
                            <Option value="February">February</Option>
                            <Option value="March">March</Option>
                            <Option value="April">April</Option>
                            <Option value="May">May</Option>
                            <Option value="June">June</Option>
                            <Option value="July">July</Option>
                            <Option value="August">August</Option>
                            <Option value="September">September</Option>
                            <Option value="October">October</Option>
                            <Option value="November">November</Option>
                            <Option value="December">december </Option>
                            </Select>
                        </SubMenu>
                        <ColoredShortLine color="rgba(130, 142, 180, 0.5)" />

                        <SubMenu
                        key="sub5"
                        title={
                        <span>
                            <Icon type="notification" />
                            Theme
                        </span>
                        }> 
                        <Col>
                          <Row>
                          <Checkbox style={{ marginLeft: 22, marginRight: 15 }} value="Mountain" onChange={this.onChangeTheme}>Mountain</Checkbox>
                          </Row>
                          <Row>
                          <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Sea" onChange={this.onChangeTheme}>Sea</Checkbox>
                          </Row>
                          <Row>
                          <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Religion" onChange={this.onChangeTheme}>Religion</Checkbox>
                          </Row>
                          <Row>
                          <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15  }} value="Historical" onChange={this.onChangeTheme}>Historical</Checkbox>
                          </Row>
                          <Row>
                          <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Entertainment" onChange={this.onChangeTheme}>Entertainment</Checkbox>
                          </Row>
                          <Row>
                          <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Festival" onChange={this.onChangeTheme}>Festival</Checkbox>
                          </Row>
                          <Row>
                          <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15  }} value="Eating" onChange={this.onChangeTheme}>Eating</Checkbox>
                          </Row>
                          <Row>
                          <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="NightLifeStyle" onChange={this.onChangeTheme}>NightLifeStyle</Checkbox>
                          </Row>
                          <Row>
                          <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Photography" onChange={this.onChangeTheme}>Photography</Checkbox>
                          </Row>
                          <Row>
                          <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15  }} value="Sightseeing" onChange={this.onChangeTheme}>Sightseeing</Checkbox>
                          </Row>
                          </Col>
                        </SubMenu>
                        <ColoredShortLine color="rgba(130, 142, 180, 0.5)" />
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
            {/* Thread */}
            
            {this.CreatePost()}

          </Content>
        </Layout>
      </Layout>
    </Layout>
            </div>
        )
    }
}