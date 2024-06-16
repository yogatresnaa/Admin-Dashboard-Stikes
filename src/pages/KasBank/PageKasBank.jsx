import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FaFileArrowUp, FaFileArrowDown, FaMoneyBills } from 'react-icons/fa6'
import PageKasKeluar from './KasKeluar/PageKasKeluar'
import PageKasMasuk from './KasMasuk/PageKasMasuk'
import PageSaldoAwal from './SaldoAwal/PageSaldoAwal'

function PageKasBank() {
    return (
        <div className="page">
            <Tabs
                defaultActiveKey="Kas Bank"
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
                    eventKey="kas-keluar"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaFileArrowUp className="tabs-icon" />
                            <p
                                style={{
                                    fontSize: '25px',
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
                                Page Kas Keluar{' '}
                            </p>
                        </span>
                    }
                >
                    <PageKasKeluar />
                </Tab>

                <Tab
                    eventKey="kas-masuk"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaFileArrowDown className="tabs-icon" />
                            <p
                                style={{
                                    fontSize: '25px',
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
                                Page Kas Masuk{' '}
                            </p>
                        </span>
                    }
                >
                    <PageKasMasuk />
                </Tab>

                <Tab
                    eventKey="saldo-awal"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaMoneyBills className="tabs-icon" />
                            <p
                                style={{
                                    fontSize: '25px',
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
                                Page Saldo Awal{' '}
                            </p>
                        </span>
                    }
                >
                    <PageSaldoAwal />
                </Tab>
            </Tabs>
        </div>
    )
}

export default PageKasBank
