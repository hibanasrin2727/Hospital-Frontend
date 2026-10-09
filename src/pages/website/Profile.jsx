import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  UserCheck,
  CalendarCheck2,
  HeartPulse,
  FileText,
  Pencil,
  CheckCircle2,
  CircleAlert,
  CalendarDays,
  Clock,
  Clock3,
  Building2,
  MapPin,
  X,
  XCircle,
  Save,
  LoaderCircle,
  AlertCircle,
  RefreshCw,
  Stethoscope,
  Ban,
  Eye,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";

const API_BASE = "http://localhost:5000/api";

const Profile = () => {
  const navigate = useNavigate();
  const user = getUser();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState("");

  const [profileUser, setProfileUser] = useState(user || {});

  // =====================================================
  // MODAL STATES
  // =====================================================
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewAppointment, setViewAppointment] = useState(null);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [userCancelReason, setUserCancelReason] = useState("");
  const [cancellingId, setCancellingId] = useState("");
  const [cancelError, setCancelError] = useState("");
  const [cancelSuccess, setCancelSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || user?.username || "",
    phone: user?.phone || user?.phoneNumber || "",
  });

  const userName =
    profileUser?.name || profileUser?.username || "User";

  const userEmail = profileUser?.email || "user@example.com";

  const userPhone =
    profileUser?.phone || profileUser?.phoneNumber || "Not provided";

  const firstLetter = userName.charAt(0).toUpperCase();

  // =====================================================
  // AUTHENTICATION
  // =====================================================
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // =====================================================
  // EDIT PROFILE
  // =====================================================
  const handleEdit = () => {
    setFormData({
      name: profileUser?.name || profileUser?.username || "",
      phone: profileUser?.phone || profileUser?.phoneNumber || "",
    });

    setProfileError("");
    setProfileSuccess("");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData({
      name: profileUser?.name || profileUser?.username || "",
      phone: profileUser?.phone || profileUser?.phoneNumber || "",
    });

    setProfileError("");
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // SAVE PROFILE
  // PUT /api/website/users/me
  // =====================================================
  const handleSaveProfile = async (event) => {
    event.preventDefault();

    setProfileError("");
    setProfileSuccess("");

    const name = formData.name.trim();
    const phone = formData.phone.trim();

    if (!name || name.length < 2) {
      setProfileError("Please enter a name with at least 2 characters.");
      return;
    }

    if (phone && !/^[+()\d\s-]{7,20}$/.test(phone)) {
      setProfileError("Please enter a valid phone number.");
      return;
    }

    if (!localStorage.getItem("token")) {
      setProfileError("Please log in again to update your profile.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_BASE}/website/users/me`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ name, phone }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Failed to update profile."
        );
      }

      const returnedUser =
        result.user || result.data?.user || result.data || {};

      const updatedUser = {
        ...profileUser,
        ...returnedUser,
        name: returnedUser.name || name,
        phone: returnedUser.phone ?? phone,
      };

      setProfileUser(updatedUser);

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...JSON.parse(storedUser),
              ...updatedUser,
            })
          );
        } catch {
          // Do not undo a successful server update.
        }
      }

      setFormData({
        name: updatedUser.name || name,
        phone: updatedUser.phone || "",
      });

      setIsEditing(false);
      setProfileSuccess("Profile updated successfully.");
    } catch (error) {
      setProfileError(error.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // FETCH MY APPOINTMENTS
  // GET /api/website/appointments/my
  // =====================================================
  const fetchAppointments = async () => {
    if (!localStorage.getItem("token")) {
      setAppointments([]);
      setAppointmentsError("Please log in to view your appointments.");
      return;
    }

    setAppointmentsLoading(true);
    setAppointmentsError("");

    try {
      const response = await fetch(
        `${API_BASE}/website/appointments/my`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Failed to load appointments."
        );
      }

      const list = Array.isArray(result)
        ? result
        : Array.isArray(result.appointments)
          ? result.appointments
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.data?.appointments)
              ? result.data.appointments
              : [];

      setAppointments(list);
    } catch (error) {
      setAppointmentsError(
        error.message || "Unable to load appointments."
      );
    } finally {
      setAppointmentsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "appointments") {
      fetchAppointments();
    }
  }, [activeTab]);

  // =====================================================
  // APPOINTMENT HELPERS
  // =====================================================
  const getDoctorName = (appointment) => {
    if (appointment?.doctorId?.name) return appointment.doctorId.name;
    if (appointment?.doctor?.name) return appointment.doctor.name;
    if (typeof appointment?.doctor === "string") return appointment.doctor;
    if (appointment?.doctorName) return appointment.doctorName;
    return "Doctor";
  };

  const getDepartmentName = (appointment) => {
    if (appointment?.departmentId?.name) return appointment.departmentId.name;
    if (appointment?.department?.name) return appointment.department.name;
    if (typeof appointment?.department === "string") return appointment.department;
    if (appointment?.departmentName) return appointment.departmentName;
    return "Department";
  };

  const getDoctorSpecialization = (appointment) => {
    if (appointment?.doctorId?.specialization) return appointment.doctorId.specialization;
    if (appointment?.doctor?.specialization) return appointment.doctor.specialization;
    if (appointment?.specialization) return appointment.specialization;
    return "Medical Specialist";
  };

  const getPatientPhone = (appointment) => {
    return (
      appointment?.phone ||
      appointment?.patientPhone ||
      userPhone
    );
  };

  const formatDate = (date) => {
    if (!date) return "Not available";
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  const formatDateTime = (date) => {
    if (!date) return "Not available";
    try {
      return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return date;
    }
  };

  const getStatus = (appointment) => {
    return (appointment?.status || appointment?.appointmentStatus || "pending").toLowerCase();
  };

  const getStatusClasses = (status) => {
    const normalized = String(status).toLowerCase();

    if (["confirmed", "completed"].includes(normalized)) {
      return "!border !border-[#ccebd8] !bg-[#effaf3] !text-[#21834a]";
    }

    if (["cancelled", "canceled", "rejected"].includes(normalized)) {
      return "!border !border-[#f3d1d1] !bg-[#fff1f1] !text-[#c03939]";
    }

    if (normalized === "rescheduled") {
      return "!border !border-[#f2e1b9] !bg-[#fff9e9] !text-[#9a6b10]";
    }

    return "!border !border-[#cfe4f3] !bg-[#eef6fc] !text-[#1976c8]";
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "confirmed":
        return {
          label: "Confirmed",
          icon: CheckCircle2,
          className: "!border !border-[#c9e8d4] !bg-[#effaf3] !text-[#198754]",
          dot: "!bg-[#198754]",
        };

      case "completed":
        return {
          label: "Completed",
          icon: CheckCircle2,
          className: "!border !border-[#c8def1] !bg-[#eef6fc] !text-[#1976c8]",
          dot: "!bg-[#1976c8]",
        };

      case "cancelled":
      case "canceled":
        return {
          label: "Cancelled",
          icon: XCircle,
          className: "!border !border-[#f3cccc] !bg-[#fff2f2] !text-[#dc3545]",
          dot: "!bg-[#dc3545]",
        };

      default:
        return {
          label: "Pending",
          icon: CircleAlert,
          className: "!border !border-[#f0dfb5] !bg-[#fffaf0] !text-[#b58105]",
          dot: "!bg-[#b58105]",
        };
    }
  };

  const canCancelAppointment = (appointment) => {
    const status = getStatus(appointment);
    return status === "pending" || status === "confirmed";
  };

  // =====================================================
  // MODAL ACTIONS
  // =====================================================
  const openViewModal = (appointment) => {
    setViewAppointment(appointment);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setViewAppointment(null);
  };

  const openCancelModal = (appointment) => {
    setSelectedAppointment(appointment);
    setUserCancelReason("");
    setCancelError("");
    setCancelSuccess("");
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    if (cancellingId) return;
    setCancelModalOpen(false);
    setSelectedAppointment(null);
    setUserCancelReason("");
    setCancelError("");
  };

  const handleCancelAppointment = async () => {
    const appointmentId = selectedAppointment?._id || selectedAppointment?.id;
    if (!appointmentId) return;

    const finalReason = userCancelReason.trim() || "Cancelled by patient";

    try {
      setCancellingId(appointmentId);
      setCancelError("");
      setCancelSuccess("");

      const response = await fetch(
        `${API_BASE}/website/appointments/${appointmentId}/cancel`,
        {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            cancellationReason: finalReason,
            cancelReason: finalReason,
          }),
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Unable to cancel the appointment. Please try again."
        );
      }

      const updatedAppointment = result.appointment;

      setAppointments((previousAppointments) =>
        previousAppointments.map((appointment) => {
          const id = appointment._id || appointment.id;
          if (id === appointmentId) {
            return (
              updatedAppointment || {
                ...appointment,
                status: "cancelled",
                cancellationReason: finalReason,
                cancelledAt: new Date().toISOString(),
              }
            );
          }
          return appointment;
        })
      );

      if (
        viewAppointment &&
        (viewAppointment._id === appointmentId || viewAppointment.id === appointmentId)
      ) {
        setViewAppointment(
          updatedAppointment || {
            ...viewAppointment,
            status: "cancelled",
            cancellationReason: finalReason,
            cancelledAt: new Date().toISOString(),
          }
        );
      }

      setCancelSuccess(
        result.message || "Appointment cancelled successfully."
      );

      setTimeout(() => {
        setCancelModalOpen(false);
        setSelectedAppointment(null);
        setUserCancelReason("");
        setCancelSuccess("");
      }, 1200);
    } catch (error) {
      setCancelError(
        error.message || "Unable to cancel the appointment. Please try again."
      );
    } finally {
      setCancellingId("");
    }
  };

  const inputClass =
    "!mt-[7px] !h-[45px] !w-full !rounded-xl !border !border-[#dce4eb] !bg-white !px-[13px] !text-[14px] !text-[#444] outline-none transition-all placeholder:!text-[#aaa] focus:!border-[#1976c8] focus:!ring-2 focus:!ring-[#1976c8]/10";

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <main className="!w-full !bg-white">

      {/* PAGE HEADER */}
      <section className="!relative !overflow-hidden !border-b !border-[#e8edf2] !bg-[#f7f9fb] !py-[28px] md:!py-[34px]">
        <div className="!pointer-events-none !absolute !right-[-80px] !top-[-100px] !h-[220px] !w-[220px] !rounded-full !bg-[#eaf4fb] !opacity-70" />

        <div className="!relative !mx-auto !max-w-[1400px] !px-4">
          <div className="!flex !items-center !gap-[14px]">
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Back to Home"
              className="!flex !h-[38px] !w-[38px] !shrink-0 !items-center !justify-center !rounded-full !border-0 !bg-white !text-[#294b68] !shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-200 hover:!bg-[#eef6fc] hover:!text-[#1976c8]"
            >
              <ArrowLeft size={22} strokeWidth={1.8} />
            </button>

            <div>
              <h1 className="!m-0 !text-[28px] !font-bold !leading-[1.2] !text-[#294b68] md:!text-[34px]">
                My Profile
              </h1>
              <p className="!mb-0 !mt-[6px] !text-[13px] !leading-[1.6] !text-[#777] md:!text-[14px]">
                Manage your personal information and account details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE CONTENT */}
      <section className="!bg-white lg:pt-[40px]">
        <div className="!mx-auto !max-w-[1400px] !px-4">
          <div className="!grid !grid-cols-1 !gap-[20px] lg:!grid-cols-[280px_1fr]">

            {/* LEFT PROFILE CARD */}
            <aside className="!h-fit !overflow-hidden !rounded-xl !border !border-[#e1e7ec] !bg-white !shadow-[0_3px_18px_rgba(0,0,0,0.035)] lg:!h-[620px]">
              <div className="!border-b !border-[#edf0f2] !px-[20px] !py-[24px]">
                <div className="!flex !flex-col !items-center !text-center">
                  <div className="!flex !h-[92px] !w-[92px] !items-center !justify-center !rounded-full !bg-[#1976c8] !text-[34px] !font-bold !uppercase !text-white !shadow-[0_5px_18px_rgba(25,118,200,0.18)]">
                    {firstLetter}
                  </div>

                  <h2 className="!mb-0 !mt-[15px] !max-w-full !truncate !px-[8px] !text-[20px] !font-bold !text-[#294b68]">
                    {userName}
                  </h2>

                  <p className="!mb-0 !mt-[6px] !max-w-full !break-all !px-[5px] !text-[13px] !leading-[1.5] !text-[#777]">
                    {userEmail}
                  </p>

                  <span className="!mt-[13px] !inline-flex !items-center !gap-[6px] !rounded-full !border !border-[#cfe4f3] !bg-[#eef6fc] !px-[11px] !py-[6px] !text-[11px] !font-semibold !text-[#1976c8]">
                    <UserRound size={13} strokeWidth={1.8} />
                    Patient
                  </span>
                </div>
              </div>

              {/* PROFILE NAVIGATION */}
              <div className="!p-[12px]">
                {[
                  {
                    id: "profile",
                    label: "Profile Information",
                    Icon: UserRound,
                  },
                  {
                    id: "appointments",
                    label: "My Appointments",
                    Icon: CalendarCheck2,
                  },
                  {
                    id: "health",
                    label: "Health Information",
                    Icon: HeartPulse,
                  },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`!mt-[6px] !flex !w-full !items-center !gap-[10px] !rounded-xl !border-0 !px-[13px] !py-[12px] !text-left !text-[13px] transition-all duration-200 first:!mt-0 ${activeTab === id
                        ? "!bg-[#eef6fc] !font-semibold !text-[#1976c8]"
                        : "!bg-transparent !font-medium !text-[#666] hover:!bg-[#f7f9fb] hover:!text-[#1976c8]"
                      }`}
                  >
                    <div
                      className={`!flex !h-[34px] !w-[34px] !shrink-0 !items-center !justify-center !rounded-xl ${activeTab === id
                          ? "!bg-white !text-[#1976c8]"
                          : "!bg-[#f5f7f9] !text-[#777]"
                        }`}
                    >
                      <Icon size={17} strokeWidth={1.8} />
                    </div>
                    {label}
                  </button>
                ))}
              </div>
            </aside>

            {/* RIGHT CONTENT CARD */}
            <section className="!min-h-[520px] !overflow-hidden !rounded-xl !border !border-[#e1e7ec] !bg-white !shadow-[0_3px_18px_rgba(0,0,0,0.035)] lg:!h-[620px]">

              {/* PROFILE INFORMATION */}
              {activeTab === "profile" && (
                <div className="!h-full !overflow-y-auto">
                  <div className="!border-b !border-[#edf0f2] !bg-[#fbfcfd] !px-[20px] !py-[18px] md:!px-[24px]">
                    <div className="!flex !flex-col !gap-[12px] sm:!flex-row sm:!items-center sm:!justify-between">
                      <div>
                        <h2 className="!m-0 !text-[21px] !font-bold !text-[#294b68] md:!text-[23px]">
                          Profile Information
                        </h2>
                        <p className="!mb-0 !mt-[5px] !text-[12px] !text-[#888] md:!text-[13px]">
                          Your personal account information
                        </p>
                      </div>

                      {!isEditing && (
                        <button
                          type="button"
                          onClick={handleEdit}
                          className="!inline-flex !h-[39px] !w-fit !items-center !justify-center !gap-[7px] !rounded-xl !border !border-[#cddde9] !bg-white !px-[14px] !text-[12px] !font-semibold !text-[#1976c8] transition-all hover:!border-[#1976c8] hover:!bg-[#eef6fc]"
                        >
                          <Pencil size={14} strokeWidth={1.8} />
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="!px-[20px] !py-[22px] md:!px-[24px]">
                    {profileError && (
                      <div className="!mb-[16px] !flex !items-start !gap-[9px] !rounded-xl !border !border-[#f3d1d1] !bg-[#fff5f5] !p-[13px] !text-[13px] !text-[#c03939]">
                        <AlertCircle size={17} className="!mt-[1px] !shrink-0" />
                        <span>{profileError}</span>
                      </div>
                    )}

                    {profileSuccess && (
                      <div className="!mb-[16px] !flex !items-start !gap-[9px] !rounded-xl !border !border-[#ccebd8] !bg-[#effaf3] !p-[13px] !text-[13px] !text-[#21834a]">
                        <CheckCircle2 size={17} className="!mt-[1px] !shrink-0" />
                        <span>{profileSuccess}</span>
                      </div>
                    )}

                    {isEditing ? (
                      <form onSubmit={handleSaveProfile}>
                        <div className="!grid !grid-cols-1 !gap-[18px] sm:!grid-cols-2">
                          <div>
                            <label htmlFor="profile-name" className="!text-[12px] !font-semibold !text-[#294b68]">
                              Full Name
                            </label>
                            <input
                              id="profile-name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className={inputClass}
                              placeholder="Enter your full name"
                              autoComplete="name"
                              required
                              minLength={2}
                              maxLength={100}
                            />
                          </div>

                          <div>
                            <label htmlFor="profile-email" className="!text-[12px] !font-semibold !text-[#294b68]">
                              Email Address
                            </label>
                            <input
                              id="profile-email"
                              type="email"
                              value={userEmail}
                              readOnly
                              disabled
                              className={inputClass}
                            />
                            <p className="!mb-0 !mt-[5px] !text-[11px] !text-[#999]">
                              Email address cannot be changed here.
                            </p>
                          </div>

                          <div>
                            <label htmlFor="profile-phone" className="!text-[12px] !font-semibold !text-[#294b68]">
                              Phone Number
                            </label>
                            <input
                              id="profile-phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={inputClass}
                              placeholder="Enter your phone number"
                              autoComplete="tel"
                              maxLength={20}
                            />
                          </div>
                        </div>

                        <div className="!mt-[24px] !flex !flex-wrap !gap-[10px]">
                          <button
                            type="submit"
                            disabled={saving}
                            className="!inline-flex !h-[43px] !items-center !justify-center !gap-[8px] !rounded-xl !border-0 !bg-[#1976c8] !px-[19px] !text-[13px] !font-semibold !text-white transition-all hover:!bg-[#105592] disabled:!cursor-not-allowed disabled:!opacity-60"
                          >
                            {saving ? (
                              <LoaderCircle size={17} className="animate-spin" />
                            ) : (
                              <Save size={17} />
                            )}
                            {saving ? "Saving..." : "Save Changes"}
                          </button>

                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            disabled={saving}
                            className="!inline-flex !h-[43px] !items-center !justify-center !gap-[8px] !rounded-xl !border !border-[#dce4eb] !bg-white !px-[19px] !text-[13px] !font-semibold !text-[#666] hover:!bg-[#f7f9fb] disabled:!opacity-60"
                          >
                            <X size={17} />
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="!grid !grid-cols-1 !gap-[14px] sm:!grid-cols-2">
                          {[
                            {
                              label: "Full Name",
                              value: userName,
                              Icon: UserRound,
                            },
                            {
                              label: "Email Address",
                              value: userEmail,
                              Icon: Mail,
                            },
                            {
                              label: "Phone Number",
                              value: userPhone,
                              Icon: Phone,
                            },
                            {
                              label: "Account Status",
                              value: "Active",
                              Icon: CheckCircle2,
                            },
                          ].map(({ label, value, Icon }) => (
                            <div
                              key={label}
                              className="!rounded-xl !border !border-[#e1e7ec] !bg-white !p-[15px] !shadow-[0_3px_18px_rgba(0,0,0,0.035)] transition-all hover:!border-[#cddde9] hover:!shadow-[0_9px_28px_rgba(0,0,0,0.07)]"
                            >
                              <div className="!flex !items-center !gap-[11px]">
                                <div className="!flex !h-[40px] !w-[40px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                                  <Icon size={18} strokeWidth={1.8} />
                                </div>
                                <div className="!min-w-0">
                                  <p className="!m-0 !text-[10px] !font-semibold !uppercase !tracking-[0.3px] !text-[#999]">
                                    {label}
                                  </p>
                                  <p className={`!mb-0 !mt-[5px] !break-words !text-[14px] !font-semibold ${label === "Account Status" ? "!text-[#1976c8]" : "!text-[#444]"}`}>
                                    {value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                          </div>

                          <div className="!mt-[26px]">
                            <div className="!mb-[12px]">
                              <h3 className="!m-0 !text-[18px] !font-bold !text-[#294b68]">
                                Account Information
                              </h3>
                              <p className="!mb-0 !mt-[5px] !text-[12px] !text-[#888]">
                                Overview of your HospitalCare account
                              </p>
                            </div>

                            <div className="!rounded-xl !border !border-[#dce8f0] !bg-[#f7fbfe] !p-[16px]">
                              <div className="!grid !grid-cols-1 !gap-[15px] sm:!grid-cols-2">
                                <div className="!flex !items-center !gap-[11px]">
                                  <div className="!flex !h-[40px] !w-[40px] !shrink-0 !items-center !justify-center !rounded-xl !bg-white !text-[#1976c8]">
                                    <ShieldCheck size={18} />
                                  </div>
                                  <div>
                                    <p className="!m-0 !text-[10px] !font-medium !uppercase !tracking-[0.3px] !text-[#999]">
                                      Account Type
                                    </p>
                                    <p className="!mb-0 !mt-[4px] !text-[14px] !font-semibold !text-[#294b68]">
                                      Patient
                                    </p>
                                  </div>
                                </div>

                                <div className="!flex !items-center !gap-[11px]">
                                  <div className="!flex !h-[40px] !w-[40px] !shrink-0 !items-center !justify-center !rounded-xl !bg-white !text-[#1976c8]">
                                    <UserCheck size={18} />
                                  </div>
                                  <div>
                                    <p className="!m-0 !text-[10px] !font-medium !uppercase !tracking-[0.3px] !text-[#999]">
                                      Account Status
                                    </p>
                                    <p className="!mb-0 !mt-[4px] !text-[14px] !font-semibold !text-[#1976c8]">
                                      Active
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="!mt-[18px] !rounded-xl !border !border-[#e1e7ec] !bg-white !p-[15px] !shadow-[0_3px_18px_rgba(0,0,0,0.035)]">
                            <div className="!flex !items-center !gap-[11px]">
                              <div className="!flex !h-[40px] !w-[40px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                                <UserRound size={17} />
                              </div>
                              <div>
                                <p className="!m-0 !text-[12px] !font-semibold !text-[#294b68]">
                                  HospitalCare Patient Account
                                </p>
                                <p className="!mb-0 !mt-[4px] !text-[11px] !leading-[1.5] !text-[#888]">
                                  Your account is ready for appointments and hospital services.
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                    )}
                  </div>
                </div>
              )}

              {/* MY APPOINTMENTS */}
              {activeTab === "appointments" && (
                <div className="!h-full !overflow-y-auto">
                  <div className="!border-b !border-[#edf0f2] !bg-[#fbfcfd] !px-[20px] !py-[18px] md:!px-[24px]">
                    <div className="!flex !flex-wrap !items-center !justify-between !gap-[12px]">
                      <div>
                        <h2 className="!m-0 !text-[21px] !font-bold !text-[#294b68] md:!text-[23px]">
                          My Appointments
                        </h2>
                        <p className="!mb-0 !mt-[5px] !text-[12px] !text-[#888] md:!text-[13px]">
                          View your upcoming and previous hospital appointments.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={fetchAppointments}
                        disabled={appointmentsLoading}
                        className="!inline-flex !h-[37px] !items-center !gap-[7px] !rounded-xl !border !border-[#cddde9] !bg-white !px-[12px] !text-[12px] !font-semibold !text-[#1976c8] hover:!bg-[#eef6fc] disabled:!opacity-60"
                      >
                        <RefreshCw
                          size={14}
                          className={appointmentsLoading ? "animate-spin" : ""}
                        />
                        Refresh
                      </button>
                    </div>
                  </div>

                  <div className="!px-[20px] !py-[22px] md:!px-[24px]">
                    {appointmentsLoading ? (
                      <div className="!flex !min-h-[330px] !flex-col !items-center !justify-center !text-center">
                        <LoaderCircle size={34} className="animate-spin !text-[#1976c8]" />
                        <p className="!mb-0 !mt-[14px] !text-[14px] !font-medium !text-[#294b68]">
                          Loading your appointments...
                        </p>
                      </div>
                    ) : appointmentsError ? (
                      <div className="!flex !min-h-[330px] !flex-col !items-center !justify-center !rounded-xl !border !border-[#f3d1d1] !bg-[#fffafa] !px-[20px] !py-[40px] !text-center">
                        <div className="!flex !h-[60px] !w-[60px] !items-center !justify-center !rounded-xl !bg-[#fff0f0] !text-[#c03939]">
                          <AlertCircle size={29} />
                        </div>
                          <h3 className="!mb-0 !mt-[17px] !text-[18px] !font-bold !text-[#294b68]">
                          Unable to load appointments
                        </h3>
                          <p className="!mb-0 !mt-[8px] !max-w-[450px] !text-[13px] !leading-[1.7] !text-[#777]">
                          {appointmentsError}
                        </p>
                          <button
                            type="button"
                            onClick={fetchAppointments}
                            className="!mt-[20px] !inline-flex !h-[42px] !items-center !gap-[8px] !rounded-xl !border-0 !bg-[#1976c8] !px-[18px] !text-[13px] !font-semibold !text-white hover:!bg-[#105592]"
                          >
                            <RefreshCw size={16} />
                            Try Again
                          </button>
                      </div>
                      ) : appointments.length === 0 ? (
                        <div className="!flex !min-h-[390px] !flex-col !items-center !justify-center !rounded-xl !border !border-[#e1e7ec] !bg-[#fbfcfd] !px-[20px] !py-[55px] !text-center !shadow-[0_3px_18px_rgba(0,0,0,0.035)]">
                          <div className="!mx-auto !flex !h-[68px] !w-[68px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                            <CalendarDays size={31} strokeWidth={1.7} />
                          </div>
                          <h3 className="!mb-0 !mt-[18px] !text-[20px] !font-bold !text-[#294b68]">
                            No appointments yet
                          </h3>
                            <p className="!mx-auto !mb-0 !mt-[8px] !max-w-[500px] !text-[14px] !leading-[1.7] !text-[#777]">
                              Your upcoming and previous appointments will appear here.
                            </p>
                            <button
                              type="button"
                              onClick={() => navigate("/appointment")}
                              className="!mt-[22px] !inline-flex !h-[44px] !items-center !gap-[8px] !rounded-xl !border-0 !bg-[#1976c8] !px-[20px] !text-[13px] !font-semibold !text-white transition-all hover:!bg-[#105592]"
                            >
                              <CalendarCheck2 size={17} />
                              Book an Appointment
                            </button>
                          </div>
                        ) : (
                          <div className="!space-y-[15px]">
                            <div className="!mb-[17px] !flex !items-center !justify-between">
                              <p className="!m-0 !text-[13px] !text-[#777]">
                                Your appointments
                              </p>
                              <span className="!rounded-full !bg-[#eef6fc] !px-[11px] !py-[5px] !text-[12px] !font-semibold !text-[#1976c8]">
                                {appointments.length} total
                              </span>
                            </div>

                            {appointments.map((appointment, index) => {
                              const status = getStatus(appointment);

                          const date =
                            appointment.appointmentDate ||
                            appointment.date ||
                            appointment.scheduledDate;

                          const time =
                            appointment.appointmentTime ||
                            appointment.time ||
                            appointment.scheduledTime;

                          const id =
                            appointment._id ||
                            appointment.id ||
                            index;

                          return (
                            <article
                              key={id}
                              onClick={() => openViewModal(appointment)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                  event.preventDefault();
                                  openViewModal(appointment);
                                }
                              }}
                              className="!group !cursor-pointer !overflow-hidden !rounded-xl !border !border-[#e1e7ec] !bg-white !p-[17px] !shadow-[0_3px_18px_rgba(0,0,0,0.035)] transition-all duration-300 hover:!-translate-y-[2px] hover:!border-[#cddde9] hover:!shadow-[0_9px_28px_rgba(0,0,0,0.07)]"
                            >
                              <div className="!flex !flex-col !gap-[15px] sm:!flex-row sm:!items-start sm:!justify-between">
                                <div className="!flex !min-w-0 !items-start !gap-[12px]">
                                  <div className="!flex !h-[45px] !w-[45px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                                    <Stethoscope size={21} />
                                  </div>

                                  <div className="!min-w-0">
                                    <h3 className="!m-0 !break-words !text-[16px] !font-bold !text-[#294b68]">
                                      Dr. {getDoctorName(appointment).replace(/^Dr\.\s*/i, "")}
                                    </h3>
                                    <p className="!mb-0 !mt-[5px] !text-[12px] !text-[#777]">
                                      {getDepartmentName(appointment)}
                                    </p>
                                  </div>
                                </div>

                                <span
                                  className={`!inline-flex !w-fit !shrink-0 !items-center !rounded-full !px-[11px] !py-[6px] !text-[11px] !font-semibold ${getStatusClasses(status)}`}
                                >
                                  {String(status).charAt(0).toUpperCase() +
                                    String(status).slice(1)}
                                </span>
                              </div>

                              <div className="!mt-[17px] !grid !grid-cols-1 !gap-[12px] border-t !border-[#edf0f2] !pt-[15px] sm:!grid-cols-2">
                                <div className="!flex !items-center !gap-[9px]">
                                  <CalendarDays size={16} className="!shrink-0 !text-[#1976c8]" />
                                  <div>
                                    <p className="!m-0 !text-[10px] !font-semibold !uppercase !text-[#999]">
                                      Appointment Date
                                    </p>
                                    <p className="!mb-0 !mt-[4px] !text-[12px] !font-semibold !text-[#444]">
                                      {formatDate(date)}
                                    </p>
                                  </div>
                                </div>

                                <div className="!flex !items-center !gap-[9px]">
                                  <Clock size={16} className="!shrink-0 !text-[#1976c8]" />
                                  <div>
                                    <p className="!m-0 !text-[10px] !font-semibold !uppercase !text-[#999]">
                                      Appointment Time
                                    </p>
                                    <p className="!mb-0 !mt-[4px] !text-[12px] !font-semibold !text-[#444]">
                                      {time || "Not specified"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {appointment.reason && (
                                <div className="!mt-[14px] !flex !items-start !gap-[9px] !rounded-lg !bg-[#f7f9fb] !p-[12px]">
                                  <FileText size={16} className="!mt-[1px] !shrink-0 !text-[#1976c8]" />
                                  <div>
                                    <p className="!m-0 !text-[10px] !font-semibold !uppercase !text-[#999]">
                                      Reason for Visit
                                    </p>
                                    <p className="!mb-0 !mt-[4px] !text-[12px] !leading-[1.6] !text-[#555]">
                                      {appointment.reason}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {appointment.address && (
                                <div className="!mt-[12px] !flex !items-start !gap-[8px] !text-[12px] !text-[#777]">
                                  <MapPin size={15} className="!mt-[1px] !shrink-0 !text-[#1976c8]" />
                                  {typeof appointment.address === "string"
                                    ? appointment.address
                                    : appointment.address?.street ||
                                    appointment.address?.address ||
                                    "Address available"}
                                </div>
                              )}

                              {/* ACTIONS */}
                              <div className="!mt-[15px] !flex !items-center !justify-end !gap-[8px] !border-t !border-[#edf0f2] !pt-[13px]">
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    openViewModal(appointment);
                                  }}
                                  className="!inline-flex !h-[36px] !items-center !justify-center !gap-[6px] !rounded-xl !border !border-[#d5e3ed] !bg-white !px-[13px] !text-[11px] !font-semibold !text-[#1976c8] transition-all duration-200 hover:!border-[#1976c8] hover:!bg-[#eef6fc]"
                                >
                                  <Eye size={14} strokeWidth={1.8} />
                                  View Details
                                </button>

                                {canCancelAppointment(appointment) && (
                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      openCancelModal(appointment);
                                    }}
                                    className="!inline-flex !h-[36px] !items-center !justify-center !gap-[6px] !rounded-xl !border !border-[#f0cccc] !bg-white !px-[13px] !text-[11px] !font-semibold !text-[#dc3545] transition-all duration-200 hover:!bg-[#fff3f3]"
                                  >
                                    <XCircle size={14} strokeWidth={1.8} />
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* HEALTH INFORMATION */}
              {activeTab === "health" && (
                <div className="!h-full !overflow-y-auto">
                  <div className="!border-b !border-[#edf0f2] !bg-[#fbfcfd] !px-[20px] !py-[18px] md:!px-[24px]">
                    <h2 className="!m-0 !text-[21px] !font-bold !text-[#294b68] md:!text-[23px]">
                      Health Information
                    </h2>
                    <p className="!mb-0 !mt-[5px] !text-[12px] !text-[#888] md:!text-[13px]">
                      Your health information and medical details
                    </p>
                  </div>

                  <div className="!px-[20px] !py-[22px] md:!px-[24px]">
                    <div className="!grid !grid-cols-1 !gap-[16px] sm:!grid-cols-2">
                      <div className="!group !relative !min-h-[145px] !overflow-hidden !rounded-xl !border !border-[#e1e7ec] !bg-white !p-[19px] !shadow-[0_3px_18px_rgba(0,0,0,0.035)] transition-all hover:!-translate-y-[2px] hover:!border-[#cddde9] hover:!shadow-[0_9px_28px_rgba(0,0,0,0.07)]">
                        <div className="!absolute !bottom-0 !left-0 !top-0 !w-[3px] !bg-[#1976c8]" />
                        <div className="!flex !items-start !gap-[13px]">
                          <div className="!flex !h-[44px] !w-[44px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                            <HeartPulse size={21} strokeWidth={1.8} />
                          </div>
                          <div className="!min-w-0">
                            <h3 className="!m-0 !text-[16px] !font-bold !text-[#294b68]">
                              Health Profile
                            </h3>
                            <p className="!mb-0 !mt-[6px] !text-[12px] !leading-[1.6] !text-[#888]">
                              Manage your health details and medical information.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="!group !relative !min-h-[145px] !overflow-hidden !rounded-xl !border !border-[#e1e7ec] !bg-white !p-[19px] !shadow-[0_3px_18px_rgba(0,0,0,0.035)] transition-all hover:!-translate-y-[2px] hover:!border-[#cddde9] hover:!shadow-[0_9px_28px_rgba(0,0,0,0.07)]">
                        <div className="!absolute !bottom-0 !left-0 !top-0 !w-[3px] !bg-[#1976c8]" />
                        <div className="!flex !items-start !gap-[13px]">
                          <div className="!flex !h-[44px] !w-[44px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                            <FileText size={21} strokeWidth={1.8} />
                          </div>
                          <div className="!min-w-0">
                            <h3 className="!m-0 !text-[16px] !font-bold !text-[#294b68]">
                              Medical Records
                            </h3>
                            <p className="!mb-0 !mt-[6px] !text-[12px] !leading-[1.6] !text-[#888]">
                              Your medical records and reports will appear here.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="!mt-[18px] !rounded-xl !border !border-[#dce8f0] !bg-[#f7fbfe] !p-[16px]">
                      <div className="!flex !items-center !gap-[11px]">
                        <div className="!flex !h-[40px] !w-[40px] !shrink-0 !items-center !justify-center !rounded-xl !bg-white !text-[#1976c8] !shadow-[0_2px_8px_rgba(0,0,0,0.035)]">
                          <HeartPulse size={18} strokeWidth={1.8} />
                        </div>
                        <div>
                          <p className="!m-0 !text-[12px] !font-semibold !text-[#294b68]">
                            Keep your health information updated
                          </p>
                          <p className="!mb-0 !mt-[4px] !text-[11px] !leading-[1.5] !text-[#888]">
                            Updated medical details can help provide better care during your appointments.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </section>
          </div>
        </div>
      </section>

      {/* =====================================================
          VIEW APPOINTMENT DETAILS MODAL
      ===================================================== */}
      {viewModalOpen && viewAppointment && (
        <div
          className="!fixed !inset-0 !z-[9998] !flex !items-center !justify-center !bg-[#172b3a]/50 !px-5 !py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeViewModal();
            }
          }}
        >
          <div className="!mt-[35px] !flex !max-h-[80vh] !w-full !max-w-[620px] !flex-col !overflow-hidden !rounded-xl !border !border-[#e2e7eb] !bg-white !shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

            {/* MODAL HEADER */}
            <div className="!shrink-0 !border-b !border-[#edf0f2] !bg-[#fbfcfd] !px-[22px] !py-[18px]">
              <div className="!flex !items-center !justify-between !gap-4">
                <div className="!flex !items-center !gap-[12px]">
                  <div className="!flex !h-[42px] !w-[42px] !shrink-0 !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                    <CalendarCheck2 size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="!m-0 !text-[18px] !font-bold !text-[#294b68]">
                      Appointment Details
                    </h3>
                    <p className="!mb-0 !mt-[3px] !text-[11px] !text-[#999]">
                      Complete information about your appointment
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeViewModal}
                  className="!flex !h-[34px] !w-[34px] !shrink-0 !items-center !justify-center !rounded-full !border-0 !bg-transparent !p-0 !text-[#999] transition-all duration-200 hover:!bg-[#f1f4f7] hover:!text-[#294b68]"
                >
                  <XCircle size={20} strokeWidth={1.6} />
                </button>
              </div>
            </div>

            {/* MODAL BODY */}
            <div className="!flex-1 !overflow-y-auto !px-[22px] !py-[22px]">
              {/* DOCTOR */}
              <div className="!rounded-xl !border !border-[#dce8f0] !bg-[#f7fbfe] !p-[16px]">
                <div className="!flex !items-center !gap-[13px]">
                  <div className="!flex !h-[52px] !w-[52px] !shrink-0 !items-center !justify-center !rounded-full !bg-[#eaf4fb] !text-[#1976c8]">
                    <Stethoscope size={23} strokeWidth={1.7} />
                  </div>

                  <div className="!min-w-0">
                    <div className="!flex !flex-wrap !items-center !gap-[8px]">
                      <h4 className="!m-0 !text-[17px] !font-bold !text-[#294b68]">
                        Dr. {getDoctorName(viewAppointment).replace(/^Dr\.\s*/i, "")}
                      </h4>
                      <span className="!rounded-full !bg-[#eaf3f9] !px-[8px] !py-[4px] !text-[10px] !font-semibold !text-[#1976c8]">
                        Doctor
                      </span>
                    </div>

                    <p className="!mb-0 !mt-[4px] !text-[12px] !text-[#777]">
                      {getDoctorSpecialization(viewAppointment)}
                    </p>

                    <p className="!mb-0 !mt-[2px] !text-[12px] !text-[#999]">
                      {getDepartmentName(viewAppointment)}
                    </p>
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div className="!mt-[18px]">
                {(() => {
                  const status = getStatus(viewAppointment);
                  const statusInfo = getStatusInfo(status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <div className="!flex !items-center !justify-between !gap-4 !rounded-xl !border !border-[#e5e9ed] !bg-white !px-[15px] !py-[13px]">
                      <div>
                        <p className="!m-0 !text-[10px] !font-semibold !uppercase !tracking-[0.4px] !text-[#999]">
                          Appointment Status
                        </p>
                        <p className="!mb-0 !mt-[4px] !text-[13px] !font-semibold !capitalize !text-[#294b68]">
                          {status}
                        </p>
                      </div>

                      <span
                        className={`!inline-flex !items-center !gap-[6px] !rounded-full !px-[11px] !py-[6px] !text-[11px] !font-semibold ${statusInfo.className}`}
                      >
                        <StatusIcon size={14} strokeWidth={1.8} />
                        {statusInfo.label}
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* APPOINTMENT INFORMATION */}
              <div className="!mt-[18px] !grid !grid-cols-1 !gap-[12px] sm:!grid-cols-2">
                {/* DATE */}
                <div className="!rounded-xl !border !border-[#e5e9ed] !bg-[#fbfcfd] !p-[14px]">
                  <div className="!flex !items-center !gap-[9px]">
                    <div className="!flex !h-[34px] !w-[34px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                      <CalendarDays size={16} strokeWidth={1.7} />
                    </div>
                    <div>
                      <p className="!m-0 !text-[10px] !uppercase !tracking-[0.3px] !text-[#999]">
                        Date
                      </p>
                      <p className="!mb-0 !mt-[3px] !text-[12px] !font-semibold !text-[#333]">
                        {formatDate(
                          viewAppointment.date ||
                          viewAppointment.appointmentDate
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* TIME */}
                <div className="!rounded-xl !border !border-[#e5e9ed] !bg-[#fbfcfd] !p-[14px]">
                  <div className="!flex !items-center !gap-[9px]">
                    <div className="!flex !h-[34px] !w-[34px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                      <Clock3 size={16} strokeWidth={1.7} />
                    </div>
                    <div>
                      <p className="!m-0 !text-[10px] !uppercase !tracking-[0.3px] !text-[#999]">
                        Time
                      </p>
                      <p className="!mb-0 !mt-[3px] !text-[12px] !font-semibold !text-[#333]">
                        {viewAppointment.time ||
                          viewAppointment.appointmentTime ||
                          "Not available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DEPARTMENT */}
                <div className="!rounded-xl !border !border-[#e5e9ed] !bg-[#fbfcfd] !p-[14px]">
                  <div className="!flex !items-center !gap-[9px]">
                    <div className="!flex !h-[34px] !w-[34px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                      <Building2 size={16} strokeWidth={1.7} />
                    </div>
                    <div>
                      <p className="!m-0 !text-[10px] !uppercase !tracking-[0.3px] !text-[#999]">
                        Department
                      </p>
                      <p className="!mb-0 !mt-[3px] !text-[12px] !font-semibold !text-[#333]">
                        {getDepartmentName(viewAppointment)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* PHONE */}
                <div className="!rounded-xl !border !border-[#e5e9ed] !bg-[#fbfcfd] !p-[14px]">
                  <div className="!flex !items-center !gap-[9px]">
                    <div className="!flex !h-[34px] !w-[34px] !items-center !justify-center !rounded-xl !bg-[#eef6fc] !text-[#1976c8]">
                      <Phone size={16} strokeWidth={1.7} />
                    </div>
                    <div className="!min-w-0">
                      <p className="!m-0 !text-[10px] !uppercase !tracking-[0.3px] !text-[#999]">
                        Contact
                      </p>
                      <p className="!mb-0 !mt-[3px] !break-all !text-[12px] !font-semibold !text-[#333]">
                        {getPatientPhone(viewAppointment)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* REASON */}
              {viewAppointment.reason && (
                <div className="!mt-[18px] !rounded-xl !border !border-[#e5e9ed] !bg-white !p-[15px]">
                  <div className="!flex !items-start !gap-[10px]">
                    <FileText
                      size={17}
                      strokeWidth={1.7}
                      className="!mt-[2px] !shrink-0 !text-[#1976c8]"
                    />
                    <div>
                      <p className="!m-0 !text-[10px] !font-semibold !uppercase !tracking-[0.4px] !text-[#999]">
                        Reason for Appointment
                      </p>
                      <p className="!mb-0 !mt-[6px] !text-[13px] !leading-[1.6] !text-[#555]">
                        {viewAppointment.reason}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* CANCELLATION INFORMATION */}
              {(getStatus(viewAppointment) === "cancelled" ||
                getStatus(viewAppointment) === "canceled") && (
                  <div className="!mt-[18px] !rounded-xl !border !border-[#f0d1d1] !bg-[#fff7f7] !p-[15px]">
                    <div className="!flex !items-start !gap-[10px]">
                      <Ban
                        size={17}
                        strokeWidth={1.7}
                        className="!mt-[2px] !shrink-0 !text-[#dc3545]"
                      />
                      <div className="!min-w-0">
                        <p className="!m-0 !text-[10px] !font-semibold !uppercase !tracking-[0.4px] !text-[#dc3545]">
                          Cancellation Information
                        </p>
                        <p className="!mb-0 !mt-[7px] !text-[11px] !font-semibold !text-[#444]">
                          Cancellation Reason
                        </p>
                        <p className="!mb-0 !mt-[4px] !text-[13px] !leading-[1.6] !text-[#666]">
                          {viewAppointment.cancellationReason?.trim()
                            ? viewAppointment.cancellationReason
                            : "No cancellation reason was provided."}
                        </p>
                        {viewAppointment.cancelledAt && (
                          <p className="!mb-0 !mt-[10px] !text-[11px] !text-[#999]">
                            Cancelled on{" "}
                            <span className="!font-medium !text-[#777]">
                              {formatDateTime(viewAppointment.cancelledAt)}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                </div>
                )}
            </div>

            {/* MODAL FOOTER */}
            <div className="!shrink-0 !flex !justify-end !border-t !border-[#edf0f2] !bg-[#fbfcfd] !px-[22px] !py-[15px]">
              <button
                type="button"
                onClick={closeViewModal}
                className="!inline-flex !h-[40px] !items-center !justify-center !rounded-xl !border !border-[#d9e0e6] !bg-white !px-[20px] !text-[12px] !font-semibold !text-[#555] !shadow-none transition-all duration-200 hover:!border-[#1976c8] hover:!text-[#1976c8]"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          CANCEL CONFIRMATION MODAL
      ===================================================== */}
      {cancelModalOpen && selectedAppointment && (
        <div
          className="!fixed !inset-0 !z-[9999] !flex !items-center !justify-center !bg-[#172b3a]/50 !px-5 !py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !cancellingId
            ) {
              closeCancelModal();
            }
          }}
        >
          <div className="!w-full !max-w-[440px] !overflow-hidden !rounded-xl !border !border-[#e2e7eb] !bg-white !shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            {/* HEADER */}
            <div className="!border-b !border-[#edf0f2] !px-[22px] !py-[18px]">
              <div className="!flex !items-center !justify-between">
                <div className="!flex !items-center !gap-[11px]">
                  <div className="!flex !h-[40px] !w-[40px] !items-center !justify-center !rounded-full !bg-[#fff1f1] !text-[#dc3545]">
                    <Ban size={19} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="!m-0 !text-[17px] !font-bold !text-[#294b68]">
                      Cancel Appointment
                    </h3>
                    <p className="!mb-0 !mt-[3px] !text-[11px] !text-[#999]">
                      Please confirm this action
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeCancelModal}
                  disabled={!!cancellingId}
                  className="!flex !h-[32px] !w-[32px] !items-center !justify-center !rounded-full !border-0 !bg-transparent !p-0 !text-[#999] hover:!bg-[#f3f5f7] hover:!text-[#294b68] disabled:!cursor-not-allowed disabled:!opacity-50"
                >
                  <XCircle size={19} />
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="!px-[22px] !py-[20px]">
              {cancelSuccess ? (
                <div className="!rounded-xl !border !border-[#c9e8d4] !bg-[#effaf3] !px-[15px] !py-[14px]">
                  <div className="!flex !items-center !gap-[9px] !text-[#198754]">
                    <CheckCircle2 size={18} />
                    <p className="!m-0 !text-[12px] !font-semibold">
                      {cancelSuccess}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="!m-0 !text-[13px] !leading-[1.6] !text-[#555]">
                    Are you sure you want to cancel your appointment with{" "}
                    <span className="!font-semibold !text-[#294b68]">
                      {getDoctorName(selectedAppointment)}
                    </span>
                    ?
                  </p>

                    <div className="!mt-[15px] !rounded-xl !border !border-[#e5e9ed] !bg-[#fbfcfd] !p-[13px]">
                      <div className="!grid !grid-cols-2 !gap-[12px]">
                        <div>
                          <p className="!m-0 !text-[9px] !uppercase !tracking-[0.3px] !text-[#999]">
                            Date
                          </p>
                          <p className="!mb-0 !mt-[4px] !text-[11px] !font-semibold !text-[#444]">
                            {formatDate(
                              selectedAppointment.date ||
                              selectedAppointment.appointmentDate
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="!m-0 !text-[9px] !uppercase !tracking-[0.3px] !text-[#999]">
                            Time
                          </p>
                          <p className="!mb-0 !mt-[4px] !text-[11px] !font-semibold !text-[#444]">
                            {selectedAppointment.time ||
                              selectedAppointment.appointmentTime ||
                              "Not available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* REASON INPUT */}
                    <div className="!mt-[16px]">
                      <label
                        htmlFor="cancel-reason"
                        className="!block !text-[11px] !font-semibold !text-[#294b68]"
                      >
                        Reason for cancellation <span className="!font-normal !text-[#999]">(optional)</span>
                      </label>
                      <textarea
                        id="cancel-reason"
                        rows={3}
                        value={userCancelReason}
                        onChange={(e) => setUserCancelReason(e.target.value)}
                        disabled={!!cancellingId}
                        placeholder="Please tell us why you are cancelling..."
                        className="!mt-[7px] !w-full !resize-none !rounded-xl !border !border-[#dce4eb] !bg-[#fbfcfd] !p-[11px] !text-[12px] !text-[#444] !outline-none transition-all placeholder:!text-[#aaa] focus:!border-[#1976c8] focus:!bg-white focus:!ring-2 focus:!ring-[#1976c8]/10 disabled:!opacity-60"
                      />
                    </div>

                    {cancelError && (
                      <div className="!mt-[13px] !rounded-xl !border !border-[#f1cccc] !bg-[#fff5f5] !px-[13px] !py-[11px]">
                        <div className="!flex !items-start !gap-[8px]">
                          <CircleAlert
                            size={15}
                            className="!mt-[1px] !shrink-0 !text-[#dc3545]"
                          />
                          <p className="!m-0 !text-[11px] !leading-[1.5] !text-[#dc3545]">
                            {cancelError}
                          </p>
                        </div>
                      </div>
                    )}
                </>
              )}
            </div>

            {/* FOOTER */}
            {!cancelSuccess && (
              <div className="!flex !justify-end !gap-[9px] !border-t !border-[#edf0f2] !bg-[#fbfcfd] !px-[22px] !py-[14px]">
                <button
                  type="button"
                  onClick={closeCancelModal}
                  disabled={!!cancellingId}
                  className="!inline-flex !h-[39px] !items-center !justify-center !rounded-xl !border !border-[#d9e0e6] !bg-white !px-[16px] !text-[11px] !font-semibold !text-[#555] transition-all hover:!border-[#1976c8] hover:!text-[#1976c8] disabled:!cursor-not-allowed disabled:!opacity-50"
                >
                  Keep Appointment
                </button>

                <button
                  type="button"
                  onClick={handleCancelAppointment}
                  disabled={!!cancellingId}
                  className="!inline-flex !h-[39px] !items-center !justify-center !gap-[7px] !rounded-xl !border-0 !bg-[#dc3545] !px-[16px] !text-[11px] !font-semibold !text-white transition-all hover:!bg-[#bb2d3b] disabled:!cursor-not-allowed disabled:!opacity-60"
                >
                  {cancellingId ? (
                    <>
                      <RefreshCw size={14} className="!animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <XCircle size={14} />
                      Confirm Cancellation
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </main>
  );
};

export default Profile;