import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function HospitalDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const name = location.state.name;
    const id = location.state.id;
    const locationData = location.state.location;

    const addWard = (e) => {
        navigate('/wardRegister', { state: { hospitalId: id } })
    }

  return (
    <div>
        <h1>HospitalDashboard</h1>
        <h1>{name}</h1>
        <h1>{locationData}</h1>
        <h1>{id}</h1>
        <button onClick={(e) => addWard(e)}>add ward</button>
    </div>
  )
}

export default HospitalDashboard