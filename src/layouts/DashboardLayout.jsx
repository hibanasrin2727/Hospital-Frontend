import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f6f9fc]">
            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <div className="lg:ml-72">
                <DashboardNavbar
                    setIsOpen={setIsOpen}
                />

                <main className="min-h-[calc(100vh-76px)] p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;