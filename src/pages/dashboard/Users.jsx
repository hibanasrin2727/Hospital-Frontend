import {
    Search,
    MoreVertical,
    UserRound,
    Mail,
    Phone,
} from "lucide-react";

const Users = () => {
    const users = [
        {
            id: 1,
            name: "Arjun Kumar",
            email: "arjun@example.com",
            phone: "+91 98765 43210",
            role: "Patient",
            status: "Active",
        },
        {
            id: 2,
            name: "Anjali Nair",
            email: "anjali@example.com",
            phone: "+91 98765 12345",
            role: "Patient",
            status: "Active",
        },
        {
            id: 3,
            name: "Muhammed Shamil",
            email: "shamil@example.com",
            phone: "+91 98765 67890",
            role: "Patient",
            status: "Active",
        },
        {
            id: 4,
            name: "Sneha Thomas",
            email: "sneha@example.com",
            phone: "+91 98765 24680",
            role: "Patient",
            status: "Inactive",
        },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#294b68]">
                    Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage registered patients and user accounts.
                </p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total Users
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#294b68]">
                        120
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Active Users
                    </p>

                    <p className="mt-2 text-2xl font-bold text-green-600">
                        112
                    </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Inactive Users
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-500">
                        8
                    </p>
                </div>

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
                            placeholder="Search users..."
                            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#1976c8]"
                        />

                    </div>

                    <select className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#1976c8]">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>

                </div>

            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[800px] text-left">

                        <thead className="border-b border-gray-100 bg-gray-50">

                            <tr>

                                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                    User
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                    Contact
                                </th>

                                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                                    Role
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

                            {users.map((user) => (

                                <tr
                                    key={user.id}
                                    className="transition hover:bg-gray-50"
                                >

                                    {/* User */}
                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf5fb] text-[#1976c8]">
                                                <UserRound size={18} />
                                            </div>

                                            <div>

                                                <p className="font-semibold text-[#294b68]">
                                                    {user.name}
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    User ID: USR-{user.id.toString().padStart(3, "0")}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* Contact */}
                                    <td className="px-6 py-4">

                                        <div className="space-y-1">

                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail size={14} />
                                                {user.email}
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Phone size={14} />
                                                {user.phone}
                                            </div>

                                        </div>

                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-4">

                                        <span className="rounded-full bg-[#eaf5fb] px-3 py-1 text-xs font-semibold text-[#1976c8]">
                                            {user.role}
                                        </span>

                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${user.status === "Active"
                                                ? "bg-green-50 text-green-600"
                                                : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            {user.status}
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

export default Users;