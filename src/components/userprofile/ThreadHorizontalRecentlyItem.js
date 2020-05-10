import React from 'react'
import { Icon, Dropdown } from 'antd'

const ThreadHorizontalRecentlyItem = ({ item, i, heartState, onHeartFavoriteClick, handleRecentlyViewDropDown, recentlyMenu, addRecentlyView }) => {

    return (
        <div className="thread-hori" style={{ padding: '5px 0' }}>
            <div style={{ width: `90%` }}>
                <h3 style={{ margin: 'auto 0', color: '#0E3047' }}>
                    <a href={`https://pantip.com/topic/${item.topic_id}`}
                        onClick={() => addRecentlyView(item._id)}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ color: '#0E3047' }}>
                        {item.title}
                    </a>
                </h3>
            </div>
            <Icon type="heart"
                theme={heartState === true ? 'filled' : 'outlined'}
                onClick={() => onHeartFavoriteClick(item._id)}
                style={{ width: `5%`, margin: `auto 0 auto 2%`, fontSize: '23px', color: 'red' }} />
            <Dropdown overlay={recentlyMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    <Icon
                        type="more"
                        style={{ color: "#10828C", width: `5%`, margin: 'auto', fontSize: '23px' }}
                        onClick={() => handleRecentlyViewDropDown(item._id, item.thumbnail)} />
                </a>
            </Dropdown>
        </div>
    )
}

export default ThreadHorizontalRecentlyItem