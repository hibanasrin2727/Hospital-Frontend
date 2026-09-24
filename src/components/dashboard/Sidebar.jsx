import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },
    {
      name: "Doctors",
      path: "/dashboard/doctors",
      icon: "👨‍⚕️",
    },
    {
      name: "Departments",
      path: "/dashboard/departments",
      icon: "🏥",
    },
    {
      name: "Services",
      path: "/dashboard/services",
      icon: "🩺",
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: "📅",
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: "👥",
    },
  ];

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsOpen(false);

    navigate("/login");
  };

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
          ===================================================== */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#102a43]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* =====================================================
          SIDEBAR
          ===================================================== */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-hidden border-r border-[#dcebf5] bg-white/95 shadow-[8px_0_35px_rgba(25,118,200,0.08)] backdrop-blur-xl transition-all duration-500 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* =================================================
            DECORATIVE BACKGROUND
            ================================================= */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#eaf5fb] opacity-70 blur-3xl"></div>

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[#eaf5fb] opacity-50 blur-3xl"></div>

        {/* =================================================
            LOGO
            ================================================= */}
        <div className="relative flex h-24 items-center border-b border-[#edf3f7] px-6">
          <div className="flex items-center gap-3">
            

            {/* Brand */}
            <div>
              <h1 className="!text-[25px] !font-extrabold !tracking-tight !text-[#294b68]">
                Hospital<span className="!text-[#1976c8]">Care</span>
              </h1>

              <div className="mt-0.5 flex items-center gap-1.5">
              

                <p className="text-[11px] font-medium tracking-wide text-gray-400">
                  ADMIN PORTAL
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl text-xl text-gray-400 transition-all duration-200 hover:bg-[#eaf5fb] hover:text-[#1976c8] lg:hidden"
          >
            ×
          </button>
        </div>

        {/* =================================================
            NAVIGATION
            ================================================= */}
        <nav className="relative flex-1 overflow-y-auto px-4 py-7">
          {/* Section Title */}
          <div className="mb-4 flex items-center gap-3 px-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Main Menu
            </span>

            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
          </div>

          {/* Menu */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3.5 !no-underline transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#eaf5fb] to-[#f4faff] text-[#1976c8] shadow-sm"
                      : "!text-[#00325e] hover:bg-[#f7fafc] !hover:text-[#1976c8]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Indicator */}
                    <span
                      className={`absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-[#1976c8] transition-all duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    ></span>

                    {/* Icon Container */}
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[18px] transition-all duration-300 ${
                        isActive
                          ? "bg-white shadow-sm"
                          : "bg-gray-50 group-hover:bg-white group-hover:shadow-sm"
                      }`}
                    >
                      {item.icon}
                    </span>

                    {/* Name */}
                    <span
                      className={`!no-underline text-[16px] tracking-wide transition-all duration-300 ${
                        isActive
                          ? "font-bold"
                          : "font-medium"
                      }`}
                    >
                      {item.name}
                    </span>

                    {/* Active Arrow */}
                    {isActive && (
                      <span className="ml-auto text-[#001b33] transition-transform duration-300">
                        ›
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* =================================================
            BOTTOM SECTION
            ================================================= */}
        <div className="relative border-t border-[#edf3f7] bg-gradient-to-b from-white to-[#f8fbfd] p-4">
          

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 !rounded-2xl border border-transparent px-4 py-3.5 text-sm font-semibold text-gray-500 transition-all duration-300 hover:border-red-100 hover:bg-red-50 hover:text-red-500"
          >
            <span className="flex h-9 w-9 items-center justify-center !rounded-xl bg-gray-50 text-lg transition-all duration-300 group-hover:bg-white group-hover:shadow-sm">
              ↪
            </span>

            <span>Logout</span>

            <span className="ml-auto text-gray-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-red-400">
              →
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;