import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./adminNavbar";
import AdminNavExpand from "./adminNavExpand";
import AdminElecSel from "./adminElecSel";
import AdminSchedHelper from "./adminSchedHelper";
import jwt_decode from "jwt-decode";

import AdminElecDisp from "./adminElecDisp";
const AdminSchedule = () => {
  const [ElecSel1,setProfElectives]=useState([])
  const [ElecSel2,setFreeElectives]=useState([])
  const [addCat, setAddCat] = useState(true);
  const [elecCateg, setElecCateg] = useState({
    proffessionalElectives: [],
    freeElectives: [],
  });
  const [electiveType, setElecType] = useState("Professional electives");
  const [error, setError] = React.useState("");
  const [displayError, setDisplayError] = React.useState(false);
  const [course, setCourse] = React.useState(ElecSel1);
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
    setCourse((prev) => {
      if (electiveType == "Professional electives") {
        return ElecSel1.filter((cs) => {
          let ret = true;
          elecCateg.proffessionalElectives.forEach((x) => {
            x.forEach((i) => {
              if (i.id == cs.id) ret = false;
            });
          });
          return ret;
        });
      } else {
        return ElecSel2.filter((cs) => {
          let ret = true;
          elecCateg.freeElectives.forEach((x) => {
            x.forEach((i) => {
              if (i.id == cs.id) ret = false;
            });
          });
          return ret;
        });
      }
    });
  }, [elecCateg, electiveType,ElecSel1,ElecSel2]);

  React.useEffect(() => {
    if (error) {
      setDisplayError(true);

      const timeout = setTimeout(() => {
        setError("");
        setDisplayError(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [error]);
  const [capacity, setCapacity] = useState(0);
  const [maxCap, setMaxCap] = useState(410);
  const navigate = useNavigate();
  const [active, setActive] = React.useState("schedule");
  const [size, setSize] = React.useState(true);
  const colour=["#6da0f8","#fbacf1","#c7f976","#dce75f","#7971d6","#d879d0","#79d8b0"]
  useEffect(() => {
    setCourse((prev) => {
      return prev.map((cs) => {
        return {
          ...cs,
          sel: false,
        };
      });
    });
  }, []);
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
  const toggleNav = (curr) => {
    setActive(curr);
    navigate(`/admin/${curr}`);
  };
  const logout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/login");
  };
  const toggleSize = () => {
    setSize((prev) => !prev);
  };
  const addcourse = (id) => {
    setCourse((prev) => {
      return prev.map((cs) => {
        if (cs.id == id) {
          return {
            ...cs,
            sel: !cs.sel,
          };
        }
        return cs;
      });
    });
  };

  const toggle = (event) => {
    setElecType(event.target.value);
  };

  const courseAlloc = () => {
    let count = 0;
    for (var i = 0; i < course.length; i++) {
      if (course[i].sel) count++;
    }
    if (count == 0) {
      setError("No course selected");
      return;
    }
    setElecCateg((prev) => {
      if (electiveType == "Professional electives") {
        return {
          ...prev,
          proffessionalElectives: [
            ...prev.proffessionalElectives,
            course.filter((cs) => cs.sel),
          ],
        };
      } else {
        return {
          ...prev,
          freeElectives: [...prev.freeElectives, course.filter((cs) => cs.sel)],
        };
      }
    });
  };
  const addCourseCat = () => {
    if (addCat) {
      courseAlloc();
    }
    setAddCat((prev) => !prev);
  };

  const ElecEdit = (index,type) => {

    if(type=="Prof"){
        const cs=elecCateg.proffessionalElectives[index]
        setElecCateg((prev)=>{
            return {
                ...prev,
                proffessionalElectives:[...prev.proffessionalElectives.slice(0,index),...prev.proffessionalElectives.slice(index+1,prev.proffessionalElectives.length)]
            }
        })
        setCourse((prev)=>{
            return [...cs,...prev]
        })
    }
    else{
        const cs=elecCateg.freeElectives[index]
        setElecCateg((prev)=>{
            return {
                ...prev,
                freeElectives:[...prev.freeElectives.slice(0,index),...prev.freeElectives.slice(index+1,prev.freeElectives.length)]
            }
        })
        setCourse((prev)=>{

            return [...cs,...prev]

        })
       
    }
  

  };
   async function startRegistration (start_time,end_time){
    const response =await fetch(`https://aems-api.onrender.com/api/admin/setschedule`,{
            method: 'POST',
            headers:{ 
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                start_time,
                end_time,
                elecCateg
            }),
      })
      const data=await response.json()
    console.log(start_time,end_time)
    console.log(data)
  }
  const selecter = addCat ? (
    <AdminElecSel
      toggle={toggle}
      elective={electiveType}
      course={course}
      addcourse={addcourse}
      cap={capacity}
      maxCap={maxCap}
      submit={courseAlloc}
    />
  ) : (
    <AdminElecDisp
      colour={colour}
      prof={elecCateg.proffessionalElectives}
      free={elecCateg.freeElectives}
    />
  );

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
  return (
    <>
      {navbar}
      {displayError && (
        <p className=" font-montserrat fixed z-10 bg-secondary-black text-red-500 px-3 py-4 left-[50%] top-[10%]">
          {error}
        </p>
      )}
      <div className={`absolute right-0 ${size ? "w-[96%]" : "w-[85%]"}`}>
        <div className="w-[65%]">{selecter}</div>
        <div className="fixed right-0 w-[34%] border-l-2 border-grey h-screen top-0">
          <AdminSchedHelper
            colour={colour}
            edit={ElecEdit}
            prof={elecCateg.proffessionalElectives}
            free={elecCateg.freeElectives}
            addCat={addCat}
            addCourseCat={addCourseCat}
            startRegistration = {startRegistration}
          />
        </div>
      </div>
    </>
  );
};

export default AdminSchedule;
