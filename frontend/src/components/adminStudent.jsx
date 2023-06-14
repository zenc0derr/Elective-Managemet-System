import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { studentColumns, studentRows } from "../assets/data/datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import AdminNav from './adminNavbar.jsx'
import AdminNavExpand from './adminNavExpand.jsx';
import {useNavigate} from 'react-router-dom'
import jwt_decode from "jwt-decode";

const AdminHome = (props)=>{
   
}
const AdminStu = () => {
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
  const [active,setActive]=React.useState("student")
  const [size,setSize]=React.useState(true)
  const toggleNav=(curr)=>{
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
  
  const [data, setData] = useState(studentRows);
  useEffect(() => {
    fetch('https://aems-api.onrender.com/api/student')
   .then((response) => response.json())
   .then((responseJson) => {
    setData(responseJson.studentsList);
   })
   .catch((error) => {
     console.error(error);
   });
      }, []);
      console.log(data)

      return (
        <>
        {navbar}
        <div className={`absolute right-0 ${(size)?"w-[96%]":"w-[85%]"}`}>
          <div className="h-[600px] p-[20px] w-[80%] mx-auto">
            <div className="w-full text-gray-500 text-2xl flex items-center justify-between mb-10">
              Student Management
            </div>
            <DataGrid
              className="datagrid"
              rows={data}
              columns={studentColumns}
              pageSize={8}
              rowsPerPageOptions={[8]}
            />
          </div>
        </div>
      </>
  
    )
};

export default AdminStu;