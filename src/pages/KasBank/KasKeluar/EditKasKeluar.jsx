import React, { useEffect, useMemo, useRef, useState } from 'react'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import { getAllKelas, getAllUnitByUser } from '../../../utils/http'
import AddAction from '../../../component/ActionButton/AcctionAddButoon'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import { useSelector } from 'react-redux'
import BreadCrumb from '../../../component/BreadCrumb/BreadCrumb'
import FormEdit from '../components/FormEdit'

const breadCrumbItems = [
    {
        name: 'Kas Keluar',
        linkTo: '/admin/kas-keluar',
    },
    {
        name: 'Edit Kas',
        // linkTo:'/admin/kas-keluar'
    },
]
function EditKasKeluar() {
    const navigate = useNavigate()

    const {
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    // const { data: dataProdi, setData: setDataProdi, getData: getDataProdi } = useRequest();

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        class_id: '',
        status: '',
        majors_id: '',
    })

    useEffect(() => {
        // const query = queryString.stringify(queryFilter);
        getDataUnit(() => getAllUnitByUser(dataUser.token))
    }, [])

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="page-content d-flex flex-column gap-2">
            <div className="d-flex justify-content-between">
                <h3>
                    Edit Kas Keluar{' '}
                    <span style={{ fontSize: '0.8em', color: 'gray' }}>
                        List
                    </span>
                </h3>
                <BreadCrumb items={breadCrumbItems} />
            </div>
            <FormEdit dataUnit={dataUnit.data} />
        </div>
    )
}

export default EditKasKeluar
