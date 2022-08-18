import React from "react";
import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import User from './components/User/User';
import Home from './components/Home/Home';
import Auth from "./Auth/Auth";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar> </Navbar>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/users/:userId" element={<User/>}></Route>
          <Route exact path="/auth" element={<Auth/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

