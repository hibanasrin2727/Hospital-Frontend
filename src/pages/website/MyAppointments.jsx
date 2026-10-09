import {
  CalendarDays,
  Clock3,
  UserRound,
  Building2,
  Search,
  CheckCircle2,
  CircleAlert,
  XCircle,
  ArrowLeft,
  CalendarCheck2,
  Phone,
  FileText,
  Stethoscope,
  Ban,
  ShieldCheck,
  RefreshCw,
  Pencil,
  Eye,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import {
  getUser,
  isLoggedIn,
} from "../../utils/auth";


const MyAppointments = () => {

  const navigate = useNavigate();

  const user = getUser();


  // =====================================================
  // STATE
  // =====================================================

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");


  // =====================================================
  // CANCEL MODAL STATE
  // =====================================================

  const [cancelModalOpen, setCancelModalOpen] =
    useState(false);

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [cancellingId, setCancellingId] =
    useState("");

  const [cancelError, setCancelError] =
    useState("");

  const [cancelSuccess, setCancelSuccess] =
    useState("");


  // =====================================================
  // VIEW DETAILS MODAL STATE
  // =====================================================

  const [viewModalOpen, setViewModalOpen] =
    useState(false);

  const [viewAppointment, setViewAppointment] =
    useState(null);


  // =====================================================
  // FETCH APPOINTMENTS
  // =====================================================

  const fetchAppointments = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await api.get(
          "/website/appointments/my"
        );

      const appointmentData =
        response.data?.appointments ||
        response.data?.data ||
        response.data;

      setAppointments(
        Array.isArray(appointmentData)
          ? appointmentData
          : []
      );

    } catch (error) {

      console.error(
        "Error fetching appointments:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        navigate("/login");

        return;
      }

      setError(
        error.response?.data?.message ||
        "Unable to load your appointments. Please try again."
      );

      setAppointments([]);

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    if (!isLoggedIn()) {

      navigate("/login");

      return;
    }

    fetchAppointments();

  }, [navigate]);


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "Not available";
    }

    try {

      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

    } catch {

      return date;

    }
  };


  // =====================================================
  // FORMAT DATE + TIME
  // =====================================================

  const formatDateTime = (date) => {

    if (!date) {
      return "Not available";
    }

    try {

      return new Date(date).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    } catch {

      return date;

    }
  };


  // =====================================================
  // STATUS
  // =====================================================

  const getStatus = (appointment) => {

    return (
      appointment?.status ||
      "pending"
    ).toLowerCase();
  };


  // =====================================================
  // DOCTOR NAME
  // =====================================================

  const getDoctorName = (appointment) => {

    if (
      appointment?.doctorId?.name
    ) {
      return appointment.doctorId.name;
    }

    if (
      appointment?.doctor?.name
    ) {
      return appointment.doctor.name;
    }

    if (
      typeof appointment?.doctor === "string"
    ) {
      return appointment.doctor;
    }

    if (
      appointment?.doctorName
    ) {
      return appointment.doctorName;
    }

    return "Doctor";
  };


  // =====================================================
  // DEPARTMENT NAME
  // =====================================================

  const getDepartmentName = (appointment) => {

    if (
      appointment?.departmentId?.name
    ) {
      return appointment.departmentId.name;
    }

    if (
      appointment?.department?.name
    ) {
      return appointment.department.name;
    }

    if (
      typeof appointment?.department === "string"
    ) {
      return appointment.department;
    }

    if (
      appointment?.departmentName
    ) {
      return appointment.departmentName;
    }

    return "Department";
  };


  // =====================================================
  // DOCTOR SPECIALIZATION
  // =====================================================

  const getDoctorSpecialization = (
    appointment
  ) => {

    if (
      appointment?.doctorId?.specialization
    ) {
      return appointment.doctorId.specialization;
    }

    if (
      appointment?.doctor?.specialization
    ) {
      return appointment.doctor.specialization;
    }

    if (
      appointment?.specialization
    ) {
      return appointment.specialization;
    }

    return "Medical Specialist";
  };


  // =====================================================
  // PATIENT PHONE
  // =====================================================

  const getPatientPhone = (
    appointment
  ) => {

    return (
      appointment?.phone ||
      appointment?.patientPhone ||
      user?.phone ||
      user?.phoneNumber ||
      "Not available"
    );
  };


  // =====================================================
  // STATUS INFORMATION
  // =====================================================

  const getStatusInfo = (status) => {

    switch (status) {

      case "confirmed":

        return {

          label: "Confirmed",

          icon: CheckCircle2,

          className:
            "!border !border-[#c9e8d4] !bg-[#effaf3] !text-[#198754]",

          dot:
            "!bg-[#198754]",
        };


      case "completed":

        return {

          label: "Completed",

          icon: CheckCircle2,

          className:
            "!border !border-[#c8def1] !bg-[#eef6fc] !text-[#1976c8]",

          dot:
            "!bg-[#1976c8]",
        };


      case "cancelled":
      case "canceled":

        return {

          label: "Cancelled",

          icon: XCircle,

          className:
            "!border !border-[#f3cccc] !bg-[#fff2f2] !text-[#dc3545]",

          dot:
            "!bg-[#dc3545]",
        };


      default:

        return {

          label: "Pending",

          icon: CircleAlert,

          className:
            "!border !border-[#f0dfb5] !bg-[#fffaf0] !text-[#b58105]",

          dot:
            "!bg-[#b58105]",
        };
    }
  };


  // =====================================================
  // ACTION PERMISSIONS
  // =====================================================

  const canCancelAppointment = (
    appointment
  ) => {

    const status =
      getStatus(appointment);

    return (
      status === "pending" ||
      status === "confirmed"
    );
  };


  const canEditAppointment = (
    appointment
  ) => {

    return (
      getStatus(appointment) ===
      "pending"
    );
  };


  // =====================================================
  // EDIT APPOINTMENT
  // =====================================================

  const handleEditAppointment = (
    appointment
  ) => {

    if (!appointment?._id) {
      return;
    }

    navigate(
      "/appointment",
      {
        state: {
          editAppointment:
            appointment,
        },
      }
    );
  };


  // =====================================================
  // VIEW APPOINTMENT DETAILS
  // =====================================================

  const openViewModal = (
    appointment
  ) => {

    setViewAppointment(
      appointment
    );

    setViewModalOpen(true);
  };


  const closeViewModal = () => {

    setViewModalOpen(false);

    setViewAppointment(null);
  };


  // =====================================================
  // FILTER APPOINTMENTS
  // =====================================================

  const filteredAppointments =
    useMemo(() => {

      return appointments.filter(
        (appointment) => {

          const doctorName =
            getDoctorName(
              appointment
            ).toLowerCase();

          const departmentName =
            getDepartmentName(
              appointment
            ).toLowerCase();

          const reason =
            (
              appointment?.reason ||
              ""
            ).toLowerCase();

          const searchValue =
            search
              .trim()
              .toLowerCase();

          const matchesSearch =
            !searchValue ||
            doctorName.includes(
              searchValue
            ) ||
            departmentName.includes(
              searchValue
            ) ||
            reason.includes(
              searchValue
            );

          const status =
            getStatus(
              appointment
            );

          const matchesStatus =
            statusFilter === "all" ||
            status === statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    }, [
      appointments,
      search,
      statusFilter,
    ]);


  // =====================================================
  // STATISTICS
  // =====================================================

  const totalAppointments =
    appointments.length;


  const pendingAppointments =
    appointments.filter(
      (appointment) =>
        getStatus(
          appointment
        ) === "pending"
    ).length;


  const confirmedAppointments =
    appointments.filter(
      (appointment) =>
        getStatus(
          appointment
        ) === "confirmed"
    ).length;


  const completedAppointments =
    appointments.filter(
      (appointment) =>
        getStatus(
          appointment
        ) === "completed"
    ).length;


  const cancelledAppointments =
    appointments.filter(
      (appointment) => {

        const status =
          getStatus(
            appointment
          );

        return (
          status === "cancelled" ||
          status === "canceled"
        );
      }
    ).length;


  // =====================================================
  // CANCEL MODAL
  // =====================================================

  const openCancelModal = (
    appointment
  ) => {

    setSelectedAppointment(
      appointment
    );

    setCancelError("");

    setCancelSuccess("");

    setCancelModalOpen(true);
  };


  const closeCancelModal = () => {

    if (cancellingId) {
      return;
    }

    setCancelModalOpen(false);

    setSelectedAppointment(null);

    setCancelError("");
  };


  // =====================================================
  // CANCEL APPOINTMENT
  // =====================================================

  const handleCancelAppointment =
    async () => {

      if (
        !selectedAppointment?._id
      ) {
        return;
      }

      try {

        setCancellingId(
          selectedAppointment._id
        );

        setCancelError("");

        setCancelSuccess("");

        const response =
          await api.patch(
            `/website/appointments/${selectedAppointment._id}/cancel`
          );

        const updatedAppointment =
          response.data?.appointment;

        setAppointments(
          (previousAppointments) =>
            previousAppointments.map(
              (appointment) => {

                if (
                  appointment._id ===
                  selectedAppointment._id
                ) {

                  return (
                    updatedAppointment ||
                    {
                      ...appointment,
                      status:
                        "cancelled",
                      cancellationReason:
                        "",
                      cancelledAt:
                        new Date().toISOString(),
                    }
                  );
                }

                return appointment;
              }
            )
        );

        setCancelSuccess(
          response.data?.message ||
          "Appointment cancelled successfully."
        );

        setTimeout(() => {

          setCancelModalOpen(false);

          setSelectedAppointment(null);

          setCancelSuccess("");

        }, 1200);

      } catch (error) {

        console.error(
          "Cancel appointment error:",
          error
        );

        if (
          error.response?.status ===
            401 ||
          error.response?.status ===
            403
        ) {

          navigate("/login");

          return;
        }

        setCancelError(
          error.response?.data?.message ||
          "Unable to cancel the appointment. Please try again."
        );

      } finally {

        setCancellingId("");

      }
    };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <main className="!w-full !bg-white">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <section className="!relative !overflow-hidden !border-b !border-[#e8edf2] !bg-[#f7f9fb] !py-[28px] md:!py-[34px]">

        <div className="!pointer-events-none !absolute !right-[-80px] !top-[-100px] !h-[220px] !w-[220px] !rounded-full !bg-[#eaf4fb] !opacity-70"></div>

        <div className="!relative !mx-auto !max-w-[1400px] !px-2">

          <div className="!flex !flex-col !items-start !justify-between !gap-[20px] sm:!flex-row sm:!items-center">

            <div className="!min-w-0">

  {/* Title Row */}
  <div className="!flex !items-center !gap-[14px]">

    <button
      type="button"
      onClick={() => navigate("/")}
      aria-label="Back to Home"
      className="!flex !h-[38px] !w-[38px] !shrink-0 !items-center !justify-center"
    >
      <ArrowLeft
        size={24}
        strokeWidth={2}
      />
    </button>

    <h1 className="!m-0 !text-[28px] !font-bold !leading-[1.2] !text-[#294b68] md:!text-[34px]">
      My Appointments
    </h1>

  </div>

  {/* Description */}
  <p className="!mb-0 !mt-[8px] ml-[55px] !max-w-[800px] !text-[13px] !leading-[1.6] !text-[#666] md:!text-[14px]">
    Manage your upcoming appointments, view appointment details, and keep track of your healthcare visits.
  </p>

</div>


            <button
              type="button"
              onClick={() =>
                navigate(
                  "/appointment"
                )
              }
              className="!inline-flex !h-[43px] !w-fit !shrink-0 !items-center !justify-center !gap-[8px] !rounded-xl !border-0 !bg-[#1976c8] !px-[20px] !text-[13px] !font-semibold !text-white !shadow-[0_4px_14px_rgba(25,118,200,0.18)] transition-all duration-300 hover:!bg-[#105592] hover:!shadow-[0_6px_18px_rgba(25,118,200,0.25)]"
            >

              <CalendarCheck2
                size={16}
                strokeWidth={1.8}
              />

              Book New Appointment

            </button>

          </div>

        </div>

      </section>


      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="!bg-white !py-[42px] md:!py-[55px]">

        <div className="!mx-auto !max-w-[1250px] !px-6 md:!px-8 lg:!px-4">


          {/* =================================================
              WELCOME STRIP
          ================================================= */}

          <div className="!mb-[25px] !flex !flex-col !gap-[15px] !rounded-xl !border !border-[#dceaf5] !bg-[#f5faff] !px-[20px] !py-[17px] sm:!flex-row sm:!items-center sm:!justify-between">

            <div className="!flex !items-center !gap-[12px]">

              <div className="!flex !h-[40px] !w-[40px] !shrink-0 !items-center !justify-center !rounded-full !bg-[#e5f2fb] !text-[#1976c8]">

                <ShieldCheck
                  size={20}
                  strokeWidth={1.8}
                />

              </div>


              <div>

                <p className="!m-0 !text-[14px] !font-semibold !text-[#294b68]">
                  Hello,{" "}
                  {user?.name ||
                    user?.username ||
                    "Patient"}
                </p>

                <p className="!mb-0 !mt-[2px] !text-[12px] !text-[#777]">
                  Your appointment information is
                  private and securely managed.
                </p>

              </div>

            </div>


            <button
              type="button"
              onClick={fetchAppointments}
              disabled={loading}
              className="!inline-flex !h-[38px] !items-center !justify-center !gap-[7px] !rounded-xl !border !border-[#d5e3ed] !bg-white !px-[14px] !text-[12px] !font-medium !text-[#555] !shadow-none transition-all duration-200 hover:!border-[#1976c8] hover:!text-[#1976c8] disabled:!cursor-not-allowed disabled:!opacity-60"
            >

              <RefreshCw
                size={14}
                strokeWidth={1.8}
                className={
                  loading
                    ? "!animate-spin"
                    : ""
                }
              />

              Refresh

            </button>

          </div>


          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="!grid !grid-cols-1 !gap-[16px] sm:!grid-cols-2 lg:!grid-cols-4 xl:!grid-cols-5">


            {/* TOTAL */}

            <div className="!group !relative !overflow-hidden !rounded-xl !border !border-[#e3e9ee] !bg-white !p-[19px] !shadow-[0_3px_18px_rgba(0,0,0,0.035)] transition-all duration-300 hover:!-translate-y-[2px] hover:!shadow-[0_8px_25px_rgba(0,0,0,0.07)]">

              <div className="!absolute !bottom-0 !left-0 !top-0 !w-[3px] !bg-[#1976c8]"></div>

              <div className="!flex !items-center !justify-between">

                <div>

                  <p className="!m-0 !text-[11px] !font-medium !text-[#888]">
                    Total Appointments
                  </p>

                  <h3 className="!mb-0 !mt-[7px] !text-[25px] !font-bold !text-[#294b68]">
                    {totalAppointments}
                  </h3>

                </div>

                <div className="!flex !h-[40px] !w-[40px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                  <CalendarDays
                    size={19}
                    strokeWidth={1.8}
                  />

                </div>

              </div>

            </div>


            {/* PENDING */}

            <div className="!group !relative !overflow-hidden !rounded-xl !border !border-[#e3e9ee] !bg-white !p-[19px] !shadow-[0_3px_18px_rgba(0,0,0,0.035)] transition-all duration-300 hover:!-translate-y-[2px] hover:!shadow-[0_8px_25px_rgba(0,0,0,0.07)]">

              <div className="!absolute !bottom-0 !left-0 !top-0 !w-[3px] !bg-[#c99819]"></div>

              <div className="!flex !items-center !justify-between">

                <div>

                  <p className="!m-0 !text-[11px] !font-medium !text-[#888]">
                    Pending
                  </p>

                  <h3 className="!mb-0 !mt-[7px] !text-[25px] !font-bold !text-[#294b68]">
                    {pendingAppointments}
                  </h3>

                </div>

                <div className="!flex !h-[40px] !w-[40px] !items-center !justify-center !rounded-xl !bg-[#fff8e8] !text-[#b58105]">

                  <CircleAlert
                    size={19}
                    strokeWidth={1.8}
                  />

                </div>

              </div>

            </div>


            {/* CONFIRMED */}

            <div className="!group !relative !overflow-hidden !rounded-xl !border !border-[#e3e9ee] !bg-white !p-[19px] !shadow-[0_3px_18px_rgba(0,0,0,0.035)] transition-all duration-300 hover:!-translate-y-[2px] hover:!shadow-[0_8px_25px_rgba(0,0,0,0.07)]">

              <div className="!absolute !bottom-0 !left-0 !top-0 !w-[3px] !bg-[#198754]"></div>

              <div className="!flex !items-center !justify-between">

                <div>

                  <p className="!m-0 !text-[11px] !font-medium !text-[#888]">
                    Confirmed
                  </p>

                  <h3 className="!mb-0 !mt-[7px] !text-[25px] !font-bold !text-[#294b68]">
                    {confirmedAppointments}
                  </h3>

                </div>

                <div className="!flex !h-[40px] !w-[40px] !items-center !justify-center !rounded-xl !bg-[#effaf3] !text-[#198754]">

                  <CheckCircle2
                    size={19}
                    strokeWidth={1.8}
                  />

                </div>

              </div>

            </div>


            {/* COMPLETED */}

            <div className="!group !relative !overflow-hidden !rounded-xl !border !border-[#e3e9ee] !bg-white !p-[19px] !shadow-[0_3px_18px_rgba(0,0,0,0.035)] transition-all duration-300 hover:!-translate-y-[2px] hover:!shadow-[0_8px_25px_rgba(0,0,0,0.07)]">

              <div className="!absolute !bottom-0 !left-0 !top-0 !w-[3px] !bg-[#1976c8]"></div>

              <div className="!flex !items-center !justify-between">

                <div>

                  <p className="!m-0 !text-[11px] !font-medium !text-[#888]">
                    Completed
                  </p>

                  <h3 className="!mb-0 !mt-[7px] !text-[25px] !font-bold !text-[#294b68]">
                    {completedAppointments}
                  </h3>

                </div>

                <div className="!flex !h-[40px] !w-[40px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                  <CheckCircle2
                    size={19}
                    strokeWidth={1.8}
                  />

                </div>

              </div>

            </div>


            {/* CANCELLED */}

            <div className="!group !relative !overflow-hidden !rounded-xl !border !border-[#e3e9ee] !bg-white !p-[19px] !shadow-[0_3px_18px_rgba(0,0,0,0.035)] transition-all duration-300 hover:!-translate-y-[2px] hover:!shadow-[0_8px_25px_rgba(0,0,0,0.07)]">

              <div className="!absolute !bottom-0 !left-0 !top-0 !w-[3px] !bg-[#dc3545]"></div>

              <div className="!flex !items-center !justify-between">

                <div>

                  <p className="!m-0 !text-[11px] !font-medium !text-[#888]">
                    Cancelled
                  </p>

                  <h3 className="!mb-0 !mt-[7px] !text-[25px] !font-bold !text-[#294b68]">
                    {cancelledAppointments}
                  </h3>

                </div>

                <div className="!flex !h-[40px] !w-[40px] !items-center !justify-center !rounded-xl !bg-[#fff2f2] !text-[#dc3545]">

                  <XCircle
                    size={19}
                    strokeWidth={1.8}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              SEARCH + FILTER
          ================================================= */}

          <div className="!sticky !top-[78px] !z-[30] !mt-[30px] !rounded-xl !border !border-[#e3e9ee] !bg-white !p-[15px] !shadow-[0_4px_18px_rgba(0,0,0,0.05)]">

            <div className="!flex !flex-col !gap-[12px] md:!flex-row md:!items-center md:!justify-between">

              <div className="!relative !w-full md:!max-w-[500px]">

                <Search
                  size={17}
                  strokeWidth={1.8}
                  className="!absolute !left-[14px] !top-1/2 !-translate-y-1/2 !text-[#999]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search by doctor, department or reason..."
                  className="!h-[43px] !w-full !rounded-xl !border !border-[#d9e0e6] !bg-[#fbfcfd] !pl-[42px] !pr-[15px] !text-[13px] !text-[#333] !outline-none !shadow-none placeholder:!text-[#aaa] focus:!border-[#1976c8] focus:!bg-white focus:!ring-1 focus:!ring-[#1976c8]/10"
                />

              </div>


              <div className="!flex !w-full !items-center !gap-[10px] md:!w-auto">

                <span className="!hidden !text-[12px] !font-medium !text-[#777] sm:!inline">
                  Status:
                </span>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                  className="!h-[43px] !w-full !rounded-xl !border !border-[#d9e0e6] !bg-[#fbfcfd] !px-[13px] !text-[13px] !text-[#555] !outline-none !shadow-none focus:!border-[#1976c8] sm:!w-[190px]"
                >

                  <option value="all">
                    All Appointments
                  </option>

                  <option value="pending">
                    Pending
                  </option>

                  <option value="confirmed">
                    Confirmed
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                  <option value="cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              RESULTS COUNT
          ================================================= */}

          {!loading &&
            !error &&
            appointments.length > 0 && (

              <div className="!mb-[14px] !mt-[25px] !flex !items-center !justify-between">

                <p className="!m-0 !text-[12px] !text-[#888]">

                  Showing{" "}

                  <span className="!font-semibold !text-[#294b68]">
                    {filteredAppointments.length}
                  </span>{" "}

                  of{" "}

                  <span className="!font-semibold !text-[#294b68]">
                    {appointments.length}
                  </span>{" "}

                  appointments

                </p>

              </div>

            )}


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div className="!py-[70px] !text-center">

              <div className="!mx-auto !flex !h-[45px] !w-[45px] !items-center !justify-center !rounded-full !bg-[#eef6fc] !text-[#1976c8]">

                <RefreshCw
                  size={21}
                  strokeWidth={1.8}
                  className="!animate-spin"
                />

              </div>

              <p className="!mb-0 !mt-[14px] !text-[13px] !text-[#777]">
                Loading your appointments...
              </p>

            </div>

          )}


          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (

            <div className="!mt-[20px] !rounded-xl !border !border-[#f1d1d1] !bg-[#fff7f7] !px-[20px] !py-[35px] !text-center">

              <div className="!mx-auto !flex !h-[45px] !w-[45px] !items-center !justify-center !rounded-full !bg-[#fff0f0] !text-[#dc3545]">

                <CircleAlert
                  size={21}
                  strokeWidth={1.8}
                />

              </div>

              <h3 className="!mb-0 !mt-[13px] !text-[15px] !font-semibold !text-[#294b68]">
                Unable to load appointments
              </h3>

              <p className="!mb-0 !mt-[6px] !text-[12px] !text-[#777]">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchAppointments}
                className="!mt-[17px] !inline-flex !h-[39px] !items-center !gap-[7px] !rounded-xl !border-0 !bg-[#1976c8] !px-[16px] !text-[12px] !font-semibold !text-white transition-all hover:!bg-[#105592]"
              >

                <RefreshCw
                  size={14}
                />

                Try Again

              </button>

            </div>

          )}


          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {!loading &&
            !error &&
            appointments.length === 0 && (

              <div className="!mt-[20px] !rounded-xl !border !border-[#e3e9ee] !bg-[#fbfcfd] !px-[20px] !py-[65px] !text-center">

                <div className="!mx-auto !flex !h-[58px] !w-[58px] !items-center !justify-center !rounded-full !bg-[#eef6fc] !text-[#1976c8]">

                  <CalendarDays
                    size={27}
                    strokeWidth={1.6}
                  />

                </div>

                <h3 className="!mb-0 !mt-[16px] !text-[17px] !font-bold !text-[#294b68]">
                  No appointments yet
                </h3>

                <p className="!mx-auto !mb-0 !mt-[7px] !max-w-[430px] !text-[12px] !leading-[1.6] !text-[#888]">
                  You don't have any appointments
                  yet. Book an appointment with
                  one of our trusted doctors.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/appointment"
                    )
                  }
                  className="!mt-[20px] !inline-flex !h-[41px] !items-center !gap-[7px] !rounded-xl !border-0 !bg-[#1976c8] !px-[18px] !text-[12px] !font-semibold !text-white transition-all hover:!bg-[#105592]"
                >

                  <CalendarCheck2
                    size={15}
                  />

                  Book Appointment

                </button>

              </div>

            )}


          {/* =================================================
              NO SEARCH RESULTS
          ================================================= */}

          {!loading &&
            !error &&
            appointments.length > 0 &&
            filteredAppointments.length === 0 && (

              <div className="!mt-[20px] !rounded-xl !border !border-[#e3e9ee] !bg-[#fbfcfd] !px-[20px] !py-[55px] !text-center">

                <div className="!mx-auto !flex !h-[52px] !w-[52px] !items-center !justify-center !rounded-full !bg-[#f3f6f8] !text-[#7d8b96]">

                  <Search
                    size={23}
                    strokeWidth={1.7}
                  />

                </div>

                <h3 className="!mb-0 !mt-[14px] !text-[16px] !font-semibold !text-[#294b68]">
                  No appointments found
                </h3>

                <p className="!mb-0 !mt-[6px] !text-[12px] !text-[#888]">
                  Try changing your search or
                  status filter.
                </p>

              </div>

            )}


          {/* =================================================
              APPOINTMENT CARDS
          ================================================= */}

          {!loading &&
            !error &&
            filteredAppointments.length > 0 && (

              <div className="!grid !grid-cols-1 !gap-[18px]">

                {filteredAppointments.map(
                  (appointment) => {

                    const status =
                      getStatus(
                        appointment
                      );

                    const statusInfo =
                      getStatusInfo(
                        status
                      );

                    const StatusIcon =
                      statusInfo.icon;


                    return (

                      <article
                        key={
                          appointment._id
                        }
                        onClick={() =>
                          openViewModal(
                            appointment
                          )
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(
                          event
                        ) => {

                          if (
                            event.key ===
                              "Enter" ||
                            event.key ===
                              " "
                          ) {

                            event.preventDefault();

                            openViewModal(
                              appointment
                            );
                          }
                        }}
                        className="!group !cursor-pointer !overflow-hidden !rounded-xl !border !border-[#e1e7ec] !bg-white !shadow-[0_3px_18px_rgba(0,0,0,0.035)] transition-all duration-300 hover:!-translate-y-[2px] hover:!border-[#cddde9] hover:!shadow-[0_9px_28px_rgba(0,0,0,0.07)]"
                      >

                        {/* TOP */}

                        <div className="!border-b !border-[#edf0f2] !px-[18px] !py-[17px] md:!px-[21px]">

                          <div className="!flex !flex-col !gap-[14px] sm:!flex-row sm:!items-center sm:!justify-between">

                            <div className="!flex !min-w-0 !items-center !gap-[13px]">

                              <div className="!flex !h-[46px] !w-[46px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                                <Stethoscope
                                  size={21}
                                  strokeWidth={1.7}
                                />

                              </div>


                              <div className="!min-w-0">

                                <div className="!flex !flex-wrap !items-center !gap-[8px]">

                                  <h3 className="!m-0 !truncate !text-[15px] !font-bold !text-[#294b68]">
                                    {getDoctorName(
                                      appointment
                                    )}
                                  </h3>

                                  <span className="!rounded-full !bg-[#f1f7fb] !px-[8px] !py-[3px] !text-[9px] !font-semibold !text-[#1976c8]">
                                    Doctor
                                  </span>

                                </div>

                                <p className="!mb-0 !mt-[4px] !text-[11px] !text-[#777]">
                                  {getDoctorSpecialization(
                                    appointment
                                  )}
                                </p>

                              </div>

                            </div>


                            <span
                              className={`!inline-flex !w-fit !items-center !gap-[6px] !rounded-full !px-[10px] !py-[6px] !text-[10px] !font-semibold ${statusInfo.className}`}
                            >

                              <StatusIcon
                                size={13}
                                strokeWidth={1.8}
                              />

                              {statusInfo.label}

                            </span>

                          </div>

                        </div>


                        {/* INFORMATION */}

                        <div className="!grid !grid-cols-1 !gap-[12px] !px-[18px] !py-[18px] sm:!grid-cols-2 lg:!grid-cols-4">

                          {/* DATE */}

                          <div className="!flex !items-center !gap-[9px]">

                            <div className="!flex !h-[35px] !w-[35px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                              <CalendarDays
                                size={16}
                                strokeWidth={1.7}
                              />

                            </div>

                            <div className="!min-w-0">

                              <p className="!m-0 !text-[9px] !font-medium !uppercase !tracking-[0.3px] !text-[#999]">
                                Date
                              </p>

                              <p className="!mb-0 !mt-[3px] !truncate !text-[12px] !font-semibold !text-[#444]">
                                {formatDate(
                                  appointment.date ||
                                  appointment.appointmentDate
                                )}
                              </p>

                            </div>

                          </div>


                          {/* TIME */}

                          <div className="!flex !items-center !gap-[9px]">

                            <div className="!flex !h-[35px] !w-[35px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                              <Clock3
                                size={16}
                                strokeWidth={1.7}
                              />

                            </div>

                            <div className="!min-w-0">

                              <p className="!m-0 !text-[9px] !font-medium !uppercase !tracking-[0.3px] !text-[#999]">
                                Time
                              </p>

                              <p className="!mb-0 !mt-[3px] !truncate !text-[12px] !font-semibold !text-[#444]">
                                {appointment.time ||
                                  appointment.appointmentTime ||
                                  "Not available"}
                              </p>

                            </div>

                          </div>


                          {/* DEPARTMENT */}

                          <div className="!flex !items-center !gap-[9px]">

                            <div className="!flex !h-[35px] !w-[35px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                              <Building2
                                size={16}
                                strokeWidth={1.7}
                              />

                            </div>

                            <div className="!min-w-0">

                              <p className="!m-0 !text-[9px] !font-medium !uppercase !tracking-[0.3px] !text-[#999]">
                                Department
                              </p>

                              <p className="!mb-0 !mt-[3px] !truncate !text-[12px] !font-semibold !text-[#444]">
                                {getDepartmentName(
                                  appointment
                                )}
                              </p>

                            </div>

                          </div>


                          {/* PHONE */}

                          <div className="!flex !items-center !gap-[9px]">

                            <div className="!flex !h-[35px] !w-[35px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                              <Phone
                                size={16}
                                strokeWidth={1.7}
                              />

                            </div>

                            <div className="!min-w-0">

                              <p className="!m-0 !text-[9px] !font-medium !uppercase !tracking-[0.3px] !text-[#999]">
                                Contact
                              </p>

                              <p className="!mb-0 !mt-[3px] !truncate !text-[12px] !font-semibold !text-[#444]">
                                {getPatientPhone(
                                  appointment
                                )}
                              </p>

                            </div>

                          </div>

                        </div>


                        {/* REASON */}

                        {appointment.reason && (

                          <div className="!border-t !border-[#edf0f2] !px-[18px] !py-[14px]">

                            <div className="!flex !items-start !gap-[9px]">

                              <FileText
                                size={15}
                                strokeWidth={1.7}
                                className="!mt-[2px] !shrink-0 !text-[#1976c8]"
                              />

                              <div className="!min-w-0">

                                <p className="!m-0 !text-[9px] !font-semibold !uppercase !tracking-[0.3px] !text-[#999]">
                                  Reason
                                </p>

                                <p className="!mb-0 !mt-[4px] !line-clamp-2 !text-[12px] !leading-[1.5] !text-[#666]">
                                  {appointment.reason}
                                </p>

                              </div>

                            </div>

                          </div>

                        )}


                        {/* CANCELLATION REASON */}

                        {(status ===
                          "cancelled" ||
                          status ===
                            "canceled") && (

                          <div className="!border-t !border-[#f2dada] !bg-[#fff8f8] !px-[18px] !py-[13px]">

                            <div className="!flex !items-start !gap-[9px]">

                              <Ban
                                size={15}
                                strokeWidth={1.7}
                                className="!mt-[2px] !shrink-0 !text-[#dc3545]"
                              />

                              <div className="!min-w-0">

                                <p className="!m-0 !text-[9px] !font-semibold !uppercase !tracking-[0.3px] !text-[#dc3545]">
                                  Cancellation Reason
                                </p>

                                <p className="!mb-0 !mt-[4px] !text-[12px] !leading-[1.5] !text-[#666]">

                                  {appointment.cancellationReason?.trim()
                                    ? appointment.cancellationReason
                                    : "No cancellation reason was provided."}

                                </p>

                              </div>

                            </div>

                          </div>

                        )}


                        {/* ACTIONS */}

                        <div className="!flex !flex-col !gap-[10px] !border-t !border-[#edf0f2] !bg-[#fbfcfd] !px-[18px] !py-[13px] sm:!flex-row sm:!items-center sm:!justify-between">

                          


                          <div className="!flex !items-center !gap-[8px]">

                            {canEditAppointment(
                              appointment
                            ) && (

                              <button
                                type="button"
                                onClick={(
                                  event
                                ) => {

                                  event.stopPropagation();

                                  handleEditAppointment(
                                    appointment
                                  );
                                }}
                                className="!inline-flex !h-[36px] !items-center !justify-center !gap-[6px] !rounded-xl !border !border-[#d5e3ed] !bg-white !px-[13px] !text-[11px] !font-semibold !text-[#1976c8] transition-all duration-200 hover:!border-[#1976c8] hover:!bg-[#eef6fc]"
                              >

                                <Pencil
                                  size={14}
                                  strokeWidth={1.8}
                                />

                                Edit

                              </button>

                            )}


                            {canCancelAppointment(
                              appointment
                            ) && (

                              <button
                                type="button"
                                onClick={(
                                  event
                                ) => {

                                  event.stopPropagation();

                                  openCancelModal(
                                    appointment
                                  );
                                }}
                                className="!inline-flex !h-[36px] !items-center !justify-center !gap-[6px] !rounded-xl !border !border-[#f0cccc] !bg-white !px-[13px] !text-[11px] !font-semibold !text-[#dc3545] transition-all duration-200 hover:!bg-[#fff3f3]"
                              >

                                <XCircle
                                  size={14}
                                  strokeWidth={1.8}
                                />

                                Cancel

                              </button>

                            )}

                          </div>

                        </div>

                      </article>

                    );
                  }
                )}

              </div>

            )}

        </div>

      </section>


      {/* =====================================================
          VIEW APPOINTMENT DETAILS MODAL
      ===================================================== */}

      {viewModalOpen &&
        viewAppointment && (

          <div
            className="!fixed !inset-0 !z-[9998] !flex !items-center !justify-center !bg-[#172b3a]/50 !px-5 !py-6 backdrop-blur-[2px]"
            onMouseDown={(
              event
            ) => {

              if (
                event.target ===
                event.currentTarget
              ) {

                closeViewModal();

              }

            }}
          >

            <div className="!max-h-[90vh] !w-full !max-w-[620px] !overflow-hidden !overflow-y-auto !rounded-xl !border !border-[#e2e7eb] !bg-white !shadow-[0_20px_60px_rgba(0,0,0,0.18)]">


              {/* MODAL HEADER */}

              <div className="!border-b !border-[#edf0f2] !bg-[#fbfcfd] !px-[22px] !py-[18px]">

                <div className="!flex !items-center !justify-between !gap-4">

                  <div className="!flex !items-center !gap-[12px]">

                    <div className="!flex !h-[42px] !w-[42px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                      <CalendarCheck2
                        size={20}
                        strokeWidth={1.8}
                      />

                    </div>

                    <div>

                      <h3 className="!m-0 !text-[18px] !font-bold !text-[#294b68]">
                        Appointment Details
                      </h3>

                      <p className="!mb-0 !mt-[3px] !text-[11px] !text-[#999]">
                        Complete information about your appointment
                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={
                      closeViewModal
                    }
                    className="!flex !h-[34px] !w-[34px] !shrink-0 !items-center !justify-center !rounded-full !border-0 !bg-transparent !p-0 !text-[#999] transition-all duration-200 hover:!bg-[#f1f4f7] hover:!text-[#294b68]"
                  >

                    <XCircle
                      size={20}
                      strokeWidth={1.6}
                    />

                  </button>

                </div>

              </div>


              {/* MODAL BODY */}

              <div className="!px-[22px] !py-[22px]">


                {/* DOCTOR */}

                <div className="!rounded-xl !border !border-[#dce8f0] !bg-[#f7fbfe] !p-[16px]">

                  <div className="!flex !items-center !gap-[13px]">

                    <div className="!flex !h-[52px] !w-[52px] !shrink-0 !items-center !justify-center !rounded-full !bg-[#eaf4fb] !text-[#1976c8]">

                      <Stethoscope
                        size={23}
                        strokeWidth={1.7}
                      />

                    </div>


                    <div className="!min-w-0">

                      <div className="!flex !flex-wrap !items-center !gap-[8px]">

                        <h4 className="!m-0 !text-[17px] !font-bold !text-[#294b68]">
                          {getDoctorName(
                            viewAppointment
                          )}
                        </h4>

                        <span className="!rounded-full !bg-[#eaf3f9] !px-[8px] !py-[4px] !text-[10px] !font-semibold !text-[#1976c8]">
                          Doctor
                        </span>

                      </div>

                      <p className="!mb-0 !mt-[4px] !text-[12px] !text-[#777]">
                        {getDoctorSpecialization(
                          viewAppointment
                        )}
                      </p>

                      <p className="!mb-0 !mt-[2px] !text-[12px] !text-[#999]">
                        {getDepartmentName(
                          viewAppointment
                        )}
                      </p>

                    </div>

                  </div>

                </div>


                {/* STATUS */}

                <div className="!mt-[18px]">

                  {(() => {

                    const status =
                      getStatus(
                        viewAppointment
                      );

                    const statusInfo =
                      getStatusInfo(
                        status
                      );

                    const StatusIcon =
                      statusInfo.icon;

                    return (

                      <div className="!flex !items-center !justify-between !gap-4 !rounded-xl !border !border-[#e5e9ed] !bg-white !px-[15px] !py-[13px]">

                        <div>

                          <p className="!m-0 !text-[10px] !font-semibold !uppercase !tracking-[0.4px] !text-[#999]">
                            Appointment Status
                          </p>

                          <p className="!mb-0 !mt-[4px] !text-[13px] !font-semibold !capitalize !text-[#294b68]">
                            {status}
                          </p>

                        </div>

                        <span
                          className={`!inline-flex !items-center !gap-[6px] !rounded-full !px-[11px] !py-[6px] !text-[11px] !font-semibold ${statusInfo.className}`}
                        >

                          <StatusIcon
                            size={14}
                            strokeWidth={1.8}
                          />

                          {statusInfo.label}

                        </span>

                      </div>

                    );

                  })()}

                </div>


                {/* APPOINTMENT INFORMATION */}

                <div className="!mt-[18px] !grid !grid-cols-1 !gap-[12px] sm:!grid-cols-2">


                  {/* DATE */}

                  <div className="!rounded-xl !border !border-[#e5e9ed] !bg-[#fbfcfd] !p-[14px]">

                    <div className="!flex !items-center !gap-[9px]">

                      <div className="!flex !h-[34px] !w-[34px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                        <CalendarDays
                          size={16}
                          strokeWidth={1.7}
                        />

                      </div>

                      <div>

                        <p className="!m-0 !text-[10px] !uppercase !tracking-[0.3px] !text-[#999]">
                          Date
                        </p>

                        <p className="!mb-0 !mt-[3px] !text-[12px] !font-semibold !text-[#333]">
                          {formatDate(
                            viewAppointment.date ||
                            viewAppointment.appointmentDate
                          )}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* TIME */}

                  <div className="!rounded-xl !border !border-[#e5e9ed] !bg-[#fbfcfd] !p-[14px]">

                    <div className="!flex !items-center !gap-[9px]">

                      <div className="!flex !h-[34px] !w-[34px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                        <Clock3
                          size={16}
                          strokeWidth={1.7}
                        />

                      </div>

                      <div>

                        <p className="!m-0 !text-[10px] !uppercase !tracking-[0.3px] !text-[#999]">
                          Time
                        </p>

                        <p className="!mb-0 !mt-[3px] !text-[12px] !font-semibold !text-[#333]">
                          {viewAppointment.time ||
                            viewAppointment.appointmentTime ||
                            "Not available"}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* DEPARTMENT */}

                  <div className="!rounded-xl !border !border-[#e5e9ed] !bg-[#fbfcfd] !p-[14px]">

                    <div className="!flex !items-center !gap-[9px]">

                      <div className="!flex !h-[34px] !w-[34px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                        <Building2
                          size={16}
                          strokeWidth={1.7}
                        />

                      </div>

                      <div>

                        <p className="!m-0 !text-[10px] !uppercase !tracking-[0.3px] !text-[#999]">
                          Department
                        </p>

                        <p className="!mb-0 !mt-[3px] !text-[12px] !font-semibold !text-[#333]">
                          {getDepartmentName(
                            viewAppointment
                          )}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* PHONE */}

                  <div className="!rounded-xl !border !border-[#e5e9ed] !bg-[#fbfcfd] !p-[14px]">

                    <div className="!flex !items-center !gap-[9px]">

                      <div className="!flex !h-[34px] !w-[34px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                        <Phone
                          size={16}
                          strokeWidth={1.7}
                        />

                      </div>

                      <div className="!min-w-0">

                        <p className="!m-0 !text-[10px] !uppercase !tracking-[0.3px] !text-[#999]">
                          Contact
                        </p>

                        <p className="!mb-0 !mt-[3px] !break-all !text-[12px] !font-semibold !text-[#333]">
                          {getPatientPhone(
                            viewAppointment
                          )}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* REASON */}

                {viewAppointment.reason && (

                  <div className="!mt-[18px] !rounded-xl !border !border-[#e5e9ed] !bg-white !p-[15px]">

                    <div className="!flex !items-start !gap-[10px]">

                      <FileText
                        size={17}
                        strokeWidth={1.7}
                        className="!mt-[2px] !shrink-0 !text-[#1976c8]"
                      />

                      <div>

                        <p className="!m-0 !text-[10px] !font-semibold !uppercase !tracking-[0.4px] !text-[#999]">
                          Reason for Appointment
                        </p>

                        <p className="!mb-0 !mt-[6px] !text-[13px] !leading-[1.6] !text-[#555]">
                          {viewAppointment.reason}
                        </p>

                      </div>

                    </div>

                  </div>

                )}


                {/* CANCELLATION INFORMATION */}

                {(getStatus(
                  viewAppointment
                ) === "cancelled" ||
                  getStatus(
                    viewAppointment
                  ) === "canceled") && (

                  <div className="!mt-[18px] !rounded-xl !border !border-[#f0d1d1] !bg-[#fff7f7] !p-[15px]">

                    <div className="!flex !items-start !gap-[10px]">

                      <Ban
                        size={17}
                        strokeWidth={1.7}
                        className="!mt-[2px] !shrink-0 !text-[#dc3545]"
                      />

                      <div className="!min-w-0">

                        <p className="!m-0 !text-[10px] !font-semibold !uppercase !tracking-[0.4px] !text-[#dc3545]">
                          Cancellation Information
                        </p>


                        <p className="!mb-0 !mt-[7px] !text-[11px] !font-semibold !text-[#444]">
                          Cancellation Reason
                        </p>


                        <p className="!mb-0 !mt-[4px] !text-[13px] !leading-[1.6] !text-[#666]">

                          {viewAppointment.cancellationReason?.trim()
                            ? viewAppointment.cancellationReason
                            : "No cancellation reason was provided."}

                        </p>


                        {viewAppointment.cancelledAt && (

                          <p className="!mb-0 !mt-[10px] !text-[11px] !text-[#999]">

                            Cancelled on{" "}

                            <span className="!font-medium !text-[#777]">

                              {formatDateTime(
                                viewAppointment.cancelledAt
                              )}

                            </span>

                          </p>

                        )}

                      </div>

                    </div>

                  </div>

                )}

              </div>


              {/* MODAL FOOTER */}

              <div className="!flex !justify-end !border-t !border-[#edf0f2] !bg-[#fbfcfd] !px-[22px] !py-[15px]">

                <button
                  type="button"
                  onClick={
                    closeViewModal
                  }
                  className="!inline-flex !h-[40px] !items-center !justify-center !rounded-xl !border !border-[#d9e0e6] !bg-white !px-[20px] !text-[12px] !font-semibold !text-[#555] !shadow-none transition-all duration-200 hover:!border-[#1976c8] hover:!text-[#1976c8]"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        )}


      {/* =====================================================
          CANCEL CONFIRMATION MODAL
      ===================================================== */}

      {cancelModalOpen &&
        selectedAppointment && (

          <div
            className="!fixed !inset-0 !z-[9999] !flex !items-center !justify-center !bg-[#172b3a]/50 !px-5 !py-6 backdrop-blur-[2px]"
            onMouseDown={(
              event
            ) => {

              if (
                event.target ===
                event.currentTarget &&
                !cancellingId
              ) {

                closeCancelModal();

              }

            }}
          >

            <div className="!w-full !max-w-[440px] !overflow-hidden !rounded-xl !border !border-[#e2e7eb] !bg-white !shadow-[0_20px_60px_rgba(0,0,0,0.18)]">


              {/* HEADER */}

              <div className="!border-b !border-[#edf0f2] !px-[22px] !py-[18px]">

                <div className="!flex !items-center !justify-between">

                  <div className="!flex !items-center !gap-[11px]">

                    <div className="!flex !h-[40px] !w-[40px] !items-center !justify-center !rounded-full !bg-[#fff1f1] !text-[#dc3545]">

                      <Ban
                        size={19}
                        strokeWidth={1.8}
                      />

                    </div>

                    <div>

                      <h3 className="!m-0 !text-[17px] !font-bold !text-[#294b68]">
                        Cancel Appointment
                      </h3>

                      <p className="!mb-0 !mt-[3px] !text-[11px] !text-[#999]">
                        Please confirm this action
                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={
                      closeCancelModal
                    }
                    disabled={
                      !!cancellingId
                    }
                    className="!flex !h-[32px] !w-[32px] !items-center !justify-center !rounded-full !border-0 !bg-transparent !p-0 !text-[#999] hover:!bg-[#f3f5f7] hover:!text-[#294b68] disabled:!cursor-not-allowed disabled:!opacity-50"
                  >

                    <XCircle
                      size={19}
                    />

                  </button>

                </div>

              </div>


              {/* BODY */}

              <div className="!px-[22px] !py-[20px]">

                {cancelSuccess ? (

                  <div className="!rounded-xl !border !border-[#c9e8d4] !bg-[#effaf3] !px-[15px] !py-[14px]">

                    <div className="!flex !items-center !gap-[9px] !text-[#198754]">

                      <CheckCircle2
                        size={18}
                      />

                      <p className="!m-0 !text-[12px] !font-semibold">
                        {cancelSuccess}
                      </p>

                    </div>

                  </div>

                ) : (

                  <>

                    <p className="!m-0 !text-[13px] !leading-[1.6] !text-[#555]">

                      Are you sure you want to cancel your appointment with{" "}

                      <span className="!font-semibold !text-[#294b68]">
                        {getDoctorName(
                          selectedAppointment
                        )}
                      </span>

                      ?

                    </p>


                    <div className="!mt-[15px] !rounded-xl !border !border-[#e5e9ed] !bg-[#fbfcfd] !p-[13px]">

                      <div className="!grid !grid-cols-2 !gap-[12px]">

                        <div>

                          <p className="!m-0 !text-[9px] !uppercase !tracking-[0.3px] !text-[#999]">
                            Date
                          </p>

                          <p className="!mb-0 !mt-[4px] !text-[11px] !font-semibold !text-[#444]">
                            {formatDate(
                              selectedAppointment.date ||
                              selectedAppointment.appointmentDate
                            )}
                          </p>

                        </div>


                        <div>

                          <p className="!m-0 !text-[9px] !uppercase !tracking-[0.3px] !text-[#999]">
                            Time
                          </p>

                          <p className="!mb-0 !mt-[4px] !text-[11px] !font-semibold !text-[#444]">
                            {selectedAppointment.time ||
                              selectedAppointment.appointmentTime ||
                              "Not available"}
                          </p>

                        </div>

                      </div>

                    </div>


                    {cancelError && (

                      <div className="!mt-[13px] !rounded-xl !border !border-[#f1cccc] !bg-[#fff5f5] !px-[13px] !py-[11px]">

                        <div className="!flex !items-start !gap-[8px]">

                          <CircleAlert
                            size={15}
                            className="!mt-[1px] !shrink-0 !text-[#dc3545]"
                          />

                          <p className="!m-0 !text-[11px] !leading-[1.5] !text-[#dc3545]">
                            {cancelError}
                          </p>

                        </div>

                      </div>

                    )}

                  </>

                )}

              </div>


              {/* FOOTER */}

              {!cancelSuccess && (

                <div className="!flex !justify-end !gap-[9px] !border-t !border-[#edf0f2] !bg-[#fbfcfd] !px-[22px] !py-[14px]">

                  <button
                    type="button"
                    onClick={
                      closeCancelModal
                    }
                    disabled={
                      !!cancellingId
                    }
                    className="!inline-flex !h-[39px] !items-center !justify-center !rounded-xl !border !border-[#d9e0e6] !bg-white !px-[16px] !text-[11px] !font-semibold !text-[#555] transition-all hover:!border-[#1976c8] hover:!text-[#1976c8] disabled:!cursor-not-allowed disabled:!opacity-50"
                  >
                    Keep Appointment
                  </button>


                  <button
                    type="button"
                    onClick={
                      handleCancelAppointment
                    }
                    disabled={
                      !!cancellingId
                    }
                    className="!inline-flex !h-[39px] !items-center !justify-center !gap-[7px] !rounded-xl !border-0 !bg-[#dc3545] !px-[16px] !text-[11px] !font-semibold !text-white transition-all hover:!bg-[#bb2d3b] disabled:!cursor-not-allowed disabled:!opacity-60"
                  >

                    {cancellingId ? (

                      <>

                        <RefreshCw
                          size={14}
                          className="!animate-spin"
                        />

                        Cancelling...

                      </>

                    ) : (

                      <>

                        <XCircle
                          size={14}
                        />

                        Confirm Cancellation

                      </>

                    )}

                  </button>

                </div>

              )}

            </div>

          </div>

        )}

    </main>

  );

};


export default MyAppointments;