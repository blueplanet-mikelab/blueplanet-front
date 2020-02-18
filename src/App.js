import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import Forums from './pages/Forums';
import Index from './pages/Index';
import Header from './pages/HeaderPage';
import UserProfile from './pages/UserProfile';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <div style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: "#000000", marginLeft: '-2.5%', zIndex: '100' }}>
            <Route path="/" component={Header} />
          </div>
        </Switch>
        <div style={{ marginTop: '6.5%' }}>
          <Route exact path='/' component={Index} />
          <Route path='/forums' component={Forums} />
          <Route path='/userprofile' component={UserProfile} />
        </div>
      </Router>
    );
  }
}

export default App;
