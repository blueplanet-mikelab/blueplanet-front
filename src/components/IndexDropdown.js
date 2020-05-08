import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getTriplists } from '../auth/Auth';

import axios from 'axios';

import { Menu } from 'antd'
import "../css/suggest.css";

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'
const { SubMenu } = Menu;

const IndexDropdown = (currentUser) => {
  if (currentUser) {
    console.log('here')
    return <DropdownComp currentUser={currentUser} />
  } else {
    console.log('orhere')
    return <DropdownComp />
  }
}

class DropdownComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      menu: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.currentUser
    }, () => {
      this.getDropDown()
    })
  }

  getDropDown = async () => {
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

  handleThreadInTripDropDown = (id, thumbnail) => {
    const threadId = id;
    var allTrip = this.state.triplist.map(thread => {
      return (
        <Menu.Item onClick={() => this.addThreadIntoTrip(thread._id, threadId)}>{thread.title}</Menu.Item>
      )
    })
    var menuThreadInTrip = (
      <Menu>
        <SubMenu title="Add to My Triplist">
          <Menu.Item onClick={() => this.showModal(threadId, thumbnail)}>New Triplist</Menu.Item>
          {allTrip}
        </SubMenu>
        {/* <Menu.Item>Save to My Favorite</Menu.Item> */}
      </Menu>
    );
    console.log('click drop', id);
  }

  addThreadIntoTrip = (trip, id) => {
    console.log(trip)
    console.log(id)
    this.props.currentUser.getIdToken(true)
      .then((idToken) => {
        axios.put(`http://${backend_url}/api/my-triplist/triplists/${trip}/add/${id}`, {}, {
          headers: {
            'Authorization': idToken
          }
        })
        console.log("add")
      }).catch(function (error) {
        console.log(error)
      });
  }

  render() {
    return (
      <Menu className='dropdown-menu'>
        <SubMenu title='Add to My Triplist'>
          {this.state.menu}
        </SubMenu>
      </Menu>
    )
  }
}

export default withRouter(DropdownComp, IndexDropdown)