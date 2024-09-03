import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import PageInfoLembaga from './InfoLembaga/PageInfoLembaga'
import { ToastContainer } from 'react-toastify'
import {
    FaCalendarDays,
    FaPeopleRoof,
    FaPeopleLine,
    FaUserGraduate,
} from 'react-icons/fa6'

function PagePengaturan() {
    return (
        <div className="page">
            <ToastContainer />
            <Tabs
                defaultActiveKey="Pengaturan"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 style-tabs"
                justify
            >
                <Tab
                    eventKey="Info Lembaga"
                    title={
                        <span className="tab-style">
                            <FaCalendarDays className="tabs-icon tabs-icon-background" />
                            <p className="tag-tab-style">Info Lembaga </p>
                        </span>
                    }
                >
                    <PageInfoLembaga />
                </Tab>

                <Tab
                    eventKey="Kepengurusan"
                    title={
                        <span className="tab-style">
                            <FaCalendarDays className="tabs-icon tabs-icon-background" />
                            <p className="tag-tab-style">Informasi </p>
                        </span>
                    }
                ></Tab>

                <Tab
                    eventKey="Logo Lembaga"
                    title={
                        <span className="tab-style">
                            <FaCalendarDays className="tabs-icon tabs-icon-background" />
                            <p className="tag-tab-style">Manajemen Pengguna </p>
                        </span>
                    }
                ></Tab>
            </Tabs>
        </div>
    )
}

export default PagePengaturan
