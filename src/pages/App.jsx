import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styleCss/style.css';
import Homepage from './Homepage';
import TableKelas from '../component/Pages/Kesiswaan/PageKelas';
import TableSiswa from '../component/Kesiswaan/TableSiswa';
import PageAlumni from '../component/Pages/Akademik/PageAlumni';
import PageKelulusan from '../component/Pages/Akademik/PageKelulusan';
import PageTahunAjaran from '../component/Pages/Akademik/PageTahunAjaran';
import PageDashboard from '../component/Pages/Pagedashboard';
import LoginPage from './Login/Login';
import Dashboard from '../component/Dashboard/Dashboard';

function AppRoutes() {
    return (

        <Routes>
            <Route path='/' element={<PageDashboard />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/admin" element={<Homepage />}>

                <Route path='kelas' element={<TableKelas />} />
                <Route path='dashboard' element={<TableKelas />} />


                <Route path='siswa' element={<TableSiswa />} />
                <Route path='alumni' element={<PageAlumni />} />
                <Route path='kelulusan' element={<PageKelulusan />} />
                <Route path='tahun-ajaran' element={<PageTahunAjaran />} />
                <Route path='' element={<Dashboard />} />
            </Route>

        </Routes>

    );
}

export default AppRoutes;
