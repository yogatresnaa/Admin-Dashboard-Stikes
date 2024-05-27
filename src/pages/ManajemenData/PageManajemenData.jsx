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
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                transition={false}
                justify
                style={{
                    backgroundColor: 'lightblue',
                    borderRadius: '10px',
                    width: '95%',
                    margin: '10px auto ',
                }}
            >
                <Tab
                    eventKey="Kelas"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaCity className="tabs-icon" />
                            <p style={{ fontSize: '25px', color: 'grey' }}>
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
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaBookOpenReader className="tabs-icon" />
                            <p style={{ fontSize: '20px', color: 'grey' }}>
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
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaUserGraduate className="tabs-icon" />
                            <p style={{ fontSize: '20px', color: 'grey' }}>
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
