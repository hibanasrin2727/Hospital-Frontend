import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// ==========================================
// WEBSITE
// ==========================================

import WebsiteLayout from "./layouts/WebsiteLayout";

import Home from "./pages/website/Home";
import About from "./pages/website/About";
import Services from "./pages/website/Services";
import Departments from "./pages/website/Departments";
import Doctors from "./pages/website/Doctors";
import DoctorDetails from "./pages/website/DoctorDetails";
import Appointment from "./pages/website/Appointment";
import FAQ from "./pages/website/FAQ";
import Contact from "./pages/website/Contact";
import Profile from "./pages/website/Profile";

// ==========================================
// AUTH
// ==========================================

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// ==========================================
// DASHBOARD
// ==========================================

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import DashboardDoctors from "./pages/dashboard/Doctors";
import DashboardDepartments from "./pages/dashboard/Departments";
import DashboardServices from "./pages/dashboard/Services";
import DashboardAppointments from "./pages/dashboard/Appointments";
import DashboardUsers from "./pages/dashboard/Users";

// ==========================================
// AUTH PROTECTION
// ==========================================

import ProtectedRoute from "./components/auth/ProtectedRoute";

// ==========================================
// ROUTER
// ==========================================

const router = createBrowserRouter([
  // ======================================
  // WEBSITE ROUTES
  // ======================================

  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "departments",
        element: <Departments />,
      },
      {
        path: "doctors",
        element: <Doctors />,
      },
      {
        path: "doctors/:id",
        element: <DoctorDetails />,
      },
      {
        path: "appointment",
        element: <Appointment />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },

  // ======================================
  // AUTH ROUTES
  // ======================================

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  // ======================================
  // ADMIN DASHBOARD
  // ADMIN ONLY
  // ======================================

  {
    path: "/dashboard",

    element: (
      <ProtectedRoute allowedRoles={["admin"]} />
    ),

    children: [
      {
        element: <DashboardLayout />,

        children: [
          // ======================================
          // DASHBOARD HOME
          // ======================================

          {
            index: true,
            element: <Dashboard />,
          },

          // ======================================
          // DOCTORS
          // ======================================

          {
            path: "doctors",
            element: <DashboardDoctors />,
          },

          // ======================================
          // DEPARTMENTS
          // ======================================

          {
            path: "departments",
            element: <DashboardDepartments />,
          },

          // ======================================
          // SERVICES
          // ======================================

          {
            path: "services",
            element: <DashboardServices />,
          },

          // ======================================
          // APPOINTMENTS
          // ======================================

          {
            path: "appointments",
            element: <DashboardAppointments />,
          },

          // ======================================
          // USERS
          // ======================================

          {
            path: "users",
            element: <DashboardUsers />,
          },
        ],
      },
    ],
  },

  // ======================================
  // UNKNOWN ROUTE
  // ======================================

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

// ==========================================
// APP
// ==========================================

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;