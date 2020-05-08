import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getTriplists } from '../auth/Auth';

import { Menu } from 'antd'
import "../css/suggest.css";
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

  render() {
    return (
      <Menu className='dropdown-menu'>
        <SubMenu title='Add to My Triplist'>
          <Menu.Item>New Triplist</Menu.Item>
          {this.state.menu}
        </SubMenu>
      </Menu>
    )
  }
}

export default withRouter(DropdownComp, IndexDropdown)