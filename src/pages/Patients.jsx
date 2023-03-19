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

function Patients() {

  const [Patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const wardID = location.state.wardID;
  const HospitalID = location.state.HospitalID;
  console.log(wardID);
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
			if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "ward manager" || localStorage.getItem("role") === "doctor" || localStorage.getItem("role") === "nurse") {
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
    const getPatients = async () => {
      try {
        const response = await axios.get(`${baseUrl}/patient/ward/${wardID}`);
        if (response.status === 200) {
          console.log(response.data);
          response.data.forEach(element => {
            if (element.admit_date) {
              console.log(element.admit_date);
              element.admit_date = element.admit_date.substring(0, 10);
            }
          });
          setPatients(response.data);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    getPatients();
  }, []);
  console.log("wardID", wardID);
  console.log("HospitalID", HospitalID);

  const navigateToWard = (event, rowData) => {
    navigate('/patientProfile', { state: { wardID: wardID, HospitalID: HospitalID, ID: rowData._id } })
  }

  const navigatePatientRegister = (e) => {
    navigate('/patientRegister', { state: { wardID: wardID, HospitalID: HospitalID } })
  }

  const navigateToPatientUpdate = (event, rowData) => {
    navigate('/patientUpdate', { state: { wardID: wardID, patientID: rowData._id, HospitalID: HospitalID } })
  }
  const PatientTitle = <span className='font-bold'>Patient Name</span>
  const status = <span className='font-bold'>Status</span>
  const AdmitDate = <span className='font-bold'>Admit Date</span>
  const Address = <span className='font-bold'>Address</span>
  const NIC = <span className='font-bold'>NIC</span>
  const PhoneNumber = <span className='font-bold'>Phone Number</span>

  const ViewText = localStorage.getItem("role") === "ward manager" || localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "doctor" ? (
    <span style={{ color: '#1976d2', fontWeight: 'bold', fontSize: '14px' }}>View</span>

  ) : (
    <span style={{ color: '#1976d2', fontWeight: 'bold', fontSize: '14px' }}></span>
  );

  const EditText = localStorage.getItem("role") === "ward manager" || localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "doctor" ? (
    <span style={{ color: '#72A400', fontWeight: 'bold', fontSize: '14px' }}>Edit</span>

  ) : (
    <span style={{ color: '#1976d2', fontWeight: 'bold', fontSize: '14px' }}></span>
  );

  const DeleteText = localStorage.getItem("role") === "ward manager" || localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "doctor" ? (
    <span style={{ color: '#f44336', fontWeight: 'bold', fontSize: '14px' }}>Delete</span>

  ) : (
    <span style={{ color: '#1976d2', fontWeight: 'bold', fontSize: '14px' }}></span>
  );

  return (
    <div>
      <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
      <h2 class="mb-10 mt-8 ml-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Patients</h2>
      <div class="flex items-center justify-between mb-6">
        {
          localStorage.getItem("role") === "ward manager" || localStorage.getItem("role") === "admin" ? (
            <button onClick={(e) => { navigatePatientRegister(e) }} class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-16" type="button">
              Add Patient
            </button>
          ) : (
            <div></div>
          )
        }
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
          columns={[
            { title: PatientTitle, field: 'name' },
            { title: status, field: 'status' },
            { title: AdmitDate, field: 'admit_date' },
            { title: Address, field: 'address' },
            { title: NIC, field: 'NIC' },
            { title: PhoneNumber, field: 'phone' },


          ]}
          data={Patients}
          title="Patients"
          actions={[
            {
              icon: () => (
                ViewText
              ),
              tooltip: 'View Patient',
              onClick: (event, rowData) => { navigateToWard(event, rowData) }
            },
            {
              icon: () => (
                EditText
              ),
              tooltip: 'Edit Patient',
              onClick: (event, rowData) => { navigateToPatientUpdate(event, rowData) }
            },
            {
              icon: () => (
                DeleteText
              ),
              tooltip: 'Delete Patient',
              onClick: (event, rowData) => { alert("Sorry, You can't delete this patient") }
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

export default Patients