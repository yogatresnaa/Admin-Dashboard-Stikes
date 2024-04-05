import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableKasKeluar from './components/TableKasKeluar'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import {
    deleteKredit,
    getAllKreditSubmitted,
    getAllUnitByUser,
} from '../../../utils/http'
import AddAction from '../../../component/ActionButton/AcctionAddButoon'
import queryString from 'query-string'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { useSelector } from 'react-redux'
import { alertConfirmation } from '../../../component/Alert/swalConfirmation'
import { alertType } from '../../../utils/CONSTANT'
import SelectUnit from '../../../component/ActionButton/SelectUnit'
import useTable from '../../../customHooks/useTable'
import SearchInput from '../../../component/ActionButton/SearchInput'

function PageKasKeluar() {
    const navigate = useNavigate()

    const {
        data: dataKasKeluar,
        getData: getDataKasKeluar,
        sendData: sendDataKreditSubmitted,
        filterText,
        onChangeFilterText,
        isLoading: isLoadingKasKeluar,
    } = useRequest()
    const { data: dataUnit, getData: getDataUnit } = useRequest()

    const {
        resetPaginationToggle,
        setResetPaginationToggle,
        setIsOpenModalEdit,
        isOpenModalForm,
        setIsOpenModalForm,
        isEdit,
        setIsEdit,
    } = useTable()

    // const { data: dataProdi, setData: setDataProdi, getData: getDataProdi } = useRequest();

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        unit_id: '',
    })
    const fetchDataKredit = () => {
        getDataKasKeluar(() =>
            getAllKreditSubmitted(
                { unit_unit_id: queryFilter.unit_id },
                dataUser.token
            )
        )
    }
    useEffect(() => {
        // const query = queryString.stringify(queryFilter);
        fetchDataKredit()
    }, [queryFilter.unit_id])
    useEffect(() => {
        getDataUnit(() => getAllUnitByUser(dataUser.token))
    }, [])

    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onClickAddHandler = () => {
        navigate('tambah')
    }

    const onClickDeleteHandler = (id) => {
        alertConfirmation(alertType.delete, async () => {
            await sendDataKreditSubmitted(
                () => deleteKredit(id, dataUser.token),
                () => {
                    fetchDataKredit()
                },
                null
            )
        })
    }
    const subHeaderComponent = useMemo(() => {}, [
        filterText,
        onChangeFilterText,
        resetPaginationToggle,
        setResetPaginationToggle,
    ])

    const onCLickEditHandler = (row) => {
        navigate(`edit/${row.kredit_id}`, {
            state: {
                ...row,
                unit_unit_name: dataUnit.data.filter(
                    (item) => item.unit_id == queryFilter.unit_id
                )[0],
            },
        })
    }
    return (
        <div className="page-content">
            <ToastContainer />

            <h3>
                Kas Keluar{' '}
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>
            <div className="table-content">
                <AddAction onClickHandler={onClickAddHandler} />
                <div style={{ width: '200px', margin: '10px' }}>
                    <SelectUnit
                        data={dataUnit.data}
                        onFilterChange={onQueryFilterChange}
                        value={queryFilter.unit_id}
                    />
                </div>
                <TableKasKeluar
                    data={dataKasKeluar.data}
                    resetPaginationToggle={resetPaginationToggle}
                    isLoading={isLoadingKasKeluar}
                    subHeaderComponent={subHeaderComponent}
                    onCLickEditHandler={onCLickEditHandler}
                    onClickDeleteHandler={onClickDeleteHandler}
                />
            </div>
        </div>
    )
}

export default PageKasKeluar
