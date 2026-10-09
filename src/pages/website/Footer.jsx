import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ================= FOOTER ================= */}
      <footer
        id="footer"
        className="border-t border-[#d8e6f0] bg-[#eef7fd] text-[#444]"
      >
        <div className="mx-auto max-w-[1400px] px-6 pb-0 pt-[48px] md:px-8 lg:px-10">
          {/* ================= FOOTER CONTENT ================= */}
          <div className="grid grid-cols-1 gap-[35px] md:grid-cols-2 lg:grid-cols-[2.1fr_1fr_1fr_1fr_1fr] lg:gap-[30px]">

            {/* ================= HOSPITAL INFORMATION ================= */}
            <div>
              <Link
                to="/"
                className="inline-block !no-underline"
              >
                <span className="text-[28px] font-bold tracking-[-0.5px] text-[#294b68]">
                  HospitalCare
                </span>
              </Link>

              <div className="mt-[32px] text-[14px] leading-[1.9] text-[#555]">
                <p className="m-0">
                  HospitalCare Medical Center
                </p>

                <p className="m-0">
                  Kerala, India
                </p>

                <p className="mb-0 mt-[12px]">
                  <strong className="font-semibold text-[#294b68]">
                    Phone:
                  </strong>{" "}
                  <span>+91 98765 43210</span>
                </p>

                <p className="m-0">
                  <strong className="font-semibold text-[#294b68]">
                    Email:
                  </strong>{" "}
                  <span>info@hospitalcare.com</span>
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-[24px] flex items-center gap-[10px]">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#9ca9b2] !text-[#536575] !no-underline transition-all duration-300 hover:border-[#1976c8] hover:bg-[#1976c8] hover:text-white"
                >
                  <i className="bi bi-twitter-x text-[16px]"></i>
                </a>

                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#9ca9b2] !text-[#536575] !no-underline transition-all duration-300 hover:border-[#1976c8] hover:bg-[#1976c8] hover:text-white"
                >
                  <i className="bi bi-facebook text-[16px]"></i>
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#9ca9b2] !text-[#536575] !no-underline transition-all duration-300 hover:border-[#1976c8] hover:bg-[#1976c8] hover:text-white"
                >
                  <i className="bi bi-instagram text-[16px]"></i>
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#9ca9b2] !text-[#536575] !no-underline transition-all duration-300 hover:border-[#1976c8] hover:bg-[#1976c8] hover:text-white"
                >
                  <i className="bi bi-linkedin text-[16px]"></i>
                </a>
              </div>
            </div>

            {/* ================= USEFUL LINKS ================= */}
            <div>
              <h4 className="m-0 text-[16px] font-bold text-[#294b68]">
                Useful Links
              </h4>

              <ul className="!mt-[18px] list-none space-y-[13px] p-0">
                <li>
                  <Link
                    to="/"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    to="/doctors"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Doctors
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* ================= OUR SERVICES ================= */}
            <div>
              <h4 className="m-0 text-[16px] font-bold text-[#294b68]">
                Our Services
              </h4>

              <ul className="!mt-[18px] list-none space-y-[13px] p-0">
                <li>
                  <Link
                    to="/services"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    General Healthcare
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Patient Care
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Diagnostic Services
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Specialized Care
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Medical Consultation
                  </Link>
                </li>
              </ul>
            </div>

            {/* ================= DEPARTMENTS ================= */}
            <div>
              <h4 className="m-0 text-[16px] font-bold text-[#294b68]">
                Departments
              </h4>

              <ul className="!mt-[18px] list-none space-y-[13px] p-0">
                <li>
                  <Link
                    to="/departments"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Cardiology
                  </Link>
                </li>

                <li>
                  <Link
                    to="/departments"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Orthopedics
                  </Link>
                </li>

                <li>
                  <Link
                    to="/departments"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Dermatology
                  </Link>
                </li>

                <li>
                  <Link
                    to="/departments"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Neurology
                  </Link>
                </li>

                <li>
                  <Link
                    to="/departments"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Pediatrics
                  </Link>
                </li>
              </ul>
            </div>

            {/* ================= PATIENT CARE ================= */}
            <div>
              <h4 className="m-0 text-[16px] font-bold text-[#294b68]">
                Patient Care
              </h4>

              <ul className="!mt-[18px] list-none space-y-[13px] p-0">
                <li>
                  <Link
                    to="/appointment"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Book Appointment
                  </Link>
                </li>

                <li>
                  <Link
                    to="/doctors"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Find a Doctor
                  </Link>
                </li>

                <li>
                  <Link
                    to="/faq"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    FAQs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/login"
                    className="text-[14px] !text-[#666] !no-underline transition-colors duration-200 hover:text-[#1976c8]"
                  >
                    Patient Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ================= DIVIDER ================= */}
          <div className="mt-[24px] border-t border-[#d7e2e9]"></div>

          {/* ================= COPYRIGHT ================= */}
          <div className="py-[26px] text-center">
            <p className="m-0 text-[14px] text-[#444]">
              © Copyright{" "}
              <strong className="px-1 font-bold text-[#294b68]">
                HospitalCare
              </strong>{" "}
              All Rights Reserved
            </p>

            <p className="m-0 !mt-[10px] text-[13px] !text-[#666]">
              Hospital Management System
            </p>
          </div>
        </div>
      </footer>

      {/* ================= SCROLL TOP ================= */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-[18px] right-[18px] z-[999] flex h-[40px] w-[40px] items-center justify-center rounded-[4px] border-0 bg-[#1976c8] text-white shadow-md transition-all duration-300 hover:bg-[#105592]"
      >
        <i className="bi bi-arrow-up-short text-[22px]"></i>
      </button>
    </>
  );
};

export default Footer;