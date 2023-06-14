import React from 'react';
import { useEffect } from 'react';
import Widget from './adminCard.jsx'
import Chart from './Chart.jsx'
import AdminNav from './adminNavbar.jsx';
import AdminNavExpand from './adminNavExpand.jsx';
import {useNavigate} from 'react-router-dom'
import jwt_decode from "jwt-decode";

const AdminHome = (props)=>{
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
        }
        else{
            navigateTo('/login')
        }
    },[])
    const navigate=useNavigate()
    const [active,setActive]=React.useState("home")
    const [size,setSize]=React.useState(true)
    const toggleNav=(curr)=>{
        setActive(curr)
        navigate(`/admin/${curr}`)
    }
    const logout = () => {
        sessionStorage.removeItem("adminToken");
        navigateTo("/login");
      };
    const toggleSize=()=>{
        setSize((prev)=>(!prev))
    }
    
    const navbar=(size)?(<AdminNav active={active} toggleNav={toggleNav} logout={logout} toggleSize={toggleSize}/>):( <AdminNavExpand active={active} toggleNav={toggleNav} logout={logout} toggleSize={toggleSize}/>)
    return (
        <>
        {navbar}
        <div className={`absolute right-0 ${(size)?"w-[96%]":"w-[85%]"}`}>
        <div className="flex p-[20px] gap-[20px]">
                <Widget type="students" />
                <Widget type="mostLovedCourses" />
                <Widget type="reports" />
                <Widget type="newCourses"/>
            </div>
            <div className="flex p-[20px] gap-[20px]">
                <Chart title="No. of Students Joined in each elective" aspect={4 / 1.2}/>
            </div>
        </div>
        </>

    )
}

export default AdminHome