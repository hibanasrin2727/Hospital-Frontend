import {
  UserRound,
  Mail,
  ShieldCheck,
  Phone,
  CalendarDays,
  MapPin,
  ArrowLeft,
  Edit3,
  Save,
  X,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Hospital Admin",
    email: "admin@hospitalcare.com",
    phone: "+91 98765 43210",
    role: "Administrator",
    joinedDate: "January 15, 2025",
    location: "HospitalCare",
  });

  const [editProfile, setEditProfile] = useState(profile);

  // =====================================================
  // OPEN EDIT MODE
  // =====================================================
  const handleEdit = () => {
    setEditProfile(profile);
    setIsEditing(true);
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================
  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================
  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="!min-h-screen !bg-[#f7fafc] !p-4 sm:!p-6 lg:!p-8">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <div className="!mb-6 !flex !items-center !justify-between">

        <div className="!flex !items-center !gap-3">

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl !border !border-[#dcebf5] !bg-white !text-[#294b68] !shadow-sm !transition-all !duration-200 hover:!bg-[#eaf5fb] hover:!text-[#1976c8]"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="!mb-1 !text-2xl !font-bold !text-[#294b68] sm:!text-3xl">
              My Profile
            </h1>

            <p className="!mb-0 !text-sm !text-gray-500">
              View and manage your administrator profile
            </p>
          </div>

        </div>

        {/* =================================================
            EDIT / SAVE / CANCEL BUTTONS
        ================================================= */}
        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="!inline-flex !items-center !gap-2 !rounded-xl !bg-[#1976c8] !px-4 !py-2.5 !text-sm !font-semibold !text-white !shadow-sm !transition-all !duration-200 hover:!bg-[#1565a8]"
          >
            <Edit3 size={17} />

            <span className="hidden sm:inline">
              Edit Profile
            </span>
          </button>
        ) : (
          <div className="!flex !items-center !gap-2">

            {/* Cancel */}
            <button
              type="button"
              onClick={handleCancel}
              className="!inline-flex !items-center !gap-2 !rounded-xl !border !border-[#dcebf5] !bg-white !px-4 !py-2.5 !text-sm !font-semibold !text-[#294b68] !shadow-sm !transition-all hover:!bg-[#f7fafc]"
            >
              <X size={17} />

              <span className="hidden sm:inline">
                Cancel
              </span>
            </button>

            {/* Save */}
            <button
              type="button"
              onClick={handleSave}
              className="!inline-flex !items-center !gap-2 !rounded-xl !bg-[#1976c8] !px-4 !py-2.5 !text-sm !font-semibold !text-white !shadow-sm !transition-all hover:!bg-[#1565a8]"
            >
              <Save size={17} />

              <span className="hidden sm:inline">
                Save Changes
              </span>
            </button>

          </div>
        )}

      </div>

      {/* =====================================================
          PROFILE MAIN CARD
      ===================================================== */}
      <div className="!overflow-hidden !rounded-2xl !border !border-[#dcebf5] !bg-white !shadow-[0_8px_30px_rgba(41,75,104,0.06)]">

        {/* =================================================
            PROFILE COVER
        ================================================= */}
        <div className="!relative !h-40 !overflow-hidden !bg-[#1976c8] sm:!h-48">

          <div className="!absolute !-right-10 !-top-16 !h-52 !w-52 !rounded-full !bg-white/10" />

          <div className="!absolute !-bottom-24 !right-32 !h-60 !w-60 !rounded-full !bg-white/5" />

        </div>

        {/* =================================================
            PROFILE INFORMATION
        ================================================= */}
        <div className="!relative !px-5 !pb-7 sm:!px-8">

          {/* Avatar */}
          <div className="!relative !-mt-16 !mb-5 !flex !items-end">

            <div className="!relative !flex !h-32 !w-32 !items-center !justify-center !rounded-full !border-4 !border-white !bg-[#eaf5fb] !text-4xl !font-bold !text-[#1976c8] !shadow-lg">
              HA

              <span className="!absolute !bottom-2 !right-2 !h-5 !w-5 !rounded-full !border-4 !border-white !bg-[#22a06b]" />
            </div>

          </div>

          {/* Name */}
          <div className="!mb-8">

            <h2 className="!mb-1 !text-2xl !font-bold !text-[#294b68]">
              {profile.name}
            </h2>

            <p className="!mb-0 !text-sm !font-medium !text-[#1976c8]">
              {profile.role}
            </p>

          </div>

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}
          <div>

            <h3 className="!mb-4 !text-lg !font-bold !text-[#294b68]">
              Personal Information
            </h3>

            <div className="!grid !grid-cols-1 !gap-4 md:!grid-cols-2">

              {/* Full Name */}
              <div className="!rounded-xl !border !border-[#edf3f7] !bg-[#f9fcfe] !p-4">

                <div className="!mb-3 !flex !items-center !gap-3">

                  <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-lg !bg-[#eaf5fb] !text-[#1976c8]">
                    <UserRound size={19} />
                  </div>

                  <p className="!mb-0 !text-xs !font-medium !text-gray-400">
                    Full Name
                  </p>

                </div>

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editProfile.name}
                    onChange={handleChange}
                    className="!w-full !rounded-lg !border !border-[#dcebf5] !bg-white !px-3 !py-2.5 !text-sm !font-semibold !text-[#294b68] !outline-none focus:!border-[#1976c8]"
                  />
                ) : (
                  <p className="!mb-0 !text-sm !font-semibold !text-[#294b68]">
                    {profile.name}
                  </p>
                )}

              </div>

              {/* Email */}
              <div className="!rounded-xl !border !border-[#edf3f7] !bg-[#f9fcfe] !p-4">

                <div className="!mb-3 !flex !items-center !gap-3">

                  <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-lg !bg-[#eaf5fb] !text-[#1976c8]">
                    <Mail size={19} />
                  </div>

                  <p className="!mb-0 !text-xs !font-medium !text-gray-400">
                    Email Address
                  </p>

                </div>

                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editProfile.email}
                    onChange={handleChange}
                    className="!w-full !rounded-lg !border !border-[#dcebf5] !bg-white !px-3 !py-2.5 !text-sm !font-semibold !text-[#294b68] !outline-none focus:!border-[#1976c8]"
                  />
                ) : (
                  <p className="!mb-0 !break-all !text-sm !font-semibold !text-[#294b68]">
                    {profile.email}
                  </p>
                )}

              </div>

              {/* Phone */}
              <div className="!rounded-xl !border !border-[#edf3f7] !bg-[#f9fcfe] !p-4">

                <div className="!mb-3 !flex !items-center !gap-3">

                  <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-lg !bg-[#eaf5fb] !text-[#1976c8]">
                    <Phone size={19} />
                  </div>

                  <p className="!mb-0 !text-xs !font-medium !text-gray-400">
                    Phone Number
                  </p>

                </div>

                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={editProfile.phone}
                    onChange={handleChange}
                    className="!w-full !rounded-lg !border !border-[#dcebf5] !bg-white !px-3 !py-2.5 !text-sm !font-semibold !text-[#294b68] !outline-none focus:!border-[#1976c8]"
                  />
                ) : (
                  <p className="!mb-0 !text-sm !font-semibold !text-[#294b68]">
                    {profile.phone}
                  </p>
                )}

              </div>

              {/* Role */}
              <div className="!rounded-xl !border !border-[#edf3f7] !bg-[#f9fcfe] !p-4">

                <div className="!mb-3 !flex !items-center !gap-3">

                  <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-lg !bg-[#eaf5fb] !text-[#1976c8]">
                    <ShieldCheck size={19} />
                  </div>

                  <p className="!mb-0 !text-xs !font-medium !text-gray-400">
                    Role
                  </p>

                </div>

                <p className="!mb-0 !text-sm !font-semibold !text-[#294b68]">
                  {profile.role}
                </p>

              </div>

              {/* Joined Date */}
              <div className="!rounded-xl !border !border-[#edf3f7] !bg-[#f9fcfe] !p-4">

                <div className="!mb-3 !flex !items-center !gap-3">

                  <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-lg !bg-[#eaf5fb] !text-[#1976c8]">
                    <CalendarDays size={19} />
                  </div>

                  <p className="!mb-0 !text-xs !font-medium !text-gray-400">
                    Joined Date
                  </p>

                </div>

                <p className="!mb-0 !text-sm !font-semibold !text-[#294b68]">
                  {profile.joinedDate}
                </p>

              </div>

              {/* Location */}
              <div className="!rounded-xl !border !border-[#edf3f7] !bg-[#f9fcfe] !p-4">

                <div className="!mb-3 !flex !items-center !gap-3">

                  <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-lg !bg-[#eaf5fb] !text-[#1976c8]">
                    <MapPin size={19} />
                  </div>

                  <p className="!mb-0 !text-xs !font-medium !text-gray-400">
                    Location
                  </p>

                </div>

                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={editProfile.location}
                    onChange={handleChange}
                    className="!w-full !rounded-lg !border !border-[#dcebf5] !bg-white !px-3 !py-2.5 !text-sm !font-semibold !text-[#294b68] !outline-none focus:!border-[#1976c8]"
                  />
                ) : (
                  <p className="!mb-0 !text-sm !font-semibold !text-[#294b68]">
                    {profile.location}
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* =================================================
              ACCOUNT STATUS
          ================================================= */}
          <div className="!mt-8 !rounded-xl !border !border-[#d8f0e3] !bg-[#f0faf5] !p-4">

            <div className="!flex !items-center !gap-3">

              <div className="!flex !h-10 !w-10 !items-center !justify-center !rounded-full !bg-[#dcfce7] !text-[#22a06b]">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="!mb-1 !text-sm !font-bold !text-[#166534]">
                  Account Active
                </p>

                <p className="!mb-0 !text-xs !text-[#4b7a5c]">
                  Your administrator account is active and has full dashboard access.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminProfile;