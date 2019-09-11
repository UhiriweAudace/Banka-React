import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Layout/Header';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import Profile from './Profile';
import CreateAccount from './CreateAccount';

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
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
