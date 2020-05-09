import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { getTriplists, getFavoriteBool, putFavorite, deleteFavorite, addThreadIntoTrip } from '../auth/Auth';

import 'antd/dist/antd.css';
import '../css/forum.css';
import { Layout, Menu, Icon, Row, Col, Tag, Select, Radio, InputNumber, Slider, Checkbox, Button, Dropdown, Pagination } from 'antd';

import SpinLoading from '../components/SpinLoading';

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;
const country = [];

class Forums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      threadProperties: [],
      query: {},
      sortBy: 'popular',
      typeThread: 1,
      sortThread: 1,
      heartFavorites: [],
      current: 1,
      pages: 1,
      menuDropdown: (
        <Menu></Menu>
      )
    };
  }

  updateThreads = (query, current) => {
    this.setState({
      current: current,
      query: query,
    });
    this.getThreads(query, current);
  }

  onChangeCountry = (value) => {
    const query = this.state.query;
    query.countries = value;
    this.updateThreads(query, 1)
  };

  onChangeDuration = (e) => {
    const query = this.state.query;
    query.duration_type = e.target.value;
    this.updateThreads(query, 1)
  }

  onChangeBudget = (value) => {
    const query = this.state.query;
    query.budget_min = value[0];
    query.budget_max = value[1];
    this.updateThreads(query, 1)
  }

  onChangeMin = (value) => {
    const query = this.state.query;
    query.budget_min = value;
    this.updateThreads(query, 1)
  };

  onChangeMax = (value) => {
    const query = this.state.query;
    query.budget_max = value;
    this.updateThreads(query, 1)
  };

  onChangePage = (page) => {
    this.updateThreads(this.state.query, page)
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
    this.updateThreads(query, 1)
  }

  getCheckBox = () => {
    const themes = [
      'Mountain', 'Sea', 'Religion', 'Historical', 'Entertainment', 'Festival', 'Eating', 'Night Lifestyle', 'Photography', 'Sightseeing'
    ];
    return themes.map(theme => {
      return <Checkbox key={theme} value={theme.trim()}>&nbsp;{theme}</Checkbox>
    })
  }

  onChangeTheme = (checked) => {
    const query = this.state.query;
    query.themes = checked
    this.updateThreads(query, 1)
  }

  handleType = (type, typeThread) => {
    const query = this.state.query;
    query.type = type

    this.setState({
      query: query,
      typeThread,
      current: 1
    });
    this.getThreads(query, 1);
  }

  handleSortBy = (sortBy, sortThread) => {
    const query = this.state.query;
    query.sortby = sortBy

    this.setState({
      query: query,
      sortThread,
      current: 1
    });
    this.getThreads(query, 1);
  }

  handleDropDown = async (thread) => {
    if (this.state.currentUser) {
      const triplists = await getTriplists()
      var dropdown = triplists.map((triplist, i) => {
        return (
          <Menu.Item key={i} onClick={
            async () => {
              const response = await addThreadIntoTrip(triplist._id, thread._id)
              console.log(response)
            }
          }>
            {triplist.title}
          </Menu.Item>
        )
      })
      this.setState({
        menuDropdown: (
          <Menu>
            <SubMenu title="Add to My Triplist">
              <Menu.Item >New Triplist</Menu.Item>
              {dropdown}
            </SubMenu>
          </Menu>
        )
      })
    } else {
      // if not have current user
    }
  }

  onHeartFavoriteClick = async (threadId) => {
    if (this.state.currentUser) {
      var response = '';
      if (await getFavoriteBool(threadId) !== true) {
        response = await putFavorite(threadId)
      } else {
        response = await deleteFavorite(threadId)
      }
      console.log(response) // response for alert
      this.updateFav()
    } else {
      // in case no user signed in
    }
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
        id: item._id,
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
      };
    });

    this.setState({
      current: response.data.current_page,
      pages: response.data.total_page * 10,
      threadProperties: threadProperties
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
    this.updateThreads(query, 1)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.currentUser
    }, () => {
      this.updateFav()
    })
  }

  updateFav = async () => {
    const { threadProperties, heartFavorites } = this.state;
    var favtemp = heartFavorites;
    if (this.state.currentUser) {
      var thread = threadProperties
      for (var i = 0; i < thread.length; i++) {
        favtemp[i] = await getFavoriteBool(thread[i].id)
        this.setState({
          heartFavorites: favtemp
        })
      }
    } else {
      // if not have current user
    }
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

    return this.state.threadProperties.map((thread, i) => {
      return (
        <div key={i}>
          <Row className='thread-row'>
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
              {thread.budget !== '฿฿' ? <Tag>{thread.budget}</Tag> : ''}
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
                theme={this.state.heartFavorites[i] === true ? 'filled' : 'outlined'}
                onClick={() => this.onHeartFavoriteClick(thread.id)}
                id='icon-heart'
              />
              <Dropdown key={i} overlay={this.state.menuDropdown} trigger={['click']}>
                  <Icon type='more'
                    onClick={() => this.handleDropDown(thread)} />
                </Dropdown>
            </Col>
          </Row>
          <hr id='devider-line' />
        </div>
      )
    })
  }

  render() {
    const { query } = this.state;

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
                  mode='inline'
                >
                  <SubMenu
                    key='country'
                    title={<span>Country</span>}
                    className='sub-menu'
                  >
                    <Select
                      mode='multiple'
                      value={query.countries}
                      placeholder='Please select'
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
                      value={query.duration_type}
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
                          value={query.budget_min}
                          onChange={this.onChangeMin}
                        />
                      </div>
                      <div className='input-max'>
                        <p>Max</p>
                        <InputNumber
                          min={0}
                          max={50000}
                          defaultValue={50000}
                          value={query.budget_max}
                          onChange={this.onChangeMax}
                        />
                      </div>
                    </div>
                  </SubMenu>
                  <hr id='devider-line' />
                  <SubMenu
                    key='month'
                    title={<span>Month</span>}
                    className='sub-menu'
                  >
                    <Select
                      placeholder='Month'
                      value={query.months}
                      onChange={this.onChangeMonth}
                      className='select-month'
                    >
                      {this.getSelection()}
                    </Select>
                  </SubMenu>
                  <hr id='devider-line' />
                  <SubMenu
                    key='theme'
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
                <p>{query.countries}</p>
                {this.getTypeButtons()}
              </Row>
              <Row className='sort-row'>
                {this.getSortButtons()}
              </Row>
            </Header>
            <Content className='forum-content'>
              <Row className='forum-row'>
                {this.getForumThreads()}
                <Pagination
                  id='pagination'
                  current={this.state.current}
                  onChange={this.onChangePage}
                  total={this.state.pages}
                />
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default withRouter(Forums);