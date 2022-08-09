import React from "react";
import './App.css';
import {BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import User from './components/User/User';
import Home from './components/Home/Home';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar> </Navbar>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/users/:userId" component={User}></Route>
      </BrowserRouter>
    </div>
  );
}

