import React, { useEffect, useState } from 'react'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import './css/Dashboard.css'
import { rupiahConvert } from '../../utils/helper'

import CardTransaksi from './components/CardTransaksi'
import { getDataTransaksi } from '../../utils/dumyDataTransaksi'
import { FaRegKeyboard } from 'react-icons/fa'
import {
    BsFillCalculatorFill,
    BsPerson,
    BsPersonAdd,
    BsWallet2,
} from 'react-icons/bs'
import { BiMoney, BiUser, BiWallet } from 'react-icons/bi'
import useRequest from '../../customHooks/useRequest'
import {
    getAllAccountCost,
    getAllDataDashboard,
    getAllUnitByUser,
} from '../../utils/http'
import { useSelector } from 'react-redux'
import Cardsiswa from './components/CardSiswa'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import SelectUnit from '../../component/ActionButton/SelectUnit'

const color = [
    '#AC3E31',
    '#DBAE58',
    '#488A99',
    '#A5D8DD',
    '#6AB187',
    'blue',
    'red',
    'green',
    'blue',
    'red',
    'green',
    'blue',
    'red',
    'green',
    'blue',
    'red',
    'green',
    'blue',
]

const penerimaanIcon = () => <BsFillCalculatorFill size="lg" color="darkgrey" />
function PageDashboard() {
    const dataUser = useSelector(({ authState }) => authState.data)

    const [dataTransaksi, setDataTransaksi] = React.useState(() =>
        getDataTransaksi()
    )
    const {
        data: dataDashboard,
        getData: getDataDashboard,
        isLoading: isLoadingDashboard,
        setIsLoading: setIsLoadingDashboard,
    } = useRequest()

    const {
        data: dataUnit,
        setData: setDataUnit,
        getData: getDataUnit,
    } = useRequest()
    const [queryFilter, setQueryFilter] = useState({
        unit_id: '',
    })
    useEffect(() => {
        getDataUnit(() => getAllUnitByUser(dataUser.token))
    }, [])

    useEffect(() => {
        if (queryFilter.unit_id !== '')
            getDataDashboard(() =>
                getAllDataDashboard(queryFilter, dataUser.token)
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
                Dashboard{' '}
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>
            <div className="w-25">
                <SelectUnit
                    data={dataUnit.data}
                    onFilterChange={onQueryFilterChange}
                    value={queryFilter.unit_id}
                />
            </div>
            {queryFilter.unit_id && (
                <>
                    <div className="card-transaksi gap-2 flex-column">
                        <div className="list-data-transaksi">
                            {/* <CardTransaksi
                        key={dataTransaksi[0].id}
                        id={dataTransaksi[0].id}
                        {...dataTransaksi[0]}
                        color={color[0]}
                        icon={
                            <BsFillCalculatorFill color={'white'} size={40} />
                        }
                    /> */}
                            <CardTransaksi
                                today={rupiahConvert(
                                    dataDashboard.data?.transaction_today
                                        ?.sub_total_masuk ?? 0
                                )}
                                thisMonth={rupiahConvert(
                                    dataDashboard.data?.transaction_month
                                        ?.sub_total_masuk ?? 0
                                )}
                                thisYear={rupiahConvert(
                                    dataDashboard.data?.transaction_year
                                        ?.sub_total_masuk ?? 0
                                )}
                                title="Pemasukan Kas"
                                color={color[1]}
                                icon={<BiMoney color={'white'} size={40} />}
                            />
                            <CardTransaksi
                                today={rupiahConvert(
                                    dataDashboard.data?.transaction_today
                                        ?.sub_total_keluar ?? 0
                                )}
                                thisMonth={rupiahConvert(
                                    dataDashboard.data?.transaction_month
                                        ?.sub_total_keluar ?? 0
                                )}
                                thisYear={rupiahConvert(
                                    dataDashboard.data?.transaction_year
                                        ?.sub_total_keluar ?? 0
                                )}
                                title="Pengeluaran Kas"
                                color={color[2]}
                                icon={<BiWallet color={'white'} size={40} />}
                            />
                            <Cardsiswa
                                title={'Jumlah Siswa'}
                                data={dataDashboard.data?.jumlah_siswa_aktif}
                                color={color[0]}
                                icon={<BiUser color={'white'} size={40} />}
                            />
                        </div>
                    </div>

                    {/* 
                    <div className="d-flex gap-2 w-100">
                        <div className="custom-card flex-1">
                            <BarChart />
                        </div>
                        <div className="custom-card flex-1">
                            <LineChart />
                        </div>
                    </div>
                     */}
                </>
            )}
        </div>
    )
}

export default PageDashboard
