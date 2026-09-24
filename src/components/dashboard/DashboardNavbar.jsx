import {
  Menu,
  Bell,
  ChevronDown,
  UserRound,
  LogOut,
  Settings,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = ({ setIsOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const navigate = useNavigate();

  // =====================================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // =====================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setProfileOpen(false);

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#dcebf5] bg-white/95 shadow-[0_4px_20px_rgba(41,75,104,0.04)] backdrop-blur-xl">

      <div className="flex h-[76px] items-center justify-between !px-4 sm:!px-6 lg:!px-8">

        {/* =====================================================
            LEFT SIDE
            ===================================================== */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#294b68] transition-all duration-200 hover:bg-[#eaf5fb] hover:text-[#1976c8] lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Page Title */}
          <div>
            <h1 className="!mb-0 !text-xl !font-bold !text-[#294b68] sm:!text-2xl">
              Admin Dashboard
            </h1>

            <p className="hidden text-xs font-medium !text-gray-400 sm:block">
              HospitalCare Management
            </p>
          </div>

        </div>

        {/* =====================================================
            RIGHT SIDE
            ===================================================== */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* ===================================================
              NOTIFICATION
              =================================================== */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#294b68] transition-all duration-200 hover:bg-[#eaf5fb] hover:text-[#1976c8]"
          >
            <Bell size={20} />

            {/* Notification Dot */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-[#dcebf5] sm:block" />

          {/* ===================================================
              PROFILE
              =================================================== */}
          <div
            ref={profileRef}
            className="relative"
          >

            {/* Profile Button */}
            <button
              type="button"
              onClick={() =>
                setProfileOpen((prev) => !prev)
              }
              className="flex h-13 items-center gap-2 !rounded-xl border border-transparent px-1.5 transition-all duration-200 hover:border-[#dcebf5] hover:bg-[#f7fafc]"
            >

              {/* Avatar */}
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf5fb] text-sm font-bold text-[#1976c8]">

                HA

                {/* Online Status */}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22a06b]" />

              </div>

              {/* Name */}
              <div className="hidden text-left sm:block">

                <p className="mt-3 text-sm font-semibold leading-tight text-[#294b68] !mb-0 ">
                  Hospital Admin
                </p>

                <p className=" text-[11px] font-medium text-gray-400">
                  Administrator
                </p>

              </div>

              {/* Arrow */}
              <ChevronDown
                size={16}
                className={`hidden text-gray-400 transition-transform duration-300 sm:block ${
                  profileOpen
                    ? "rotate-180 text-[#1976c8]"
                    : ""
                }`}
              />

            </button>

            {/* =================================================
                PROFILE DROPDOWN
                ================================================= */}
            {profileOpen && (
              <div className="absolute right-0 top-[52px] z-50 w-60 overflow-hidden rounded-2xl border border-[#dcebf5] bg-white shadow-[0_15px_40px_rgba(41,75,104,0.14)]">

                

                {/* My Profile */}
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-[#294b68] transition-all duration-200 hover:bg-[#f7fafc] hover:text-[#1976c8]"
                >
                  <UserRound size={17} />

                  <span>
                    My Profile
                  </span>
                </button>

                {/* Settings */}
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-[#294b68] transition-all duration-200 hover:bg-[#f7fafc] hover:text-[#1976c8]"
                >
                  <Settings size={17} />

                  <span>
                    Settings
                  </span>
                </button>

                {/* Divider */}
                <div className="mx-3 border-t border-[#edf3f7]" />

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 transition-all duration-200 hover:bg-red-50"
                >
                  <LogOut size={17} />

                  <span>
                    Logout
                  </span>
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  );
};

export default DashboardNavbar;