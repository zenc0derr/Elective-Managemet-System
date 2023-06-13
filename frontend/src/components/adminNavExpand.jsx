import React from 'react'
import minimize from '../assets/images/minimize-y.svg'
import home from '../assets/images/home.svg'
import homeSelected from '../assets/images/home-selected.svg'
import student from '../assets/images/student.svg'
import studentSelected from '../assets/images/student-selected.svg'
import courses from '../assets/images/courses.svg'
import coursesSelected from '../assets/images/courses-selected.svg'
import logout from '../assets/images/arrow-right-on-rectangle.svg'
import {useNavigate} from 'react-router-dom'
const AdminNavbar =(props)=>{
    const navigate=useNavigate()
    const [active,setActive]=React.useState("home")
    const toggleNav=(curr)=>{

        setActive(curr)
        console.log(curr)
        navigate(`/admin/${curr}`)
    }
    return (
        <div className="fixed h-screen w-[180px] bg-secondary-black">
            <img onClick={props.toggleSize} className="ml-[80%] py-[20px] cursor-pointer" src={minimize}/>
            
            <p onClick={()=>props.toggleNav("home")}  className={`cursor-pointer mt-[235px] py-[5px] rounded-[2px] text-center  ${props.active=="home"?"border-l-2 border-primary activeLarge text-primary":"text-secondary"}`}>HOME</p>
            <p onClick={()=>props.toggleNav("student")}  className={`cursor-pointer mt-[30px] py-[5px] rounded-[2px] text-center  ${props.active=="student"?"border-l-2 border-primary activeLarge text-primary":"text-secondary"}`}>STUDENTS</p>
            <p onClick={()=>props.toggleNav("schedule")}  className={`cursor-pointer mt-[30px] py-[5px] rounded-[2px] text-center  ${props.active=="schedule"?"border-l-2 border-primary activeLarge text-primary":"text-secondary"}`}>SCHEDULE</p>
            <p onClick={()=>props.toggleNav("courses")} className={`cursor-pointer mt-[27px] py-[5px] rounded-[2px] text-center  ${props.active=="courses"?"border-l-2 border-primary activeLarge text-primary":"text-secondary"}`}>COURSES</p>
            <p onClick={props.logout} className={`mt-[35px] py-[5px] rounded-[2px] text-center text-secondary`}>LOGOUT</p>
        </div>
    )
}

export default AdminNavbar