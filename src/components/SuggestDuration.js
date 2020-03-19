import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Radio, Carousel, Row, Col, Tag, Menu, Icon, Dropdown } from 'antd';
import "../css/suggest.css";

const { SubMenu } = Menu;
const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

class SuggestDuration extends Component {
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
        query.duration_type = e.target.value;
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

    // inCountry = (e) => {
    //     const query = this.state.query;
    //     query.within_th = 1;
    //     console.log('in thai' + query.within_th);
    //     this.setState({ query: query });
    //     this.getInformation(query);

    // }

    // outCountry = (e) => {
    //     const query = this.state.query;
    //     query.within_th = 0;
    //     console.log('out thai' + query.within_th);
    //     this.setState({ query: query });
    //     this.getInformation(query);
    // };

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
                link: "https://pantip.com/topic/" + item.topic_id,
                con: item.countries.map(c => c.nameEnglish + " "),
            };
        });
        this.setState({
            threadProperties: threadProperties,
        });
        console.log("thread[0]-day" + this.state.threadProperties[0].duration_type);
    }

    getQueryParams() {
        return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    }

    componentDidMount() {
        this.onWithin()
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

        const menu = (
            <Menu>
                <SubMenu title="Add to My Triplist">
                    <Menu.Item>New Triplist</Menu.Item>
                    <Menu.Item>Japan Trip</Menu.Item>
                </SubMenu>
                <Menu.Item>Save to My Favorite</Menu.Item>
                <Menu.Item>Share</Menu.Item>
            </Menu>
        );

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
                        <Row style={{ marginTop: "3%" }}>
                            <Tag color="rgba(130, 142, 180, 0.5)">{d.con}</Tag>

                            <Icon type="heart"
                                theme={this.state.heartFavorites}
                                onClick={this.onHeartFavoriteClick}
                                style={{ width: `5%`, margin: `auto 0 auto 2%`, fontSize: '23px', color: '#10828C' }} />
                            {/* <Icon type="more" style={{ width: `5%`, margin: 'auto', fontSize: '23px' }} /> */}
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="#" style={{ marginLeft: "5%" }}>
                                    <Icon type="more" style={{ color: "#10828C", width: `5%`, margin: 'auto', fontSize: '23px' }} />
                                </a>
                            </Dropdown>

                        </Row>
                    </Col>
                </Col>
            );
        });
    };

    render() {
        return (
            <div>
                {/* <Row>

                    <Button id="with" size="default" style={{ borderRadius: 0, paddingLeft: "50px", paddingRight: "50px", marginTop: "25px" }} onClick={this.inCountry} value={this.state.query.within_th}>Within Thailand</Button>
                    <Button id="with" size="default" style={{ borderRadius: 0, paddingLeft: "50px", paddingRight: "50px", marginTop: "25px" }} onClick={this.outCountry} value={this.state.query.within_th}>International Countries</Button>
                </Row> */}
                <div style={{ marginTop: "20px" }}>Popular threads based on your Duration</div>
                <div style={{ backgroundColor: "#fff", marginLeft: "50px", marginRight: "40px", marginTop: "20px" }}>
                    <Radio.Group name="radiogroup" style={{ padding: "10px" }} onChange={this.onChangeDuration} value={this.state.query.duration_type ? this.state.query.duration_type : 1}>
                        <Radio value={"1"}>1 - 3 Days</Radio>
                        <Radio value={"2"}>4 - 6 Days</Radio>
                        <Radio value={"3"}>7 - 9 Days</Radio>
                        <Radio value={"4"}>10 - 12 Days</Radio>
                        <Radio value={"5"}>More than 12 Days</Radio>
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

                {/* <SuggestMonth within={this.state.query.within_th} /> */}
            </div>

        )
    }
}

export default withRouter(SuggestDuration);