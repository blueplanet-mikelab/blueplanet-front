import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import * as ROUTES from '../constants/routes';

import 'antd/dist/antd.css';
import "../css/suggest.css";
import { Col, Row, Button, Icon } from 'antd';

import SuggestDuration from "../components/SuggestDuration";
import SuggestMonth from "../components/SuggestMonth";
import SuggestTheme from "../components/Theme";
import IndexCarousel from './IndexCarousel';

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

  render() {
    const { withThread, query, currentUser, threadProperties } = this.state;
    return (
      <div className='container' id='suggest-box'>
        <Row className='bound-btn'>
          <Button
            size='large'
            onClick={() => { this.onBoundClinked('1', 1) }}
            value={query.within_th}
            className={`type-btn ${withThread === 1 ? 'active' : ''}`}
            id='select-btn'
          >
            Within Thailand
          </Button>
          <Button
            size='large'
            onClick={() => { this.onBoundClinked('0', 2) }}
            value={query.within_th}
            className={`type-btn ${withThread === 2 ? 'active' : ''}`}
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
            <IndexCarousel threadProperties={threadProperties} currentUser={currentUser} />
          </Col>
        </Row>
        <SuggestDuration within={query.within_th} currentUser={currentUser} />
        <SuggestMonth within={query.within_th} currentUser={currentUser} />
        <SuggestTheme within={query.within_th} />
      </div>
    )
  }
}

export default withRouter(SuggestThreads);