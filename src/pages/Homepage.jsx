import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styleCss/style.css";
import Sidebar from "../component/Sidebar";
import NavBar from "../component/NavBar";
import { axiosInterceptorDispatch, checkMe, injectStore } from "../utils/http";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../component/Header";

function Homepage() {
  const dispatch = useDispatch();

  const dataUser = useSelector(({ authState }) => authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataUser?.data.token === undefined && dataUser.isFulfilled) {
     return navigate("/login",{replace:true});
     
    } 
  }, [dataUser, navigate]);

  useEffect(() => {
    axiosInterceptorDispatch(dispatch);
    injectStore(dataUser.data)
    
    const checkMeCredentials=async(token)=>{
      await checkMe(token);
    }
    if(dataUser.data.token!==undefined){
      checkMeCredentials(dataUser.data.token)

    }
  else{
      return navigate("/login",{replace:true});

  }
    
  }, []);
  return (
    <div className="containerApp">
      <aside className="sidebar">
        <Sidebar/>
      </aside>
      <Header  dispatch={dispatch} token={dataUser.data.token}/>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Homepage;
