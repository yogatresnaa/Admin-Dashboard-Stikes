import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { FaUserGraduate, FaCity, FaBookOpenReader } from 'react-icons/fa6'
import PageKelas from './Kelas/PageKelas'
import PageProgramStudi from './ProgramStudi/PageProgramStudi'
import PageSiswa from './Siswa/PageSiswa'

function PageManajemen() {
    return (
        <div className="page">
            <Tabs
                defaultActiveKey="Kelas"
                id="uncontrolled-tab-example"
                className="mb-3"
                transition={false}
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
                    eventKey="Kelas"
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
                            <FaCity
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
                                Page Kelas{' '}
                            </p>
                        </span>
                    }
                >
                    <PageKelas />
                </Tab>

                <Tab
                    eventKey="Program Studi"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                margin: '10px',
                                backgroundColor: '#232b3e',

                                height: '50px',
                                padding: '10px',
                                borderRadius: '5px',
                            }}
                        >
                            <FaBookOpenReader
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
                                Page Program Studi{' '}
                            </p>
                        </span>
                    }
                >
                    <PageProgramStudi />
                </Tab>

                <Tab
                    eventKey="Page Siswa"
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
                            <FaUserGraduate
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
                                Page Siswa{' '}
                            </p>
                        </span>
                    }
                >
                    <PageSiswa />
                </Tab>
            </Tabs>
        </div>
    )
}

export default PageManajemen
