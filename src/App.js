import React from "react";

import './App.css';
import {BrowserRouter } from 'react-router-dom';
import {Switch} from 'react-router'
import { Route } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';
import User from './components/User/User';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar> </Navbar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/users/:userId" component={User}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
