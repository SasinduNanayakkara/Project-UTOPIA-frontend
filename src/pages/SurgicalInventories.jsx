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
import { useLocation, useNavigate } from 'react-router-dom';

function SurgicalInventories() {

  const [SurgicalInventories, setSurgicalInventories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const wardID = location.state.wardID;
  console.log("wardID", wardID);
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
    const getSurgicalInventories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/inventory/ward/surgical/${wardID}`);
        if (response.status === 200) {
          setSurgicalInventories(response.data);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    getSurgicalInventories();
  }, []);
  console.log(SurgicalInventories);

  const navigateToInventory = (event, rowData) => {
    // navigate('/hospitalDashboard', { state: { name: rowData.name, quantity: rowData.quantity, id: rowData._id } })
  }

  const navigateToIncenseInventory = (event, rowData) => {
    navigate('/increaseSurgicalInventory', { state: { medicineName: rowData.name,  medicineID: rowData._id, wardID: wardID, serialNumber: rowData.serial_number } })
  }

  const navigateToDecreaseInventory = (event, rowData) => {
    navigate('/decreaseSurgicalInventory', { state: { medicineName: rowData.name,  medicineID: rowData._id, wardID: wardID, serialNumber: rowData.serial_number } })
  }

  const navigateSurgicalInventoryRegister = (e) => {
    navigate('/surgicalInventoryRegister', { state: { wardID: wardID } })
  }

  const InventoryName = <span className='font-bold '>Inventory Name</span>
  const SerialNumber = <span className='font-bold'>Serial Number</span>
  const Quantity = <span className='font-bold'>Quantity</span>

  return (
    <div>
      <Header username={localStorage.getItem("username")} first_name={localStorage.getItem("first_name")} />
      <h2 class="mb-10 mt-8 ml-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">Surgical Inventory</h2>
      <div class="flex items-center justify-between mb-6">
                <button onClick={(e) => { navigateSurgicalInventoryRegister(e) }} class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-16" type="button">
                  Add Surgical Inventory
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
            { title: InventoryName, field: 'name' },
            { title: SerialNumber, field: 'serial_number' },
            { title: Quantity, field: 'quantity' },
          ]}
          data={SurgicalInventories}
          title="Surgical Inventories"
          actions={[
            {
              icon: () => (
                <span style={{color: '#1976d2', fontWeight: 'bold', fontSize: '14px'}}>Request</span>
              ),
              tooltip: 'Request Inventory',
              onClick: (event, rowData) => { navigateToInventory(event, rowData) }
            },
            {
              icon: () => (
                <span style={{color: '#72A400', fontWeight: 'bold', fontSize: '14px'}}>Add</span>
              ),
              tooltip: 'Add more SurgicalInventories',
              onClick: (event, rowData) => { navigateToIncenseInventory(event, rowData) }
            },
            {
              icon: () => (
                <span style={{color: '#f44336', fontWeight: 'bold', fontSize: '14px'}}>Decrease</span>
              ),
              tooltip: 'Decrease SurgicalInventories',
              onClick: (event, rowData) => { navigateToDecreaseInventory(event, rowData) }
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

export default SurgicalInventories