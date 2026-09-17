import { useEffect, useState } from "react";
import api from "../../services/api";

const Appointment = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientName: "",
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

// ================= GET DEPARTMENTS =================
useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await api.get("/website/departments");

      console.log("Departments response:", response.data);

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

      console.log("Doctors response:", response.data);

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
  };

  // ================= SUBMIT APPOINTMENT =================
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

      // Clear form
      setFormData({
        patientName: "",
        phone: "",
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
    <main className="main">

      {/* ================= APPOINTMENT SECTION ================= */}
      <section id="appointment" className="appointment section">

        {/* Section Title */}
        <div
          className="container section-title"
          data-aos="fade-up"
        >
          <h2>Appointment</h2>

          <p>
            Book an appointment with our doctors and get the
            healthcare you need at a convenient time.
          </p>
        </div>

        <div
          className="container"
          data-aos="fade-up"
          data-aos-delay="100"
        >

          <form
            onSubmit={handleSubmit}
            role="form"
            className="php-email-form"
          >

            {/* ================= PATIENT DETAILS ================= */}
            <div className="row">

              {/* Patient Name */}
              <div className="col-md-4 form-group">

                <input
                  type="text"
                  name="patientName"
                  className="form-control"
                  placeholder="Your Name"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Phone */}
              <div className="col-md-4 form-group mt-3 mt-md-0">

                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Date */}
              <div className="col-md-4 form-group mt-3 mt-md-0">

                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* ================= APPOINTMENT DETAILS ================= */}
            <div className="row">

              {/* Time */}
              <div className="col-md-4 form-group mt-3">

                <input
                  type="time"
                  name="time"
                  className="form-control"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Department */}
              <div className="col-md-4 form-group mt-3">

                <select
                  name="departmentId"
                  className="form-select"
                  value={formData.departmentId}
                  onChange={handleChange}
                  required
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
              <div className="col-md-4 form-group mt-3">

                <select
                  name="doctorId"
                  className="form-select"
                  value={formData.doctorId}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Doctor
                  </option>

                  {doctors.map((doctor) => (
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

            {/* ================= REASON ================= */}
            <div className="form-group mt-3">

              <textarea
                className="form-control"
                name="reason"
                rows="5"
                placeholder="Reason for Appointment"
                value={formData.reason}
                onChange={handleChange}
              ></textarea>

            </div>

            {/* ================= STATUS ================= */}
            <div className="mt-3">

              {loading && (
                <div className="loading">
                  Booking your appointment...
                </div>
              )}

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              {message && (
                <div className="sent-message">
                  {message}
                </div>
              )}

              {/* Submit */}
              <div className="text-center">

                <button
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Booking..."
                    : "Make an Appointment"}
                </button>

              </div>

            </div>

          </form>

        </div>

      </section>

    </main>
  );
};

export default Appointment;