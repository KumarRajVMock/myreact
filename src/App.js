import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import "./App.css";

import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import SignupVerify from './components/SignupVerify'
import Forgotpassword from './components/Forgotpassword'
import Resetpassword from './components/Resetpassword'
import Admin from './components/Admin'
import Normal from './components/Normal'
import Filter from './components/Filter'
import Dashboard from './components/Dashboard'
import ViewTask from './components/ViewTask.js'
import SearchTask from './components/SearchTask.js'
import Game from './components/Tictactoe';
// import {ProtectedRoute} from './ProtectedRoute';
import ProtectedRoute from './ProtectedRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <ProtectedRoute
                isAllowed={localStorage.getItem("token")}
                exact path="/self" 
                component={Dashboard}
              />
              <ProtectedRoute
                isAllowed={localStorage.getItem("token")}
                exact path="/admin" 
                component={Admin}
              />
              <ProtectedRoute
                isAllowed={localStorage.getItem("token")}
                exact path="/normal" 
                component={Normal}
              />
              <ProtectedRoute
                isAllowed={localStorage.getItem("token")}
                exact path="/search" 
                component={Filter}
              />
              <ProtectedRoute
                isAllowed={localStorage.getItem("token")}
                exact path="/viewtask" 
                component={ViewTask}
              />
              <ProtectedRoute
                isAllowed={localStorage.getItem("token")}
                exact path="/searchtask" 
                component={SearchTask}
              />
              <Route exact path="/" component={Welcome} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/verify/:token" component={SignupVerify} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={Forgotpassword} />
              <Route exact path="/resetpassword/:token" component={Resetpassword} />
              <Route exact path="/tictactoe" component={Game} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App

