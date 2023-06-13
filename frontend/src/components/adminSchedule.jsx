import React from "react"
import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminNav from "./adminNavbar"
import AdminNavExpand from "./adminNavExpand"
import AdminElecSel from "./adminElecSel"
const AdminSchedule=()=>{
    const navigate=useNavigate()
    const [active,setActive]=React.useState("schedule")
    const [size,setSize]=React.useState(true)
    const toggleNav=(curr)=>{
        setActive(curr)
        navigate(`/admin/${curr}`)
    }
    const logout = () => {
        sessionStorage.removeItem("adminToken");
        navigate("/login");
      };
    const toggleSize=()=>{
        setSize((prev)=>(!prev))
    }
    
    const navbar=(size)?(<AdminNav active={active} toggleNav={toggleNav} logout={logout} toggleSize={toggleSize}/>):( <AdminNavExpand active={active} toggleNav={toggleNav} logout={logout} toggleSize={toggleSize}/>)
    return (
        <>
        {navbar}
        <div className={`bg-blue absolute right-0 ${size ? "w-[96%]" : "w-[85%]"}`}>
            <AdminElecSel/>
        </div>
        </>

    )
}

export default AdminSchedule