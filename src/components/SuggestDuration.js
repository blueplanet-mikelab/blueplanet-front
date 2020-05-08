import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import * as ROUTES from '../constants/routes';

import 'antd/dist/antd.css';
import '../css/suggest.css';
import { Radio, Row, Col, Icon } from 'antd';

import IndexCarousel from './IndexCarousel';

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

class SuggestDuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
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
        link: 'https://pantip.com/topic/' + item.topic_id,
        con: item.countries.map(c => c.nameEnglish + ''),
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
      query: query,
      currentUser: nextProps.currentUser
    });
    this.getThreads(query);
  }

  render() {
    const { query, threadProperties, currentUser } = this.state
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
            <Link to={ROUTES.FORUMS + '?duration_type=' + query.duration_type}>
              See more
            </Link>
          </Col>
          <Col span={24} className='carousel-box'>
            <Radio.Group
              name='radiogroup'
              onChange={this.onChangeDuration}
              value={query.duration_type ? query.duration_type : 1}
              className='radio-style'
              size='large'
            >
              <Radio value={'1'} id='first'>1 - 3 Days</Radio>
              <Radio value={'2'}>4 - 6 Days</Radio>
              <Radio value={'3'}>7 - 9 Days</Radio>
              <Radio value={'4'}>10 - 12 Days</Radio>
              <Radio value={'5'} id='last'>More than 12 Days</Radio>
            </Radio.Group>
            <IndexCarousel threadProperties={threadProperties} currentUser={currentUser} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(SuggestDuration);