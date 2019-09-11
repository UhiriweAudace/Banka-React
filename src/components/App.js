import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './Layout/Header';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/auth/signin' component={Signin} />
            <Route exact path='/auth/signup' component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
