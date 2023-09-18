import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styleCss/style.css';
import Sidebar from './component/Sidebar';
import TableKelas from '../src/component/Pages/Kesiswaan/PageKelas';
import TableSiswa from './component/Kesiswaan/TableSiswa';
import PageAlumni from './component/Pages/Akademik/PageAlumni';
import PageKelulusan from './component/Pages/Akademik/PageKelulusan';
import PageTahunAjaran from './component/Pages/Akademik/PageTahunAjaran';
import PageDashboard from './component/Pages/Pagedashboard';

function App() {
  return (
    <>
      {/* <div className='container-fluid'>
        <div className='row'>
          <div className='col-2'>
            <Sidebar />
          </div>
        </div>
      </div> */}

      <div className='containerApp'>
        <div className='sidebar'>
          <Sidebar />
        </div>

        <div className='content'>
          <Routes>
            <Route path='/kelas' element={<TableKelas />} />
            <Route path='/siswa' element={<TableSiswa />} />
            <Route path='/alumni' element={<PageAlumni />} />
            <Route path='/kelulusan' element={<PageKelulusan />} />
            <Route path='/tahuna-jaran' element={<PageTahunAjaran />} />
            <Route path='/' element={<PageDashboard />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
