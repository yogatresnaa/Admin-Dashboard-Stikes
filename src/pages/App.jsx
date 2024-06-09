/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, Suspense, useEffect, useReducer } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { Provider, useDispatch, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../redux/store'
import 'react-toastify/dist/ReactToastify.css'

const CekTagihanSiswa = lazy(
    () => import('./CekDataTagihanSiswa/PageDataPaySiswa')
)

const Homepage = lazy(() => import('./Homepage'))

// Manajemen data
const PageKelas = lazy(() => import('./ManajemenData/Kelas/PageKelas'))
const PageSiswa = lazy(() => import('./ManajemenData/Siswa/PageSiswa'))
const PageProgramStudi = lazy(
    () => import('./ManajemenData/ProgramStudi/PageProgramStudi')
)
const PageManajemen = lazy(() => import('./ManajemenData/PageManajemenData'))

// Akademik
const PageAlumni = lazy(() => import('./Akademik/Alumni/PageAlumni'))
const PageKelulusan = lazy(() => import('./Akademik/Kelulusan/PageKelulusan'))
const PageTahunAjaran = lazy(
    () => import('./Akademik/TahunAjaran/PageTahunAjaran')
)

const PageAkademik = lazy(() => import('./Akademik/PageAkademik'))

// Keuangan
const PageNotFound = lazy(() => import('./NotFound/PageNoFound'))
const PagePosBayar = lazy(() => import('./Keuangan/PosBayar/PagePosBayar'))
const PageAkunBiaya = lazy(() => import('./Keuangan/AkunBiaya/PageAkunBiaya'))
const PagePembayaranSiswa = lazy(
    () => import('./Keuangan/PembayaranSiswa/PagePembayaranSiswa')
)

// Kas Bank
const PageSaldoAwal = lazy(() => import('./KasBank/SaldoAwal/PageSaldoAwal'))
const PageKasKeluar = lazy(() => import('./KasBank/KasKeluar/PageKasKeluar'))
const PageKasMasuk = lazy(() => import('./KasBank/KasMasuk/PageKasMasuk'))
const PageKirimTagihan = lazy(
    () => import('./KasBank/KirimTagihan/PageKirimTagihan')
)

// Dokumen
const DokumenTagihan = lazy(() => import('./Dokumen/TagihanPembayaran'))
const DokumenPembayaran = lazy(() => import('./Dokumen/BuktiPembayaran'))

// Laporan
const PageLaporanPembayaranTanggal = lazy(
    () => import('./Laporan/Pembayaran/PerTanggal/PageLaporanPerTanggal')
)
const PageLaporanPembayaranKelas = lazy(
    () => import('./Laporan/Pembayaran/PerKelas/PageLaporanPembayaranKelas')
)
const PageTagihanSiswa = lazy(
    () => import('./Laporan/Pembayaran/TagihanSiswa/PageTagihanSiswa')
)
const PageRekapPembayaran = lazy(
    () => import('./Laporan/Pembayaran/RekapPembayaran/PageRekapPembayaran')
)

//
const LoginPage = lazy(() => import('./Login/Login'))
const MainPage = lazy(() => import('./MainPage'))

const PageDashboard = lazy(() => import('./Dashboard/PageDashboard'))
const PageJenisBayar = lazy(
    () => import('./Keuangan/JenisBayar/PageJenisBayar')
)
const PageTarifTagihan = lazy(
    () => import('./Keuangan/JenisBayar/TarifTagihan/PageTarifTagihan')
)
const PageAddTarifTagihan = lazy(
    () =>
        import(
            './Keuangan/JenisBayar/TarifTagihan/ManageTarifTagihan/TambahTarifTagihan/PageAddTarifTagihan'
        )
)
const PageEditTarifTagihan = lazy(
    () =>
        import(
            './Keuangan/JenisBayar/TarifTagihan/ManageTarifTagihan/EditTarifTagihan/PageEditTarifTagihan'
        )
)
const PageTambahKasKeluar = lazy(
    () => import('./KasBank/KasKeluar/TambahKasKeluar')
)
const PageEditKasKeluar = lazy(
    () => import('./KasBank/KasKeluar/EditKasKeluar')
)
const PageTambahKasMasuk = lazy(
    () => import('./KasBank/KasMasuk/TambahKasMasuk')
)
const PageEditKasMasuk = lazy(() => import('./KasBank/KasMasuk/EditKasMasuk'))

// Laporan

import JurnalUmum from './Laporan/LaporanKeuangan/LaporanJurnalUmum/PageJurnalUmum'
import PageKasBank from './Laporan/LaporanKeuangan/LaporanKasBank/PageKasBank'
import PageKasTunai from './Laporan/LaporanKeuangan/LaporanKasTunai/PageKasTunai'

// Laporan

// import PageDashboard from './Dashboard/PageDashboard';

import PreLoader from '../component/Loader/PreLoader'
import LoadingProvider from '../context/LoadingContext'
import TagihanPembayaran from './Dokumen/TagihanPembayaran'
import { checkAuthActionCreator } from '../redux/actions/authAction'
import EditKasMasuk from './KasBank/KasMasuk/EditKasMasuk'

const RouteWithAuth = ({ element: Component, ...rest }) => {
    const dataUser = useSelector(({ authState }) => authState)
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkAuthActionCreator(dataUser.data.token))
    }, [location.pathname])
    return <Component {...rest} />
}
function AppRoutes() {
    return (
        <Suspense fallback={<PreLoader />}>
            <LoadingProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route
                            path="/cek-data-pembayaran-siswa"
                            element={<CekTagihanSiswa />}
                        />
                        <Route
                            path="/tagihan"
                            element={<TagihanPembayaran />}
                        />
                        <Route path="/tagihan" element={<DokumenTagihan />} />
                        <Route
                            path="/pembayaran"
                            element={<DokumenPembayaran />}
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<Homepage />}>
                            {/* path dashboard */}
                            <Route
                                path="dashboard"
                                element={<RouteWithAuth element={PageKelas} />}
                            />

                            {/* path manajemen data */}
                            <Route
                                path="kelas"
                                element={<RouteWithAuth element={PageKelas} />}
                            />

                            <Route
                                path="program-studi"
                                element={
                                    <RouteWithAuth element={PageProgramStudi} />
                                }
                            />
                            <Route
                                path="siswa"
                                element={<RouteWithAuth element={PageSiswa} />}
                            />

                            <Route
                                path="page-manajemen-data"
                                element={<PageManajemen />}
                            />

                            {/* Path Akademik */}
                            <Route
                                path="page-akademik"
                                element={
                                    <RouteWithAuth element={PageAkademik} />
                                }
                            />
                            <Route
                                path="alumni"
                                element={<RouteWithAuth element={PageAlumni} />}
                            />
                            <Route
                                path="kelulusan"
                                element={
                                    <RouteWithAuth element={PageKelulusan} />
                                }
                            />

                            <Route
                                path="tahun-ajaran"
                                element={
                                    <RouteWithAuth element={PageTahunAjaran} />
                                }
                            />
                            <Route
                                path="pembayaran-siswa"
                                element={
                                    <RouteWithAuth
                                        element={PagePembayaranSiswa}
                                    />
                                }
                            />

                            <Route
                                path="pos-bayar"
                                element={
                                    <RouteWithAuth element={PagePosBayar} />
                                }
                            />
                            <Route
                                path="jenis-bayar"
                                element={
                                    <RouteWithAuth element={PageJenisBayar} />
                                }
                            />
                            <Route
                                path="akun-biaya"
                                element={
                                    <RouteWithAuth element={PageAkunBiaya} />
                                }
                            />
                            <Route
                                path="tarif-tagihan/:id"
                                element={
                                    <PageTarifTagihan element={PageKelas} />
                                }
                            />
                            <Route
                                path="tarif-tagihan/:id/tambah"
                                element={
                                    <RouteWithAuth
                                        element={PageAddTarifTagihan}
                                    />
                                }
                            />
                            <Route
                                path="tarif-tagihan/:id/edit"
                                element={
                                    <RouteWithAuth
                                        element={PageEditTarifTagihan}
                                    />
                                }
                            />

                            <Route
                                path="laporan-pembayaran/kelas"
                                element={PageLaporanPembayaranKelas}
                            />

                            <Route
                                path="laporan-pembayaran/tanggal"
                                element={
                                    <RouteWithAuth
                                        element={PageLaporanPembayaranTanggal}
                                    />
                                }
                            />

                            <Route
                                path="laporan-pembayaran/tagihan-siswa"
                                element={
                                    <RouteWithAuth element={PageTagihanSiswa} />
                                }
                            />

                            <Route
                                path="laporan-pembayaran/rekap-pembayarn"
                                element={
                                    <RouteWithAuth
                                        element={PageRekapPembayaran}
                                    />
                                }
                            />
                            <Route
                                path="not-found"
                                element={<PageNotFound />}
                            />
                            <Route
                                path="akun-biaya"
                                element={
                                    <RouteWithAuth element={PageAkunBiaya} />
                                }
                            />
                            <Route
                                path="pos-bayar"
                                element={
                                    <RouteWithAuth element={PagePosBayar} />
                                }
                            />
                            <Route
                                path="saldo-awal"
                                element={
                                    <RouteWithAuth element={PageSaldoAwal} />
                                }
                            />
                            <Route
                                path="kas-keluar"
                                element={
                                    <RouteWithAuth element={PageKasKeluar} />
                                }
                            />
                            <Route
                                path="kas-keluar/tambah"
                                element={
                                    <RouteWithAuth
                                        element={PageTambahKasKeluar}
                                    />
                                }
                            />
                            <Route
                                path="kas-keluar/edit/:id"
                                element={
                                    <RouteWithAuth
                                        element={PageEditKasKeluar}
                                    />
                                }
                            />
                            <Route
                                path="kas-masuk"
                                element={
                                    <RouteWithAuth element={PageKasMasuk} />
                                }
                            />
                            <Route
                                path="kas-masuk/tambah"
                                element={
                                    <RouteWithAuth
                                        element={PageTambahKasMasuk}
                                    />
                                }
                            />
                            <Route
                                path="kas-masuk/edit/:id"
                                element={
                                    <RouteWithAuth element={EditKasMasuk} />
                                }
                            />
                            <Route
                                path="kirim-tagihan"
                                element={
                                    <RouteWithAuth element={PageKirimTagihan} />
                                }
                            />

                            <Route
                                path=""
                                element={
                                    <RouteWithAuth element={PageDashboard} />
                                }
                            />
                        </Route>
                    </Routes>
                </PersistGate>
            </LoadingProvider>
        </Suspense>
    )
}

export default AppRoutes
