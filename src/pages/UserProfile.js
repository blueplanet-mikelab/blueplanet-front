import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import {
  getTriplists, getFavorite, getRecentlyViewed, createTriplist,
  createTriplistByThread, deleteFavorite, deleteTriplist,
  addThreadIntoTrip, addRecentlyView, deleteThreadInTriplist, editTriplist, getFavoriteBool, putFavorite, getThreadInTrip
} from '../auth/Auth';

import { Tabs, Input, Icon, Button, Menu, Dropdown, message, Modal, Pagination } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import "../css/userprofile.css";
import ThreadHorizontalItem from '../components/userprofile/ThreadsHorizontalItem';
import ThreadHorizontalItemOfTriplist from '../components/userprofile/ThreadHorizontalItemOfTriplist';
import ThreadHorizontalRecentlyItem from '../components/userprofile/ThreadHorizontalRecentlyItem';


import * as ROUTES from '../constants/routes';

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const { TabPane } = Tabs
const { Search } = Input;
const { SubMenu } = Menu;

var tab;
var menu = (
  <Menu>
    <Menu.Item>Edit details</Menu.Item>
    <Menu.Item>Delete</Menu.Item>
  </Menu>
);

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {},
      triplist: [],
      favoritelist: [],
      favThreadslist: [],
      recentlylist: [],
      menu: menu,
      favMenu: menu,
      threadIntripMenu: menu,
      recentlyMenu: menu,
      tripListSortType: 1,
      subtabSortType: 1,
      selectedTripList: null,
      visible: false,
      editVisible: false,
      visibleTrip: false,
      titleTrip: "",
      shortDesc: "",
      inputEditTitle: "",
      inputEditShortDes: "",
      loading: false,
      defaultPage: 1,
      heartFavorites: [],
      favThreadslist: [],
      totalPagesFav: 1,
      totalPagesTrip: 1,
      currentPageFav: 1,
      currentPageTrip: 1,
    }
  }

  updateThreads = (query, sort, page) => {
    this.setState({
      query: query,
      currentPageFav: page,
    });
    this.getThreads(query, sort, page);
  }

  getThreads = async (query, sort, page) => {
    console.log(sort)
    let response = null;
    const q = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'comma' })
    // this.props.history.push(`/profile${q}`);
    try {
      if (sort === 'fav' || tab === 'fav') {
        // Get favorite list
        await this.props.currentUser.getIdToken(true)
          .then((idToken) => {
            response = axios.get(`http://${backend_url}/api/my-triplist/favorites/${page}${q}`, {
              headers: {
                'Authorization': idToken
              }
            })
            response.then((result) => {
              console.log("result fav")
              console.log(result)
              this.setState({
                favoritelist: result.data,
                favThreadslist: result.data.favorite.threads,
              });
            })
          }).catch(function (error) {
            console.log(error)
          });
      }
      else if (sort === 'trip') {
        console.log("in trip")
        // Get favorite list
        this.props.currentUser.getIdToken(true)
          .then((idToken) => {
            //Get trip list
            axios.get(`http://${backend_url}/api/my-triplist/triplists${q}`, {
              headers: {
                'Authorization': idToken
              }
            })
              .then((result) => {
                // console.log(idToken)
                console.log("result trip")
                console.log(result)
                this.setState({
                  triplist: result.data,
                });
              }).catch(function (error) {
                console.log(error)
              });
          }).catch(function (error) {
            console.log(error)
          });
      }
      else if (tab === 'trip' && sort === 'threadInTrip') {
        this.props.currentUser.getIdToken(true)
          .then((idToken) => {
            //Get trip list
            axios.get(`http://${backend_url}/api/my-triplist/triplists/${this.state.triplist[this.state.selectedTripList]._id}/${page}${q}`, {
              headers: {
                'Authorization': idToken
              }
            })
              .then((result) => {
                // console.log(idToken)
                console.log("result trip")
                console.log(result)
                this.setState({
                  threadTrip: result.data,
                  currentThread: result.data.triplist.threads
                });
              }).catch(function (error) {
                console.log(error)
              });
          }).catch(function (error) {
            console.log(error)
          });

      }
    } catch (error) {
      console.log(error);
    }
  }

  getQueryParams() {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
  }

  componentDidMount = async () => {
    const triplists = await getTriplists()
    const favorites = await getFavorite(this.state.defaultPage)
    const recently = await getRecentlyViewed()
    this.setState({
      triplist: triplists,
      favoritelist: favorites,
      favThreadslist: favorites.favorite.threads,
      // heartFavorites: this.state.favoritelist.map(() => "outlined"),
      favor_imgs: this.state.favoritelist.map(e => ({ thumbnail: e.thumbnail })),
      recentlylist: recently,
      recentThreadslist: recently.recentThreads,
      heartRecentlyViews: recently.map(() => "outlined"),
      totalPagesFav: favorites.total_page * 10,
      currentPageFav: favorites.current_page,
      // totalPagesTrip: triplists.total_page * 10,
      // currentPageTrip: triplists.current_page,
    })
    const query = this.state.query;
    query.sortby = 'most'
    this.setState({
      query: query,
      tripListSortType: 2,
    });
    this.getThreads(query, 'trip', 1)

    var hasThreads = "true";
    for (var i = 0; i < this.state.triplist.length; i++) {
      if (this.state.triplist[i].threads.length === 0) {
        console.log(this.state.triplist[i].threads.length)
        console.log("No any thread in trip")
        hasThreads = "false";
      }
    }
    if (this.state.triplist === "" || this.state.triplist == null || hasThreads === "false") {
      console.log("null trip")
    }
    else {
      console.log("title " + this.state.triplist[0].title)
      console.log("threads " + this.state.triplist[0].threads[0].title)
      console.log(this.state.triplist[0].num_threads)
    }
    if (this.state.favoritelist === "" || this.state.favoritelist == null || this.state.favThreadslist.length === 0) {
      console.log("null fav")
    } else {
      console.log(" favoritelist" + this.state.favThreadslist[0].title)
    }
    if (this.state.recentlylist === "" || this.state.recentlylist == null || this.state.recentlylist.length === 0) {
      console.log("null recent")
    } else {
      console.log("recentThreadslist" + this.state.recentlylist[0].title)
    }
    this.updateFav()
  }

  handleCreateTriplist = async () => {
    return await createTriplist(this.state.titleTrip, this.state.shortDesc)
      .then(() => {
        const query = this.state.query;
        query.sortby = 'latest'
        this.setState({
          query: query,
          tripListSortType: 1,
        });
        this.getThreads(query, 'trip', 1)
        message.success('Your Triplist has been created')
        console.log("created by thread")
      })
  }

  handleTriplistByThread = async () => {
    return await createTriplistByThread(this.state.idThread, this.state.thumbnailThread, this.state.titleTrip, this.state.shortDesc)
      .then(() => {
        const query = this.state.query;
        query.sortby = 'latest'
        this.setState({
          query: query,
          tripListSortType: 1,
        });
        this.getThreads(query, 'trip', 1)
        message.success('Your Triplist has been created')
        console.log("created by thread")
      })
  }

  handleEditTriplist = async (id, thumbnail) => {
    return await editTriplist(id, thumbnail, this.state.inputEditTitle, this.state.inputEditShortDes)
      .then(async () => {
        const query = this.state.query;
        query.sortby = 'most'
        this.setState({
          query: query,
          tripListSortType: 2,
        });
        this.getThreads(query, 'trip', 1)
        message.success('Your Triplist has been updated')
      })
  }

  handleAddRecentlyView = async (id) => {
    return await addRecentlyView(id)
      .then(async () => {
        const recently = await getRecentlyViewed()
        this.setState({
          recentlylist: recently,
        });
      })
  }

  handleAddThreadIntoTrip = async (trip, id) => {
    return await addThreadIntoTrip(trip, id)
      .then(() => {
        console.log("add")
        const query = this.state.query;
        query.sortby = 'most'
        this.setState({
          query: query,
          tripListSortType: 2,
        });
        this.getThreads(query, 'trip', 'none')
        message.success('Your Triplist has been updated')
      })
  }
  showCreateTripModal = () => {
    this.setState({
      visibleTrip: true,
    });
  };

  handleCreateOk = e => {
    this.handleCreateTriplist()
    this.setState({
      visibleTrip: false,
    });
  };

  handleCreateCancel = e => {
    console.log(e);
    this.setState({
      visibleTrip: false,
    });
  };

  inputTitle = (input) => {
    this.setState({
      titleTrip: input.target.value,
    });
  }

  inputShortDes = (input) => {
    this.setState({
      shortDesc: input.target.value,
    });
  }

  showModal = (id, thumbnail) => {
    this.setState({
      visible: true,
      idThread: id,
      thumbnailThread: thumbnail
    });
  };

  handleOk = e => {
    this.handleTriplistByThread()
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  inputEditTitle = (input) => {
    this.setState({
      inputEditTitle: input.target.value,
    });
  }

  inputEditShortDes = (input) => {
    this.setState({
      inputEditShortDes: input.target.value,
    });
  }

  showEditTripModal = (id, thumbnail) => {
    this.setState({
      editVisible: true,
      idThread: id,
      thumbnailThread: thumbnail
    });
  };

  handleCompleteEditTrip = e => {
    this.handleEditTriplist(this.state.idThread, this.state.thumbnailThread)
    this.setState({
      editVisible: false,
    });
  };

  handleCancelEditTrip = e => {
    console.log(e);
    this.setState({
      editVisible: false,
    });
  };

  handleDeleteTriplist = async (id) => {
    return await deleteTriplist(id)
      .then(() => {
        const query = this.state.query;
        query.sortby = 'most'
        this.setState({
          query: query,
          tripListSortType: 2,
        });
        this.getThreads(query, 'trip', 1)
        message.success('Your trip has been deleted.');
      })
  }

  handleDeleteThreadInTriplist = async (id, tripId) => {
    return await deleteThreadInTriplist(id, tripId)
      .then(() => {
        const query = this.state.query;
        query.sortby = 'most'
        this.updateThreads(query, 'trip', 1)
        console.log("delete")
        message.success('Your thread has been deleted.');
      })
  }

  onHeartFavoriteClick = async (threadId) => {
    var response = '';
    if (await getFavoriteBool(threadId) !== true) {
      response = await putFavorite(threadId)
      message.success(response);
    } else {
      response = await deleteFavorite(threadId)
      message.success(response);
    }
    console.log(response) // response for alert
    this.updateFav()
  }

  updateFav = async () => {
    // const { favoritelist, heartFavorites } = this.state;
    var favtemp = this.state.heartFavorites;

    var thread = this.state.favThreadslist
    for (var i = 0; i < thread.length; i++) {
      favtemp[i] = await getFavoriteBool(thread[i]._id)
      this.setState({
        heartFavorites: favtemp
      })
    }

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

  handleTripDropDown = (id, thumbnail) => {
    const tripId = id;
    var menuToDelete = (
      <Menu>
        <Menu.Item onClick={() => this.showEditTripModal(tripId, thumbnail)}>Edit details</Menu.Item>
        <Menu.Item onClick={() => this.handleDeleteTriplist(tripId)}>Delete</Menu.Item>
      </Menu>
    );
    this.setState({
      menu: menuToDelete
    })
  }

  handleThreadInTripDropDown = (id, thumbnail) => {
    const threadId = id;
    var allTrip = this.state.triplist.map(thread => {
      return (
        <Menu.Item onClick={() => this.handleAddThreadIntoTrip(thread._id, threadId)}>{thread.title}</Menu.Item>
      )
    })
    var menuThreadInTrip = (
      <Menu>
        <SubMenu title="Add to My Triplist">
          <Menu.Item onClick={() => this.showModal(threadId, thumbnail)}>New Triplist</Menu.Item>
          {allTrip}
        </SubMenu>
        {/* <Menu.Item>Save to My Favorite</Menu.Item> */}
        <Menu.Item onClick={() => this.handleDeleteThreadInTriplist(threadId, this.state.triplist[this.state.selectedTripList]._id)}>Delete</Menu.Item>
      </Menu>
    );
    this.setState({
      threadIntripMenu: menuThreadInTrip
    })
    console.log('click drop', id);
  }

  handleFavDropDown = (id, thumbnail) => {
    const favId = id;
    var allTrip = this.state.triplist.map(thread => {
      return (
        <Menu.Item onClick={() => this.handleAddThreadIntoTrip(thread._id, favId)}>{thread.title}</Menu.Item>
      )
    })
    var menuInFav = (
      <Menu>
        <SubMenu title="Add to My Triplist">
          <Menu.Item onClick={() => this.showModal(favId, thumbnail)}>New Triplist</Menu.Item>
          {allTrip}
        </SubMenu>
        <Menu.Item onClick={() => deleteFavorite(favId)}>Delete</Menu.Item>
      </Menu>
    );
    this.setState({
      favMenu: menuInFav
    })
  }

  handleRecentlyViewDropDown = (id, thumbnail) => {
    var allTrip = this.state.triplist.map(thread => {
      return (
        <Menu.Item onClick={() => this.handleAddThreadIntoTrip(thread._id, id)}>{thread.title}</Menu.Item>
      )
    })
    var menuThreadInRecently = (
      <Menu>
        <SubMenu title="Add to My Triplist">
          <Menu.Item onClick={() => this.showModal(id, thumbnail)}>New Triplist</Menu.Item>
          {allTrip}
        </SubMenu>
        {/* <Menu.Item>Save to My Favorite</Menu.Item> */}
      </Menu>
    );
    this.setState({
      recentlyMenu: menuThreadInRecently
    })
    console.log('click drop', id);
  }

  handlePagination = () => {
    return (<Pagination current={this.state.currentPageTrip} onChange={this.onChangePageTrip} total={this.state.totalPagesTrip}
      style={{ backgroundColor: '#FFF' }} />)
  }

  onChangePageTrip = (page) => {
    this.setState({
      currentPageTrip: page,
    });
    tab = 'trip'
    this.getThreads(this.state.query, 'threadInTrip', page)
  };

  onChangeFavPage = (page) => {
    tab = 'fav'
    this.updateThreads(this.state.query, 'fav', page)
  };

  handleType = (type, value) => {
    const query = this.state.query;
    query.sortby = type
    this.setState({
      query: query,
      tripListSortType: value,
    });
    this.getThreads(query, 'trip', 1)
  }

  handleSort = (type, value) => {
    const query = this.state.query;
    query.sortby = type
    console.log(query.sortby)
    this.setState({
      query: query,
      subtabSortType: value,
    });
    this.getThreads(query, 'fav', 1)
  }

  handleIdTrip = async (selectedIndex) => {
    console.log('eofj')
    const threadTrip = await getThreadInTrip(this.state.triplist[selectedIndex]._id, 1)
    console.log(threadTrip)
    this.setState({
      threadTrip: threadTrip,
      totalPagesTrip: threadTrip.total_page * 10,
      currentPageTrip: threadTrip.current_page,
      currentThread: threadTrip.triplist.threads,
      selectedTripList: selectedIndex
    })
    console.log('22')
    console.log(this.state.currentThread)

  }
  render() {
    const createTrip = <Button onClick={() => this.showCreateTripModal()} id='create-trip'><FormOutlined />Create a Triplist</Button>;

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
          onClick={() => this.handleSort('popular', 1)}
          value={this.state.query.sortby}
          icon="fire"
          size="large"
          style={{ width: `19%`, margin: `auto 0 auto 5%` }}
        >Most Popular</Button>
        <Button type="link"
          className={`subtab-btn ${this.state.subtabSortType === 2 ? 'active' : ''}`}
          onClick={() => this.handleSort('vote', 2)}
          value={this.state.query.sortby}
          icon="plus"
          size="large"
          style={{ width: `19%`, margin: 'auto' }}
        >Most Upvoted</Button>
        <Button type="link"
          className={`subtab-btn ${this.state.subtabSortType === 3 ? 'active' : ''}`}
          onClick={() => this.handleSort('latest', 3)}
          value={this.state.query.sortby}
          size="large"
          style={{ width: `19%`, margin: 'auto' }}
        >Recently Added</Button>
      </div>
    )

    const threadHorizontalInTriplist = (threadlist) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
        {threadlist.map((item, i) => {
          return (
            <ThreadHorizontalItemOfTriplist
              item={item}
              i={i}
              imgStyle={this.state.favor_imgs.find(e => e.thumbnail === item.thumbnail)}
              imgHandleSize={this.imgHandleSize}
              heartState={this.state.heartFavorites[i]}
              onHeartFavoriteClick={this.onHeartFavoriteClick}
              handleThreadInTripDropDown={this.handleThreadInTripDropDown}
              threadIntripMenu={this.state.threadIntripMenu}
              addRecentlyView={this.handleAddRecentlyView}
            />
          )
        })}
      </div>
    )

    const threadHorizontal = (threadlist) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
        {threadlist.map((item, i) => {
          return (
            <ThreadHorizontalItem
              item={item}
              i={i}
              imgStyle={this.state.favor_imgs.find(e => e.thumbnail === item.thumbnail)}
              imgHandleSize={this.imgHandleSize}
              heartState={this.state.heartFavorites[i]}
              onHeartFavoriteClick={this.onHeartFavoriteClick}
              handleFavDropDown={this.handleFavDropDown}
              favMenu={this.state.favMenu}
              addRecentlyView={this.handleAddRecentlyView}
            />
          )
        })}
      </div>
    )

    const threadHorizontalRecently = (threadlist) => {
      if (this.state.recentlylist != null) {
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
            {threadlist.map((item, i) => {
              return (
                <ThreadHorizontalRecentlyItem
                  item={item}
                  i={i}
                  heartState={this.state.heartFavorites[i]}
                  onHeartFavoriteClick={this.onHeartFavoriteClick}
                  handleRecentlyViewDropDown={this.handleRecentlyViewDropDown}
                  recentlyMenu={this.state.recentlyMenu}
                  addRecentlyView={this.handleAddRecentlyView}
                />
              )
            })}
          </div>
        )
      }
    }

    const tripListTap = () => {
      const selectedIndex = this.state.selectedTripList
      if (selectedIndex != null) {
        return (
          <>
            {/* {sorter} */}
            <p style={{ margin: '30px 0 0 0' }}><span style={{ color: '#10828C', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => this.setState({ selectedTripList: null })}>My Triplist</span> / {this.state.triplist[selectedIndex].title}</p>
            <div style={{ display: 'flex', paddingBottom: '40px', margin: '20px 20px 0 0', borderBottom: '0.5px solid rgba(130, 142, 180, 0.5)' }}>
              <img src={this.state.triplist[selectedIndex].thumbnail}
                alt="trip cover"
                style={{ width: `175px`, height: `175px`, marginRight: '40px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto 0' }}>
                <h1>{this.state.triplist[selectedIndex].title}
                  <Dropdown overlay={this.state.menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                      <Icon
                        type="more"
                        className="triplist-more"
                        onClick={() => this.handleTripDropDown(this.state.triplist[selectedIndex]._id, this.state.triplist[selectedIndex].thumbnail)} />
                    </a>
                  </Dropdown>
                </h1>
                <span>{this.state.triplist[selectedIndex].num_threads} Threads</span>
                <p></p>
                <p>{this.state.triplist[selectedIndex].description}</p>
              </div>
            </div>
            {threadHorizontalInTriplist(this.state.currentThread)}
            {this.handlePagination()}
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
                onClick={() => this.handleType('newest', 1)}
                size="large"
                style={{ width: `24%`, margin: `auto 0 auto 15%` }}
                value={this.state.query.sortby}
              >Recently Added</Button>
              <Button type="link"
                className={`subtab-btn ${this.state.tripListSortType === 2 ? 'active' : ''}`}
                onClick={() => this.handleType('most', 2)}
                size="large"
                style={{ width: `24%`, margin: 'auto' }}
                value={this.state.query.sortby}
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
                        onClick={() => { this.handleIdTrip(i) }}
                        style={{ width: `100%`, height: `100%`, cursor: 'pointer' }} />
                      <Dropdown key={i} overlay={this.state.menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                          <Icon
                            type="more"
                            style={{ color: "#10828C", padding: '20px 0 0 170px', fontSize: '23px', width: '5%' }}
                            onClick={() => this.handleTripDropDown(item._id, item.thumbnail)}
                          />
                        </a>
                      </Dropdown>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div>
                        <h2 onClick={() => this.handleIdTrip(i)} style={{ cursor: 'pointer' }}>{item.title}</h2>
                        <p>{item.num_threads} Threads</p>
                      </div>
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
          <h1 style={{ color: 'white' }}>{this.props.currentUser.displayName}</h1>
          <h4 style={{ color: 'white', marginBottom: '20px' }}>{this.props.currentUser.email}</h4>
          <div id="userprofile-tabs" style={{ background: 'white', padding: '15px 30px' }}>
            {/* My Triplist options create*/}
            <div>
              <Modal id="create-trip"
                title="Create Your Trip"
                visible={this.state.visibleTrip}
                onOk={this.handleCreateOk}
                onCancel={this.handleCreateCancel}
              >
                <p>Name
                  <Input type="text"
                    onChange={this.inputTitle}
                    placeholder="input title" /></p>
                <p>Description
                  <Input type="text"
                    onChange={this.inputShortDes}
                    placeholder="input descriotion" /></p>
              </Modal>
            </div>
            {/* My Triplist options create by thread details */}
            <div>
              <Modal id="create-trip"
                title="Create Your Trip"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <p>Name
                  <Input type="text"
                    onChange={this.inputTitle}
                    placeholder="input title" /></p>
                <p>Description
                  <Input type="text"
                    onChange={this.inputShortDes}
                    placeholder="input descriotion" /></p>
              </Modal>
            </div>
            {/* My Triplist options Edit details */}
            <div>
              <Modal id="edit-trip"
                title="Create Your Trip"
                visible={this.state.editVisible}
                onOk={this.handleCompleteEditTrip}
                onCancel={this.handleCancelEditTrip}
              >
                <p>Name
                  <Input type="text"
                    onChange={this.inputEditTitle}
                    placeholder="input title" /></p>
                <p>Description
                  <Input type="text"
                    onChange={this.inputEditShortDes}
                    placeholder="input descriotion" /></p>
              </Modal>
            </div>
            <Tabs tabBarExtraContent={createTrip} defaultActiveKey="1" tabBarStyle={{ color: 'black' }}>
              <TabPane tab="My Triplist" key="1">
                {tripListTap()}
              </TabPane>
              <TabPane tab="My Favorite" key="2">
                {sorter}
                {threadHorizontal(this.state.favThreadslist)}
                <Pagination current={this.state.currentPageFav} onChange={this.onChangeFavPage} total={this.state.totalPagesFav}
                  style={{ backgroundColor: '#FFF' }} />
              </TabPane>
              <TabPane tab="Recently Viewed" key="3">
                {threadHorizontalRecently(this.state.recentlylist)}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserProfile);