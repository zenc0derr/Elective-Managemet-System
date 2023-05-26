import React from "react";
import logout from '../assets/images/logoutw.png'
const StudentNavbar=(props)=>{
    
    return (
        <div className="fixed w-screen px-[35px] h-[62px] items-center bg-secondary-black flex justify-between">
            <div className="flex w-[308px] justify-between">
                <p className="active">COURSES</p>
                <p className="inactive">MY LEARNINGS</p>
            </div>
            <form className="flex" action="" method="POST">
                <input value={props.searchVal} onChange={props.searchFilter} className=" bg-dark-grey rounded-[11px] w-[252px] placeholder-black h-[38px] mr-[30px]" placeholder="  Search . . ." type="text"></input>
                <img src={logout} onClick={props.logout} className="cursor-pointer w-[20px] h-[20px] top-[7px] relative"/>
            </form>
            
        </div>
    );
}

export default StudentNavbar;