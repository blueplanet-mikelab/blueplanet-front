import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import * as ROUTES from '../constants/routes';

import 'antd/dist/antd.css';
import "../css/suggest.css";
import { Carousel, Col, Select, Row, Tag, Menu, Icon, Dropdown } from 'antd';

const { Option } = Select;
const { SubMenu } = Menu;

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

class SuggestMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      threadSuggest: [],
      threadProperties: [],
      list: [],
      value: 1,
      radio: 1,
      fullData: [],
      query: {},
    };
  }

  onChangeMonth = (value) => {
    this.onWithin()
    const query = this.state.query;
    query.month = value;
    this.setState({ query: query });
    this.getThreads(query);
  }

  onWithin = () => {
    const query = this.state.query;
    query.within_th = this.props.within;
    console.log("checkwithin:" + query.within_th)
    this.setState({ query: query });
    this.getThreads(query);
  }

  getThreads = async (query) => {
    let response = null;
    const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })
    this.props.history.push(`/${q}`);

    try {
      response = await axios.get(`http://${backend_url}/api/home/monthQuery${q}`)
    } catch (error) {
      console.log(error);
    }

    if (response) {
      this.mapData(response);
    }
  }

  mapData(response) {
    const threadProperties = response.data.map(item => {
      return {
        ...item,
        country: item.countries.map(c => c.nameEnglish + " "),
      };
    });

    this.setState({
      threadProperties: threadProperties,
    });
  }

  getQueryParams(value) {
    return qs.parse(value, { ignoreQueryPrefix: true })
  }

  componentDidMount() {
    this.onWithin()
    const query = this.getQueryParams(this.props.location.search);
    query.month = 'January'

    this.setState({
      query: query
    })
    this.getThreads(query);
  }

  getSelection = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months.map(month => {
      return <Option key={month} value={month}>{month}</Option>
    })
  }

  getCarousel = () => {
    const carouselIndex = [0, 3, 6, 9]
    return carouselIndex.map(index => {
      return (
        <div key={index}>{this.createSuggestion(index)}</div>
      )
    })
  }

  createSuggestion = (startIndex) => {
    if (this.state.threadProperties < 1) {
      return 'Loading'
    }

    const threadList = [
      this.state.threadProperties[startIndex],
      this.state.threadProperties[startIndex + 1],
      this.state.threadProperties[startIndex + 2]
    ]

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

    return threadList.map(thread => {
      return (
        <Col span={8} className='thread-card' key={thread.topic_id}>
          <Col span={12}>
            <img src={thread.thumbnail} alt='Thumbnail' />
          </Col>
          <Col span={12} className='thread-info'>
            <Row className='thread-title'>
              <Col>
                <a
                  href={`https://pantip.com/topic/${thread.topic_id}`}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {thread.title}
                </a>
              </Col>
            </Row>
            <Row className='thread-option'>
              <Col span={12} id='tag'>
                <Tag>{thread.countries[0].nameEnglish}</Tag>
              </Col>
              <Col span={12} id='icon'>
                <Icon
                  type='heart'
                  theme={this.state.heartFavorites}
                  onClick={this.onHeartFavoriteClick}
                />
                <Dropdown overlay={menu}>
                  <Icon type='more' />
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Col>
      )
    })
  }

  render() {
    return (
      <div className='container'>
        <Row className='suggestion-threads'>
          <Col span={12} className='suggest-title'>
            <Icon
              type='fire'
              theme='filled'
            />
            <p>&nbsp;&nbsp; Popular threads based on your <span>Month</span></p>
          </Col>
          <Col span={12} className='see-more'>
            <Link to={ROUTES.FORUMS + '?months=' + this.state.query.month}>See more</Link>
          </Col>
          <Col span={24} className='carousel-box' id='select'>
            <Select
              defaultValue='January'
              placeholder='Month'
              value={this.state.query.month}
              onChange={this.onChangeMonth}
              className='select-option'
            >
              {this.getSelection()}
            </Select>
            <Carousel autoplay>
              {this.getCarousel()}
            </Carousel>
          </Col>
        </Row>
      </div>
    )
  }

}

export default withRouter(SuggestMonth);