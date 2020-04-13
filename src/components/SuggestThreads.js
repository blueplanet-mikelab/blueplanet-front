import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Carousel, Col, Row, Tag, Button, Menu, Icon, Dropdown } from 'antd';
import "../css/suggest.css";

import SuggestDuration from "../components/SuggestDuration";
import SuggestMonth from "../components/SuggestMonth";
import SuggestTheme from "../components/Theme";

const { SubMenu } = Menu;
const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

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
            withThread: 2
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

    handleCountry = (withType, withThread) => {
        const query = this.state.query;
        query.within_th = withType
        console.log("check query.within_th: " + query.within_th)
        console.log("check withType: " + withType)
        this.setState({
            query: query,
            withThread
        });
        this.getInformation(query);
    }

    async getInformation(query) {
        let response = null;
        const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })
        this.props.history.push(`/${q}`);
        try {
            response = await axios.get(`http://${backend_url}/api/home/suggestThreads${q}`)
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
                country: item.countries.map(c => c.nameEnglish + " "),
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
                            style={{ width: 100, height: 100, margin: "15px" }}
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
                            <Tag color="rgba(130, 142, 180, 0.5)">{d.country}</Tag>

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
                <Row style={{ marginLeft: "15%", marginRight: "15%" }}>
                    <Col span={12}>
                        <Button
                            id="with"
                            size="default"
                            style={{ width: "100%", borderRadius: 0, paddingLeft: "50px", paddingRight: "50px", marginTop: "25px" }}
                            onClick={() => this.handleCountry('1', 1)}
                            className={`type-btn ${this.state.withThread === 1 ? 'active' : ''}`}
                            value={this.state.query.within_th}>
                            Within Thailand
                            </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            id="with"
                            size="default"
                            style={{ width: "100%", borderRadius: 0, paddingLeft: "50px", paddingRight: "50px", marginTop: "25px" }}
                            onClick={() => this.handleCountry('0', 2)}
                            className={`type-btn ${this.state.withThread === 2 ? 'active' : ''}`}
                            value={this.state.query.within_th}>
                            International Countries
                    </Button>
                    </Col>
                </Row>

                <div id="first-pop-suggest-thread">
                    <Icon
                        type="fire"
                        theme="filled"
                        style={{ marginRight: "19px" }}
                    />Popular Suggestion Threads</div>
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
                <SuggestDuration within={this.state.query.within_th} />
                <SuggestMonth within={this.state.query.within_th} />
                <SuggestTheme within={this.state.query.within_th} />
            </div>

        )
    }
}

export default withRouter(SuggestThreads);