import React, { memo, Component, } from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import SpinLoading from './SpinLoading';
import '../css/mapChart.css';

import axios from 'axios';
const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

// calculate number of people
const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 1000000000) / 10 + 'K';
  } else if (num > 1000000) {
    return Math.round(num / 1000000) / 10 + 'K';
  } else {
    return Math.round(num / 1000) / 10 + 'K';
  }
};

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

class MapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadPoperties: [],
      value: 1,
      markers: [],
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
        this.createMarks()
      })
      .catch(err => console.log(err));
  }

  createMarks() {
    if (this.state.threadPoperties < 1) {
      return <SpinLoading />
    }

    var markers = []
    for (var i = 0; i < 3; i++) {
      markers.push({
        markerOffset: 25,
        name: `${i + 1}`,
        nameCountry: this.state.threadPoperties[i].nameEnglish,
        coordinates: [this.state.threadPoperties[i].longitude, this.state.threadPoperties[i].latitude]
      })
    }

    this.setState({
      markers: markers
    })
  };

  marker = () => {
    return this.state.markers.map(marker => {
      return (
        <Marker key={marker.name} coordinates={marker.coordinates}>
          <g
            fill='none'
            stroke='#FB3640'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            transform='translate(-12, -24)'
          >
            <circle cx='12' cy='10' r='3' />
            <path d='M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z' />
          </g>
          <text
            textAnchor='middle'
            y={marker.markerOffset}
          >
            {marker.name}
          </text>
        </Marker>
      );
    });
  }

  fillColor = (nameCountry) => {
    return this.state.markers.forEach((marker) => {
      if (marker.nameCountry === nameCountry) {
        console.log(marker.nameCountry)
        console.log(nameCountry)
        return ({
          default: {
            fill: '#000000',
            stroke: "#607D8B",
            strokeWidth: 0.75,
            outline: "none"
          }
        })
      }
    })
  }

  render() {
    return (
      <ComposableMap data-tip=''>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo, i) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={this.fillColor(geo.properties.NAME)}
                  // style={{
                  // default: {
                  // fill: '#000000',
                  // stroke: "#607D8B",
                  // strokeWidth: 0.75,
                  // outline: "none"
                  // }
                  // }}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    // this.props.setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                    this.props.setTooltipContent(`${NAME}`);
                  }}
                  onMouseLeave={() => {
                    this.props.setTooltipContent('');
                  }}
                />
              ))
            }
          </Geographies>
          {this.marker()}
        </ZoomableGroup>
      </ComposableMap>
    )
  }
}

export default memo(MapChart);