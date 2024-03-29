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
        <div className="containerApp">
            <aside className="sidebar">
                <Sidebar />
            </aside>
            <Header dispatch={dispatch} dataUser={dataUser.data} />
            <div className="content">
                {isLoading && <FixedLoader />}
                <Outlet />
            </div>
        </div>
    )
}

export default Homepage
