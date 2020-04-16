import React from 'react'
import { Icon } from 'antd'

const ThreadHorizontalItem = ({ item, i, imgStyle, imgHandleSize, heartState, onHeartFavoriteClick }) => {

  const onMoreIconInItem = () => {
    alert("click more in item")
  }

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
        <h3 style={{ color: '#0E3047' }}>{item.title}</h3>
        <p style={{ color: '#C4C4C4' }}>{item.description}</p>
        <div style={{ color: "#10828C" }}>
          <span> <Icon type="plus" /> {item.vote}</span>
          <span style={{ marginLeft: '20px' }}> <Icon type="fire" /> {item.popularity}</span>
        </div>
      </div>
      <Icon type="heart"
        theme={heartState}
        onClick={() => onHeartFavoriteClick(i)}
        style={{ width: `5%`, margin: `auto 0 auto 2%`, fontSize: '23px', color: 'red' }} />
      <Icon type="more"
        onClick={() => onMoreIconInItem()}
        style={{ width: `5%`, margin: 'auto', fontSize: '23px' }} />
    </div>
  )
}

export default ThreadHorizontalItem