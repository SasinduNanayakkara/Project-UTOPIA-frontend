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
import ExitToApp from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { baseUrl } from '../App';
import { useNavigate } from 'react-router-dom';


function Hospitals() {

  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();
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
			if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "night in charge") {
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
    const getHospitals = async () => {
      try {
        const response = await axios.get(`${baseUrl}/hospital`);
        if (response.status === 200) {
          setHospitals(response.data);
        }
      }
      catch (error) {
        alert(error)
      }
    }
    getHospitals();
  }, []);
  console.log(hospitals);

  const navigateToHospital = (event, rowData) => {
    navigate('/hospitalDashboard', { state: { name: rowData.name, location: rowData.location, id: rowData._id } })
  }

  const navigateHospitalRegister = (e) => {
    navigate('/hospitalRegister')
  }

  const HospitalName = <span className='font-bold'>Hospital Name</span>
  const Location = <span className='font-bold'>Location</span>
  const EditAction = localStorage.getItem("role") === "admin" ? (<span style={{ color: '#72A400', fontWeight: 'bold', fontSize: '14px' }}>Edit</span>) : null;
  const DeleteAction = localStorage.getItem("role") === "admin" ? (<span style={{ color: '#f44336', fontWeight: 'bold', fontSize: '14px' }}>Delete</span>) : null;


  return (
    <div>
      <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
      <h2 class="mb-10 mt-8 ml-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Hospitals</h2>
      <div class="flex items-center justify-between mb-6">
                <button onClick={(e) => { navigateHospitalRegister(e) }} class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-16" type="button">
                  Add Hospital
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
          columns={[
            { title: HospitalName, field: 'name' },
            { title: Location, field: 'location' },
          ]}
          data={hospitals}
          title="Hospitals"
          actions={[
            {
              icon: () => (
                <span style={{color: '#1976d2', fontWeight: 'bold', fontSize: '14px'}}>View</span>
              ),
              tooltip: 'View Hospital',
              onClick: (event, rowData) => { navigateToHospital(event, rowData) }
            },
            {
              icon: () => (
                EditAction
              ),
              tooltip: 'Edit Hospital',
              onClick: (event, rowData) => { alert("You don't have permission to update this hospital") }
            },
            {
              icon: () => (
                DeleteAction
              ),
              tooltip: 'Delete Hospital',
              onClick: (event, rowData) => { alert("You don't have permission to delete this hospital") }
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

export default Hospitals