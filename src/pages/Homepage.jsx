import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styleCss/style.css";
import Sidebar from "../component/Sidebar";
import NavBar from "../component/NavBar";
import { axiosInterceptorDispatch } from "../utils/http";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../component/Header";

function Homepage() {
  const dispatch = useDispatch();

  const dataUser = useSelector(({ authState }) => authState.data);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataUser.token === undefined) {
      navigate("/login");
    } 
  }, [dataUser, navigate]);

  useEffect(() => {
    axiosInterceptorDispatch(dispatch);
  }, []);
  return (
    <div className="containerApp">
      <div className="sidebar">
        <Sidebar />
      </div>
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Homepage;
