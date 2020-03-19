import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, Row } from 'antd';
import "../css/suggest.css";

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

class WithIn extends Component {
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
      checkRoute: 1,
    };
  }

  inCountry = (e) => {
    const query = this.state.query;
    query.within_th = 0;
    console.log('in thai' + query.within_th);
    this.setState({ query: query });
    this.getInformation(query);

  }

  outCountry = (e) => {
    const query = this.state.query;
    query.within_th = 1;
    console.log('out thai' + query.within_th);
    this.setState({ query: query });
    this.getInformation(query);
  };

  async getInformation(query) {
    let response = null;
    const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })
    this.props.history.push(`/${q}`);
    try {
      response = await axios.get(`http://${backend_url}/home/durationQuery${q}`)
    } catch (error) {
      console.log(error);
    }
    if (response) {
      // Map data after get response
      this.mapData(response);
    }
  }

  mapData(response) {
    const threadProperties = response.data.map(item => {
      return {
        ...item,
      };
    });
    this.setState({
      threadProperties: threadProperties,
    });
    console.log("thread[0]-month" + this.state.threadProperties[0].month);
    console.log("thread[0]-day" + this.state.threadProperties[0].duration.label);
  }

  getQueryParams() {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
  }

  componentDidMount() {
    const q = this.getQueryParams();
    this.setState({
      query: q
    })
    this.getInformation(q);
  }

  render() {
    return (
      <div>
        <Row>
          <Button size="default" style={{ borderRadius: 0 }} onClick={this.inCountry} value={this.state.query.within_th}>Within Thailand</Button>
          <Button size="default" style={{ borderRadius: 0 }} onClick={this.outCountry} value={this.state.query.within_th}>International Countries</Button>
        </Row>
      </div>

    )
  }
}

export default withRouter(WithIn);