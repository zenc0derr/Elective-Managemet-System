import React from "react"
import remove from "../assets/images/remove.svg"
const WishCourse=(props)=>{
    return (
        <div className="mx-2 relative my-3">
            <img onClick={()=>{props.addorRemoveToWishList(props.id,props.elective)}} src={remove} className="cursor-pointer inline-block"/>
            <p className="bg-white py-[8px] ml-2 px-2 w-[260px] inline-block border-2 border-black rounded-[48px]">{props.name}</p>
            <p className="py-[8px] px-[16px] right-[5px] border-[2px] border-black absolute bg-primary text-black rounded-[48px] inline">{props.elective}</p>
        </div>
    )
}

export default WishCourse