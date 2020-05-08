import React, { useState, Component } from 'react';
import { withRouter } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';
import MapChart from '../components/MapChart';
import SuggestThreads from '../components/SuggestThreads';

import * as ROUTES from '../constants/routes';

import "../css/index.css";
import { Row, Col, Select, Button } from 'antd';

import axios from 'axios';

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'
const { Option } = Select;

const Tooltip = () => {
  const [content, setContent] = useState('');
  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      countrySelected: null,
      value: 1
    };
  }

  countries = []

  componentDidMount() {
    axios
      .get(`http://${backend_url}/api/home/mapCountries`)
      .then(res => {
        res.data.forEach(country => {
          this.countries.push(
            <Option key={country.country} value={country.nameEnglish}>
              {country.nameEnglish}
            </Option>
          )
        })
      })
      .catch(err => console.log(err));   
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.currentUser
    })
  }

  onChangeCountry = (country) => {
    this.setState({
      countrySelected: country
    })
  }

  scrolltoSuggest = () => {
    document.getElementById('suggest').scrollIntoView();
  }

  onSearch = () => {
    console.log(this.state.countrySelected)
    this.props.history.push(`${ROUTES.FORUMS}?countries=${this.state.countrySelected}`)
  }

  render() {
    return (
      <div className='container content-box'>
        <Row className='country-search'>
          <Col span={24}>
            <p id='main-title'>Which Country would you like to visit?</p>
            <p id='main-tip'>Type the name of Country or select on our map below.</p>
          </Col>
          <Col span={24} className='search-select'>
            <Select
              showSearch
              size='large'
              placeholder='Search by Country'
              optionFilterProp="children"
              onChange={this.onChangeCountry}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.countries}
            </Select>
            <Button
              id='searchBth'
              size='large'
              onClick={this.onSearch}
            >
              Search
            </Button>
          </Col>
          <Col span={24} className='country-tooltip'>
            <Tooltip />
          </Col>
          <Col span={24} className='navigate'>
            <p id='second-title'>Don’t know where to go yet? Let us help you!</p>
            <p id='second-tip'>Type the name of Country or select on our map below.</p>
            <Button
              className='scrolldown-btn'
              shape="circle"
              icon="down"
              onClick={this.scrolltoSuggest}>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24} id='suggest'>
            <SuggestThreads currentUser={this.state.currentUser}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Index);