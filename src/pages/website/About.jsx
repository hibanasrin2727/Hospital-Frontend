import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="main">

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="about section">

        <div className="container">

          <div className="row gy-4 gx-5">

            {/* ================= IMAGE ================= */}
            <div
              className="col-lg-6 position-relative align-self-start"
              data-aos="fade-up"
              data-aos-delay="200"
            >

              <img
                src="/assets/img/about.jpg"
                className="img-fluid"
                alt="HospitalCare"
              />

              {/* Video button */}
              <a
                href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                className="glightbox pulsating-play-btn"
                aria-label="Watch HospitalCare video"
              ></a>

            </div>

            {/* ================= CONTENT ================= */}
            <div
              className="col-lg-6 content"
              data-aos="fade-up"
              data-aos-delay="100"
            >

              <h3>About Us</h3>

              <p>
                HospitalCare is a modern healthcare management platform
                designed to make healthcare services simple and accessible.
                Patients can explore departments, find doctors, view
                medical services, and book appointments conveniently.
              </p>

              <ul>

                {/* ================= FEATURE 1 ================= */}
                <li>

                  <i className="fa-solid fa-user-doctor"></i>

                  <div>

                    <h5>
                      Experienced Medical Professionals
                    </h5>

                    <p>
                      Connect with qualified doctors across different
                      departments and specialties for reliable medical care.
                    </p>

                  </div>

                </li>

                {/* ================= FEATURE 2 ================= */}
                <li>

                  <i className="fa-solid fa-hospital"></i>

                  <div>

                    <h5>
                      Specialized Healthcare Departments
                    </h5>

                    <p>
                      Explore specialized departments and healthcare
                      services designed to meet different patient needs.
                    </p>

                  </div>

                </li>

                {/* ================= FEATURE 3 ================= */}
                <li>

                  <i className="fa-solid fa-calendar-check"></i>

                  <div>

                    <h5>
                      Simple Appointment Booking
                    </h5>

                    <p>
                      Find your preferred doctor and department and
                      request an appointment through our simple system.
                    </p>

                  </div>

                </li>

              </ul>

              {/* Optional button */}
              <Link
                to="/doctors"
                className="btn mt-3"
              >
                Meet Our Doctors
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default About;