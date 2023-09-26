import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styleCss/style.css';
import Homepage from './Homepage';
import TableKelas from './Kesiswaan/Kelas/PageKelas';
import PageSiswa from './Kesiswaan/Siswa/PageSiswa';
import PageAlumni from './Akademik/Alumni/PageAlumni';
import PageKelulusan from './Akademik/Kelulusan/PageKelulusan';
import PageTahunAjaran from './Akademik/TahunAjaran/PageTahunAjaran';
import PageDashboard from './Dashboard/PageDashboard';
import LoginPage from './Login/Login';
import Dashboard from './Dashboard/components/Dashboard';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PageDashboard />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/admin' element={<Homepage />}>
        <Route path='kelas' element={<TableKelas />} />
        <Route path='dashboard' element={<TableKelas />} />

        <Route path='siswa' element={<PageSiswa />} />
        <Route path='alumni' element={<PageAlumni />} />
        <Route path='kelulusan' element={<PageKelulusan />} />
        <Route path='tahun-ajaran' element={<PageTahunAjaran />} />
        <Route path='' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
