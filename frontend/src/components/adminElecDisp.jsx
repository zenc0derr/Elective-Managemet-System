import React from "react";
import { useState,useEffect } from "react";

import check from "../assets/images/check.svg"


const AdminElecDisp=(props)=>{
    const profCourses=props.prof.map((cs,index)=>{
       const colour=`bg-[${props.colour[index%7]}]`;
       console.log(colour)
       const cl="bg-[#6da0f8] bg-[#fbacf1] bg-[#c7f976]  bg-[#dce75f] bg-[#79d8b0] bg-[#7971d6] bg-[#d879d0] "
       return (cs.map((key)=>{
        return( 
            <div className=" mt-6 w-[80%] rounded-[20px] h-[83px] mx-auto bg-secondary flex items-center justify-between px-[6%]">

                    <p className="w-[30%] inline text-[20px]">{key.name}</p>
                    <p className="text-[20px] px-[43px] py-[7px] bg-primary rounded-[14px]">{key.faculty}</p>
                    <p className={`text-[20px] px-[43px] py-[7px] ${colour} rounded-[14px]`}>PE{index+1}</p>
            </div>
            )
       }))
    })
    const freeCourses=props.free.map((cs,index)=>{
        const colour=props.colour[6-(index%7)];
        return (cs.map((key)=>{
         return( 
             <div className=" mt-6 w-[80%] rounded-[20px] h-[83px] mx-auto bg-secondary flex items-center justify-between px-[6%]">

                     <p className="w-[30%] inline text-[20px]">{key.name}</p>
                     <p className="text-[20px] px-[43px] py-[7px] bg-primary rounded-[14px]">{key.faculty}</p>
                     <p className={`text-[20px] px-[43px] py-[7px] bg-[${colour}] rounded-[14px]`}>FE{index+1}</p>
             </div>
             )
        }))
     })
    

    return (
        <div className="">
            <div className="flex justify-between items-center mr-6">
                <p className="w-[15%] ml-[86px] mt-[38px] font-bold text-[20px] mb-[43px]">Selected Courses</p>
            </div>
            {profCourses}
            {freeCourses}
        </div>
    )
}

export default AdminElecDisp
