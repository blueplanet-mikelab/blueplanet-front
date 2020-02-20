import React, { Component } from 'react'
import { Tabs, Input, Icon, Button } from 'antd'
import "../css/userprofile.css"
import ThreadHorizontalItem from '../components/userprofile/ThreadsHorizontalItem';

const { TabPane } = Tabs
const { Search } = Input;

const triplist = [
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip1',
        n: 1,
        description: "1 Osaka 2020",
        threads: [
            {
                thumbnail: 'https://f.ptcdn.info/140/068/000/q5qfe490o57QqCfwa0Z-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            },
        ]
    },
    {
        image: 'https://f.ptcdn.info/161/068/000/q5sx8014uQ3bbXAm8qS-o.png',
        name: 'Japan Trip2',
        n: 2,
        description: "2 Osaka 2020",
        threads: [
            {
                thumbnail: 'https://f.ptcdn.info/138/068/000/q5qawymxnU8ws8BrsG2-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/161/068/000/q5sx8014uQ3bbXAm8qS-o.png',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            },
        ]
    },
    {
        image: 'https://f.ptcdn.info/152/068/000/q5s5qm2f2L8KXD0mmPY-o.jpg',
        name: 'Japan Trip3',
        n: 3,
        description: "3 Osaka 2020",
        threads: [
            {
                thumbnail: 'https://f.ptcdn.info/152/068/000/q5s5qm2f2L8KXD0mmPY-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            },
            {
                thumbnail: 'https://f.ptcdn.info/105/068/000/q5li8h638sXxWKv0Bvyw-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/139/068/000/q5qei46rdeSKm0sAy1Z-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            },
        ]
    },
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip4',
        n: 4,
        description: "4 Osaka 2020",
        threads: [
            {
                thumbnail: 'https://f.ptcdn.info/035/068/000/q5bqxlum2rEpdCp5I63-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/174/068/000/q5ulkg1gu8wBg6zIJj5-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/173/068/000/q5uhlponu9Ajn6YCrcm-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/140/068/000/q5qfe490o57QqCfwa0Z-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            },
        ]
    },
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip5',
        n: 5,
        description: "5 Osaka 2020",
        threads: [
            {
                thumbnail: 'https://f.ptcdn.info/138/068/000/q5qawymxnU8ws8BrsG2-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/161/068/000/q5sx8014uQ3bbXAm8qS-o.png',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/152/068/000/q5s5qm2f2L8KXD0mmPY-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            },
            {
                thumbnail: 'https://f.ptcdn.info/105/068/000/q5li8h638sXxWKv0Bvyw-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/139/068/000/q5qei46rdeSKm0sAy1Z-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            },
        ]
    },
    {
        image: 'https://resources.matcha-jp.com/old_thumbnails/720x2000/284.jpg',
        name: 'Japan Trip6',
        n: 6,
        description: "6 Osaka 2020",
        threads: [
            {
                thumbnail: 'https://f.ptcdn.info/035/068/000/q5bqxlum2rEpdCp5I63-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/174/068/000/q5ulkg1gu8wBg6zIJj5-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/173/068/000/q5uhlponu9Ajn6YCrcm-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/140/068/000/q5qfe490o57QqCfwa0Z-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            },
            {
                thumbnail: 'https://f.ptcdn.info/138/068/000/q5qawymxnU8ws8BrsG2-o.jpg',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            }, {
                thumbnail: 'https://f.ptcdn.info/161/068/000/q5sx8014uQ3bbXAm8qS-o.png',
                title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
                desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
                upvote: 32,
                popular: 87.5
            },
        ]
    }

]

const favoritelist = [
    {
        thumbnail: 'https://f.ptcdn.info/140/068/000/q5qfe490o57QqCfwa0Z-o.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    },
    {
        thumbnail: 'https://f.ptcdn.info/138/068/000/q5qawymxnU8ws8BrsG2-o.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://f.ptcdn.info/161/068/000/q5sx8014uQ3bbXAm8qS-o.png',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://f.ptcdn.info/152/068/000/q5s5qm2f2L8KXD0mmPY-o.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    },
    {
        thumbnail: 'https://f.ptcdn.info/105/068/000/q5li8h638sXxWKv0Bvyw-o.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://f.ptcdn.info/139/068/000/q5qei46rdeSKm0sAy1Z-o.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://f.ptcdn.info/035/068/000/q5bqxlum2rEpdCp5I63-o.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://f.ptcdn.info/174/068/000/q5ulkg1gu8wBg6zIJj5-o.jpg',
        title: '[CR] SINGAPORE: รีวิวเที่ยวสิงคโปร์ฉบับสมบูรณ์ (เที่ยวครบ กินครบ เดินครบ จบในกระทู้เดียว)',
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it ...",
        upvote: 32,
        popular: 87.5
    }, {
        thumbnail: 'https://f.ptcdn.info/173/068/000/q5uhlponu9Ajn6YCrcm-o.jpg',
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

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heartFavorites: favoritelist.map(() => "outlined"),
            heartRecentlyViews: recentlylist.map(() => "outlined"),
            tripListSortType: 1,
            subtabSortType: 1,
            favor_imgs: favoritelist.map(e => ({ thumbnail: e.thumbnail })),
            selectedTripList: null
        }
    }

    onHeartFavoriteClick = (i) => {
        const newThemes = this.state.heartFavorites
        newThemes[i] = newThemes[i] !== "outlined" ? "outlined" : "filled"
        this.setState({
            heartFavorites: newThemes
        })
    }

    onHeartRecentlyViewClick = (i) => {
        const newThemes = this.state.heartRecentlyViews
        newThemes[i] = newThemes[i] !== "outlined" ? "outlined" : "filled"
        this.setState({
            heartRecentlyViews: newThemes
        })
    }

    imgHandleSize = ({ target: img }, item) => {
        const { favor_imgs } = this.state
        favor_imgs.forEach(e => {
            if (e.thumbnail === item.thumbnail) {
                e.style = {
                    width: img.naturalWidth > img.naturalHeight ? '' : `100%`,
                    height: img.naturalWidth > img.naturalHeight ? `100%` : '',
                }
            }
        })

        this.setState({ favor_imgs })
    }

    render() {

        console.log(">>>>", this.state.selectedTripList)

        const sorter = (
            <div id="subtab">
                <div style={{ width: `35%`, margin: 'auto 0 auto 10px' }}>
                    <Search
                        placeholder="Search"
                        onSearch={value => console.log(value)}
                        style={{ width: `100%`, height: '40px' }}
                    />
                </div>
                <Button type="link"
                    className={`subtab-btn ${this.state.subtabSortType === 1 ? 'active' : ''}`}
                    onClick={() => this.setState({ subtabSortType: 1 })}
                    icon="fire"
                    size="large"
                    style={{ width: `19%`, margin: `auto 0 auto 5%` }}
                >Most Popular</Button>
                <Button type="link"
                    className={`subtab-btn ${this.state.subtabSortType === 2 ? 'active' : ''}`}
                    onClick={() => this.setState({ subtabSortType: 2 })}
                    icon="plus"
                    size="large"
                    style={{ width: `19%`, margin: 'auto' }}
                >Most Upvoted</Button>
                <Button type="link"
                    className={`subtab-btn ${this.state.subtabSortType === 3 ? 'active' : ''}`}
                    onClick={() => this.setState({ subtabSortType: 3 })}
                    size="large"
                    style={{ width: `19%`, margin: 'auto' }}
                >Recently Added</Button>
            </div>
        )

        const threadHorizontal = (threadlist) => (
            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                {threadlist.map((item, i) => {
                    return (
                        <ThreadHorizontalItem item={item}
                            i={i}
                            imgStyle={this.state.favor_imgs.find(e => e.thumbnail === item.thumbnail).style}
                            imgHandleSize={this.imgHandleSize}
                            heartState={this.state.heartFavorites[i]}
                            onHeartFavoriteClick={this.onHeartFavoriteClick}
                        />
                    )
                })}
            </div>
        )

        const tripListTap = () => {

            const selectedIndex = this.state.selectedTripList
            if (selectedIndex != null) {
                return (
                    <>
                        {sorter}
                        <p><span style={{ textDecoration:'underline', color:'blue', cursor: 'pointer' }} onClick={() => this.setState({ selectedTripList: null })}>My Triplist</span> / {triplist[selectedIndex].name}</p>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <img src={triplist[selectedIndex].image}
                                alt="trip image cover"
                                style={{ width: `200px`, height: `200px`, marginRight: '20px' }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h1>{triplist[selectedIndex].name} <Icon type="more" /> </h1>
                                <span>{triplist[selectedIndex].n} Threads</span>
                                <p></p>
                                <p>{triplist[selectedIndex].description}</p>
                            </div>
                        </div>
                        {threadHorizontal(triplist[selectedIndex].threads)}
                    </>
                )
            } else {
                return (
                    <>
                        <div id="subtab">
                            <div style={{ width: `35%`, margin: 'auto 0 auto 10px' }}>
                                <Search
                                    placeholder="Search"
                                    onSearch={value => console.log(value)}
                                    style={{ width: `100%`, height: '40px' }}
                                />
                            </div>
                            <Button type="link"
                                className={`subtab-btn ${this.state.tripListSortType === 1 ? 'active' : ''}`}
                                onClick={() => this.setState({ tripListSortType: 1 })}
                                size="large"
                                style={{ width: `24%`, margin: `auto 0 auto 15%` }}
                            >Recently Added</Button>
                            <Button type="link"
                                className={`subtab-btn ${this.state.tripListSortType === 2 ? 'active' : ''}`}
                                onClick={() => this.setState({ tripListSortType: 2 })}
                                size="large"
                                style={{ width: `24%`, margin: 'auto' }}
                            >Most Threads</Button>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {triplist.map((item, i) => {
                                return (
                                    <div style={{ width: '200px', margin: '10px' }}
                                    >
                                        <div style={{ width: '200px', height: '200px' }}>
                                            <img src={item.image}
                                                alt=""
                                                onClick={() => {this.setState({ selectedTripList: i })}}
                                                style={{ width: `100%`, height: `100%`, cursor: 'pointer' }} />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <div>
                                                <h2 onClick={() => this.setState({ selectedTripList: i })} style={{ cursor: 'pointer' }}>{item.name}</h2>
                                                <p>{item.n}</p>
                                            </div>
                                            <Icon type="more" style={{ margin: '20px 0 0 80px' }} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )
            }

        }

        return (
            <div style={{ background: '#f8f5e4' }}>
                <div style={{
                    height: '500px',
                    backgroundImage: 'url("https://s1.1zoom.me/big7/333/Mountains_Lake_Men_Back_view_Sitting_571299_1920x1212.jpg")',
                    backgroundPositionY: '-300px',
                    backgroundSize: 'cover',
                    width: `100%`
                }} />
                <div style={{ padding: '0 10%', marginTop: '-250px' }}>
                    <h1 style={{ color: 'white' }}>Somchai Paimaichaun <Icon type="edit" /></h1>
                    <h4 style={{ color: 'white', marginBottom: '20px' }}>somchai.pai@gmail.com <Icon type="edit" /></h4>
                    <div id="userprofile-tabs" style={{ background: 'white', padding: '20px' }}>
                        <Tabs defaultActiveKey="1" tabBarStyle={{ color: 'black' }}>
                            <TabPane tab="My Triplist" key="1">
                                {tripListTap()}
                            </TabPane>
                            <TabPane tab="My Favorite" key="2">
                                {sorter}
                                {threadHorizontal(favoritelist)}
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

                            {/* <TabPane tab="Test TripDetail" key="4">
                                {sorter}
                                <p><a href="">My Triplist</a> / {triplist[0].name}</p>
                                <div style={{ display: 'flex', marginTop: '20px' }}>
                                    <img src={triplist[0].image}
                                        alt="trip image cover"
                                        style={{ width: `200px`, height: `200px`, marginRight: '20px' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h1>{triplist[0].name} <Icon type="more" /> </h1>
                                        <span>{triplist[0].n} Threads</span>
                                        <p></p>
                                        <p>{triplist[0].description}</p>
                                    </div>
                                </div>
                                {threadHorizontal(favoritelist)}
                            </TabPane> */}
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}
