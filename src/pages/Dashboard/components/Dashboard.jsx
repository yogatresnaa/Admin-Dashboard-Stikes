import React from 'react'
import BarChart from './BarChart'
import LaporanKas from './LaporanKas'
import ListTransaksi from './listTransaksi'
import { getDataTransaksi } from '../../../utils/dumyDataTransaksi'

function Dashboard() {
    const [dataTransaksi, setDataTransaksi] = React.useState(() =>
        getDataTransaksi()
    )
    return (
        <div className="page-content">
            <h3>
                Dashboard{' '}
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>
            <div className="card-transaksi">
                <ListTransaksi dataTransaksi={dataTransaksi} />
            </div>
            <div className="page-dashboar">
                <BarChart />
                <LaporanKas />
            </div>
        </div>
    )
}

export default Dashboard
