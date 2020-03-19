import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Carousel, Row, Col } from 'antd';
import "../css/suggest.css";
import "../css/theme.css";
import Eating from "../images/eating.jpg";
import Entertainment from "../images/entertainment.jpg";
import Festival from "../images/festival.jpg";
import Historical from "../images/historical.jpg";
import Mountain from "../images/mountain.jpg";
import NightLifeStyle from "../images/nightlife.jpg";
import Photography from "../images/photography.jpg";
import Religion from "../images/religion.jpg";
import Sea from "../images/sea.jpg";
import Sightseeing from "../images/sightseeing.jpg";

class Theme extends Component {
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

    CreateSuggest(startIndex) {

        const list_theme = [
            {
                title: "Eating",
                picture: Eating,
                link: "/forums?themes=Eating"
            },
            {
                title: "Entertainment",
                picture: Entertainment,
                link: "/forums?themes=Entertainment"
            },
            {
                title: "Festival",
                picture: Festival,
                link: "/forums?themes=Festival"
            },
            {
                title: "Historical",
                picture: Historical,
                link: "/forums?themes=Historical"
            },
            {
                title: "Mountain",
                picture: Mountain,
                link: "/forums?themes=Mountain"
            },
            {
                title: "NightLifeStyle",
                picture: NightLifeStyle,
                link: "/forums?themes=NightLifeStyle"
            },
            {
                title: "Photography",
                picture: Photography,
                link: "/forums?themes=Photography"
            },
            {
                title: "Religion",
                picture: Religion,
                link: "/forums?themes=Religion"
            },
            {
                title: "Sea",
                picture: Sea,
                link: "/forums?themes=Sea"
            },
            {
                title: "Sightseeing",
                picture: Sightseeing,
                link: "/forums?themes=Sightseeing"
            },
        ]

        const list = [
            list_theme[startIndex],
            list_theme[startIndex + 1],
            list_theme[startIndex + 2],
            list_theme[startIndex + 3],
            list_theme[startIndex + 4]
        ]
        return list.map(d => {
            return (
                <Col span={4} style={{ margin: "1%" }}>
                    <div class="container">
                        <a href={d.link} style={{ color: "#fff", fontWeight: "bold", fontSize: "30px", fontStyle: "normal" }}>
                            <img
                                style={{ width: "100%", height: "150px" }}
                                src={d.picture}
                            />
                            <div class="centered">{d.title}</div>
                        </a>
                    </div>
                </Col >
            );
        });
    };


    render() {
        return (
            <div>
                <div style={{ marginTop: "20px", textAlign: "center" }}>Pick by Theme</div>
                <Carousel autoplay id="theme" style={{ marginLeft: "50px", marginRight: "40px", marginBottom: "20px" }}>
                    <div>
                        {this.CreateSuggest(0)}
                    </div>
                    <div>
                        {this.CreateSuggest(5)}
                    </div>
                </Carousel>
            </div>

        )
    }
}

export default withRouter(Theme);