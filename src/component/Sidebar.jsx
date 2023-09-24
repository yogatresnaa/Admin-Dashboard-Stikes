import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import { FaUserGraduate, FaAngleDown, FaAngleUp, FaUniversity, FaRegMoneyBillAlt, FaRegCreditCard, FaRegKeyboard, FaRegEdit } from 'react-icons/fa';
import { BsFillMortarboardFill } from 'react-icons/bs';
import Navbar from 'react-bootstrap/Navbar';

function Sidebar() {
  const [toggle1, setToggle1] = React.useState(false);
  const [toggle2, setToggle2] = React.useState(false);
  const [toggle3, setToggle3] = React.useState(false);
  const [toggle4, setToggle4] = React.useState(false);
  const [toggle5, setToggle5] = React.useState(false);
  const [toggle6, setToggle6] = React.useState(false);
  const [toggle7, setToggle7] = React.useState(false);
  const [toggle8, setToggle8] = React.useState(false);

  const toggleNav = () => {
    setToggle1((prevToggle) => {
      return prevToggle === false ? true : false;
    });
  };

  const toggleNav2 = () => {
    setToggle2((prevToggle) => {
      return prevToggle === false ? true : false;
    });
  };

  const toggleNav3 = () => {
    setToggle3((prevToggle) => {
      return prevToggle === false ? true : false;
    });
  };

  const toggleNav4 = () => {
    setToggle4((prevToggle) => {
      return prevToggle === false ? true : false;
    });
  };

  const toggleNav5 = () => {
    setToggle5((prevToggle) => {
      return prevToggle === false ? true : false;
    });
  };

  const toggleNav6 = () => {
    setToggle6((prevToggle) => {
      return prevToggle === false ? true : false;
    });
  };

  const toggleNav7 = () => {
    setToggle7((prevToggle) => {
      return prevToggle === false ? true : false;
    });
  };

  const toggleNav8 = () => {
    setToggle8((prevToggle) => {
      return prevToggle === false ? true : false;
    });
  };

  return (
    <>
      <div className='bg-dark text-white min-vh-100'>
        <div className='brand-name'>
          <FaUniversity className='me-3 fs-1' />
          <span className=' fs-5'>STIKES</span>
        </div>
        <hr className='text-black' />
        <div className='list-group list-group-flush min-vh-100'>
          <hr className='text-white d-none d-sm-block'></hr>
          <ul className='nav nav-pills flex' id='parentM'>
            <Link className='link' to='/'>
              <li className='nav-item nav-link text-white  my-1'>
                <FaRegKeyboard />
                <span className='ms-2'>Dashboard</span>
              </li>
            </Link>

            <li className='nav-item my-2' onClick={toggleNav}>
              <a href='#submenu' className='nav-link text-white' data-bs-toggle='collapse' aria-current='page'>
                <FaUserGraduate />
                <span className='ms-2'>Kesiswaan</span>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                  {toggle1 === true ? <FaAngleUp /> : <FaAngleDown />}
                </Navbar.Toggle>
              </a>
              <ul className='nav collapse ms-1 flex-column justify-content-end column-wrapper ' id='submenu' data-bs-parent='#parentM'>
                <Link to='/kelas' className='link color'>
                  <li className='nav-item nav-link text-white'>Kelas</li>
                </Link>
                <Link to='/siswa' className='link color'>
                  <li className='nav-item nav-link text-white'>Siswa</li>
                </Link>
              </ul>
            </li>

            <li className='nav-item text-white my-1 column-wrapper ' onClick={toggleNav2}>
              <a href='#submenu1' className='nav-link text-white' data-bs-toggle='collapse' aria-current='page'>
                <BsFillMortarboardFill />
                <span className='ms-2 text-white'>Akademik</span>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                  {toggle2 === true ? <FaAngleUp /> : <FaAngleDown />}
                </Navbar.Toggle>
              </a>
              <ul className='nav collapse ms-2 flex-column justify-content-end column-wrapper ' id='submenu1' data-bs-parent='#parentM'>
                <Link className='link color' to='/kelulusan'>
                  <li className='nav-item nav-link text-white '>Kelulusan</li>
                </Link>

                <Link className='link color' to='/alumni'>
                  <li className='nav-item nav-link text-white'>Alumni</li>
                </Link>
              </ul>
            </li>

            <li className='nav-item text-white my-1'>
              <a href='#submenu3' className='nav-link text-white' onClick={toggleNav3} data-bs-toggle='collapse' aria-current='page'>
                <FaRegMoneyBillAlt />
                <span className='ms-2 text-white'>Keuangan</span>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                  {toggle3 === true ? <FaAngleUp /> : <FaAngleDown />}
                </Navbar.Toggle>
              </a>
              <ul className='nav collapse ms-2  flex-column justify-content-end  column-wrapper ' id='submenu3' data-bs-parent='#parentM'>
                <Link className='link color' to='/alumni'>
                  <li className='nav-item nav-link text-white'>Pembayaran Siswa</li>
                </Link>
                <li className='nav-item'>
                  <a href='#submenu4' className='nav-link text-white' id='submenu5' onClick={toggleNav4} data-bs-toggle='collapse' aria-current='page'>
                    Setingan Pembayaran
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                      {toggle4 === true ? <FaAngleUp /> : <FaAngleDown />}
                    </Navbar.Toggle>
                  </a>

                  <ul className='nav collapse multi-collapse ms-2 flex-column justify-content-end column-wrapper ' id='submenu4' data-bs-parent='#submenu5'>
                    <Link className='link color' to='/alumni'>
                      <li className='nav-item nav-link text-white'>Akun Biaya</li>
                    </Link>
                    <Link className='link color' to='/alumni'>
                      <li className='nav-item nav-link text-white'>Pos Bayar</li>
                    </Link>

                    <Link className='link color' to='/alumni'>
                      <li className='nav-item nav-link text-white'>Jenis Bayar</li>
                    </Link>
                  </ul>
                </li>
              </ul>
            </li>

            <li className='nav-item text-white my-2'>
              <a href='#submenu5' className='nav-link text-white' onClick={toggleNav5} data-bs-toggle='collapse' aria-current='page'>
                <FaRegCreditCard />
                <span className='ms-2 text-white'>Kas Bank</span>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                  {toggle5 === true ? <FaAngleUp /> : <FaAngleDown />}
                </Navbar.Toggle>
              </a>
              <ul className='nav collapse itemku ms-2 flex-column justify-content-end column-wrapper  ' id='submenu5' data-bs-parent='#parentM'>
                <Link className='link color' to='/saldo-awal'>
                  <li className='nav-item nav-link text-white'>Saldo Awal</li>
                </Link>
                <Link className='link color' to='/saldo-keluar'>
                  <li className='nav-item nav-link text-white'>Saldo Keluar</li>
                </Link>

                <Link className='link color' to='/kas-masuk'>
                  <li className='nav-item nav-link text-white'>Kas Masuk</li>
                </Link>

                <Link className='link color' to='/transfer-kas'>
                  <li className='nav-item nav-link text-white'>Transfer Kas</li>
                </Link>
              </ul>
            </li>

            <li className='nav-item text-white my-1'>
              <a href='#submenu6' className='nav-link text-white' onClick={toggleNav6} data-bs-toggle='collapse' aria-current='page'>
                <FaRegEdit />
                <span className='ms-2 text-white'>Laporan</span>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                  {toggle6 === true ? <FaAngleUp /> : <FaAngleDown />}
                </Navbar.Toggle>
              </a>
              <ul className='nav collapse ms-2  flex-column justify-content-end  column-wrapper ' id='submenu6' data-bs-parent='#parentM'>
                <li className='nav-item'>
                  <a href='#submenu4' className='nav-link text-white' id='submenu5' onClick={toggleNav7} data-bs-toggle='collapse' aria-current='page'>
                    Laporan Pembayaran
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                      {toggle7 === true ? <FaAngleUp /> : <FaAngleDown />}
                    </Navbar.Toggle>
                  </a>

                  <ul className='nav collapse multi-collapse ms-2 flex-column justify-content-end column-wrapper ' id='submenu4' data-bs-parent='#submenu5'>
                    <Link className='link color' to='/per-kelas'>
                      <li className='nav-item nav-link text-white'>Per.Kelas</li>
                    </Link>
                    <Link className='link color' to='/per-tanggal'>
                      <li className='nav-item nav-link text-white'>Per.Tanggal</li>
                    </Link>

                    <Link className='link color' to='/tagihan-mahasiswa'>
                      <li className='nav-item nav-link text-white'>Tagihan Mahasiswa</li>
                    </Link>

                    <Link className='link color' to='/rekap-pembayaran'>
                      <li className='nav-item nav-link text-white'>Rekap Pembayaran</li>
                    </Link>
                  </ul>
                </li>

                <li className='nav-item'>
                  <a href='#submenu8' className='nav-link text-white' id='submenu7' onClick={toggleNav8} data-bs-toggle='collapse' aria-current='page'>
                    Laporan Keuagan
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                      {toggle8 === true ? <FaAngleUp /> : <FaAngleDown />}
                    </Navbar.Toggle>
                  </a>

                  <ul className='nav collapse multi-collapse ms-2 flex-column justify-content-end column-wrapper ' id='submenu8' data-bs-parent='#submenu7'>
                    <Link className='link color' to='/lap-jurnal'>
                      <li className='nav-item nav-link text-white'>Laporan Jurnal</li>
                    </Link>
                    <Link className='link color' to='/lap-kas-bank'>
                      <li className='nav-item nav-link text-white'>Laporan Kas Bank</li>
                    </Link>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='dropdown open'>
          <a className='btn border-none dropdown-toggle text-white' type='button' id='triggerId' data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            <i className='bi bi-person fs-4 text-white'></i>
            <span className='fs-4 ms-3 text-white'>Admin</span>
          </a>
          <div className='dropdown-menu' aria-labelledby='triggerId'>
            <a className='dropdown-item' href='#'>
              Action
            </a>
            <a className='dropdown-item disabled' href='#'>
              Disabled action
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
