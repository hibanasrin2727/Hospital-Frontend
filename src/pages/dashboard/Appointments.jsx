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
} from "lucide-react";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Appointments = () => {
  /* =====================================================
     API
  ===================================================== */

  const API_URL =
    "http://localhost:5000/api/dashboard/appointments";

  /* =====================================================
     APPOINTMENTS
  ===================================================== */

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  /* =====================================================
     TOKEN
  ===================================================== */

  const getToken = () => {
    return localStorage.getItem("token");
  };

  /* =====================================================
     FETCH APPOINTMENTS
  ===================================================== */

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        console.error("Admin token not found");
        setAppointments([]);
        return;
      }

      const response = await fetch(API_URL, {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to fetch appointments"
        );
      }

      const formattedAppointments =
        (data.appointments || []).map(
          (appointment) => ({
            id: appointment._id,

            patient:
              appointment.patientName ||
              appointment.patientId?.name ||
              "Unknown Patient",

            doctor:
              appointment.doctorId?.name ||
              "Unknown Doctor",

            department:
              appointment.departmentId?.name ||
              "Unknown Department",

            date: appointment.date,

            time: appointment.time,

            status:
              appointment.status
                ?.charAt(0)
                .toUpperCase() +
              appointment.status?.slice(1),

            phone: appointment.phone || "",

            reason:
              appointment.reason || "",

            notes:
              appointment.notes || "",
          })
        );

      setAppointments(formattedAppointments);

    } catch (error) {
      console.error(
        "Fetch appointments error:",
        error
      );

      setAppointments([]);

    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FETCH ON PAGE LOAD
  ===================================================== */

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* =====================================================
     SEARCH + FILTER
  ===================================================== */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");

  /* =====================================================
     ACTION MENU
  ===================================================== */

  const [openMenu, setOpenMenu] = useState(null);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  /* =====================================================
     MODALS
  ===================================================== */

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [deleteAppointment, setDeleteAppointment] =
    useState(null);

  /* =====================================================
     STATUS STYLE
  ===================================================== */

  const statusStyle = {
    Pending: {
      badge: "bg-amber-50 text-amber-600",
      dot: "bg-amber-500",
    },

    Confirmed: {
      badge: "bg-blue-50 text-[#1976c8]",
      dot: "bg-[#1976c8]",
    },

    Rescheduled: {
      badge: "bg-purple-50 text-purple-600",
      dot: "bg-purple-500",
    },

    Cancelled: {
      badge: "bg-red-50 text-red-600",
      dot: "bg-red-500",
    },

    Completed: {
      badge: "bg-green-50 text-green-600",
      dot: "bg-green-500",
    },
  };

  /* =====================================================
     FILTER APPOINTMENTS
  ===================================================== */

  const filteredAppointments =
    appointments.filter((appointment) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        appointment.patient
          .toLowerCase()
          .includes(searchValue) ||
        appointment.doctor
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" ||
        appointment.status === statusFilter;

      const matchesDepartment =
        departmentFilter ===
        "All Departments" ||
        appointment.department ===
        departmentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment
      );
    });

  /* =====================================================
     SUMMARY COUNTS
  ===================================================== */

  const totalAppointments =
    appointments.length;

  const pendingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Pending"
    ).length;

  const confirmedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Confirmed"
    ).length;

  /* =====================================================
     OPEN ACTION MENU
  ===================================================== */

  const handleMenuClick = (
    event,
    appointmentId
  ) => {
    event.stopPropagation();

    const rect =
      event.currentTarget.getBoundingClientRect();

    const menuWidth = 195;
    const menuHeight = 175;

    let left =
      rect.right - menuWidth;

    let top =
      rect.bottom + 6;

    if (left < 10) {
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
        6;
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

  /* =====================================================
     VIEW APPOINTMENT
  ===================================================== */

  const handleViewAppointment = (
    appointment
  ) => {
    setSelectedAppointment(
      appointment
    );

    setShowDetails(true);

    setOpenMenu(null);
  };

  /* =====================================================
     CONFIRM APPOINTMENT
  ===================================================== */

  const handleConfirmAppointment = async (
    appointmentId
  ) => {
    try {
      const token = getToken();

      if (!token) {
        alert("Admin token not found");
        return;
      }

      const response = await fetch(
        `${API_URL}/${appointmentId}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: "confirmed",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to confirm appointment"
        );
      }

      await fetchAppointments();

      setOpenMenu(null);

    } catch (error) {
      console.error(
        "Confirm appointment error:",
        error
      );

      alert(error.message);
    }
  };

  /* =====================================================
     COMPLETE APPOINTMENT
  ===================================================== */

  const handleCompleteAppointment = async (
    appointmentId
  ) => {
    try {
      const token = getToken();

      if (!token) {
        alert("Admin token not found");
        return;
      }

      const response = await fetch(
        `${API_URL}/${appointmentId}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: "completed",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Failed to complete appointment"
        );
      }

      await fetchAppointments();

      setOpenMenu(null);

    } catch (error) {
      console.error(
        "Complete appointment error:",
        error
      );

      alert(error.message);
    }
  };

  /* =====================================================
     DELETE APPOINTMENT
  ===================================================== */

  const handleDeleteAppointment =
    async () => {
      if (!deleteAppointment) {
        return;
      }

      try {
        const token = getToken();

        if (!token) {
          alert("Admin token not found");
          return;
        }

        const response = await fetch(
          `${API_URL}/${deleteAppointment.id}`,
          {
            method: "DELETE",

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Failed to delete appointment"
          );
        }

        await fetchAppointments();

        setDeleteAppointment(null);

      } catch (error) {
        console.error(
          "Delete appointment error:",
          error
        );

        alert(error.message);
      }
    };

  /* =====================================================
     CLOSE MENU
  ===================================================== */

  useEffect(() => {
    const handleOutsideClick = (
      event
    ) => {
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

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
        <h1 className="text-2xl font-bold text-[#294b68]">
          Appointments
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage and track patient appointments.
        </p>
      </div>


      {/* =====================================================
          APPOINTMENT SUMMARY
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {/* TOTAL */}

        <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Total Appointments
              </p>

              <p className="mt-2 text-2xl font-bold text-[#294b68]">
                {totalAppointments}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                All scheduled appointments
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#1976c8] group-hover:text-white">
              <ClipboardList size={23} />
            </div>

          </div>

          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

        </div>


        {/* PENDING */}

        <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Pending
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-600">
                {pendingAppointments}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Awaiting confirmation
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-500 transition-all duration-300 group-hover:scale-105">
              <CircleAlert size={23} />
            </div>

          </div>

          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full" />

        </div>


        {/* CONFIRMED */}

        <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Confirmed
              </p>

              <p className="mt-2 text-2xl font-bold text-[#1976c8]">
                {confirmedAppointments}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Confirmed appointments
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1976c8] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#1976c8] group-hover:text-white">
              <CheckCircle2 size={23} />
            </div>

          </div>

          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

        </div>

      </div>


      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <div className="rounded-2xl border border-[#e5edf3] bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH */}

          <div className="relative w-full lg:max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search patient or doctor..."
              className="w-full rounded-xl border border-gray-200 bg-[#fafcfd] py-2.5 pl-10 pr-4 text-sm text-gray-600 outline-none transition focus:border-[#1976c8] focus:bg-white"
            />

          </div>


          {/* FILTERS */}

          <div className="flex flex-col gap-3 sm:flex-row">

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="rounded-xl border border-gray-200 bg-[#fafcfd] px-4 py-2.5 text-sm text-gray-600 outline-none transition focus:border-[#1976c8] focus:bg-white"
            >

              <option>
                All Status
              </option>

              <option>
                Pending
              </option>

              <option>
                Confirmed
              </option>

              <option>
                Rescheduled
              </option>

              <option>
                Cancelled
              </option>

              <option>
                Completed
              </option>

            </select>


            <select
              value={departmentFilter}
              onChange={(event) =>
                setDepartmentFilter(
                  event.target.value
                )
              }
              className="rounded-xl border border-gray-200 bg-[#fafcfd] px-4 py-2.5 text-sm text-gray-600 outline-none transition focus:border-[#1976c8] focus:bg-white"
            >

              <option>
                All Departments
              </option>

              <option>
                Cardiology & Heart Care
              </option>

              <option>
                Orthopedics
              </option>

              <option>
                Dermatology
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* =====================================================
          DESKTOP TABLE
      ===================================================== */}

      <div className="hidden overflow-hidden rounded-2xl border border-[#e5edf3] bg-white shadow-sm lg:block">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px] text-left">

            {/* HEADER */}

            <thead className="border-b border-gray-100 bg-[#f8fafc]">

              <tr>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Patient
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Doctor
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Department
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Date & Time
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Status
                </th>

                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Action
                </th>

              </tr>

            </thead>


            {/* BODY */}

            <tbody className="divide-y divide-gray-100">

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="px-6 py-14 text-center"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#eaf5fb] border-t-[#1976c8]" />

                      <p className="mt-3 text-sm text-gray-500">
                        Loading appointments...
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredAppointments.map(
                  (appointment) => (

                    <tr
                      key={appointment.id}
                      className="group transition hover:bg-[#f9fcfe]"
                    >

                      {/* PATIENT */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] transition-all duration-300 group-hover:bg-[#1976c8] group-hover:text-white">
                            <UserRound size={18} />
                          </div>

                          <div>

                            <p className="font-semibold text-[#294b68]">
                              {appointment.patient}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              Appointment #
                              {appointment.id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* DOCTOR */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4f8fb] text-[#1976c8]">
                            <Stethoscope size={15} />
                          </div>

                          <span className="text-sm font-medium text-gray-600">
                            {appointment.doctor}
                          </span>

                        </div>

                      </td>


                      {/* DEPARTMENT */}

                      <td className="px-6 py-5">

                        <span className="rounded-lg bg-[#f6f9fc] px-3 py-1.5 text-xs font-medium text-gray-600">
                          {appointment.department}
                        </span>

                      </td>


                      {/* DATE */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">

                          <CalendarDays
                            size={16}
                            className="text-[#1976c8]"
                          />

                          {appointment.date}

                        </div>

                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">

                          <Clock3 size={13} />

                          {appointment.time}

                        </div>

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle[
                              appointment.status
                            ]?.badge ||
                            "bg-gray-100 text-gray-500"
                            }`}
                        >

                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyle[
                                appointment.status
                              ]?.dot ||
                              "bg-gray-400"
                              }`}
                          />

                          {appointment.status}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td className="px-6 py-5">

                        <button
                          type="button"
                          data-appointment-menu
                          onClick={(event) =>
                            handleMenuClick(
                              event,
                              appointment.id
                            )
                          }
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                        >

                          <MoreVertical
                            size={18}
                          />

                        </button>

                      </td>

                    </tr>

                  )
                  )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          EMPTY DESKTOP STATE
      ===================================================== */}

      {!loading &&
        filteredAppointments.length === 0 && (
          <div className="hidden rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm lg:block">

          <ClipboardList
            size={40}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-[#294b68]">
            No appointments found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filters.
          </p>

          </div>
        )}


      {/* =====================================================
          MOBILE CARDS
      ===================================================== */}

      <div className="space-y-4 lg:hidden">

        {loading ? (

          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">

            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#eaf5fb] border-t-[#1976c8]" />

            <p className="mt-3 text-sm text-gray-500">
              Loading appointments...
            </p>

          </div>

        ) : (

          filteredAppointments.map(
            (appointment) => (

              <div
                key={appointment.id}
                className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]"
              >

                {/* TOP */}

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] transition-all duration-300 group-hover:bg-[#1976c8] group-hover:text-white">
                      <UserRound size={19} />
                    </div>

                    <div>

                      <h2 className="font-bold text-[#294b68] transition-colors duration-300 group-hover:text-[#1976c8]">
                        {appointment.patient}
                      </h2>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Appointment #
                        {appointment.id}
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
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#1976c8]"
                  >

                    <MoreVertical
                      size={18}
                    />

                  </button>

                </div>


                {/* DOCTOR */}

                <div className="mt-5 flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4f8fb] text-[#1976c8]">
                    <Stethoscope size={16} />
                  </div>

                  <div>

                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                      Doctor
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-gray-600">
                      {appointment.doctor}
                    </p>

                  </div>

                </div>


                {/* DEPARTMENT */}

                <div className="mt-4">

                  <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Department
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-600">
                    {appointment.department}
                  </p>

                </div>


                {/* DATE + TIME */}

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-[#f8fafc] p-3">

                    <div className="flex items-center gap-2 text-[#1976c8]">

                      <CalendarDays size={15} />

                      <span className="text-[10px] font-semibold uppercase">
                        Date
                      </span>

                    </div>

                    <p className="mt-1 text-xs font-semibold text-gray-600">
                      {appointment.date}
                    </p>

                  </div>


                  <div className="rounded-xl bg-[#f8fafc] p-3">

                    <div className="flex items-center gap-2 text-[#1976c8]">

                      <Clock3 size={15} />

                      <span className="text-[10px] font-semibold uppercase">
                        Time
                      </span>

                    </div>

                    <p className="mt-1 text-xs font-semibold text-gray-600">
                      {appointment.time}
                    </p>

                  </div>

                </div>


                {/* STATUS */}

                <div className="mt-4 border-t border-gray-100 pt-4">

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle[
                        appointment.status
                      ]?.badge ||
                      "bg-gray-100 text-gray-500"
                      }`}
                  >

                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusStyle[
                          appointment.status
                        ]?.dot ||
                        "bg-gray-400"
                        }`}
                    />

                    {appointment.status}

                  </span>

                </div>


                {/* BLUE HOVER LINE */}

                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

              </div>

            )
            )

        )}

      </div>


      {/* =====================================================
          EMPTY MOBILE STATE
      ===================================================== */}

      {!loading &&
        filteredAppointments.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm lg:hidden">

          <ClipboardList
            size={40}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-[#294b68]">
            No appointments found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filters.
          </p>

          </div>
        )}


      {/* =====================================================
          ACTION MENU
      ===================================================== */}

      {openMenu &&
        createPortal(

          <div
            data-appointment-menu
            style={{
              position: "fixed",
              top: menuPosition.top,
              left: menuPosition.left,
            }}
            className="z-[100] w-[195px] overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_12px_35px_rgba(41,75,104,0.18)]"
          >

            {(() => {

              const appointment =
                appointments.find(
                  (item) =>
                    item.id === openMenu
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
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                  >

                    <Eye size={16} />

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
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-600"
                    >

                      <Check size={16} />

                      Confirm

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
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-blue-50 hover:text-[#1976c8]"
                    >

                      <CheckCircle2
                        size={16}
                      />

                      Mark Completed

                    </button>

                    )}


                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() => {

                      setDeleteAppointment(
                        appointment
                      );

                      setOpenMenu(null);

                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >

                    <Trash2 size={16} />

                    Delete

                  </button>

                </>
              );

            })()}

          </div>,

          document.body

        )}


      {/* =====================================================
          VIEW DETAILS MODAL
      ===================================================== */}

      {showDetails &&
        selectedAppointment && (

          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

              {/* HEADER */}

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="!text-lg font-bold text-[#294b68]">
                    Appointment Details
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Appointment #
                    {selectedAppointment.id}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowDetails(false)
                  }
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#294b68]"
                >

                  <X size={19} />

                </button>

              </div>


              {/* DETAILS */}

              <div className="mt-6 space-y-4">

              {/* PATIENT */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Patient
                  </p>

                  <p className="mt-1 font-semibold text-[#294b68]">
                    {
                      selectedAppointment.patient
                    }
                  </p>

              </div>


              {/* PHONE */}

              {selectedAppointment.phone && (

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {
                      selectedAppointment.phone
                    }
                  </p>

                </div>

              )}


              {/* DOCTOR */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Doctor
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {
                      selectedAppointment.doctor
                    }
                  </p>

                </div>


              {/* DEPARTMENT */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Department
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {
                      selectedAppointment.department
                    }
                  </p>

                </div>


              {/* DATE + TIME */}

                <div className="grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-[#f6f9fc] p-3">

                    <p className="text-xs text-gray-400">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#294b68]">
                      {
                        selectedAppointment.date
                      }
                    </p>

                  </div>


                  <div className="rounded-xl bg-[#f6f9fc] p-3">

                    <p className="text-xs text-gray-400">
                      Time
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#294b68]">
                      {
                        selectedAppointment.time
                      }
                    </p>

                  </div>

                </div>


              {/* REASON */}

              {selectedAppointment.reason && (

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Reason
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {
                      selectedAppointment.reason
                    }
                  </p>

                </div>

              )}


              {/* NOTES */}

              {selectedAppointment.notes && (

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Notes
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {
                      selectedAppointment.notes
                    }
                  </p>

                </div>

              )}


              {/* STATUS */}

                <div>

                  <p className="text-xs text-gray-400">
                    Status
                  </p>

                  <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle[
                      selectedAppointment.status
                    ]?.badge ||
                    "bg-gray-100 text-gray-500"
                    }`}
                  >

                    <span
                    className={`h-1.5 w-1.5 rounded-full ${statusStyle[
                        selectedAppointment.status
                      ]?.dot ||
                      "bg-gray-400"
                      }`}
                    />

                    {
                      selectedAppointment.status
                    }

                  </span>

                </div>

              </div>


              {/* CLOSE */}

              <div className="mt-6 flex justify-end">

                <button
                  type="button"
                  onClick={() =>
                    setShowDetails(false)
                  }
                  className="!rounded-xl bg-[#1976c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        )}


      {/* =====================================================
          DELETE CONFIRMATION
      ===================================================== */}

      {deleteAppointment && (

        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

            {/* ICON */}

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">

              <Trash2 size={22} />

            </div>


            {/* TITLE */}

            <h2 className="mt-4 !text-lg font-bold text-[#294b68]">
              Delete Appointment?
            </h2>


            {/* MESSAGE */}

            <p className="mt-2 text-sm leading-6 text-gray-500">

              Are you sure you want to
              delete the appointment for{" "}

              <span className="font-semibold text-[#294b68]">
                {
                  deleteAppointment.patient
                }
              </span>

              ? This action cannot be
              undone.

            </p>


            {/* BUTTONS */}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  setDeleteAppointment(
                    null
                  )
                }
                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50"
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={
                  handleDeleteAppointment
                }
                className="!rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
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