import React from 'react'
import { Icon, Dropdown } from 'antd'

const ThreadHorizontalItemRecentlyView = ({ item, i, heartState, onHeartFavoriteClick, handleFavDropDown, recentlyMenu }) => {

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
    {recentlylist.map((item, i) => {
      return (
        <div className="thread-hori" style={{ padding: '5px 0' }}>
          <div style={{ width: `90%` }}><h3 style={{ margin: 'auto 0', color: '#0E3047' }}>{item.title}</h3></div>
          <Icon type="heart"
            theme={this.state.heartRecentlyViews[i]}
            onClick={() => this.onHeartRecentlyViewClick(i)}
            style={{ width: `5%`, margin: `auto 0 auto 2%`, fontSize: '23px', color: 'red' }} />
          <Dropdown overlay={recentlyMenu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              <Icon type="more" style={{ color: "#10828C", width: `5%`, margin: 'auto', fontSize: '23px' }} />
            </a>
          </Dropdown>
        </div>
      )
    })}
  </div>
  )
}

export default ThreadHorizontalItemRecentlyView