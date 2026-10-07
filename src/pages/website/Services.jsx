
import { useEffect, useState } from "react";
import api from "../../services/api";

// =====================================================
// BACKEND BASE URL
// =====================================================

const BACKEND_URL = "http://localhost:5000";

// =====================================================
// GET FILE URL
// =====================================================

const getFileUrl = (file) => {
  if (!file) return "";

  // Already a complete URL
  if (
    file.startsWith("http://") ||
    file.startsWith("https://") ||
    file.startsWith("data:")
  ) {
    return file;
  }

  // Backend uploaded file
  if (file.startsWith("/")) {
    return `${BACKEND_URL}${file} `;
  }

  return `${BACKEND_URL}/${file}`;
};

// =====================================================
// SHUFFLE SERVICES
// =====================================================

const shuffleServices = (serviceList) => {
  const shuffled = [...serviceList];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(
      Math.random() * (i + 1)
    );

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // SHOW ALL SERVICES
  // =====================================================

  const [showAll, setShowAll] = useState(false);

  // =====================================================
  // GET SERVICES
  // =====================================================

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/website/services");

        const serviceData =
          response.data?.data ||
          response.data?.services ||
          response.data;

        const validServices = Array.isArray(serviceData)
          ? serviceData
          : [];

        // Shuffle services every time page loads
        const shuffledServices =
          shuffleServices(validServices);

        setServices(shuffledServices);
      } catch (error) {
        console.error(
          "Error fetching services:",
          error
        );

        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // =====================================================
  // SERVICES TO DISPLAY
  // =====================================================

  const displayedServices = showAll
    ? services
    : services.slice(0, 6);

  // =====================================================
  // SCROLL TO APPOINTMENT
  // =====================================================

  const scrollToAppointment = () => {
    const section =
      document.getElementById("appointment");

    if (section) {
      const headerOffset = 107;

      const sectionPosition =
        section.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="w-full">

      {/* =====================================================
          SERVICES SECTION
          ===================================================== */}

      <section
        id="services"
        className="scroll-mt-[107px] bg-white py-[65px] md:py-[75px] lg:py-[80px]"
      >

        {/* =================================================
            CONTAINER
            ================================================= */}

        <div className="mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">

          {/* =================================================
              SECTION TITLE
              ================================================= */}

          <div className="mx-auto max-w-[850px] text-center">

            <h2 className="text-[30px] font-semibold leading-[1.2] text-[#294b68] md:text-[32px]">
              Services
            </h2>

            {/* TITLE LINE */}

            <div className="mx-auto mt-[15px] flex w-[120px] items-center justify-center">

              <span className="h-[1px] w-[30px] bg-[#c9c9c9]"></span>

              <span className="h-[3px] w-[52px] bg-[#1976c8]"></span>

              <span className="h-[1px] w-[30px] bg-[#c9c9c9]"></span>

            </div>

            {/* DESCRIPTION */}

            <p className="!mt-[18px] text-[14px] leading-[1.7] text-[#444] md:text-[15px]">
              We provide reliable healthcare services designed to
              support patients at every stage of their healthcare journey.
            </p>

          </div>

          {/* =================================================
              VIEW ALL BUTTON
              ================================================= */}

          {!loading &&
            !error &&
            services.length > 6 && (

            <div className="mt-[30px] flex justify-end">

              <button
                type="button"
                onClick={() =>
                  setShowAll(!showAll)
                }
                className="inline-flex items-center gap-2 border-0 bg-transparent px-[24px] py-[10px] text-[14px] font-semibold text-[#1976c8] transition-all duration-300 hover:bg-[#105592] hover:text-black"
              >

                <span>
                  {showAll
                    ? "Show Less"
                    : "View All"}
                </span>

                <i
                  className={`bi ${showAll
                      ? "bi-chevron-up"
                      : "bi-arrow-right"
                    } text-[12px]`}
                ></i>

              </button>

            </div>
            )}

          {/* =================================================
              LOADING
              ================================================= */}

          {loading && (

            <div className="flex min-h-[250px] items-center justify-center">

              <div className="flex flex-col items-center">

                <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#dbeaf6] border-t-[#1976c8]"></div>

                <p className="mt-4 text-[14px] text-[#666]">
                  Loading services...
                </p>

              </div>

            </div>
          )}

          {/* =================================================
              ERROR
              ================================================= */}

          {!loading && error && (

            <div className="flex min-h-[250px] items-center justify-center">

              <p className="text-[15px] text-red-500">
                {error}
              </p>

            </div>
          )}

          {/* =================================================
              NO SERVICES
              ================================================= */}

          {!loading &&
            !error &&
            services.length === 0 && (

            <div className="flex min-h-[250px] items-center justify-center">

              <p className="text-[15px] text-[#666]">
                No services available.
              </p>

            </div>
            )}

          {/* =================================================
              SERVICES GRID
              ================================================= */}

          {!loading &&
            !error &&
            services.length > 0 && (

            <div className="mt-[45px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-3">

              {displayedServices.map((service) => (

                <div
                  key={service._id}
                  className="group flex min-h-[420px] flex-col items-center border border-[#dedede] bg-white px-[24px] py-[35px] text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#c8ddeb] hover:shadow-[0_10px_30px_rgba(41,75,104,0.08)]"
                >

                  {/* =================================================
                      SERVICE IMAGE
                      ================================================= */}

                  <div className="mb-[25px] h-[150px] w-full overflow-hidden rounded-[4px] bg-[#eaf5fb]">

                    {service.image ? (

                      <img
                        src={getFileUrl(service.image)}
                        alt={service.name}
                        className="!h-full !w-full !object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                    ) : (

                        <div className="flex h-full w-full items-center justify-center text-[#1976c8]">

                          <i className="bi bi-image text-[35px]"></i>

                      </div>

                    )}

                  </div>

                  {/* =================================================
                      SERVICE NAME
                      ================================================= */}

                  <button
                    type="button"
                    onClick={scrollToAppointment}
                    className="border-0 bg-transparent p-0 text-center"
                  >

                    <h3 className="!m-0 !text-[20px] font-bold leading-[1.25] text-[#294b68] transition-colors duration-300 group-hover:text-[#1976c8]">
                      {service.name}
                    </h3>

                  </button>

                  {/* =================================================
                      SERVICE DESCRIPTION
                      ================================================= */}

                  <p className="!mt-[18px] max-w-[330px] text-[14px] leading-[1.65] text-[#444]">
                    {service.description ||
                      "Professional healthcare services provided by our experienced medical team."}
                  </p>

                  {/* =================================================
                      PRICE
                      ================================================= */}

                  {service.price !== undefined &&
                    service.price !== null && (

                      <div className="mt-auto w-full border-t border-gray-100 pt-4">

                        <div className="flex items-center justify-between">

                          <div className="text-left">

                            <p className="!mb-0 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                              Price
                            </p>

                            <p className="!mb-0 mt-1 text-base font-bold text-[#294b68]">
                              ₹
                              {Number(
                                service.price || 0
                              ).toLocaleString("en-IN")}
                            </p>

                          </div>

                        </div>

                      </div>
                    )}

                  {/* =================================================
                      BOTTOM HOVER LINE
                      ================================================= */}

                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full"></div>

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
