import React from 'react'
import Header from '../Components/Header'

function AdminDashbaord() {
  return (
    <div>
        <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
      <h1>
      AdminDashbaord
      </h1>
      </div>
  )
}

export default AdminDashbaord