import Axios from 'axios'
import { logoutUserAction } from '../redux/actions/actionsTypes'
import { logoutUserActionCreator } from '../redux/actions/authAction'
const URL_BASE = import.meta.env.VITE_BASE_API
const options = () => ({
    // headers: { Authorization: `Bearer ${token}` },
    timeout: 15000,
})

import { store } from '../redux/store'
let dispatch
let userState
export const axiosInterceptorDispatch = (useDispatch) => {
    dispatch = useDispatch
}
export const injectStore = (state) => {
    userState = state
}
Axios.interceptors.request.use((config)=>{
    const token=store.getState().authState.data?.token;
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
return config
},error=>{
    return Promise.reject(error);
})
Axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error)
        if (error.response.data.status == 401) {
            if (error.response.data.message == 'JsonWebTokenError') {
                return dispatch(logoutUserActionCreator(userState.token))
            }
            return Promise.reject(error)
            //    handle refresh token dan error
        }
        console.log('inii')
        console.log(error)
        return Promise.reject(error)
    }
)
// auth
export const loginUser = (body) => Axios.post(`${URL_BASE}/auth/login`, body)
export const logoutUser = (body) => Axios.post(`${URL_BASE}/auth/logout`, body)
export const registerUser = (body) =>
    Axios.post(`${URL_BASE}/auth/register`, body)
export const checkMe = (value) =>
    Axios.post(`${URL_BASE}/auth/me`, value, options(value?.token))

export const getAllProdi = (query = {}, token) =>
    Axios.get(`${URL_BASE}/program-studi`, { ...options(), params: query })
export const getProdiById = (id, token) =>
    Axios.get(`${URL_BASE}/program-studi/${id}`, options())
export const postProdi = (body, token) =>
    Axios.post(`${URL_BASE}/program-studi`, body, options())
export const putProdi = (id, body, token) =>
    Axios.put(`${URL_BASE}/program-studi/${id}`, body, options())
export const deleteProdi = (id, body, token) =>
    Axios.delete(`${URL_BASE}/program-studi/${id}`, options())


//unit
export const getAllUnitByUser = (token) =>
    Axios.get(`${URL_BASE}/unit`, { ...options() })
export const updateUnit = (body,unitId,token) =>
    Axios.put(`${URL_BASE}/unit/${unitId}`,body, { ...options() })

export const getAllKelas = (query = {}, token) =>
    Axios.get(`${URL_BASE}/kelas`, { ...options(), params: query })
export const getKelasById = (id, token) =>
    Axios.get(`${URL_BASE}/kelas/${id}`, options())
export const getKelasByProdi = (id, token) =>
    Axios.get(`${URL_BASE}/kelas/program-studi/${id}`, options())
export const postKelas = (body, token) =>
    Axios.post(`${URL_BASE}/kelas`, body, options())
export const putKelas = (id, body, token) =>
    Axios.put(`${URL_BASE}/kelas/${id}`, body, options())
export const deleteKelas = (id, token) =>
    Axios.delete(`${URL_BASE}/kelas/${id}`, options())

export const getAllTahunAjaran = (token) =>
    Axios.get(`${URL_BASE}/tahun-ajaran`, options())
export const getTahunAjaranById = (id, token) =>
    Axios.get(`${URL_BASE}/tahun-ajaran/${id}`, options())
export const postTahunAjaran = (body, token) =>
    Axios.post(`${URL_BASE}/tahun-ajaran`, body, options())
export const putTahunAjaran = (id, body, token) =>
    Axios.put(`${URL_BASE}/tahun-ajaran/${id}`, body, options())
export const deleteTahunAjaran = (id, token) =>
    Axios.delete(`${URL_BASE}/tahun-ajaran/${id}`, options())

export const getAllStatusSiswa = (token) =>
    Axios.get(`${URL_BASE}/status-siswa`, options())
export const getStatusSiswaById = (id, token) =>
    Axios.get(`${URL_BASE}/status-siswa/${id}`, options())
export const postStatusSiswa = (body, token) =>
    Axios.post(`${URL_BASE}/status-siswa`, body, options())
export const deleteStatusSiswa = (id, token) =>
    Axios.delete(`${URL_BASE}/status-siswa/${id}`, options())

export const getAllSiswa = (query, token) =>
    Axios.get(`${URL_BASE}/siswa?${query}`, options())
export const getAllSiswaByQuery = (query, token) =>
    Axios.get(`${URL_BASE}/siswa?${query}`, options())
export const getSiswaById = (id, token) =>
    Axios.get(`${URL_BASE}/siswa/${id}`, options())
export const postSiswa = (body, token) =>
    Axios.post(`${URL_BASE}/siswa`, body, options())
export const putSiswa = (id, body, token) =>
    Axios.put(`${URL_BASE}/siswa/${id}`, body, options())
export const putStatusSiswa = (id, body, token) =>
    Axios.put(`${URL_BASE}/siswa/status/${id}`, body, options())
export const putSiswaKenaikanKelas = (body, token) =>
    Axios.put(`${URL_BASE}/siswa/kenaikan-kelas/bulk`, body, options())
export const deleteSiswa = (id, token) =>
    Axios.delete(`${URL_BASE}/siswa/${id}`, options())

export const getAllAlumni = (query, token) =>
    Axios.get(`${URL_BASE}/alumni?${query}`, options())
export const putAlumni = (id, body, token) =>
    Axios.put(`${URL_BASE}/alumni/${id}`, body, options())

//akun biaya
export const postAccountCost = (body, token) =>
    Axios.post(`${URL_BASE}/account-cost`, body, options())
export const putAccountCost = (id, body, token) =>
    Axios.put(`${URL_BASE}/account-cost/${id}`, body, options())
export const deleteAccountCost = (id, token) =>
    Axios.delete(`${URL_BASE}/account-cost/${id}`, options())
export const getCodeAccountCost = (body, token) =>
    Axios.post(`${URL_BASE}/account-cost/code`, body, options())
export const getAllAccountCost = (query, token) =>
    Axios.get(`${URL_BASE}/account-cost`, { ...options(), params: query })
export const getAllAccountCostPay = (query, token) =>
    Axios.get(`${URL_BASE}/account-cost/pos-pay`, {
        ...options(),
        params: query,
    })
export const getAllAktivaAccountCostPay = (query, token) =>
    Axios.get(`${URL_BASE}/account-cost/aktiva`, {
        ...options(),
        params: query,
    })
export const getAllAccountBiayaMasuk = (query, token) =>
    Axios.get(`${URL_BASE}/account-cost/biaya-masuk`, {
        ...options(),
        params: query,
    })
export const getAllAccountBiayaKeluar = (query, token) =>
    Axios.get(`${URL_BASE}/account-cost/biaya-keluar`, {
        ...options(),
        params: query,
    })

//piutang
export const getAllPiutang = (query, token) =>
    Axios.get(`${URL_BASE}/piutang`, { ...options(), params: query })

//pos bayar
export const postPosPay = (body, token) =>
    Axios.post(`${URL_BASE}/pos-pay`, body, options())
export const getAllPosPay = (query, token) =>
    Axios.get(`${URL_BASE}/pos-pay`, { ...options(), params: query })
export const deletePosPay = (id, token) =>
    Axios.delete(`${URL_BASE}/pos-pay/${id}`, options())
export const putPosPay = (id, body, token) =>
    Axios.put(`${URL_BASE}/pos-pay/${id}`, body, options())

//jenis bayar
export const postPaymentType = (body, token) =>
    Axios.post(`${URL_BASE}/payment-type`, body, options())
export const getAllPaymentType = (query, token) =>
    Axios.get(`${URL_BASE}/payment-type`, { ...options(), params: query })
export const deletePaymentType = (id, token) =>
    Axios.delete(`${URL_BASE}/payment-type/${id}`, options())
export const putPaymentType = (id, body, token) =>
    Axios.put(`${URL_BASE}/payment-type/${id}`, body, options())
//tarif bayar
// export const postPaymentType = (body, token) => Axios.post(`${URL_BASE}/payment-type`, body, options());
export const getAllPaymentRateByPayment = (queryFilter, id, token) =>
    Axios.get(`${URL_BASE}/payment-rate/${id}?${queryFilter}`, options())
export const getAllPaymentRateById = (id, token) =>
    Axios.get(`${URL_BASE}/payment-rate/detail/${id}`, options())

//detail tarif bayar
export const getDetailPaymentRate = (id, query, body, token) =>
    Axios.post(
        `${URL_BASE}/payment-rate/detail/${id}?${query}`,
        body,
        options()
    )
export const postMonthlyPaymentRateByClass = (body, token) =>
    Axios.post(`${URL_BASE}/payment-rate/month/class`, body, options())
export const postMonthlyPaymentRateByStudent = (body, token) =>
    Axios.post(`${URL_BASE}/payment-rate/month/student`, body, options())
export const postFreePaymentRateByClass = (body, token) =>
    Axios.post(`${URL_BASE}/payment-rate/free/class`, body, options())
export const postFreePaymentRateByStudent = (body, token) =>
    Axios.post(`${URL_BASE}/payment-rate/free/student`, body, options())

export const putMonthlyPaymentRateByStudent = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-rate/month/student/${id}`,
        body,
        options()
    )
export const putFreePaymentRateByStudent = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-rate/free/student/${id}`,
        body,
        options()
    )
export const putFreePaymentRateByClass = (id, body, token) =>
    Axios.put(`${URL_BASE}/payment-rate/free/class/${id}`, body, options())
export const putMonthlyPaymentRateByClass = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-rate/month/class/${id}`,
        body,
        options()
    )
export const deletePaymentRate = (id, token) =>
    Axios.delete(`${URL_BASE}/payment-rate/${id}`, options())

// export const getAllPaymentRateById = (id, token) => Axios.get(`${URL_BASE}/payment-rate/detail/${id}`, options());
// export const deletePaymentType = (id, token) => Axios.delete(`${URL_BASE}/payment-type/${id}`, options());
// export const putPaymentType = (id, body, token) => Axios.put(`${URL_BASE}/payment-type/${id}`, body, options());

// export const putAlumni = (id,body,token) => Axios.put(`${URL_BASE}/alumni/${id}`,body, options());

export const getPaymentTransactionByStudent = (id, query, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/student/${id}`, {
        ...options(),
        params: query,
    })
export const getPaymentTransactionNotSubmittedByStudent = (id, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/payment-not-submitted/${id}`, {
        ...options(),
    })

export const getReferenceCode = (query, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/referensi-code`, {
        ...options(),
        params: query,
    })

export const getAllReferenceNumber = (body, token) =>
    Axios.post(`${URL_BASE}/payment-transaction/all-referensi-code`, body, {
        ...options(),
    })

export const getHistoryPaymentTransactionByStudent = (id, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/student/history/${id}`, {
        ...options(),
    })
export const getTagihanPaymentTransactionByStudent = (id, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/student/tagihan/${id}`, {
        ...options(),
    })

export const getTagihanPaymentTransactionAllStudent = (query, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/all-tagihan-student`, {
        ...options(),
        params: query,
    })
export const putPaymentTransactionById = (id, body, token) =>
    Axios.put(`${URL_BASE}/payment-transaction/${id}`, body, options())
export const deletePaymentTransactionById = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-transaction/delete/${id}`,
        body,
        options()
    )

export const putDiscountFreePaymentTransactionById = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-transaction/discount/${id}`,
        body,
        options()
    )

export const putFreePaymentTransactionById = (id, body, token) =>
    Axios.put(`${URL_BASE}/payment-transaction/pay/${id}`, body, options())

export const postSubmitPayment = (body, token) =>
    Axios.post(
        `${URL_BASE}/payment-transaction/submit-pay`,
        body,
        options()
    )

export const getDetailFreePaymentRateByPaymentId = (id, token) =>
    Axios.get(
        `${URL_BASE}/detail-free-payment-rate/payment-transaction/${id}`,
        options()
    )
export const deleteDetailFreePaymentRateByPaymentId = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/detail-free-payment-rate/${id}`,
        body,
        options()
    )

//dokumen
export const getDokumenTagihanPembayaran = (id,query, token = null) =>
    Axios.get(`${URL_BASE}/dokumen/tagihan-pembayaran/${id}`, {
        params:query,
        ...options(),
    })
export const getPublicDokumenTagihanPembayaran = (query, token = null) =>
    Axios.get(`${URL_BASE}/dokumen/public/tagihan-pembayaran`, {
        ...options(),
        params: query,
    })
export const getPublicDokumenBuktiPembayaran = (query, token = null) =>
    Axios.get(`${URL_BASE}/dokumen/public/bukti-pembayaran`, {
        ...options(),
        params: query,
    })
export const getDokumenRincianPembayaran = (id, query, token) =>
    Axios.get(`${URL_BASE}/dokumen/rincian-pembayaran/${id}`, {
        ...options(),
        params: query,
    })
export const getDokumenKredit = (id,query, token) =>
    Axios.get(`${URL_BASE}/dokumen/kredit/${id}`, {
        params:query,
        ...options(),
    })
export const getDokumenDebit = (id,query, token) =>
    Axios.get(`${URL_BASE}/dokumen/debit/${id}`, {
        params:query,
        ...options(),
    })
export const getDokumenKwitansiPembayaran = (body, token) =>
    Axios.post(`${URL_BASE}/dokumen/kwitansi-pembayaran`, body, {
        ...options(),
    })
export const getDokumenLaporanPerKelas = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/pembayaran-per-kelas`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanExcelPerKelas = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/excel/pembayaran-per-kelas`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanPerTanggal = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/pembayaran-per-tanggal`, {
        ...options(),
        params: query,
    })
    export const getDokumenLaporanExcelPerTanggal = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/excel/pembayaran-per-tanggal`, {
        ...options(),
        params: query,
    })
    export const getDokumenLaporanExcelRekapPembayaran = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/excel/rekap-pembayaran`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanKasBank = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/laporan-kas-bank`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanExcelKasBank = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/excel/laporan-kas-bank`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanKasBankPerAnggaran = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/laporan-kas-bank/anggaran`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanKasTunai = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/laporan-kas-tunai`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanExcelKasTunai = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/excel/laporan-kas-tunai`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanKasTunaiPerAnggaran = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/laporan-kas-tunai/anggaran`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanKJurnalUmum = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/laporan-jurnal-umum`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanExcelJurnalUmum = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/excel/laporan-jurnal-umum`, {
        ...options(),
        params: query,
    })
export const getDokumenLaporanJurnalUmumPerAnggaran = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/laporan-jurnal-umum/anggaran`, {
        ...options(),
        params: query,
    })

//dashboard
export const getAllDataDashboard = (query,token) =>
    Axios.get(`${URL_BASE}/dashboard`, {...options(),params: query})

//whatsapp
export const postSendWhatsapp = (body, token) =>
    Axios.post(`${URL_BASE}/whatsapp`, body, options())

//saldo

export const getAllDataSaldoAwal = (token, query) =>
    Axios.get(`${URL_BASE}/cash-account`, { ...options(), params: query })

export const putSaldoAwal = (id, body, token) =>
    Axios.put(`${URL_BASE}/cash-account/${id}`, body, { ...options() })

//kredit

export const postKreditNotSubmitted = (body, token) =>
    Axios.post(`${URL_BASE}/kredit/not-submitted`, body, options())
export const postKreditSubmitted = (body, token) =>
    Axios.post(`${URL_BASE}/kredit/submitted`, body, options())
export const putKreditSubmitted = (id, body, token) =>
    Axios.put(`${URL_BASE}/kredit/submitted/${id}`, body, options())

export const getKreditNotSubmitted = (params, token) =>
    Axios.get(`${URL_BASE}/kredit/not-submitted`, {
        ...options(),
        params: params,
    })

export const getAllKreditSubmitted = (params, token) =>
    Axios.get(`${URL_BASE}/kredit/submitted`, {
        ...options(),
        params: params,
    })
export const generateCreditNoRef = (body, token) =>
    Axios.post(`${URL_BASE}/kredit/no-ref`, body, options())

export const deleteKredit = (id, token) =>
    Axios.delete(`${URL_BASE}/kredit/not-submitted/${id}`, options())

//debit

export const postDebitNotSubmitted = (body, token) =>
    Axios.post(`${URL_BASE}/debit/not-submitted`, body, options())
export const postDebitSubmitted = (body, token) =>
    Axios.post(`${URL_BASE}/debit/submitted`, body, options())
export const putDebitSubmitted = (id, body, token) =>
    Axios.put(`${URL_BASE}/debit/submitted/${id}`, body, options())

export const getDebitNotSubmitted = (params, token) =>
    Axios.get(`${URL_BASE}/debit/not-submitted`, {
        ...options(),
        params: params,
    })

export const getAllDebitSubmitted = (params, token) =>
    Axios.get(`${URL_BASE}/debit/submitted`, {
        ...options(),
        params: params,
    })
export const generateDebitNoRef = (body, token) =>
    Axios.post(`${URL_BASE}/debit/no-ref`, body, options())

export const deleteDebit = (id, token) =>
    Axios.delete(`${URL_BASE}/debit/not-submitted/${id}`, options())

//laporan
export const getLaporanPembayaranPerKelas = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/pembayaran-per-kelas`, {
        ...options(),
        params: params,
    })
export const getLaporanPembayaranPerTanggal = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/pembayaran-per-tanggal`, {
        ...options(),
        params: params,
    })
export const getLaporanTagihanSiswa = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/tagihan-siswa`, {
        ...options(),
        params: params,
    })
export const getLaporanRekapPembayaran = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/rekap-pembayaran`, {
        ...options(),
        params: params,
    })
export const getLaporanKasBank = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/kas-bank`, {
        ...options(),
        params: params,
    })
export const getLaporanKasTunai = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/kas-tunai`, {
        ...options(),
        params: params,
    })
export const getLaporanJurnalUmum = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/jurnal-umum`, {
        ...options(),
        params: params,
    })
export const getDBBackup = (token) =>
    Axios.get(`${URL_BASE}/db-backup`, {
        ...options(),
    })
export const postBulkSiswa = (body, token) =>
    Axios.post(`${URL_BASE}/bulk/siswa`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
        },
        timeout: 15000,
    })
