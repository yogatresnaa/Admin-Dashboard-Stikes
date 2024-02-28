import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableKasKeluar from './components/TableKasKeluar'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import { getAllKelas } from '../../../utils/http'
import AddAction from '../../../component/ActionButton/AcctionAddButoon'
import queryString from 'query-string'

import { useSelector } from 'react-redux'

function PageKasKeluar() {
    // const {
    //   data: dataSiswa,
    //   setData: setDataSiswa,
    //   sendData: sendDataSiswa,
    //   setDataDetail: setDataDetailSiswa,
    //   dataDetail: dataDetailSiswa,
    //   getData: getDataSiswa,
    //   isLoading: isLoadingSiswa,
    //   setIsLoading: setIsLoadingSiswa,
    //   isLoadingSendData: isLoadingSendDataSiswa,
    //   filterText,
    //   onChangeFilterText,
    // } = useRequest();

    const {
        data: dataKelas,
        setData: setDataKelas,
        getData: getDataKelas,
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
        getDataKelas(() => getAllKelas(dataUser.token))
    }, [])

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="page-content">
            <h3>
                Kas Keluar{' '}
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>
            <div className="table-content">
                <AddAction />
                <div style={{ width: '200px', margin: '10px' }}>
                    <SelectUnitKelas
                        data={dataKelas.data}
                        onProdiFilterChange={onQueryFilterChange}
                        value={queryFilter.class_id}
                    />
                </div>
                <TableKasKeluar />
            </div>
        </div>
    )
}

export default PageKasKeluar
