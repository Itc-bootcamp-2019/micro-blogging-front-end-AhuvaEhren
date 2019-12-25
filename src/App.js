import React from 'react';
import './App.css';
import Navbar from './components/Navbar/index';
import Home from './components/Home/index';
import Profile from './components/Profile/index';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {


  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/'>

            <Home />

          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
