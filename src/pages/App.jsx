import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './Homepage';
import PageKelas from './ManajemenData/Kelas/PageKelas';
import PageSiswa from './ManajemenData/Siswa/PageSiswa';
import PageAlumni from './Akademik/Alumni/PageAlumni';
import PageKelulusan from './Akademik/Kelulusan/PageKelulusan';
import PageTahunAjaran from './Akademik/TahunAjaran/PageTahunAjaran';
import PageNotFound from './NotFound/PageNoFound';
import PagePosBayar from './Keuangan/PosBayar/PagePosBayar';
import PageAkunBiaya from './Keuangan/AkunBiaya/PageAkunBiaya';

import PageSaldoAwal from './KasBank/SaldoAwal/PageSaldoAwal';
import PageKasKeluar from './KasBank/KasKeluar/PageKasKeluar';
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
import PageJenisBayar from './Keuangan/JenisBayar/PageJenisBayar';
import PageTarifTagihan from './Keuangan/JenisBayar/TarifTagihan/PageTarifTagihan';
import PageAddTarifTagihan from './Keuangan/JenisBayar/TarifTagihan/TambahTarifTagihan/PageAddTarifTagihan';
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
            <Route path='jenis-bayar' element={<PageJenisBayar />} />
            <Route path='akun-biaya' element={<PageAkunBiaya />} />
            <Route path='tarif-tagihan/:id' element={<PageTarifTagihan />} />
            <Route path='tarif-tagihan/:id/tambah' element={<PageAddTarifTagihan />} />

            <Route path='not-found' element={<PageNotFound />} />

            <Route path='akun-biaya' element={<PageAkunBiaya />} />
            <Route path='pos-bayar' element={<PagePosBayar />} />

            <Route path='saldo-awal' element={<PageSaldoAwal />} />
            <Route path='kas-keluar' element={<PageKasKeluar />} />

            <Route path='' element={<PageDashboard />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default AppRoutes;
