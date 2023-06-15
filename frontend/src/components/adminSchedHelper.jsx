import React from "react";
import { useState,useEffect } from "react";
import DateTime from './dateTime.jsx'

const AdminSchedHelper=(props)=>{

    const cl="bg-[#6da0f8] bg-[#fbacf1] bg-[#c7f976]  bg-[#dce75f] bg-[#79d8b0] bg-[#7971d6] bg-[#d879d0] "
    const Profcourse=props.prof.map((key,index)=>{
        const colour=`bg-[${props.colour[index%7]}]`
        return (<p key={index} className={`block cursor-pointer w-[47%] py-[10px] m-2 ${colour} text-center rounded-lg hover:bg-red-400`} onClick={()=>{props.edit(index,"Prof")}}>Proffessional Elective {index+1}</p>)
    })
    const Freecourse=props.free.map((key,index)=>{
        const colour=`bg-[${props.colour[6-(index%7)]}]`
        return (<p key={index} className={`block cursor-pointer w-[47%] py-[10px] m-2 hover:bg-red-400 ${colour} text-center rounded-lg`} onClick={()=>{props.edit(index,"Free")}}>Free Elective {index+1}</p>)
    })

  
    return (
        <>
        <p className="mt-[41px] text-[20px] font-semibold ml-[23px] text-center"><span className=" text-dark-grey">Schedule</span> Course Registration</p>
        <p className="mt-8 text-[19px] ml-4 font-semibold">Course Categories</p>
        <div className="flex flex-wrap mt-3 mb-5">
            {Profcourse}
        </div>

        <div className="flex flex-wrap">
            {Freecourse}
        </div>

        
        {(!props.addCat)?(<button className="mx-auto block p-4 bg-black mt-5 rounded-md text-primary font-semibold" onClick={props.addCourseCat}>Add Category</button>):(<button onClick={props.addCourseCat} className="mx-auto block p-4 bg-black mt-5 rounded-md text-primary font-semibold" >Done.</button>)}
        
      <hr className="w-[40%] text-dark-grey mx-auto my-[100px]"/>

      <DateTime startRegistration={props.startRegistration}/>
        </>
    )
}

export default AdminSchedHelper


