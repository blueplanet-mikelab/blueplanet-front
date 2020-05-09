import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  getTriplists, addThreadIntoTrip, addRecentlyView,
  getFavoriteBool, putFavorite, deleteFavorite
} from '../auth/Auth';

import { Carousel, Col, Menu, Row, Tag, Icon, Dropdown, message } from 'antd';
import '../css/suggest.css';
import SpinLoading from './SpinLoading';

const { SubMenu } = Menu;

class IndexCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      threadProperties: [],
      heartFavorites: [],
      menuDropdown: (
        <Menu></Menu>
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.currentUser,
      threadProperties: nextProps.threadProperties,
    }, () => {
      this.updateFav()
    })
  }

  getCarousel = () => {
    const carouselIndex = [0, 3, 6, 9]
    return carouselIndex.map(index => {
      return (
        <div key={index}>{this.createSuggestion(index)}</div>
      )
    })
  }

  handleDropDown = async (thread) => {
    if (this.state.currentUser) {
      const triplists = await getTriplists()
      var dropdown = triplists.map((triplist, i) => {
        return (
          <Menu.Item key={i} onClick={
            async () => {
              const response = await addThreadIntoTrip(triplist._id, thread._id)
              console.log(response)
              message.success(response);
            }
          }>
            {triplist.title}
          </Menu.Item>
        )
      })
      this.setState({
        menuDropdown: (
          <Menu>
            <SubMenu title="Add to My Triplist">
              <Menu.Item >New Triplist</Menu.Item>
              {dropdown}
            </SubMenu>
          </Menu>
        )
      })
    } else {
      // if not have current user
    }
  }

  onHeartFavoriteClick = async (threadId) => {
    if (this.state.currentUser) {
      var response = '';
      if (await getFavoriteBool(threadId) !== true) {
        response = await putFavorite(threadId)
        message.success(response);
      } else {
        response = await deleteFavorite(threadId)
        message.success(response);
      }
      console.log(response) // response for alert
      this.updateFav()
    } else {
      // in case no user signed in
    }
  }

  updateFav = async () => {
    const { threadProperties, heartFavorites } = this.state;
    var favtemp = heartFavorites;
    if (this.state.currentUser) {
      var thread = threadProperties
      for (var i = 0; i < thread.length; i++) {
        favtemp[i] = await getFavoriteBool(thread[i]._id)
        this.setState({
          heartFavorites: favtemp
        })
      }
    } else {
      // if not have current user
    }
  }

  createSuggestion = (startIndex) => {
    if (this.state.threadProperties < 1) {
      return <SpinLoading />
    }

    const threadList = [
      this.state.threadProperties[startIndex],
      this.state.threadProperties[startIndex + 1],
      this.state.threadProperties[startIndex + 2]
    ]

    return threadList.map((thread, i) => {
      return (
        <Col span={8} className='thread-card' key={i}>
          <Col span={12}>
            <img src={thread.thumbnail} alt='Thumbnail' />
          </Col>
          <Col span={12} className='thread-info'>
            <Row className='thread-title'>
              <Col>
                <a
                  href={thread.link}
                  rel='noopener noreferrer'
                  target='_blank'
                  onClick={() => addRecentlyView(thread._id)}
                >
                  {thread.title}
                </a>
              </Col>
            </Row>
            <Row className='thread-option'>
              <Col span={12} id='tag'>
                <Tag>{thread.countries[0].nameEnglish}</Tag>
              </Col>
              <Col span={12} id='icon'>
                <Icon
                  type='heart'
                  theme={this.state.heartFavorites[i] === true ? 'filled' : 'outlined'}
                  onClick={() => this.onHeartFavoriteClick(thread._id)}
                />
                <Dropdown key={i} overlay={this.state.menuDropdown} trigger={['click']}>
                  <Icon type='more'
                    onClick={() => this.handleDropDown(thread)} />
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Col>
      )
    })
  }

  render() {
    return (
      <Carousel >
        {this.getCarousel()}
      </Carousel>
    )
  }
}

export default withRouter(IndexCarousel)