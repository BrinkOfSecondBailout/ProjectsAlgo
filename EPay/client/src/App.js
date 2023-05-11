import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
    const isLogged = window.localStorage.getItem('isLogged');

    return (
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={isLogged? <Dashboard/> : <Login/>} />
              <Route path='/logout' element={<Logout/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </BrowserRouter>
    );
}

export default App;
