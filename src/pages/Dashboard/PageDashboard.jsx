import React, { useEffect } from 'react'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import './css/Dashboard.css'
import CardTransaksi from './Components/CardTransaksi'
import { getDataTransaksi } from '../../utils/dumyDataTransaksi'
import {
    BsFillCalculatorFill,
    BsPerson,
    BsPersonAdd,
    BsWallet2,
} from 'react-icons/bs'
import { FaRegKeyboard } from 'react-icons/fa'
import { BiMoney, BiUser, BiWallet } from 'react-icons/bi'
import useRequest from '../../customHooks/useRequest'
import { getAllAccountCost, getAllDataDashboard } from '../../utils/http'
import { useSelector } from 'react-redux'
import Cardsiswa from './components/CardSiswa'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const color = [
    '#C4FFDD',
    '#c9c9ff',
    '#ffd7e1',
    'red',
    '#fff9d1',
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

    useEffect(() => {
        getDataDashboard(() => getAllDataDashboard(dataUser.token))
    }, [])
    return (
        <div className="page">
            <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab
                    eventKey="Dashboard"
                    title={
                        <span>
                            <FaRegKeyboard className="tabs-icon" />
                            <p>Dashboard </p>
                        </span>
                    }
                >
                    <div className="page-content">
                        <h3>
                            Dashboard{' '}
                            <span style={{ fontSize: '0.8em', color: 'gray' }}>
                                List
                            </span>
                        </h3>
                        <div className="card-transaksi">
                            <div className="list-data-transaksi">
                                <CardTransaksi
                                    key={dataTransaksi[0].id}
                                    id={dataTransaksi[0].id}
                                    {...dataTransaksi[0]}
                                    color={color[0]}
                                    icon={
                                        <BsFillCalculatorFill
                                            color={color[0]}
                                            size={40}
                                        />
                                    }
                                />
                                <CardTransaksi
                                    key={dataTransaksi[1].id}
                                    id={dataTransaksi[1].id}
                                    {...dataTransaksi[1]}
                                    color={color[1]}
                                    icon={
                                        <BiMoney color={color[1]} size={40} />
                                    }
                                />
                                <CardTransaksi
                                    key={dataTransaksi[2].id}
                                    id={dataTransaksi[2].id}
                                    {...dataTransaksi[2]}
                                    color={color[2]}
                                    icon={
                                        <BiWallet color={color[2]} size={40} />
                                    }
                                />
                                <Cardsiswa
                                    title={'Jumlah Siswa'}
                                    data={dataDashboard.data.jumlah_siswa_aktif}
                                    color={color[3]}
                                    icon={<BiUser color={color[3]} size={40} />}
                                />
                            </div>
                        </div>
                        <div className="page-dashboar">
                            <BarChart />
                            <LineChart />
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default PageDashboard
