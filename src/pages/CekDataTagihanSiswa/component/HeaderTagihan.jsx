import React from 'react'
import logo from '../../../assets/images/logo-adfinku-no-border.png' // with import

function HeaderTagihanSiswa() {
    return (
        <div className="header-tagihan">
            <div className="logo-sekolah">
                <img src={logo} className=" me-1 fs-1" />
            </div>
        </div>
    )
}

export default HeaderTagihanSiswa
