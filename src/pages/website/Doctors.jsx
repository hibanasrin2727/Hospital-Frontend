import { useEffect, useState } from "react";
import api from "../../services/api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  // ================= GET ACTIVE DOCTORS =================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/website/doctors");

        console.log("Doctors API response:", response.data);

        const doctorData = response.data?.doctors || [];

        setDoctors(
          Array.isArray(doctorData) ? doctorData : []
        );
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("Unable to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // ================= DOCTOR IMAGE =================
  const getDoctorImage = (doctor, index) => {
    if (doctor?.image) {
      if (doctor.image.startsWith("http")) {
        return doctor.image;
      }

      return doctor.image.startsWith("/")
        ? doctor.image
        : `/assets/img/${doctor.image}`;
    }

    return `/assets/img/doctors/doctors-${(index % 4) + 1}.jpg`;
  };

  // ================= DISPLAYED DOCTORS =================
  const displayedDoctors = showAll
    ? doctors
    : doctors.slice(0, 4);

  return (
    <main className="w-full">

      {/* =====================================================
          DOCTORS SECTION
      ====================================================== */}
      <section
        id="doctors"
        className="scroll-mt-[107px] bg-white py-[65px] md:py-[75px] lg:py-[80px]"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">

          {/* =================================================
              SECTION TITLE
          ================================================== */}
          <div className="mx-auto max-w-[850px] text-center">

            <h2 className="text-[30px] font-semibold leading-[1.2] text-[#294b68] md:text-[32px]">
              Doctors
            </h2>

            {/* Title Divider */}
            <div className="mx-auto mt-[16px] flex h-[3px] w-[160px] items-center justify-center">
              <span className="h-[1px] w-[50px] bg-[#bdbdbd]"></span>

              <span className="h-[3px] w-[60px] bg-[#1976c8]"></span>

              <span className="h-[1px] w-[50px] bg-[#bdbdbd]"></span>
            </div>

            <p className="mt-[20px] text-[14px] leading-[1.7] text-[#444] md:text-[15px]">
              Meet our experienced doctors and healthcare professionals
              across different specialties.
            </p>

          </div>

          {/* =================================================
              LOADING
          ================================================== */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center">

                <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#dbeaf6] border-t-[#1976c8]"></div>

                <p className="mt-4 text-[14px] text-[#666]">
                  Loading doctors...
                </p>

              </div>
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================== */}
          {!loading && error && (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-[15px] text-red-500">
                {error}
              </p>
            </div>
          )}

          {/* =================================================
              NO DOCTORS
          ================================================== */}
          {!loading &&
            !error &&
            doctors.length === 0 && (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-[15px] text-[#666]">
                  No doctors available.
                </p>
              </div>
            )}

          {/* =================================================
              DOCTORS LIST
          ================================================= */}
          {!loading &&
            !error &&
            doctors.length > 0 && (
              <>
                <div className="mt-[58px] grid grid-cols-1 gap-[24px] lg:grid-cols-2">

                {displayedDoctors.map((doctor, index) => (
                  <div
                    key={doctor._id}
                    className="group flex min-h-[220px] items-center rounded-[4px] bg-white p-[30px] shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(41,75,104,0.12)]"
                  >

                    {/* ================= DOCTOR IMAGE ================= */}
                    <div className="flex shrink-0 items-center justify-center">

                      <img
                        src={getDoctorImage(doctor, index)}
                        alt={doctor.name}
                        className="h-[150px] w-[150px] rounded-full object-cover"
                      />

                    </div>

                    {/* ================= DOCTOR INFORMATION ================= */}
                    <div className="ml-[30px] min-w-0">

                      {/* Name */}
                      <h3 className="text-[20px] font-bold leading-[1.3] text-[#294b68] transition-colors duration-300 group-hover:text-[#1976c8] md:text-[21px]">
                        {doctor.name}
                      </h3>

                      {/* Specialization */}
                      <p className="mt-[5px] text-[14px] font-medium text-[#222]">
                        {doctor.specialization ||
                          doctor.specialty ||
                          "Medical Specialist"}
                      </p>

                      {/* Divider */}
                      <div className="mt-[13px] h-[1px] w-[50px] bg-[#dddddd]"></div>

                      {/* Description */}
                      <p className="mt-[12px] line-clamp-2 text-[14px] leading-[1.55] text-[#444]">
                        {doctor.description ||
                          ` ${doctor.name} provides professional healthcare services to patients.`}
                      </p>

                      {/* ================= SOCIAL LINKS ================= */}
                      <div className="mt-[14px] flex items-center gap-[9px]">

                        {/* X */}
                        <a
                          href="#"
                          aria-label="Twitter"
                          onClick={(e) => e.preventDefault()}
                          className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#f1f1f1] text-[#666] transition-all duration-300 hover:bg-[#1976c8] hover:text-white"
                        >
                          <i className="bi bi-twitter-x text-[15px]"></i>
                        </a>

                        {/* Facebook */}
                        <a
                          href="#"
                          aria-label="Facebook"
                          onClick={(e) => e.preventDefault()}
                          className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#f1f1f1] text-[#666] transition-all duration-300 hover:bg-[#1976c8] hover:text-white"
                        >
                          <i className="bi bi-facebook text-[15px]"></i>
                        </a>

                        {/* Instagram */}
                        <a
                          href="#"
                          aria-label="Instagram"
                          onClick={(e) => e.preventDefault()}
                          className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#f1f1f1] text-[#666] transition-all duration-300 hover:bg-[#1976c8] hover:text-white"
                        >
                          <i className="bi bi-instagram text-[15px]"></i>
                        </a>

                        {/* LinkedIn */}
                        <a
                          href="#"
                          aria-label="LinkedIn"
                          onClick={(e) => e.preventDefault()}
                          className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#f1f1f1] text-[#666] transition-all duration-300 hover:bg-[#1976c8] hover:text-white"
                        >
                          <i className="bi bi-linkedin text-[15px]"></i>
                        </a>

                      </div>

                    </div>
                  </div>
                ))}

              </div>

              {/* =================================================
                    VIEW ALL BUTTON
                ================================================== */}
              {doctors.length > 4 && (
                <div className="mt-[35px] flex justify-center">

                  <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="inline-flex items-center gap-2 rounded-full border-0 bg-transparent px-[26px] py-[11px] text-[14px] font-semibold text-[#1976c8] transition-all duration-300 hover:bg-[#105592]"
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

            </>
            )}

        </div>
      </section>
    </main>
  );
};

export default Doctors;