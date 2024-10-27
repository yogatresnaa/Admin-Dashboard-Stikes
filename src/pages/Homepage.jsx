import React, { useContext } from 'react'
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styleCss/style.css'
import Sidebar from '../component/Sidebar'
import NavBar from '../component/NavBar'
import { axiosInterceptorDispatch, checkMe, injectStore } from '../utils/http'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../component/Header'
import { LoadingContext } from '../context/LoadingContext'
import FixedLoader from '../component/Loader/FixedLoader'
import { checkAuthActionCreator } from '../redux/actions/authAction'

function Homepage() {
    const dispatch = useDispatch()
    const { isLoading } = useContext(LoadingContext)
    const dataUser = useSelector(({ authState }) => authState)
    const navigate = useNavigate()

    useEffect(() => {
        if (dataUser?.data.token === undefined && dataUser.isFulfilled) {
            return navigate('/login', { replace: true })
        }
    }, [dataUser, navigate])

    useEffect(() => {
        axiosInterceptorDispatch(dispatch)
        injectStore(dataUser.data)

        dispatch(checkAuthActionCreator(dataUser.data.token))
    }, [])
    return (
        <div className="containerApp ">
            <aside className="sidebar">
                <Sidebar />
            </aside>
            <div className="position-relative flex-1 w-100">
                <Header dispatch={dispatch} dataUser={dataUser.data} />
                <div
                    className="  w-100 position-absolute z-1 d-flex justify-content-center align-items-center flex-1"
                    style={{
                        height: '30px',
                        top: '60px',
                        background: '#D0312D',
                    }}
                >
                    <p className="text-white m-0" style={{ fontSize: '12px' }}>
                        Sisa Akun trial anda adalah{' '}
                        {dataUser.data?.accountInfo?.days} Hari Lagi
                    </p>
                </div>
                <div className="content">
                    {isLoading && <FixedLoader />}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Homepage
