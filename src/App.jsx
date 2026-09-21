import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// =====================================================
// LAYOUT
// =====================================================

import WebsiteLayout from "./layouts/WebsiteLayout";

// =====================================================
// WEBSITE PAGES
// =====================================================

import Home from "./pages/website/Home";
import About from "./pages/website/About";
import Services from "./pages/website/Services";
import Departments from "./pages/website/Departments";
import Doctors from "./pages/website/Doctors";
import Appointment from "./pages/website/Appointment";
import FAQ from "./pages/website/FAQ";
import Contact from "./pages/website/Contact";
import Profile from "./pages/website/Profile";


// =====================================================
// AUTH PAGES
// =====================================================

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";


// =====================================================
// ROUTER
// =====================================================

const router = createBrowserRouter([
  // ===================================================
  // PUBLIC WEBSITE
  // ===================================================

  {
    path: "/",
    element: <WebsiteLayout />,

    children: [
      // HOME
      {
        index: true,
        element: <Home />,
      },

      // ABOUT
      {
        path: "about",
        element: <About />,
      },

      // SERVICES
      {
        path: "services",
        element: <Services />,
      },

      // DEPARTMENTS
      {
        path: "departments",
        element: <Departments />,
      },

      // DOCTORS
      {
        path: "doctors",
        element: <Doctors />,
      },

      // APPOINTMENT
      {
        path: "appointment",
        element: <Appointment />,
      },

      // FAQ
      {
        path: "faq",
        element: <FAQ />,
      },

      // CONTACT
      {
        path: "contact",
        element: <Contact />,
      },


    ],
  },


  // ===================================================
  // AUTHENTICATION
  // ===================================================

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  // user profile
  {
    path: "profile",
    element: <Profile />,
  },


  // ===================================================
  // UNKNOWN URL
  // ===================================================

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);


// =====================================================
// APP
// =====================================================

function App() {
  return <RouterProvider router={router} />;
}

export default App;