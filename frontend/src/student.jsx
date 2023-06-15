import React, { useEffect } from "react";
import Courses from "./components/courses.jsx";
import Wishlist from "./components/wishlist.jsx";
import ProfessionalElectives from "./assets/data/Professional-electives.json";
import FreeElectives from "./assets/data/Free-electives.json";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import logoutImg from './assets/images/logoutw.png';
import Startgif from './assets/images/Startgif.gif'

export default function student() {
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

  const logout = () => {
    sessionStorage.removeItem("studentToken");
    navigateTo("/login");
  };
  const [error, setError] = React.useState("");
  const [displayError, setDisplayError] = React.useState(false);

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
  const [searchInput, setSearchInput] = React.useState("");

  const [prof,setProf]=React.useState([]);
  const [free,setFree]=React.useState([]);
  const [courseCat,setCourseCat]=React.useState([])
  const [courses, setCourses] = React.useState([]);
  const [elective, setElective] = React.useState("Professional elective 1");
  const [allCourses, setAllCourses] = React.useState({proffessionalElectives:[],freeElectives:[]});
  const [wishList1,setWishList1]=React.useState([])
  const [wishList2,setWishList2]=React.useState([])
  const [nav,setNav]=React.useState("Courses")
  const [status,setStatus]=React.useState("notGot")
  const [start,setStart]=React.useState(-1)
  useEffect(() => {
    fetch("https://aems-api.onrender.com/api/courses/students")
      .then((response) => response.json())
      .then((responseJson) => {
        if(Object.keys(responseJson).length!=0){
          setStart(1)
        setAllCourses((prev)=>{

          return {
            proffessionalElectives:responseJson.proffessionalElectives.map((crslst)=>{
              return crslst.map((crs)=>{
                return {
                  ...crs,
                  wishlist:false
                }
              })
            }),
            freeElectives:responseJson.freeElectives.map((crslst)=>{
              return crslst.map((crs)=>{
                return {
                  ...crs,
                  wishlist:false
                }
              })
            })
          }
        });
      }
      else{
        setStart(0)
      }
    }
      )
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(()=>{
    setCourseCat([...allCourses.proffessionalElectives.map((key,index)=>(`Professional Elective ${index+1}`)),...allCourses.freeElectives.map((key,index)=>(`Free Elective ${index+1}`))])
    setWishList1(Array(allCourses.proffessionalElectives.length).fill(null))
    setWishList2(Array(allCourses.freeElectives.length).fill(null))
    setProf(allCourses.proffessionalElectives)
    setFree(allCourses.freeElectives)    
  },[allCourses])
  useEffect(() => {
    if(courseCat.length)
      setElective(courseCat[0])
  }, [courseCat]);


  useEffect(()=>{
    let cs=[];
    if(elective.length){
      let index=parseInt(elective[elective.length-1])
      console.log(elective)
      if(elective[0]=='P'){
        cs=prof[index-1]
      }
      else{
        cs=free[index-1]
      }
    }
    if(cs){
      setCourses(cs)
    }

  },[elective,prof,free])
  // useEffect(()=>{
  //   let cs;
  //   if(elective.length==0){
  //     cs=[]
  //   }
  //   else{
  
  //     console.log(cs)
  //   }
  //   setCourses(cs)
  // },[elective])


  const toggle = (event) => {
    setElective(event.target.value);
  };

  React.useEffect(()=>{
    console.log(searchInput)
    const index=parseInt(elective[elective.length-1])-1
    if(elective[0]=='P'){
      if(prof.length){
        const updateCourse=prof[index].filter((obj)=>{
          const val=searchInput.toLowerCase()
          const checker1=obj.name.toLowerCase()
          const checker2=obj.faculty.toLowerCase()
          return (checker1.includes(val) || checker2.includes(val))
      })
      setCourses(updateCourse)
      }
        
    }
    else{
      if(free.length){
        const updateCourse=free[index].filter((obj)=>{
          const val=searchInput.toLowerCase()
          const checker1=obj.name.toLowerCase()
          const checker2=obj.faculty.toLowerCase()
          return (checker1.includes(val) || checker2.includes(val))
      })
      setCourses(updateCourse)
      }
      
    }
},[searchInput])
  


useEffect(() => {
  const token = sessionStorage.getItem("studentToken");
  const user = jwt_decode(token);

  fetch(`https://aems-api.onrender.com/api/student/${user.student_id}`)
    .then((response) => response.json())
    .then((responseJson) => {
      setStatus(responseJson.status)
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

//update allCourses and add to wishlist
  const addorRemoveToWishList = (id,elec) => {
    console.log(start)
    if(elec[0]=="P"){
      var crs=null
      var index=parseInt(elec[elec.length-1])-1
      
      let sel=prof[index].map((prev)=>{
        if (prev.id==id){
          if(!prev.wishlist){
            crs=prev
          }
          return {
            ...prev,
            wishlist:!prev.wishlist 
          }
        }
        else{
          return {
            ...prev,
            wishlist:false
          }
        }
      })
      console.log(sel)
      
      setProf((prev)=>{
        return [...prev.slice(0,index),sel,...prev.slice(index+1,prev.length)]
      })
      
      setWishList1((prev)=>{
        return [...prev.slice(0,index),crs,...prev.slice(index+1,prev.length)]
      })
      console.log(prof)
    }
    else{
      var crs=null
      var index=parseInt(elec[elec.length-1])-1
      
      let sel=free[index].map((prev)=>{
        if (prev.id==id){
          if(!prev.wishlist){
            crs=prev
          }
          return {
            ...prev,
            wishlist:!prev.wishlist 
          }
        }
        else{
          return {
            ...prev,
            wishlist:false
          }
        }
      })
      console.log(sel)
      
      setFree((prev)=>{
        return [...prev.slice(0,index),sel,...prev.slice(index+1,prev.length)]
      })
      
      setWishList2((prev)=>{
        return [...prev.slice(0,index),crs,...prev.slice(index+1,prev.length)]
      })
    }
    setSearchInput((prev)=>(""))
  };

  const searchFilter = (event) => {
    const changed = event.target.value;
    setSearchInput(changed);
  };
  const navigate=()=>{
    navigateTo("/student/myLearning")
  }

  const navBar = (
    <div className="fixed w-screen px-[35px] h-[62px] items-center bg-secondary-black flex justify-between">
      <div className="flex w-[308px] justify-between">
        <p className={`${(nav=="Courses")?"active":"inactive"} cursor-pointer`}>COURSES</p>
        <p onClick={navigate} className={`${(nav=="Learning")?"active":"inactive"} cursor-pointer`}>MY LEARNINGS</p>
      </div>
      <form className="flex" action="" method="POST">
        {status!="Enrolled"&&start==1&& <input
          value={searchInput}
          onChange={searchFilter}
          className=" bg-dark-grey rounded-[11px] w-[252px] placeholder-black h-[38px] mr-[30px]"
          placeholder="  Search . . ."
          type="text"
        ></input>}
        <img
          src={logoutImg}
          onClick={logout}
          className="cursor-pointer w-[20px] h-[20px] top-[7px] relative"
        />
      </form>
    </div>
  );
  async function submit (){
    const token = sessionStorage.getItem("studentToken");
    const user = jwt_decode(token);
    var ret=false
    wishList1.forEach((val)=>{
      if(val==null){
        ret=true;
      }
      
    })
    wishList2.forEach((val)=>{
      if(val==null){
        ret=true;
      }
      
    })
    
    if(ret){ 
        setError("Choose all electives")
        return
    }
    const wish1=wishList1.map((cs)=>{
      return cs.id
    })
    const wish2=wishList2.map((cs)=>{
      return cs.id
    })
    const student_id=user.student_id
    const response =await fetch(`https://aems-api.onrender.com/api/student/enroll`,{
            method: 'POST',
            headers:{ 
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                wish1,
                wish2,
                student_id
            }),
      })
      const data=await response.json()
      if(data.status=="success")
        setStatus("Enrolled")
    console.log(data)
  }
  return (
    <div className="overflow-hidden">
      {displayError && (
        <p className=" font-montserrat fixed z-10 bg-secondary px-3 py-4 left-[40%] top-[10%]">
         {error}
        </p>
      )}
      {navBar}
      {status!="Enrolled"&&start==1&& <Courses
        courseCat={courseCat}
        elective={elective}
        allCourses={courses}
        toggle={toggle}
        addorRemoveToWishList={addorRemoveToWishList}
      />}
      {status!="Enrolled"&&start==1&& <Wishlist
        elective={elective}
        credits={4}
        wishList1={wishList1}
        wishList2={wishList2}
        addorRemoveToWishList={addorRemoveToWishList}
        submit={submit}
      />}
      {(start==0)&&<img className="mt-4 w-[40%] mx-auto" src={Startgif}/>}
      {(start==0)&&<p className="text-center mt-4 text-[30px]">Course Registration Not Yet started</p>}
      {start!=0&&status=="Enrolled"&&<p className="text-[100px] mt-10">Registered Successfully :)</p>}
    </div>
  );
}
