import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './Homepage';
import PageKelas from './ManajemenData/Kelas/PageKelas';
import PageSiswa from './ManajemenData/Siswa/PageSiswa';
import PageAlumni from './Akademik/Alumni/PageAlumni';
import PageKelulusan from './Akademik/Kelulusan/PageKelulusan';
import PageTahunAjaran from './Akademik/TahunAjaran/PageTahunAjaran';
import PageNotFound from './NotFound/PageNoFound';
import PagePosBayar from './Keuangan/PagePosBayar';
import PageAkunBiaya from './Keuangan/AkunBiaya/PageAkunBiaya';
// import PageDashboard from './Dashboard/PageDashboard';
import LoginPage from './Login/Login';
import 'react-toastify/dist/ReactToastify.css';


import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import MainPage from './MainPage';
import PageProgramStudi from './ManajemenData/ProgramStudi/PageProgramStudi';
import PageLaporanPembayaranKelas from './Laporan/Pembayaran/PerKelas/PageLaporanPembayaranKelas';
import PageDashboard from './Dashboard/PageDashboard';
function AppRoutes() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin' element={<Homepage />}>
            <Route path='kelas' element={<PageKelas />} />
            <Route path='dashboard' element={<PageKelas />} />

            <Route path='siswa' element={<PageSiswa />} />
            <Route path='alumni' element={<PageAlumni />} />
            <Route path='kelulusan' element={<PageKelulusan />} />
            <Route path='program-studi' element={<PageProgramStudi />} />
            <Route path='tahun-ajaran' element={<PageTahunAjaran />} />
            <Route path='laporan-pembayaran/kelas' element={<PageLaporanPembayaranKelas />} />

            <Route path='pos-bayar' element={<PagePosBayar />} />
            <Route path='akun-biaya' element={<PageAkunBiaya />} />

            <Route path='not-found' element={<PageNotFound />} />
            <Route path='' element={<PageDashboard />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default AppRoutes;
