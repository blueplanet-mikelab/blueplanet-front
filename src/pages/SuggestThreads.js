import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, Radio, Carousel, Icon, Divider, Row, Col, Tag } from 'antd';
import "../css/suggest.css";

const checkBudget = (a, b) => (b <= a)
// var threadSuggest = [];
class SuggestThreads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: [],
            threadSuggest: [],
            threadPoperties: [],
            list: [],
            value: 1,
            radio: 1,
            fullData: [],
            query: {},
        };
    }

    onChange(a, b, c) {
        console.log(a, b, c);
    }

    onChangeDuration = (e) => {
        console.log('radio checked', e.target.value);
        const query = this.state.query;
        query.duration = e.target.value;
        this.setState({ query: query });
        this.getInformation(query);
        this.setState({
            radio: e.target.value,
        });
    }

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
        const threadPoperties = response.data.map(item => {
            return {
                ...item,
                // link: "https://pantip.com/topic/" + item.topic_id,
                // country: item.countries.map(c => c.nameEnglish + " "),
                // duration: item.duration.label,
                // typeday: item.duration.days,
            };
        });
        this.setState({
            threadPoperties: threadPoperties,
        });
        console.log("knk" + this.state.threadPoperties[0].title);
    }

    getQueryParams() {
        return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    }

    componentDidMount() {
        const q = this.getQueryParams();
        this.setState({ query: q })
        this.getInformation(q);
    }

    CreateSuggest() {
        // var list = [];
        // for (var i = 0; i < 3; i++) {
        //     var list = this.state.threadSuggest.push(this.state.threadPoperties[i]);
        //     console.log("list" + list)
        // }
        // this.setState({ threadSuggest: list });

        // console.log("thread" + this.state.threadSuggest)
        return this.state.threadPoperties.map(d => {
            return (
                <Col>
                    <Col span={2}>
                        <img
                            style={{ width: 100, height: 100 }}
                            alt="example"
                            src={d.thumbnail}
                        />
                    </Col>
                    <Col span={6}>
                        <a href={d.link} style={{ color: "#181741" }}>
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
                <Row>
                    <Button size="default" style={{ borderRadius: 0 }}>Within Thailand</Button>
                    <Button size="default" style={{ borderRadius: 0 }}>International Countries</Button>
                </Row>

                <div style={{ marginTop: "20px" }}>Popular threads based on your Duration</div>
                <div style={{ backgroundColor: "rgba(130, 142, 180, 0.15)", width: "1100px", marginLeft: "50px", marginRight: "40px", marginTop: "20px" }}>
                    <Radio.Group name="radiogroup" style={{ padding: "10px" }} onChange={this.onChangeDuration} value={this.state.query.duration ? this.state.query.duration : 1}>
                        <Radio value={"1-3Days"}>1 - 3 Days</Radio>
                        <Radio value={"4-6Days"}>4 - 6 Days</Radio>
                        <Radio value={"7-9Days"}>7 - 9 Days</Radio>
                        <Radio value={"10-12Days"}>10 - 12 Days</Radio>
                        <Radio value={"Morethan12Days"}>More than 12 Days</Radio>
                    </Radio.Group>
                </div>

                <Carousel afterChange={this.onChange()} style={{ marginLeft: "50px", marginRight: "40px", marginBottom: "20px", width: "1100px" }}>

                    <div>
                        {this.CreateSuggest()}
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>

                </Carousel>


            </div>

        )
    }
}

export default withRouter(SuggestThreads);