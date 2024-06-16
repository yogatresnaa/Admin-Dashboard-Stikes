import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { FaCalendarDays, FaPeopleRoof, FaPeopleLine } from 'react-icons/fa6'
import PageTahunAjaran from './TahunAjaran/PageTahunAjaran'
import PageAlumni from './Alumni/PageAlumni'
import PageKelulusan from './Kelulusan/PageKelulusan'

function PageAkademik() {
    return (
        <div className="page">
            <Tabs
                defaultActiveKey="Akademik"
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
                            <FaPeopleRoof className="tabs-icon" />
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
                            <FaPeopleLine className="tabs-icon" />
                            <p style={{ fontSize: '25px', color: 'grey' }}>
                                Page Kelulusan{' '}
                            </p>
                        </span>
                    }
                >
                    <PageKelulusan />
                </Tab>
            </Tabs>
        </div>
    )
}

export default PageAkademik
