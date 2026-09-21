import { useEffect, useState } from "react";
import api from "../../services/api";

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

        setServices(
          Array.isArray(serviceData) ? serviceData : []
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
    const section = document.getElementById("appointment");

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

            {/* TITLE */}
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
            <p className="mt-[18px] text-[14px] leading-[1.7] text-[#444] md:text-[15px]">
              We provide reliable healthcare services designed to
              support patients at every stage of their healthcare journey.
            </p>

          </div>


          {/* =================================================
              VIEW ALL BUTTON
              ONLY SHOW WHEN SERVICES > 6
              ================================================= */}
          {!loading && !error && services.length > 6 && (

            <div className="mt-[30px] flex justify-end">

              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2  border-0 bg-transparent px-[24px] py-[10px] text-[14px] font-semibold text-[#1976c8] transition-all duration-300 hover:bg-[#105592]"
              >

                <span>
                  {showAll ? "Show Less" : "View All"}
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
                  className="group flex min-h-[310px] flex-col items-center border border-[#dedede] bg-white px-[24px] py-[62px] text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#c8ddeb] hover:shadow-[0_10px_30px_rgba(41,75,104,0.08)]"
                  >

                  {/* =================================================
                        ICON
                        ================================================= */}
                  <div className="relative mb-[22px] h-[62px] w-[62px]">

                    {/* BACK LAYER */}
                    <div className="absolute left-[-7px] top-[-7px] h-[54px] w-[54px] rounded-[4px] bg-[#d9ebfa]">
                    </div>


                    {/* MAIN ICON BOX */}
                    <div className="relative flex h-[56px] w-[56px] items-center justify-center rounded-[3px] bg-[#1976c8] text-white shadow-sm transition-all duration-300 group-hover:bg-[#105592]">

                        <i
                        className={`${service.icon || "bi bi-heart-pulse-fill"
                          } text-[25px]`}
                        ></i>

                      </div>

                  </div>


                  {/* =================================================
                        SERVICE NAME
                        ================================================= */}
                  <button
                    type="button"
                    onClick={scrollToAppointment}
                    className="border-0 bg-transparent p-0 text-center"
                  >

                    <h3 className="text-[20px] font-bold leading-[1.25] text-[#294b68] transition-colors duration-300 group-hover:text-[#1976c8]">
                      {service.name}
                    </h3>

                  </button>


                  {/* =================================================
                        SERVICE DESCRIPTION
                        ================================================= */}
                  <p className="mt-[14px] max-w-[330px] text-[14px] leading-[1.65] text-[#444]">
                    {service.description ||
                      "Professional healthcare services provided by our experienced medical team."}
                  </p>

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