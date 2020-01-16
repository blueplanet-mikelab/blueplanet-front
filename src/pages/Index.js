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

const rootElement = document.getElementById("root");
//   ReactDOM.render(<App />, rootElement);

class Index extends Component {

    onChangeCountry = (value) => {
        console.log(`selected ${value}`);
        // const query = this.state.query;
        // query.months = value;
        // this.setState({ query: query });
        // this.getInformation(query);
    }

    render() {
        return (
            <div>
                <HeaderPage />
                <div className="country-search">
                    <h1>Which Country would you like to visit?</h1>
                    <div>Type the name of Country or select on our map below. </div>
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
                    <Button icon="search">Search</Button>
                </div>
                <App />
            </div>)
    }

}

export default withRouter(Index);
