import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import 'antd/dist/antd.css';
import "../css/suggest.css";
import { Row, Col, Carousel, Icon } from 'antd';

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

const getCarousel = () => {
  const carouselIndex = [0, 5]
  return carouselIndex.map(index => {
    return (
      <Row justify='space-around' key={index}>{createSuggestion(index)}</Row>
    )
  })
}

const createSuggestion = (startIndex) => {
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

  return list.map(theme => {
    return (
      <Col span={4} key={theme.title} className='theme-img'>
        <a href={theme.link}>
          <img
            src={theme.picture}
            alt={theme.title}
          />
          <p className='centered theme-title'>{theme.title}</p>
        </a>
      </Col>
    );
  });
}

const Theme = () => {
  return (
    <div className='container'>
      <Row className='suggestion-threads'>
        <Col span={12} className='suggest-title'>
          <Icon
            type='fire'
            theme='filled'
          />
          <p>&nbsp;&nbsp; Pick by <span>Theme</span></p>
        </Col>
        <Col span={12} className='see-more'>
          <Link to={ROUTES.FORUMS}>
            See more
        </Link>
        </Col>
        <Col span={24} className='carousel-box'>
          <Carousel className='theme'>
            {getCarousel()}
          </Carousel>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(Theme);