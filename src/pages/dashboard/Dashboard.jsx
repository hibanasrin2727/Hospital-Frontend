import {
    Users,
    UserRound,
    Building2,
    CalendarCheck,
    Stethoscope,
    Clock3,
    CheckCircle2,
    CircleAlert,
    CalendarDays,
    XCircle,
    ArrowUpRight,
    RefreshCw,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {

    // =====================================================
    // API
    // =====================================================

    const STATS_API =
        "http://localhost:5000/api/dashboard/stats";

    const APPOINTMENTS_API =
        "http://localhost:5000/api/dashboard/appointments";


    // =====================================================
    // DASHBOARD STATE
    // =====================================================

    const [dashboardData, setDashboardData] = useState({
        totalPatients: 0,
        totalDoctors: 0,
        totalDepartments: 0,
        totalServices: 0,
        totalAppointments: 0,
        pendingAppointments: 0,
        confirmedAppointments: 0,
        completedAppointments: 0,
        rescheduledAppointments: 0,
        cancelledAppointments: 0,
    });


    // =====================================================
    // APPOINTMENTS STATE
    // =====================================================

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [appointmentsLoading, setAppointmentsLoading] =
        useState(true);

    const [error, setError] = useState("");

    const [appointmentsError, setAppointmentsError] =
        useState("");


    // =====================================================
    // GET TOKEN
    // =====================================================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // =====================================================
    // SAFE VALUE HELPER
    // =====================================================

    const getValue = (value, fallback = "-") => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return fallback;
        }

        if (typeof value === "string" ||
            typeof value === "number") {
            return value;
        }

        if (typeof value === "object") {

            return (
                value.name ||
                value.username ||
                value.fullName ||
                value.displayName ||
                value.title ||
                value.email ||
                fallback
            );
        }

        return fallback;
    };


    // =====================================================
    // GET PATIENT NAME
    // =====================================================

    const getPatientName = (appointment) => {

        return getValue(
            appointment.patient ||
            appointment.patientId ||
            appointment.user ||
            appointment.userId ||
            appointment.patientName ||
            appointment.userName,
            "Unknown Patient"
        );
    };


    // =====================================================
    // GET DOCTOR NAME
    // =====================================================

    const getDoctorName = (appointment) => {

        const doctor = appointment.doctor ||
            appointment.doctorId ||
            appointment.doctorName;

        const value = getValue(
            doctor,
            "Unknown Doctor"
        );

        if (
            typeof doctor === "object" &&
            doctor?.name
        ) {
            return doctor.name;
        }

        return value;
    };


    // =====================================================
    // GET DEPARTMENT
    // =====================================================

    const getDepartmentName = (appointment) => {

        const department =
            appointment.department ||
            appointment.departmentId ||
            appointment.departmentName;

        return getValue(
            department,
            "General"
        );
    };


    // =====================================================
    // GET APPOINTMENT DATE
    // =====================================================

    const getAppointmentDate = (appointment) => {

        const date =
            appointment.date ||
            appointment.appointmentDate ||
            appointment.appointment_date;

        if (!date) {
            return "-";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };


    // =====================================================
    // GET APPOINTMENT TIME
    // =====================================================

    const getAppointmentTime = (appointment) => {

        const time =
            appointment.time ||
            appointment.appointmentTime ||
            appointment.appointment_time;

        if (!time) {
            return "-";
        }

        return time;
    };


    // =====================================================
    // STATUS
    // =====================================================

    const getStatus = (appointment) => {

        return (
            appointment.status ||
            "pending"
        ).toLowerCase();
    };


    // =====================================================
    // STATUS LABEL
    // =====================================================

    const formatStatus = (status) => {

        if (!status) {
            return "Pending";
        }

        return status
            .charAt(0)
            .toUpperCase() +
            status.slice(1);
    };


    // =====================================================
    // STATUS STYLE
    // =====================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "confirmed":
                return {
                    bg: "bg-blue-50",
                    text: "text-blue-700",
                    dot: "bg-blue-500",
                };

            case "completed":
                return {
                    bg: "bg-green-50",
                    text: "text-green-700",
                    dot: "bg-green-500",
                };

            case "cancelled":
                return {
                    bg: "bg-red-50",
                    text: "text-red-700",
                    dot: "bg-red-500",
                };

            case "rescheduled":
                return {
                    bg: "bg-purple-50",
                    text: "text-purple-700",
                    dot: "bg-purple-500",
                };

            default:
                return {
                    bg: "bg-yellow-50",
                    text: "text-yellow-700",
                    dot: "bg-yellow-500",
                };
        }
    };


    // =====================================================
    // FETCH DASHBOARD STATS
    // =====================================================

    const fetchDashboardData = async () => {

        try {

            setLoading(true);
            setError("");

            const token = getToken();

            if (!token) {
                throw new Error(
                    "Admin token not found. Please login again."
                );
            }

            const response = await fetch(
                STATS_API,
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to fetch dashboard data"
                );
            }

            setDashboardData({

                totalPatients:
                    data.totalPatients || 0,

                totalDoctors:
                    data.totalDoctors || 0,

                totalDepartments:
                    data.totalDepartments || 0,

                totalServices:
                    data.totalServices || 0,

                totalAppointments:
                    data.totalAppointments || 0,

                pendingAppointments:
                    data.pendingAppointments || 0,

                confirmedAppointments:
                    data.confirmedAppointments || 0,

                completedAppointments:
                    data.completedAppointments || 0,

                rescheduledAppointments:
                    data.rescheduledAppointments || 0,

                cancelledAppointments:
                    data.cancelledAppointments || 0,
            });

        } catch (error) {

            console.error(
                "Dashboard fetch error:",
                error
            );

            setError(
                error.message ||
                "Failed to load dashboard data"
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // FETCH APPOINTMENTS
    // =====================================================

    const fetchAppointments = async () => {

        try {

            setAppointmentsLoading(true);
            setAppointmentsError("");

            const token = getToken();

            if (!token) {
                throw new Error(
                    "Admin token not found."
                );
            }

            const response = await fetch(
                APPOINTMENTS_API,
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",
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


            // Supports different common backend response formats
            const appointmentList =
                Array.isArray(data)
                    ? data
                    : Array.isArray(data.appointments)
                        ? data.appointments
                        : Array.isArray(data.data)
                            ? data.data
                            : Array.isArray(data.results)
                                ? data.results
                                : [];


            setAppointments(
                appointmentList
            );

        } catch (error) {

            console.error(
                "Appointments fetch error:",
                error
            );

            setAppointmentsError(
                error.message ||
                "Failed to load appointments"
            );

        } finally {

            setAppointmentsLoading(false);
        }
    };


    // =====================================================
    // LOAD DASHBOARD
    // =====================================================

    useEffect(() => {

        fetchDashboardData();
        fetchAppointments();

    }, []);


    // =====================================================
    // STAT CARDS
    // =====================================================

    const stats = [

        {
            title: "Total Patients",
            value:
                dashboardData.totalPatients,
            icon: Users,
            iconBg: "bg-blue-50",
            iconColor: "text-[#1976c8]",
        },

        {
            title: "Total Doctors",
            value:
                dashboardData.totalDoctors,
            icon: UserRound,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
        },

        {
            title: "Departments",
            value:
                dashboardData.totalDepartments,
            icon: Building2,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },

        {
            title: "Appointments",
            value:
                dashboardData.totalAppointments,
            icon: CalendarCheck,
            iconBg: "bg-cyan-50",
            iconColor: "text-cyan-600",
        },
    ];


    // =====================================================
    // APPOINTMENT STATUS DATA
    // =====================================================

    const appointmentStatus = [

        {
            title: "Pending",
            value:
                dashboardData.pendingAppointments,
            icon: CircleAlert,
            iconBg: "bg-yellow-50",
            iconColor: "text-yellow-600",
            bar: "bg-yellow-500",
        },

        {
            title: "Confirmed",
            value:
                dashboardData.confirmedAppointments,
            icon: CheckCircle2,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            bar: "bg-blue-500",
        },

        {
            title: "Completed",
            value:
                dashboardData.completedAppointments,
            icon: CheckCircle2,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
            bar: "bg-green-500",
        },

        {
            title: "Rescheduled",
            value:
                dashboardData.rescheduledAppointments,
            icon: RefreshCw,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
            bar: "bg-purple-500",
        },

        {
            title: "Cancelled",
            value:
                dashboardData.cancelledAppointments,
            icon: XCircle,
            iconBg: "bg-red-50",
            iconColor: "text-red-600",
            bar: "bg-red-500",
        },
    ];


    // =====================================================
    // TOTAL FOR PERCENTAGE
    // =====================================================

    const totalAppointmentStatuses =
        appointmentStatus.reduce(
            (total, item) =>
                total + Number(item.value || 0),
            0
        );


    // =====================================================
    // RECENT APPOINTMENTS
    // =====================================================

    const recentAppointments =
        [...appointments]
            .sort(
                (a, b) =>
                    new Date(
                        b.createdAt ||
                        b.date ||
                        b.appointmentDate ||
                        0
                    ) -
                    new Date(
                        a.createdAt ||
                        a.date ||
                        a.appointmentDate ||
                        0
                    )
            )
            .slice(0, 5);


    // =====================================================
    // UPCOMING APPOINTMENTS
    // =====================================================

    const upcomingAppointments =
        [...appointments]
            .filter(
                (appointment) =>
                    ![
                        "completed",
                        "cancelled",
                    ].includes(
                        getStatus(appointment)
                    )
            )
            .sort(
                (a, b) =>
                    new Date(
                        a.date ||
                        a.appointmentDate ||
                        0
                    ) -
                    new Date(
                        b.date ||
                        b.appointmentDate ||
                        0
                    )
            )
            .slice(0, 4);


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="!w-full !space-y-6">





            {/* =====================================================
    WELCOME CARD
===================================================== */}

            <div className="!relative !overflow-hidden !rounded-2xl !bg-[#1976c8] !p-6 !text-white !shadow-sm sm:!p-8">

                <div className="!relative !z-10 !max-w-2xl">

                    <p className="!mb-1 !text-sm !font-medium !text-blue-100">
                        Welcome back
                    </p>

                    <h2 className="!m-0 !text-2xl !font-bold !text-white sm:!text-3xl">
                        Hospital Admin
                    </h2>

                    <p className="!mb-0 !mt-2 !max-w-xl !text-sm !leading-6 !text-blue-100 sm:!text-base">
                        Manage doctors, departments, patients
                        and appointments from one central dashboard.
                    </p>

                </div>


                {/* REFRESH BUTTON */}

                <button
                    onClick={() => {
                        fetchDashboardData();
                        fetchAppointments();
                    }}
                    className="!absolute !right-6 !top-6 !z-20 !inline-flex !items-center !gap-2 !rounded-lg !border !border-white/30 !bg-white !px-4 !py-2.5 !text-sm !font-semibold !text-[#294b68] !shadow-sm !transition !hover:border-white !hover:text-[#1976c8] sm:!right-8 sm:!top-8"
                >

                    <RefreshCw
                        size={16}
                        className={
                            loading ||
                                appointmentsLoading
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Refresh

                </button>


                <div className="!absolute !-right-12 !-top-12 !h-40 !w-40 !rounded-full !bg-white/10" />

                <div className="!absolute !-bottom-20 !right-20 !h-48 !w-48 !rounded-full !bg-white/5" />

            </div>


            {/* =====================================================
                ERROR
            ===================================================== */}

            {error && (

                <div className="!flex !items-center !justify-between !gap-4 !rounded-xl !border !border-red-100 !bg-red-50 !px-4 !py-4">

                    <p className="!mb-0 !text-sm !font-medium !text-red-600">
                        {error}
                    </p>

                    <button
                        onClick={fetchDashboardData}
                        className="!rounded-lg !bg-red-600 !px-4 !py-2 !text-sm !font-semibold !text-white !hover:bg-red-700"
                    >
                        Retry
                    </button>

                </div>

            )}


            {/* =====================================================
                STATISTICS
            ===================================================== */}

            <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2 xl:!grid-cols-4">

                {stats.map((stat) => {

                    const Icon = stat.icon;

                    return (

                        <div
                            key={stat.title}
                            className="!rounded-2xl !border !border-[#dcebf5] !bg-white !p-5 !shadow-sm !transition-all !duration-300 !hover:-translate-y-1 !hover:shadow-md"
                        >

                            <div className="!flex !items-start !justify-between">

                                <div
                                    className={`!flex !h-12 !w-12 !items-center !justify-center !rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                                >
                                    <Icon
                                        size={22}
                                        strokeWidth={2}
                                    />
                                </div>

                                <ArrowUpRight
                                    size={18}
                                    className="!text-gray-300"
                                />

                            </div>


                            <div className="!mt-5">

                                <p className="!mb-1 !text-sm !font-medium !text-gray-500">
                                    {stat.title}
                                </p>

                                <h2 className="!m-0 !text-3xl !font-bold !text-[#294b68]">
                                    {loading
                                        ? "..."
                                        : stat.value}
                                </h2>

                            </div>

                        </div>

                    );

                })}

            </div>


            {/* =====================================================
                APPOINTMENT OVERVIEW
            ===================================================== */}

            <div className="!rounded-2xl !border !border-[#dcebf5] !bg-white !p-5 !shadow-sm sm:!p-6">

                <div className="!mb-5">

                    <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                        Appointment Overview
                    </h2>

                    <p className="!mb-0 !mt-1 !text-xs !text-gray-500">
                        Current appointment status distribution
                    </p>

                </div>


                <div className="!grid !grid-cols-1 !gap-5 sm:!grid-cols-2 lg:!grid-cols-5">

                    {appointmentStatus.map((item) => {

                        const Icon = item.icon;

                        const percentage =
                            totalAppointmentStatuses > 0
                                ? Math.round(
                                    (item.value /
                                        totalAppointmentStatuses) *
                                    100
                                )
                                : 0;

                        return (

                            <div
                                key={item.title}
                                className="!rounded-xl !border !border-[#edf3f7] !bg-[#fbfdff] !p-4"
                            >

                                <div className="!flex !items-center !justify-between">

                                    <div
                                        className={`!flex !h-10 !w-10 !items-center !justify-center !rounded-lg ${item.iconBg} ${item.iconColor}`}
                                    >
                                        <Icon size={19} />
                                    </div>

                                    <span className="!text-xl !font-bold !text-[#294b68]">
                                        {loading
                                            ? "..."
                                            : item.value}
                                    </span>

                                </div>


                                <p className="!mb-0 !mt-4 !text-sm !font-semibold !text-[#294b68]">
                                    {item.title}
                                </p>


                                <div className="!mt-3 !h-1.5 !w-full !overflow-hidden !rounded-full !bg-gray-100">

                                    <div
                                        className={`!h-full !rounded-full ${item.bar}`}
                                        style={{
                                            width:
                                                `${percentage}%`,
                                        }}
                                    />

                                </div>


                                <p className="!mb-0 !mt-2 !text-xs !text-gray-400">
                                    {percentage}% of appointments
                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>


            {/* =====================================================
                RECENT APPOINTMENTS
            ===================================================== */}

            <div className="!overflow-hidden !rounded-2xl !border !border-[#dcebf5] !bg-white !shadow-sm">

                <div className="!flex !flex-col !gap-3 !border-b !border-[#edf3f7] !px-5 !py-5 sm:!flex-row sm:!items-center sm:!justify-between">

                    <div>

                        <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                            Recent Appointments
                        </h2>

                        <p className="!mb-0 !mt-1 !text-xs !text-gray-500">
                            Latest appointments from the hospital
                        </p>

                    </div>


                    <Link
                        to="/dashboard/appointments"
                        className="!no-underline !text-sm !font-semibold !text-[#1976c8] !hover:text-[#145ea8]"
                    >
                        View All
                    </Link>

                </div>


                {/* DESKTOP TABLE */}

                <div className="!hidden !overflow-x-auto md:!block">

                    {appointmentsLoading ? (

                        <div className="!px-5 !py-12 !text-center !text-sm !text-gray-400">
                            Loading appointments...
                        </div>

                    ) : appointmentsError ? (

                        <div className="!px-5 !py-12 !text-center">

                            <p className="!mb-3 !text-sm !text-red-500">
                                {appointmentsError}
                            </p>

                            <button
                                onClick={fetchAppointments}
                                className="!rounded-lg !bg-[#1976c8] !px-4 !py-2 !text-xs !font-semibold !text-white"
                            >
                                Retry
                            </button>

                        </div>

                    ) : recentAppointments.length === 0 ? (

                        <div className="!px-5 !py-12 !text-center">

                            <CalendarCheck
                                size={32}
                                className="!mx-auto !text-gray-300"
                            />

                            <p className="!mb-0 !mt-3 !text-sm !font-semibold !text-[#294b68]">
                                No appointments found
                            </p>

                            <p className="!mb-0 !mt-1 !text-xs !text-gray-400">
                                New appointments will appear here.
                            </p>

                        </div>

                    ) : (

                        <table className="!w-full">

                                        <thead>

                                            <tr className="!border-b !border-[#edf3f7] !bg-[#f8fbfd]">

                                                <th className="!px-5 !py-4 !text-left !text-xs !font-bold !uppercase !tracking-wide !text-[#294b68]">
                                                    Patient
                                                </th>

                                                <th className="!px-5 !py-4 !text-left !text-xs !font-bold !uppercase !tracking-wide !text-[#294b68]">
                                                    Doctor
                                                </th>

                                                <th className="!px-5 !py-4 !text-left !text-xs !font-bold !uppercase !tracking-wide !text-[#294b68]">
                                                    Department
                                                </th>

                                                <th className="!px-5 !py-4 !text-left !text-xs !font-bold !uppercase !tracking-wide !text-[#294b68]">
                                                    Date
                                                </th>

                                                <th className="!px-5 !py-4 !text-left !text-xs !font-bold !uppercase !tracking-wide !text-[#294b68]">
                                                    Time
                                                </th>

                                                <th className="!px-5 !py-4 !text-left !text-xs !font-bold !uppercase !tracking-wide !text-[#294b68]">
                                                    Status
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {recentAppointments.map(
                                                (appointment, index) => {

                                                    const status =
                                                        getStatus(
                                                            appointment
                                                        );

                                                    const statusStyle =
                                                        getStatusStyle(
                                                            status
                                                        );

                                                    return (

                                                        <tr
                                                            key={
                                                                appointment._id ||
                                                                appointment.id ||
                                                                index
                                                            }
                                                            className="!border-b !border-[#f0f4f7] !transition !hover:bg-[#fbfdff]"
                                                        >

                                                            <td className="!px-5 !py-4">

                                                                <div className="!flex !items-center !gap-3">

                                                                    <div className="!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-full !bg-[#eaf5fb] !text-xs !font-bold !text-[#1976c8]">

                                                                        {getPatientName(
                                                                            appointment
                                                                        )
                                                                            .charAt(0)
                                                                            .toUpperCase()}

                                                                    </div>

                                                                    <span className="!text-sm !font-semibold !text-[#294b68]">
                                                                        {getPatientName(
                                                                            appointment
                                                                        )}
                                                                    </span>

                                                                </div>

                                                            </td>


                                                            <td className="!px-5 !py-4 !text-sm !text-gray-600">

                                                                {getDoctorName(
                                                                    appointment
                                                                )}

                                                            </td>


                                                            <td className="!px-5 !py-4 !text-sm !text-gray-600">

                                                                {getDepartmentName(
                                                                    appointment
                                                                )}

                                                            </td>


                                                            <td className="!whitespace-nowrap !px-5 !py-4 !text-sm !text-gray-600">

                                                                {getAppointmentDate(
                                                                    appointment
                                                                )}

                                                            </td>


                                                            <td className="!whitespace-nowrap !px-5 !py-4 !text-sm !text-gray-600">

                                                                <div className="!flex !items-center !gap-1.5">

                                                                    <Clock3
                                                                        size={14}
                                                                        className="!text-gray-400"
                                                                    />

                                                                    {getAppointmentTime(
                                                                        appointment
                                                                    )}

                                                                </div>

                                                            </td>


                                                            <td className="!px-5 !py-4">

                                                                <span
                                                                    className={`!inline-flex !items-center !gap-1.5 !rounded-full !px-3 !py-1.5 !text-xs !font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                                                                >

                                                                    <span
                                                                        className={`!h-1.5 !w-1.5 !rounded-full ${statusStyle.dot}`}
                                                                    />

                                                                    {formatStatus(
                                                                        status
                                                                    )}

                                                                </span>

                                                            </td>

                                                        </tr>

                                                    );

                                                }
                                            )}

                                        </tbody>

                                    </table>

                    )}

                </div>


                {/* MOBILE */}

                <div className="!space-y-3 !p-4 md:!hidden">

                    {appointmentsLoading ? (

                        <div className="!py-8 !text-center !text-sm !text-gray-400">
                            Loading appointments...
                        </div>

                    ) : recentAppointments.length === 0 ? (

                            <div className="!py-8 !text-center">

                                <CalendarCheck
                                    size={30}
                                    className="!mx-auto !text-gray-300"
                                />

                                <p className="!mb-0 !mt-3 !text-sm !font-semibold !text-[#294b68]">
                                    No appointments found
                                </p>

                            </div>

                        ) : (

                            recentAppointments.map(
                                (appointment, index) => {

                                    const status =
                                        getStatus(
                                            appointment
                                        );

                                    const statusStyle =
                                        getStatusStyle(
                                            status
                                        );

                                    return (

                                        <div
                                            key={
                                                appointment._id ||
                                                appointment.id ||
                                                index
                                            }
                                            className="!rounded-xl !border !border-[#edf3f7] !bg-[#fbfdff] !p-4"
                                        >

                                            <div className="!flex !items-start !justify-between !gap-3">

                                                <div>

                                                    <p className="!mb-0 !text-sm !font-bold !text-[#294b68]">
                                                        {getPatientName(
                                                            appointment
                                                        )}
                                                    </p>

                                                    <p className="!mb-0 !mt-1 !text-xs !text-gray-500">
                                                        {getDoctorName(
                                                            appointment
                                                        )}
                                                    </p>

                                                </div>


                                                <span
                                                    className={`!inline-flex !items-center !gap-1.5 !rounded-full !px-2.5 !py-1 !text-[11px] !font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                                                >

                                                    <span
                                                        className={`!h-1.5 !w-1.5 !rounded-full ${statusStyle.dot}`}
                                                    />

                                                    {formatStatus(
                                                        status
                                                    )}

                                                </span>

                                            </div>


                                            <div className="!mt-3 !flex !flex-wrap !gap-x-4 !gap-y-2 !text-xs !text-gray-500">

                                                <span>
                                                    {getDepartmentName(
                                                        appointment
                                                    )}
                                                </span>

                                                <span>
                                                    {getAppointmentDate(
                                                        appointment
                                                    )}
                                                </span>

                                                <span>
                                                    {getAppointmentTime(
                                                        appointment
                                                    )}
                                                </span>

                                            </div>

                                        </div>

                                    );

                                }
                            )

                    )}

                </div>

            </div>


            {/* =====================================================
                UPCOMING APPOINTMENTS
            ===================================================== */}

            <div>

                <div className="!mb-4 !flex !items-center !justify-between">

                    <div>

                        <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                            Upcoming Appointments
                        </h2>

                        <p className="!mb-0 !mt-1 !text-xs !text-gray-500">
                            Patients scheduled for upcoming visits
                        </p>

                    </div>

                    <CalendarDays
                        size={21}
                        className="!text-[#1976c8]"
                    />

                </div>


                {upcomingAppointments.length === 0 ? (

                    <div className="!rounded-2xl !border !border-[#dcebf5] !bg-white !p-8 !text-center !shadow-sm">

                        <CalendarDays
                            size={34}
                            className="!mx-auto !text-gray-300"
                        />

                        <p className="!mb-0 !mt-3 !text-sm !font-semibold !text-[#294b68]">
                            No upcoming appointments
                        </p>

                        <p className="!mb-0 !mt-1 !text-xs !text-gray-400">
                            Upcoming patient visits will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="!grid !grid-cols-1 !gap-4 lg:!grid-cols-2">

                        {upcomingAppointments.map(
                            (appointment, index) => {

                                const status =
                                    getStatus(
                                        appointment
                                    );

                                const statusStyle =
                                    getStatusStyle(
                                        status
                                    );

                                return (

                                    <div
                                        key={
                                            appointment._id ||
                                            appointment.id ||
                                            index
                                        }
                                        className="!rounded-2xl !border !border-[#dcebf5] !bg-white !p-5 !shadow-sm !transition !hover:-translate-y-1 !hover:shadow-md"
                                    >

                                        <div className="!flex !items-start !justify-between !gap-4">

                                            <div className="!flex !items-center !gap-3">

                                                <div className="!flex !h-11 !w-11 !items-center !justify-center !rounded-xl !bg-[#eaf5fb] !text-[#1976c8]">

                                                    <CalendarCheck
                                                        size={21}
                                                    />

                                                </div>


                                                <div>

                                                    <p className="!mb-0 !text-sm !font-bold !text-[#294b68]">
                                                        {getPatientName(
                                                            appointment
                                                        )}
                                                    </p>

                                                    <p className="!mb-0 !mt-1 !text-xs !text-gray-500">
                                                        {getDoctorName(
                                                            appointment
                                                        )}
                                                    </p>

                                                </div>

                                            </div>


                                            <span
                                                className={`!rounded-full !px-2.5 !py-1 !text-[11px] !font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                                            >
                                                {formatStatus(
                                                    status
                                                )}
                                            </span>

                                        </div>


                                        <div className="!mt-5 !grid !grid-cols-2 !gap-3">

                                            <div className="!rounded-lg !bg-[#f8fbfd] !p-3">

                                                <p className="!mb-1 !text-[11px] !font-medium !uppercase !tracking-wide !text-gray-400">
                                                    Date
                                                </p>

                                                <p className="!mb-0 !text-xs !font-semibold !text-[#294b68]">
                                                    {getAppointmentDate(
                                                        appointment
                                                    )}
                                                </p>

                                            </div>


                                            <div className="!rounded-lg !bg-[#f8fbfd] !p-3">

                                                <p className="!mb-1 !text-[11px] !font-medium !uppercase !tracking-wide !text-gray-400">
                                                    Time
                                                </p>

                                                <p className="!mb-0 !text-xs !font-semibold !text-[#294b68]">
                                                    {getAppointmentTime(
                                                        appointment
                                                    )}
                                                </p>

                                            </div>

                                        </div>


                                        <div className="!mt-3 !text-xs !text-gray-500">

                                            Department:{" "}

                                            <span className="!font-semibold !text-[#294b68]">
                                                {getDepartmentName(
                                                    appointment
                                                )}
                                            </span>

                                        </div>

                                    </div>

                                );

                            }
                        )}

                        </div>

                )}

            </div>


            {/* =====================================================
                QUICK ACTIONS
            ===================================================== */}

            <div>

                <div className="!mb-4">

                    <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                        Quick Actions
                    </h2>

                    <p className="!mb-0 !mt-1 !text-xs !text-gray-500">
                        Quickly access important management sections
                    </p>

                </div>


                <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2 lg:!grid-cols-4">


                    {/* DOCTORS */}

                    <Link
                        to="/dashboard/doctors"
                        className="group !flex !items-center !gap-4 !rounded-2xl !border !border-[#dcebf5] !bg-white !p-5 !no-underline !shadow-sm !transition-all !duration-300 !hover:-translate-y-1 !hover:shadow-md"
                    >

                        <div className="!flex !h-11 !w-11 !shrink-0 !items-center !justify-center !rounded-xl !bg-blue-50 !text-[#1976c8] !transition !group-hover:bg-[#1976c8] !group-hover:text-white">

                            <Stethoscope size={21} />

                        </div>

                        <div>

                            <p className="!mb-0 !font-semibold !text-[#294b68]">
                                Manage Doctors
                            </p>

                            <p className="!mb-0 !mt-1 !text-xs !text-gray-500">
                                Add and manage doctors
                            </p>

                        </div>

                    </Link>


                    {/* DEPARTMENTS */}

                    <Link
                        to="/dashboard/departments"
                        className="group !flex !items-center !gap-4 !rounded-2xl !border !border-[#dcebf5] !bg-white !p-5 !no-underline !shadow-sm !transition-all !duration-300 !hover:-translate-y-1 !hover:shadow-md"
                    >

                        <div className="!flex !h-11 !w-11 !shrink-0 !items-center !justify-center !rounded-xl !bg-green-50 !text-green-600 !transition !group-hover:bg-green-600 !group-hover:text-white">

                            <Building2 size={21} />

                        </div>

                        <div>

                            <p className="!mb-0 !font-semibold !text-[#294b68]">
                                Departments
                            </p>

                            <p className="!mb-0 !mt-1 !text-xs !text-gray-500">
                                Manage departments
                            </p>

                        </div>

                    </Link>


                    {/* APPOINTMENTS */}

                    <Link
                        to="/dashboard/appointments"
                        className="group !flex !items-center !gap-4 !rounded-2xl !border !border-[#dcebf5] !bg-white !p-5 !no-underline !shadow-sm !transition-all !duration-300 !hover:-translate-y-1 !hover:shadow-md"
                    >

                        <div className="!flex !h-11 !w-11 !shrink-0 !items-center !justify-center !rounded-xl !bg-purple-50 !text-purple-600 !transition !group-hover:bg-purple-600 !group-hover:text-white">

                            <CalendarCheck size={21} />

                        </div>

                        <div>

                            <p className="!mb-0 !font-semibold !text-[#294b68]">
                                Appointments
                            </p>

                            <p className="!mb-0 !mt-1 !text-xs !text-gray-500">
                                Manage appointments
                            </p>

                        </div>

                    </Link>


                    {/* USERS */}

                    <Link
                        to="/dashboard/users"
                        className="group !flex !items-center !gap-4 !rounded-2xl !border !border-[#dcebf5] !bg-white !p-5 !no-underline !shadow-sm !transition-all !duration-300 !hover:-translate-y-1 !hover:shadow-md"
                    >

                        <div className="!flex !h-11 !w-11 !shrink-0 !items-center !justify-center !rounded-xl !bg-cyan-50 !text-cyan-600 !transition !group-hover:bg-cyan-600 !group-hover:text-white">

                            <Users size={21} />

                        </div>

                        <div>

                            <p className="!mb-0 !font-semibold !text-[#294b68]">
                                Patients
                            </p>

                            <p className="!mb-0 !mt-1 !text-xs !text-gray-500">
                                Manage patients
                            </p>

                        </div>

                    </Link>

                </div>

            </div>

        </div>
    );
};


export default Dashboard;