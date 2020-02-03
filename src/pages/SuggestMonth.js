import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Carousel, Col, Select } from 'antd';
import "../css/suggest.css";

const checkBudget = (a, b) => (b <= a)
const { Option } = Select;

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

    onBlur() {
        console.log('blur');
    }

    onFocus() {
        console.log('focus');
    }

    onSearch(val) {
        console.log('search:', val);
    }

    onChangeMonth = (value) => {
        this.onWithin()
        console.log(`selected ${value}`);
        const query = this.state.query;
        query.month = value;
        this.setState({ query: query });
        this.getInformation(query);
    }

    onWithin = () => {
        const query = this.state.query;
        query.within_th = this.props.within;
        console.log("checkwithin:" + query.within_th)
        this.setState({ query: query });
        this.getInformation(query);
    }



    async getInformation(query) {
        let response = null;
        const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })
        this.props.history.push(`/${q}`);
        try {
            response = await axios.get(`http://localhost:30010/home/monthQuery${q}`)
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

    getQueryParams(value) {
        return qs.parse(value, { ignoreQueryPrefix: true })
    }

    componentDidMount() {
        this.onWithin()
        const q = this.getQueryParams(this.props.location.search);
        this.setState({
            query: q
        })
        this.getInformation(q);
    }

    CreateSuggest(startIndex) {
        if (this.state.threadProperties < 1) {
            return 'Loading'
        }

        const list = [
            this.state.threadProperties[startIndex],
            this.state.threadProperties[startIndex + 1],
            this.state.threadProperties[startIndex + 2]
        ]

        return list.map(d => {
            return (
                <Col>
                    <Col span={2}>
                        <img
                            style={{ width: 100, height: 100, margin: "20px" }}
                            alt="example"
                            src={d.thumbnail}
                        />
                    </Col>
                    <Col span={6}>
                        <a href={d.link} target="_blank" rel="noopener noreferrer" style={{ color: "#181741" }}>
                            {d.title}
                        </a>
                    </Col>
                </Col>
            );
        });
    };

    render() {
        return (
            <div>
                <div style={{ marginTop: "20px" }}>Popular threads based on your Month</div>
                <div style={{ backgroundColor: "rgba(130, 142, 180, 0.15)", width: "1100px", marginLeft: "50px", marginRight: "40px", marginTop: "20px" }}>
                    <Select
                        showSearch
                        style={{ marginLeft: 22, marginRight: 22, width: 150 }}
                        placeholder="Filter by Month"
                        optionFilterProp="children"
                        value={this.state.query.month}
                        onChange={this.onChangeMonth}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        <Option value="January">January</Option>
                        <Option value="February">February</Option>
                        <Option value="March">March</Option>
                        <Option value="April">April</Option>
                        <Option value="May">May</Option>
                        <Option value="June">June</Option>
                        <Option value="July">July</Option>
                        <Option value="August">August</Option>
                        <Option value="September">September</Option>
                        <Option value="October">October</Option>
                        <Option value="November">November</Option>
                        <Option value="December">December </Option>
                    </Select>
                </div>
              
                    <Carousel autoplay style={{ marginLeft: "50px", marginRight: "40px", marginBottom: "20px", width: "1100px"}}>

                        <div>
                            {this.CreateSuggest(0)}
                        </div>
                        <div>
                            {this.CreateSuggest(3)}
                        </div>
                        <div>
                            {this.CreateSuggest(6)}
                        </div>
                        <div>
                            {this.CreateSuggest(9)}
                        </div>

                    </Carousel>
                </div>

        )
    }
}

export default withRouter(SuggestMonth);