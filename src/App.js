import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import Navigation from './components/Navigation';
import Index from './pages/Index';
import Forums from './pages/Forums';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import Login from './pages/LogIn';
import PasswordForget from './pages/PasswordForget';

import * as ROUTES from './constants/routes';
import PrivateRoute from './auth/PrivateRoute';

import { AuthProvider } from './auth/Auth';

const App = () => (
  <AuthProvider>
    <Router>
      <div>
        <Navigation />

        <Route exact path={ROUTES.HOME} component={Index} />
        <Route path={ROUTES.FORUMS} component={Forums} />
        <PrivateRoute exact path={ROUTES.PROFILE} component={UserProfile} />
        <Route path={ROUTES.REGISTER} component={Register} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      </div>
    </Router>
  </AuthProvider>
)

export default App;