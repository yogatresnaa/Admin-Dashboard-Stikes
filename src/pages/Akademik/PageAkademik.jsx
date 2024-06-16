import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import {
    FaCalendarDays,
    FaPeopleRoof,
    FaPeopleLine,
    FaUserGraduate,
} from 'react-icons/fa6'
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
                    backgroundColor: '#F0FFFF',
                    borderRadius: '10px',
                    width: '95%',
                    margin: '10px auto ',
                    boxShadow:
                        'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
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
                            <p
                                style={{
                                    fontSize: '25px',
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
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
                            <p
                                style={{
                                    fontSize: '25px',
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
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
                            <p
                                style={{
                                    fontSize: '25px',
                                    color: 'grey',
                                    fontWeight: 'bold',
                                }}
                            >
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
