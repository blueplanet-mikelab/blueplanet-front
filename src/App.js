import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import Forums from './pages/Forums';
import Index from './pages/Index';
import Header from './components/HeaderPage';
import UserProfile from './pages/UserProfile';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <div style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: "#000000", zIndex: '100' }}>
            <Route path="/" component={Header} />
          </div>
        </Switch>
        <div>
          <div style={{ marginTop: '4%' }}>
            <Route exact path='/' component={Index} />
          </div>
          <div style={{ marginTop: '-5%' }}>
            <Route path='/forums' component={Forums} />
          </div>
          <Route path='/userprofile' component={UserProfile} />
        </div>
      </Router>
    );
  }
}

export default App;
