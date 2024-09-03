import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import SchoolInfoForm from './component/FormInfoSekolah'
import MediaSosial from './component/FormMediaSosial'
import UploadLogo from './component/UplodLogo'

function PageInfoLembaga() {
    return (
        <div className="page-content">
            <h3>
                Pengaturan Sekolah{' '}
                <span style={{ fontSize: '0.8em', color: 'gray' }}>List</span>
            </h3>

            <div className="table-content">
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="Info Lembaga" title="Info Lembaga">
                        <SchoolInfoForm />
                    </Tab>
                    <Tab eventKey="media " title="Media Sosial">
                        <MediaSosial />
                    </Tab>
                    <Tab eventKey="Upload Logo" title="Upload Logo">
                        <UploadLogo />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default PageInfoLembaga
