import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu, Icon, Row, Col, Tag, Select, Radio, InputNumber, Slider, Checkbox, Button, Dropdown, Pagination } from 'antd';
import "../css/forum.css";

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const CheckboxGroup = Checkbox.Group;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;
var checkTheme = [];

const checkBudget = (a, b) => (b <= a)
const num_of_threads_each_page = 10;   // Use a constant here to keep track of number of threads per page

class Forums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadPoperties: [],
      query: {},
      value: 1,
      radio: 1,
      inputMinValue: 0,
      inputMaxValue: 20000,
      currentPage: 1,
      sortBy: 'popular',
      minValue: 0,
      maxValue: num_of_threads_each_page,
      heartTheme: "outlined",
      heartFavorites: "outlined",
      countryList: [],
      countryList_short: [],
      children: [],
      countries_search: "",
      typeThread: 1,
      sortThread: 1,
    };
  }

  onChangePage = page => {
    console.log(page);
    this.setState({
      currentPage: page,
    });
  };

  handleChangePage = value => {
    this.setState({
      minValue: (value - 1) * num_of_threads_each_page,
      maxValue: value * num_of_threads_each_page
    });
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
  };

  onChangeMax = (value) => {
    const query = this.state.query;
    query.budget_max = value;
    this.setState({ query: query, inputMaxValue: value, });
    this.getInformation(query);
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
    this.setState({
      query: query,
    });
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

  haveBudget(money) {
    // console.log('budget:', money);
    if (money != "฿฿") {
      return <Tag style={{ padding: '1%' }} color="rgba(130, 142, 180, 0.5)">{money}</Tag>
    }
  };

  haveDuration(duration) {
    console.log('duration:', duration);
    if (duration != "Not Define") {
      return <Tag style={{ padding: '1%' }} color="rgba(130, 142, 180, 0.5)">{duration}</Tag>
    }
  }

  handleType = (type, typeThread) => {
    const query = this.state.query;
    query.type = type
    this.setState({
      query: query,
      typeThread
    });
    this.getInformation(query);
  }

  handleSortBy = (sortBy, sortThread) => {
    const query = this.state.query;
    query.sortby = sortBy
    console.log("check query.sortby: " + query.sortby)
    console.log("check sortBy: " + sortBy)
    this.setState({
      query: query,
      sortThread
    });
    this.getInformation(query);
  }

  // value: e.target.value,

  listCountriesAndSetThreadProperties = (threadPoperties) => {
    const countryList = []
    const countryList_short = []
    threadPoperties.forEach(element => {
      element.country.forEach(c => {
        if (!countryList.includes(c)) {
          countryList.push(c)
        }
      })
      element.country_short.forEach(c => {
        if (!countryList_short.includes(c)) {
          countryList_short.push(c)
        }
      })
      // console.log(countryList);
      // console.log(countryList_short);

    })

    this.setState({
      threadPoperties: threadPoperties,
      countryList: countryList,
      countryList_short: countryList_short
    })
  };

  // havePost() {
  //   if (this.threadPoperties.length <= 0) {
  //     return "Null"
  //   } else {
      
  //   }
  // }



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
        budget: "฿".repeat(parseInt(item.budget).toString().length),
        popular: item.popularity,
        country: item.countries.map(c => c.nameEnglish),

        country_short: item.countries.map(c => c.country),
        vote: item.vote,
        duration: item.duration.label,
        typeday: item.duration.days,
        theme: item.theme.map(c => c.theme),
      };
    });
    this.listCountriesAndSetThreadProperties(threadPoperties)
    console.log(threadPoperties)
    // console.log(threadPoperties[0].thumbnail)
    // this.handleSortByPopular()
  }

  getQueryParams() {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
  }

  componentDidMount() {
    const q = this.getQueryParams();
    this.setState({ query: q })
    this.getInformation(q);
  }

  onHeartFavoriteClick = () => {
    if (this.state.heartFavorites == "filled") {
      this.setState({
        heartFavorites: "outlined"
      })
    } else {
      this.setState({
        heartFavorites: "filled"
      })

    }
  }

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

    // Add countries in selection
    for (var i = 0; i <= this.state.countryList_short.length; i++) {
      children.push(<Option value={this.state.countryList[i]}>{this.state.countryList[i]}</Option>);
    }

    const menu = (
      <Menu>
        <SubMenu title="Add to My Triplist">
          <Menu.Item>New Triplist</Menu.Item>
          <Menu.Item>Japan Trip</Menu.Item>
        </SubMenu>
        <Menu.Item>Save to My Favorite</Menu.Item>
        <Menu.Item>Share</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Layout>
          <Header className="header" style={{ background: '#fff' }}>

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
                            <a href="/forums" style={{ color: "#828EB4", marginLeft: 62, marginRight: 15 }}>
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
                    defaultValue={0}
                    onChange={this.onChangeMin}
                  />
                  <InputNumber
                    min={0}
                    max={50000}
                    defaultValue={50000}
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
                      <Checkbox id="first-theme" value="Mountain" onChange={this.onChangeTheme}>Mountain</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="Sea" onChange={this.onChangeTheme}>Sea</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="Religion" onChange={this.onChangeTheme}>Religion</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="Historical" onChange={this.onChangeTheme}>Historical</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="Entertainment" onChange={this.onChangeTheme}>Entertainment</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="Festival" onChange={this.onChangeTheme}>Festival</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="Eating" onChange={this.onChangeTheme}>Eating</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="NightLifeStyle" onChange={this.onChangeTheme}>Nightlife Style</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="Photography" onChange={this.onChangeTheme}>Photography</Checkbox>
                    </Row>
                    <Row>
                      <Checkbox value="Sightseeing" onChange={this.onChangeTheme}>Sightseeing</Checkbox>
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
                  background: '#F8F5E4',
                  padding: 20,
                  margin: 0,
                  minHeight: 575,
                }}
              ><div style={{ backgroundColor: "#F8F5E4" }}>
                  <Row>
                    <span style={{ marginLeft: 20, fontSize: "30px", fontWeight: "bold", color: "#0E3047" }}>{this.state.query.countries}</span>
                  </Row>
                </div>
                <div style={{ marginBottom: "3%" }}>

                  <Row>
                    <Col span={12}>
                      <Button
                        id="type"
                        size="large"
                        onClick={() => this.handleType('review', 1)}
                        className={`type-btn ${this.state.typeThread === 1 ? 'active' : ''}`}
                        value={this.state.query.type}
                        style={{ lineHeight: '3', width: `100%`, margin: 'auto' }}>Review Trip</Button>
                    </Col>
                    <Col span={12}>
                      <Button
                        id="type"
                        size="large"
                        onClick={() => this.handleType('suggest', 2)}
                        className={`type-btn ${this.state.typeThread === 2 ? 'active' : ''}`}
                        value={this.state.query.type}
                        style={{ lineHeight: '3', width: `100%`, margin: 'auto' }}>Places or Events Suggestion</Button>
                    </Col>
                  </Row>

                  <Row style={{ background: "rgba(255, 224, 198, 0.5)" }}>
                    <Col span={6}>
                      <Button
                        style={{ color: "#181741", paddingRight: 3, width: `100%`, margin: 'auto' }}
                        id="sort"
                        size="large"
                        onClick={() => this.handleSortBy('popular', 1)}
                        className={`sort-btn ${this.state.sortThread === 1 ? 'active' : ''}`}
                        value={this.state.query.sortby}><Icon
                          type="fire"
                          theme="filled"
                        />Most Popular</Button>
                    </Col>
                    <Col span={6}>
                      <Button
                        id="sort"
                        size="large"
                        style={{ color: "#181741", paddingRight: 3, width: `100%`, margin: 'auto' }}
                        onClick={() => this.handleSortBy('upvoted', 2)}
                        className={`sort-btn ${this.state.sortThread === 2 ? 'active' : ''}`}
                        value={this.state.query.sortby}><Icon type="plus"
                        />Most Upvoted</Button>
                    </Col>
                    <Col span={6}>
                      <Button
                        id="sort"
                        size="large"
                        onClick={() => this.handleSortBy('newest', 3)}
                        className={`sort-btn ${this.state.sortThread === 3 ? 'active' : ''}`}
                        value={this.state.query.sortby}
                        style={{ color: "#181741", paddingRight: 3, width: `100%`, margin: 'auto' }}>Newest</Button>
                    </Col>
                    <Col span={6}>
                      <Button
                        id="sort"
                        size="large"
                        onClick={() => this.handleSortBy('oldest', 4)}
                        className={`sort-btn ${this.state.sortThread === 4 ? 'active' : ''}`}
                        value={this.state.query.sortby}
                        style={{ color: "#181741", paddingRight: 3, width: `100%`, margin: 'auto' }}>Oldest</Button>
                    </Col>
                  </Row>
                </div>
                {/* Thread */}

                {this.state.threadPoperties &&
                  this.state.threadPoperties.length > 0 &&
                  this.state.threadPoperties.slice(this.state.minValue, this.state.maxValue).map(d => (
                    <div style={{ backgroundColor: '#FFF', paddingTop: '20px', borderBottom: ' 0.5px solid rgba(130, 142, 180, 0.5)' }}>
                      <Row style={{ background: "#fff", paddingLeft: "4%", fontSize: "14px" }}>
                        <Col span={4}>
                          <img
                            style={{ width: 90, height: 90, marginBottom: "12%" }}
                            alt="example"
                            src={d.thumbnail}
                          />
                        </Col>
                        <Col span={20}>
                          <a href={d.link} target="_blank" rel="noopener noreferrer" style={{ color: "#181741" }}>
                            {d.title}
                          </a>
                          <Row style={{ paddingTop: 10 }}>
                            <Col span={20}>
                              {this.haveDuration(d.day)}
                              {this.haveBudget(d.budget)}
                              <Tag style={{ padding: '1%' }} color="rgba(130, 142, 180, 0.5)">{d.country}</Tag>
                            </Col>
                            <Col>
                              <Row>
                                <Icon type="heart"
                                  theme={this.state.heartFavorites}
                                  onClick={this.onHeartFavoriteClick}
                                  style={{ width: `5%`, margin: `auto 0 auto 2%`, fontSize: '23px', color: 'red' }} />
                                {/* <Icon type="more" style={{ width: `5%`, margin: 'auto', fontSize: '23px' }} /> */}
                                <Dropdown overlay={menu}>
                                  <a className="ant-dropdown-link" href="#">
                                    <Icon type="more" style={{ color: "#10828C", width: `5%`, margin: 'auto', fontSize: '23px' }} />
                                  </a>
                                </Dropdown>
                              </Row>
                            </Col>

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
                      </Row>
                    </div>
                  ))}
                <Pagination
                  style={{ backgroundColor: "#FFF", textAlign: 'center' }}
                  defaultCurrent={1}
                  defaultPageSize={num_of_threads_each_page} //default size of page
                  onChange={this.handleChangePage}
                  total={50} //total number of card data available
                />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default withRouter(Forums);