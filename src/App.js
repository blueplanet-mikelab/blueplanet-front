import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import { PrivateRoute, AuthRoute } from './auth/PrivateRoute';

import { useAuth, userContext } from './auth/Auth';

import 'antd/dist/antd.css';
import { Layout } from 'antd';
import SpinLoading from './components/SpinLoading'

const { Header, Content, Footer } = Layout

const App = () => {
  const { initializing, currentUser } = useAuth()
  if (initializing) {
    return <SpinLoading />
  }

  return (
    <userContext.Provider value={{ currentUser }}>
      <Router>
        <Layout className='layout'>
          <Header className='header'>
            <Navigation />
          </Header>

          <Content className='content'>
            <AuthRoute exact path={ROUTES.HOME} component={Index} />
            <AuthRoute path={ROUTES.FORUMS} component={Forums} />
            <PrivateRoute exact path={ROUTES.PROFILE} component={UserProfile} />
            <Route path={ROUTES.REGISTER} component={Register} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
          </Content>

          <Footer className='footer'>
            Web Application for Organizing Traveling Trip
        </Footer>

        </Layout>
      </Router>
    </userContext.Provider>
  )
}

export default App;