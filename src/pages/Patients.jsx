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
    const getPatients = async () => {
      try {
        const response = await axios.get(`${baseUrl}/patient/ward/${wardID}`);
        if (response.status === 200) {
            console.log(response.data);
            response.data.forEach(element => {
                if (element.admit_date) {
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
  console.log(Patients);

  const navigateToWard = (event, rowData) => {
    // navigate('/wardDashboard', { state: { HospitalId: hospitalId, wardID: rowData._id, wardName: rowData.name, no_of_beds: rowData.no_of_beds } })
  }

  const navigatePatientRegister = (e) => {
    navigate('/patientRegister', { state: { wardID: wardID }})
  }
  const PatientTitle = <span className='font-bold'>Hospital Name</span>

  return (
    <div>
      <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
      <h2 class="mb-10 mt-8 ml-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Patients</h2>
      <div class="flex items-center justify-between mb-6">
                <button onClick={(e) => { navigatePatientRegister(e) }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-16" type="button">
                  Add Patient
                </button>
              </div>
      <div style={{ maxWidth: '90%' }} className="ml-16">
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: PatientTitle, field: 'name' },
            { title: 'status', field: 'status' },
            { title: 'Admit Date', field: 'admit_date' },
            { title: 'Address', field: 'address' },
            { title: 'Phone Number', field: 'phone' },

          ]}
          data={Patients}
          title="Patients"
          actions={[
            {
              icon: '▶',
              tooltip: 'View Patient',
              onClick: (event, rowData) => { navigateToWard(event, rowData) }
            },
            {
              icon: '📝',
              tooltip: 'Edit Hospital',
              onClick: (event, rowData) => { }
            },
            {
              icon: '🗑',
              tooltip: 'Delete Hospital',
              onClick: (event, rowData) => { }
            }
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </div>
    </div>
  )
}

export default Patients