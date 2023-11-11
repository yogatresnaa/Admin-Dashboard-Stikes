import React, { useRef, useState, useEffect } from "react";
import "./css/header.css";
import logo from "../assets/images/avatar.png"; // with import
import Button from "react-bootstrap/Button";
import { AiOutlineLogout } from "react-icons/ai";
import { logoutUserActionCreator } from "../redux/actions/authAction";
function Header({ dispatch, dataUser }) {
  const dropdownRef = useRef();
  const [isShow, setIsShow] = useState(false);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    console.log(isShow);

    const windowClickEvent = (e) => {
      if (
        isShow &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        // console.log(dropdownRef);
        console.log("ini");

        setIsShow(false);
        e.stopPropagation();
      }
    };
    if (isShow) {
      document.addEventListener("mouseup", windowClickEvent);
    }

    return () => {
      document.removeEventListener("mouseup", windowClickEvent);
    };
  }, [isShow]);

  const onShowDropdown = (e) => {
    setIsShow(!isShow);
    e.stopPropagation();
  };

  const onClickLogoutHandler = () => {
    dispatch(logoutUserActionCreator(dataUser.token))
  }
  return (
    <>
      <header
        className="header-wrapper"

        disabled={isShow}
      >
        <div className="profile-wrapper" onClick={onShowDropdown}>
          <img src={logo} alt="" />
          <p>{dataUser?.user_full_name?.length > 5 ? `${dataUser.user_full_name.slice(0, 5)}...` : dataUser.user_full_name}</p>
        </div>
      </header>
      {isShow ? (
        <div ref={dropdownRef} className="dropdown-wrapper">
          <div className="dropdown__profile-wrapper">
            <img src={logo} alt="" />
            <p className="text-nama">{dataUser.user_full_name}</p>
            <p className="text-role">{dataUser.user_role_role_id == 1 ? 'Admin' : 'Petugas'}</p>
            <p className="text-email">{dataUser.user_email}</p>
          </div>
          <div className="dropdown__button-wrapper">
            <Button variant="light">Profile</Button>
            <Button variant="dark" onClick={onClickLogoutHandler}>
              {" "}
              Logout <AiOutlineLogout />
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default Header;
