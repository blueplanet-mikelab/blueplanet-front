import React, { useState, Component } from "react";
import { withRouter } from 'react-router';
import ReactTooltip from "react-tooltip";
import axios from 'axios';
import "../css/styles.css";
import { ScrollTo, ScrollArea } from "react-scroll-to";

import HeaderPage from "./HeaderPage";
import MapChart from "./MapChart";
import SuggestThreads from "./SuggestThreads";
import SuggestMonth from "./SuggestMonth";

import { Select, Button, Row } from 'antd';

const { Option } = Select;
var con = "non";

// const a = () => {
//     console.log('a')
//     return 1
// }

// const b = () => ( 
//    5
// )

// const b = () => {
//     console.log("")
//     return ( 
//     5
//  )
// }

// coordinate
// [long , lati]

const App = () => {
    const [content, setContent] = useState("");
    return (
        <div>
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </div>

    );
}

// const rootElement = document.getElementById("root");
//   ReactDOM.render(<App />, rootElement);

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: [],
            threadPoperties: [],
            value: 1,
            radio: 1,
            query: {},
            inputMinValue: 0,
            inputMaxValue: 20000,
        };
    }

    onChangeCountry = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            link: "/forums?country=" + value
        })

        // const query = this.state.query;
        // query.months = value;
        // this.setState({ query: query });
        // this.getInformation(query);
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

    componentDidMount() {
        axios
            .get("http://localhost:30010/home/mapCountries")
            .then(res => {
                const threadPoperties = res.data.map(item => {
                    return {
                        ...item,
                        // country: item.nameEnglish,
                    };
                });
                this.setState(
                    {
                        threadPoperties: threadPoperties,
                    },
                    () => {
                        console.log(this.state)
                        console.log(this.state.threadPoperties);
                        console.log("con:" + this.state.threadPoperties[0].country);
                    }
                );
            })
            .catch(err => console.log(err));
    }

    CreateSelection = () => {
        return this.state.threadPoperties.map(d => {
            return (
                <Option value={d.country}>{d.nameEnglish}</Option>
            );
        });
    };

    scrolltoSuggest = () => {
        var element = document.getElementById("suggest");
        element.scrollIntoView();
    }

    goForumPage = () => {
        window.location.href = this.state.link
    }

    render() {
        return (
            <div>
                <HeaderPage />
                <div className="country-search">
                    <h2 style={{ margin: '5px' }}>Which Country would you like to visit?</h2>
                    <h6 style={{ margin: '5px' }}>Type the name of Country or select on our map below. </h6>
                    <Select
                        showSearch
                        style={{ marginLeft: 22, marginRight: 22, width: 200 }}
                        placeholder="Search by Country"
                        optionFilterProp="children"
                        // value={this.state.query.months}
                        onChange={this.onChangeCountry}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {this.CreateSelection()}
                    </Select>
                    <Button onClick={this.goForumPage} style={{
                        color: '#FFFFFF',
                        background: 'linear-gradient(90deg, #FB3640 0%, #F97300 100%)',
                        borderRadius: '5px'
                    }} >Search</Button>
                    <App />
                    <div style={{ marginTop: "-250px" }}>
                        <h2>Don’t know where to go yet? Let us help you!</h2>
                        <h6>We’re selecting the best of threads based on your conditions.</h6>
                    </div>
                    <Button style={{
                        marginBottom: "50px",
                        width: "50px",
                        height: "50px"
                    }}
                        shape="circle"
                        icon="down"
                        onClick={this.scrolltoSuggest}>
                    </Button>

                    <div id="suggest" style={{
                        height: "1000px",
                        width: "1200px",
                    }}>
                        <div style={{ backgroundColor: "#F8F5E4", borderRadius: "3px" }}>
                            <SuggestThreads />
                            <SuggestMonth />
                            <SuggestMonth />
                        </div>
                    </div>
                </div>
            </div >)
    }

}

export default withRouter(Index);
