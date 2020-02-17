import React, { Component } from 'react'
import { Tabs, Input, Icon, Button } from 'antd'
import "../css/userprofile.css"

const { TabPane } = Tabs
const { Search } = Input;

const triplist = [
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip',
        n: '5 Threads'
    },
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip',
        n: '5 Threads'
    },
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip',
        n: '5 Threads'
    },
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip',
        n: '5 Threads'
    },
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip',
        n: '5 Threads'
    },
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip',
        n: '5 Threads'
    },
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip',
        n: '5 Threads'
    },
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip',
        n: '5 Threads'
    },
]

const favoritelist = [
    {
        thumbnail: 'https://www.jrailpass.com/blog/wp-content/uploads/2018/07/autumn-daigo-ji-1280x720.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    },
    {
        thumbnail: 'https://www.jrailpass.com/blog/wp-content/uploads/2018/07/autumn-daigo-ji-1280x720.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://www.jrailpass.com/blog/wp-content/uploads/2018/07/autumn-daigo-ji-1280x720.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://www.jrailpass.com/blog/wp-content/uploads/2018/07/autumn-daigo-ji-1280x720.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    },
    {
        thumbnail: 'https://www.jrailpass.com/blog/wp-content/uploads/2018/07/autumn-daigo-ji-1280x720.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://www.jrailpass.com/blog/wp-content/uploads/2018/07/autumn-daigo-ji-1280x720.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://www.jrailpass.com/blog/wp-content/uploads/2018/07/autumn-daigo-ji-1280x720.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://www.jrailpass.com/blog/wp-content/uploads/2018/07/autumn-daigo-ji-1280x720.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://www.jrailpass.com/blog/wp-content/uploads/2018/07/autumn-daigo-ji-1280x720.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    },
]

const recentlylist = [
    {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์',
        topic_id: 3900001
    },
    {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    }, {
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        topic_id: 3900001
    },
]



export default class Aom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heartTheme: "outlined",
            heartFavorites: favoritelist.map(() => "outlined"),
            heartRecentlyViews: recentlylist.map(() => "outlined")
        }
    }

    onHeartFavoriteClick = (i) => {
        // alert("clicked!");
        // console.log(this.state.heartTheme ? "outlined" : "filled")
        const newThemes = this.state.heartFavorites
        newThemes[i] = newThemes[i] !== "outlined" ? "outlined" : "filled"
        this.setState({
            heartFavorites: newThemes
        })
    }

    onHeartRecentlyViewClick = (i) => {
        // alert("clicked!");
        // console.log(this.state.heartTheme ? "outlined" : "filled")
        const newThemes = this.state.heartRecentlyViews
        newThemes[i] = newThemes[i] !== "outlined" ? "outlined" : "filled"
        this.setState({
            heartRecentlyViews: newThemes
        })
    }

    render() {
        const sorter = (
            <div id="subtab"> {/* !!!!FIXME create component */}
                <div style={{ width: `35%`, margin: 'auto 0 auto 10px' }}>
                    <Search
                        placeholder="Search"
                        onSearch={value => console.log(value)}
                        style={{ width: `100%`, height: '40px' }}
                    />
                </div>
                <Button type="link"
                    className="subtab-btn"
                    icon="fire"
                    size="large"
                    style={{ width: `19%`, margin: `auto 0 auto 5%` }}
                >Most Popular</Button>
                <Button type="link"
                    className="subtab-btn"
                    icon="plus"
                    size="large"
                    style={{ width: `19%`, margin: 'auto' }}
                >Most Upvoted</Button>
                <Button type="link"
                    className="subtab-btn"
                    size="large"
                    style={{ width: `19%`, margin: 'auto' }}
                >Recently Added</Button>
            </div>
        )
        return (
            <div style={{ background: '#f8f5e4' }}>
                <div style={{
                    height: '550px',
                    backgroundImage: 'url("https://s1.1zoom.me/big7/333/Mountains_Lake_Men_Back_view_Sitting_571299_1920x1212.jpg")',
                    backgroundPositionY: '-300px',
                    width: `100%`
                }} />
                <div style={{ padding: '0 10%', marginTop: '-200px' }}>
                    <h1 style={{ color: 'white' }}>Somchai Paimaichaun</h1>
                    <h4 style={{ color: 'white', marginBottom: '20px' }}>somchai.pai@gmail.com</h4>
                    <div id="userprofile-tabs" style={{ background: 'white', padding: '20px' }}>
                        <Tabs defaultActiveKey="2" tabBarStyle={{ color: 'black' }}>
                            <TabPane tab="My Triplist" key="1">
                                <div id="subtab">
                                    <div style={{ width: `35%`, margin: 'auto 0 auto 10px' }}>
                                        <Search
                                            placeholder="Search"
                                            onSearch={value => console.log(value)}
                                            style={{ width: `100%`, height: '40px' }}
                                        />
                                    </div>
                                    <Button type="link"
                                        className="subtab-btn"
                                        size="large"
                                        style={{ width: `24%`, margin: `auto 0 auto 15%` }}
                                    >Recently Added</Button>
                                    <Button type="link"
                                        className="subtab-btn"
                                        size="large"
                                        style={{ width: `24%`, margin: 'auto' }}
                                    >Most Threads</Button>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {triplist.map(item => {
                                        return (
                                            <div style={{ width: '300px', margin: '10px' }}>
                                                <img src={item.image} alt="" style={{ width: '100%', height: 'auto' }} />
                                                <div style={{ display: 'flex' }}>
                                                    <div>
                                                        <h2>{item.name}</h2>
                                                        <p>{item.n}</p>
                                                    </div>
                                                    <Icon type="more" style={{ margin: '20px 0 0 80px' }} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </TabPane>
                            <TabPane tab="My Favorite" key="2">
                                {sorter}
                                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                                    {favoritelist.map((item, i) => {
                                        return (
                                            <div id="threadtable" className="thread-hori">
                                                <img src={item.thumbnail}
                                                    alt=""
                                                    style={{ width: `15%`, height: '100px' }} />
                                                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: `2%`, width: `80%`, margin: 'auto 0' }}>
                                                    <h3 style={{ color: '#0E3047' }}>{item.title}</h3>
                                                    <p style={{ color: '#C4C4C4' }}>{item.desc}</p>
                                                    <div style={{ color: "#10828C" }}>
                                                        <span> <Icon type="plus" /> 32 Upvoted </span>
                                                        <span style={{ marginLeft: '20px' }}> <Icon type="fire" /> 48.5 Popular</span>
                                                    </div>
                                                </div>
                                                <Icon type="heart"
                                                    theme={this.state.heartFavorites[i]}
                                                    onClick={() => this.onHeartFavoriteClick(i)}
                                                    style={{ width: `5%`, margin: `auto 0 auto 2%`, fontSize: '23px', color: 'red' }} />
                                                <Icon type="more" style={{ width: `5%`, margin: 'auto', fontSize: '23px' }} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </TabPane>
                            <TabPane tab="Recently Viewed" key="3">
                                {sorter}
                                <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                                    {recentlylist.map((item, i) => {
                                        return (
                                            <div className="thread-hori" style={{ padding: '5px 0' }}>
                                                <div style={{ width: `90%` }}><h3 style={{ margin: 'auto 0', color: '#0E3047' }}>{item.title}</h3></div>
                                                <Icon type="heart"
                                                    theme={this.state.heartRecentlyViews[i]}
                                                    onClick={() => this.onHeartRecentlyViewClick(i)}
                                                    style={{ width: `5%`, margin: `auto 0 auto 2%`, fontSize: '23px', color: 'red' }} />
                                                <Icon type="more" style={{ width: `5%`, margin: 'auto', fontSize: '23px', color: '#10828C' }} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}
