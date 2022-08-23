import React from "react";
import './App.css';
import { BrowserRouter, Routes,Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import User from './components/User/User';
import Home from './components/Home/Home';
import Auth from "./components/Auth/Auth";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar> </Navbar>
        <Routes>
          <Route exact path="http://localhost:8080/" element={<Home/>}></Route>
          <Route exact path="http://localhost:8080/users/:userId" element={<User/>}></Route>
          <Route   path="http://localhost:8080/auth"> 
          {localStorage.getItem("currentUser") != null ?<Navigate to={"http://localhost:8080/"} /> : <Auth/>}
          </Route>          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

