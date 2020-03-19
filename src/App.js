import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import firebase from './firebase/config';

import Navigation from './components/Navigation';
import Index from './pages/Index';
import Forums from './pages/Forums';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import Login from './pages/LogIn';
import PasswordForget from './pages/PasswordForget';

import * as ROUTES from './constants/routes';

// import Header from './components/HeaderPage';

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <Switch>
//           <div style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: "#000000", zIndex: '100' }}>
//             <Route path="/" component={Header} />
//           </div>
//         </Switch>
//         <div>
//           <div style={{ marginTop: '4%' }}>
//             <Route exact path='/' component={Index} />
//           </div>
//           <div style={{ marginTop: '-5%' }}>
//             <Route path='/forums' component={Forums} />
//           </div>
//           <Route path='/userprofile' component={UserProfile} />
//         </div>
//       </Router>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged(authUser => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
    })
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />

          <Route exact path={ROUTES.HOME} component={Index} />
          <Route path={ROUTES.FORUMS} component={Forums} />
          <Route path={ROUTES.PROFILE} render={(props) => (<UserProfile {...props} authUser={this.state.authUser} />)} />
          <Route path={ROUTES.REGISTER} component={Register} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />

        </div>

      </Router>
    );
  }
}

export default App;