import { useState } from 'react'
import './Index.css'
import Login from './components/login'
import Student from './student.jsx'
import OTP from "./components/otp.jsx"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Admin from './components/admin.jsx'
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/otp' element={<Login log="OTP"/>}/> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/student' element={<Student/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
