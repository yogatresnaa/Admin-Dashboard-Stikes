import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { FaUsersLine, FaCalendarDays, FaUserGraduate } from 'react-icons/fa6'
import PageAlumni from './Alumni/PageAlumni'
import PageKelulusan from './Kelulusan/PageKelulusan'
import PageTahunAjaran from './TahunAjaran/PageTahunAjaran'

function PageAkademik() {
    return (
        <div className="page">
            <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
                style={{ backgroundColor: 'lightblue', borderRadius: '10px' }}
            >
                <Tab
                    eventKey="Alumni"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaUsersLine className="tabs-icon" />
                            <p style={{ fontSize: '25px', color: 'grey' }}>
                                Page Alumni{' '}
                            </p>
                        </span>
                    }
                >
                    <PageAlumni />
                </Tab>

                <Tab
                    eventKey="Kelulusan"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaUserGraduate className="tabs-icon" />
                            <p style={{ fontSize: '25px', color: 'grey' }}>
                                Page Kelulusan{' '}
                            </p>
                        </span>
                    }
                >
                    <PageKelulusan />
                </Tab>

                <Tab
                    eventKey="Tahun Ajaran"
                    title={
                        <span
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                margin: '10px',
                            }}
                        >
                            <FaCalendarDays className="tabs-icon" />
                            <p style={{ fontSize: '25px', color: 'grey' }}>
                                Page Tahun Ajaran{' '}
                            </p>
                        </span>
                    }
                >
                    <PageTahunAjaran />
                </Tab>
            </Tabs>
        </div>
    )
}

export default PageAkademik
