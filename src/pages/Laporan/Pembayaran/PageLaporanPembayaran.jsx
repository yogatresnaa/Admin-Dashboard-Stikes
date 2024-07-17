import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import {
    FaCalendarDays,
    FaChartColumn,
    FaChartPie,
    FaPersonChalkboard,
} from 'react-icons/fa6'

import PageLaporanPembayaranKelas from './PerKelas/PageLaporanPembayaranKelas'
import PageLaporanPembayaranPerTanggal from './PerTanggal/PageLaporanPerTanggal'
import PageRekapPembayaran from './RekapPembayaran/PageRekapPembayaran'
import PageLaporanTagihanSiswa from './TagihanSiswa/PageTagihanSiswa'

function PageLaporanPembayaran() {
    return (
        <div className="page">
            <Tabs
                defaultActiveKey="#"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
                justify
                style={{
                    backgroundColor: '#F0FFFF',
                    borderRadius: '10px',
                    width: '95%',
                    margin: '10px auto ',
                    boxShadow:
                        'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                }}
            >
                <Tab
                    eventKey="laporan pembayaran kelas"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaChartColumn
                                className="tabs-icon"
                                style={{
                                    marginRight: '10px',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '20px',
                                    textAlign: 'left',
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
                                Pembayaran Per Kelas{' '}
                            </p>
                        </span>
                    }
                >
                    <PageLaporanPembayaranKelas />
                </Tab>
                <Tab
                    eventKey="laporan Per Tanggal"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaCalendarDays
                                className="tabs-icon"
                                style={{
                                    marginRight: '10px',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '20px',
                                    textAlign: 'left',
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
                                Laporan Per tanggal{' '}
                            </p>
                        </span>
                    }
                >
                    <PageLaporanPembayaranPerTanggal />
                </Tab>
                <Tab
                    eventKey="laporan Rekap Pembayaran"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaChartPie
                                className="tabs-icon"
                                style={{
                                    marginRight: '10px',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '20px',
                                    textAlign: 'left',
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
                                Rekap Pembayaran{' '}
                            </p>
                        </span>
                    }
                >
                    <PageRekapPembayaran />
                </Tab>

                <Tab
                    eventKey="laporan Tagihan Siswa"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaPersonChalkboard
                                className="tabs-icon"
                                style={{
                                    marginRight: '10px',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '20px',
                                    textAlign: 'left',
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
                                Tagihan Siswa{' '}
                            </p>
                        </span>
                    }
                >
                    <PageLaporanTagihanSiswa />
                </Tab>
            </Tabs>
        </div>
    )
}

export default PageLaporanPembayaran
