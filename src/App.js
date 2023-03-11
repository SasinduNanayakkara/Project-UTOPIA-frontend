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
export const baseUrl = "http://localhost:5000/api";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
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
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
