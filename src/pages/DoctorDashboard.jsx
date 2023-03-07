import React from 'react'
import Header from '../Components/Header'

function DoctorDashboard() {
  return (
    <div>
        <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
        <h1>DoctorDashboard</h1>
    </div>
  )
}

export default DoctorDashboard