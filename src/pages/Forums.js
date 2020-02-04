import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Icon, Divider, Row, Col, Tag, Select, Radio, InputNumber, Slider, Checkbox } from 'antd';

import HeaderPage from "./HeaderPage";

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const CheckboxGroup = Checkbox.Group;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;
var checkTheme = [];

const checkBudget = (a, b) => (b <= a)

class Forums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      threadPoperties: [],
      value: 1,
      radio: 1,
      fullData: [],
      query: {},
      inputMinValue: 0,
      inputMaxValue: 20000,
    };
  }

  handleSortBy = (value) => {
    console.log(`selected ${value}`);
    const query = this.state.query;
    query.sortby = value;
    this.setState({ query: query });
    this.getInformation(query);
  };

  handleClick = e => {
    console.log("click ", e);
  };

  onChangeBudget = (value) => {
    console.log("value: " + value);
    const query = this.state.query;
    query.budget_min = value[0];
    query.budget_max = value[1];
    this.setState({ query: query, inputMinValue: value, });
    this.getInformation(query);

  };

  onAfterChange = (value) => {
    console.log('onAfterChange: ', value);
    this.setState({
      inputMinValue: value[0],
      inputMaxValue: value[1],
      data: this.state.fullData.filter(d =>
        checkBudget(d.budgetNum, value[1])
      )
    }, () => {
      console.log()
    });
  }

  onChangeMin = (value) => {
    const query = this.state.query;
    query.budget_min = value;
    this.setState({ query: query, inputMinValue: value, });
    this.getInformation(query);

    // this.setState({
    //   inputMinValue: value,
    // });
  };

  onChangeMax = (value) => {
    const query = this.state.query;
    query.budget_max = value;
    this.setState({ query: query, inputMaxValue: value, });
    this.getInformation(query);
    // this.setState({
    //   inputMaxValue: value,
    // });
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
    console.log("data: " + this.state.data);
    const query = this.state.query;
    query.countries = value;
    console.log("value: " + value);
    this.setState({ query: query });
    this.getInformation(query);
  };

  onChangeTheme = (e) => {
    console.log("e.target.value: " + e.target.value);
    console.log(e.target.checked);
    const theme = e.target.value;
    console.log("theme: " + theme);
    if (theme != null) {
      if (e.target.checked === false) {
        checkTheme.splice(checkTheme.indexOf(theme), 1);
      } else {
        checkTheme.push(theme);
      }
    }
    const query = this.state.query;
    // query.themes = e.target.value;
    console.log("checktheme: " + checkTheme);
    query.themes = checkTheme;
    this.setState({ query: query });
    this.getInformation(query);
    // this.setState({ data: this.state.fullData.filter(d => {

    //   if(e.target.checked){
    //     console.log(d.theme)
    //     return checkTheme(d.theme, e.target.value) }
    //   }) 

    // });    
  }

  onChangeMonth = (value) => {
    console.log(`selected ${value}`);
    const query = this.state.query;
    query.months = value;
    this.setState({ query: query });
    this.getInformation(query);
    // this.setState({ data: this.state.fullData.filter(d => {
    //   console.log(d.month);
    //   if(d.month != null) {
    //     return checkMonth(d.month, value)
    //   } 
    // }) 
    // });    
  }

  onChangeDuration = (e) => {
    console.log('radio checked', e.target.value);
    const query = this.state.query;
    query.durations = e.target.value;
    this.setState({ query: query });
    this.getInformation(query);
    this.setState({
      radio: e.target.value,
    });
  }

  // value: e.target.value,

  async getInformation(query) {
    let response = null;
    const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })
    this.props.history.push(`/forums${q}`);
    try {
      response = await axios.get(`http://${backend_url}/forums/filterQuery${q}`)
    } catch (error) {
      console.log(error);
    }
    if (response) {
      // Map data after get response
      this.mapData(response);
    }
  }

  mapData(response) {
    const threadPoperties = response.data.map(item => {
      return {
        ...item,
        link: "https://pantip.com/topic/" + item.topic_id,
        day: item.duration.label,
        budget: "฿".repeat(item.budget.toString().length),
        popular: parseInt(item.popularity),
        country: item.countries.map(c => c.nameEnglish + " "),
        vote: item.totalVote,
        duration: item.duration.label,
        typeday: item.duration.days,
        theme: item.theme.map(c => c.theme),
      };
    });
    this.setState({ threadPoperties: threadPoperties });
  }

  getQueryParams() {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
  }

  componentDidMount() {
    const q = this.getQueryParams();
    this.setState({ query: q })
    this.getInformation(q);
  }

  CreatePost = () => {
    return this.state.threadPoperties.map(d => {
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
              <a href={d.link} target="_blank" rel="noopener noreferrer" style={{ color: "#181741" }}>
                {d.title}
              </a>
              <Row style={{ paddingTop: 10 }}>
                <Tag color="rgba(130, 142, 180, 0.5)">{d.day}</Tag>
                <Tag color="rgba(130, 142, 180, 0.5)">{d.budget}</Tag>
                <Tag color="rgba(130, 142, 180, 0.5)">{d.country}</Tag>
              </Row>
              <Row style={{ paddingTop: 10 }}>
                <div className="icons-list">
                  <Icon
                    type="plus"
                    style={{ fontSize: "14px", color: "#828EB4", padding: 1 }}
                  />{" "}
                  {d.vote} upvoted
                      <Icon
                    type="fire"
                    theme="filled"
                    style={{ fontSize: "14px", color: "#828EB4", padding: 1, marginLeft: 20 }}
                  />{" "}
                  {d.popular} popular
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

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      marginLeft: 22,
      marginRight: 10,
    };

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
    children.push(<Option value="JP">Japan </Option>);
    children.push(<Option value="TH">Thailand </Option>);
    children.push(<Option value="TW">Taiwan </Option>);
    children.push(<Option value="MM">Myanmar </Option>);

    return (
      <div>
        <Layout>
          <Header className="header" style={{ background: '#fff' }}>
            <HeaderPage page="3"/>
          </Header>
          <Layout>
            <Sider width={220} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >

                <div style={{ marginLeft: 22, marginRight: 15, marginBottom: 20, marginTop: 20 }}>
                  Filter
                            <a href={""} style={{ color: "#828EB4", marginLeft: 62, marginRight: 15 }}>
                    Reset Filter
                            </a>
                </div>
                <ColoredShortLine color="rgba(130, 142, 180, 0.5)" />


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
                    value={this.state.query.countries}
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
                  <Radio.Group onChange={this.onChangeDuration} value={this.state.query.durations ? this.state.query.durations : 1}>
                    <Radio style={radioStyle} value={"1-3Days"}>1 - 3 Days</Radio>
                    <Radio style={radioStyle} value={"4-6Days"}>4 - 6 Days</Radio>
                    <Radio style={radioStyle} value={"7-9Days"}>7 - 9 Days</Radio>
                    <Radio style={radioStyle} value={"10-12Days"}>10 - 12 Days</Radio>
                    <Radio style={radioStyle} value={"Morethan12Days"}>More than 12 Days</Radio>
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
                    max={50000}
                    style={{ marginLeft: 22, marginRight: 22 }}
                    onChange={this.onChangeBudget}
                    onAfterChange={this.onAfterChange}
                    defaultValue={[0, 20000]}
                    value={[this.state.query.budget_min, this.state.query.budget_max]}
                  />
                  <InputNumber
                    min={0}
                    max={50000}
                    style={{ marginLeft: 22, marginRight: 15, width: 75 }}
                    //  value={inputMinValue}
                    value={this.state.query.budget_min}
                    onChange={this.onChangeMin}
                  />
                  <InputNumber
                    min={0}
                    max={50000}
                    style={{ marginLeft: 2, marginRight: 22, width: 75 }}
                    //  value={inputMaxValue}
                    value={this.state.query.budget_max}
                    onChange={this.onChangeMax}
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
                    value={this.state.query.months}
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
                    <Option value="December">December </Option>
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
                      <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Historical" onChange={this.onChangeTheme}>Historical</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Entertainment" onChange={this.onChangeTheme}>Entertainment</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Festival" onChange={this.onChangeTheme}>Festival</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Eating" onChange={this.onChangeTheme}>Eating</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="NightLifeStyle" onChange={this.onChangeTheme}>NightLifeStyle</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Photography" onChange={this.onChangeTheme}>Photography</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox style={{ marginLeft: 22, marginRight: 15, marginTop: 15 }} value="Sightseeing" onChange={this.onChangeTheme}>Sightseeing</Checkbox>
                    </Row>
                  </Col>
                  <CheckboxGroup

                    value={this.state.query.durations}

                  />
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
              ><div style={{ backgroundColor: "rgba(130, 142, 180, 0.5)", paddingTop: 20 }}>
                  <Row>
                    <span style={{ marginLeft: 20 }}>Forum / {this.state.query.countries}</span>
                    <Select defaultValue="popular" value={this.state.query.sortby} style={{ width: 150, marginLeft: 650, marginBottom: 20, borderColor: "rgba(130, 142, 180, 0.5)" }} onChange={this.handleSortBy}>
                      <Option value="upvoted" style={{ backgroundColor: "rgba(130, 142, 180, 0.5)" }}>
                        <Icon type="plus"
                          style={{ color: "#181741", padding: 3 }}
                        />Most Upvoted</Option>
                      <Option value="popular">
                        <Icon
                          type="fire"
                          theme="filled"
                          style={{ color: "#181741", padding: 3 }}
                        />Most Popular</Option>
                      <Option value="disabled" disabled>
                        ________________
                      </Option>
                      <Option value="newest">Newest</Option>
                      <Option value="oldest">Oldest</Option>
                    </Select>
                  </Row>
                </div>

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

export default withRouter(Forums);