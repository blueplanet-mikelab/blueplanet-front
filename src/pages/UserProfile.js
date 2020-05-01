import React, { Component, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import { AuthContext } from '../auth/Auth';

import axios from 'axios';
import qs from 'qs';

import { Tabs, Input, Icon, Button, Menu, Dropdown, message, Modal, Upload, Pagination } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import "../css/userprofile.css";
import ThreadHorizontalItem from '../components/userprofile/ThreadsHorizontalItem';
import ThreadHorizontalItemOfTriplist from '../components/userprofile/ThreadHorizontalItemOfTriplist';
import ThreadHorizontalRecentlyItem from '../components/userprofile/ThreadHorizontalRecentlyItem';


import * as ROUTES from '../constants/routes';

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const { TabPane } = Tabs
const { Search } = Input;
const { SubMenu } = Menu;

var tripPagination, favPagination = 1;
var selectedUserTab = 'favorite';
var selectedTab = 'favorite';

var menu = (
  <Menu>
    <Menu.Item>Edit details</Menu.Item>
    <Menu.Item>Delete</Menu.Item>
  </Menu>
);

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
      favThreadslist: [],
      recentlylist: [],
      recentThreadslist: [],
      menu: menu,
      favMenu: menu,
      threadIntripMenu: menu,
      recentlyMenu: menu,
      tripListSortType: 1,
      subtabSortType: 1,
      selectedTripList: null,
      visible: false,
      editVisible: false,
      titleTripByFav: "",
      shortDescByFav: "",
      inputEditTitle: "",
      inputEditShortDes: "",
      loading: false,
      tripPagination: 1,
      favPagination: 1,
    }
  }

  componentDidMount() {
    this.props.currentUser.getIdToken(/* forceRefresh */ true)
      .then((idToken) => {
        //Get trip list
        var res = axios.get(`http://${backend_url}/api/my-triplist/triplists`, {
          headers: {
            'Authorization': idToken
          }
        })
        res.then((result) => {
          // console.log(idToken)
          console.log("result trip")
          console.log(result)
          this.setState({
            triplist: result.data,
          });
          var hasThreads = "true";
          for (var i = 0; i < this.state.triplist.length; i++) {
            if (this.state.triplist[i].threads.length === 0) {
              console.log("No any thread in trip")
              hasThreads = "false";
            }
          }
          if (this.state.triplist === "" || this.state.triplist == null || this.state.triplist.length === 0 || hasThreads === "false") {
            console.log("null")
          }
          else {
            console.log("title " + this.state.triplist[0].title)
            console.log("threads " + this.state.triplist[0].threads[0].title)
          }
        })

        // Get favorite list
        var fav = axios.get(`http://${backend_url}/api/my-triplist/favorites/${favPagination}`, {
          headers: {
            'Authorization': idToken
          }
        })
        fav.then((result) => {
          console.log("result fav")
          console.log(result)
          this.setState({
            favoritelist: result.data,
            favThreadslist: result.data.favorite.threads,
            heartFavorites: this.state.favoritelist.map(() => "outlined"),
            favor_imgs: this.state.favoritelist.map(e => ({ thumbnail: e.thumbnail })),
          });
          if (this.state.favoritelist === "" || this.state.favoritelist == null || this.state.favThreadslist.length === 0) {
            console.log("null")
          } else {
            console.log(" favoritelist" + this.state.favThreadslist[0].title)
          }
        })
        // Get recently-view list
        var recently = axios.get(`http://${backend_url}/api/my-triplist/recently-viewed`, {
          headers: {
            'Authorization': idToken
          }
        })
        recently.then((result) => {
          console.log("result recent")
          console.log(result)
          this.setState({
            recentlylist: result.data,
            recentThreadslist: result.data.recentThreads,
            heartRecentlyViews: this.state.recentlylist.map(() => "outlined"),
          });
          if (this.state.recentlylist === "" || this.state.recentlylist == null || this.state.recentlylist.length === 0) {
            console.log("null")
          } else {
            console.log("recentThreadslist" + this.state.recentlylist[0].title)
          }
        })

      }).catch(function (error) {
        console.log(error)
      });
    // if (this.props.location != null) {
    //   const q = this.getQueryParams(this.props.location.search);
    //   this.setState({
    //     query: q
    //   })
    //   this.getInformation(q);
    // }
  }

  createTriplistByThread = (id, thumbnail) => {
    const ThreadId = id
    this.props.currentUser.getIdToken(true)
      .then((idToken) => {
        axios.post(`http://${backend_url}/api/my-triplist/triplists/add/${ThreadId}`,
          {
            "title": this.state.titleTripByFav,
            "description": this.state.shortDescByFav,
            "thumbnail": thumbnail,
          }, {
          headers: {
            'Authorization': idToken
          }
        })
        console.log("created by thread")
      }).catch(function (error) {
        console.log(error)
      });
  }

  editTriplist = (id, thumbnail) => {
    console.log(this.state.inputEditTitle)
    console.log(this.state.inputEditShortDes)
    this.props.currentUser.getIdToken(true)
      .then((idToken) => {
        axios.put(`http://${backend_url}/api/my-triplist/triplists/${id}`,
          {
            "title": this.state.inputEditTitle,
            "description": this.state.inputEditShortDes,
            "thumbnail": thumbnail
          }, {
          headers: {
            'Authorization': idToken
          }
        })
        console.log("edit trip")
      }).catch(function (error) {
        console.log(error)
      });
  }

  addRecentlyView = (id) => {
    console.log(id)
    this.props.currentUser.getIdToken(true)
      .then((idToken) => {
        axios.put(`http://${backend_url}/api/my-triplist/recently-viewed/${id}`, {}, {
          headers: {
            'Authorization': idToken
          }
        })
        console.log("add recently")
      }).catch(function (error) {
        console.log(error)
      });
  }

  addThreadIntoTrip = (trip, id) => {
    const tripId = trip;
    const threadId = id;
    this.props.currentUser.getIdToken(true)
      .then((idToken) => {
        axios.put(`http://${backend_url}/api/my-triplist/triplists/${tripId}/add/${threadId}`, {}, {
          headers: {
            'Authorization': idToken
          }
        })
        console.log("add")
      }).catch(function (error) {
        console.log(error)
      });
  }

  inputTitleByFav = (input) => {
    this.setState({
      titleTripByFav: input.target.value,
    });
    console.log('changed', input.target.value);
  }

  inputShortDesByFav = (input) => {
    this.setState({
      shortDescByFav: input.target.value,
    });
    console.log('changed', input.target.value);
  }

  showModal = (id, thumbnail) => {
    this.setState({
      visible: true,
      idThread: id,
      thumbnailThread: thumbnail
    });
  };

  handleOk = e => {
    console.log(this.state.idThread)
    console.log(this.state.thumbnailThread)
    this.createTriplistByThread(this.state.idThread, this.state.thumbnailThread)
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
    console.log('changed', input.target.value);
  }

  inputEditShortDes = (input) => {
    this.setState({
      inputEditShortDes: input.target.value,
    });
    console.log('changed', input.target.value);
  }

  showEditTripModal = (id, thumbnail) => {
    this.setState({
      editVisible: true,
      idThread: id,
      thumbnailThread: thumbnail
    });
  };

  handleCompleteEditTrip = e => {
    console.log(this.state.idThread)
    console.log(this.state.thumbnailThread)
    this.editTriplist(this.state.idThread, this.state.thumbnailThread)
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

  deleteFavorite = (id) => {
    const favId = id
    this.props.currentUser.getIdToken(true)
      .then((idToken) => {
        axios.delete(`http://${backend_url}/api/my-triplist/favorites/${favId}`, {
          headers: {
            'Authorization': idToken
          }
        })
        console.log("delete")
      }).catch(function (error) {
        console.log(error)
      });
    message.success('Your Favorite has been deleted.');
  }

  deleteTriplist = (id) => {
    const tripId = id
    this.props.currentUser.getIdToken(true)
      .then((idToken) => {
        axios.delete(`http://${backend_url}/api/my-triplist/triplists/${tripId}`, {
          headers: {
            'Authorization': idToken
          }
        })
        console.log("delete")
      }).catch(function (error) {
        console.log(error)
      });
    message.success('Your Triplist has been deleted.');
  }

  deleteThreadInTriplist = (id, tripId) => {
    const threadId = id
    this.props.currentUser.getIdToken(true)
      .then((idToken) => {
        axios.delete(`http://${backend_url}/api/my-triplist/triplists/${tripId}/remove/${threadId}`, {
          headers: {
            'Authorization': idToken
          }
        })
        console.log("delete")
      }).catch(function (error) {
        console.log(error)
      });
    message.success('Your thread has been deleted.');
  }

  onHeartFavoriteClick = (i, id, type) => {
    const threadId = id;
    console.log("id in trip: " + id)
    this.props.currentUser.getIdToken(true)
      .then((idToken) => {
        axios.put(`http://${backend_url}/api/my-triplist/favorites/${threadId}`, {}, {
          headers: {
            'Authorization': idToken
          }
        })
        console.log("fav ed")
      }).catch(function (error) {
        console.log(error)
      });
    if (type === 'favorite') {
      const newThemes = this.state.heartFavorites
      newThemes[i] = newThemes[i] !== "outlined" ? "outlined" : "filled"
      this.setState({
        heartFavorites: newThemes
      })
    } else if (type === 'recently') {
      const newThemes = this.state.heartRecentlyViews
      newThemes[i] = newThemes[i] !== "outlined" ? "outlined" : "filled"
      this.setState({
        heartRecentlyViews: newThemes
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
        <Menu.Item><Button onClick={() => this.showEditTripModal(tripId, thumbnail)}>Edit details</Button></Menu.Item>
        <Menu.Item><Button onClick={() => this.deleteTriplist(tripId)}>Delete</Button></Menu.Item>
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
        <Menu.Item><Button onClick={() => this.addThreadIntoTrip(thread._id, threadId)}>{thread.title}</Button></Menu.Item>
      )
    })
    var menuThreadInTrip = (
      <Menu>
        <SubMenu title="Add to My Triplist">
          <Menu.Item><Button onClick={() => this.showModal(threadId, thumbnail)}>New Triplist</Button></Menu.Item>
          {allTrip}
        </SubMenu>
        <Menu.Item>Save to My Favorite</Menu.Item>
        <Menu.Item><Button onClick={() => this.deleteThreadInTriplist(threadId, this.state.triplist[this.state.selectedTripList]._id)}>Delete</Button></Menu.Item>
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
        <Menu.Item><Button onClick={() => this.addThreadIntoTrip(thread._id, favId)}>{thread.title}</Button></Menu.Item>
      )
    })
    var menuInFav = (
      <Menu>
        <SubMenu title="Add to My Triplist">
          <Menu.Item><Button onClick={() => this.showModal(favId, thumbnail)}>New Triplist</Button></Menu.Item>
          {allTrip}
        </SubMenu>
        <Menu.Item><Button onClick={() => this.deleteFavorite(favId)}>Delete</Button></Menu.Item>
      </Menu>
    );
    this.setState({
      favMenu: menuInFav
    })
  }

  handleRecentlyViewDropDown = (id) => {
    var allTrip = this.state.triplist.map(thread => {
      return (
        <Menu.Item><Button onClick={() => this.addThreadIntoTrip(thread._id, id)}>{thread.title}</Button></Menu.Item>
      )
    })
    var menuThreadInRecently = (
      <Menu>
        <SubMenu title="Add to My Triplist">
          {/* <Menu.Item><Button onClick={() => this.showModal(id)}>New Triplist</Button></Menu.Item> */}
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

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        })
        console.log("img: " + imageUrl)
        console.log(info.file)
      });
    }
  };

  handlePagination = () => {
    return (<Pagination current={tripPagination} onChange={this.onChangePage} total={100}
      style={{ backgroundColor: '#FFF' }} />)
  }

  onChangePage = (page) => {
    this.setState({
      tripPagination: page,
    });
    tripPagination = page;
    console.log(tripPagination)
    // console.log(favPagination)
  };

  onChangeFavPage = (page) => {
    this.setState({
      favPagination: page,
    });
    favPagination = page;
    console.log(favPagination)
  };

  handleType = (type, value) => {
    // const query = this.state.query;
    // query.sortby = type
    this.setState({
      // query: query,
      tripListSortType: value,
    });
    // this.getInformation(query)
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

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
              addRecentlyView={this.addRecentlyView}
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
                  heartState={this.state.heartRecentlyViews[i]}
                  onHeartFavoriteClick={this.onHeartFavoriteClick}
                  handleFavDropDown={this.handleRecentlyViewDropDown}
                  recentlyMenu={this.state.recentlyMenu}
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
            {sorter}
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
                <span>{this.state.triplist[selectedIndex].numThreads} Threads</span>
                <p></p>
                <p>{this.state.triplist[selectedIndex].description}</p>
              </div>
            </div>
            {threadHorizontalInTriplist(this.state.triplist[selectedIndex].threads)}
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
                onClick={() => this.handleType('most', 1)}
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
                        onClick={() => { this.setState({ selectedTripList: i }) }}
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
                        <h2 onClick={() => this.setState({ selectedTripList: i })} style={{ cursor: 'pointer' }}>{item.title}</h2>
                        <p>{item.numThreads} Threads</p>
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
          <h1 style={{ color: 'white' }}>{this.props.currentUser.displayName} <Icon type="edit" /></h1>
          <h4 style={{ color: 'white', marginBottom: '20px' }}>{this.props.currentUser.email} <Icon type="edit" /></h4>
          <div id="userprofile-tabs" style={{ background: 'white', padding: '15px 30px' }}>
            {/* My Triplist options create by thread details */}
            <div>
              <Modal id="create-trip"
                title="Create Your Trip"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <p>Name
                  <Input type="text"
                    onChange={this.inputTitleByFav}
                    placeholder="input title" /></p>
                <p>Description
                  <Input type="text"
                    onChange={this.inputShortDesByFav}
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
            <Tabs defaultActiveKey="1" tabBarStyle={{ color: 'black' }}>
              <TabPane tab="My Triplist" key="1" onClick={() => this.resetPage()}>
                {tripListTap()}
              </TabPane>
              <TabPane tab="My Favorite" key="2" onClick={() => this.resetPage()}>
                {sorter}
                {threadHorizontal(this.state.favThreadslist)}
                <Pagination current={favPagination} onChange={this.onChangeFavPage} total={100}
                  style={{ backgroundColor: '#FFF' }} />
              </TabPane>
              <TabPane tab="Recently Viewed" key="3" onClick={() => this.resetPage()}>
                {threadHorizontalRecently(this.state.recentlylist)}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TriplistPage);