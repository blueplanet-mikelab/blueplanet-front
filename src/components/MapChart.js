import React, { memo, Component, } from "react";
import axios from 'axios';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

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

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// const colorScale = scaleQuantize()
//   .domain([1, 10])
//   .range([
//     "#ffedea",
//     "#ffcec5",
//     "#ffad9f",
//     "#ff8a75",
//     "#ff5533",
//     "#e2492d",
//     "#be3d26",
//     "#9a311f",
//     "#782618"
//   ]);

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
        this.setState(
          {
            threadPoperties
          },
          () => {
            console.log(this.state)
            console.log(this.state.threadPoperties);
            // console.log("con:" + threadPoperties[0].country);
            // console.log("long" + threadPoperties[0].longitude)
          }
        );
      })
      .catch(err => console.log(err));
  }

  createMarks() {
    if (this.state.threadPoperties < 1) {
      return 'Loading'
    }
    const markers = [
      { markerOffset: -15, name: "1", coordinates: [this.state.threadPoperties[0].longitude, this.state.threadPoperties[0].latitude] },
      { markerOffset: 25, name: "2", coordinates: [this.state.threadPoperties[1].longitude, this.state.threadPoperties[1].latitude] },
      { markerOffset: -15, name: "3", coordinates: [this.state.threadPoperties[2].longitude, this.state.threadPoperties[2].latitude] }
    ];

    return markers.map(d => {
      return (
        <Marker key={d.name} coordinates={d.coordinates}>
          <circle r={5} fill="#F00" stroke="#fff" strokeWidth={1} />
          <text
            textAnchor="middle"
            y={d.markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {d.name}
          </text>
        </Marker>
      );
    });
  };

  createcolor(name) {
    if (name = "Thailand") {
      return "#FFFFFF"
    } else {
      return "#000000"
    }
  };

  render() {
    // const rounded = () => {
    //     return (
    //         <img
    //             style={{ width: 100, height: 100, margin: "20px" }}
    //             src="https://f.ptcdn.info/814/059/000/pfamjgizd8alwLvBl45-o.jpg"
    //         />
    //     );

    // };

    return (
      <ComposableMap data-tip="" style={{ marginTop: "-80px", marginLeft: "-70px", width: '85%', }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    // const { NAME } = geo.properties;
                    const { NAME, POP_EST } = geo.properties;
                    // this.props.setTooltipContent(`${NAME}`);
                    this.props.setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                  }}
                  onMouseLeave={() => {
                    this.props.setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                      stroke: "#EAEAEC"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
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
