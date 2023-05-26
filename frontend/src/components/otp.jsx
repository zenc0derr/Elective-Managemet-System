import React from "react"

const LoginDetails=()=>{
    const [error,setError]=React.useState("")
    const [OTP1,setOTP1]=React.useState("")
    const [OTP2,setOTP2]=React.useState("")
    const [OTP3,setOTP3]=React.useState("")
    const [OTP4,setOTP4]=React.useState("")
    const makeOTP=(event,ind)=>{
        if(ind==1)
        setOTP1(event.target.value)
        else if(ind==2)
        setOTP2(event.target.value)
        else if(ind==3)
        setOTP3(event.target.value)
        else
        setOTP4(event.target.value)
    }

    async function loginUser(event){
        event.preventDefault()
        const otp=OTP1+OTP2+OTP3+OTP4
        const response =await fetch(`https://aems-api.onrender.com/api/signin/otp`,{
            method: 'POST',
            headers:{ 
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                otp,
            }),
        })
        const data=await response.json()
        console.log(data)
        if (data.user){
            sessionStorage.setItem('adminToken', data.user)
            window.location.href='/admin'
        }
        else{
            setError("*Wrong OTP")
        }
        
    }
    var p="OTP will be sent to your email ID"

    
    return (
        <div className="bg-secondary w-[450px] h-[583px] relative">
            <p className=" h-[25px] bg-[#000000] rounded-[15px] px-[15px] absolute right-[12px] top-[15px] text-secondary">Admin</p>
            <p className="text-black font-semibold text-[46px] pt-[40px] pl-[55px] ">OTP</p>
            <p className="text-[15px] pl-[55px] pt-[21px] inline-block w-[330px]">{p}</p>
            <form onSubmit={loginUser} className="mt-[56px]" >
            <div className="relative left-28 flex justify-between items-center w-[200px]">
                <input className="w-[40px] h-[40px] text-center text-[20px] border-[1px] rounded-[5px]" value={OTP1} onChange={(event)=>makeOTP(event,1)} type="text" maxLength="1" />
                <input className="w-[40px] h-[40px] text-center text-[20px] border-[1px] rounded-[5px]" value={OTP2} onChange={(event)=>makeOTP(event,2)} type="text" maxLength="1" />
                <input className="w-[40px] h-[40px] text-center text-[20px] border-[1px] rounded-[5px]" value={OTP3} onChange={(event)=>makeOTP(event,3)} type="text" maxLength="1" />
                <input className="w-[40px] h-[40px] text-center text-[20px] border-[1px] rounded-[5px]" value={OTP4} onChange={(event)=>makeOTP(event,4)} type="text" maxLength="1" />
            </div>
                <label className="text-red-500 mt-[20px] absolute left-[30%] text-center">{error}</label>
                <button className="mt-[75px] w-[126px] h-[42px] bg-primary font-semibold text-[18px] rounded-[10px] mx-auto block" type="submit">Log in</button>
            </form>
           

        </div>
    )
}

export default LoginDetails


