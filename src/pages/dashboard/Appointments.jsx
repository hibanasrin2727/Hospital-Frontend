import {
  Search,
  CalendarDays,
  MoreVertical,
  Clock3,
  UserRound,
  Stethoscope,
} from "lucide-react";

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      patient: "Arjun Kumar",
      doctor: "Dr. Meera",
      department: "Cardiology & Heart Care",
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
      department: "Cardiology & Heart Care",
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

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#294b68]">
          Appointments
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage and track patient appointments.
        </p>
      </div>

      {/* Appointment Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Appointments
          </p>

          <p className="mt-2 text-2xl font-bold text-[#294b68]">
            45
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            12
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Confirmed
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            28
          </p>
        </div>

      </div>

      {/* Search and Filter */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search patient or doctor..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#1976c8]"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <select className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#1976c8]">
              <option>All Status</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
            </select>

            <select className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#1976c8]">
              <option>All Departments</option>
              <option>Cardiology & Heart Care</option>
              <option>Orthopedics</option>
              <option>Dermatology</option>
            </select>

          </div>

        </div>

      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm lg:block">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">

            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Patient
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Doctor
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Department
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase text-gray-500">
                  Date & Time
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

              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="transition hover:bg-gray-50"
                >

                  {/* Patient */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf5fb] text-[#1976c8]">
                        <UserRound size={18} />
                      </div>

                      <div>
                        <p className="font-semibold text-[#294b68]">
                          {appointment.patient}
                        </p>

                        <p className="text-xs text-gray-500">
                          Appointment #{appointment.id}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Doctor */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Stethoscope size={16} className="text-[#1976c8]" />
                      {appointment.doctor}
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {appointment.department}
                  </td>

                  {/* Date & Time */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays size={16} className="text-[#1976c8]" />
                      {appointment.date}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                      <Clock3 size={14} />
                      {appointment.time}
                    </div>

                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyle[appointment.status]
                      }`}
                    >
                      {appointment.status}
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

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">

        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf5fb] text-[#1976c8]">
                  <UserRound size={18} />
                </div>

                <div>
                  <h2 className="font-semibold text-[#294b68]">
                    {appointment.patient}
                  </h2>

                  <p className="text-xs text-gray-500">
                    {appointment.doctor}
                  </p>
                </div>

              </div>

              <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
                <MoreVertical size={18} />
              </button>

            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-500">

              <p>
                <span className="font-medium text-gray-600">
                  Department:
                </span>{" "}
                {appointment.department}
              </p>

              <p>
                <span className="font-medium text-gray-600">
                  Date:
                </span>{" "}
                {appointment.date}
              </p>

              <p>
                <span className="font-medium text-gray-600">
                  Time:
                </span>{" "}
                {appointment.time}
              </p>

            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  statusStyle[appointment.status]
                }`}
              >
                {appointment.status}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Appointments;