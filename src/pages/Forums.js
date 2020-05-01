import React, { Component, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import firebase from '../firebase/config';

import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Row, Col, Tag, Select, Radio, InputNumber, Slider, Checkbox, Button, Dropdown, Pagination } from 'antd';
import "../css/forum.css";

import { AuthContext } from '../auth/Auth';
import * as ROUTES from '../constants/routes';
import SpinLoading from '../components/SpinLoading';

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;
const country = [];
var current = 1;

const ForumlistPage = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return <Forums currentUser={currentUser} />;
}

class Forums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadProperties: [],
      query: {},
      sortBy: 'popular',
      // minValue: 0,
      // maxValue: num_of_threads_each_page,
      typeThread: 1,
      sortThread: 1,
      heartFavorites: 'outlined',
      current: 1,
    };
  }

  updateThreads = (query, current) => {
    this.setState({
      query: query,
    });

    this.getThreads(query, current);
  }

  onChangeCountry = (value) => {
    const query = this.state.query;
    query.countries = value;
    this.setState({
      current: '1',
    });
    this.updateThreads(query, '1')
  };

  onChangeDuration = (e) => {
    const query = this.state.query;
    query.duration_type = e.target.value;
    this.setState({
      current: '1',
    });
    this.updateThreads(query, '1')
  }

  onChangeBudget = (value) => {
    const query = this.state.query;
    query.budget_min = value[0];
    query.budget_max = value[1];
    this.setState({
      current: '1',
    });
    this.updateThreads(query, '1')
  }

  onChangeMin = (value) => {
    const query = this.state.query;
    query.budget_min = value;
    this.setState({
      current: '1',
    });
    this.updateThreads(query, '1')
  };

  onChangeMax = (value) => {
    const query = this.state.query;
    query.budget_max = value;
    this.setState({
      current: '1',
    });
    this.updateThreads(query, '1')
  };

  onChangePage = (page) => {
    this.setState({
      current: page,
    });
    current = page;
    const query = this.state.query;
    this.updateThreads(query, page)
  };

  getSelection = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months.map(month => {
      return <Option key={month} value={month}>{month}</Option>
    })
  }

  onChangeMonth = (value) => {
    const query = this.state.query;
    query.months = value;
    this.setState({
      current: '1',
    });
    this.updateThreads(query, '1')
  }

  getCheckBox = () => {
    const themes = [
      'Mountain', 'Sea', 'Religion', 'Historical', 'Entertainment', 'Festival', 'Eating', 'Night Lifestyle', 'Photography', 'Sightseeing'
    ]; // fixed bugs in mongo
    return themes.map(theme => {
      var themeTrimed = theme.trim()
      return <Checkbox key={theme} value={theme.trim()}>&nbsp;{theme}</Checkbox>
    })
  }

  onChangeTheme = (checked) => {
    const query = this.state.query;
    query.themes = checked
    this.setState({
      current: '1',
    });
    this.updateThreads(query, '1')
  }

  handleType = (type, typeThread) => {
    const query = this.state.query;
    query.type = type

    this.setState({
      query: query,
      typeThread,
      current: '1'
    });
    this.getThreads(query, '1');
  }

  handleSortBy = (sortBy, sortThread) => {
    const query = this.state.query;
    query.sortby = sortBy

    this.setState({
      query: query,
      sortThread,
      current: '1'
    });
    this.getThreads(query, '1');
  }

  onHeartFavoriteClick = (i, id) => {
    const threadId = id;
    console.log(id)
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        axios.put(`http://${backend_url}/api/my-triplist/favorites/${threadId}`, {}, {
          headers: {
            'Authorization': idToken
          }
        })
      }).catch(function (error) {
        console.log(error)
      });

    const newThemes = this.state.heartFavorites
    newThemes[i] = newThemes[i] !== 'outlined' ? 'outlined' : 'filled'
    this.setState({
      heartFavorites: newThemes
    })
  }

  getThreads = async (query, current) => {
    let response = null;
    const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })
    this.props.history.push(`/forums${q}`);

    try {
      response = await axios.get(`http://${backend_url}/api/forums/${current}/filter${q}`)
    } catch (error) {
      console.log(error);
    }

    if (response) {
      this.mapData(response);
    }
  }

  mapData(response) {
    const threadProperties = response.data.threads.map(item => {
      return {
        ...item,
        link: 'https://pantip.com/topic/' + item.topic_id,
        day: item.duration.label,
        budget: '฿'.repeat(parseInt(item.floor_budget).toString().length),
        popular: item.popularity,
        country: item.countries.map(c => c.nameEnglish),

        country_short: item.countries.map(c => c.country),
        vote: item.vote,
        duration: item.duration.label,
        typeday: item.duration.days,
        theme: item.theme.map(c => c.theme),
        // fav: waiting for forum route api to send
      };
    });

    this.setState({
      threadProperties: threadProperties,
      heartRecentlyViews: threadProperties.map(() => 'outlined'),
      // heartFavorites: threadProperties.map(() => 'outlined'),
    })
  }

  componentDidMount() {
    axios
      .get(`http://${backend_url}/api/home/mapCountries`)
      .then(res => {
        const countries_search = res.data.map(item => {
          return {
            ...item,
          };
        });

        for (var i = 0; i <= countries_search.length; i++) {
          var countryNameEng = countries_search[i].nameEnglish;
          country.push(
            <Option key={countries_search[i].country} value={countryNameEng}>
              {countryNameEng}
            </Option>
          );
        }
      })
      .catch(err => console.log(err));

    const query = this.getQueryParams();
    if (!query.type) {
      query.type = 'review';
    }
    if (!query.duration_type) {
      query.duration_type = 1;
    }
    if (!query.budget_min & !query.budget_max) {
      query.budget_min = 0;
      query.budget_max = 50000;
    }
    this.updateThreads(query, current)
  }

  getQueryParams() {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
  }

  getTypeButtons = () => {
    const types = [
      { type: 'review', id: 1, title: 'Review Trip' },
      { type: 'suggest', id: 2, title: 'Places or Events Suggestion' }
    ]

    return types.map(type => {
      return (
        <Col span={12} key={type.id}>
          <Button
            id='type-btn'
            size='large'
            onClick={() => this.handleType(type.type, type.id)}
            className={`type-btn ${this.state.typeThread === type.id ? 'active' : ''}`}
            value={this.state.query.type}
          >
            {type.title}
          </Button>
        </Col>
      )
    })
  }

  getSortButtons = () => {
    const sorts = [
      { sort: 'popular', id: 1, title: 'Most Popular', icon: 'fire', theme: 'filled' },
      { sort: 'upvoted', id: 2, title: 'Most Upvoted', icon: 'plus' },
      { sort: 'newest', id: 3, title: 'Newest' },
      { sort: 'oldest', id: 4, title: 'Oldest' }
    ]

    return sorts.map(sort => {
      return (
        <Col span={6} key={sort.id} className='sort-col'>
          <Button
            id='sort-btn'
            size='large'
            onClick={() => this.handleSortBy(sort.sort, sort.id)}
            className={`sort-btn ${this.state.sortThread === sort.id ? 'active' : ''}`}
            value={this.state.query.sortby}>
            {sort.icon
              ? <Icon type={sort.icon} theme={sort.theme} />
              : ''
            }
            {sort.title}</Button>
        </Col>
      )
    })
  }

  getForumThreads = () => {
    if (!this.state.threadProperties || this.state.threadProperties.length <= 0 || this.state.threadProperties < 1) {
      return <SpinLoading />
    }

    const menu = (
      <Menu>
        <SubMenu title='Add to My Triplist'>
          <Menu.Item>New Triplist</Menu.Item>
          {/* <Menu.Item>Japan Trip</Menu.Item> */}
        </SubMenu>
        <Menu.Item>Save to My Favorite</Menu.Item>
        <Menu.Item>Share</Menu.Item>
      </Menu>
    )

    return this.state.threadProperties.map((thread, index) => {
      return (
        <Row key={index} className='thread-row'>
          <Col span={4} className='forum-thread-img'>
            <img alt={thread.topic_id} src={thread.thumbnail} />
          </Col>
          <Col span={18} className='forum-thread-info'>
            <Row className='forum-title'>
              <a href={thread.link} target='_blank' rel='noopener noreferrer'>
                {thread.title}
              </a>
            </Row>
            <Row className='forum-tag'>
              {thread.day !== 'Not Define' ? <Tag>{thread.day}</Tag> : ''}&nbsp;&nbsp;
              {thread.budget != '฿฿' ? <Tag>{thread.budget}</Tag> : ''}
            </Row>
            <Row className='forum-pop'>
              <Icon type='plus' />
              <p>{thread.vote}&nbsp;&nbsp;upvoted</p>
              <Icon type='fire' theme='filled' />
              <p>{thread.popular}&nbsp;&nbsp;popular</p>
            </Row>
          </Col>
          <Col span={2} className='forum-option'>
            <Icon
              type='heart'
              theme={this.state.heartFavorites}
              onClick={this.onHeartFavoriteClick}
              id='icon-heart'
            />
            <Dropdown overlay={menu} id='icon'>
              <Icon type='more' id='icon-more' />
            </Dropdown>
          </Col>
        </Row>
      )
    })
  }

  render() {
    return (
      <div className='container forum-layout'>
        <Layout>
          <Sider className='sider' width='300'>
            <Row className='space'>
              <Col span={12} id='filter-tag'>
                <p>Filter</p>
              </Col>
              <Col span={12} id='reset-filter-tag'>
                <a href='/forums'>Reset Filter</a>
              </Col>
            </Row>
            <hr id='devider-line' />
            <Row>
              <Col span={24}>
                <Menu
                  onClick={this.handleClick}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['country', 'duration', 'budget', 'month', 'theme']}
                  mode="inline"
                >
                  <SubMenu
                    key='country'
                    title={<span>Country</span>}
                    className='sub-menu'
                  >
                    <Select
                      mode='multiple'
                      value={this.state.query.countries}
                      placeholder="Please select"
                      onChange={this.onChangeCountry}
                      id='select-box'
                    >
                      {country}
                    </Select>
                  </SubMenu>
                  <hr id='devider-line' />
                  <SubMenu
                    key='duration'
                    title={<span>Duration</span>}
                    className='sub-menu'
                  >
                    <Radio.Group
                      onChange={this.onChangeDuration}
                      value={this.state.query.duration_type}
                      className='radio-box'
                    >
                      <Radio value={1}>&nbsp;1 - 3 Days</Radio>
                      <Radio value={2}>&nbsp;4 - 6 Days</Radio>
                      <Radio value={3}>&nbsp;7 - 9 Days</Radio>
                      <Radio value={4}>&nbsp;10 - 12 Days</Radio>
                      <Radio value={5}>&nbsp;More than 12 Days</Radio>
                    </Radio.Group>
                  </SubMenu>
                  <hr id='devider-line' />
                  <SubMenu
                    key='budget'
                    title={<span>Budget per Person</span>}
                    className='sub-menu'
                  >
                    <Slider
                      range
                      min={0}
                      max={50000}
                      onChange={this.onChangeBudget}
                      defaultValue={[0, 50000]}
                    />
                    <div className='input-budget'>
                      <div className='input-min'>
                        <p>Min</p>
                        <InputNumber
                          min={0}
                          max={50000}
                          defaultValue={0}
                          value={this.state.query.budget_min}
                          onChange={this.onChangeMin}
                        />
                      </div>
                      <div className='input-max'>
                        <p>Max</p>
                        <InputNumber
                          min={0}
                          max={50000}
                          defaultValue={50000}
                          value={this.state.query.budget_max}
                          onChange={this.onChangeMax}
                        />
                      </div>
                    </div>
                  </SubMenu>
                  <hr id='devider-line' />
                  <SubMenu
                    key="month"
                    title={<span>Month</span>}
                    className='sub-menu'
                  >
                    <Select
                      defaultValue='January'
                      placeholder='Month'
                      value={this.state.query.months}
                      onChange={this.onChangeMonth}
                      className='select-month'
                    >
                      {this.getSelection()}
                    </Select>
                  </SubMenu>
                  <hr id='devider-line' />
                  <SubMenu
                    key="theme"
                    title={<span>Theme</span>}
                    className='sub-menu'
                  >
                    <Menu.Item id='theme-menu'>
                      <Checkbox.Group onChange={this.onChangeTheme}>
                        {this.getCheckBox()}
                      </Checkbox.Group>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Col>
            </Row>
          </Sider>
          <Layout>
            <Header className='forum-header'>
              <Row>
                <p>{this.state.query.countries}</p>
                {this.getTypeButtons()}
              </Row>
              <Row className='sort-row'>
                {this.getSortButtons()}
              </Row>
            </Header>
            <Content className='forum-content'>
              <Row className='forum-row'>
                {this.getForumThreads()}
                {/* <Pagination current={this.state.current} onChange={this.onChangePage} total={100}
                  style={{ backgroundColor: '#FFF' }} /> */}
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default withRouter(Forums, ForumlistPage);