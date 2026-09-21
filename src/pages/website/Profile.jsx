import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";

const Profile = () => {
  const navigate = useNavigate();
  const user = getUser();

  const [activeTab, setActiveTab] = useState("profile");

  const userName = user?.name || user?.username || "User";
  const userEmail = user?.email || "user@example.com";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f5f9fd]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <section className="relative bg-[#1976c8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="pb-6 absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center !rounded-full border-0 bg-transparent text-white shadow-sm transition-all duration-200 hover:bg-[#1976c8] hover:text-black"
            title="Go to Home"
            >
            <i className="bi bi-house text-[18px]"></i>
            </button>

          <h1 className=" text-[32px] font-bold text-white sm:text-[40px] pt-[50px] mx-auto max-w-[1200px]">
            My Profile
          </h1>

          <p className="mt-2 text-[15px] text-blue-100 mx-auto max-w-[1200px]">
            Manage your personal information and account details
          </p>

        </div>
      </section>

      {/* =====================================================
          PROFILE CONTENT
      ===================================================== */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

            {/* =================================================
                LEFT PROFILE CARD
            ================================================= */}
            <div className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_5px_25px_rgba(0,0,0,0.06)]">

              <div className="flex flex-col items-center text-center">

                {/* Avatar */}
                <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#1976c8] text-[38px] font-bold uppercase text-white shadow-lg">
                  {firstLetter}
                </div>

                <h2 className="mt-5 text-[21px] font-bold text-[#294b68]">
                  {userName}
                </h2>

                <p className="mt-1 break-all text-[13px] text-gray-500">
                  {userEmail}
                </p>

                <div className="mt-4 rounded-full bg-[#eaf4fc] px-4 py-1.5 text-[12px] font-medium text-[#1976c8]">
                  Patient
                </div>

              </div>

              {/* Navigation */}
              <div className="mt-7 border-t border-gray-100 pt-5">

                <button
                  type="button"
                  onClick={() => setActiveTab("profile")}
                  className={`flex w-full items-center gap-3 rounded-lg border-0 px-4 py-3 text-left text-[14px] transition ${
                    activeTab === "profile"
                      ? "bg-[#eef6fd] font-medium text-[#1976c8]"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <i className="bi bi-person text-[18px]"></i>
                  Profile Information
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("appointments")}
                  className={`mt-1 flex w-full items-center gap-3 rounded-lg border-0 px-4 py-3 text-left text-[14px] transition ${
                    activeTab === "appointments"
                      ? "bg-[#eef6fd] font-medium text-[#1976c8]"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <i className="bi bi-calendar-check text-[18px]"></i>
                  My Appointments
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("health")}
                  className={`mt-1 flex w-full items-center gap-3 rounded-lg border-0 px-4 py-3 text-left text-[14px] transition ${
                    activeTab === "health"
                      ? "bg-[#eef6fd] font-medium text-[#1976c8]"
                      : "bg-transparent text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <i className="bi bi-heart-pulse text-[18px]"></i>
                  Health Information
                </button>

              </div>

            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================= */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_5px_25px_rgba(0,0,0,0.06)] sm:p-8">

              {activeTab === "profile" && (
                <>
                  <div className="flex flex-col justify-between gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="m-0 text-[23px] font-bold text-[#294b68]">
                        Profile Information
                      </h2>

                      <p className="mt-1 text-[13px] text-gray-500">
                        Your personal account information
                      </p>
                    </div>

                    <button
                      type="button"
                      className="flex w-fit items-center gap-2 rounded-full border border-[#1976c8] bg-transparent px-5 py-2.5 text-[13px] font-medium text-[#1976c8] transition hover:bg-[#1976c8] hover:text-white"
                    >
                      <i className="bi bi-pencil"></i>
                      Edit Profile
                    </button>
                  </div>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">

                    {/* Full Name */}
                    <div>
                      <label className="mb-2 block text-[13px] font-medium text-gray-500">
                        Full Name
                      </label>

                      <div className="flex min-h-[48px] items-center gap-3 rounded-lg border border-gray-200 bg-[#fafcfe] px-4">
                        <i className="bi bi-person text-[#1976c8]"></i>
                        <span className="text-[14px] text-[#333]">
                          {userName}
                        </span>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-[13px] font-medium text-gray-500">
                        Email Address
                      </label>

                      <div className="flex min-h-[48px] items-center gap-3 rounded-lg border border-gray-200 bg-[#fafcfe] px-4">
                        <i className="bi bi-envelope text-[#1976c8]"></i>
                        <span className="break-all text-[14px] text-[#333]">
                          {userEmail}
                        </span>
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-[13px] font-medium text-gray-500">
                        Phone Number
                      </label>

                      <div className="flex min-h-[48px] items-center gap-3 rounded-lg border border-gray-200 bg-[#fafcfe] px-4">
                        <i className="bi bi-telephone text-[#1976c8]"></i>
                        <span className="text-[14px] text-gray-400">
                          {user?.phone || user?.phoneNumber || "Not provided"}
                        </span>
                      </div>
                    </div>

                    {/* Account Status */}
                    <div>
                      <label className="mb-2 block text-[13px] font-medium text-gray-500">
                        Account Status
                      </label>

                      <div className="flex min-h-[48px] items-center gap-3 rounded-lg border border-gray-200 bg-[#fafcfe] px-4">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

                        <span className="text-[14px] font-medium text-green-600">
                          Active
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Account Information */}
                  <div className="mt-10">

                    <h3 className="text-[18px] font-bold text-[#294b68]">
                      Account Information
                    </h3>

                    <div className="mt-4 rounded-xl bg-[#f5f9fd] p-5">

                      <div className="grid gap-5 sm:grid-cols-2">

                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#1976c8] shadow-sm">
                            <i className="bi bi-shield-check"></i>
                          </div>

                          <div>
                            <p className="m-0 text-[12px] text-gray-500">
                              Account Type
                            </p>

                            <p className="mt-1 m-0 text-[14px] font-semibold text-[#294b68]">
                              Patient
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#1976c8] shadow-sm">
                            <i className="bi bi-person-check"></i>
                          </div>

                          <div>
                            <p className="m-0 text-[12px] text-gray-500">
                              Account Status
                            </p>

                            <p className="mt-1 m-0 text-[14px] font-semibold text-green-600">
                              Active
                            </p>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                </>
              )}

              {/* =================================================
                  APPOINTMENTS
              ================================================= */}
              {activeTab === "appointments" && (
                <div>
                  <h2 className="m-0 text-[23px] font-bold text-[#294b68]">
                    My Appointments
                  </h2>

                  <p className="mt-1 text-[13px] text-gray-500">
                    View and manage your hospital appointments
                  </p>

                  <div className="mt-8 rounded-xl border border-dashed border-gray-200 bg-[#fafcfe] px-5 py-12 text-center">

                    <i className="bi bi-calendar-x text-[42px] text-gray-300"></i>

                    <h3 className="mt-4 text-[17px] font-semibold text-[#294b68]">
                      No appointments yet
                    </h3>

                    <p className="mx-auto mt-2 max-w-[420px] text-[13px] text-gray-500">
                      Your upcoming and previous appointments will appear here.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="mt-5 rounded-full border-0 bg-[#1976c8] px-6 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#294b68]"
                    >
                      Book an Appointment
                    </button>

                  </div>

                </div>
              )}

              {/* =================================================
                  HEALTH INFORMATION
              ================================================= */}
              {activeTab === "health" && (
                <div>
                  <h2 className="m-0 text-[23px] font-bold text-[#294b68]">
                    Health Information
                  </h2>

                  <p className="mt-1 text-[13px] text-gray-500">
                    Your health information will be displayed here.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">

                    <div className="rounded-xl border border-gray-100 bg-[#f5f9fd] p-5">
                      <i className="bi bi-heart-pulse text-[25px] text-[#1976c8]"></i>

                      <h3 className="mt-4 text-[16px] font-semibold text-[#294b68]">
                        Health Profile
                      </h3>

                      <p className="mt-1 text-[13px] text-gray-500">
                        Manage your health details and medical information.
                      </p>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-[#f5f9fd] p-5">
                      <i className="bi bi-file-medical text-[25px] text-[#1976c8]"></i>

                      <h3 className="mt-4 text-[16px] font-semibold text-[#294b68]">
                        Medical Records
                      </h3>

                      <p className="mt-1 text-[13px] text-gray-500">
                        Your medical records and reports will appear here.
                      </p>
                    </div>

                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Profile;