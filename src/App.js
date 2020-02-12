import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import Forums from './pages/Forums';
import Index from './pages/Index';
import Header from './pages/HeaderPage';

class App extends Component {
  render() {
    return (
      <Router>
         <Switch>
           <div style={{backgroundColor:"#000000"}}>
            <Route path="/" component={Header}/>
            </div>
          </Switch>
        <div>
          <Route exact path='/' component={Index} />
          <Route path='/forums' component={Forums} />
        </div>
      </Router>
    );
  }
}

export default App;
