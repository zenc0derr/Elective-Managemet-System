import React from "react";
import "./electiveManage.css";
import { DataGrid } from "@mui/x-data-grid";
import {
  electiveColumns,
  electiveRows,
} from "../assets/data/electiveTablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminNav from "./adminNavbar.jsx";
import AdminNavExpand from "./adminNavExpand.jsx";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


const ElectiveManage = () => {
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



  const [data, setData] = useState(electiveRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleView = (id) => {};
  useEffect(() => {
    fetch("https://aems-api.onrender.com/api/courses")
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson.coursesList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(data);
  const navigate = useNavigate();
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/admin/courses/view" state={{ studentElective: params.row}} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <div
              className="cursor-pointer px-[5px] py-[5px] rounded-[5px] text-yellow-500 border-dotted border-[1px] border-yellow-500"

            >
              <Link to="/admin/addCourse" state={{ studentElective: params.row}} style={{ textDecoration: "none" }}>
              Update
            </Link>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {navbar}
      <div className={`absolute right-0 ${size ? "w-[96%]" : "w-[85%]"}`}>
        <div className="ElectiveManage">
          <div className="ElectiveManageTitle">
            Elective Management
            <Link
              to="/admin/addCourse"
              className="text-sm px-2 text-black py-1 rounded-md bg-primary"
            >
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={data}
            columns={electiveColumns.concat(actionColumn)}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
};

export default ElectiveManage;
