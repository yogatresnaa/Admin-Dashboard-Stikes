import Axios from 'axios'
import { logoutUserAction } from '../redux/actions/actionsTypes'
import { logoutUserActionCreator } from '../redux/actions/authAction'

const URL_BASE = import.meta.env.VITE_BASE_API
const options = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
    timeout: 15000,
})

let dispatch
let userState
export const axiosInterceptorDispatch = (useDispatch) => {
    dispatch = useDispatch
}
export const injectStore = (state) => {
    userState = state
}

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
    Axios.get(`${URL_BASE}/program-studi`, { ...options(token), params: query })
export const getProdiById = (id, token) =>
    Axios.get(`${URL_BASE}/program-studi/${id}`, options(token))
export const postProdi = (body, token) =>
    Axios.post(`${URL_BASE}/program-studi`, body, options(token))
export const putProdi = (id, body, token) =>
    Axios.put(`${URL_BASE}/program-studi/${id}`, body, options(token))
export const deleteProdi = (id, body, token) =>
    Axios.delete(`${URL_BASE}/program-studi/${id}`, options(token))

export const getAllUnitByUser = (token) =>
    Axios.get(`${URL_BASE}/unit`, { ...options(token) })

export const getAllKelas = (query = {}, token) =>
    Axios.get(`${URL_BASE}/kelas`, { ...options(token), params: query })
export const getKelasById = (id, token) =>
    Axios.get(`${URL_BASE}/kelas/${id}`, options(token))
export const getKelasByProdi = (id, token) =>
    Axios.get(`${URL_BASE}/kelas/program-studi/${id}`, options(token))
export const postKelas = (body, token) =>
    Axios.post(`${URL_BASE}/kelas`, body, options(token))
export const putKelas = (id, body, token) =>
    Axios.put(`${URL_BASE}/kelas/${id}`, body, options(token))
export const deleteKelas = (id, token) =>
    Axios.delete(`${URL_BASE}/kelas/${id}`, options(token))

export const getAllTahunAjaran = (token) =>
    Axios.get(`${URL_BASE}/tahun-ajaran`, options(token))
export const getTahunAjaranById = (id, token) =>
    Axios.get(`${URL_BASE}/tahun-ajaran/${id}`, options(token))
export const postTahunAjaran = (body, token) =>
    Axios.post(`${URL_BASE}/tahun-ajaran`, body, options(token))
export const putTahunAjaran = (id, body, token) =>
    Axios.put(`${URL_BASE}/tahun-ajaran/${id}`, body, options(token))
export const deleteTahunAjaran = (id, token) =>
    Axios.delete(`${URL_BASE}/tahun-ajaran/${id}`, options(token))

export const getAllStatusSiswa = (token) =>
    Axios.get(`${URL_BASE}/status-siswa`, options(token))
export const getStatusSiswaById = (id, token) =>
    Axios.get(`${URL_BASE}/status-siswa/${id}`, options(token))
export const postStatusSiswa = (body, token) =>
    Axios.post(`${URL_BASE}/status-siswa`, body, options(token))
export const deleteStatusSiswa = (id, token) =>
    Axios.delete(`${URL_BASE}/status-siswa/${id}`, options(token))

export const getAllSiswa = (query, token) =>
    Axios.get(`${URL_BASE}/siswa?${query}`, options(token))
export const getAllSiswaByQuery = (query, token) =>
    Axios.get(`${URL_BASE}/siswa?${query}`, options(token))
export const getSiswaById = (id, token) =>
    Axios.get(`${URL_BASE}/siswa/${id}`, options(token))
export const postSiswa = (body, token) =>
    Axios.post(`${URL_BASE}/siswa`, body, options(token))
export const putSiswa = (id, body, token) =>
    Axios.put(`${URL_BASE}/siswa/${id}`, body, options(token))
export const putStatusSiswa = (id, body, token) =>
    Axios.put(`${URL_BASE}/siswa/status/${id}`, body, options(token))
export const deleteSiswa = (id, token) =>
    Axios.delete(`${URL_BASE}/siswa/${id}`, options(token))

export const getAllAlumni = (query, token) =>
    Axios.get(`${URL_BASE}/alumni?${query}`, options(token))
export const putAlumni = (id, body, token) =>
    Axios.put(`${URL_BASE}/alumni/${id}`, body, options(token))

//akun biaya
export const postAccountCost = (body, token) =>
    Axios.post(`${URL_BASE}/account-cost`, body, options(token))
export const putAccountCost = (id, body, token) =>
    Axios.put(`${URL_BASE}/account-cost/${id}`, body, options(token))
export const deleteAccountCost = (id, token) =>
    Axios.delete(`${URL_BASE}/account-cost/${id}`, options(token))
export const getCodeAccountCost = (body, token) =>
    Axios.post(`${URL_BASE}/account-cost/code`, body, options(token))
export const getAllAccountCost = (query, token) =>
    Axios.get(`${URL_BASE}/account-cost`, { ...options(token), params: query })
export const getAllAccountCostPay = (query, token) =>
    Axios.get(`${URL_BASE}/account-cost/pos-pay`, {
        ...options(token),
        params: query,
    })
export const getAllAktivaAccountCostPay = (query, token) =>
    Axios.get(`${URL_BASE}/account-cost/aktiva`, {
        ...options(token),
        params: query,
    })
export const getAllAccountBiayaMasuk = (query, token) =>
    Axios.get(`${URL_BASE}/account-cost/biaya-masuk`, {
        ...options(token),
        params: query,
    })
export const getAllAccountBiayaKeluar = (query, token) =>
    Axios.get(`${URL_BASE}/account-cost/biaya-keluar`, {
        ...options(token),
        params: query,
    })

//piutang
export const getAllPiutang = (query, token) =>
    Axios.get(`${URL_BASE}/piutang`, { ...options(token), params: query })

//pos bayar
export const postPosPay = (body, token) =>
    Axios.post(`${URL_BASE}/pos-pay`, body, options(token))
export const getAllPosPay = (query, token) =>
    Axios.get(`${URL_BASE}/pos-pay`, { ...options(token), params: query })
export const deletePosPay = (id, token) =>
    Axios.delete(`${URL_BASE}/pos-pay/${id}`, options(token))
export const putPosPay = (id, body, token) =>
    Axios.put(`${URL_BASE}/pos-pay/${id}`, body, options(token))

//jenis bayar
export const postPaymentType = (body, token) =>
    Axios.post(`${URL_BASE}/payment-type`, body, options(token))
export const getAllPaymentType = (query, token) =>
    Axios.get(`${URL_BASE}/payment-type`, { ...options(token), params: query })
export const deletePaymentType = (id, token) =>
    Axios.delete(`${URL_BASE}/payment-type/${id}`, options(token))
export const putPaymentType = (id, body, token) =>
    Axios.put(`${URL_BASE}/payment-type/${id}`, body, options(token))
//tarif bayar
// export const postPaymentType = (body, token) => Axios.post(`${URL_BASE}/payment-type`, body, options(token));
export const getAllPaymentRateByPayment = (queryFilter, id, token) =>
    Axios.get(`${URL_BASE}/payment-rate/${id}?${queryFilter}`, options(token))
export const getAllPaymentRateById = (id, token) =>
    Axios.get(`${URL_BASE}/payment-rate/detail/${id}`, options(token))

//detail tarif bayar
export const getDetailPaymentRate = (id, query, body, token) =>
    Axios.post(
        `${URL_BASE}/payment-rate/detail/${id}?${query}`,
        body,
        options(token)
    )
export const postMonthlyPaymentRateByClass = (body, token) =>
    Axios.post(`${URL_BASE}/payment-rate/month/class`, body, options(token))
export const postMonthlyPaymentRateByStudent = (body, token) =>
    Axios.post(`${URL_BASE}/payment-rate/month/student`, body, options(token))
export const postFreePaymentRateByClass = (body, token) =>
    Axios.post(`${URL_BASE}/payment-rate/free/class`, body, options(token))
export const postFreePaymentRateByStudent = (body, token) =>
    Axios.post(`${URL_BASE}/payment-rate/free/student`, body, options(token))

export const putMonthlyPaymentRateByStudent = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-rate/month/student/${id}`,
        body,
        options(token)
    )
export const putFreePaymentRateByStudent = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-rate/free/student/${id}`,
        body,
        options(token)
    )
export const putFreePaymentRateByClass = (id, body, token) =>
    Axios.put(`${URL_BASE}/payment-rate/free/class/${id}`, body, options(token))
export const putMonthlyPaymentRateByClass = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-rate/month/class/${id}`,
        body,
        options(token)
    )
export const deletePaymentRate = (id, token) =>
    Axios.delete(`${URL_BASE}/payment-rate/${id}`, options(token))

// export const getAllPaymentRateById = (id, token) => Axios.get(`${URL_BASE}/payment-rate/detail/${id}`, options(token));
// export const deletePaymentType = (id, token) => Axios.delete(`${URL_BASE}/payment-type/${id}`, options(token));
// export const putPaymentType = (id, body, token) => Axios.put(`${URL_BASE}/payment-type/${id}`, body, options(token));

// export const putAlumni = (id,body,token) => Axios.put(`${URL_BASE}/alumni/${id}`,body, options(token));

export const getPaymentTransactionByStudent = (id, query, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/student/${id}`, {
        ...options(token),
        params: query,
    })
export const getPaymentTransactionNotSubmittedByStudent = (id, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/payment-not-submitted/${id}`, {
        ...options(token),
    })

export const getReferenceCode = (query, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/referensi-code`, {
        ...options(token),
        params: query,
    })

export const getAllReferenceNumber = (body, token) =>
    Axios.post(`${URL_BASE}/payment-transaction/all-referensi-code`, body, {
        ...options(token),
    })

export const getHistoryPaymentTransactionByStudent = (id, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/student/history/${id}`, {
        ...options(token),
    })
export const getTagihanPaymentTransactionByStudent = (id, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/student/tagihan/${id}`, {
        ...options(token),
    })

export const getTagihanPaymentTransactionAllStudent = (query, token) =>
    Axios.get(`${URL_BASE}/payment-transaction/all-tagihan-student`, {
        ...options(token),
        params: query,
    })
export const putPaymentTransactionById = (id, body, token) =>
    Axios.put(`${URL_BASE}/payment-transaction/${id}`, body, options(token))
export const deletePaymentTransactionById = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-transaction/delete/${id}`,
        body,
        options(token)
    )

export const putDiscountFreePaymentTransactionById = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-transaction/discount/${id}`,
        body,
        options(token)
    )

export const putFreePaymentTransactionById = (id, body, token) =>
    Axios.put(`${URL_BASE}/payment-transaction/pay/${id}`, body, options(token))

export const postSubmitPayment = (body, token) =>
    Axios.post(
        `${URL_BASE}/payment-transaction/submit-pay`,
        body,
        options(token)
    )

export const getDetailFreePaymentRateByPaymentId = (id, token) =>
    Axios.get(
        `${URL_BASE}/detail-free-payment-rate/payment-transaction/${id}`,
        options(token)
    )
export const deleteDetailFreePaymentRateByPaymentId = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/detail-free-payment-rate/${id}`,
        body,
        options(token)
    )

//dokumen
export const getDokumenTagihanPembayaran = (id, token = null) =>
    Axios.get(`${URL_BASE}/dokumen/tagihan-pembayaran/${id}`, {
        ...options(token),
    })
export const getPublicDokumenTagihanPembayaran = (query, token = null) =>
    Axios.get(`${URL_BASE}/dokumen/public/tagihan-pembayaran`, {
        ...options(token),
        params: query,
    })
export const getPublicDokumenBuktiPembayaran = (query, token = null) =>
    Axios.get(`${URL_BASE}/dokumen/public/bukti-pembayaran`, {
        ...options(token),
        params: query,
    })
export const getDokumenRincianPembayaran = (id, query, token) =>
    Axios.get(`${URL_BASE}/dokumen/rincian-pembayaran/${id}`, {
        ...options(token),
        params: query,
    })
export const getDokumenKredit = (id, token) =>
    Axios.get(`${URL_BASE}/dokumen/kredit/${id}`, {
        ...options(token),
    })
export const getDokumenDebit = (id, token) =>
    Axios.get(`${URL_BASE}/dokumen/debit/${id}`, {
        ...options(token),
    })
export const getDokumenKwitansiPembayaran = (body, token) =>
    Axios.post(`${URL_BASE}/dokumen/kwitansi-pembayaran`, body, {
        ...options(token),
    })
export const getDokumenLaporanPerKelas = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/pembayaran-per-kelas`, {
        ...options(token),
        params: query,
    })
export const getDokumenLaporanPerTanggal = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/pembayaran-per-tanggal`, {
        ...options(token),
        params: query,
    })
export const getDokumenLaporanKasBank = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/laporan-kas-bank`, {
        ...options(token),
        params: query,
    })
export const getDokumenLaporanKasTunai = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/laporan-kas-tunai`, {
        ...options(token),
        params: query,
    })
export const getDokumenLaporanKJurnalUmum = (query, token) =>
    Axios.get(`${URL_BASE}/dokumen/report/laporan-jurnal-umum`, {
        ...options(token),
        params: query,
    })

//dashboard
export const getAllDataDashboard = (token) =>
    Axios.get(`${URL_BASE}/dashboard`, options(token))

//whatsapp
export const postSendWhatsapp = (body, token) =>
    Axios.post(`${URL_BASE}/whatsapp`, body, options(token))

//saldo

export const getAllDataSaldoAwal = (token, query) =>
    Axios.get(`${URL_BASE}/cash-account`, { ...options(token), params: query })

export const putSaldoAwal = (id, body, token) =>
    Axios.put(`${URL_BASE}/cash-account/${id}`, body, { ...options(token) })

//kredit

export const postKreditNotSubmitted = (body, token) =>
    Axios.post(`${URL_BASE}/kredit/not-submitted`, body, options(token))
export const postKreditSubmitted = (body, token) =>
    Axios.post(`${URL_BASE}/kredit/submitted`, body, options(token))
export const putKreditSubmitted = (id, body, token) =>
    Axios.put(`${URL_BASE}/kredit/submitted/${id}`, body, options(token))

export const getKreditNotSubmitted = (params, token) =>
    Axios.get(`${URL_BASE}/kredit/not-submitted`, {
        ...options(token),
        params: params,
    })

export const getAllKreditSubmitted = (params, token) =>
    Axios.get(`${URL_BASE}/kredit/submitted`, {
        ...options(token),
        params: params,
    })
export const generateCreditNoRef = (body, token) =>
    Axios.post(`${URL_BASE}/kredit/no-ref`, body, options(token))

export const deleteKredit = (id, token) =>
    Axios.delete(`${URL_BASE}/kredit/not-submitted/${id}`, options(token))

//debit

export const postDebitNotSubmitted = (body, token) =>
    Axios.post(`${URL_BASE}/debit/not-submitted`, body, options(token))
export const postDebitSubmitted = (body, token) =>
    Axios.post(`${URL_BASE}/debit/submitted`, body, options(token))
export const putDebitSubmitted = (id, body, token) =>
    Axios.put(`${URL_BASE}/debit/submitted/${id}`, body, options(token))

export const getDebitNotSubmitted = (params, token) =>
    Axios.get(`${URL_BASE}/debit/not-submitted`, {
        ...options(token),
        params: params,
    })

export const getAllDebitSubmitted = (params, token) =>
    Axios.get(`${URL_BASE}/debit/submitted`, {
        ...options(token),
        params: params,
    })
export const generateDebitNoRef = (body, token) =>
    Axios.post(`${URL_BASE}/debit/no-ref`, body, options(token))

export const deleteDebit = (id, token) =>
    Axios.delete(`${URL_BASE}/debit/not-submitted/${id}`, options(token))

//laporan
export const getLaporanPembayaranPerKelas = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/pembayaran-per-kelas`, {
        ...options(token),
        params: params,
    })
export const getLaporanPembayaranPerTanggal = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/pembayaran-per-tanggal`, {
        ...options(token),
        params: params,
    })
export const getLaporanTagihanSiswa = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/tagihan-siswa`, {
        ...options(token),
        params: params,
    })
export const getLaporanRekapPembayaran = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/rekap-pembayaran`, {
        ...options(token),
        params: params,
    })
export const getLaporanKasBank = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/kas-bank`, {
        ...options(token),
        params: params,
    })
export const getLaporanKasTunai = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/kas-tunai`, {
        ...options(token),
        params: params,
    })
export const getLaporanJurnalUmum = (params, token) =>
    Axios.get(`${URL_BASE}/laporan/jurnal-umum`, {
        ...options(token),
        params: params,
    })
