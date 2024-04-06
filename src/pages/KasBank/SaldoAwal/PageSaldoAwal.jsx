import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableSaldoAwal from './component/TableSaldoAwal'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import {
    getAllDataSaldoAwal,
    getAllKelas,
    getAllUnitByUser,
} from '../../../utils/http'
import queryString from 'query-string'

import { useSelector } from 'react-redux'
import SelectUnit from '../../../component/ActionButton/SelectUnit'

function PageSaldoAwal() {
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
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    const {
        data: dataSaldo,
        setData: setDataSaldo,
        getData: getDataSaldo,
    } = useRequest()
    // const { data: dataProdi, setData: setDataProdi, getData: getDataProdi } = useRequest();

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        unit_id: '',
    })

    useEffect(() => {
        // const query = queryString.stringify(queryFilter);
        getDataUnit(() => getAllUnitByUser(dataUser.token))
    }, [])

    useEffect(() => {
        getDataSaldo(() =>
            getAllDataSaldoAwal(dataUser.token, {
                unit_unit_id: queryFilter.unit_id,
            })
        )
    }, [queryFilter.unit_id])
    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    return (
        <div className="page-content">
            <h3>
                Saldo Awal{' '}
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>
            <div className="table-content">
                <div style={{ width: '200px' }}>
                    <SelectUnit
                        data={dataUnit.data}
                        onFilterChange={onQueryFilterChange}
                        value={queryFilter.unit_id}
                    />
                </div>
                {queryFilter.unit_id && (
                    <TableSaldoAwal data={dataSaldo.data} />
                )}
            </div>
        </div>
    )
}

export default PageSaldoAwal
