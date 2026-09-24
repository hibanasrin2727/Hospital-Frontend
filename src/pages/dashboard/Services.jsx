import {
    Search,
    Plus,
    MoreVertical,
    HeartPulse,
    Clock,
    CheckCircle2,
} from "lucide-react";

const Services = () => {
    const services = [
        {
            id: 1,
            name: "Cardiology",
            description: "Complete heart and cardiovascular services.",
            department: "Cardiology & Heart Care",
            availability: "24/7",
            status: "Active",
        },
        {
            id: 2,
            name: "Orthopedic Care",
            description: "Diagnosis and treatment of bone and joint conditions.",
            department: "Orthopedics",
            availability: "08:00 AM - 08:00 PM",
            status: "Active",
        },
        {
            id: 3,
            name: "Dermatology",
            description: "Medical care for skin, hair and nail conditions.",
            department: "Dermatology",
            availability: "09:00 AM - 06:00 PM",
            status: "Active",
        },
        {
            id: 4,
            name: "General Consultation",
            description: "General medical consultation and health checkups.",
            department: "General Medicine",
            availability: "08:00 AM - 06:00 PM",
            status: "Active",
        },
        {
            id: 5,
            name: "Emergency Care",
            description: "Immediate medical attention for emergency cases.",
            department: "Emergency",
            availability: "24/7",
            status: "Active",
        },
        {
            id: 6,
            name: "Health Checkup",
            description: "Routine health screening and preventive care.",
            department: "General Medicine",
            availability: "09:00 AM - 05:00 PM",
            status: "Active",
        },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#294b68]">
                        Services
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage hospital services and their availability.
                    </p>
                </div>

                <button className="flex items-center justify-center gap-2 !rounded-lg bg-[#1976c8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]">
                    <Plus size={18} />
                    Add Service
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
                            placeholder="Search services..."
                            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#1976c8]"
                        />
                    </div>

                    <select className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#1976c8]">
                        <option>All Departments</option>
                        <option>Cardiology & Heart Care</option>
                        <option>Orthopedics</option>
                        <option>Dermatology</option>
                        <option>General Medicine</option>
                        <option>Emergency</option>
                    </select>

                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                {services.map((service) => (
                    <div
                        key={service.id}
                        className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                        {/* Top */}
                        <div className="flex items-start justify-between">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">
                                <HeartPulse size={23} />
                            </div>

                            <button className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#1976c8]">
                                <MoreVertical size={19} />
                            </button>

                        </div>

                        {/* Service Information */}
                        <div className="mt-5">

                            <div className="flex items-center justify-between gap-2">
                                <h2 className="text-lg font-bold text-[#294b68]">
                                    {service.name}
                                </h2>

                                <CheckCircle2
                                    size={18}
                                    className="shrink-0 text-green-500"
                                />
                            </div>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                {service.description}
                            </p>

                        </div>

                        {/* Department */}
                        <div className="mt-4">
                            <span className="rounded-full bg-[#eaf5fb] px-3 py-1 text-xs font-medium text-[#1976c8]">
                                {service.department}
                            </span>
                        </div>

                        {/* Bottom */}
                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock size={16} />
                                <span>{service.availability}</span>
                            </div>

                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                                {service.status}
                            </span>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Services;