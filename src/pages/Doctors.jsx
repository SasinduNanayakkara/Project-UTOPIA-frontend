import React, { forwardRef, useEffect, useState } from 'react'
import Header from '../Components/Header'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import { baseUrl } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';

function Doctors() {

  const [Doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const hospitalID = location.state.hospitalID;
  console.log("hospitalID", hospitalID);
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  useEffect(() => {
		const authenticate = async () => {
			if (localStorage.getItem("role") === "admin") {
				return true;
			}
			else {
				alert("You are not authorized to view this page");
				navigate(-1);
			}
		}
		authenticate();
	});

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await axios.get(`${baseUrl}/doctor/hospital/${hospitalID}`);
        if (response.status === 200) {
          setDoctors(response.data);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    getDoctors();
  }, []);
  console.log(Doctors);

  const navigateToDoctorUpdate = (event, rowData) => {
    navigate('/updateDoctor', { state: { data: rowData, id: rowData._id, hospitalID: hospitalID } })
  }

  const navigateDoctorRegister = (e) => {
    navigate('/doctorRegister', { state: { hospitalID: hospitalID } })
  }

  const navigateToDoctorProfile = (event, rowData) => {
    navigate('/doctorProfile', { state: { data: rowData, ID: rowData._id, hospitalID: hospitalID } })
  }

  const DoctorFistName = <span className='font-bold'>Doctor First Name</span>
  const DoctorLastName = <span className='font-bold'>Doctor Last Name</span>
  const Specialization = <span className='font-bold'>Specialization</span>
  const Email = <span className='font-bold'>Email</span>

  return (
    <div>
      <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
      <h2 class="mb-10 mt-8 ml-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Doctors</h2>
      <div class="flex items-center justify-between mb-6">
                <button onClick={(e) => { navigateDoctorRegister(e) }} class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-16" type="button">
                  Add Doctors
                </button>
              </div>
      <div style={{ maxWidth: '90%' }} className="ml-16">
      <style>
    {`
      .MuiTableCell-head {
        font-size: 15px;
      }
    `}
  </style>
        <MaterialTable
          icons={tableIcons}
          columns={
            [
            { 
              title: DoctorFistName, field: 'first_name'
            },
            { 
              title: DoctorLastName, field: 'last_name' 
            },
            { 
              title: Specialization, field: 'specialization' 
            },
            { 
              title: Email, field: 'email' 
            },
          ]
        }
          data={Doctors}
          title="Doctors"
          actions={[
            {
              icon: () => (
                <span style={{color: '#1976d2', fontWeight: 'bold', fontSize: '14px'}}>View</span>
              ),
              tooltip: 'View Doctor',
              onClick: (event, rowData) => { navigateToDoctorProfile(event, rowData) }
            },
            {
              icon: () => (
                <span style={{color: '#72A400', fontWeight: 'bold', fontSize: '14px'}}>Edit</span>
              ),
              tooltip: 'Edit Doctor',
              onClick: (event, rowData) => { navigateToDoctorUpdate(event, rowData) }
            },
            {
              icon: () => (
                <span style={{color: '#f44336', fontWeight: 'bold', fontSize: '14px'}}>Delete</span>
              ),
              tooltip: 'Delete Hospital',
              onClick: (event, rowData) => { alert("You don't have permission to delete this Doctor") }
            }
          ]}
          options={{
            headerStyle: {
              backgroundColor: '#012c4f',
          color: '#FFF'
            },
            actionsColumnIndex: -1
          }}
        />
      </div>
    </div>
  )
}

export default Doctors