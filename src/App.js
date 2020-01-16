import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import Forums from './pages/Forums';
import Index from './pages/Index';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Index} />
          <Route path='/forums' component={Forums} />
        </div>
      </Router>
    );
  }
}

export default App;
