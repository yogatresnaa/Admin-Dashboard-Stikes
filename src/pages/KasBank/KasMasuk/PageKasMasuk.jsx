import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableKasMasuk from './components/TableKasMasuk'
import useRequest from '../../../customHooks/useRequest'
import {
    deleteDebit,
    deleteKredit,
    getAllDebitSubmitted,
    getAllKreditSubmitted,
    getAllUnitByUser,
    getDokumenDebit,
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
import { downloadDocument } from '../../../utils/helper'

function PageKasMasuk() {
    const navigate = useNavigate()

    const {
        data: dataKasMasuk,
        getData: getDataKasMasuk,
        sendData: sendDataDebitSubmitted,
        filterText,
        onChangeFilterText,
        isLoading: isLoadingKasMasuk,
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
    const {
        data: dataDokumen,
        getData: getDataDokumen,
        setData: setDataDokumen,
        isLoading: isLoadingDataDokumen,
    } = useRequest()

    // const { data: dataProdi, setData: setDataProdi, getData: getDataProdi } = useRequest();

    const dataUser = useSelector(({ authState }) => authState.data)
    const [queryFilter, setQueryFilter] = useState({
        unit_id: '',
    })
    const fetchDataDebit = () => {
        getDataKasMasuk(() =>
            getAllDebitSubmitted(
                { unit_unit_id: queryFilter.unit_id },
                dataUser.token
            )
        )
    }
    useEffect(() => {
        // const query = queryString.stringify(queryFilter);
        fetchDataDebit()
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
        navigate('kas-masuk/tambah')
    }

    const onClickDeleteHandler = (id) => {
        alertConfirmation(alertType.delete, async () => {
            await sendDataDebitSubmitted(
                () => deleteDebit(id, dataUser.token),
                () => {
                    fetchDataDebit()
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
        navigate(`kas-masuk/edit/${row.debit_id}`, {
            state: {
                ...row,
                unit_unit_name: dataUnit.data.filter(
                    (item) => item.unit_id == queryFilter.unit_id
                )[0],
            },
        })
    }

    //   const onCLickEditHandler = (row) => {
    //       navigate(`/edit/${row.debit_id}`, {
    //           state: {
    //               ...row,
    //               unit_unit_name: dataUnit.data.filter(
    //                   (item) => item.unit_id == queryFilter.unit_id
    //               )[0],
    //           },
    //       })
    //   }

    const onClickPrintHandler = async (id) => {
        await getDataDokumen(() => getDokumenDebit(id, dataUser.token))
    }

    useEffect(() => {
        if (dataDokumen?.data?.data)
            downloadDocument(dataDokumen.data.data, `kas masuk`)
        setDataDokumen(null)
    }, [dataDokumen?.data])
    return (
        <div className="page-content">
            <ToastContainer />

            <h3>
                Kas Masuk{' '}
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
                <TableKasMasuk
                    data={dataKasMasuk.data}
                    resetPaginationToggle={resetPaginationToggle}
                    isLoading={isLoadingKasMasuk}
                    subHeaderComponent={subHeaderComponent}
                    onCLickEditHandler={onCLickEditHandler}
                    onClickPrintHandler={onClickPrintHandler}
                    onClickDeleteHandler={onClickDeleteHandler}
                />
            </div>
        </div>
    )
}

export default PageKasMasuk
