import React from "react"

const LoginDetails=()=>{
    const [user,setUser]=React.useState("student")
    const [id,setStudentId]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [error,setError]=React.useState("")
    async function loginUser(event){
        console.log(user)
        event.preventDefault()
        const response =await fetch(`https://aems-api.onrender.com/api/signin/${user}`,{
            method: 'POST',
            headers:{ 
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                id,
                password,
            }),
        })
        const data=await response.json()
        console.log(data)
        if (data.user && user!='admin'){
            sessionStorage.setItem('studentToken', data.user)
            window.location.href='/student'
        }else if(data.user){
            console.log("hello")
            window.location.href='/otp'
        }
        else{
            setError("*password or Id is incorrect")
        }
        
    }
    var p="Enter your full roll number and cms password"
    var placeholder="roll number"
    if(user=="student"){
        p="Enter your full roll number and cms password"
        placeholder="roll number"
    }
    else if(user=="faculty"){
        p="Enter your ID number and password"
        placeholder="Faculty Id"
    }
    else{
        p="Enter your ID number and password"
        placeholder="Admin ID"
    }
    const toggle=(event)=>{
        setUser(event.target.value)
    }
    
    return (
        <div className="bg-secondary w-[450px] h-[583px] relative">
             <select className=" h-[25px] bg-[#000000] rounded-[15px] px-[15px] absolute right-[12px] top-[15px] text-secondary" value={user} onChange={toggle}>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
            </select>
            <p className="text-black font-semibold text-[46px] pt-[40px] pl-[55px] ">LOG<span className="text-primary">IN</span></p>
            <p className="text-[15px] pl-[55px] pt-[21px] inline-block w-[330px]">{p}</p>
            <form onSubmit={loginUser} className="mt-[56px]" >
                <input className=" block w-[284px] h-[38px] rounded-[18px] mx-auto px-5 shadow-norm" type="text" name="user" value={id} onChange={(e)=>setStudentId(e.target.value)} placeholder={placeholder}/>
                <input className="focus:ring-0 focus:border-transparent block w-[284px] h-[38px] rounded-[18px] mx-auto mt-[35px] px-5 shadow-norm" type="password" name="user" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <label className="text-red-500 mt-[20px] absolute left-[30%] text-center">{error}</label>
                <button className="mt-[75px] w-[126px] h-[42px] bg-primary font-semibold text-[18px] rounded-[10px] mx-auto block" type="submit">Log in</button>
            </form>
           

        </div>
    )
}

export default LoginDetails