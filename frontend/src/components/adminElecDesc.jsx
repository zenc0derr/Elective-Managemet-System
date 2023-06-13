import React from "react";
import IOT from "../assets/images/IOTimage.png";
import { DataGrid } from "@mui/x-data-grid";
import { studentRows } from "../assets/data/datatablesource";
import { useState,useEffect } from "react";
import AdminNav from "./adminNavbar.jsx";
import AdminNavExpand from "./adminNavExpand.jsx";
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom'
import jwt_decode from "jwt-decode";


const AdminElecDesc = () => {
  const navigate = useNavigate();
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
  const location = useLocation();
  const electiveRows  = location.state.studentElective;

  const [data, setData] = useState(studentRows);
     
  const [active, setActive] = React.useState("courses");
  const [size, setSize] = React.useState(true);
  const toggleNav = (curr) => {
    setActive(curr);
    navigate(`/admin/${curr}`);
  };
  const logout = () => {
    sessionStorage.removeItem("adminToken");
    navigateTo("/login");
  };
  const toggleSize = () => {
    setSize((prev) => !prev);
  };
  useEffect(() => {
    fetch(`https://aems-api.onrender.com/api/student/bycourse/${electiveRows.id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(data);

  
  const navbar = size ? (
    <AdminNav
      active={active}
      toggleNav={toggleNav}
      logout={logout}
      toggleSize={toggleSize}
    />
  ) : (
    <AdminNavExpand
      active={active}
      toggleNav={toggleNav}
      logout={logout}
      toggleSize={toggleSize}
    />
  );

  const studentColumns = [
    { field: "id", headerName: "ID", width: 300 },

    {
      field: "name",
      headerName: "Student",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="flex items-center">{params.row.name}</div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
      renderCell: (params) => {
        return <div className="flex items-center">{params.row.email}</div>;
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`p-1 rounded bg-green-100 text-green-500`}>
            Approved
          </div>
        );
      },
    },
  ];

  //temporary data
  const props = electiveRows

  return (
    <>
      {navbar}
      <div className={`absolute right-0 ${size ? "w-[96%]" : "w-[85%]"}`}>
        <div>
          <div
            className={`p-10 rounded-lg relative w-[90%] mx-auto mt-5 shadow-[0px_4px_14px_rgba(0,0,0,0.25)] bg-white`}
          >
            <div className="w-[100%] h-[44%] top-0 left-0 bg-secondary absolute"></div>
            <div className="z-20 flex w-[100%] justify-between  ml-[23px] mt-[33px]">
              <img className="z-20 inline w-[30%] " src={props.image} />
              <div className="z-20 mx-[26px]">
                <p className="font-bold text-[40px]">{props.name}</p>
                <p
                  className={`relative text-[13px] font-semibold left-10 `}
                >{`by ${props.faculty}`}</p>
                <p className=" font-normal text-[16px] mt-[20px]">
                  {props.description}
                </p>
              </div>
            </div>
            <div className="flex justify-between my-5">
              <p className="text-[15px] font-medium">{`lecture hrs:${props.duration}`}</p>
              <p className="text-[15px] font-medium">{`venue:${props.venue}`}</p>
              <p className="text-[15px] font-medium">{`rating:${props.rating}`}</p>
              <p className="text-[15px] font-medium">{`${props.remaining_seats} places left`}</p>
            </div>
          </div>
          <div className="h-[600px] w-[90%] mx-auto">
            <div className="mt-8 w-full text-gray-500 text-2xl flex items-center justify-between mb-10">
              Student Enrolled in this course
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
      </div>
    </>
  );
};

export default AdminElecDesc;
