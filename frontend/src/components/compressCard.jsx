import React from 'react';
import star from "../assets/images/star.svg";
const CompressCard=(props)=>{
    // const gridId=(props.id%4==0)?"col-start-3 row-start-1":""
    return (
        <div className={` rounded-lg w-[247.25px] shadow-[0px_4px_14px_rgba(0,0,0,0.25)]`}>
 
        <img onClick={props.toggle} className="w-[248px] h-[151px] rounded-lg cursor-pointer inline" src={props.image}/>
        <div className="mt-[5.5px] mx-[10px] flex justify-between ">
            <div className="inline-block">
                <img className=" inline" src={star}/>
                <p className="relative inline-block top-[2px] font-semibold text-[11px] mx-[6.3px] ">{props.rating}</p>
            </div>
            <div>
            <p className="inline font-medium text-[10px] ">{`${props.credit} credits`}</p>
            </div>
            

        </div>
        <p className="ml-[10px] block text-[15px] font-bold">{props.name}</p>
        <p className="ml-[102px] text-[9px] font-medium">{`by ${props.faculty}`}</p>

        <div className="flex justify-between mb-3 mx-[16px] pb-[5px]">
            <p onClick={()=>{props.updateWishlist(props.id,props.elective)}} className="cursor-pointer text-center bg-primary rounded-[52px] px-[12px] py-[3px] text-[12px] border-2 border-black font-semibold mt-[20px]">{(props.wishlist?"Remove Course":"Add Course")}</p>
            <p className="relative top-[30px] inline-block text-dark-grey text-[10px] ">{`${props.remainingPlaces} places left`}</p>
        </div>
        
        </div> 
)
}

export default CompressCard

