import Axios from 'axios'
import { logoutUserAction } from '../redux/actions/actionsTypes'
import { logoutUserActionCreator } from '../redux/actions/authAction'

const URL_BASE = 'http://localhost:5000'
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
        return Promise.reject(error)
    }
)
// auth
export const loginUser = (body) => Axios.post(`${URL_BASE}/auth/login`, body)
export const logoutUser = (body) => Axios.post(`${URL_BASE}/auth/logout`, body)
export const registerUser = (body) =>
    Axios.post(`${URL_BASE}/auth/register`, body)
export const checkMe = (token) =>
    Axios.get(`${URL_BASE}/auth/me`, options(token))

export const getAllProdi = (token) =>
    Axios.get(`${URL_BASE}/program-studi`, options(token))
export const getProdiById = (id, token) =>
    Axios.get(`${URL_BASE}/program-studi/${id}`, options(token))
export const postProdi = (body, token) =>
    Axios.post(`${URL_BASE}/program-studi`, body, options(token))
export const putProdi = (id, body, token) =>
    Axios.put(`${URL_BASE}/program-studi/${id}`, body, options(token))
export const deleteProdi = (id, body, token) =>
    Axios.delete(`${URL_BASE}/program-studi/${id}`, options(token))

export const getAllKelas = (token) =>
    Axios.get(`${URL_BASE}/kelas`, options(token))
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
export const getAllAccountCost = (token) =>
    Axios.get(`${URL_BASE}/account-cost`, options(token))
export const getAllAccountCostPay = (token) =>
    Axios.get(`${URL_BASE}/account-cost/pos-pay`, options(token))

//piutang
export const getAllPiutang = (token) =>
    Axios.get(`${URL_BASE}/piutang`, options(token))

//pos bayar
export const postPosPay = (body, token) =>
    Axios.post(`${URL_BASE}/pos-pay`, body, options(token))
export const getAllPosPay = (token) =>
    Axios.get(`${URL_BASE}/pos-pay`, options(token))
export const deletePosPay = (id, token) =>
    Axios.delete(`${URL_BASE}/pos-pay/${id}`, options(token))
export const putPosPay = (id, body, token) =>
    Axios.put(`${URL_BASE}/pos-pay/${id}`, body, options(token))

//jenis bayar
export const postPaymentType = (body, token) =>
    Axios.post(`${URL_BASE}/payment-type`, body, options(token))
export const getAllPaymentType = (token) =>
    Axios.get(`${URL_BASE}/payment-type`, options(token))
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
export const putPaymentTransactionById = (id, body, token) =>
    Axios.put(`${URL_BASE}/payment-transaction/${id}`, body, options(token))
export const deletePaymentTransactionById = (id, body, token) =>
    Axios.put(
        `${URL_BASE}/payment-transaction/delete/${id}`,
        body,
        options(token)
    )
