import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PageAkunBiaya from './AkunBiaya/PageAkunBiaya'
import { FaOrcid, FaFileInvoiceDollar, FaRegCreditCard } from 'react-icons/fa6'
import PagePosPay from './PosBayar/PagePosBayar'
import PageJenisBayar from './JenisBayar/PageJenisBayar'

function PageSettingPembayaran() {
    return (
        <div className="page">
            <Tabs
                defaultActiveKey="SettingPembayaran"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
                justify
                style={{
                    backgroundColor: 'lightblue',
                    borderRadius: '10px',
                    width: '95%',
                    margin: '10px auto ',
                }}
            >
                <Tab
                    eventKey="Akun Biaya"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaOrcid className="tabs-icon" />
                            <p style={{ fontSize: '25px', color: 'grey' }}>
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
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaFileInvoiceDollar className="tabs-icon" />
                            <p style={{ fontSize: '25px', color: 'grey' }}>
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
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaRegCreditCard className="tabs-icon" />
                            <p style={{ fontSize: '25px', color: 'grey' }}>
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
