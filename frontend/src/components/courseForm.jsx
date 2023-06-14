import React, { useState,useEffect } from 'react';
import AdminNav from './adminNavbar.jsx';
import AdminNavExpand from './adminNavExpand.jsx';
import {useNavigate,useLocation} from 'react-router-dom'
import jwt_decode from "jwt-decode";


const CourseForm = () => {
  const location = useLocation()
  var electiveRows={name:"",faculty:"",image:"",description:"",credit:"",total_seats:"",venue:"",short_form:"",id:"",duration:"",type:"",faculty:""}
  if(location.state){
    electiveRows  = location.state.studentElective;
  }
  const [name, setname] = useState((electiveRows)?electiveRows.name:"");
  const [faculty, setFaculty] = useState((electiveRows)?electiveRows.faculty:"");
  const [image_id, setImage_id] = useState((electiveRows)?electiveRows.image:"");
  const [description, setDescription] = useState((electiveRows)?electiveRows.description:"");
  const [credit, setCredit] = useState((electiveRows)?electiveRows.credit:"");
  const [total_seats, settotal_seats] = useState((electiveRows)?electiveRows.total_seats:"");
  const [venue, setVenue] = useState((electiveRows)?electiveRows.venue:"");
  const [short_form, setShortForm] = useState((electiveRows)?electiveRows.short_form:"");
  const [id, setId] = useState((electiveRows)?electiveRows.id:"");
  const [duration, setDuration] = useState((electiveRows)?electiveRows.duration:"");
  const [type,setType] = useState((electiveRows)?electiveRows.type:"");
  const [faculty_id,setFacultyId]=useState((electiveRows)?electiveRows.faculty:"");

  
 
  async function handleSubmit(e){

  
    e.preventDefault();
    const response =await fetch(`https://aems-api.onrender.com/api/courses`,{
            method: 'POST',
            headers:{ 
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                name,
                faculty,
                image_id,
                description,
                credit,
                total_seats,
                venue,
                short_form,
                id,
                duration,
                type,
                faculty_id
            }),
      })
      const data=await response.json()
      if(data){
        window.location.href='/admin/course'
      }
    // Handle form submission here
    // You can access all the form values from the state variables
  };
const navigate=useNavigate()
    const [active,setActive]=React.useState("courses")
    const [size,setSize]=React.useState(true)
    const toggleNav=(curr)=>{
        navigate(`/admin/${curr}`)
    }
    const logout = () => {
      sessionStorage.removeItem("adminToken");
      navigateTo("/login");
    };
    const toggleSize=()=>{
        setSize((prev)=>(!prev))
    }
    const navigateTo = useNavigate();
    useEffect(()=>{
        const token=sessionStorage.getItem('adminToken')
        if(token){
            
            const user=jwt_decode(token)
            console.log(user)
            if(!user){
                sessionStorage.removeItem('adminToken')
                console.log("hello mate")
                navigateTo('/login')
            }
        }
        else{
            navigateTo('/login')
        }
    },[])
    const navbar=(size)?(<AdminNav active={active} toggleNav={toggleNav} logout={logout} toggleSize={toggleSize}/>):( <AdminNavExpand active={active} toggleNav={toggleNav} logout={logout} toggleSize={toggleSize}/>)
    return (
        <>
        {navbar}
        <div className={`absolute right-0 ${(size)?"w-[96%]":"w-[85%]"}`}>
        <div className="w-[80%] mx-auto p-8 border-2 rounded-md mt-8 border-grey">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
              Course Name
            </label>
            <input
              name="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="faculty">
              Faculty
            </label>
            <input
              name="faculty"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              id="faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="faculty">
              Faculty_id
            </label>
            <input
              name="faculty"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              id="faculty"
              value={faculty_id}
              onChange={(e) => setFacultyId(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="image_id">
              Image_id
            </label>
            <input
              name="image_id_id"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              id="image_id"
              value={image_id}
              onChange={(e) => setImage_id(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="credit">
              Credit
            </label>
            <input
              name="credit"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              id="credit"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="total_seats">
              Total Capacity
            </label>
            <input
              name="total_seats"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="number"
              id="total_seats"
              value={total_seats}
              onChange={(e) => settotal_seats(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="venue">
              Venue
            </label>
            <input
              name="venue"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              id="venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="venue">
              Course ID
            </label>
            <input
              name="course_id"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              id="venue"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="venue">
              ShortForm
            </label>
            <input
              name="short_form"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              id="venue"
              value={short_form}
              onChange={(e) => setShortForm(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="venue">
              Duration
            </label>
            <input
              name="short_form"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="number"
              id="venue"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="venue">
              Type
            </label>
            <input
              name="type"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              id="venue"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
        </div>
        

        <button
          className="text-black shadow-md w-full px-4 py-2  bg-primary rounded-md hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
        </div>
        </>

    )
};

export default CourseForm;
