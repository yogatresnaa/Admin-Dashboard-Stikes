import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PageAkunBiaya from './AkunBiaya/PageAkunBiaya'
import { FaOrcid, FaFileInvoiceDollar, FaRegCreditCard } from 'react-icons/fa6'
import PagePosPay from './PosBayar/PagePosBayar'
import PageJenisBayar from './JenisBayar/PageJenisBayar'
import { ToastContainer } from 'react-toastify'

function PageSettingPembayaran() {
    return (
        <div className="page">
            <ToastContainer />

            <Tabs
                defaultActiveKey="Akun Biaya"
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
                    eventKey="Akun Biaya"
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
                            <FaOrcid
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
                                Page Akun Biaya{' '}
                            </p>
                        </span>
                    }
                >
                    <PageAkunBiaya />
                </Tab>

                <Tab
                    eventKey="Pos Bayar"
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
                                Page Pos Bayar{' '}
                            </p>
                        </span>
                    }
                >
                    <PagePosPay />
                </Tab>

                <Tab
                    eventKey="Jenis Bayar"
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
                            <FaRegCreditCard
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
                                Page Jenis Bayar{' '}
                            </p>
                        </span>
                    }
                >
                    <PageJenisBayar />
                </Tab>
            </Tabs>
        </div>
    )
}

export default PageSettingPembayaran
