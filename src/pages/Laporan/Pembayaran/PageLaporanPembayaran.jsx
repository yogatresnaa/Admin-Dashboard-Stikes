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
                defaultActiveKey="Page Laporan Pembayaran"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
                justify
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '20px',
                    backgroundColor: '#F6F5F5',
                    borderRadius: '10px',
                    width: '90%',
                    height: '80px',
                    margin: '40px auto ',
                    boxShadow:
                        'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                }}
            >
                <Tab
                    eventKey="laporan pembayaran kelas"
                    className="custom-tab"
                    title={
                        <span
                            className="tab-title"
                            style={{
                                display: 'flex',
                                margin: '10px',
                                backgroundColor: '#232b3e',
                                width: '100%',
                                height: '50px',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                        >
                            <FaChartColumn
                                className="tabs-icon"
                                style={{
                                    marginRight: '10px',
                                    width: '35px',
                                    height: '35px',
                                    backgroundColor: '#077cf9',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '15px',
                                    color: 'white',
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
                                margin: '10px',
                                backgroundColor: '#232b3e',
                                width: '100%',
                                height: '50px',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                        >
                            <FaCalendarDays
                                className="tabs-icon"
                                style={{
                                    marginRight: '10px',
                                    width: '35px',
                                    height: '30px',
                                    backgroundColor: '#077cf9',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '15px',
                                    color: 'white',
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
                                margin: '10px',
                                backgroundColor: '#232b3e',
                                width: '100%',
                                height: '50px',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                        >
                            <FaChartPie
                                className="tabs-icon"
                                style={{
                                    marginRight: '10px',
                                    width: '35px',
                                    height: '30px',
                                    backgroundColor: '#077cf9',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '15px',
                                    color: 'white',
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
                                margin: '10px',
                                backgroundColor: '#232b3e',
                                width: '100%',
                                height: '50px',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                        >
                            <FaPersonChalkboard
                                className="tabs-icon"
                                style={{
                                    width: '35px',
                                    height: '30px',
                                    marginRight: '10px',
                                    backgroundColor: '#077cf9',
                                }}
                            />
                            <p
                                style={{
                                    fontSize: '15px',
                                    color: 'white',
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
