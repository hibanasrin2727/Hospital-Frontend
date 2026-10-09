import { Outlet } from "react-router-dom";

import Navbar from "../components/website/Navbar";


const WebsiteLayout = () => {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <main>
        <Outlet />
      </main>



    </div>
  );
};

export default WebsiteLayout;