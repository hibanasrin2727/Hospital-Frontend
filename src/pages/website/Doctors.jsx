import { useEffect, useState } from "react";
import api from "../../services/api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= GET DOCTORS =================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get(
          "/website/doctors"
        );

        setDoctors(response.data.data || response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("Unable to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <main className="main">

      {/* ================= DOCTORS SECTION ================= */}
      <section id="doctors" className="doctors section">

        {/* Section Title */}
        <div
          className="container section-title"
          data-aos="fade-up"
        >
          <h2>Doctors</h2>

          <p>
            Meet our experienced doctors and healthcare
            professionals across different specialties.
          </p>
        </div>

        <div className="container">

          {/* Loading */}
          {loading && (
            <div className="text-center py-5">
              <p>Loading doctors...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-5">
              <p>{error}</p>
            </div>
          )}

          {/* No doctors */}
          {!loading && !error && doctors.length === 0 && (
            <div className="text-center py-5">
              <p>No doctors available.</p>
            </div>
          )}

          {/* ================= DOCTOR LIST ================= */}
          {!loading && !error && doctors.length > 0 && (

            <div className="row gy-4">

              {doctors.map((doctor, index) => (

                <div
                  className="col-lg-6"
                  key={doctor._id}
                  data-aos="fade-up"
                  data-aos-delay={(index + 1) * 100}
                >

                  <div className="team-member d-flex align-items-start">

                    {/* Doctor Image */}
                    <div className="pic">

                      <img
                        src={
                          doctor.image
                            ? doctor.image
                            : `/assets/img/doctors/doctors-${
                                (index % 4) + 1
                              }.jpg`
                        }
                        className="img-fluid"
                        alt={doctor.name}
                      />

                    </div>

                    {/* Doctor Information */}
                    <div className="member-info">

                      <h4>
                        {doctor.name}
                      </h4>

                      <span>
                        {doctor.specialization ||
                          doctor.specialty ||
                          "Medical Specialist"}
                      </span>

                      <p>
                        {doctor.description ||
                          `Dr. ${doctor.name} provides professional
                          healthcare services to patients.`}
                      </p>

                      {/* Social Links */}
                      <div className="social">

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

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </main>
  );
};

export default Doctors;