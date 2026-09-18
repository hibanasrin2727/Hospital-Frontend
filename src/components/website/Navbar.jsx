import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getUser, isLoggedIn, logout } from "../../utils/auth";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const moreDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [logoutLoading, setLogoutLoading] = useState(false);


  const navigate = useNavigate();

  // =====================================================
  // Detect scrolling
  // =====================================================
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =====================================================
  // Detect active section while scrolling
  // =====================================================
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "services",
      "departments",
      "doctors",
      "appointment",
      "faq",
      "contact",
    ];

    const handleSectionScroll = () => {
      const scrollPosition = window.scrollY + 150;

      let currentSection = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (section) {
          const sectionTop = section.offsetTop;

          if (scrollPosition >= sectionTop) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleSectionScroll);

    handleSectionScroll();

    return () => {
      window.removeEventListener("scroll", handleSectionScroll);
    };
  }, []);

  // =====================================================
  // Close desktop More dropdown when clicking outside
  // =====================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =====================================================
  // Close mobile menu when clicking outside
  // =====================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenu(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =====================================================
  // Smooth scroll to section
  // =====================================================
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const headerOffset = scrolled ? 70 : 107;

      const sectionPosition =
        section.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }

    setMobileMenu(false);
    setDropdownOpen(false);
    setAccountDropdownOpen(false);
  };

  // =====================================================
  // Authentication
  // =====================================================
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setLoggedIn(isLoggedIn());
      setUser(getUser());
    };

    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  // =====================================================
  // Logout Handler
  // =====================================================
  const handleLogout = () => {
    // Logout immediately
    logout();

    setLoggedIn(false);
    setUser(null);
    setAccountDropdownOpen(false);
    setMobileMenu(false);
    setDropdownOpen(false);

    // Show loading
    setLogoutLoading(true);

    // Wait 1 second
    setTimeout(() => {
      setLogoutLoading(false);
      navigate("/");
    }, 400);
  };

  return (
    <>
      {logoutLoading && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white">
          <div className="flex flex-col items-center">

            <div className="h-11 w-11 animate-spin rounded-full border-4 border-gray-200 border-t-[#1976c8]"></div>

            <p className="mt-4 animate-[blink_0.7s_steps(2,start)_infinite] text-[15px] font-semibold text-[#294b68]">
              Logging out...
            </p>

          </div>
        </div>
      )}





    <header className="sticky top-0 z-[9999] w-full bg-white">

      {/* =====================================================
          BLUE TOP BAR
          ===================================================== */}
      <div
        className={`overflow-hidden bg-[#1976c8] text-white transition-all duration-500 ease-in-out ${
          scrolled
            ? "h-0 opacity-0"
            : "h-[37px] opacity-100"
        }`}
      >
        <div className="mx-auto flex h-[37px] max-w-[1400px] items-center justify-between px-4">

          {/* Contact Information */}
          <div className="flex items-center gap-7">

            <a
              href="mailto:info@hospitalcare.com"
                className="flex items-center gap-1.5 text-[13px] text-white !no-underline transition hover:opacity-80"
            >
              <i className="bi bi-envelope text-[13px]"></i>

              <span>
                info@hospitalcare.com
              </span>
            </a>

            <a
              href="tel:+919876543210"
                className="flex items-center gap-1.5 text-[13px] text-white !no-underline transition hover:opacity-80"
            >
              <i className="bi bi-phone text-[13px]"></i>

              <span>
                +91 98765 43210
              </span>
            </a>

          </div>

          {/* Social Links */}
          <div className="hidden items-center gap-4 md:flex">

            <a
              href="#"
              aria-label="Twitter"
              className="text-white transition hover:opacity-70"
            >
              <i className="bi bi-twitter-x text-[13px]"></i>
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="text-white transition hover:opacity-70"
            >
              <i className="bi bi-facebook text-[13px]"></i>
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="text-white transition hover:opacity-70"
            >
              <i className="bi bi-instagram text-[13px]"></i>
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white transition hover:opacity-70"
            >
              <i className="bi bi-linkedin text-[13px]"></i>
            </a>

          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN NAVBAR
          ===================================================== */}
      <div className="h-[70px] border-b border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">

        <div className="mx-auto flex h-full max-w-[1400px] items-center px-4">

            {/* =================================================
              MOBILE MENU BUTTON
              ================================================= */}
            <button
              type="button"
              onClick={() => {
                setMobileMenu(!mobileMenu);
                setDropdownOpen(false);
                setAccountDropdownOpen(false);
              }}
              className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center border-0 bg-transparent p-0 !text-[23px] text-[#052038] lg:hidden"
              aria-label="Toggle navigation"
            >
              <i
                className={`bi ${mobileMenu ? "bi-x" : "bi-list"
                  }`}
              ></i>
            </button>

          {/* =================================================
              LOGO
              ================================================= */}
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="mr-auto whitespace-nowrap border-0 bg-transparent p-0 !text-[28px] font-bold tracking-[-0.5px] !text-[#105592] no-underline transition-colors duration-300 hover:!text-[#1976c8]"
          >
            HospitalCare
          </button>

          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}
            <nav className="hidden items-center lg:ml-[350px] lg:flex">

            <ul className="m-0 flex list-none items-center gap-[29px] p-0">

                {/* HOME */}
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("home")}
                  className={`relative flex h-[70px] items-center border-0 bg-transparent px-0 text-[14px] no-underline transition-colors duration-300 ${
                    activeSection === "home"
                      ? "font-medium text-[#1976c8]"
                      : "text-[#444444] hover:text-[#1976c8]"
                  }`}
                >
                  Home

                  {activeSection === "home" && (
                    <span className="absolute bottom-[14px] left-0 right-0 h-[2px] bg-[#1976c8]"></span>
                  )}
                </button>
              </li>

                {/* ABOUT */}
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("about")}
                  className={`relative flex h-[70px] items-center border-0 bg-transparent px-0 text-[14px] no-underline transition-colors duration-300 ${
                    activeSection === "about"
                      ? "font-medium text-[#1976c8]"
                      : "text-[#444444] hover:text-[#1976c8]"
                  }`}
                >
                  About

                  {activeSection === "about" && (
                    <span className="absolute bottom-[14px] left-0 right-0 h-[2px] bg-[#1976c8]"></span>
                  )}
                </button>
              </li>

                {/* SERVICES */}
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("services")}
                  className={`relative flex h-[70px] items-center border-0 bg-transparent px-0 text-[14px] no-underline transition-colors duration-300 ${
                    activeSection === "services"
                      ? "font-medium text-[#1976c8]"
                      : "text-[#444444] hover:text-[#1976c8]"
                  }`}
                >
                  Services

                  {activeSection === "services" && (
                    <span className="absolute bottom-[14px] left-0 right-0 h-[2px] bg-[#1976c8]"></span>
                  )}
                </button>
              </li>

                {/* DEPARTMENTS */}
              <li>
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("departments")
                  }
                  className={`relative flex h-[70px] items-center border-0 bg-transparent px-0 text-[14px] no-underline transition-colors duration-300 ${
                    activeSection === "departments"
                      ? "font-medium text-[#1976c8]"
                      : "text-[#444444] hover:text-[#1976c8]"
                  }`}
                >
                  Departments

                  {activeSection === "departments" && (
                    <span className="absolute bottom-[14px] left-0 right-0 h-[2px] bg-[#1976c8]"></span>
                  )}
                </button>
              </li>

                {/* DOCTORS */}
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("doctors")}
                  className={`relative flex h-[70px] items-center border-0 bg-transparent px-0 text-[14px] no-underline transition-colors duration-300 ${
                    activeSection === "doctors"
                      ? "font-medium text-[#1976c8]"
                      : "text-[#444444] hover:text-[#1976c8]"
                  }`}
                >
                  Doctors

                  {activeSection === "doctors" && (
                    <span className="absolute bottom-[14px] left-0 right-0 h-[2px] bg-[#1976c8]"></span>
                  )}
                </button>
              </li>

                {/* MORE DROPDOWN */}
                <li ref={moreDropdownRef} className="relative">

                <button
                  type="button"
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      setAccountDropdownOpen(false);
                    }}
                  className="flex h-[70px] items-center gap-1 border-0 bg-transparent px-0 text-[14px] text-[#444444] transition-colors duration-300 hover:text-[#1976c8]"
                >
                  More

                  <i
                    className={`bi text-[10px] ${
                      dropdownOpen
                        ? "bi-chevron-up"
                        : "bi-chevron-down"
                    }`}
                  ></i>
                </button>

                {dropdownOpen && (
                  <div className="absolute left-[-20px] top-[66px] w-[190px] rounded-md border border-gray-100 bg-white py-2 shadow-[0_8px_25px_rgba(0,0,0,0.12)]">

                    {/* Appointment */}
                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection("appointment")
                      }
                      className="block w-full border-0 bg-transparent px-5 py-2.5 text-left text-[14px] text-gray-600 transition hover:bg-[#f5f9fd] hover:text-[#1976c8]"
                    >
                      Appointment
                    </button>

                    {/* FAQ */}
                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection("faq")
                      }
                      className="block w-full border-0 bg-transparent px-5 py-2.5 text-left text-[14px] text-gray-600 transition hover:bg-[#f5f9fd] hover:text-[#1976c8]"
                    >
                      FAQ
                    </button>

                  </div>
                )}

              </li>

                {/* CONTACT */}
              <li>
                <button
                  type="button"
                    onClick={() =>
                      scrollToSection("contact")
                    }
                  className={`relative flex h-[70px] items-center border-0 bg-transparent px-0 text-[14px] no-underline transition-colors duration-300 ${
                    activeSection === "contact"
                      ? "font-medium text-[#1976c8]"
                      : "text-[#444444] hover:text-[#1976c8]"
                  }`}
                >
                  Contact

                  {activeSection === "contact" && (
                    <span className="absolute bottom-[14px] left-0 right-0 h-[2px] bg-[#1976c8]"></span>
                  )}
                </button>
              </li>

            </ul>

          </nav>

          {/* =================================================
              DESKTOP SIGN IN / SIGN UP
              ================================================= */}
            {!loggedIn && (
              <div className="ml-[34px] hidden items-center gap-2 lg:flex">

                {/* Sign In */}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="whitespace-nowrap !rounded-full border-1 bg-transparent px-4 py-1.5 text-[13px] font-medium text-[#444444] transition-colors duration-200 hover:text-[#1976c8] "
                >
                  Sign In
                </button>

                {/* Sign Up */}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="whitespace-nowrap !rounded-full border-1 border-indigo-900 bg-[#3fa6ff] px-4 py-1.5 text-[13px] font-medium text-white transition-colors duration-200 hover:text-[#1976c8]"
                >
                  Sign Up
                </button>

              </div>
            )}
          {/* =================================================
              DESKTOP APPOINTMENT BUTTON
              ================================================= */}
          <button
            type="button"
            onClick={() =>
              scrollToSection("appointment")
            }
            className="!ml-[30px] hidden h-[40px] items-center justify-center whitespace-nowrap !rounded-full border-0 bg-[#1976c8] px-6 text-[13px] font-medium text-white no-underline transition-all duration-300 hover:bg-[#294b68] lg:flex"
          >
            Make an Appointment
          </button>



            {/* =================================================
              DESKTOP ACCOUNT
              ================================================= */}
            {loggedIn && (
              <div className="relative ml-[18px] hidden items-center lg:flex">

                {/* Account Logo */}
                <button
                  type="button"
                  onClick={() => {
                    setAccountDropdownOpen(
                      !accountDropdownOpen
                    );
                    setDropdownOpen(false);
                  }}
                  className="group flex items-center border-0 bg-transparent p-0"
                  title={user?.name || "My Account"}
                >
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#1976c8] text-[16px] font-bold uppercase text-white shadow-sm transition-all duration-300 group-hover:bg-[#294b68]">
                    {(user?.name || "User").charAt(0)}
                  </div>
                </button>

                {/* Account Dropdown */}
                {accountDropdownOpen && (
                  <div className="absolute right-0 top-[52px] w-[200px] rounded-xl border border-gray-100 bg-white py-2 shadow-[0_8px_25px_rgba(0,0,0,0.12)]">

                    {/* User Information */}
                    <div className="border-b border-gray-100 px-4 py-3">

                      <p className="m-0 truncate text-[14px] font-semibold text-[#294b68]">
                        {user?.name || "User"}
                      </p>

                      <p className="m-0 mt-1 truncate text-[12px] text-gray-500">
                        {user?.email || ""}
                      </p>

                    </div>

                    {/* Profile */}
                    <button
                      type="button"
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left text-[14px] text-gray-600 transition-colors duration-200 hover:bg-[#f5f9fd] hover:text-[#1976c8]"
                    >
                      <i className="bi bi-person text-[16px]"></i>

                      <span>
                        Profile
                      </span>
                    </button>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left text-[14px] text-gray-600 transition-colors duration-200 hover:bg-[#f5f9fd] hover:text-[#1976c8]"
                    >
                      <i className="bi bi-box-arrow-right text-[16px]"></i>

                      <span>
                        Logout
                      </span>
                    </button>

                  </div>
                )}

              </div>
            )}

            {/* =================================================
              MOBILE AUTHENTICATION
              ================================================= */}
            <div className="ml-auto flex items-center lg:hidden">

              {!loggedIn ? (

                <div className="flex items-center gap-1.5">

                  {/* Sign In */}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="whitespace-nowrap border-0 bg-transparent px-2 py-2 text-[12px] font-medium text-[#444444] transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Sign In
                  </button>

                  {/* Sign Up */}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="whitespace-nowrap !rounded-full border border-[#1976c8] bg-[#1976c8] px-3 py-1.5 text-[12px] font-medium text-white transition-all duration-200 hover:bg-[#294b68]"
                  >
                    Sign Up
                  </button>

                </div>

              ) : (

                <div className="relative flex items-center gap-2">

                    {/* Mobile Account Logo */}
                    <button
                      type="button"
                      onClick={() => {
                        setAccountDropdownOpen(
                          !accountDropdownOpen
                        );
                        setDropdownOpen(false);
                      }}
                      className="group flex h-9 w-9 items-center justify-center !rounded-full border-0 bg-[#1976c8] p-0 text-[14px] font-bold uppercase text-white shadow-sm transition-all duration-200 hover:bg-[#294b68]"
                      title={user?.name || "My Account"}
                    >
                      {(user?.name || "User").charAt(0)}
                    </button>

                    {/* Mobile Account Dropdown */}
                    {accountDropdownOpen && (
                      <div className="absolute right-0 top-[48px] z-[10000] w-[190px] rounded-xl border border-gray-100 bg-white py-2 shadow-[0_8px_25px_rgba(0,0,0,0.12)]">

                        {/* User Information */}
                        <div className="border-b border-gray-100 px-4 py-3">

                          <p className="m-0 truncate text-[14px] font-semibold text-[#294b68]">
                            {user?.name || "User"}
                          </p>

                          <p className="m-0 mt-1 truncate text-[12px] text-gray-500">
                            {user?.email || ""}
                          </p>

                        </div>

                        {/* Profile */}
                        <button
                          type="button"
                          onClick={() => {
                            setAccountDropdownOpen(false);
                            navigate("/profile");
                          }}
                          className="flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left text-[14px] text-gray-600 transition-colors duration-200 hover:bg-[#f5f9fd] hover:text-[#1976c8]"
                        >
                          <i className="bi bi-person text-[16px]"></i>

                          <span>
                            Profile
                          </span>
                        </button>

                        {/* Logout */}
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left text-[14px] text-gray-600 transition-colors duration-200 hover:bg-[#f5f9fd] hover:text-[#1976c8]"
                        >
                          <i className="bi bi-box-arrow-right text-[16px]"></i>

                          <span>
                            Logout
                          </span>
                        </button>

                      </div>
                    )}

                  </div>

              )}

            </div>

          </div>

        </div>

      {/* =====================================================
          MOBILE NAVIGATION
          ===================================================== */}
        {mobileMenu && (
          <div
            ref={mobileMenuRef}
            className="absolute left-4 right-4 top-[70px] rounded-xl border border-gray-100 bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] lg:hidden"
          >
          <nav>

            <ul className="m-0 flex list-none flex-col p-0">

                {/* HOME */}
              <li>
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("home")
                  }
                  className={`block w-full rounded-md border-0 px-3 py-3 text-left text-[14px] no-underline ${
                    activeSection === "home"
                      ? "bg-[#f0f7fd] font-medium text-[#1976c8]"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Home
                </button>
              </li>

                {/* ABOUT */}
              <li>
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("about")
                  }
                  className={`block w-full rounded-md border-0 px-3 py-3 text-left text-[14px] no-underline ${
                    activeSection === "about"
                      ? "bg-[#f0f7fd] font-medium text-[#1976c8]"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  About
                </button>
              </li>

                {/* SERVICES */}
              <li>
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("services")
                  }
                  className={`block w-full rounded-md border-0 px-3 py-3 text-left text-[14px] no-underline ${
                    activeSection === "services"
                      ? "bg-[#f0f7fd] font-medium text-[#1976c8]"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Services
                </button>
              </li>

                {/* DEPARTMENTS */}
              <li>
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("departments")
                  }
                  className={`block w-full rounded-md border-0 px-3 py-3 text-left text-[14px] no-underline ${
                    activeSection === "departments"
                      ? "bg-[#f0f7fd] font-medium text-[#1976c8]"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Departments
                </button>
              </li>

                {/* DOCTORS */}
              <li>
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("doctors")
                  }
                  className={`block w-full rounded-md border-0 px-3 py-3 text-left text-[14px] no-underline ${
                    activeSection === "doctors"
                      ? "bg-[#f0f7fd] font-medium text-[#1976c8]"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Doctors
                </button>
              </li>

                {/* MOBILE MORE */}
              <li>

                <button
                  type="button"
                  onClick={() =>
                    setDropdownOpen(!dropdownOpen)
                  }
                  className="flex w-full items-center justify-between rounded-md border-0 bg-transparent px-3 py-3 text-left text-[14px] text-gray-600 hover:bg-gray-50"
                >
                    <span>
                      More
                    </span>

                  <i
                    className={`bi ${
                      dropdownOpen
                        ? "bi-chevron-up"
                        : "bi-chevron-down"
                    }`}
                  ></i>
                </button>

                {dropdownOpen && (
                  <div className="ml-3 border-l border-gray-200 pl-3">

                    {/* Appointment */}
                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection("appointment")
                      }
                      className="block w-full border-0 bg-transparent px-3 py-2.5 text-left text-[14px] text-gray-600 hover:text-[#1976c8]"
                    >
                      Appointment
                    </button>

                    {/* FAQ */}
                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection("faq")
                      }
                      className="block w-full border-0 bg-transparent px-3 py-2.5 text-left text-[14px] text-gray-600 hover:text-[#1976c8]"
                    >
                      FAQ
                    </button>

                  </div>
                )}

              </li>

                {/* CONTACT */}
              <li>
                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("contact")
                  }
                  className={`block w-full rounded-md border-0 px-3 py-3 text-left text-[14px] no-underline ${
                    activeSection === "contact"
                      ? "bg-[#f0f7fd] font-medium text-[#1976c8]"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Contact
                </button>
              </li>

                {/* MOBILE APPOINTMENT */}
              <li className="mt-3 border-t border-gray-100 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("appointment")
                  }
                    className="flex w-full items-center justify-center !rounded-full border-0 bg-[#1976c8] px-5 py-3 text-[14px] font-medium text-white no-underline transition duration-200 hover:bg-[#294b68]"
                >
                  Make an Appointment
                </button>

              </li>

            </ul>


          </nav>

        </div>
      )}

    </header>
    </>
  );
};

export default Navbar;