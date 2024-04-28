import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableSaldoAwal from './component/TableSaldoAwal'
import SelectUnitKelas from '../../../component/ActionButton/SelectUnitKelas'
import useRequest from '../../../customHooks/useRequest'
import {
    getAllDataSaldoAwal,
    getAllKelas,
    getAllUnitByUser,
    putSaldoAwal,
} from '../../../utils/http'
import queryString from 'query-string'

import { useSelector } from 'react-redux'
import SelectUnit from '../../../component/ActionButton/SelectUnit'

function PageSaldoAwal() {
    const {
        data: dataUnit,
        setData: setDataUnit,
        sendData: sendDataSaldoAwal,
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

    const fetchDataSaldo = () => {
        getDataSaldo(() =>
            getAllDataSaldoAwal(dataUser.token, {
                unit_unit_id: queryFilter.unit_id,
            })
        )
    }

    const onClickEnterHandler = (e, type, row) => {
        console.log(type)
        if (e.key == 'Enter') {
            setDataSaldo((prevState) => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    data: prevState.data.data.map((item) =>
                        item.cash_account_id == row.cash_account_id
                            ? {
                                  ...item,
                                  [type]: {
                                      value: 0,
                                      onClick: false,
                                  },
                              }
                            : item
                    ),
                },
            }))
            const data = dataSaldo.data.data.filter(
                (item) => item.cash_account_id == row.cash_account_id
            )

            const body =
                type == 'kredit'
                    ? { cash_account_kredit: data[0].kredit.value }
                    : { cash_account_debit: data[0].debit.value }
            console.log(body)
            sendDataSaldoAwal(
                () => putSaldoAwal(row.cash_account_id, body, dataUser.token),
                () => {
                    fetchDataSaldo()
                },
                null
            )
        }
    }
    useEffect(() => {
        // const query = queryString.stringify(queryFilter);
        getDataUnit(() => getAllUnitByUser(dataUser.token))
    }, [])

    useEffect(() => {
        fetchDataSaldo()
        setDataSaldo((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                data: prevState.data?.data?.map((item) => ({
                    ...item,
                    debit: {
                        value: 0,
                        onClick: false,
                    },
                    kredit: {
                        value: 0,
                        onClick: false,
                    },
                })),
            },
        }))
    }, [queryFilter.unit_id])
    const onQueryFilterChange = (e) => {
        setQueryFilter((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    console.log(dataSaldo)
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
                    <TableSaldoAwal
                        data={dataSaldo.data}
                        setDataSaldo={setDataSaldo}
                        onCLickEnterHandler={onClickEnterHandler}
                    />
                )}
            </div>
        </div>
    )
}

export default PageSaldoAwal
