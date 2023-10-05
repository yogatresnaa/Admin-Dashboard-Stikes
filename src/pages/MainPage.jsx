import React from 'react';
import { Routes, Route, Outlet, useNavigate, useNavigation } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
function MainPage() {
    
    const dataUser=useSelector(({authState})=>authState.data)
    const navigate=useNavigate(); 
  
  
    useEffect(()=>{
if(dataUser.token!==undefined){
    navigate('/admin')
    
}
else{
    navigate('/login')
    
}
  },[dataUser,navigate])
  return (

    <div></div>
 
  );
}


export default MainPage;
