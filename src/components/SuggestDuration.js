import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import * as ROUTES from '../constants/routes';

import 'antd/dist/antd.css';
import "../css/suggest.css";
import { Radio, Carousel, Row, Col, Tag, Menu, Icon, Dropdown } from 'antd';
import SpinLoading from './SpinLoading';

const { SubMenu } = Menu;
const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

class SuggestDuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadProperties: [],
      query: {},
      q: ''
    };
  }

  onChangeDuration = (e) => {
    const query = this.state.query;
    query.duration_type = e.target.value;

    this.setState({
      query: query
    })
    this.getThreads(query);
  }

  getThreads = async (query) => {
    let response = null;
    const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })
    if (q !== this.state.q) {
      this.setState({
        q: q
      })
      this.props.history.push(`/${q}`);

      try {
        response = await axios.get(`http://${backend_url}/api/home/durationQuery${q}`)
      } catch (error) {
        console.log(error);
      }

      if (response) {
        this.mapData(response);
      }
    }
  }

  mapData(response) {
    const threadProperties = response.data.map(item => {
      return {
        ...item,
        link: "https://pantip.com/topic/" + item.topic_id,
        con: item.countries.map(c => c.nameEnglish + ""),
      };
    });
    this.setState({
      threadProperties: threadProperties,
    });
  }

  getQueryParams() {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
  }

  componentDidMount() {
    const query = this.getQueryParams();
    query.duration_type = '1';

    this.setState({
      query: query
    })
    this.getThreads(query)
  }

  componentWillReceiveProps(nextProps) {
    const query = this.state.query;
    query.within_th = nextProps.within
    this.setState({
      query: query
    });
    this.getThreads(query);
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
      return <SpinLoading />
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
            <p>&nbsp;&nbsp; Popular threads based on your <span>Duration</span></p>
          </Col>
          <Col span={12} className='see-more'>
            <Link to={ROUTES.FORUMS + '?duration_type=' + this.state.query.duration_type}>
              See more
            </Link>
          </Col>
          <Col span={24} className='carousel-box'>
            <Radio.Group
              name='radiogroup'
              onChange={this.onChangeDuration}
              value={this.state.query.duration_type ? this.state.query.duration_type : 1}
              className='radio-style'
              size='large'
            >
              <Radio value={'1'} id='first'>1 - 3 Days</Radio>
              <Radio value={'2'}>4 - 6 Days</Radio>
              <Radio value={'3'}>7 - 9 Days</Radio>
              <Radio value={'4'}>10 - 12 Days</Radio>
              <Radio value={'5'} id='last'>More than 12 Days</Radio>
            </Radio.Group>
            <Carousel autoplay>
              {this.getCarousel()}
            </Carousel>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(SuggestDuration);