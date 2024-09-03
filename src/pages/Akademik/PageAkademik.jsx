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
import { ToastContainer } from 'react-toastify'

function PageAkademik() {
    return (
        <div className="page">
            <ToastContainer />

            <Tabs
                defaultActiveKey="Tahun Ajaran"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 style-tabs"
                justify
                // style={{
                //     display: 'flex',
                //     justifyContent: 'space-between',
                //     gap: '20px',
                //     backgroundColor: '#F6F5F5',
                //     borderRadius: '10px',
                //     width: '90%',
                //     height: '80px',
                //     margin: '40px auto ',
                //     boxShadow:
                //         'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
                // }}
            >
                <Tab
                    eventKey="Tahun Ajaran"
                    title={
                        <span className="tab-style">
                            <FaCalendarDays className="tabs-icon tabs-icon-background" />
                            <p className="tag-tab-style">Tahun Ajaran </p>
                        </span>
                    }
                >
                    <PageTahunAjaran />
                </Tab>

                <Tab
                    eventKey="Kenaikan kelas"
                    title={
                        <span className="tab-style">
                            <FaPeopleRoof className="tabs-icon tabs-icon-background" />
                            <p className="tag-tab-style">Kenaikan kelas</p>
                        </span>
                    }
                >
                    <PageKenaikanKelas />
                </Tab>

                <Tab
                    eventKey="Alumni"
                    title={
                        <span className="tab-style">
                            <FaPeopleLine className="tabs-icon tabs-icon-background" />
                            <p className="tag-tab-style">Alumni</p>
                        </span>
                    }
                >
                    <PageAlumni />
                </Tab>

                <Tab
                    eventKey="Kelulusan"
                    title={
                        <span className="tab-style">
                            <FaUserGraduate className="tabs-icon tabs-icon-background" />
                            <p className="tag-tab-style">Kelulusan</p>
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
