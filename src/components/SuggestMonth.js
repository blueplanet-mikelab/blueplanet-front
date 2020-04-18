import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Carousel, Col, Select, Row, Tag, Menu, Icon, Dropdown } from 'antd';
import "../css/suggest.css";

const { Option } = Select;
const { SubMenu } = Menu;

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

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
            response = await axios.get(`http://${backend_url}/api/home/monthQuery${q}`)
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
                <div id="pop-suggest-thread">
                    <Icon
                        type="fire"
                        theme="filled"
                        style={{ marginRight: "19px" }}
                    />Popular threads based on your Month</div>
                <div style={{ backgroundColor: "#fff", marginLeft: "50px", marginRight: "40px", marginTop: "20px" }}>
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
            </div>

        )
    }

}

export default withRouter(SuggestMonth);