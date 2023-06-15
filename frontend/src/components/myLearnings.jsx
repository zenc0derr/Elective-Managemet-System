import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoutImg from "../assets/images/logoutw.png";
import jwt_decode from "jwt-decode";
import { set } from "date-fns";

const myLearning = () => {
  const navigateTo = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("studentToken");
    if (token) {
      const user = jwt_decode(token);
      console.log(user);
      if (!user) {
        sessionStorage.removeItem("studentToken");
        console.log("hello mate");
        navigateTo("/login");
      }
    } else {
      navigateTo("/login");
    }
  }, []);
  const [crs, setCrs] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("studentToken");
    const user = jwt_decode(token);

    fetch(`https://aems-api.onrender.com/api/student/${user.student_id}`)
      .then((response) => response.json())
      .then((responseJson) => {

        setCrs((prev)=>{
            return [...responseJson.courses_enrolled]
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [currTag, setCurrTag] = useState("All");
  const tags = [
    "All",
    "Cyber Physical Systems",
    "Data Science",
    "Artificial Intelligence",
    "Humanities",
    "Cyber Security",
  ];

  const tagDes = tags.map((tg) => {
    return (
      <p
        onClick={() => {
          setCurrTag(tg);
        }}
        className={`${
          currTag != tg ? "bg-secondary" : "bg-black text-white"
        } mx-4 rounded-[28px] inline px-5 py-2 border-2 cursor-pointer border-black`}
      >
        {tg}
      </p>
    );
  });
  const [ElecSel1, setProfElectives] = useState([]);
  const [ElecSel2, setFreeElectives] = useState([]);

  useEffect(() => {
    fetch("https://aems-api.onrender.com/api/courses/free")
      .then((response) => response.json())
      .then((responseJson) => {
        setFreeElectives(responseJson.coursesList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    fetch("https://aems-api.onrender.com/api/courses/professional")
      .then((response) => response.json())
      .then((responseJson) => {
        setProfElectives(responseJson.coursesList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {

    setCrs((prev)=>{
        return prev.map((cs)=>{
            console.log(cs)
            var id=cs
            if(cs.id)
                id=cs.id
            let x={}
            ElecSel1.forEach((c)=>{
                
                if(c.id==id){
                    x=c
                    return x
                }
           })
           ElecSel2.forEach((c)=>{

            if(c.id==id){
                x=c
                return x
            }
            })
            console.log(x)
            return x
        })
    })
  }, [ElecSel1,ElecSel2]);

  const logout = () => {
    sessionStorage.removeItem("studentToken");
    navigateTo("/login");
  };

  const navigate = () => {
    navigateTo("/student");
  };

  const [courses, setCourse] = useState(crs);
  useEffect(() => {
    setCourse(() => {
      if (currTag == "All") return crs;
      return crs.filter((cs) => cs.tag == currTag);
    });
  }, [currTag,crs]);

  const crsDisp = courses.map((cs, id) => {
    return (
      <div
        key={id}
        className="relative w-[290px] h-[151px] rounded-tl-[20px] rounded-br-[20px] bg-[#3D3D3D]"
      >
        <p className="text-center text-[18px] font-semibold pt-[20%] text-primary">
          {cs.name}
        </p>
        <p className="absolute right-3 bottom-3 text-grey">{cs.faculty}</p>
      </div>
    );
  });

  const [nav, setNav] = React.useState("Learning");
  const navBar = (
    <div className="fixed w-screen px-[35px] h-[62px] items-center bg-secondary-black flex justify-between">
      <div className="flex w-[308px] justify-between">
        <p
          onClick={navigate}
          className={`${
            nav == "Courses" ? "active" : "inactive"
          } cursor-pointer`}
        >
          COURSES
        </p>
        <p
          className={`${
            nav == "Learning" ? "active" : "inactive"
          } cursor-pointer`}
        >
          MY LEARNINGS
        </p>
      </div>
      <form className="flex" action="" method="POST">
        <img
          src={logoutImg}
          onClick={logout}
          className="cursor-pointer w-[20px] h-[20px] top-[7px] relative"
        />
      </form>
    </div>
  );
  return (
    <>
      {navBar}
      <div className="relative top-[105px]">
        {tagDes}
        <div className="flex items-center justify-center">
          <div className=" mx-auto grid-cols-4 grid mt-20 gap-[200px]">
            {crsDisp}
          </div>
        </div>
      </div>
    </>
  );
};

export default myLearning;
