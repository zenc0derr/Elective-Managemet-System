import React from "react"
import illustration from '../assets/images/illustration.svg'
import pattern1 from '../assets/images/pattern1.svg'
import pattern3 from '../assets/images/pattern3.svg'
import LoginDetails from "./loginDetails"
import OTP from "./otp.jsx"

const Login =(props) =>{

    return (
        
        <div className="bg-primary w-screen h-screen">
            <img src={pattern1} className='inline-block absolute top-0 right-[0px] w-[290px]'/>
            <img src={illustration} className='w-[615px]  inline-block absolute right-[112px] bottom-0'/>
            <div className="absolute left-[280px] top-[100px]">{props.log=="OTP"?<OTP/>:<LoginDetails/>}</div>
            <img src={pattern3} className='w-[201px]  inline-block absolute right-[670px] bottom-[99px]'/>
        </div>
    )
}

export default Login

