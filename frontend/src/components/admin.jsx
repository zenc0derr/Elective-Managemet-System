import React from "react";
import {useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

export default function ad(){
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

    return (<h1>Hello World</h1>)
}



