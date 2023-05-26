import React, {useState} from "react";
import IOT from "../assets/images/IOTimage.png";

import ExpandCard from "./expandCard";
import CompressCard from "./compressCard";


const CourseCard=(props)=>{
    const [expand,setExpand]=useState(false)
// const expand = true;
const toggle =()=>{
    setExpand((prev)=>(!prev))
}
    return (
        <>
        {expand ? (
            <ExpandCard 
                toggle={toggle} 
                updateWishlist={props.updateWishlist} 
                key={props.id} 
                id={props.id} 
                image={props.image} 
                rating={props.rating} 
                credit={props.credit} 
                wishlist={props.wishlist} 
                name={props.name} 
                faculty={props.faculty} 
                review={props.review} 
                remainingPlaces={props.remainingPlaces}
                duration={props.duration}
                venue={props.venue} 
                description={props.description}
                />
        ) : (
            <CompressCard
            toggle={toggle} 
            updateWishlist={props.updateWishlist} 
            key={props.id} 
            id={props.id} 
            image={props.image} 
            rating={props.rating} 
            credit={props.credit} 
            wishlist={props.wishlist} 
            name={props.name} 
            faculty={props.faculty} 
            review={props.review} 
            remainingPlaces={props.remainingPlaces}/>
        )}
        </>
    )     

}



export default CourseCard