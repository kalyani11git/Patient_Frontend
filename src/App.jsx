import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import './App.css'
import RegistrationForm from './components/Registration'
import Login from './components/Login'

function App() {
  

  return (
   <>
   <RegistrationForm/>
   {/* <Login/> */}
   <ToastContainer/>
   </>
  )
}

export default App
