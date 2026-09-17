import { BrowserRouter, Routes, Route } from "react-router-dom";

import WebsiteLayout from "./layouts/WebsiteLayout";

import Home from "./pages/website/Home";
import About from "./pages/website/About";
import Services from "./pages/website/Services";
import Departments from "./pages/website/Departments";
import Doctors from "./pages/website/Doctors";
import Appointment from "./pages/website/Appointment";
import FAQ from "./pages/website/FAQ";
import Contact from "./pages/website/Contact";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Website */}
        <Route element={<WebsiteLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/services" element={<Services />} />

          <Route path="/departments" element={<Departments />} />

          <Route path="/doctors" element={<Doctors />} />

          <Route path="/appointment" element={<Appointment />} />

          <Route path="/faq" element={<FAQ />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/Login" element={<Login />} />
          
          <Route path="/Signup" element={<Signup />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;