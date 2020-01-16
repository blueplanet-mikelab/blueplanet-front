import React, { useState, Component } from "react";
import { withRouter } from 'react-router';
import ReactTooltip from "react-tooltip";
import "../css/styles.css";

import HeaderPage from "./HeaderPage";
import MapChart from "./MapChart";

import { Select, Button } from 'antd';

const { Option } = Select;

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

    onChangeCountry = (value) => {
        console.log(`selected ${value}`);
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

    render() {
        return (
            <div>
                <HeaderPage />
                <div className="country-search">
                    <h2 style={{margin: '5px'}}>Which Country would you like to visit?</h2>
                    <h6 style={{margin: '10px'}}>Type the name of Country or select on our map below. </h6>
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
                        <Option value="January">January</Option>
                    </Select>
                    <Button style={{
                        color: '#FFFFFF',
                        background: 'linear-gradient(270deg, #181741 -127.74%, #828EB4 100%)',
                        borderRadius: '5px'
                    }}>Search</Button>
                    <App />
                    <h2>Don’t know where to go yet? Let us help you!</h2>
                    <h6>We’re selecting the best of threads based on your conditions.</h6>
                </div>
            </div >)
    }

}

export default withRouter(Index);
