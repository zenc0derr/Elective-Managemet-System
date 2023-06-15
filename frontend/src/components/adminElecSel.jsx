import React from "react";
import { useState,useEffect } from "react";

import check from "../assets/images/check.svg"
import { idID } from "@mui/material/locale";


const AdminElecSel=(props)=>{
    const courses=props.course.map((cs,id)=>{
        const sel=(cs.sel)?<img onClick={()=>{props.addcourse(cs.id)}} src={check} className="bg-black rounded-[8px] p-[5px] inline"/>:<div onClick={()=>props.addcourse(cs.id)} className="w-[23px] h-[23px] rounded-[8px] border-2 border-black"></div>
        return( 
        <div key={id} className=" mt-6 w-[80%] rounded-[20px] h-[83px] mx-auto bg-secondary flex items-center justify-between px-[6%]">
                {sel}
                <p className="w-[30%] inline text-[20px]">{cs.name}</p>
                <p className="text-[20px] px-[43px] py-[7px] bg-primary rounded-[14px]">{cs.faculty}</p>
                <p className="text-[20px]">{cs.remaining_seats}</p>
        </div>
        )
    })
    
    return (
        <div className="">
            <div className="flex justify-between items-center mr-6">
                <p className="w-[15%] ml-[86px] mt-[38px] font-bold text-[20px] mb-[43px]">Choose Courses</p>
                <select className="py-[6px] px-[8px] border-[1px] border-black" value={props.elective} onChange={props.toggle}>
                    <option value="Professional electives">Professional electives</option>
                    <option value="Free electives">Free electives</option>
                </select>
            </div>
            {courses}
        </div>
    )
}

export default AdminElecSel
