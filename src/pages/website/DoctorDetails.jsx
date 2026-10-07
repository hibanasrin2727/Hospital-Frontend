
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  Stethoscope,
  Building2,
  GraduationCap,
  BriefcaseBusiness,
  UserRound,
} from "lucide-react";

import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import api from "../../services/api";

const BACKEND_URL = "http://localhost:5000";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // CHECK DASHBOARD / WEBSITE
  // =====================================================

  const isDashboard =
    location.pathname.startsWith("/dashboard");

  // =====================================================
  // DOCTOR IMAGE
  // =====================================================

  const getDoctorImage = (image) => {
    if (!image) {
      return "/assets/img/doctors/doctors-1.jpg";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${BACKEND_URL}${image}`;
    }

    if (image.startsWith("uploads/")) {
      return `${BACKEND_URL}/${image}`;
    }

    return `${BACKEND_URL}/uploads/doctors/${image}`;
  };

  // =====================================================
  // FETCH DOCTOR
  // =====================================================

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError("");

        /*
         * Public endpoint is intentionally used here.
         *
         * The backend already provides:
         * GET /api/website/doctors/:id
         */

        const response = await api.get(
          `/website/doctors/${id}`
        );

        console.log(
          "Doctor details response:",
          response.data
        );

        const doctorData =
          response.data?.doctor ||
          response.data?.data ||
          response.data;

        if (
          !doctorData ||
          typeof doctorData !== "object"
        ) {
          throw new Error("Doctor not found");
        }

        setDoctor(doctorData);

      } catch (error) {
        console.error(
          "Error fetching doctor:",
          error
        );

        setError(
          error?.response?.data?.message ||
            "Unable to load doctor details."
        );

      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }

  }, [id]);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="w-full bg-white">

        <section className="min-h-[70vh] px-6 py-[100px] md:px-8 lg:px-10">

          <div className="mx-auto flex max-w-[1400px] items-center justify-center">

            <div className="flex flex-col items-center">

              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#dbeaf6] border-t-[#1976c8]"></div>

              <p className="mt-4 text-[14px] text-[#666]">
                Loading doctor details...
              </p>

            </div>

          </div>

        </section>

      </main>
    );
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error || !doctor) {
    return (
      <main className="w-full bg-white">

        <section className="min-h-[70vh] px-6 py-[100px] md:px-8 lg:px-10">

          <div className="mx-auto flex max-w-[700px] flex-col items-center justify-center text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf5fb] text-[#1976c8]">
              <Stethoscope size={28} />
            </div>

            <h1 className="mt-5 text-[24px] font-bold text-[#294b68]">
              Doctor Not Found
            </h1>

            <p className="mt-2 text-[14px] leading-[1.7] text-[#666]">
              {error ||
                "The requested doctor could not be found."}
            </p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1976c8] px-6 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#105592]"
            >
              <ArrowLeft size={16} />
              Back to Doctors
            </button>

          </div>

        </section>

      </main>
    );
  }


  // =====================================================
  // DOCTOR DATA
  // =====================================================

  const doctorName =
    doctor.name || "Doctor";

  const specialization =
    doctor.specialization ||
    "Medical Specialist";

  const department =
    doctor.departmentId?.name ||
    doctor.departmentName ||
    doctor.department ||
    "Hospital Department";

  const qualification =
    doctor.qualification ||
    "Medical Qualification";

  const experience =
    doctor.experience !== undefined &&
    doctor.experience !== null &&
    doctor.experience !== ""
      ? `${doctor.experience} Years`
      : "Not specified";

  const phone =
    doctor.phone || "Not available";

  const email =
    doctor.email || "Not available";

  const schedule =
    doctor.schedule ||
    "Schedule not available";

  const description =
    doctor.description ||
    `${doctorName} is a dedicated ${specialization} providing professional healthcare services to patients.`;

  const isActive =
    doctor.status === "active" ||
    doctor.status === "Active";


  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="w-full bg-[#f8fbfd]">

      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <section className="border-b border-[#e6eef4] bg-white">

        <div className="mx-auto max-w-[1400px] px-6 py-[25px] md:px-8 lg:px-10">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#666] transition-colors duration-300 hover:text-[#1976c8]"
          >
            <ArrowLeft size={17} />
            Back to Doctors
          </button>

          <div className="mt-[20px]">

            <h1 className="!m-0 text-[28px] font-bold leading-[1.2] text-[#294b68] md:text-[32px]">
              Doctor Details
            </h1>

            <p className="mt-[8px] text-[14px] leading-[1.6] text-[#666] md:text-[15px]">
              View detailed information about our doctor and healthcare professional.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          MAIN CONTENT
      ================================================== */}

      <section className="px-6 py-[45px] md:px-8 md:py-[55px] lg:px-10">

        <div className="mx-auto max-w-[1200px]">

          {/* =================================================
              PROFILE
          ================================================== */}

          <div className="overflow-hidden rounded-2xl border border-[#e6eef4] bg-white shadow-[0_6px_30px_rgba(41,75,104,0.08)]">

            <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr]">

              {/* IMAGE */}

              <div className="flex min-h-[360px] items-center justify-center bg-[#eaf5fb] p-8 lg:min-h-[400px]">

                <div className="relative">

                  <div className="h-[250px] w-[250px] overflow-hidden rounded-full border-[8px] border-white shadow-[0_8px_30px_rgba(41,75,104,0.15)] md:h-[280px] md:w-[280px]">

                    <img
                      src={getDoctorImage(
                        doctor.image
                      )}
                      alt={doctorName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;

                        e.currentTarget.src =
                          "/assets/img/doctors/doctors-1.jpg";
                      }}
                    />

                  </div>

                  {/* STATUS */}

                  <div className="absolute bottom-[12px] right-[8px] flex items-center gap-2 rounded-full border-4 border-[#eaf5fb] bg-white px-4 py-2 shadow-sm">

                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isActive
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></span>

                    <span className="text-[12px] font-semibold text-[#294b68]">
                      {isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </div>

                </div>

              </div>


              {/* PROFILE INFORMATION */}

              <div className="flex flex-col justify-center p-7 md:p-10">

                <div className="flex flex-wrap items-center gap-3">

                  <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf5fb] px-4 py-2 text-[12px] font-semibold text-[#1976c8]">

                    <Stethoscope size={14} />

                    {specialization}

                  </span>


                  {isActive && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf3] px-4 py-2 text-[12px] font-semibold text-[#15803d]">

                      <CheckCircle2 size={14} />

                      Available

                    </span>
                  )}

                </div>


                <h2 className="!m-0 mt-5 text-[30px] font-bold leading-[1.2] text-[#294b68] md:text-[36px]">
                  {doctorName}
                </h2>


                <p className="mt-3 flex items-center gap-2 text-[15px] font-medium text-[#555]">

                  <Building2
                    size={17}
                    className="shrink-0 text-[#1976c8]"
                  />

                  {department}

                </p>


                <div className="mt-5 h-[1px] w-[60px] bg-[#1976c8]"></div>


                <p className="mt-5 max-w-[700px] text-[14px] leading-[1.8] text-[#555]">
                  {description}
                </p>


                {!isDashboard && (
                  <div className="mt-7">

                    <Link
                      to={`/appointment?doctor=${doctor._id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#1976c8] px-7 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#105592]"
                    >

                      <CalendarCheck size={17} />

                      Book Appointment

                    </Link>

                  </div>
                )}

              </div>

            </div>

          </div>


          {/* =================================================
              INFORMATION CARDS
          ================================================== */}

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* PROFESSIONAL */}

            <div className="rounded-2xl border border-[#e6eef4] bg-white p-6 shadow-[0_5px_25px_rgba(41,75,104,0.06)] md:p-7">

              <div className="flex items-center gap-3 border-b border-[#edf2f5] pb-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">
                  <GraduationCap size={21} />
                </div>

                <div>

                  <h3 className="!m-0 text-[17px] font-bold text-[#294b68]">
                    Professional Information
                  </h3>

                  <p className="!m-0 mt-1 text-[12px] text-[#888]">
                    Doctor's professional background
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-4">

                <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f8fbfd] p-4">

                  <div className="flex items-center gap-3">

                    <GraduationCap
                      size={18}
                      className="text-[#1976c8]"
                    />

                    <span className="text-[13px] text-[#666]">
                      Qualification
                    </span>

                  </div>

                  <span className="text-right text-[13px] font-semibold text-[#294b68]">
                    {qualification}
                  </span>

                </div>


                <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f8fbfd] p-4">

                  <div className="flex items-center gap-3">

                    <BriefcaseBusiness
                      size={18}
                      className="text-[#1976c8]"
                    />

                    <span className="text-[13px] text-[#666]">
                      Experience
                    </span>

                  </div>

                  <span className="text-[13px] font-semibold text-[#294b68]">
                    {experience}
                  </span>

                </div>


                <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f8fbfd] p-4">

                  <div className="flex items-center gap-3">

                    <Building2
                      size={18}
                      className="text-[#1976c8]"
                    />

                    <span className="text-[13px] text-[#666]">
                      Department
                    </span>

                  </div>

                  <span className="text-right text-[13px] font-semibold text-[#294b68]">
                    {department}
                  </span>

                </div>

              </div>

            </div>


            {/* CONTACT */}

            <div className="rounded-2xl border border-[#e6eef4] bg-white p-6 shadow-[0_5px_25px_rgba(41,75,104,0.06)] md:p-7">

              <div className="flex items-center gap-3 border-b border-[#edf2f5] pb-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">
                  <Phone size={20} />
                </div>

                <div>

                  <h3 className="!m-0 text-[17px] font-bold text-[#294b68]">
                    Contact Information
                  </h3>

                  <p className="!m-0 mt-1 text-[12px] text-[#888]">
                    Doctor's contact details
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-4">

                <div className="flex items-center gap-4 rounded-xl bg-[#f8fbfd] p-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#1976c8] shadow-sm">
                    <Phone size={17} />
                  </div>

                  <div className="min-w-0">

                    <p className="!m-0 text-[11px] uppercase tracking-wide text-[#999]">
                      Phone
                    </p>

                    <p className="!m-0 mt-1 truncate text-[13px] font-semibold text-[#294b68]">
                      {phone}
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-4 rounded-xl bg-[#f8fbfd] p-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#1976c8] shadow-sm">
                    <Mail size={17} />
                  </div>

                  <div className="min-w-0">

                    <p className="!m-0 text-[11px] uppercase tracking-wide text-[#999]">
                      Email
                    </p>

                    <p className="!m-0 mt-1 truncate text-[13px] font-semibold text-[#294b68]">
                      {email}
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-4 rounded-xl bg-[#f8fbfd] p-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#1976c8] shadow-sm">
                    <UserRound size={17} />
                  </div>

                  <div>

                    <p className="!m-0 text-[11px] uppercase tracking-wide text-[#999]">
                      Status
                    </p>

                    <p
                      className={`!m-0 mt-1 text-[13px] font-semibold ${
                        isActive
                          ? "text-[#15803d]"
                          : "text-[#666]"
                      }`}
                    >
                      {isActive
                        ? "Active"
                        : "Inactive"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              SCHEDULE
          ================================================== */}

          <div className="mt-6 rounded-2xl border border-[#e6eef4] bg-white p-6 shadow-[0_5px_25px_rgba(41,75,104,0.06)] md:p-7">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">
                  <Clock3 size={21} />
                </div>

                <div>

                  <h3 className="!m-0 text-[17px] font-bold text-[#294b68]">
                    Consultation Schedule
                  </h3>

                  <p className="!m-0 mt-1 text-[12px] text-[#888]">
                    Doctor's available working hours
                  </p>

                </div>

              </div>


              <div className="rounded-xl bg-[#eaf5fb] px-5 py-3">

                <p className="!m-0 text-[13px] font-semibold text-[#294b68]">
                  {schedule}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default DoctorDetails;
