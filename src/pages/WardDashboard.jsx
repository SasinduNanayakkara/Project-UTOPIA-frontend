import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function WardDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const HospitalID = location.state.HospitalID;
    const wardID = location.state.wardID;
    const wardName = location.state.wardName;
    const no_of_beds = location.state.no_of_beds;

    const navigateToPatients = (e) => {
        navigate('/patients', { state: { wardID: wardID } })
    }

  return (
    <div>
        <h1>WardDashboard</h1>
        <h1>{wardName}</h1>
        <h1>{wardID}</h1>
        <button onClick={(e) => navigateToPatients(e)}>Patients</button>
        <br />
        <button onClick={(e) => navigateToPatients(e)}>Inventory</button>
        <br />  
        <button onClick={(e) => navigateToPatients(e)}>Nurse</button>

    </div>
  )
}

export default WardDashboard