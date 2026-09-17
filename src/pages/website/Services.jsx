import { useEffect, useState } from "react";
import api from "../../services/api";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= GET SERVICES =================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get(
          "/website/services"
        );

        setServices(
          response.data.data || response.data
        );
      } catch (error) {
        console.error("Error fetching services:", error);

        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ================= SCROLL TO APPOINTMENT =================
  const scrollToAppointment = () => {
    const section = document.getElementById("appointment");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="main">

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="services section">

        {/* Section Title */}
        <div
          className="container section-title"
          data-aos="fade-up"
        >
          <h2>Services</h2>

          <p>
            We provide reliable healthcare services designed to
            support patients at every stage of their healthcare journey.
          </p>
        </div>

        <div className="container">

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="text-center py-5">
              <p>Loading services...</p>
            </div>
          )}

          {/* ================= ERROR ================= */}
          {error && (
            <div className="text-center py-5">
              <p>{error}</p>
            </div>
          )}

          {/* ================= NO SERVICES ================= */}
          {!loading &&
            !error &&
            services.length === 0 && (
              <div className="text-center py-5">
                <p>No services available.</p>
              </div>
            )}

          {/* ================= SERVICES LIST ================= */}
          {!loading &&
            !error &&
            services.length > 0 && (

              <div className="row gy-4">

                {services.map((service, index) => (

                  <div
                    className="col-lg-4 col-md-6"
                    key={service._id}
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                  >

                    <div className="service-item position-relative">

                      {/* ================= ICON ================= */}
                      <div className="icon">
                        <i
                          className={
                            service.icon ||
                            "fas fa-notes-medical"
                          }
                        ></i>
                      </div>

                      {/* ================= SERVICE NAME ================= */}
                      <button
                        type="button"
                        onClick={scrollToAppointment}
                        className="stretched-link border-0 bg-transparent p-0 text-start"
                      >
                        <h3>
                          {service.name}
                        </h3>
                      </button>

                      {/* ================= DESCRIPTION ================= */}
                      <p>
                        {service.description ||
                          "Professional healthcare services provided by our experienced medical team."}
                      </p>

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

export default Services;