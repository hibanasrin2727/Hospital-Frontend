import {
    Users,
    UserRound,
    Building2,
    CalendarCheck,
    ArrowUpRight,
    Clock3,
    CheckCircle2,
    XCircle,
    Plus,
    Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const stats = [
        {
            title: "Total Patients",
            value: "120",
            change: "+12%",
            icon: Users,
            iconBg: "bg-blue-50",
            iconColor: "text-[#1976c8]",
        },
        {
            title: "Total Doctors",
            value: "25",
            change: "+4%",
            icon: UserRound,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
        },
        {
            title: "Departments",
            value: "8",
            change: "+2%",
            icon: Building2,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            title: "Appointments",
            value: "45",
            change: "+18%",
            icon: CalendarCheck,
            iconBg: "bg-cyan-50",
            iconColor: "text-cyan-600",
        },
    ];

    const appointments = [
        {
            id: 1,
            patient: "Arjun Kumar",
            doctor: "Dr. Meera",
            department: "Cardiology",
            date: "24 Sep 2026",
            time: "10:00 AM",
            status: "Pending",
        },
        {
            id: 2,
            patient: "Anjali Nair",
            doctor: "Dr. Rahul",
            department: "Orthopedics",
            date: "24 Sep 2026",
            time: "11:30 AM",
            status: "Confirmed",
        },
        {
            id: 3,
            patient: "Muhammed Shamil",
            doctor: "Dr. Anjali",
            department: "Dermatology",
            date: "24 Sep 2026",
            time: "01:00 PM",
            status: "Completed",
        },
        {
            id: 4,
            patient: "Sneha Thomas",
            doctor: "Dr. Meera",
            department: "Cardiology",
            date: "25 Sep 2026",
            time: "09:30 AM",
            status: "Pending",
        },
    ];

    const statusStyle = {
        Pending: "bg-yellow-50 text-yellow-600",
        Confirmed: "bg-blue-50 text-blue-600",
        Completed: "bg-green-50 text-green-600",
    };

    return (
        <div className="space-y-6">

            {/* =====================================================
          WELCOME SECTION
          ===================================================== */}
            <div className="relative overflow-hidden rounded-2xl bg-[#1976c8] p-6 text-white shadow-sm sm:p-8">

                <div className="relative z-10 max-w-2xl">

                    <p className="text-sm font-medium text-blue-100">
                        Welcome back
                    </p>

                    <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                        Hospital Admin
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                        Monitor hospital activities, manage doctors and departments,
                        and keep track of patient appointments from one place.
                    </p>

                </div>

                {/* Decorative circles */}
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
                <div className="absolute -bottom-20 right-20 h-48 w-48 rounded-full bg-white/5" />

            </div>

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

                            {/* Decorative Background */}
                            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#eaf5fb] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"></div>

                            {/* Top Row */}
                            <div className="relative flex items-start justify-between">

                                {/* Icon */}
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor} shadow-sm transition-all duration-300 group-hover:scale-105`}
                                >
                                    <Icon size={22} strokeWidth={2} />
                                </div>

                                {/* Percentage */}
                                <div className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
                                    <ArrowUpRight size={13} strokeWidth={2.5} />
                                    <span>{stat.change}</span>
                                </div>

                            </div>

                            {/* Content */}
                            <div className="relative mt-6">

                                <p className="!mb-1 text-sm font-medium text-gray-400">
                                    {stat.title}
                                </p>

                                <div className="flex items-end justify-between">

                                    <h2 className="!m-0 !text-3xl !font-extrabold !tracking-tight text-[#294b68]">
                                        {stat.value}
                                    </h2>

                                    {/* Small decorative line */}
                                    <div className="mb-1 hidden h-1 w-12 overflow-hidden rounded-full bg-[#eaf5fb] sm:block">
                                        <div className="h-full w-2/3 rounded-full bg-[#1976c8] transition-all duration-500 group-hover:w-full"></div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* =====================================================
          MAIN CONTENT
          ===================================================== */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* ===================================================
            RECENT APPOINTMENTS
            =================================================== */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm xl:col-span-2">

                    <div className="flex items-center justify-between border-b border-gray-100 p-5">

                        <div>
                            <h2 className="font-bold text-[#294b68]">
                                Recent Appointments
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Latest patient appointments
                            </p>
                        </div>

                        <Link
                            to="/dashboard/appointments"
                            className="text-sm font-semibold text-[#1976c8] !no-underline hover:underline"
                        >
                            View All
                        </Link>

                    </div>

                    {/* Desktop table */}
                    <div className="hidden overflow-x-auto md:block">

                        <table className="w-full text-left">

                            <thead className="bg-gray-50">

                                <tr>
                                    <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                        Patient
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                        Doctor
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                        Date
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase text-gray-500">
                                        Status
                                    </th>
                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {appointments.map((appointment) => (
                                    <tr
                                        key={appointment.id}
                                        className="transition hover:bg-gray-50"
                                    >

                                        <td className="px-5 py-4">

                                            <p className="text-sm font-semibold text-[#294b68]">
                                                {appointment.patient}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                {appointment.department}
                                            </p>

                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {appointment.doctor}
                                        </td>

                                        <td className="px-5 py-4">

                                            <p className="text-sm text-gray-600">
                                                {appointment.date}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                {appointment.time}
                                            </p>

                                        </td>

                                        <td className="px-5 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[appointment.status]
                                                    }`}
                                            >
                                                {appointment.status}
                                            </span>

                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                    {/* Mobile cards */}
                    <div className="space-y-3 p-4 md:hidden">

                        {appointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="rounded-lg border border-gray-100 p-4"
                            >

                                <div className="flex items-start justify-between">

                                    <div>
                                        <p className="font-semibold text-[#294b68]">
                                            {appointment.patient}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {appointment.doctor}
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[appointment.status]
                                            }`}
                                    >
                                        {appointment.status}
                                    </span>

                                </div>

                                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                                    <Clock3 size={14} />
                                    {appointment.date} · {appointment.time}
                                </div>

                            </div>
                        ))}

                    </div>

                </div>

                {/* ===================================================
            APPOINTMENT SUMMARY
            =================================================== */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div>
                        <h2 className="font-bold text-[#294b68]">
                            Appointment Summary
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Current appointment status
                        </p>
                    </div>

                    <div className="mt-6 space-y-5">

                        {/* Confirmed */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <CalendarCheck size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        Confirmed
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Ready for consultation
                                    </p>
                                </div>

                            </div>

                            <span className="text-lg font-bold text-[#294b68]">
                                28
                            </span>

                        </div>

                        {/* Pending */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                                    <Clock3 size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        Pending
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Waiting for confirmation
                                    </p>
                                </div>

                            </div>

                            <span className="text-lg font-bold text-[#294b68]">
                                12
                            </span>

                        </div>

                        {/* Completed */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                                    <CheckCircle2 size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        Completed
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Consultation completed
                                    </p>
                                </div>

                            </div>

                            <span className="text-lg font-bold text-[#294b68]">
                                35
                            </span>

                        </div>

                        {/* Cancelled */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                                    <XCircle size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        Cancelled
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Cancelled appointments
                                    </p>
                                </div>

                            </div>

                            <span className="text-lg font-bold text-[#294b68]">
                                5
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* =====================================================
          QUICK ACTIONS
          ===================================================== */}
            <div>

                <h2 className="mb-4  text-lg font-bold text-[#294b68]">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ">

                    <Link
                        to="/dashboard/doctors"
                        className="group !no-underline flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-[#1976c8]">
                            <Stethoscope size={21} />
                        </div>

                        <div>
                            <p className="!mb-0 font-semibold text-[#294b68]">
                                Manage Doctors
                            </p>

                            <p className="!mb-0 text-xs text-gray-500">
                                View doctors
                            </p>
                        </div>
                    </Link>
                    <Link
                        to="/dashboard/departments"
                        className="group !no-underline flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <Building2 size={21} />
                        </div>

                        <div>
                            <p className="!mb-0 font-semibold text-[#294b68]">
                                Departments
                            </p>

                            <p className="!mb-0 text-xs text-gray-500">
                                Manage departments
                            </p>
                        </div>

                    </Link>

                    <Link
                        to="/dashboard/appointments"
                        className="group !no-underline flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                            <CalendarCheck size={21} />
                        </div>

                        <div>
                            <p className="!mb-0 font-semibold text-[#294b68]">
                                Appointments
                            </p>

                            <p className="!mb-0 text-xs text-gray-500">
                                Manage appointments
                            </p>
                        </div>

                    </Link>

                    <Link
                        to="/dashboard/users"
                        className="group !no-underline flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                            <Users size={21} />
                        </div>

                        <div>
                            <p className="!mb-0 font-semibold text-[#294b68]">
                                Users
                            </p>

                            <p className="!mb-0 text-xs text-gray-500">
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