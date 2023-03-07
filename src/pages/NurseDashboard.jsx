import React from 'react'
import Header from '../Components/Header'

function NurseDashboard() {
  return (
    <div>
        <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
      <h1>
      NurseDashboard
      </h1>
      </div>
  )
}

export default NurseDashboard