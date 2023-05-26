import React, { useEffect } from "react";
import StudentNavbar from "./components/studentNavbar.jsx";
import Courses from "./components/courses.jsx";
import Wishlist from "./components/wishlist.jsx";
import ProfessionalElectives from "./assets/data/Professional-electives.json"
import FreeElectives from "./assets/data/Free-electives.json"
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

export default function student(){
    const navigateTo = useNavigate();
    useEffect(()=>{
        const token=sessionStorage.getItem('studentToken')
        if(token){
            
            const user=jwt_decode(token)
            console.log(user)
            if(!user){
                sessionStorage.removeItem('studentToken')
                console.log("hello mate")
                navigateTo('/login')
            }
        }
        else{
            navigateTo('/login')
        }
    },[])

   
    
    const logout = ()=>{
        sessionStorage.removeItem('studentToken')
        navigateTo('/login')
    }
    const [error, setError] = React.useState('');
    const [displayError, setDisplayError] = React.useState(false);

    React.useEffect(() => {
        if (error) {
        setDisplayError(true);

        const timeout = setTimeout(() => {
            setError('');
            setDisplayError(false);
        }, 1000);

        return () => clearTimeout(timeout);
        }
    }, [error]);
    const [searchInput,setSearchInput]=React.useState("")

        

    const [credits,setCredits]=React.useState([8,8])
    const [profElectives,setProfElectives]=React.useState(ProfessionalElectives)
    const [freeElectives,setFreeElectives]=React.useState(FreeElectives)

    
    const [allCourses,setAllCourses]=React.useState(profElectives)
    const [elective,setElective]=React.useState("Professional electives");
    

    React.useEffect(()=>{
        setAllCourses(freeElectives)
    },[freeElectives])
    React.useEffect(()=>{
        setAllCourses(profElectives)
    },[profElectives])
    useEffect(() => {
        fetch('https://aems-api.onrender.com/api/courses/professional')
       .then((response) => response.json())
       .then((responseJson) => {
        setProfElectives(responseJson.coursesList);
       })
       .catch((error) => {
         console.error(error);
       });
          }, []);
     useEffect(() => {
        fetch('https://aems-api.onrender.com/api/courses/free')
       .then((response) => response.json())
       .then((responseJson) => {
        setFreeElectives(responseJson.coursesList);
       })
       .catch((error) => {
         console.error(error);
       });
          }, []);
    const toggle=(event)=>{
        setElective(event.target.value);
        (elective !="Professional electives")?setAllCourses(profElectives):setAllCourses(freeElectives)
    }
    React.useEffect(()=>{
        console.log(searchInput)
        if(elective=="Professional electives"){
            const updateCourse=profElectives.filter((obj)=>{
                const val=searchInput.toLowerCase()
                const checker1=obj.name.toLowerCase()
                const checker2=obj.faculty.toLowerCase()
                return (checker1.includes(val) || checker2.includes(val))
            })
            setAllCourses(updateCourse)
        }
        else{
            const updateCourse=freeElectives.filter((obj)=>{
                const val=searchInput.toLowerCase()
                const checker1=obj.name.toLowerCase()
                const checker2=obj.faculty.toLowerCase()
                return (checker1.includes(val) || checker2.includes(val))
            })
            setAllCourses(updateCourse)
        }
    },[searchInput])
    const addorRemoveToWishList=(id)=>{
       
        if(elective=="Professional electives"){
            console.log("hello 1234")
            setProfElectives((prevCourses)=>{
               const updateCourses=prevCourses.map((obj)=>{
                if(obj.id==id){
                    if(!obj.wishlist && credits[0]>=obj.credit){
                        setCredits((credit)=>([credit[0]-obj.credit,credit[1]]))
                        return {...obj, wishlist:!obj.wishlist}
                    }
                    else if(obj.wishlist){
                        setCredits((credit)=>([credit[0]+obj.credit,credit[1]]))
                        return {...obj, wishlist:!obj.wishlist}
                    }
                    else{
                        setError("hello")
                    }
                }
                return obj
               })
               return updateCourses 
            })
            
        }
        else{
            console.log("hello 1234")
            setFreeElectives((prevCourses)=>{
               const updateCourses=prevCourses.map((obj)=>{
                if(obj.id==id){
                    if(!obj.wishlist && credits[1]>=obj.credit){
                        setCredits((credit)=>([credit[0],credit[1]-obj.credit]))
                        return {...obj, wishlist:!obj.wishlist}
                    }
                    else if(obj.wishlist){
                        setCredits((credit)=>([credit[0],credit[1]+obj.credit]))
                        return {...obj, wishlist:!obj.wishlist}
                    }
                    else{
                        setError("hello")
                    }
                }
                return obj
               })
               return updateCourses 
            })
        }
    }



    const searchFilter=(event)=>{
        const changed=(event.target.value)
        setSearchInput(changed);

    }
    return (
        <div className="overflow-hidden">
            {displayError && <p className=" font-montserrat fixed z-10 bg-secondary px-3 py-4 left-[40%] top-[10%]">Maximum credits reached!</p>}
            <StudentNavbar logout={logout} searchVal={searchInput} searchFilter={searchFilter}/>
            <Courses elective={elective} allCourses={allCourses} toggle={toggle}  addorRemoveToWishList={addorRemoveToWishList} />
            <Wishlist credits={(elective =="Professional electives")?credits[0]:credits[1]} allCourses={allCourses}  addorRemoveToWishList={addorRemoveToWishList}/>
        </div>
    )
}
