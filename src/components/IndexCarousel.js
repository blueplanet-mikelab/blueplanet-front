import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getTriplists, addThreadIntoTrip, onHeartFavoriteClick } from '../auth/Auth';

import { Carousel, Col, Menu, Row, Tag, Icon, Dropdown } from 'antd';
import '../css/suggest.css';
import SpinLoading from './SpinLoading';

const { SubMenu } = Menu;
var triplists = []

var menuBefore = (
  <Menu className='dropdown-menu'>
    <SubMenu title='Add to My Triplist'>
      <Menu.Item>New Triplist</Menu.Item>
    </SubMenu>
  </Menu>
)

class IndexCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      menu: [],
      threadProperties: [],
      menuDrop: menuBefore,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.currentUser,
      threadProperties: nextProps.threadProperties,
      heartFavorites: nextProps.threadProperties.map(() => "outlined"),
    }, () => {
      this.getMenu()
    })
  }

  getMenu = async () => {
    if (this.state.currentUser) {
      const triplists = await getTriplists()
      this.setState({
        menu: triplists.map((triplist, i) => (
          <Menu.Item key={i}>{triplist.title}</Menu.Item>
        ))
      })
    } else {
      // if not have current user
    }
  }

  getCarousel = () => {
    const carouselIndex = [0, 3, 6, 9]
    return carouselIndex.map(index => {
      return (
        <div key={index}>{this.createSuggestion(index)}</div>
      )
    })
  }

  handleDropDown = async (id, thumbnail) => {
    if (this.state.currentUser) {
      const triplists = await getTriplists()
      var allTrip = triplists.map((thread, i) => {
        return (
          <Menu.Item key={thread._id} onClick={() => addThreadIntoTrip(thread._id, id)}>{thread.title}</Menu.Item>
        )
      })
      var menuSuggest = (
        <Menu>
          <SubMenu title="Add to My Triplist">
            <Menu.Item >New Triplist</Menu.Item>
            {allTrip}
          </SubMenu>
        </Menu>
      );
      this.setState({
        menuDrop: menuSuggest
      })
    } else {
      // if not have current user
    }
    console.log('click drop', id);
  }

  heart = (i, id) => {
    if (this.state.currentUser) {
      onHeartFavoriteClick(id)
    }
    const newThemes = this.state.heartFavorites
    newThemes[i] = newThemes[i] !== "outlined" ? "outlined" : "filled"
    this.setState({
      heartFavorites: newThemes
    })
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

    // const menu = (
    //   <Menu className='dropdown-menu'>
    //     <SubMenu title='Add to My Triplist'>
    //       <Menu.Item>New Triplist</Menu.Item>
    //       {this.state.menu}
    //     </SubMenu>
    //   </Menu>
    // )

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
                  theme={this.state.heartFavorites[i]}
                  onClick={() => this.heart(i, thread._id)}
                />
                <Dropdown key={i} overlay={this.state.menuDrop} trigger={['click']}>
                  <Icon type='more'
                    onClick={() => this.handleDropDown(thread._id, thread.thumbnail)} />
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
      <Carousel autoplay>
        {this.getCarousel()}
      </Carousel>
    )
  }
}

export default withRouter(IndexCarousel)