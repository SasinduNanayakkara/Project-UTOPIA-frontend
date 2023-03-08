import './App.css';
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';
import NurseDashboard from './pages/NurseDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DoctorRegister from './pages/DoctorRegister';
import NurseRegister from './pages/NurseRegister';
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
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
