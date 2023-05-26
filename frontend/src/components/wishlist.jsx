import React from 'react';
import WishCourse from "./wishCourse.jsx"
const Wishlist=(props)=>{
    var wishCrs=props.allCourses.filter((obj)=>obj.wishlist)
    wishCrs=wishCrs.map((obj)=>{
        return(
            <WishCourse id={obj.id} addorRemoveToWishList={props.addorRemoveToWishList} key={obj.id} name={obj.name} credit={obj.credit}/>
        )
    })
    return (
        <div className="fixed top-[62px] right-0 h-screen w-[300px] bg-secondary">
            <p className="inline-block mt-[31px] ml-[28px] py-[6px] px-[8px] border-[1px] border-black">Wishlist</p>
            <p className="right-4 top-[40px] inline-block absolute text-[12px] font-semibold">{`Remaining Credits : ${props.credits}`}</p>
            <div className="relative top-[70px]">
                {wishCrs}
                <p className="mt-[40px] inline-block mx-[70px] bg-primary shadow-sm py-[5px] px-[40px] rounded-[25px]">Enroll Now</p>
            </div>
            
            
        </div>
    )
}

export default Wishlist;

