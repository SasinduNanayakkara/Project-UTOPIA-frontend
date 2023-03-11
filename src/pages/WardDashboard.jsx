import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function WardDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const HospitalID = location.state.HospitalID;
    const wardID = location.state.wardID;
    const wardName = location.state.wardName;
    const no_of_beds = location.state.no_of_beds;
    console.log("ward", wardID);
    console.log("hospital ID", HospitalID);
    const navigateToPatients = (e) => {
        navigate('/patients', { state: { wardID: wardID } });
    }
    const navigateToNurses = (e) => {
      navigate('/nurses', { state: { wardID: wardID, HospitalID: HospitalID } });
  }

  const navigateToInventory = (e) => {
    navigate('/inventories', { state: { wardID: wardID } });
  }
  const navigateToMedicine = (e) => {
    navigate('/medicines', { state: { wardID: wardID } });
  }

  return (
    <div>
        <h1>WardDashboard</h1>
        <h1>{wardName}</h1>
        <h1>{wardID}</h1>
        <button onClick={(e) => navigateToPatients(e)}>Patients</button>
        <br />
        <button onClick={(e) => navigateToInventory(e)}>Inventory</button>
        <br />  
        <button onClick={(e) => navigateToNurses(e)}>Nurse</button>
        <br />
        <button onClick={(e) => navigateToMedicine(e)}>Medicine</button>
    </div>
  )
}

export default WardDashboard