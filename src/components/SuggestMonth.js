import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import * as ROUTES from '../constants/routes';

import 'antd/dist/antd.css';
import '../css/suggest.css';
import { Col, Select, Row, Icon } from 'antd';

import IndexCarousel from './IndexCarousel';

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
        country: item.countries.map(c => c.nameEnglish + ' '),
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
            <p>&nbsp;&nbsp; Popular threads based on your <span>Month</span></p>
          </Col>
          <Col span={12} className='see-more'>
            <Link to={ROUTES.FORUMS + '?months=' + query.month}>
              See more
            </Link>
          </Col>
          <Col span={24} className='carousel-box'>
            <Select
              defaultValue='January'
              placeholder='Month'
              value={query.month}
              onChange={this.onChangeMonth}
              className='select-option'
            >
              {this.getSelection()}
            </Select>
            <IndexCarousel threadProperties={threadProperties} currentUser={currentUser} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(SuggestMonth);