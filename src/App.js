import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import Forums from './pages/Forums';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/forums' component={Forums} />
        </div>
      </Router>
    );
  }
}

export default App;
