import {
    Users,
    UserRound,
    Building2,
    CalendarCheck,
    ArrowUpRight,
    Stethoscope,
    Clock3,
    CheckCircle2,
    CircleAlert,
    CalendarDays,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {

    // =====================================================
    // API
    // =====================================================

    const API_URL = "http://localhost:5000/api/dashboard/stats";

    // =====================================================
    // STATE
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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // GET TOKEN
    // =====================================================

    const getToken = () => {
        return localStorage.getItem("token");
    };

    // =====================================================
    // FETCH DASHBOARD DATA
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
                    data.message || "Failed to fetch dashboard data"
                );
            }

            setDashboardData({
                totalPatients: data.totalPatients || 0,
                totalDoctors: data.totalDoctors || 0,
                totalDepartments: data.totalDepartments || 0,
                totalServices: data.totalServices || 0,
                totalAppointments: data.totalAppointments || 0,
                pendingAppointments: data.pendingAppointments || 0,
                confirmedAppointments: data.confirmedAppointments || 0,
                completedAppointments: data.completedAppointments || 0,
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
    // LOAD DATA
    // =====================================================

    useEffect(() => {

        fetchDashboardData();

    }, []);

    // =====================================================
    // STATISTICS
    // =====================================================

    const stats = [
        {
            title: "Total Patients",
            value: dashboardData.totalPatients,
            change: "+12%",
            icon: Users,
            iconBg: "bg-blue-50",
            iconColor: "text-[#1976c8]",
        },
        {
            title: "Total Doctors",
            value: dashboardData.totalDoctors,
            change: "+4%",
            icon: UserRound,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
        },
        {
            title: "Departments",
            value: dashboardData.totalDepartments,
            change: "+2%",
            icon: Building2,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            title: "Appointments",
            value: dashboardData.totalAppointments,
            change: "+18%",
            icon: CalendarCheck,
            iconBg: "bg-cyan-50",
            iconColor: "text-cyan-600",
        },
    ];

    // =====================================================
    // APPOINTMENT OVERVIEW
    // =====================================================

    const appointmentOverview = [
        {
            title: "Pending",
            value: dashboardData.pendingAppointments,
            description: "Need attention",
            icon: CircleAlert,
            iconBg: "bg-yellow-50",
            iconColor: "text-yellow-600",
        },
        {
            title: "Confirmed",
            value: dashboardData.confirmedAppointments,
            description: "Scheduled appointments",
            icon: CheckCircle2,
            iconBg: "bg-blue-50",
            iconColor: "text-[#1976c8]",
        },
        {
            title: "Completed",
            value: dashboardData.completedAppointments,
            description: "Successfully completed",
            icon: CheckCircle2,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },
    ];

    return (
        <div className="space-y-6">

            {/* =====================================================
                WELCOME SECTION
                ===================================================== */}

            <div className="relative overflow-hidden rounded-2xl bg-[#1976c8] p-6 text-white shadow-sm sm:p-8">

                <div className="relative z-10 max-w-2xl">

                    <p className="!mb-0 text-sm font-medium text-blue-100">
                        Welcome back
                    </p>

                    <h1 className="!mb-0 mt-1 !text-2xl !font-bold text-white sm:!text-3xl">
                        Hospital Admin
                    </h1>

                    <p className="!mb-0 mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                        Monitor hospital activities, manage doctors and departments,
                        and keep track of patient appointments from one place.
                    </p>

                </div>

                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

                <div className="absolute -bottom-20 right-20 h-48 w-48 rounded-full bg-white/5" />

            </div>


            {/* =====================================================
                ERROR MESSAGE
                ===================================================== */}

            {error && (

                <div className="flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">

                    <p className="!mb-0 text-sm font-medium text-red-600">
                        {error}
                    </p>

                    <button
                        onClick={fetchDashboardData}
                        className="w-fit rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        Retry
                    </button>

                </div>

            )}


            {/* =====================================================
                STATISTICS
                ===================================================== */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {stats.map((stat) => {

                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="group relative overflow-hidden rounded-2xl border border-[#dcebf5] bg-white p-5 shadow-[0_4px_20px_rgba(41,75,104,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c9e1f0] hover:shadow-[0_14px_35px_rgba(41,75,104,0.10)]"
                        >

                            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#eaf5fb] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative flex items-start justify-between">

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} shadow-sm transition-all duration-300 group-hover:scale-105`}
                                >
                                    <Icon size={22} strokeWidth={2} />
                                </div>

                                <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
                                    <ArrowUpRight size={13} strokeWidth={2.5} />
                                    <span>{stat.change}</span>
                                </div>

                            </div>

                            <div className="relative mt-6">

                                <p className="!mb-1 text-sm font-medium text-gray-400">
                                    {stat.title}
                                </p>

                                <div className="flex items-end justify-between">

                                    <h2 className="!m-0 !text-3xl !font-extrabold !tracking-tight text-[#294b68]">
                                        {loading ? "..." : stat.value}
                                    </h2>

                                    <div className="mb-1 hidden h-1 w-12 overflow-hidden rounded-full bg-[#eaf5fb] sm:block">
                                        <div className="h-full w-2/3 rounded-full bg-[#1976c8] transition-all duration-500 group-hover:w-full" />
                                    </div>

                                </div>

                            </div>

                        </div>
                    );

                })}

            </div>


            {/* =====================================================
                APPOINTMENT OVERVIEW
                ===================================================== */}

            <div>

                <div className="mb-4">

                    <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                        Appointment Overview
                    </h2>

                    <p className="!mb-0 mt-1 text-xs text-gray-400">
                        Current appointment status summary
                    </p>

                </div>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {appointmentOverview.map((item) => {

                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="group rounded-2xl border border-[#dcebf5] bg-white p-5 shadow-[0_4px_20px_rgba(41,75,104,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9e1f0] hover:shadow-[0_12px_30px_rgba(41,75,104,0.08)]"
                            >

                                <div className="flex items-center justify-between">

                                    <div
                                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor} transition-all duration-300 group-hover:scale-105`}
                                    >
                                        <Icon size={21} />
                                    </div>

                                    <span className="text-2xl font-extrabold text-[#294b68]">
                                        {loading ? "..." : item.value}
                                    </span>

                                </div>

                                <div className="mt-4">

                                    <p className="!mb-0 text-sm font-bold text-[#294b68]">
                                        {item.title}
                                    </p>

                                    <p className="!mb-0 mt-1 text-xs text-gray-400">
                                        {item.description}
                                    </p>

                                </div>

                            </div>
                        );

                    })}

                </div>

            </div>


            {/* =====================================================
                RECENT APPOINTMENTS
                ===================================================== */}

            <div className="overflow-hidden rounded-2xl border border-[#dcebf5] bg-white shadow-[0_4px_20px_rgba(41,75,104,0.04)]">

                <div className="flex flex-col gap-3 border-b border-[#edf3f7] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                            Recent Appointments
                        </h2>

                        <p className="!mb-0 mt-1 text-xs text-gray-400">
                            Latest patient appointments
                        </p>

                    </div>

                    <Link
                        to="/dashboard/appointments"
                        className="!no-underline text-sm font-semibold text-[#1976c8] transition hover:text-[#145ea8]"
                    >
                        View All
                    </Link>

                </div>


                {/* =================================================
                    DESKTOP
                    ================================================= */}

                <div className="hidden overflow-x-auto md:block">

                    <table className="w-full">

                        <thead>

                            <tr className="bg-[#f8fbfd]">

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#294b68]">
                                    Patient
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#294b68]">
                                    Doctor
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#294b68]">
                                    Department
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#294b68]">
                                    Date
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#294b68]">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-5 py-10 text-center text-sm text-gray-400"
                                    >
                                        Loading appointments...
                                    </td>

                                </tr>

                            ) : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="px-5 py-10 text-center"
                                        >

                                            <div className="flex flex-col items-center justify-center">

                                                <CalendarCheck
                                                    size={30}
                                                    className="text-[#1976c8]"
                                                />

                                                <p className="!mb-0 mt-3 text-sm font-semibold text-[#294b68]">
                                                    Appointment statistics loaded
                                                </p>

                                                <p className="!mb-0 mt-1 text-xs text-gray-400">
                                                    View all appointments for complete patient details.
                                                </p>

                                                <Link
                                                    to="/dashboard/appointments"
                                                    className="!no-underline mt-3 rounded-lg bg-[#1976c8] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#145ea8]"
                                                >
                                                    View Appointments
                                                </Link>

                                            </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* =================================================
                    MOBILE
                    ================================================= */}

                <div className="p-5 md:hidden">

                    {loading ? (

                        <div className="py-6 text-center text-sm text-gray-400">
                            Loading appointments...
                        </div>

                    ) : (

                            <div className="rounded-xl bg-[#f8fbfd] p-5 text-center">

                                <CalendarCheck
                                    size={30}
                                    className="mx-auto text-[#1976c8]"
                                />

                                <p className="!mb-0 mt-3 text-sm font-semibold text-[#294b68]">
                                    Appointment statistics loaded
                                </p>

                                <p className="!mb-0 mt-1 text-xs text-gray-400">
                                    View all appointments for complete details.
                                </p>

                                <Link
                                    to="/dashboard/appointments"
                                    className="!no-underline mt-3 inline-block rounded-lg bg-[#1976c8] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#145ea8]"
                                >
                                    View Appointments
                                </Link>

                            </div>

                    )}

                </div>

            </div>


            {/* =====================================================
                UPCOMING APPOINTMENTS
                ===================================================== */}

            <div>

                <div className="mb-4 flex items-center justify-between">

                    <div>

                        <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                            Upcoming Appointments
                        </h2>

                        <p className="!mb-0 mt-1 text-xs text-gray-400">
                            Patients scheduled for upcoming visits
                        </p>

                    </div>

                    <CalendarDays
                        size={21}
                        className="text-[#1976c8]"
                    />

                </div>


                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                    <div className="rounded-2xl border border-[#dcebf5] bg-white p-6 text-center shadow-[0_4px_20px_rgba(41,75,104,0.04)]">

                        <CalendarDays
                            size={32}
                            className="mx-auto text-[#1976c8]"
                        />

                        <p className="!mb-0 mt-3 text-sm font-semibold text-[#294b68]">
                            Upcoming appointments
                        </p>

                        <p className="!mb-0 mt-1 text-xs text-gray-400">
                            Open the appointments section to view upcoming patient visits.
                        </p>

                        <Link
                            to="/dashboard/appointments"
                            className="!no-underline mt-4 inline-flex rounded-lg bg-[#1976c8] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#145ea8]"
                        >
                            View Appointments
                        </Link>

                    </div>

                </div>

            </div>


            {/* =====================================================
                QUICK ACTIONS
                ===================================================== */}

            <div>

                <div className="mb-4">

                    <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                        Quick Actions
                    </h2>

                    <p className="!mb-0 mt-1 text-xs text-gray-400">
                        Quickly access important management sections
                    </p>

                </div>


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Manage Doctors */}

                    <Link
                        to="/dashboard/doctors"
                        className="group !no-underline flex items-center gap-4 rounded-2xl border border-[#dcebf5] bg-white p-5 shadow-[0_4px_20px_rgba(41,75,104,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9e1f0] hover:shadow-[0_12px_30px_rgba(41,75,104,0.08)]"
                    >

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1976c8] transition-all duration-300 group-hover:bg-[#1976c8] group-hover:text-white">
                            <Stethoscope size={21} />
                        </div>

                        <div>

                            <p className="!mb-0 font-semibold text-[#294b68]">
                                Manage Doctors
                            </p>

                            <p className="!mb-0 mt-1 text-xs text-gray-500">
                                View doctors
                            </p>

                        </div>

                    </Link>


                    {/* Departments */}

                    <Link
                        to="/dashboard/departments"
                        className="group !no-underline flex items-center gap-4 rounded-2xl border border-[#dcebf5] bg-white p-5 shadow-[0_4px_20px_rgba(41,75,104,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9e1f0] hover:shadow-[0_12px_30px_rgba(41,75,104,0.08)]"
                    >

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                            <Building2 size={21} />
                        </div>

                        <div>

                            <p className="!mb-0 font-semibold text-[#294b68]">
                                Departments
                            </p>

                            <p className="!mb-0 mt-1 text-xs text-gray-500">
                                Manage departments
                            </p>

                        </div>

                    </Link>


                    {/* Appointments */}

                    <Link
                        to="/dashboard/appointments"
                        className="group !no-underline flex items-center gap-4 rounded-2xl border border-[#dcebf5] bg-white p-5 shadow-[0_4px_20px_rgba(41,75,104,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9e1f0] hover:shadow-[0_12px_30px_rgba(41,75,104,0.08)]"
                    >

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white">
                            <CalendarCheck size={21} />
                        </div>

                        <div>

                            <p className="!mb-0 font-semibold text-[#294b68]">
                                Appointments
                            </p>

                            <p className="!mb-0 mt-1 text-xs text-gray-500">
                                Manage appointments
                            </p>

                        </div>

                    </Link>


                    {/* Users */}

                    <Link
                        to="/dashboard/users"
                        className="group !no-underline flex items-center gap-4 rounded-2xl border border-[#dcebf5] bg-white p-5 shadow-[0_4px_20px_rgba(41,75,104,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9e1f0] hover:shadow-[0_12px_30px_rgba(41,75,104,0.08)]"
                    >

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 transition-all duration-300 group-hover:bg-cyan-600 group-hover:text-white">
                            <Users size={21} />
                        </div>

                        <div>

                            <p className="!mb-0 font-semibold text-[#294b68]">
                                Users
                            </p>

                            <p className="!mb-0 mt-1 text-xs text-gray-500">
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