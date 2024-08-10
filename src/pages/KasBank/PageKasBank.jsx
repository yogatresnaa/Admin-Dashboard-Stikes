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
                defaultActiveKey="kas-keluar"
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
                    eventKey="kas-keluar"
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
                            <FaFileArrowUp
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
                                margin: '10px',
                                backgroundColor: '#232b3e',
                                width: '100%',
                                height: '50px',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                        >
                            <FaFileArrowDown
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
                                margin: '10px',
                                backgroundColor: '#232b3e',
                                width: '100%',
                                height: '50px',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                        >
                            <FaMoneyBills
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
