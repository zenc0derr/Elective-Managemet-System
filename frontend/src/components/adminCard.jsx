
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TimelineIcon from '@mui/icons-material/Timeline';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import jwt_decode from "jwt-decode";

const Widget = (props) => {
  let data;

  switch (props.type) {
    case "students":
      data = {
        title: "STUDENTS ENROLLED",
        counter:"230",
        color: "text-green-500",
        link: "See all students",
        percentage: "27%",
        icon: [
          <PersonOutlinedIcon
          className="icon"
          style={{
            color: "green",
          }}
          />,
          <KeyboardArrowUpIcon/>
          ],
      };
      break;
    case "mostLovedCourses":
      data = {
        title: "STUDENTS NOT ENROLLED",
        counter:"25",
        link: "view students",
        color: "text-red-500",
        percentage: "6%",
        icon: [
          <PersonOutlinedIcon
          className="icon"
          style={{
            color: "red",
          }}
          />,
          <KeyboardArrowDownIcon
          style={{
            color: "red",
          }}
          />
          ],
      };
      break;
    case "reports":
      data = {
        title: "FREE ELECTIVES",
        color: "text-red-500",
        counter:"2",
        link: "View Courses",
        percentage: "",
        icon: [
          <CreateNewFolderIcon
            className="icon"
            style={{
           
              color: "black",
            }}
          />
        ],
      };
      break;
    case "newCourses":
      data = {
        title: "PROFFESSIONAL ELECTIVES",
        color: "text-red-500",
        counter:"5",
        link: "View Courses",
        percentage: "",
        icon: [
          <CreateNewFolderIcon
            className="icon"
            style={{
           
              color: "purple",
            }}
          />
        ],
      };
      break;
    default:
      break;
  }

  return (
    <div className="flex justify-between flex-1 p-[10px] shadow-lg rounded-[10px] h-[150px] bg-secondary">
      <div className="flex flex-col justify-between">
        <div className="font-bold text-[14px]">{data.title}</div>
        <div className="text-[28px] font-light">{data.counter}</div>
        <div className="w-max text-[12px] border-b-[1px] border-[#808080]">{data.link}</div>
      </div>
      <div className="flex flex-col justify-between">
        <div className={`flex items-center text-[14px] ${data.color}`}>
          {data.percentage !== "" ? data.icon[1] : ""}
          {data.percentage !== "" ? data.percentage : ""}
        </div>
        
        {data.icon[0]}
      </div>
    </div>

  )
}

export default Widget