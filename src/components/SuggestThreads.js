import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import * as ROUTES from '../constants/routes';

import 'antd/dist/antd.css';
import "../css/suggest.css";
import { Carousel, Col, Row, Tag, Button, Icon, Dropdown } from 'antd';
import SpinLoading from './SpinLoading';
import IndexDropdown from './IndexDropdown';

import SuggestDuration from "../components/SuggestDuration";
import SuggestMonth from "../components/SuggestMonth";
import SuggestTheme from "../components/Theme";

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010';

class SuggestThreads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      threadProperties: [],
      query: {},
      withThread: 2,
    };
  }

  getQueryParams(value) {
    return qs.parse(value, { ignoreQueryPrefix: true })
  }

  componentDidMount() {
    const query = this.getQueryParams(this.props.location.search);
    query.within_th = 0;
    this.setState({
      query: query
    })
    this.getThreads(query)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.currentUser
    })
  }

  onBoundClinked = (type, thread) => {
    const query = this.state.query;
    query.within_th = type;
    this.setState({
      query: query,
      withThread: thread
    });

    this.getThreads(query)
  }

  getThreads = async (query) => {
    let response = null;
    const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' });
    this.props.history.push(`/${q}`);

    try {
      response = await axios.get(`http://${backend_url}/api/home/suggestThreads${q}`)
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
        link: "https://pantip.com/topic/" + item.topic_id,
        country: item.countries.map(c => c.nameEnglish + " "),
      }
    })

    this.setState({
      threadProperties: threadProperties,
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
        <Col span={8} className='thread-card' key={thread.title}>
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
                <Tag>{thread.country[0]}</Tag>
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
      <div className='container' id='suggest-box'>
        <Row className='bound-btn'>
          <Button
            size='large'
            onClick={() => { this.onBoundClinked('1', 1) }}
            value={this.state.query.within_th}
            className={`type-btn ${this.state.withThread === 1 ? 'active' : ''}`}
            id='select-btn'
          >
            Within Thailand
          </Button>
          <Button
            size='large'
            onClick={() => { this.onBoundClinked('0', 2) }}
            value={this.state.query.within_th}
            className={`type-btn ${this.state.withThread === 2 ? 'active' : ''}`}
            id='select-btn'
          >
            International Countries
          </Button>
        </Row>
        <Row className='suggestion-threads'>
          <Col span={12} className='suggest-title'>
            <Icon
              type='fire'
              theme='filled'
            />
            <p>&nbsp;&nbsp; Popular <span>Suggestion Threads</span></p>
          </Col>
          <Col span={12} className='see-more'>
            <Link to={ROUTES.FORUMS + '?type=suggest'}>
              See more
            </Link>
          </Col>
          <Col span={24} className='carousel-box'>
            <Carousel autoplay>
              {this.getCarousel()}
            </Carousel>
          </Col>
        </Row>
        <SuggestDuration within={this.state.query.within_th} currentUser={this.state.currentUser}/>
        <SuggestMonth within={this.state.query.within_th} currentUser={this.state.currentUser}/>
        <SuggestTheme within={this.state.query.within_th} />
      </div>
    )
  }
}

export default withRouter(SuggestThreads);