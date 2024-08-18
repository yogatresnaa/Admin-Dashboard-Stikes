import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {
    FaClipboardList,
    FaFileInvoiceDollar,
    FaFileCircleCheck,
} from 'react-icons/fa6'

import PageLaporanKasBank from './LaporanKasBank/PageLaporanKasBank'
import PageLaporanKasTunai from './LaporanKasTunai/PageKasTunai'
import PageLaporanJurnalUmum from './LaporanJurnalUmum/PageJurnalUmum'
import { ToastContainer } from 'react-toastify'

function PageLaporanKeuangan() {
    return (
        <div className="page">
            <ToastContainer />

            <Tabs
                defaultActiveKey="Page Laporan Keuangan"
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
                    eventKey="laporan-kas-bank"
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
                            <FaClipboardList
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
                                Page Laporan Kas Bank{' '}
                            </p>
                        </span>
                    }
                >
                    <PageLaporanKasBank />
                </Tab>

                <Tab
                    eventKey="laporan-kas-tunai"
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
                            <FaFileInvoiceDollar
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
                                Page Laporan kas tunai{' '}
                            </p>
                        </span>
                    }
                >
                    <PageLaporanKasTunai />
                </Tab>

                <Tab
                    eventKey="laporan-jurnal-umum"
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
                            <FaFileCircleCheck
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
                                Page Laporan jurnal umum{' '}
                            </p>
                        </span>
                    }
                >
                    <PageLaporanJurnalUmum />
                </Tab>
            </Tabs>
        </div>
    )
}

export default PageLaporanKeuangan
