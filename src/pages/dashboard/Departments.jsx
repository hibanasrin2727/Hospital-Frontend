import {
    Search,
    Plus,
    MoreVertical,
    Building2,
    Users,
} from "lucide-react";

const Departments = () => {
    const departments = [
        {
            id: 1,
            name: "Cardiology & Heart Care",
            description: "Heart and cardiovascular care",
            doctors: 6,
            status: "Active",
        },
        {
            id: 2,
            name: "Orthopedics",
            description: "Bone, joint and muscle care",
            doctors: 5,
            status: "Active",
        },
        {
            id: 3,
            name: "Dermatology",
            description: "Skin, hair and nail care",
            doctors: 4,
            status: "Active",
        },
        {
            id: 4,
            name: "Neurology",
            description: "Brain and nervous system care",
            doctors: 3,
            status: "Active",
        },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#294b68]">
                        Departments
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage hospital departments and their doctors.
                    </p>
                </div>

                <button className="flex items-center justify-center gap-2 !rounded-lg bg-[#1976c8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]">
                    <Plus size={18} />
                    Add Department
                </button>
            </div>

            {/* Search */}
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="relative w-full md:max-w-md">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search departments..."
                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#1976c8]"
                    />
                </div>
            </div>

            {/* Department Cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                {departments.map((department) => (
                    <div
                        key={department.id}
                        className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                        {/* Top */}
                        <div className="flex items-start justify-between">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">
                                <Building2 size={23} />
                            </div>

                            <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#1976c8]">
                                <MoreVertical size={19} />
                            </button>

                        </div>

                        {/* Department Name */}
                        <div className="mt-5">
                            <h2 className="text-lg font-bold text-[#294b68]">
                                {department.name}
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {department.description}
                            </p>
                        </div>

                        {/* Details */}
                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Users size={17} />
                                <span>
                                    {department.doctors} Doctors
                                </span>
                            </div>

                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                                {department.status}
                            </span>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Departments;