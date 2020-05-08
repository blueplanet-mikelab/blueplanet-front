import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import * as ROUTES from '../constants/routes';

import 'antd/dist/antd.css';
import "../css/suggest.css";
import { Carousel, Col, Select, Row, Tag, Icon, Dropdown } from 'antd';
import SpinLoading from './SpinLoading';
import IndexDropdown from './IndexDropdown';

const { Option } = Select;

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

class SuggestMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      threadProperties: [],
      query: {},
      q: ''
    };
  }

  onChangeMonth = (value) => {
    const query = this.state.query;
    query.month = value;
    this.setState({ query: query });
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
        response = await axios.get(`http://${backend_url}/api/home/monthQuery${q}`)
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
        link: 'https://pantip.com/topic/' + item.topic_id,
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
    const query = this.getQueryParams(this.props.location.search);
    query.month = 'January'

    this.setState({
      query: query
    })
    this.getThreads(query);
  }

  componentWillReceiveProps(nextProps) {
    const query = this.state.query;
    query.within_th = nextProps.within
    this.setState({
      query: query,
      currentUser: nextProps.currentUser
    });
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
      return <SpinLoading />
    }

    const threadList = [
      this.state.threadProperties[startIndex],
      this.state.threadProperties[startIndex + 1],
      this.state.threadProperties[startIndex + 2]
    ]

    const menu = (
      this.state.currentUser
        ? <IndexDropdown currentUser={this.state.currentUser} />
        : <IndexDropdown currentUser={null} />
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
                  href={thread.link}
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
            <Link to={ROUTES.FORUMS + '?months=' + this.state.query.month}>
              See more
            </Link>
          </Col>
          <Col span={24} className='carousel-box'>
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