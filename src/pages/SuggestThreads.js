import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, Radio, Carousel, Row, Col, Tag, Select } from 'antd';
import "../css/suggest.css";
import SuggestMonth from "./SuggestMonth";

class SuggestThreads extends Component {
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

    onChangeDuration = (e) => {
        console.log('radio checked', e.target.value);
        const query = this.state.query;
        query.duration = e.target.value;
        this.setState({ query: query });
        this.getInformation(query);
        this.setState({
            radio: e.target.value,
            checkRoute: 1,
        });
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

    inCountry = (e) => {
        const query = this.state.query;
        query.within_th = 1;
        console.log('in thai' + query.within_th);
        this.setState({ query: query });
        this.getInformation(query);

    }

    outCountry = (e) => {
        const query = this.state.query;
        query.within_th = 0;
        console.log('out thai' + query.within_th);
        this.setState({ query: query });
        this.getInformation(query);
    };

    async getInformation(query) {
        let response = null;
        const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })
        this.props.history.push(`/${q}`);
        try {
            response = await axios.get(`http://localhost:30010/home/durationQuery${q}`)
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
                link: "https://pantip.com/topic/" + item.topic_id,
                con:  item.countries.map(c => c.nameEnglish + " "),
            };
        });
        this.setState({
            threadProperties: threadProperties,
        });
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
                    <Col span={3}>
                        <img
                            style={{ width: 100, height: 100, marginLeft: "15px" }}
                            alt="example"
                            src={d.thumbnail}
                        />
                    </Col>

                    <Col span={5} style={{ lineHeight: 'normal', marginTop: '20px' }}>
                        <Row>
                            <a href={d.link} target="_blank" rel="noopener noreferrer" style={{ color: "#181741" }}>
                                {d.title}
                            </a>
                        </Row>
                        <Row>
                            <Tag color="rgba(130, 142, 180, 0.5)">{d.con}</Tag>
                        </Row>
                    </Col>
                </Col>
            );
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Button size="default" style={{ borderRadius: 0, paddingLeft: "50px", paddingRight: "50px", marginTop: "25px" }} onClick={this.inCountry} value={this.state.query.within_th}>Within Thailand</Button>
                    <Button size="default" style={{ borderRadius: 0, paddingLeft: "50px", paddingRight: "50px", marginTop: "25px" }} onClick={this.outCountry} value={this.state.query.within_th}>International Countries</Button>
                </Row>
                <div style={{ marginTop: "20px", textAlign: "center" }}>Popular threads based on your Duration</div>
                <div style={{ backgroundColor: "rgba(130, 142, 180, 0.15)", marginLeft: "50px", marginRight: "40px", marginTop: "20px" }}>
                    <Radio.Group name="radiogroup" style={{ padding: "10px" }} onChange={this.onChangeDuration} value={this.state.query.duration ? this.state.query.duration : 1}>
                        <Radio value={"1-3Days"}>1 - 3 Days</Radio>
                        <Radio value={"4-6Days"}>4 - 6 Days</Radio>
                        <Radio value={"7-9Days"}>7 - 9 Days</Radio>
                        <Radio value={"10-12Days"}>10 - 12 Days</Radio>
                        <Radio value={"Morethan12Days"}>More than 12 Days</Radio>
                    </Radio.Group>
                </div>

                <Carousel autoplay style={{ marginLeft: "50px", marginRight: "40px", marginBottom: "20px" }}>

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

                <SuggestMonth within={this.state.query.within_th} />
                <SuggestMonth />
            </div>

        )
    }
}

export default withRouter(SuggestThreads);