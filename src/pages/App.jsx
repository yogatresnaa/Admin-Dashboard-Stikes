import React, { lazy,Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../redux/store'
import 'react-toastify/dist/ReactToastify.css'

const Homepage = lazy(() =>
  import("./Homepage")
);
const PageKelas = lazy(() =>
  import("./ManajemenData/Kelas/PageKelas")
);
const PageSiswa = lazy(() =>
  import("./ManajemenData/Siswa/PageSiswa")
);
const PageAlumni = lazy(() =>
  import("./Akademik/Alumni/PageAlumni")
);
const PageKelulusan = lazy(() =>
  import("./Akademik/Kelulusan/PageKelulusan")
);
const PageTahunAjaran = lazy(() =>
  import("./Akademik/TahunAjaran/PageTahunAjaran")
);
const PageNotFound = lazy(() =>
  import("./NotFound/PageNoFound")
);
const PagePosBayar = lazy(() =>
  import("./Keuangan/PosBayar/PagePosBayar")
);
const PageAkunBiaya = lazy(() =>
  import("./Keuangan/AkunBiaya/PageAkunBiaya")
);
const PagePembayaranSiswa = lazy(() =>
  import("./Keuangan/PembayaranSiswa/PagePembayaranSiswa")
);

const PageSaldoAwal = lazy(() =>
  import("./KasBank/SaldoAwal/PageSaldoAwal")
);

const PageKasKeluar = lazy(() =>
  import("./KasBank/KasKeluar/PageKasKeluar")
);

const PageKasMasuk = lazy(() =>
  import("./KasBank/KasMasuk/PageKasMasuk")
);

const PageKirimTagihan = lazy(() =>
  import("./KasBank/KirimTagihan/PageKirimTagihan")
);

const PageLaporanPembayaranTanggal = lazy(() =>
  import("./Laporan/Pembayaran/PerTanggal/PageLaporanPerTanggal")
);

const PageLaporanPembayaranKelas = lazy(() =>
  import("./Laporan/Pembayaran/PerKelas/PageLaporanPembayaranKelas")
);
const PageTagihanSiswa = lazy(() =>
  import("./Laporan/Pembayaran/TagihanSiswa/PageTagihanSiswa")
);
const PageRekapPembayaran = lazy(() =>
  import("./Laporan/Pembayaran/RekapPembayaran/PageRekapPembayaran")
);
const LoginPage = lazy(() =>
  import("./Login/Login")
);
const MainPage = lazy(() =>
  import("./MainPage")
);
const PageProgramStudi = lazy(() =>
  import("./ManajemenData/ProgramStudi/PageProgramStudi")
);
const PageDashboard = lazy(() =>
  import("./Dashboard/PageDashboard")
);
const PageJenisBayar = lazy(() =>
  import("./Keuangan/JenisBayar/PageJenisBayar")
);
const PageTarifTagihan = lazy(() =>
  import("./Keuangan/JenisBayar/TarifTagihan/PageTarifTagihan")
);
const PageAddTarifTagihan = lazy(() =>
  import("./Keuangan/JenisBayar/TarifTagihan/ManageTarifTagihan/TambahTarifTagihan/PageAddTarifTagihan")
);
const PageEditTarifTagihan = lazy(() =>
  import("./Keuangan/JenisBayar/TarifTagihan/ManageTarifTagihan/EditTarifTagihan/PageEditTarifTagihan")
);





// Laporan

// Laporan


// import PageDashboard from './Dashboard/PageDashboard';

import PreLoader from '../component/Loader/PreLoader';
import LoadingProvider from '../context/LoadingContext'
function AppRoutes() {
    return (
        <Suspense fallback={<PreLoader />}>
        <Provider store={store}>
            <LoadingProvider>
                <PersistGate loading={null} persistor={persistor}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<Homepage />}>
                        <Route path="kelas" element={<PageKelas />} />
                        <Route path="dashboard" element={<PageKelas />} />
                        <Route path="siswa" element={<PageSiswa />} />
                        <Route path="alumni" element={<PageAlumni />} />
                        <Route path="kelulusan" element={<PageKelulusan />} />
                        <Route
                            path="program-studi"
                            element={<PageProgramStudi />}
                        />
                        <Route
                            path="tahun-ajaran"
                            element={<PageTahunAjaran />}
                        />
                        <Route
                            path="pembayaran-siswa"
                            element={<PagePembayaranSiswa />}
                        />

                        <Route path="pos-bayar" element={<PagePosBayar />} />
                        <Route
                            path="jenis-bayar"
                            element={<PageJenisBayar />}
                        />
                        <Route path="akun-biaya" element={<PageAkunBiaya />} />
                        <Route
                            path="tarif-tagihan/:id"
                            element={<PageTarifTagihan />}
                        />
                        <Route
                            path="tarif-tagihan/:id/tambah"
                            element={<PageAddTarifTagihan />}
                        />
                        <Route
                            path="tarif-tagihan/:id/edit"
                            element={<PageEditTarifTagihan />}
                        />

                         <Route
                            path="laporan-pembayaran/kelas"
                            element={<PageLaporanPembayaranKelas />}
                        />

                        <Route path="laporan-pembayaran/tanggal" 
                        element ={<PageLaporanPembayaranTanggal />}/>

                        <Route path="laporan-pembayaran/tagihan-siswa"
                        element={<PageTagihanSiswa />}/>

                        <Route path="laporan-pembayaran/rekap-pembayarn"
                        element={<PageRekapPembayaran /> } />
                        <Route path="not-found" element={<PageNotFound />} />
                        <Route path="akun-biaya" element={<PageAkunBiaya />} />
                        <Route path="pos-bayar" element={<PagePosBayar />} />
                        <Route path="saldo-awal" element={<PageSaldoAwal />} />
                        <Route path="kas-keluar" element={<PageKasKeluar />} />
                        <Route path="kas-masuk" element={<PageKasMasuk /> } />
                        <Route path='kirim-tagihan' element= {<PageKirimTagihan />} />
                        <Route path="" element={<PageDashboard />} />
                    </Route>
                </Routes>
                </PersistGate>
            </LoadingProvider>

        </Provider>
        </Suspense>
    )
}

export default AppRoutes
