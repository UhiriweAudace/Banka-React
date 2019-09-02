import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/client.css';
import './css/signup.css';
import './css/style.css';
import Signup from './components/Layout/Signup';
import Home from './components/Layout/Home';
import Login from './components/Layout/Login';
import ClientHome from './components/Layout/client/ClientHome';
import AuthHeader from './components/Header/AuthHeader';

class App extends Component {
  
  render(){
    return (
      <Router>
        <Route>
          <AuthHeader/>
          <ToastContainer />
          <div className="container">
          <Route exact path="/" component={Home} />
          <Route path="/auth/signup" component={Signup} />
          <Route path="/auth/signin"  component={Login} />
          <Route path="/client" component={ClientHome}/>
        </div> 
        </Route>
      </Router>
    );
  }
}

export default App;
