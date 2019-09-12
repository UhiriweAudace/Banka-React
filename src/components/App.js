import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import JWT from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logOutUser } from '../redux/actions/signin.action';
import store from '../redux/store';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Layout/Header';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import Profile from './Profile';
import CreateAccount from './CreateAccount';
import Accounts from './Accounts';

if (sessionStorage.token) {
  setAuthToken(sessionStorage.token);
  const decoded = JWT(sessionStorage.token);
  store.dispatch(setCurrentUser(decoded));
  // check if the token expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logOutUser);
    // Redirect user to login
    window.location.href = '/auth/signin';
  }
}
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/auth/signin' component={Signin} />
          <Route exact path='/auth/signup' component={Signup} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/accounts/new' component={CreateAccount} />
          <Route exact path='/accounts' component={Accounts} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
