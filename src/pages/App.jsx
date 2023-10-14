import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './Homepage';
import TableKelas from './Kesiswaan/Kelas/PageKelas';
import PageSiswa from './Kesiswaan/Siswa/PageSiswa';
import PageAlumni from './Akademik/Alumni/PageAlumni';
import PageKelulusan from './Akademik/Kelulusan/PageKelulusan';
import PageTahunAjaran from './Akademik/TahunAjaran/PageTahunAjaran';
import PageDashboard from './Dashboard/PageDashboard';
import LoginPage from './Login/Login';
import 'react-toastify/dist/ReactToastify.css';


import Dashboard from './Dashboard/components/Dashboard';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import MainPage from './MainPage';
function AppRoutes() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path='/' element={<MainPage />} />
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
      </PersistGate>
    </Provider>
  );
}

export default AppRoutes;
