import React from 'react';
import {useEffect} from "react";
import AdminNav from './adminNavbar.jsx'
import AdminNavExpand from './adminNavExpand.jsx'
import AdminStu from './adminStudent.jsx'
import AdminHome from './adminHome.jsx'
import AdminElective from './adminElec.jsx'
import AdminElecDesc from './adminElecDesc.jsx'
import CourseForm from "./courseForm.jsx";
import {Routes,Route,Outlet, BrowserRouter,useNavigate} from 'react-router-dom'
import jwt_decode from "jwt-decode";
export default function ad(){
    const navigateTo = useNavigate();
    useEffect(()=>{
        const token=sessionStorage.getItem('adminToken')
        if(token){
            
            const user=jwt_decode(token)
            console.log(user)
            if(!user){
                sessionStorage.removeItem('adminToken')
                console.log("hello mate")
                navigateTo('/login')
            }
            navigateTo('/admin/home')
        }
        else{
            navigateTo('/login')
        }
    },[])
    
    
    
}



