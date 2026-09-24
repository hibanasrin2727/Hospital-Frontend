import {
    Search,
    Plus,
    MoreVertical,
    Stethoscope,
} from "lucide-react";

const Doctors = () => {
    const doctors = [
        {
            id: 1,
            name: "Dr. Meera",
            specialty: "Cardiologist",
            department: "Cardiology & Heart Care",
            status: "Active",
        },
        {
            id: 2,
            name: "Dr. Rahul",
            specialty: "Orthopedic",
            department: "Orthopedics",
            status: "Active",
        },
        {
            id: 3,
            name: "Dr. Anjali",
            specialty: "Dermatologist",
            department: "Dermatology",
            status: "Active",
        },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#294b68]">
                        Doctors
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage hospital doctors and their departments.
                    </p>
                </div>

                <button className="flex items-center justify-center gap-2 !rounded-lg bg-[#1976c8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]">
                    <Plus size={18} />
                    Add Doctor
                </button>
            </div>

            {/* Search and Filter */}
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    <div className="relative w-full md:max-w-md">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search doctors..."
                            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#1976c8]"
                        />
                    </div>

                    <select className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#1976c8]">
                        <option>All Departments</option>
                        <option>Cardiology & Heart Care</option>
                        <option>Orthopedics</option>
                        <option>Dermatology</option>
                    </select>

                </div>
            </div>

            {/* Doctors Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left">

                        <thead className="border-b border-gray-100 bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                    Doctor
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                    Specialty
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                    Department
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {doctors.map((doctor) => (
                                <tr
                                    key={doctor.id}
                                    className="transition hover:bg-gray-50"
                                >

                                    {/* Doctor */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf5fb] text-[#1976c8]">
                                                <Stethoscope size={19} />
                                            </div>

                                            <div>
                                                <p className="font-semibold text-[#294b68]">
                                                    {doctor.name}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    Doctor ID: DOC-{doctor.id.toString().padStart(3, "0")}
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    {/* Specialty */}
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {doctor.specialty}
                                    </td>

                                    {/* Department */}
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {doctor.department}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                                            {doctor.status}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-4">
                                        <button className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#1976c8]">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default Doctors;