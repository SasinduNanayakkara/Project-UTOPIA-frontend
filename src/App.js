import './App.css';
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login/  ",
      element: <Login />
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
