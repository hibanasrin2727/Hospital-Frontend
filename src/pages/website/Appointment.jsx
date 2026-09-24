import { useEffect, useState } from "react";
import api from "../../services/api";
import { getUser } from "../../utils/auth";

const Appointment = () => {
  const user = getUser();

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientName: user?.name || user?.username || "",
    email: user?.email || "",
    phone: user?.phone || user?.phoneNumber || "",
    doctorId: "",
    departmentId: "",
    date: "",
    time: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= GET DEPARTMENTS =================
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/website/departments");

        const departmentData =
          response.data?.data ||
          response.data?.departments ||
          response.data;

        setDepartments(
          Array.isArray(departmentData) ? departmentData : []
        );
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      }
    };

    fetchDepartments();
  }, []);

  // ================= GET DOCTORS =================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/website/doctors");

        const doctorData =
          response.data?.data ||
          response.data?.doctors ||
          response.data;

        setDoctors(
          Array.isArray(doctorData) ? doctorData : []
        );
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, []);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // When department changes, clear selected doctor
    if (name === "departmentId") {
      setFormData((previousData) => ({
        ...previousData,
        departmentId: value,
        doctorId: "",
      }));
    }
  };

  // ================= FILTER DOCTORS =================
  const filteredDoctors = doctors.filter((doctor) => {
    if (!formData.departmentId) return false;

    const doctorDepartmentId =
      doctor.departmentId?._id || doctor.departmentId;

    return doctorDepartmentId === formData.departmentId;
  });

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        "/website/appointments",
        formData
      );

      setMessage(
        response.data.message ||
          "Your appointment request has been sent successfully."
      );

      setFormData({
        patientName: user?.name || user?.username || "",
        email: user?.email || "",
        phone: user?.phone || user?.phoneNumber || "",
        doctorId: "",
        departmentId: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (error) {
      console.error("Appointment error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to book the appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full">

      {/* ================= APPOINTMENT SECTION ================= */}
      <section
        id="appointment"
        className="scroll-mt-[107px] bg-white py-[65px] md:py-[75px] lg:py-[80px]"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">

          {/* ================= SECTION TITLE ================= */}
          <div className="mx-auto max-w-[850px] text-center">

            <h2 className="text-[30px] font-semibold leading-[1.2] text-[#294b68] md:text-[32px]">
              Appointment
            </h2>

            <div className="mx-auto mt-[15px] flex w-[120px] items-center justify-center">
              <span className="h-[1px] w-[30px] bg-[#c9c9c9]"></span>

              <span className="h-[3px] w-[52px] bg-[#1976c8]"></span>

              <span className="h-[1px] w-[30px] bg-[#c9c9c9]"></span>
            </div>

            <p className="mt-[18px] text-[14px] leading-[1.7] text-[#444] md:text-[15px]">
              Book an appointment with our doctors and get the
              healthcare you need at a convenient time.
            </p>

          </div>

          {/* ================= FORM ================= */}
          <div className="mx-auto mt-[45px] max-w-[1050px]">

            <form onSubmit={handleSubmit}>

              {/* ================= PATIENT INFORMATION ================= */}
              <div className="grid grid-cols-1 gap-x-[24px] gap-y-[22px] md:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="patientName"
                    className="mb-[8px] block text-[14px] font-semibold text-[#294b68]"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="h-[48px] w-full rounded-[4px] border border-[#d9e0e6] bg-white px-[15px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#a7afb7] focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-[8px] block text-[14px] font-semibold text-[#294b68]"
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="h-[48px] w-full rounded-[4px] border border-[#d9e0e6] bg-white px-[15px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#a7afb7] focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-[8px] block text-[14px] font-semibold text-[#294b68]"
                  >
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="h-[48px] w-full rounded-[4px] border border-[#d9e0e6] bg-white px-[15px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#a7afb7] focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />
                </div>

                {/* Appointment Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="mb-[8px] block text-[14px] font-semibold text-[#294b68]"
                  >
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="h-[48px] w-full rounded-[4px] border border-[#d9e0e6] bg-white px-[15px] text-[14px] text-[#333] outline-none transition-all duration-200 focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />
                </div>

                {/* Preferred Time */}
                <div>
                  <label
                    htmlFor="time"
                    className="mb-[8px] block text-[14px] font-semibold text-[#294b68]"
                  >
                    Preferred Time
                  </label>

                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="h-[48px] w-full rounded-[4px] border border-[#d9e0e6] bg-white px-[15px] text-[14px] text-[#333] outline-none transition-all duration-200 focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  />
                </div>

                {/* Department */}
                <div>
                  <label
                    htmlFor="departmentId"
                    className="mb-[8px] block text-[14px] font-semibold text-[#294b68]"
                  >
                    Department
                  </label>

                  <select
                    id="departmentId"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    required
                    className="h-[48px] w-full rounded-[4px] border border-[#d9e0e6] bg-white px-[15px] text-[14px] text-[#333] outline-none transition-all duration-200 focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                  >
                    <option value="">
                      Select Department
                    </option>

                    {departments.map((department) => (
                      <option
                        key={department._id}
                        value={department._id}
                      >
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor */}
                <div>
                  <label
                    htmlFor="doctorId"
                    className="mb-[8px] block text-[14px] font-semibold text-[#294b68]"
                  >
                    Doctor
                  </label>

                  <select
                    id="doctorId"
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    required
                    disabled={!formData.departmentId}
                    className={`h-[48px] w-full rounded-[4px] border px-[15px] text-[14px] outline-none transition-all duration-200 focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10 ${!formData.departmentId
                      ? "cursor-not-allowed border-[#e2e6ea] bg-[#f7f9fb] text-[#a7afb7]"
                      : "border-[#d9e0e6] bg-white text-[#333]"
                    }`}
                  >
                    <option value="">
                      {formData.departmentId
                        ? "Select Doctor"
                        : "Select Department First"}
                    </option>

                    {filteredDoctors.map((doctor) => (
                      <option
                        key={doctor._id}
                        value={doctor._id}
                      >
                        {doctor.name}
                      </option>
                    ))}
                  </select>

                  {/* No doctors message */}
                  {formData.departmentId &&
                    filteredDoctors.length === 0 && (
                      <p className="mt-[6px] text-[12px] text-[#888]">
                        No doctors available in this department.
                      </p>
                    )}
                </div>

              </div>

              {/* ================= REASON ================= */}
              <div className="mt-[22px]">

                <label
                  htmlFor="reason"
                  className="mb-[8px] block text-[14px] font-semibold text-[#294b68]"
                >
                  Reason for Appointment
                  <span className="ml-[4px] font-normal text-[#999]">
                    (Optional)
                  </span>
                </label>

                <textarea
                  id="reason"
                  name="reason"
                  rows="5"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Enter the reason for your appointment"
                  className="w-full resize-none rounded-[4px] border border-[#d9e0e6] bg-white px-[15px] py-[13px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#a7afb7] focus:border-[#1976c8] focus:ring-2 focus:ring-[#1976c8]/10"
                ></textarea>

              </div>

              {/* ================= STATUS ================= */}
              <div className="mt-[25px] text-center">

                {loading && (
                  <p className="mb-[15px] text-[14px] font-medium text-[#1976c8]">
                    Booking your appointment...
                  </p>
                )}

                {error && (
                  <div className="mb-[15px] rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-600">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="mb-[15px] rounded-[4px] border border-green-200 bg-green-50 px-4 py-3 text-[14px] text-green-600">
                    {message}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-[46px] min-w-[190px] items-center justify-center !rounded-full border-0 bg-[#1976c8] px-[28px] text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#105592] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Booking..."
                    : "Make an Appointment"}
                </button>

              </div>

            </form>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Appointment;