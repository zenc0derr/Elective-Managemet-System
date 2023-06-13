import React from 'react';
import CourseCard from "./CourseCard.jsx"


const Courses = (props)=>{
    
    const CourseList=props.allCourses.map((course)=>{
        console.log(course);
        return (<CourseCard 
                    updateWishlist={props.addorRemoveToWishList} 
                    key={course.id} 
                    id={course.id} 
                    image={course.image} 
                    rating={course.rating} 
                    credit={course.credit} 
                    wishlist={course.wishlist} 
                    name={course.name} 
                    faculty={course.faculty} 
                    review={course.review} 
                    remainingPlaces={course.remainingPlaces} 
                    duration={course.duration}
                    venue={course.venue} 
                    description={course.description}
                />)
    })
    return (
        <div className="absolute top-[62px] w-[1050px] scrollbar-hide"> 
        <div className="fixed bg-white w-screen h-[80px]">
            <select className="mt-[31px] ml-[28px] py-[6px] px-[8px] border-[1px] border-black" value={props.elective} onChange={props.toggle}>
                <option value="Professional electives">Professional electives</option>
                <option value="Free electives">Free electives</option>
            </select>
        </div>
           
        <div className="-z-10 absolute top-[100px] mx-8 my-8 grid grid-cols-4 gap-x-[11.5rem] gap-y-[4rem]">{CourseList}</div>
            
        </div>
    )
} 


export default Courses;