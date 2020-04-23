import React, { memo, Component, } from "react";
import { ZoomableGroup, ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import SpinLoading from './SpinLoading';
import '../css/mapChart.css';

import axios from 'axios';
const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

// calculate number of people
const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 1000000000) / 10 + "K";
  } else if (num > 1000000) {
    return Math.round(num / 1000000) / 10 + "K";
  } else {
    return Math.round(num / 1000) / 10 + "K";
  }
};

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

class MapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadPoperties: [],
      value: 1,
    };
  }

  componentDidMount() {
    axios
      .get(`http://${backend_url}/api/home/mapCountries`)
      .then(res => {
        const threadPoperties = res.data.map(item => {
          return {
            ...item,
            country: item.nameEnglish,
          };
        });
        this.setState({
          threadPoperties
        });
      })
      .catch(err => console.log(err));
  }

  createMarks() {
    if (this.state.threadPoperties < 1) {
      return <SpinLoading />
    }

    var markers = [];
    for (var i = 0; i < 3; i++) {
      markers.push({
        markerOffset: 25,
        name: `${i + 1}`,
        coordinates: [this.state.threadPoperties[i].longitude, this.state.threadPoperties[i].latitude]
      })
    }

    return markers.map(marker => {
      return (
        <Marker key={marker.name} coordinates={marker.coordinates}>
          <g
            fill="none"
            stroke="#FB3640"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={marker.markerOffset}
          >
            {marker.name}
          </text>
        </Marker>
      );
    });
  };

  render() {
    return (
      <ComposableMap data-tip="">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    this.props.setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                  }}
                  onMouseLeave={() => {
                    this.props.setTooltipContent('');
                  }}
                />
              ))
            }
          </Geographies>
          {this.createMarks()}
        </ZoomableGroup>
      </ComposableMap>
    )
  }
}

export default memo(MapChart);
