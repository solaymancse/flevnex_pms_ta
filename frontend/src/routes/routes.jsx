import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivateRoute from "../privateRoute/PrivateRoute";
import PatientDetails from "../pages/dashboard/patientDeatils/PatientDetails";
import Home from "../pages/dashboard/home/Home";
import Profile from "../pages/dashboard/profile/Profile";
import SinglePatient from "../pages/dashboard/SinglePatient/SinglePatient";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/",
        element: <Home />,
      },
      {
        path: "/dashboard/patient",
        element: <PatientDetails />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/patient/profile",
        element: <SinglePatient />,
      },
    ],
  },
]);
