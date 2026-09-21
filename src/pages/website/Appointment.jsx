import { useEffect, useState } from "react";
import api from "../../services/api";
import { getUser } from "../../utils/auth";

const Appointment = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    doctorId: "",
    departmentId: "",
    date: "",
    time: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // AUTOFILL LOGGED-IN USER DETAILS
  // =====================================================
  useEffect(() => {
    const user = getUser();

    if (user) {
      setFormData((previousData) => ({
        ...previousData,

        patientName:
          user.name ||
          user.username ||
          user.fullName ||
          "",

        email:
          user.email ||
          "",

        phone:
          user.phone ||
          user.phoneNumber ||
          "",
      }));
    }
  }, []);

  // =====================================================
  // GET DEPARTMENTS
  // =====================================================
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get(
          "/website/departments"
        );

        console.log(
          "Departments response:",
          response.data
        );

        const departmentData =
          response.data?.departments || [];

        setDepartments(
          Array.isArray(departmentData)
            ? departmentData
            : []
        );
      } catch (error) {
        console.error(
          "Error fetching departments:",
          error
        );

        setDepartments([]);
      }
    };

    fetchDepartments();
  }, []);

  // =====================================================
  // GET DOCTORS
  // =====================================================
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get(
          "/website/doctors"
        );

        console.log(
          "Doctors response:",
          response.data
        );

        const doctorData =
          response.data?.doctors || [];

        setDoctors(
          Array.isArray(doctorData)
            ? doctorData
            : []
        );
      } catch (error) {
        console.error(
          "Error fetching doctors:",
          error
        );

        setDoctors([]);
      }
    };

    fetchDoctors();
  }, []);

  // =====================================================
  // INPUT CHANGE
  // =====================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    // =================================================
    // DEPARTMENT CHANGE
    // =================================================
    if (name === "departmentId") {
      setFormData((previousData) => ({
        ...previousData,
        departmentId: value,

        // Clear selected doctor when department changes
        doctorId: "",
      }));

      setMessage("");
      setError("");

      return;
    }

    // =================================================
    // NORMAL INPUT CHANGE
    // =================================================
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // =====================================================
  // FILTER DOCTORS BY SELECTED DEPARTMENT
  // =====================================================
  const filteredDoctors = doctors.filter((doctor) => {
    if (!formData.departmentId) {
      return false;
    }

    // departmentId can be an object because your API
    // returns populated department information.
    const doctorDepartmentId =
      typeof doctor.departmentId === "object"
        ? doctor.departmentId?._id
        : doctor.departmentId;

    return (
      String(doctorDepartmentId) ===
      String(formData.departmentId)
    );
  });

  // =====================================================
  // SUBMIT APPOINTMENT
  // =====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Backend currently needs these fields.
      // Email is used in the frontend profile/form,
      // but is not sent because the current backend
      // appointment API does not require email.
      const appointmentData = {
        patientName: formData.patientName,
        phone: formData.phone,
        doctorId: formData.doctorId,
        departmentId: formData.departmentId,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
      };

      const response = await api.post(
        "/website/appointments",
        appointmentData
      );

      setMessage(
        response.data?.message ||
          "Your appointment request has been sent successfully."
      );

      // Clear appointment-specific fields.
      // Keep user details filled after successful booking.
      setFormData((previousData) => ({
        ...previousData,

        doctorId: "",
        departmentId: "",
        date: "",
        time: "",
        reason: "",
      }));
    } catch (error) {
      console.error(
        "Appointment error:",
        error
      );

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

      {/* =====================================================
          APPOINTMENT SECTION
      ====================================================== */}
      <section
        id="appointment"
        className="scroll-mt-[107px] bg-[#eef7fd] py-[65px] md:py-[75px] lg:py-[80px]"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-8 lg:px-10">

          {/* =================================================
              SECTION TITLE
          ================================================== */}
          <div className="mx-auto max-w-[850px] text-center">

            <h2 className="text-[30px] font-semibold leading-[1.2] text-[#294b68] md:text-[32px]">
              Appointment
            </h2>

            {/* Title Divider */}
            <div className="mx-auto mt-[16px] flex h-[3px] w-[160px] items-center justify-center">
              <span className="h-[1px] w-[50px] bg-[#bdbdbd]"></span>

              <span className="h-[3px] w-[60px] bg-[#1976c8]"></span>

              <span className="h-[1px] w-[50px] bg-[#bdbdbd]"></span>
            </div>

            <p className="mt-[20px] text-[14px] leading-[1.7] text-[#444] md:text-[15px]">
              Book an appointment with our doctors and get the
              healthcare you need at a convenient time.
            </p>

          </div>

          {/* =================================================
              APPOINTMENT FORM
          ================================================== */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-[62px] max-w-[1296px]"
          >

            {/* =================================================
                FIRST ROW
            ================================================== */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

              {/* ================= NAME ================= */}
              <div>
                <input
                  type="text"
                  name="patientName"
                  placeholder="Your Name"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  className="h-[44px] w-full rounded-none border border-[#d8d8d8] bg-white px-[10px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#b8b8b8] focus:border-[#1976c8]"
                />
              </div>

              {/* ================= EMAIL ================= */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-[44px] w-full rounded-none border border-[#d8d8d8] bg-white px-[10px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#b8b8b8] focus:border-[#1976c8]"
                />
              </div>

              {/* ================= PHONE ================= */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-[44px] w-full rounded-none border border-[#d8d8d8] bg-white px-[10px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#b8b8b8] focus:border-[#1976c8]"
                />
              </div>

            </div>

            {/* =================================================
                SECOND ROW
            ================================================== */}
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">

              {/* ================= DATE ================= */}
              <div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="h-[44px] w-full rounded-none border border-[#d8d8d8] bg-white px-[10px] text-[14px] text-[#333] outline-none transition-all duration-200 focus:border-[#1976c8]"
                />
              </div>

              {/* ================= DEPARTMENT ================= */}
              <div>
                <select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleChange}
                  required
                  className="h-[44px] w-full rounded-none border border-[#d8d8d8] bg-white px-[10px] text-[14px] text-[#333] outline-none transition-all duration-200 focus:border-[#1976c8]"
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

              {/* ================= DOCTOR ================= */}
              <div>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  required
                  disabled={!formData.departmentId}
                  className={`h-[44px] w-full rounded-none border border-[#d8d8d8] px-[10px] text-[14px] outline-none transition-all duration-200 focus:border-[#1976c8] ${formData.departmentId
                    ? "bg-white text-[#333]"
                    : "cursor-not-allowed bg-[#f5f5f5] text-[#999]"
                    }`}
                >
                  <option value="">
                    {!formData.departmentId
                      ? "Select Department First"
                      : filteredDoctors.length === 0
                        ? "No Doctors Available"
                        : "Select Doctor"}
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
              </div>

            </div>

            {/* =================================================
                TIME
            ================================================== */}
            <div className="mt-5">
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="h-[44px] w-full rounded-none border border-[#d8d8d8] bg-white px-[10px] text-[14px] text-[#333] outline-none transition-all duration-200 focus:border-[#1976c8] md:w-[32.2%]"
              />
            </div>

            {/* =================================================
                REASON
            ================================================== */}
            <div className="mt-5">
              <textarea
                name="reason"
                rows="5"
                placeholder="Message (Optional)"
                value={formData.reason}
                onChange={handleChange}
                className="min-h-[126px] w-full resize-y rounded-none border border-[#d8d8d8] bg-white px-[10px] py-[11px] text-[14px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#b8b8b8] focus:border-[#1976c8]"
              ></textarea>
            </div>

            {/* =================================================
                SUCCESS MESSAGE
            ================================================== */}
            {message && (
              <div className="mt-5 text-center text-[14px] font-medium text-green-600">
                {message}
              </div>
            )}

            {/* =================================================
                ERROR MESSAGE
            ================================================== */}
            {error && (
              <div className="mt-5 text-center text-[14px] font-medium text-red-500">
                {error}
              </div>
            )}

            {/* =================================================
                LOADING
            ================================================== */}
            {loading && (
              <div className="mt-5 flex items-center justify-center gap-2 text-[14px] text-[#666]">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#dbeaf6] border-t-[#1976c8]"></div>

                <span>
                  Booking your appointment...
                </span>
              </div>
            )}

            {/* =================================================
                SUBMIT BUTTON
            ================================================== */}
            <div className="mt-[25px] flex justify-center">

              <button
                type="submit"
                disabled={loading}
                className="min-w-[227px] !rounded-full border-0 bg-[#1976c8] px-[28px] py-[12px] text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#105592] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Booking..."
                  : "Make an Appointment"}
              </button>

            </div>

          </form>
        </div>
      </section>
    </main>
  );
};

export default Appointment;