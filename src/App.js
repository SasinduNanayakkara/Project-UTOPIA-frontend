import './App.css';
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';
import NurseDashboard from './pages/NurseDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DoctorRegister from './pages/DoctorRegister';
import NurseRegister from './pages/NurseRegister';
import HospitalRegister from './pages/HospitalRegister';
import Hospitals from './pages/Hospitals';
import HospitalDashboard from './pages/HospitalDashboard';
import WardRegister from './pages/WardRegister';
import Wards from './pages/Wards';
import WardDashboard from './pages/WardDashboard';
import Patients from './pages/Patients';
import PatientRegister from './pages/PatientRegister';
import Nurses from './pages/Nurses';
import MedicineRegister from './pages/MedicineRegister';
import Medicines from './pages/Medicines';
import Inventories from './pages/Inventories';
import InventoryRegister from './pages/InventoryRegister';
import UpdateDoctor from './pages/UpdateDoctor';
import Doctors from './pages/Doctors';
import UpdateNurse from './pages/UpdateNurse';
import UpdatePatient from './pages/UpdatePatient';
import IncreaseMedicine from './pages/IncreaseMedicine';
import DecreaseMedicine from './pages/DecreaseMedicine';
import IncreaseInventory from './pages/IncreaseInventory';
import DecreaseInventory from './pages/DecreaseInventory';
import HospitalReport from './pages/HospitalReport';
import SurgicalInventories from './pages/SurgicalInventories';
import SurgicalInventoryRegister from './pages/SurgicalInventoryRegister';
import IncreaseSurgicalInventory from './pages/IncreaseSurgicalInventory';
import DecreaseSurgicalInventory from './pages/DecreaseSurgicalInventory';
export const baseUrl = "http://localhost:5000/api";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/doctorDashboard",
      element: <DoctorDashboard />
    },
    {
      path: "/nurseDashboard",
      element: <NurseDashboard />
    },
    {
      path: "/adminDashboard",
      element: <AdminDashboard />
    },
    {
      path: "/doctorRegister",
      element: <DoctorRegister />
    },
    {
      path: "/nurseRegister",
      element: <NurseRegister />
    },
    {
      path: "/hospitalRegister",
      element: <HospitalRegister />
    },
    {
      path: "/hospitals",
      element: <Hospitals />
    },
    {
      path: "/hospitalDashboard",
      element: <HospitalDashboard />
    },
    {
      path: "/wardRegister",
      element: <WardRegister />
    },
    {
      path: "/wards",
      element: <Wards />
    },
    {
      path: "/WardDashboard",
      element: <WardDashboard />
    },
    {
      path: "/patients",
      element: <Patients />
    },
    {
      path: "/patientRegister",
      element: <PatientRegister />
    },
    {
      path: "/nurses",
      element: <Nurses />
    },
    {
      path: "/medicineRegister",
      element: <MedicineRegister />
    },
    {
      path: "/medicines",
      element: <Medicines />
    },
    {
      path: "/inventories",
      element: <Inventories />
    },
    {
      path: "/updateDoctor",
      element: <UpdateDoctor />
    },
    {
      path: "/doctors",
      element: <Doctors />
    },
    {
      path: "/nurseUpdate",
      element: <UpdateNurse />
    },
    {
      path: "/patientUpdate",
      element: <UpdatePatient />
    },
    {
      path: "/medicineIncrease",
      element: <IncreaseMedicine />
    },
    {
      path: "/medicineDecrease",
      element: <DecreaseMedicine />
    },
    {
      path: "/inventoryRegister",
      element: <InventoryRegister />
    },
    {
      path: "/increaseInventory",
      element: <IncreaseInventory />
    },
    {
      path: "/decreaseInventory",
      element: <DecreaseInventory />
    },
    {
      path: "/hospitalReport",
      element: <HospitalReport />
    },
    {
      path: "/surgicalInventories",
      element: <SurgicalInventories />
    },
    {
      path: "/surgicalInventoryRegister",
      element: <SurgicalInventoryRegister />
    },
    {
      path: "/increaseSurgicalInventory",
      element: <IncreaseSurgicalInventory />
    },
    {
      path: "/decreaseSurgicalInventory",
      element: <DecreaseSurgicalInventory/>
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
