import { Outlet } from "react-router-dom";

import Navbar from "../components/website/Navbar";
import Footer from "../components/website/Footer";

const WebsiteLayout = () => {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default WebsiteLayout;