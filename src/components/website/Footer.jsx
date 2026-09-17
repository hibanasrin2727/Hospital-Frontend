import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer id="footer" className="footer light-background">
        <div className="container footer-top">
          <div className="row gy-4">

            {/* Hospital Information */}
            <div className="col-lg-4 col-md-6 footer-about">
              <Link
                to="/"
                className="logo d-flex align-items-center"
              >
                <span className="sitename">HospitalCare</span>
              </Link>

              <div className="footer-contact pt-3">
                <p>HospitalCare Medical Center</p>
                <p>Kerala, India</p>

                <p className="mt-3">
                  <strong>Phone:</strong>{" "}
                  <span>+91 98765 43210</span>
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  <span>info@hospitalcare.com</span>
                </p>
              </div>

              <div className="social-links d-flex mt-4">
                <a href="#" aria-label="Twitter">
                  <i className="bi bi-twitter-x"></i>
                </a>

                <a href="#" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>

                <a href="#" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>

                <a href="#" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            {/* Useful Links */}
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>

              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/about">About Us</Link>
                </li>

                <li>
                  <Link to="/services">Services</Link>
                </li>

                <li>
                  <Link to="/doctors">Doctors</Link>
                </li>

                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Our Services */}
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>

              <ul>
                <li>
                  <Link to="/services">General Healthcare</Link>
                </li>

                <li>
                  <Link to="/services">Patient Care</Link>
                </li>

                <li>
                  <Link to="/services">Diagnostic Services</Link>
                </li>

                <li>
                  <Link to="/services">Specialized Care</Link>
                </li>

                <li>
                  <Link to="/services">Medical Consultation</Link>
                </li>
              </ul>
            </div>

            {/* Departments */}
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Departments</h4>

              <ul>
                <li>
                  <Link to="/departments">Cardiology</Link>
                </li>

                <li>
                  <Link to="/departments">Orthopedics</Link>
                </li>

                <li>
                  <Link to="/departments">Dermatology</Link>
                </li>

                <li>
                  <Link to="/departments">Neurology</Link>
                </li>

                <li>
                  <Link to="/departments">General Medicine</Link>
                </li>
              </ul>
            </div>

            {/* Patient Links */}
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Patient Care</h4>

              <ul>
                <li>
                  <Link to="/appointment">
                    Book Appointment
                  </Link>
                </li>

                <li>
                  <Link to="/doctors">
                    Find a Doctor
                  </Link>
                </li>

                <li>
                  <Link to="/faq">
                    FAQs
                  </Link>
                </li>

                <li>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link to="/login">
                    Patient Login
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">
              HospitalCare
            </strong>{" "}
            <span>All Rights Reserved</span>
          </p>

          <div className="credits">
            Hospital Management System
          </div>
        </div>
      </footer>

      {/* Scroll Top */}
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        aria-label="Scroll to top"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default Footer;