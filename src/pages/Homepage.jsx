import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styleCss/style.css';
import Sidebar from '../component/Sidebar';
import TableKelas from '../component/Pages/Kesiswaan/PageKelas';
import TableSiswa from '../component/Kesiswaan/TableSiswa';
import PageAlumni from '../component/Pages/Akademik/PageAlumni';
import PageKelulusan from '../component/Pages/Akademik/PageKelulusan';
import PageTahunAjaran from '../component/Pages/Akademik/PageTahunAjaran';
import PageDashboard from '../component/Pages/Pagedashboard';
import LoginPage from './Login/Login';

function Homepage() {
  return (

      <div className='containerApp'>
       <div className='sidebar'>
          <Sidebar />
        </div>

        <div className='content'>
          <Outlet />
        </div>
      </div>
 
  );
}

export default Homepage;
