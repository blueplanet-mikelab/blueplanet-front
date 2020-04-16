import React, { Component, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { AuthContext } from '../auth/Auth';

import axios from 'axios';
import qs from 'qs';

import { Tabs, Input, Icon, Button } from 'antd';
import "../css/userprofile.css";
import ThreadHorizontalItem from '../components/userprofile/ThreadsHorizontalItem';

import * as ROUTES from '../constants/routes';

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

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

const TriplistPage = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to={ROUTES.HOME} />;
  }
  console.log(currentUser)
  return (
    <div>
      <UserProfile currentUser={currentUser} />
    </div>
  );
}

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: {},
      triplist: [],
      favoritelist: [],
      heartFavorites: favoritelist.map(() => "outlined"),
      heartRecentlyViews: recentlylist.map(() => "outlined"),
      tripListSortType: 1,
      subtabSortType: 1,
      // favor_imgs: favoritelist.map(e => ({ thumbnail: e.thumbnail })),
      selectedTripList: null
    }
  }

  async getInformation(query) {
    let response = null;
    const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })
    this.props.history.push(`/profile${q}`);
    try {
      response = await axios.get(`http://${backend_url}/api/my-triplist/triplists${q}`)
    } catch (error) {
      console.log(error);
    }

    if (response) {
      // Map data after get response
      this.mapData(response);
    }
  }

  mapData(response) {
    const triplist = response.data.map(item => {
      return {
        ...item,
        name: item.title,
      };
    });
    this.setState({
      // 
    });
    console.log("trip" + this.state.triplist)
  }

  getQueryParams(value) {
    return qs.parse(value, { ignoreQueryPrefix: true })
  }

  componentDidMount() {
    this.props.currentUser.getIdToken(/* forceRefresh */ true)
      .then((idToken) => {
        var res = axios.get(`http://${backend_url}/api/my-triplist/triplists`, {
          headers: {
            'Authorization': idToken
          }
        })
        res.then((result) => {
          console.log(idToken)
          console.log(result)
          this.setState({
            triplist: result.data,
          });
          console.log("title " + this.state.triplist[0].title)
          console.log("threads " + this.state.triplist[0].threads[0].title)
        })
        var fav = axios.get(`http://${backend_url}/api/my-triplist/favorites`, {
          headers: {
            'Authorization': idToken
          }
        })
        fav.then((result) => {
          console.log(idToken)
          console.log(result)
          this.setState({
            favoritelist: result.data.favThreads,
            heartFavorites: this.state.favoritelist.map(() => "outlined"),
            favor_imgs: this.state.favoritelist.map(e => ({ thumbnail: e.thumbnail })),
          });
          console.log(" favoritelist" + favoritelist)
          if (this.state.favoritelist == "") {
            console.log("ืีnull")
          }
        })
      }).catch(function (error) {
        console.log(error)
      });
    if (this.props.location != null) {
      const q = this.getQueryParams(this.props.location.search);
      this.setState({
        query: q
      })
      this.getInformation(q);
    }
  }

  onHeartFavoriteClick = (i) => {
    this.props.currentUser.getIdToken(true)
      .then((idToken) => {
        axios.put(`http://${backend_url}/api/my-triplist/favorites/`+'5bb8c3bd16bf1f515ce5b42f', {
          headers: {
            Authorization: idToken
          }
        })
        console.log("...")
      }).catch(function (error) {
        console.log(error)
      });

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

  handleTriplistSelection = (index) => {
    this.setState({
      selectedTripList: index
    })
  }

  onMoreIcon = () => {
    alert("click more")
  }

  // componentDidMount() {
  //   console.log(getCurrentUser(), "actions")
  // }

  render() {
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
              // imgStyle={this.state.favor_imgs.find(e => e.thumbnail === item.thumbnail)}
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
            <p style={{ margin: '30px 0 0 0' }}><span style={{ color: '#10828C', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => this.setState({ selectedTripList: null })}>My Triplist</span> / {triplist[selectedIndex].title}</p>
            <div style={{ display: 'flex', paddingBottom: '40px', margin: '20px 20px 0 0', borderBottom: '0.5px solid rgba(130, 142, 180, 0.5)' }}>
              <img src={triplist[selectedIndex].thumbnail}
                alt="trip image cover"
                style={{ width: `175px`, height: `175px`, marginRight: '40px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto 0' }}>
                <h1>{this.state.triplist[selectedIndex].title} <Icon className="triplist-more" type="more" onClick={() => this.onMoreIcon()} /> </h1>
                <span>{this.state.triplist[selectedIndex].numThreads} Threads</span>
                <p></p>
                <p>{this.state.triplist[selectedIndex].description}</p>
              </div>
            </div>
            {threadHorizontal(this.state.triplist[selectedIndex].threads)}
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
              {this.state.triplist.map((item, i) => {
                return (
                  <div style={{ width: '200px', margin: '10px' }}
                  >
                    <div style={{ width: '200px', height: '200px' }}>
                      <img src={item.thumbnail}
                        alt=""
                        onClick={() => { this.setState({ selectedTripList: i }) }}
                        style={{ width: `100%`, height: `100%`, cursor: 'pointer' }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div>
                        <h2 onClick={() => this.setState({ selectedTripList: i })} style={{ cursor: 'pointer' }}>{item.title}</h2>
                        <p>{item.numThreads} Threads</p>
                      </div>
                      <Icon type="more"
                        onClick={() => this.onMoreIcon()}
                        style={{ margin: '20px 0 0 80px' }} />
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
          <h1 style={{ color: 'white' }}>{this.props.currentUser.displayName} <Icon type="edit" /></h1>
          <h4 style={{ color: 'white', marginBottom: '20px' }}>{this.props.currentUser.email} <Icon type="edit" /></h4>
          <div id="userprofile-tabs" style={{ background: 'white', padding: '15px 30px' }}>
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
                        <Icon type="more"
                          onClick={() => this.onMoreIcon()}
                          style={{ width: `5%`, margin: 'auto', fontSize: '23px', color: '#10828C' }} />
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

export default withRouter(TriplistPage);