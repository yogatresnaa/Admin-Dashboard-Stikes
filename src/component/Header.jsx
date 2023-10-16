import React, { useRef, useState, useEffect } from "react";
import "./css/header.css";
import logo from "../assets/images/avatar.png"; // with import
import Button from "react-bootstrap/Button";
import { AiOutlineLogout } from "react-icons/ai";
function Header() {
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
  return (
    <>
      <div
        className="header-wrapper"
        onClick={onShowDropdown}
        disabled={isShow}
      >
        <div className="profile-wrapper">
          <img src={logo} alt="" />
          <p>dwiky</p>
        </div>
      </div>
      {isShow ? (
        <div ref={dropdownRef} className="dropdown-wrapper">
          <div className="dropdown__profile-wrapper">
            <img src={logo} alt="" />
            <p className="text-nama">Nama</p>
            <p className="text-role">Admin</p>
            <p className="text-email">dwi@gmail.com</p>
          </div>
          <div className="dropdown__button-wrapper">
            <Button variant="light">Profile</Button>
            <Button variant="dark">
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
