
import Axios from 'axios'


const URL_BASE='http://localhost:5000'
const options = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
    timeout: 15000,
  });



  let dispatch;
  export const axiosInterceptorDispatch=(useDispatch)=>{
    dispatch=useDispatch;

  }
 
 
  Axios.interceptors.response.use(response=>response,
    error=>{
      console.log(error)
      if(error.response.data.status==401){
        return Promise.reject(error);
      //    handle refresh token dan error
      }
      return Promise.reject(error);

  })
  // auth
  export const loginUser = (body) => Axios.post(`${URL_BASE}/auth/login`, body);
  export const logoutUser = (body) => Axios.post(`${URL_BASE}/auth/logout`, body);
  export const registerUser = (body) => Axios.post(`${URL_BASE}/auth/register`, body);

  
export const getAllProdi = (token) => Axios.get(`${URL_BASE}/program-studi`, options(token));
export const getProdiById = (id, token) => Axios.get(`${URL_BASE}/program-studi/${id}`, options(token));
export const postProdi = (body, token) => Axios.post(`${URL_BASE}/program-studi`, body, options(token));
export const putProdi = (id, body, token) => Axios.put(`${URL_BASE}/program-studi/${id}`, body, options(token));
export const deleteProdi = (id, body, token) => Axios.delete(`${URL_BASE}/program-studi/${id}`, options(token));
  
export const getAllKelas = (token) => Axios.get(`${URL_BASE}/kelas`, options(token));
export const getKelasById = (id, token) => Axios.get(`${URL_BASE}/kelas/${id}`, options(token));
export const getKelasByProdi = (id, token) => Axios.get(`${URL_BASE}/kelas/program-studi/${id}`, options(token));
export const postKelas = (body, token) => Axios.post(`${URL_BASE}/kelas`, body, options(token));
export const putKelas = (id, body, token) => Axios.put(`${URL_BASE}/kelas/${id}`, body, options(token));
export const deleteKelas = (id, token) => Axios.delete(`${URL_BASE}/kelas/${id}`, options(token));


export const getAllTahunAjaran = (token) => Axios.get(`${URL_BASE}/tahun-ajaran`, options(token));
export const getTahunAjaranById = (id, token) => Axios.get(`${URL_BASE}/tahun-ajaran/${id}`, options(token));
export const postTahunAjaran = (body, token) => Axios.post(`${URL_BASE}/tahun-ajaran`, body, options(token));
export const putTahunAjaran = (id, body, token) => Axios.put(`${URL_BASE}/tahun-ajaran/${id}`, body, options(token));
export const deleteTahunAjaran = (id, token) => Axios.delete(`${URL_BASE}/tahun-ajaran/${id}`, options(token));


export const getAllStatusSiswa = (token) => Axios.get(`${URL_BASE}/status-siswa`, options(token));
export const getStatusSiswaById = (id, token) => Axios.get(`${URL_BASE}/status-siswa/${id}`, options(token));
export const postStatusSiswa = (body, token) => Axios.post(`${URL_BASE}/status-siswa`, body, options(token));
export const putStatusSiswa = (id, body, token) => Axios.put(`${URL_BASE}/status-siswa/${id}`, body, options(token));
export const deleteStatusSiswa = (id, token) => Axios.delete(`${URL_BASE}/status-siswa/${id}`, options(token));

export const getAllSiswa = (query,token) => Axios.get(`${URL_BASE}/siswa?${query}`, options(token));
export const getAllSiswaByQuery = (query,token) => Axios.get(`${URL_BASE}/siswa${query}`, options(token));
export const getSiswaById = (id, token) => Axios.get(`${URL_BASE}/siswa/${id}`, options(token));
export const postSiswa = (body, token) => Axios.post(`${URL_BASE}/siswa`, body, options(token));
export const putSiswa = (id, body, token) => Axios.put(`${URL_BASE}/siswa/${id}`, body, options(token));
export const deleteSiswa = (id, token) => Axios.delete(`${URL_BASE}/siswa/${id}`, options(token));
