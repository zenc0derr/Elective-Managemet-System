import { useState } from 'react'
import './Index.css'
import Login from './components/login'
import Student from './student.jsx'
import OTP from "./components/otp.jsx"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CourseForm from './components/courseForm.jsx'
import AdminStu from './components/adminStudent.jsx'
import AdminHome from './components/adminHome.jsx'
import AdminElective from './components/adminElec.jsx'
import AdminElecDesc from './components/adminElecDesc.jsx'
import AdminNavbar from './components/adminNavbar'
import AdminSchedule from './components/adminSchedule'
import MyLearning from './components/myLearnings'
function App() {
  

  return (
      <Routes>
      <Route path='/otp' element={<Login log="OTP"/>}/> 
      <Route path='/login' index element={<Login/>}/>
      <Route path='/student' element={<Student/>}/>
      <Route path='/student/myLearning' element={<MyLearning/>}/>

        <Route path='/admin/home' element={<AdminHome/>}/>
        <Route path='/admin/courses' element={<AdminElective/>}/>
        <Route path='/admin/student' element={<AdminStu/>}/>
        <Route path='/admin/courses/view' element={<AdminElecDesc/>}/>
        <Route path='/admin/addCourse' element={<CourseForm/>}/>
        <Route path='/admin/schedule' element={<AdminSchedule/>}/>
      </Routes>
  )
}

export default App
