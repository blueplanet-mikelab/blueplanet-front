import React from 'react'
import { Icon, Dropdown } from 'antd'

const ThreadHorizontalItemOfTriplist = ({ item, i, imgStyle, imgHandleSize, heartState, onHeartFavoriteClick, handleThreadInTripDropDown, threadIntripMenu, addRecentlyView }) => {

    return (
        <div className="thread-hori">
            <div className="img-frame">
                <img src={item.thumbnail}
                    alt="favorite-img"
                    onLoad={target => imgHandleSize(target, item)}
                    style={imgStyle}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: `2%`, width: `80%`, margin: 'auto 0' }}>
                <h3 style={{ color: '#0E3047' }}>
                    <a href={`https://pantip.com/topic/${item.topic_id}`}
                        onClick={() => addRecentlyView(item._id)}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ color: '#0E3047' }}>
                        {item.title}
                    </a>
                </h3>
                <p style={{ color: '#C4C4C4' }}>{item.description}</p>
                <div style={{ color: "#10828C" }}>
                    <span> <Icon type="plus" /> {item.vote}</span>
                    <span style={{ marginLeft: '20px' }}> <Icon type="fire" /> {item.popularity}</span>
                </div>
            </div>
            <Icon type="heart"
                theme={heartState === true ? 'filled' : 'outlined'}
                onClick={() => onHeartFavoriteClick(item._id)}
                style={{ width: `5%`, margin: `auto 0 auto 2%`, fontSize: '23px', color: 'red' }} />
            <Dropdown overlay={threadIntripMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    <Icon
                        type="more"
                        style={{ color: "#10828C", width: `5%`, margin: 'auto', fontSize: '23px' }}
                        onClick={() => handleThreadInTripDropDown(item._id, item.thumbnail)} />
                </a>
            </Dropdown>
        </div>
    )
}

export default ThreadHorizontalItemOfTriplist