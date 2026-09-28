import {
    Users,
    UserRound,
    Building2,
    CalendarCheck,
    ArrowUpRight,
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
                            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#eaf5fb] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

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
                                        <div className="h-full w-2/3 rounded-full bg-[#1976c8] transition-all duration-500 group-hover:w-full" />
                                    </div>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>


            {/* =====================================================
                RECENT APPOINTMENTS
                ===================================================== */}
            <div className="overflow-hidden rounded-2xl border border-[#dcebf5] bg-white shadow-[0_4px_20px_rgba(41,75,104,0.04)]">

                {/* Section Header */}
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
                    DESKTOP TABLE
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

                            {appointments.map((appointment) => (

                                <tr
                                    key={appointment.id}
                                    className="border-t border-[#edf3f7] transition hover:bg-[#f8fbfd]"
                                >

                                    <td className="px-5 py-4">

                                        <p className="!mb-0 text-sm font-semibold text-[#294b68]">
                                            {appointment.patient}
                                        </p>

                                    </td>


                                    <td className="px-5 py-4 text-sm text-gray-500">
                                        {appointment.doctor}
                                    </td>


                                    <td className="px-5 py-4 text-sm text-gray-500">
                                        {appointment.department}
                                    </td>


                                    <td className="px-5 py-4">

                                        <p className="!mb-0 text-sm text-gray-500">
                                            {appointment.date}
                                        </p>

                                        <p className="!mb-0 mt-1 text-xs text-gray-400">
                                            {appointment.time}
                                        </p>

                                    </td>


                                    <td className="px-5 py-4">

                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[appointment.status]}`}
                                        >
                                            {appointment.status}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {/* =================================================
                    MOBILE CARDS
                    ================================================= */}
                <div className="divide-y divide-[#edf3f7] md:hidden">

                    {appointments.map((appointment) => (

                        <div
                            key={appointment.id}
                            className="p-5"
                        >

                            <div className="flex items-start justify-between gap-3">

                                <div>

                                    <p className="!mb-0 text-sm font-bold text-[#294b68]">
                                        {appointment.patient}
                                    </p>

                                    <p className="!mb-0 mt-1 text-xs text-gray-400">
                                        {appointment.doctor} • {appointment.department}
                                    </p>

                                    <p className="!mb-0 mt-2 text-xs text-gray-500">
                                        {appointment.date} • {appointment.time}
                                    </p>

                                </div>


                                <span
                                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[appointment.status]}`}
                                >
                                    {appointment.status}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* =====================================================
                QUICK ACTIONS
                ===================================================== */}
            <div>

                <div className="mb-4 flex items-center justify-between">

                    <div>

                        <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                            Quick Actions
                        </h2>

                        <p className="!mb-0 mt-1 text-xs text-gray-400">
                            Quickly access important management sections
                        </p>

                    </div>

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