import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import { LinkContainer } from 'react-router-bootstrap';
import { FaUserGraduate, FaAngleDown, FaAngleUp, FaUniversity, FaRegMoneyBillAlt, FaRegCreditCard, FaRegKeyboard } from 'react-icons/fa';
import { BsFillMortarboardFill } from 'react-icons/bs';
import Navbar from 'react-bootstrap/Navbar';

function Sidebar() {
  const [toggle1, setToggle1] = React.useState(false);
  const [toggle2, setToggle2] = React.useState(false);
  const [toggle3, setToggle3] = React.useState(false);
  const [toggle4, setToggle4] = React.useState(false);
  const [toggle5, setToggle5] = React.useState(false);

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

  return (
    <>
      <div className='bg-dark text-white min-vh-100'>
        <div className='brand-name'>
          <FaUniversity className='me-3 fs-1' />
          <span className=' fs-5'>STIKES</span>
        </div>
        <hr className='text-black' />
        <div className='list-group list-group-flush min-vh-100'>
          {/* <a className='list-group-item py-2'>
            <i className='bi bi-speedometer2 fs-4 me-2'></i>
            <span className='fs-5'>Dashboard</span>
          </a>
          <a className='list-group-item py-2'>
            <i className='bi bi-speedometer2 fs-4 me-2'></i>
            <span>Dashboard</span>
          </a> */}

          <hr className='text-white d-none d-sm-block'></hr>
          <ul className='nav nav-pills flex' id='parentM'>
            <LinkContainer to='/admin'>
              <li className='nav-item nav-link text-white  my-1'>
                <FaRegKeyboard />
                <span className='ms-2'>Dashboard</span>
              </li>
            </LinkContainer>
            <li className='nav-item my-3' onClick={toggleNav}>
              <a href='#submenu' className='nav-link text-white' data-bs-toggle='collapse' aria-current='page'>
                <FaUserGraduate />
                <span className='ms-2'>Kesiswaan</span>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                  {toggle1 === true ? <FaAngleUp /> : <FaAngleDown />}
                </Navbar.Toggle>
              </a>
              <ul className='nav collapse ms-2 flex-column justify-content-end column-wrapper ' id='submenu' data-bs-parent='#parentM'>
                <li className='nav-item '>
                  <a className='nav-link text-white' href='#' aria-current='page'>
                    Kelas
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link text-white' href='#'>
                    Siswa
                  </a>
                </li>
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
                <li className='nav-item '>
                  <a className='nav-link text-white' href='#' aria-current='page'>
                    Tahun Ajaran
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link text-white' href='#'>
                    Kelulusan
                  </a>
                </li>

                <LinkContainer to='/admin/kelulusan'>
                  <li className='nav-item nav-link text-white m-2'>Kelulusan</li>
                </LinkContainer>

                <LinkContainer to='/admin/alumni'>
                  <li className='nav-item nav-link text-white m-2'>Alumni</li>
                </LinkContainer>
              </ul>
            </li>

            <li className='nav-item text-white my-1' onClick={toggleNav3}>
              <a href='#submenu3' className='nav-link text-white' data-bs-toggle='collapse' aria-current='page'>
                <BsFillMortarboardFill />
                <span className='ms-2 text-white'>Keuangan</span>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                  {toggle3 === true ? <FaAngleUp /> : <FaAngleDown />}
                </Navbar.Toggle>
              </a>
              <ul className='nav collapse ms-2  flex-column justify-content-end  column-wrapper ' id='submenu3' data-bs-parent='#parentM'>
                <li className='nav-item '>
                  <a className='nav-link text-white' href='#' aria-current='page'>
                    Pembayaran Siswa
                  </a>
                </li>
                <li className='nav-item'>
                  <a href='#submenu4' className='nav-link text-white' id='submenu5' data-bs-toggle='collapse' aria-current='page'>
                    Setingan Pembayaran
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' className='ms-2'>
                      {toggle4 === true ? <FaAngleUp /> : <FaAngleDown />}
                    </Navbar.Toggle>
                  </a>

                  <ul className='nav collapse multi-collapse ms-2 flex-column justify-content-end  ' id='submenu4' data-bs-parent='#submenu5'>
                    <li className='nav-item '>
                      <a className='nav-link text-white' href='#' aria-current='page'>
                        Akun Biaya
                      </a>
                    </li>
                    <li className='nav-item '>
                      <a className='nav-link text-white' href='#'>
                        Pos Bayar
                      </a>
                    </li>

                    <li className='nav-item'>
                      <a className='nav-link text-white' href='#'>
                        Jenis Bayar
                      </a>
                    </li>
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
              <ul className='nav collapse itemku ms-2 flex-column justify-content-end  ' id='submenu5' data-bs-parent='#parentM'>
                <li className='nav-item '>
                  <a className='nav-link text-white' href='#' aria-current='page'>
                    Saldo Awal
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link text-white' href='#'>
                    Saldo keluar
                  </a>
                </li>

                <li className='nav-item'>
                  <a className='nav-link text-white' href='#'>
                    Kas Masuk
                  </a>
                </li>

                <li className='nav-item'>
                  <a className='nav-link text-white' href='#'>
                    Transfer Kas
                  </a>
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
