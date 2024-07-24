import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import {
    FaUserGraduate,
    FaAngleDown,
    FaAngleUp,
    FaUniversity,
    FaRegMoneyBillAlt,
    FaRegCreditCard,
    FaRegKeyboard,
    FaRegEdit,
    FaFileExport,
} from 'react-icons/fa'
import { BsFillMortarboardFill } from 'react-icons/bs'
import { FaCircleMinus } from 'react-icons/fa6'
import { IconContext } from 'react-icons'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../assets/images/logo.png' // with import
import './css/sidebar.css'

const ManajmenData = [
    {
        id: 1,
        to: 'program-studi',
        name: 'Program Studi',
    },
    {
        id: 2,
        to: 'kelas',
        name: 'Kelas',
    },
    {
        id: 3,
        to: 'siswa',
        name: 'Siswa',
    },
]
function Sidebar() {
    const [toggle1, setToggle1] = React.useState(false)
    const [toggle2, setToggle2] = React.useState(false)
    const [toggle3, setToggle3] = React.useState(false)
    const [toggle4, setToggle4] = React.useState(false)
    const [toggle5, setToggle5] = React.useState(false)
    const [toggle6, setToggle6] = React.useState(false)
    const [toggle7, setToggle7] = React.useState(false)
    const [toggle8, setToggle8] = React.useState(false)
    const [toggle9, setToggle9] = React.useState(false)

    const toggleNav = () => {
        setToggle1((prevToggle) => {
            return prevToggle === false ? true : false
        })
    }

    const toggleNav2 = () => {
        setToggle2((prevToggle) => {
            return prevToggle === false ? true : false
        })
    }

    const toggleNav3 = () => {
        setToggle3((prevToggle) => {
            return prevToggle === false ? true : false
        })
    }

    const toggleNav4 = () => {
        setToggle4((prevToggle) => {
            return prevToggle === false ? true : false
        })
    }

    const toggleNav5 = () => {
        setToggle5((prevToggle) => {
            return prevToggle === false ? true : false
        })
    }

    const toggleNav6 = () => {
        setToggle6((prevToggle) => {
            return prevToggle === false ? true : false
        })
    }

    const toggleNav7 = () => {
        setToggle7((prevToggle) => {
            return prevToggle === false ? true : false
        })
    }

    const toggleNav8 = () => {
        setToggle8((prevToggle) => {
            return prevToggle === false ? true : false
        })
    }
    const toggleNav9 = () => {
        setToggle9((prevToggle) => {
            return prevToggle === false ? true : false
        })
    }

    return (
        <div className="sidebar-text">
            <div className="min-vh-100 sidebar-wrapper">
                <div className="brand-name">
                    <div className="brand-name__image-wrapper">
                        <img src={logo} className=" me-1 fs-1" />
                    </div>
                    {/* <FaUniversity className='me-3 fs-1' /> */}
                </div>

                <div className="list-group list-group-flush ">
                    <hr className="text-white d-none d-sm-block"></hr>
                    <ul className="nav nav-pills flex" id="parentM">
                        <Link className="link" to="/admin">
                            <li className="nav-item nav-link   my-1">
                                <IconContext.Provider
                                    value={{ color: '#DC84F3' }}
                                >
                                    <FaRegKeyboard
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            padding: '3px',
                                            color: '#5B5DEE',
                                            boxShadow:
                                                'rgba(215, 12, 12, 0.15) 1.95px 1.95px 2.6px',
                                        }}
                                    />
                                </IconContext.Provider>

                                <span className="ms-2">Dashboard</span>
                            </li>
                        </Link>

                        <li className="nav-item my-2" onClick={toggleNav}>
                            <a
                                href="#submenu"
                                className="nav-link "
                                data-bs-toggle="collapse"
                                aria-current="page"
                            >
                                <IconContext.Provider
                                    value={{ color: '#DC84F3' }}
                                >
                                    <FaUserGraduate
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            color: '#5B5DEE',
                                            padding: '3px',
                                            borderradius: '50x',
                                            boxShadow:
                                                'rgba(215, 12, 12, 0.15) 1.95px 1.95px 2.6px',
                                        }}
                                    />
                                </IconContext.Provider>

                                <span className="ms-2">Manajemen Data</span>
                                <Navbar.Toggle
                                    aria-controls="responsive-navbar-nav"
                                    className="ms-2"
                                >
                                    {toggle1 === true ? (
                                        <FaAngleUp />
                                    ) : (
                                        <FaAngleDown />
                                    )}
                                </Navbar.Toggle>
                            </a>
                            <ul
                                className="nav collapse ms-1 flex-column justify-content-end column-wrapper bg-ul "
                                id="submenu"
                                data-bs-parent="#parentM"
                            >
                                {ManajmenData.map((item) => (
                                    <Link
                                        to={item.to}
                                        className="link color"
                                        key={item.id}
                                    >
                                        <li
                                            className="nav-item nav-link  m-1"
                                            style={{ color: '#5B5DEE' }}
                                        >
                                            <FaCircleMinus /> {item.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </li>

                        <li
                            className="nav-item text-white my-1 column-wrapper "
                            onClick={toggleNav2}
                        >
                            <a
                                href="#submenu1"
                                className="nav-link "
                                data-bs-toggle="collapse"
                                aria-current="page"
                            >
                                <IconContext.Provider
                                    value={{ color: '#DC84F3' }}
                                >
                                    <BsFillMortarboardFill
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            color: '#5B5DEE',
                                            padding: '3px',
                                            boxShadow:
                                                'rgba(215, 12, 12, 0.15) 1.95px 1.95px 2.6px',
                                        }}
                                    />
                                </IconContext.Provider>

                                <span className="ms-2 ">Akademik</span>
                                <Navbar.Toggle
                                    aria-controls="responsive-navbar-nav"
                                    className="ms-2"
                                >
                                    {toggle2 === true ? (
                                        <FaAngleUp />
                                    ) : (
                                        <FaAngleDown />
                                    )}
                                </Navbar.Toggle>
                            </a>
                            <ul
                                className="nav collapse ms-2 flex-column justify-content-end column-wrapper bg-ul"
                                id="submenu1"
                                data-bs-parent="#parentM"
                            >
                                <Link
                                    className="link link color"
                                    to="/admin/tahun-ajaran"
                                >
                                    <li
                                        className="nav-item nav-link  m-1"
                                        style={{ color: '#5B5DEE' }}
                                    >
                                        <FaCircleMinus color="#5B5DEE" /> Tahun
                                        Ajaran
                                    </li>
                                </Link>
                                <Link
                                    className="link link color"
                                    to="/admin/kelulusan"
                                >
                                    <li
                                        className="nav-item nav-link m-1"
                                        style={{ color: '#5B5DEE' }}
                                    >
                                        <FaCircleMinus color="#5B5DEE" />{' '}
                                        Kelulusan
                                    </li>
                                </Link>

                                <Link
                                    className="link link color"
                                    to="/admin/alumni"
                                >
                                    <li
                                        className="nav-item nav-link m-1"
                                        style={{ color: '#5B5DEE' }}
                                    >
                                        <FaCircleMinus color="#5B5DEE" /> Alumni
                                    </li>
                                </Link>
                            </ul>
                        </li>

                        <li className="nav-item text-white my-1">
                            <a
                                href="#submenu3"
                                className="nav-link "
                                onClick={toggleNav3}
                                data-bs-toggle="collapse"
                                aria-current="page"
                            >
                                <IconContext.Provider
                                    value={{ color: '#DC84F3' }}
                                >
                                    <FaRegMoneyBillAlt
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            color: '#5B5DEE',
                                            padding: '3px',
                                            borderradius: '50x',
                                            boxShadow:
                                                'rgba(215, 12, 12, 0.15) 1.95px 1.95px 2.6px',
                                        }}
                                    />
                                </IconContext.Provider>

                                <span className="ms-2 ">Keuangan</span>
                                <Navbar.Toggle
                                    aria-controls="responsive-navbar-nav"
                                    className="ms-2"
                                >
                                    {toggle3 === true ? (
                                        <FaAngleUp />
                                    ) : (
                                        <FaAngleDown />
                                    )}
                                </Navbar.Toggle>
                            </a>
                            <ul
                                className="nav collapse ms-2  flex-column justify-content-end  column-wrapper bg-ul "
                                id="submenu3"
                                data-bs-parent="#parentM"
                            >
                                <Link
                                    className="link color"
                                    to="/admin/pembayaran-siswa"
                                >
                                    <li
                                        className="nav-item nav-link  m-1"
                                        style={{ color: '#5B5DEE' }}
                                    >
                                        <FaCircleMinus color="#5B5DEE" />{' '}
                                        Pembayaran Siswa
                                    </li>
                                </Link>
                                <li className="nav-item m-1">
                                    <a
                                        href="#submenu4"
                                        className="nav-link"
                                        id="submenu5"
                                        onClick={toggleNav4}
                                        data-bs-toggle="collapse"
                                        aria-current="page"
                                        style={{ color: '#5B5DEE' }}
                                    >
                                        Seting Pembayaran
                                        <Navbar.Toggle
                                            aria-controls="responsive-navbar-nav"
                                            className="ms-2"
                                        >
                                            {toggle4 === true ? (
                                                <FaAngleUp />
                                            ) : (
                                                <FaAngleDown />
                                            )}
                                        </Navbar.Toggle>
                                    </a>
                                    <ul
                                        className="nav collapse multi-collapse ms-2 flex-column justify-content-end column-wrapper bg-ul"
                                        id="submenu4"
                                        data-bs-parent="#submenu5"
                                    >
                                        <Link
                                            className="link color"
                                            to="/admin/akun-biaya"
                                        >
                                            <li
                                                className="nav-item nav-link  m-1"
                                                style={{ color: '#5B5DEE' }}
                                            >
                                                <FaCircleMinus /> Akun Biaya
                                            </li>
                                        </Link>
                                        <Link
                                            className="link color"
                                            to="/admin/pos-bayar"
                                        >
                                            <li
                                                className="nav-item nav-link m-1"
                                                style={{ color: '#5B5DEE' }}
                                            >
                                                <FaCircleMinus /> Pos Bayar
                                            </li>
                                        </Link>

                                        <Link
                                            className="link color"
                                            to="/admin/jenis-bayar"
                                        >
                                            <li
                                                className="nav-item nav-link m-1"
                                                style={{ color: '#5B5DEE' }}
                                            >
                                                <FaCircleMinus /> Jenis Bayar
                                            </li>
                                        </Link>
                                        <Link
                                            className="link color"
                                            to="/admin/kirim-tagihan"
                                        >
                                            <li
                                                className="nav-item nav-link m-1"
                                                style={{ color: '#5B5DEE' }}
                                            >
                                                <FaCircleMinus /> Kirim Tagihan
                                            </li>
                                        </Link>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item text-white my-2">
                            <a
                                href="#submenu6"
                                className="nav-link "
                                onClick={toggleNav5}
                                data-bs-toggle="collapse"
                                aria-current="page"
                            >
                                <IconContext.Provider
                                    value={{ color: '#DC84F3' }}
                                >
                                    <FaRegCreditCard
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            color: '#5B5DEE',
                                            padding: '3px',
                                            borderradius: '50x',
                                            boxShadow:
                                                'rgba(215, 12, 12, 0.15) 1.95px 1.95px 2.6px',
                                        }}
                                    />
                                </IconContext.Provider>

                                <span className="ms-2 ">Kas Bank&nbsp;</span>
                                <Navbar.Toggle
                                    aria-controls="responsive-navbar-nav"
                                    className="ms-2"
                                >
                                    {toggle5 === true ? (
                                        <FaAngleUp />
                                    ) : (
                                        <FaAngleDown />
                                    )}
                                </Navbar.Toggle>
                            </a>
                            <ul
                                className="nav collapse itemku ms-2 flex-column justify-content-end column-wrapper  bg-ul"
                                id="submenu6"
                                data-bs-parent="#parentM"
                            >
                                <Link
                                    className="link color"
                                    to="/admin/saldo-awal"
                                >
                                    <li
                                        className="nav-item nav-link m-1"
                                        style={{ color: '#5B5DEE' }}
                                    >
                                        <FaCircleMinus /> Saldo Awal
                                    </li>
                                </Link>
                                <Link
                                    className="link color"
                                    to="/admin/kas-keluar"
                                >
                                    <li
                                        className="nav-item nav-link m-1"
                                        style={{ color: '#5B5DEE' }}
                                    >
                                        <FaCircleMinus /> Kas Keluar
                                    </li>
                                </Link>

                                <Link
                                    className="link color"
                                    to="/admin/kas-masuk"
                                >
                                    <li
                                        className="nav-item nav-link m-1"
                                        style={{ color: '#5B5DEE' }}
                                    >
                                        <FaCircleMinus /> Kas Masuk
                                    </li>
                                </Link>
                            </ul>
                        </li>

                        <li className="nav-item text-white my-1">
                            <a
                                href="#submenu7"
                                className="nav-link "
                                onClick={toggleNav6}
                                data-bs-toggle="collapse"
                                aria-current="page"
                            >
                                <IconContext.Provider
                                    value={{ color: '#DC84F3' }}
                                >
                                    <FaRegEdit
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            color: '#5B5DEE',
                                            padding: '3px',
                                            borderradius: '50x',
                                            boxShadow:
                                                'rgba(215, 12, 12, 0.15) 1.95px 1.95px 2.6px',
                                        }}
                                    />
                                </IconContext.Provider>

                                <span className="ms-2 ">Laporan &nbsp;</span>
                                <Navbar.Toggle
                                    aria-controls="responsive-navbar-nav"
                                    className="ms-2"
                                >
                                    {toggle6 === true ? (
                                        <FaAngleUp />
                                    ) : (
                                        <FaAngleDown />
                                    )}
                                </Navbar.Toggle>
                            </a>
                            <ul
                                className="nav collapse ms-2  flex-column justify-content-end  column-wrapper bg-ul "
                                id="submenu7"
                                data-bs-parent="#parentM"
                            >
                                <li className="nav-item">
                                    <a
                                        href="#submenu4"
                                        className="nav-link "
                                        id="submenu5"
                                        onClick={toggleNav7}
                                        data-bs-toggle="collapse"
                                        aria-current="page"
                                        style={{ color: '#5B5DEE' }}
                                    >
                                        Laporan Pembayaran
                                        <Navbar.Toggle
                                            aria-controls="responsive-navbar-nav"
                                            className="ms-2"
                                        >
                                            {toggle7 === true ? (
                                                <FaAngleUp />
                                            ) : (
                                                <FaAngleDown />
                                            )}
                                        </Navbar.Toggle>
                                    </a>

                                    <ul
                                        className="nav collapse multi-collapse ms-2 flex-column justify-content-end column-wrapper bg-ul"
                                        id="submenu4"
                                        data-bs-parent="#submenu5"
                                    >
                                        <Link
                                            className="link color"
                                            to="/admin/laporan-pembayaran/kelas"
                                        >
                                            <li
                                                className="nav-item nav-link m-1"
                                                style={{ color: '#5B5DEE' }}
                                            >
                                                <FaCircleMinus /> Per.Kelas
                                            </li>
                                        </Link>
                                        <Link
                                            className="link color"
                                            to="/admin/laporan-pembayaran/tanggal"
                                        >
                                            <li
                                                className="nav-item nav-link m-1"
                                                style={{ color: '#5B5DEE' }}
                                            >
                                                <FaCircleMinus /> Per.Tanggal
                                            </li>
                                        </Link>

                                        <Link
                                            className="link color"
                                            to="/admin/laporan-pembayaran/tagihan-siswa"
                                        >
                                            <li
                                                className="nav-item nav-link m-1"
                                                style={{ color: '#5B5DEE' }}
                                            >
                                                <FaCircleMinus /> Tagihan
                                                Mahasiswa
                                            </li>
                                        </Link>

                                        <Link
                                            className="link color"
                                            to="/admin/laporan-pembayaran/rekap-pembayarn"
                                        >
                                            <li
                                                className="nav-item nav-link m-1"
                                                style={{ color: '#5B5DEE' }}
                                            >
                                                <FaCircleMinus /> Rekap
                                                Pembayaran
                                            </li>
                                        </Link>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <a
                                        href="#submenu8"
                                        className="nav-link "
                                        id="submenu5"
                                        onClick={toggleNav8}
                                        data-bs-toggle="collapse"
                                        aria-current="page"
                                        style={{ color: '#5B5DEE' }}
                                    >
                                        Laporan Keuangan
                                        <Navbar.Toggle
                                            aria-controls="responsive-navbar-nav"
                                            className="ms-2"
                                        >
                                            {toggle8 === true ? (
                                                <FaAngleUp />
                                            ) : (
                                                <FaAngleDown />
                                            )}
                                        </Navbar.Toggle>
                                    </a>

                                    <ul
                                        className="nav collapse multi-collapse ms-2 flex-column justify-content-end column-wrapper "
                                        id="submenu8"
                                        data-bs-parent="#submenu7"
                                    >
                                        <Link
                                            className="link color"
                                            to="/admin/laporan/jurnal-umum"
                                        >
                                            <li
                                                className="nav-item nav-link m-1"
                                                style={{ color: '#5B5DEE' }}
                                            >
                                                <FaCircleMinus /> Jurnal Umum
                                            </li>
                                        </Link>
                                        <Link
                                            className="link color"
                                            to="/admin/laporan/kas-tunai"
                                        >
                                            <li
                                                className="nav-item nav-link m-1"
                                                style={{ color: '#5B5DEE' }}
                                            >
                                                <FaCircleMinus /> Lap. Kas tunai
                                            </li>
                                        </Link>

                                        <Link
                                            className="link color"
                                            to="/admin/laporan/kas-bank"
                                        >
                                            <li
                                                className="nav-item nav-link m-1"
                                                style={{ color: '#DC84F3' }}
                                            >
                                                <FaCircleMinus /> Lap. Kas Bank
                                            </li>
                                        </Link>
                                    </ul>
                                </li>
                            </ul>
                            <Link className="link" to="/admin/export-db">
                                <li className="nav-item nav-link   my-1">
                                    <IconContext.Provider
                                        value={{ color: '#DC84F3' }}
                                    >
                                        <FaRegKeyboard
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                padding: '3px',
                                                color: '#5B5DEE',
                                                boxShadow:
                                                    'rgba(215, 12, 12, 0.15) 1.95px 1.95px 2.6px',
                                            }}
                                        />
                                    </IconContext.Provider>

                                    <span className="ms-2">Export DB</span>
                                </li>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
