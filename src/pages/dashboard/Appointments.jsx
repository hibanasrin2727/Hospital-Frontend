import {
  Search,
  CalendarDays,
  MoreVertical,
  Clock3,
  UserRound,
  Stethoscope,
  ClipboardList,
  CircleAlert,
  CheckCircle2,
  Eye,
  Check,
  Trash2,
  X,
  Ban,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";


// =====================================================
// API URL
// =====================================================

const API_URL =
  "http://localhost:5000/api/dashboard/appointments";


// =====================================================
// APPOINTMENTS
// =====================================================

const Appointments = () => {

// ===================================================
// STATES
// ===================================================

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const appointmentListRef =
    useRef(null);


  // ===================================================
  // TOKEN
  // ===================================================

  const getToken = () =>
    localStorage.getItem("token");


  // ===================================================
  // FETCH APPOINTMENTS
  // ===================================================

  const fetchAppointments = async (
    showLoader = true
  ) => {

    try {

      if (showLoader) {
        setLoading(true);
      }

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin token not found"
        );
      }

      const response = await fetch(
        API_URL,
        {
          method: "GET",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to fetch appointments"
        );
      }

      const formattedAppointments =
        (data.appointments || []).map(
          (appointment) => ({
            id:
              appointment._id,

            patient:
              appointment.patientId?.name ||
              appointment.patientName ||
              "Unknown Patient",

            doctor:
              appointment.doctorId?.name ||
              "Unknown Doctor",

            department:
              appointment.departmentId?.name ||
              "Unknown Department",

            date:
              appointment.date,

            time:
              appointment.time,

            status:
              appointment.status
                ? appointment.status
                  .charAt(0)
                  .toUpperCase() +
                appointment.status.slice(1)
                : "Pending",

            phone:
              appointment.phone ||
              appointment.patientId?.phone ||
              "N/A",

            reason:
              appointment.reason ||
              "No reason provided",

            notes:
              appointment.notes ||
              "",

            cancellationReason:
              appointment.cancellationReason ||
              "",

            cancelledAt:
              appointment.cancelledAt ||
              null,
          })
        );

      setAppointments(
        formattedAppointments
      );

    } catch (error) {

      console.error(
        "Fetch appointments error:",
        error
      );

      alert(error.message);

    } finally {

      if (showLoader) {
        setLoading(false);
      }

    }
  };


  // ===================================================
  // INITIAL FETCH + AUTO REFRESH
  // ===================================================

  useEffect(() => {

    fetchAppointments();

    const interval =
      setInterval(() => {
        fetchAppointments(false);
      }, 60 * 1000);

    return () =>
      clearInterval(interval);

  }, []);


  // ===================================================
  // SEARCH / FILTER STATES
  // ===================================================

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");


  // ===================================================
  // ACTION MENU
  // ===================================================

  const [openMenu, setOpenMenu] =
    useState(null);

  const [menuPosition, setMenuPosition] =
    useState({
      top: 0,
      left: 0,
    });


  // ===================================================
  // DETAILS
  // ===================================================

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);


  // ===================================================
  // DELETE
  // ===================================================

  const [deleteAppointment, setDeleteAppointment] =
    useState(null);


  // ===================================================
  // CANCEL
  // ===================================================

  const [cancelAppointment, setCancelAppointment] =
    useState(null);

  const [cancellationReason, setCancellationReason] =
    useState("");

  const [cancelling, setCancelling] =
    useState(false);


  // ===================================================
  // STATUS STYLE
  // ===================================================

  const statusStyle = {

    Pending: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      dot: "bg-amber-500",
    },

    Confirmed: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      dot: "bg-blue-500",
    },

    Rescheduled: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      dot: "bg-purple-500",
    },

    Cancelled: {
      bg: "bg-red-50",
      text: "text-red-600",
      dot: "bg-red-500",
    },

    Completed: {
      bg: "bg-green-50",
      text: "text-green-600",
      dot: "bg-green-500",
    },

  };


  // ===================================================
  // DEPARTMENTS
  // ===================================================

  const departments = [
    "All",

    ...Array.from(
      new Set(
        appointments
          .map(
            (appointment) =>
              appointment.department
          )
          .filter(Boolean)
      )
    ),
  ];


  // ===================================================
  // FILTER APPOINTMENTS
  // ===================================================

  const filteredAppointments =
    appointments.filter(
      (appointment) => {

        const searchValue =
          search
            .toLowerCase()
            .trim();

        const matchesSearch =
          !searchValue ||
          appointment.patient
            .toLowerCase()
            .includes(searchValue) ||
          appointment.doctor
            .toLowerCase()
            .includes(searchValue) ||
          appointment.department
            .toLowerCase()
            .includes(searchValue) ||
          appointment.phone
            .toLowerCase()
            .includes(searchValue) ||
          appointment.reason
            .toLowerCase()
            .includes(searchValue);

        const matchesStatus =
          statusFilter === "All" ||
          appointment.status ===
          statusFilter;

        const matchesDepartment =
          departmentFilter === "All" ||
          appointment.department ===
          departmentFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesDepartment
        );
      }
    );


  // ===================================================
  // STATISTICS
  // ===================================================

  const totalAppointments =
    appointments.length;

  const pendingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "Pending"
    ).length;

  const confirmedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "Confirmed"
    ).length;

  const cancelledAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "Cancelled"
    ).length;

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status ===
        "Completed"
    ).length;


  // ===================================================
  // SCROLL TO TOP
  // ===================================================

  useEffect(() => {

    if (
      appointmentListRef.current
    ) {

      appointmentListRef.current.scrollTop =
        0;

    }

  }, [
    search,
    statusFilter,
    departmentFilter,
  ]);


  // ===================================================
  // MENU CLICK
  // ===================================================

  const handleMenuClick = (
    event,
    appointmentId
  ) => {

    event.stopPropagation();

    const rect =
      event.currentTarget.getBoundingClientRect();

    const menuWidth = 190;
    const menuHeight = 190;

    let left =
      rect.right - menuWidth;

    let top =
      rect.bottom + 8;

    if (
      left < 10
    ) {
      left = 10;
    }

    if (
      left + menuWidth >
      window.innerWidth - 10
    ) {

      left =
        window.innerWidth -
        menuWidth -
        10;

    }

    if (
      top + menuHeight >
      window.innerHeight - 10
    ) {

      top =
        rect.top -
        menuHeight -
        8;

    }

    setMenuPosition({
      top,
      left,
    });

    setOpenMenu(
      openMenu === appointmentId
        ? null
        : appointmentId
    );

  };


  // ===================================================
  // VIEW APPOINTMENT
  // ===================================================

  const handleViewAppointment = (
    appointment
  ) => {

    setSelectedAppointment(
      appointment
    );

    setShowDetails(true);

    setOpenMenu(null);

  };


  // ===================================================
  // CONFIRM APPOINTMENT
  // ===================================================

  const handleConfirmAppointment =
    async (
      appointmentId
    ) => {

      try {

        const token =
          getToken();

        if (!token) {

          alert(
            "Admin token not found"
          );

          return;

        }

        const response =
          await fetch(
            `${API_URL}/${appointmentId}`,
            {
              method: "PUT",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                status:
                  "confirmed",
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to confirm appointment"
          );

        }

        await fetchAppointments(
          false
        );

        setOpenMenu(null);

      } catch (error) {

        console.error(
          "Confirm appointment error:",
          error
        );

        alert(error.message);

      }

    };


  // ===================================================
  // COMPLETE APPOINTMENT
  // ===================================================

  const handleCompleteAppointment =
    async (
      appointmentId
    ) => {

      try {

        const token =
          getToken();

        if (!token) {

          alert(
            "Admin token not found"
          );

          return;

        }

        const response =
          await fetch(
            `${API_URL}/${appointmentId}`,
            {
              method: "PUT",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                status:
                  "completed",
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to complete appointment"
          );

        }

        await fetchAppointments(
          false
        );

        setOpenMenu(null);

      } catch (error) {

        console.error(
          "Complete appointment error:",
          error
        );

        alert(error.message);

      }

    };


  // ===================================================
  // CANCEL APPOINTMENT
  // ===================================================

  const handleCancelAppointment =
    async () => {

      if (!cancelAppointment) {
        return;
      }

      const reason =
        cancellationReason.trim();

      if (!reason) {

        alert(
          "Please enter a cancellation reason."
        );

        return;

      }

      try {

        setCancelling(true);

        const token =
          getToken();

        if (!token) {

          alert(
            "Admin token not found"
          );

          return;

        }

        const response =
          await fetch(
            `${API_URL}/${cancelAppointment.id}/cancel`,
            {
              method: "PATCH",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                cancellationReason:
                  reason,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to cancel appointment"
          );

        }

        await fetchAppointments(
          false
        );

        setCancelAppointment(
          null
        );

        setCancellationReason(
          ""
        );

        setOpenMenu(null);

      } catch (error) {

        console.error(
          "Cancel appointment error:",
          error
        );

        alert(error.message);

      } finally {

        setCancelling(false);

      }

    };


  // ===================================================
  // DELETE APPOINTMENT
  // ===================================================

  const handleDeleteAppointment =
    async () => {

      if (!deleteAppointment) {
        return;
      }

      try {

        const token =
          getToken();

        if (!token) {

          alert(
            "Admin token not found"
          );

          return;

        }

        const response =
          await fetch(
            `${API_URL}/${deleteAppointment.id}`,
            {
              method: "DELETE",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to delete appointment"
          );

        }

        await fetchAppointments(
          false
        );

        setDeleteAppointment(
          null
        );

      } catch (error) {

        console.error(
          "Delete appointment error:",
          error
        );

        alert(error.message);

      }

    };


  // ===================================================
  // CLOSE MENU ON OUTSIDE CLICK
  // ===================================================

  useEffect(() => {

    const handleOutsideClick =
      (event) => {

        if (
          !event.target.closest(
            "[data-appointment-menu]"
          )
        ) {

          setOpenMenu(null);

        }

      };

    const handleScroll = () => {
      setOpenMenu(null);
    };

    const handleResize = () => {
      setOpenMenu(null);
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      true
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      window.removeEventListener(
        "scroll",
        handleScroll,
        true
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

    };

  }, []);


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {

    return (

      <div className="!flex !min-h-[500px] !items-center !justify-center">

        <div className="!flex !flex-col !items-center !gap-3">

          <div className="!h-9 !w-9 !animate-spin !rounded-full !border-2 !border-[#1976c8] !border-t-transparent"></div>

          <p className="!text-sm !text-gray-500">
            Loading appointments...
          </p>

        </div>

      </div>

    );

  }


  // ===================================================
  // RETURN
  // ===================================================

  return (

    <div className="!w-full">


      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="!mb-8">

        <div className="!flex !flex-col !gap-4 md:!flex-row md:!items-center md:!justify-between">

          <div>

            <h1 className="!m-0 !text-[28px] !font-bold !text-[#294b68]">
              Appointments
            </h1>

            <p className="!mb-0 !mt-2 !text-sm !text-gray-500">
              Manage and monitor patient
              appointments.
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          STATISTIC CARDS
      ================================================= */}

      <div className="!mb-8 !grid  !grid-cols-1 !gap-5 sm:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-5">


        {/* TOTAL */}

        <div className="!rounded-xl  !border !border-[#e7edf2] !bg-white !p-5 !shadow-[0_3px_15px_rgba(41,75,104,0.04)]">

          <div className="!flex !items-center !justify-between h-[100px]">

            <div>

              <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                Total Appointments
              </p>

              <h3 className="!m-0 !text-[28px] !font-bold !text-[#294b68]">
                {totalAppointments}
              </h3>

            </div>

            <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

              <CalendarDays
                size={21}
              />

            </div>

          </div>

        </div>


        {/* PENDING */}

        <div className="!rounded-xl !border !border-[#e7edf2] !bg-white !p-5 !shadow-[0_3px_15px_rgba(41,75,104,0.04)]">

          <div className="!flex !items-center !justify-between h-[100px]">

            <div>

              <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                Pending
              </p>

              <h3 className="!m-0 !text-[28px] !font-bold !text-[#294b68]">
                {pendingAppointments}
              </h3>

            </div>

            <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !bg-amber-50 !text-amber-500">

              <Clock3
                size={21}
              />

            </div>

          </div>

        </div>


        {/* CONFIRMED */}

        <div className="!rounded-xl !border !border-[#e7edf2] !bg-white !p-5 !shadow-[0_3px_15px_rgba(41,75,104,0.04)]">

          <div className="!flex !items-center !justify-between h-[100px]">

            <div>

              <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                Confirmed
              </p>

              <h3 className="!m-0 !text-[28px] !font-bold !text-[#294b68]">
                {confirmedAppointments}
              </h3>

            </div>

            <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !bg-blue-50 !text-blue-500">

              <CheckCircle2
                size={21}
              />

            </div>

          </div>

        </div>


        {/* CANCELLED */}

        <div className="!rounded-xl !border !border-[#e7edf2] !bg-white !p-5 !shadow-[0_3px_15px_rgba(41,75,104,0.04)]">

          <div className="!flex !items-center !justify-between h-[100px]">

            <div>

              <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                Cancelled
              </p>

              <h3 className="!m-0 !text-[28px] !font-bold !text-[#294b68]">
                {cancelledAppointments}
              </h3>

            </div>

            <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !bg-red-50 !text-red-500">

              <Ban
                size={21}
              />

            </div>

          </div>

        </div>



        {/* COMPLETED */}

        <div className="!rounded-xl !border !border-[#e7edf2] !bg-white !p-5 !shadow-[0_3px_15px_rgba(41,75,104,0.04)]">

          <div className="!flex !items-center !justify-between h-[100px] ">

            <div>

              <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                Completed
              </p>

              <h3 className="!m-0 !text-[28px] !font-bold !text-[#294b68]">
                {completedAppointments}
              </h3>

          </div>

            <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !bg-green-50 !text-green-500">

              <CheckCircle2
                size={21}
              />

            </div>

          </div>

        </div>
      </div>

      {/* =================================================
          SEARCH + FILTER
      ================================================= */}

      <div className="!sticky !top-0 !z-40 !mb-6 !rounded-xl !border !border-[#e7edf2] !bg-white !p-4 !shadow-[0_3px_15px_rgba(41,75,104,0.04)]">

        <div className="!grid !grid-cols-1 !gap-3 md:!grid-cols-[1fr_180px_200px]">

          {/* SEARCH */}

          <div className="!relative">

            <Search
              size={17}
              className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search patient, doctor, department, reason..."
              className="!h-[46px] !w-full !rounded-xl !border !border-gray-200 !bg-[#fafcfd] !pl-11 !pr-4 !text-sm !text-gray-600 !outline-none transition focus:!border-[#1976c8] focus:!bg-white"
            />

          </div>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="!h-[46px] !rounded-xl !border !border-gray-200 !bg-[#fafcfd] !px-4 !text-sm !text-gray-600 !outline-none focus:!border-[#1976c8]"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>

          {/* DEPARTMENT */}

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(event.target.value)
            }
            className="!h-[46px] !rounded-xl !border !border-gray-200 !bg-[#fafcfd] !px-4 !text-sm !text-gray-600 !outline-none focus:!border-[#1976c8]"
          >
            {departments.map((department) => (
              <option
                key={department}
                value={department}
              >
                {department === "All"
                  ? "All Departments"
                  : department}
              </option>
            ))}
          </select>

        </div>

      </div>


      {/* =================================================
          APPOINTMENTS LIST
      ================================================= */}

      <div
        ref={appointmentListRef}
        className="!w-full !overflow-hidden !rounded-xl !border !border-[#e7edf2] !bg-white !shadow-[0_3px_15px_rgba(41,75,104,0.04)]"
      >


        {/* =================================================
            DESKTOP TABLE
        ================================================= */}

        <div className="!hidden lg:!block h-[730px]">


          {/* TABLE HEADER */}

          <div className="!grid !grid-cols-[1.3fr_1.2fr_1.1fr_1.5fr_1fr_1fr_140px] !items-center !border-b !border-[#edf1f4] !bg-[#fafcfd] !px-5 !py-4">

            <p className="!m-0 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
              Patient
            </p>

            <p className="!m-0 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
              Doctor
            </p>

            <p className="!m-0 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
              Department
            </p>

            <p className="!m-0 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
              Reason
            </p>

            <p className="!m-0 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
              Date
            </p>

            <p className="!m-0 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
              Status
            </p>

            <p className="!m-0 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400 !text-right">
              Action
            </p>

          </div>


          {/* TABLE BODY */}

          <div className="!h-[640px] !overflow-y-auto">

            {filteredAppointments.length ===
              0 ? (

                <div className="!flex !h-[400px] !items-center !justify-center">

                  <div className="!text-center">

                    <CalendarDays
                      size={40}
                      className="!mx-auto !mb-3 !text-gray-300"
                    />

                    <p className="!m-0 !text-sm !font-medium !text-gray-500">
                      No appointments found
                    </p>

                    <p className="!mb-0 !mt-1 !text-xs !text-gray-400">
                      Try changing your search
                      or filters.
                    </p>

                  </div>

                </div>

            ) : (

                filteredAppointments.map(
                  (appointment) => {

                    const status =
                      statusStyle[
                      appointment.status
                      ] ||
                      statusStyle.Pending;

                    return (

                      <div
                        key={
                          appointment.id
                        }
                        className="!grid !grid-cols-[1.3fr_1.2fr_1.1fr_1.5fr_1fr_1fr_140px] !items-center !border-b !border-[#edf1f4] !px-5 !py-4 transition hover:!bg-[#fbfdff]"
                      >


                        {/* PATIENT */}

                        <div className="!min-w-0">

                          <div className="!flex !items-center !gap-3">

                            <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                              <UserRound
                                size={16}
                              />

                            </div>

                            <div className="!min-w-0">

                              <p className="!m-0 !truncate !text-sm !font-semibold !text-[#294b68]">
                                {
                                  appointment.patient
                                }
                              </p>

                              <p className="!mb-0 !mt-1 !truncate !text-xs !text-gray-400">
                                {
                                  appointment.phone
                                }
                              </p>

                            </div>

                          </div>

                        </div>


                        {/* DOCTOR */}

                        <div className="!flex !items-center !gap-2">

                          <Stethoscope
                            size={15}
                            className="!shrink-0 !text-[#1976c8]"
                          />

                          <span className="!truncate !text-sm !font-medium !text-gray-600">
                            {
                              appointment.doctor
                            }
                          </span>

                        </div>


                        {/* DEPARTMENT */}

                        <div className="!min-w-0">

                          <span className="!block !truncate !text-sm !text-gray-500">
                            {
                              appointment.department
                            }
                          </span>

                        </div>


                        {/* REASON */}

                        <div className="!min-w-0">

                          <p
                            title={
                              appointment.reason
                            }
                            className="!m-0 !truncate !text-sm !text-gray-500"
                          >
                            {
                              appointment.reason ||
                              "No reason provided"
                            }
                          </p>

                        </div>


                        {/* DATE */}

                        <div>

                          <p className="!m-0 !text-sm !font-medium !text-gray-600">
                            {
                              appointment.date
                            }
                          </p>

                          <p className="!mb-0 !mt-1 !text-xs !text-gray-400">
                            {
                              appointment.time
                            }
                          </p>

                        </div>


                        {/* STATUS */}

                        <div>

                          <span
                            className={`!inline-flex !items-center !gap-2 !rounded-full !px-3 !py-1.5 !text-xs !font-semibold ${status.bg} ${status.text}`}
                          >

                            <span
                              className={`!h-1.5 !w-1.5 !rounded-full ${status.dot}`}
                            ></span>

                            {
                              appointment.status
                            }

                          </span>

                        </div>


                        {/* ACTION */}

                        <div className="!flex !justify-end">

                          <button
                            type="button"
                            data-appointment-menu
                            onClick={(event) =>
                              handleMenuClick(
                                event,
                                appointment.id
                              )
                            }
                            className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl !border-0 !bg-transparent !text-gray-400 transition hover:!bg-[#eef6fc] hover:!text-[#1976c8]"
                          >

                            <MoreVertical
                              size={18}
                            />

                          </button>

                        </div>

                      </div>

                    );

                  }
                )

            )}

          </div>

        </div>


        {/* =================================================
            MOBILE CARDS
        ================================================= */}

        <div className="!block lg:!hidden">

          <div className="!max-h-[640px] !overflow-y-auto">

            {filteredAppointments.length ===
              0 ? (

                <div className="!flex !h-[400px] !items-center !justify-center">

                  <div className="!text-center">

                    <CalendarDays
                      size={40}
                      className="!mx-auto !mb-3 !text-gray-300"
                    />

                    <p className="!m-0 !text-sm !font-medium !text-gray-500">
                      No appointments found
                    </p>

                  </div>

                </div>

            ) : (

                filteredAppointments.map(
                  (appointment) => {

                    const status =
                      statusStyle[
                      appointment.status
                      ] ||
                      statusStyle.Pending;

                    return (

                      <div
                        key={
                          appointment.id
                        }
                        className="!border-b !border-[#edf1f4] !p-5 last:!border-b-0"
                      >


                        {/* PATIENT HEADER */}

                        <div className="!flex !items-start !justify-between !gap-3">

                          <div className="!flex !min-w-0 !items-center !gap-3">

                            <div className="!flex !h-10 !w-10 !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                              <UserRound
                                size={17}
                              />

                            </div>

                            <div className="!min-w-0">

                              <p className="!m-0 !truncate !text-sm !font-semibold !text-[#294b68]">
                                {
                                  appointment.patient
                                }
                              </p>

                              <p className="!mb-0 !mt-1 !truncate !text-xs !text-gray-400">
                                {
                                  appointment.phone
                                }
                              </p>

                            </div>

                          </div>


                          <button
                            type="button"
                            data-appointment-menu
                            onClick={(event) =>
                              handleMenuClick(
                                event,
                                appointment.id
                              )
                            }
                            className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-xl !border-0 !bg-transparent !text-gray-400 hover:!bg-[#eef6fc] hover:!text-[#1976c8]"
                          >

                            <MoreVertical
                              size={18}
                            />

                          </button>

                        </div>


                        {/* INFORMATION GRID */}

                        <div className="!mt-4 !grid !grid-cols-2 !gap-4">


                          {/* DOCTOR */}

                          <div>

                            <p className="!mb-1 !text-[11px] !font-semibold !uppercase !tracking-wide !text-gray-400">
                              Doctor
                            </p>

                            <p className="!m-0 !truncate !text-sm !font-medium !text-gray-600">
                              {
                                appointment.doctor
                              }
                            </p>

                          </div>


                          {/* DEPARTMENT */}

                          <div>

                            <p className="!mb-1 !text-[11px] !font-semibold !uppercase !tracking-wide !text-gray-400">
                              Department
                            </p>

                            <p className="!m-0 !truncate !text-sm !text-gray-600">
                              {
                                appointment.department
                              }
                            </p>

                          </div>


                          {/* REASON */}

                          <div className="!min-w-0">

                            <p className="!mb-1 !text-[11px] !font-semibold !uppercase !tracking-wide !text-gray-400">
                              Reason
                            </p>

                            <p
                              title={
                                appointment.reason
                              }
                              className="!m-0 !truncate !text-sm !text-gray-600"
                            >
                              {
                                appointment.reason ||
                                "No reason provided"
                              }
                            </p>

                          </div>


                          {/* DATE */}

                          <div>

                            <p className="!mb-1 !text-[11px] !font-semibold !uppercase !tracking-wide !text-gray-400">
                              Date
                            </p>

                            <p className="!m-0 !text-sm !font-medium !text-gray-600">
                              {
                                appointment.date
                              }
                            </p>

                          </div>


                          {/* TIME */}

                          <div>

                            <p className="!mb-1 !text-[11px] !font-semibold !uppercase !tracking-wide !text-gray-400">
                              Time
                            </p>

                            <p className="!m-0 !text-sm !font-medium !text-gray-600">
                              {
                                appointment.time
                              }
                            </p>

                          </div>

                        </div>


                        {/* STATUS */}

                        <div className="!mt-4">

                          <span
                            className={`!inline-flex !items-center !gap-2 !rounded-full !px-3 !py-1.5 !text-xs !font-semibold ${status.bg} ${status.text}`}
                          >

                            <span
                              className={`!h-1.5 !w-1.5 !rounded-full ${status.dot}`}
                            ></span>

                            {
                              appointment.status
                            }

                          </span>

                        </div>

                      </div>

                    );

                  }
                )

            )}

          </div>

        </div>

      </div>


      {/* =================================================
          PORTAL ACTION MENU
      ================================================= */}

      {openMenu &&
        createPortal(

          <div
            data-appointment-menu
            className="!fixed !z-[100] !w-[190px] !rounded-xl !border !border-[#e5ebef] !bg-white !p-2 !shadow-[0_12px_35px_rgba(41,75,104,0.15)]"
            style={{
              top:
                menuPosition.top,

              left:
                menuPosition.left,
            }}
          >

            {(() => {

              const appointment =
                appointments.find(
                  (item) =>
                    item.id ===
                    openMenu
                );

              if (!appointment) {
                return null;
              }

              return (
                <>


                  {/* VIEW */}

                  <button
                    type="button"
                    onClick={() =>
                      handleViewAppointment(
                        appointment
                      )
                    }
                    className="!flex !w-full !items-center !gap-3 !rounded-lg !px-3 !py-2.5 !text-sm !font-medium !text-gray-600 transition hover:!bg-[#f5f9fd] hover:!text-[#1976c8]"
                  >

                    <Eye
                      size={16}
                    />

                    View Details

                  </button>


                  {/* CONFIRM */}

                  {appointment.status ===
                    "Pending" && (

                    <button
                      type="button"
                      onClick={() =>
                        handleConfirmAppointment(
                          appointment.id
                        )
                      }
                      className="!flex !w-full !items-center !gap-3 !rounded-lg !px-3 !py-2.5 !text-sm !font-medium !text-blue-600 transition hover:!bg-blue-50"
                    >

                      <Check
                        size={16}
                      />

                      Confirm Appointment

                    </button>

                    )}


                  {/* COMPLETE */}

                  {appointment.status ===
                    "Confirmed" && (

                    <button
                      type="button"
                      onClick={() =>
                        handleCompleteAppointment(
                          appointment.id
                        )
                      }
                      className="!flex !w-full !items-center !gap-3 !rounded-lg !px-3 !py-2.5 !text-sm !font-medium !text-green-600 transition hover:!bg-green-50"
                    >

                      <CheckCircle2
                        size={16}
                      />

                      Mark Completed

                    </button>

                    )}


                  {/* CANCEL */}

                  {[
                    "Pending",
                    "Confirmed",
                  ].includes(
                    appointment.status
                  ) && (

                      <button
                        type="button"
                        onClick={() => {

                          setCancelAppointment(
                            appointment
                          );

                          setCancellationReason(
                            ""
                          );

                          setOpenMenu(
                            null
                          );

                        }}
                        className="!flex !w-full !items-center !gap-3 !rounded-lg !px-3 !py-2.5 !text-sm !font-medium !text-red-500 transition hover:!bg-red-50"
                      >

                        <Ban
                          size={16}
                        />

                        Cancel Appointment

                      </button>

                    )}


                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() => {

                      setDeleteAppointment(
                        appointment
                      );

                      setOpenMenu(
                        null
                      );

                    }}
                    className="!flex !w-full !items-center !gap-3 !rounded-lg !px-3 !py-2.5 !text-sm !font-medium !text-red-500 transition hover:!bg-red-50"
                  >

                    <Trash2
                      size={16}
                    />

                    Delete

                  </button>

                </>
              );

            })()}

          </div>,

          document.body

        )}


      {/* =================================================
          VIEW DETAILS MODAL
      ================================================= */}

      {showDetails &&
        selectedAppointment && (

        <div className="!fixed !inset-0 !z-[110] !flex !items-center !justify-center !bg-[#102a43]/40 !p-4 !backdrop-blur-sm">

          <div className="!max-h-[90vh] !w-full !max-w-2xl !overflow-y-auto !rounded-2xl !border !border-[#dcebf5] !bg-white !shadow-[0_20px_60px_rgba(41,75,104,0.20)]">


            {/* MODAL HEADER */}

            <div className="!flex !items-center !justify-between !border-b !border-[#edf1f4] !px-6 !py-5">

              <div>

                <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                  Appointment Details
                </h2>

                <p className="!mb-0 !mt-1 !text-xs !text-gray-400">
                  Complete appointment information
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowDetails(
                    false
                  )
                }
                className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl !border-0 !bg-gray-50 !text-gray-400 transition hover:!bg-gray-100 hover:!text-gray-600"
              >

                <X
                  size={18}
                />

              </button>

            </div>


            {/* MODAL BODY */}

            <div className="!space-y-5 !p-6">


              {/* PATIENT */}

              <div className="!rounded-xl !bg-[#f8fbfd] !p-4">

                <div className="!flex !items-center !gap-3">

                  <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">

                    <UserRound
                      size={19}
                    />

                  </div>

                  <div>

                    <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                      Patient
                    </p>

                    <p className="!m-0 !text-sm !font-bold !text-[#294b68]">
                      {
                        selectedAppointment.patient
                      }
                    </p>

                  </div>

                </div>

              </div>


              {/* INFORMATION GRID */}

              <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2">


                {/* DOCTOR */}

                <div className="!rounded-xl !border !border-[#edf1f4] !p-4">

                  <div className="!flex !items-center !gap-3">

                    <Stethoscope
                      size={18}
                      className="!text-[#1976c8]"
                    />

                    <div>

                      <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                        Doctor
                      </p>

                      <p className="!m-0 !text-sm !font-semibold !text-[#294b68]">
                        {
                          selectedAppointment.doctor
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* DEPARTMENT */}

                <div className="!rounded-xl !border !border-[#edf1f4] !p-4">

                  <div className="!flex !items-center !gap-3">

                    <ClipboardList
                      size={18}
                      className="!text-[#1976c8]"
                    />

                    <div>

                      <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                        Department
                      </p>

                      <p className="!m-0 !text-sm !font-semibold !text-[#294b68]">
                        {
                          selectedAppointment.department
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* DATE */}

                <div className="!rounded-xl !border !border-[#edf1f4] !p-4">

                  <div className="!flex !items-center !gap-3">

                    <CalendarDays
                      size={18}
                      className="!text-[#1976c8]"
                    />

                    <div>

                      <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                        Date
                      </p>

                      <p className="!m-0 !text-sm !font-semibold !text-[#294b68]">
                        {
                          selectedAppointment.date
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* TIME */}

                <div className="!rounded-xl !border !border-[#edf1f4] !p-4">

                  <div className="!flex !items-center !gap-3">

                    <Clock3
                      size={18}
                      className="!text-[#1976c8]"
                    />

                    <div>

                      <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                        Time
                      </p>

                      <p className="!m-0 !text-sm !font-semibold !text-[#294b68]">
                        {
                          selectedAppointment.time
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* PHONE */}

                <div className="!rounded-xl !border !border-[#edf1f4] !p-4">

                  <div className="!flex !items-center !gap-3">

                    <UserRound
                      size={18}
                      className="!text-[#1976c8]"
                    />

                    <div>

                      <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                        Phone
                      </p>

                      <p className="!m-0 !text-sm !font-semibold !text-[#294b68]">
                        {
                          selectedAppointment.phone
                        }
                      </p>

                    </div>

                  </div>

                </div>


                {/* STATUS */}

                <div className="!rounded-xl !border !border-[#edf1f4] !p-4">

                  <p className="!mb-2 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                    Status
                  </p>

                  {(() => {

                    const status =
                      statusStyle[
                      selectedAppointment.status
                      ] ||
                      statusStyle.Pending;

                    return (

                      <span
                        className={`!inline-flex !items-center !gap-2 !rounded-full !px-3 !py-1.5 !text-xs !font-semibold ${status.bg} ${status.text}`}
                      >

                        <span
                          className={`!h-1.5 !w-1.5 !rounded-full ${status.dot}`}
                        ></span>

                        {
                          selectedAppointment.status
                        }

                      </span>

                    );

                  })()}

                </div>

              </div>


              {/* APPOINTMENT REASON */}

              <div className="!rounded-xl !bg-[#f8fbfd] !p-4">

                <div className="!flex !items-start !gap-3">

                  <CircleAlert
                    size={18}
                    className="!mt-0.5 !shrink-0 !text-[#1976c8]"
                  />

                  <div>

                    <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                      Appointment Reason
                    </p>

                    <p className="!m-0 !text-sm !leading-6 !text-gray-600">
                      {
                        selectedAppointment.reason ||
                        "No reason provided"
                      }
                    </p>

                  </div>

                </div>

              </div>


              {/* NOTES */}

              {selectedAppointment.notes && (

                <div className="!rounded-xl !bg-[#f8fbfd] !p-4">

                  <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                    Notes
                  </p>

                  <p className="!m-0 !text-sm !leading-6 !text-gray-600">
                    {
                      selectedAppointment.notes
                    }
                  </p>

                </div>

              )}


              {/* CANCELLATION REASON */}

              {selectedAppointment.status ===
                "Cancelled" && (

                <div className="!rounded-xl !border !border-red-100 !bg-red-50 !p-4">

                  <div className="!flex !items-start !gap-3">

                    <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-xl !bg-white !text-red-500">

                      <Ban
                        size={18}
                      />

                    </div>

                    <div className="!min-w-0">

                      <p className="!mb-1 !text-xs !font-semibold !uppercase !tracking-wide !text-red-400">
                        Cancellation Reason
                      </p>

                      <p className="!m-0 !text-sm !leading-6 !text-red-600">

                        {
                          selectedAppointment.cancellationReason ||
                          "No cancellation reason was provided."
                        }

                      </p>

                      {selectedAppointment.cancelledAt && (

                        <p className="!mb-0 !mt-2 !text-xs !text-red-400">

                          Cancelled on{" "}

                          {new Date(
                            selectedAppointment.cancelledAt
                          ).toLocaleString()}

                        </p>

                      )}

                    </div>

                  </div>

                </div>

                )}

            </div>


            {/* MODAL FOOTER */}

            <div className="!flex !justify-end !border-t !border-[#edf1f4] !px-6 !py-4">

              <button
                type="button"
                onClick={() =>
                  setShowDetails(
                    false
                  )
                }
                className="!rounded-xl !border !border-gray-200 !bg-white !px-5 !py-2.5 !text-sm !font-semibold !text-gray-500 transition hover:!bg-gray-50"
              >
                Close
              </button>

            </div>

          </div>

        </div>

        )}


      {/* =================================================
          CANCEL APPOINTMENT MODAL
      ================================================= */}

      {cancelAppointment && (

        <div className="!fixed !inset-0 !z-[125] !flex !items-center !justify-center !bg-[#102a43]/40 !p-4 !backdrop-blur-sm">

          <div className="!w-full !max-w-md !rounded-2xl !border !border-[#dcebf5] !bg-white !p-6 !shadow-[0_20px_60px_rgba(41,75,104,0.20)]">


            <div className="!flex !h-12 !w-12 !items-center !justify-center !rounded-xl !bg-red-50 !text-red-500">

              <Ban
                size={22}
              />

            </div>


            <h2 className="!mt-4 !text-lg !font-bold !text-[#294b68]">
              Cancel Appointment?
            </h2>


            <p className="!mt-2 !text-sm !leading-6 !text-gray-500">

              Enter the reason for cancelling
              the appointment for{" "}

              <span className="!font-semibold !text-[#294b68]">
                {
                  cancelAppointment.patient
                }
              </span>
              .

              The patient will be able
              to see this reason.

            </p>


            <div className="!mt-5">

              <label className="!text-xs !font-semibold !uppercase !tracking-wide !text-gray-400">
                Cancellation Reason
              </label>

              <textarea
                value={
                  cancellationReason
                }
                onChange={(event) =>
                  setCancellationReason(
                    event.target.value
                  )
                }
                maxLength={500}
                rows={4}
                placeholder="Enter cancellation reason..."
                className="!mt-2 !w-full !resize-none !rounded-xl !border !border-gray-200 !bg-[#fafcfd] !px-4 !py-3 !text-sm !text-gray-600 !outline-none transition focus:!border-[#1976c8] focus:!bg-white"
              />

              <div className="!mt-1 !text-right !text-xs !text-gray-400">

                {
                  cancellationReason.length
                }
                /500

              </div>

            </div>


            <div className="!mt-6 !flex !flex-col-reverse !gap-3 sm:!flex-row sm:!justify-end">

              <button
                type="button"
                onClick={() => {

                  if (!cancelling) {

                    setCancelAppointment(
                      null
                    );

                    setCancellationReason(
                      ""
                    );

                  }

                }}
                disabled={cancelling}
                className="!rounded-xl !border !border-gray-200 !px-5 !py-2.5 !text-sm !font-semibold !text-gray-500 transition hover:!bg-gray-50 disabled:!cursor-not-allowed disabled:!opacity-60"
              >
                Keep Appointment
              </button>


              <button
                type="button"
                onClick={
                  handleCancelAppointment
                }
                disabled={cancelling}
                className="!rounded-xl !bg-red-500 !px-5 !py-2.5 !text-sm !font-semibold !text-white transition hover:!bg-red-600 disabled:!cursor-not-allowed disabled:!opacity-60"
              >

                {cancelling
                  ? "Cancelling..."
                  : "Cancel Appointment"}

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          DELETE CONFIRMATION MODAL
      ================================================= */}

      {deleteAppointment && (

        <div className="!fixed !inset-0 !z-[120] !flex !items-center !justify-center !bg-[#102a43]/40 !p-4 !backdrop-blur-sm">

          <div className="!w-full !max-w-md !rounded-2xl !border !border-[#dcebf5] !bg-white !p-6 !shadow-[0_20px_60px_rgba(41,75,104,0.20)]">


            <div className="!flex !h-12 !w-12 !items-center !justify-center !rounded-xl !bg-red-50 !text-red-500">

              <Trash2
                size={21}
              />

            </div>


            <h2 className="!mt-4 !text-lg !font-bold !text-[#294b68]">
              Delete Appointment?
            </h2>


            <p className="!mt-2 !text-sm !leading-6 !text-gray-500">

              Are you sure you want to
              permanently delete the appointment
              for{" "}

              <span className="!font-semibold !text-[#294b68]">
                {
                  deleteAppointment.patient
                }
              </span>
              ?

              This action cannot be undone.

            </p>


            <div className="!mt-6 !flex !flex-col-reverse !gap-3 sm:!flex-row sm:!justify-end">

              <button
                type="button"
                onClick={() =>
                  setDeleteAppointment(
                    null
                  )
                }
                className="!rounded-xl !border !border-gray-200 !px-5 !py-2.5 !text-sm !font-semibold !text-gray-500 transition hover:!bg-gray-50"
              >
                Keep Appointment
              </button>


              <button
                type="button"
                onClick={
                  handleDeleteAppointment
                }
                className="!rounded-xl !bg-red-500 !px-5 !py-2.5 !text-sm !font-semibold !text-white transition hover:!bg-red-600"
              >
                Delete Appointment
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};


export default Appointments;