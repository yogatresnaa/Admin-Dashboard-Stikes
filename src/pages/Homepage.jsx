import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styleCss/style.css';
import Sidebar from '../component/Sidebar';
import NavBar from '../component/NavBar';

function Homepage() {
  return (
    <div className='containerApp'>
      <div className='sidebar'>
        <Sidebar />
      </div>

      <div className='content'>
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Homepage;
