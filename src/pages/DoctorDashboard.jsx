import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header'

function DoctorDashboard() {
  const navigate = useNavigate();
  console.log("ID", localStorage.getItem("ID"));

  const navigateToDoctorUpdate = (e) => {
    navigate('/updateDoctor', { state: { ID: localStorage.getItem("ID") } });
  }

  return (
    <div>
        <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
        <h1>DoctorDashboard</h1>
        <h1>{localStorage.getItem("username")}</h1>
        <button onClick={(e) => navigateToDoctorUpdate(e)}>Update doctor</button>
    </div>
  )
}

export default DoctorDashboard