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
import PageKenaikanKelas from './kenaikanKelas/PageKenaikanKelas'

function PageAkademik() {
    return (
        <div className="page">
            <Tabs
                defaultActiveKey="Tahun Ajaran"
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
                    eventKey="Tahun Ajaran"
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
                            <FaCalendarDays
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
                                Page Tahun Ajaran{' '}
                            </p>
                        </span>
                    }
                >
                    <PageTahunAjaran />
                </Tab>

                <Tab
                    eventKey="Kenaikan kelas"
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
                            <FaCalendarDays
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
                                Page Kenaikan{' '}
                            </p>
                        </span>
                    }
                >
                    <PageKenaikanKelas />
                </Tab>

                <Tab
                    eventKey="Alumni"
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
                            <FaPeopleRoof
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
