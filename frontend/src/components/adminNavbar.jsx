import React from 'react'
import menu from '../assets/images/menu.svg'
import home from '../assets/images/home.svg'
import homeSelected from '../assets/images/home-selected.svg'
import student from '../assets/images/student.svg'
import studentSelected from '../assets/images/student-selected.svg'
import courses from '../assets/images/courses.svg'
import coursesSelected from '../assets/images/courses-selected.svg'
import logout from '../assets/images/arrow-right-on-rectangle.svg'
import schedule from '../assets/images/clock.svg'
import scheduleSelected from '../assets/images/clock-selected.svg'

const AdminNavbar =(props)=>{
    
    return (
        <div className="fixed h-screen w-[58px] bg-secondary-black">
            <img onClick={props.toggleSize} className="mx-auto py-[22px] cursor-pointer" src={menu}/>
            
            <img onClick={()=>props.toggleNav("home")} src={props.active=="home"?homeSelected:home} className={`cursor-pointer mt-[238px] py-2 rounded-[2px] mx-auto  ${props.active=="home"?"w-[49px] activeAdmin":"w-[20px]"}`}/>
            <img onClick={()=>props.toggleNav("student")} src={props.active=="student"?studentSelected:student} className={`cursor-pointer  0py-2 rounded-[2px] mx-auto  ${props.active=="student"?"my-[27px] w-[49px] py-[8px] activeAdmin":"my-[35px] w-[20px]"}`}/>
            <img onClick={()=>props.toggleNav("schedule")} src={props.active=="schedule"?scheduleSelected:schedule} className={`cursor-pointer  0py-2 rounded-[2px] mx-auto  ${props.active=="schedule"?"my-[27px] w-[49px] py-[8px] activeAdmin":"my-[35px] w-[20px]"}`}/>
            <img onClick={()=>props.toggleNav("courses")} src={props.active=="courses"?coursesSelected:courses} className={`cursor-pointer py-2 rounded-[2px] mx-auto  ${props.active=="courses"?"w-[49px] activeAdmin":"w-[20px]"}`}/>
            <img onClick={props.logout} src={logout} className={`cursor-pointer mt-[35px] py-2 rounded-[2px] mx-auto w-[20px] `}/>
        </div>
    )
}

export default AdminNavbar