import React, {forwardRef, useEffect, useState } from 'react'
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
        const getHospitals = async () => {
            try {
                const response = await axios.get(`${baseUrl}/hospital`);
                if (response.status === 200) {
                    setHospitals(response.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getHospitals(); 
      },[]);
console.log(hospitals);

const navigateToHospital = (event, rowData) => {
    navigate('/hospitalDashboard', { state: { name: rowData.name, location: rowData.location, id: rowData._id } })
}

  return (
    <div>
        <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
        <h2 class="mb-10 mt-8 ml-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Hospitals</h2>
        <div style={{ maxWidth: '90%' }} className="ml-16">
        <MaterialTable
            icons={tableIcons}
          columns={[
            { title: 'Hospital Name', field: 'name' },
            { title: 'Location', field: 'location' },
          ]}
          data={hospitals}
          title="Hospitals"
          actions={[
            {
                icon: '▶',
                tooltip: 'View Hospital',
                onClick: (event, rowData) => {navigateToHospital(event, rowData)}
            },
            {
                icon: '📝',
                tooltip: 'Edit Hospital',
                onClick: (event, rowData) => {}
            },
            {
                icon: '🗑',
                tooltip: 'Delete Hospital',
                onClick: (event, rowData) => {}
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

export default Hospitals