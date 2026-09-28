import {
    Search,
    Plus,
    MoreVertical,
    Stethoscope,
    Pencil,
    Trash2,
    Power,
    X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Doctors = () => {

    // =====================================================
    // DOCTORS DATA
    // =====================================================

    const [doctors, setDoctors] = useState([
        {
            id: 1,
            name: "Dr. Meera",
            specialty: "Cardiologist",
            department: "Cardiology & Heart Care",
            status: "Active",
        },
        {
            id: 2,
            name: "Dr. Rahul",
            specialty: "Orthopedic",
            department: "Orthopedics",
            status: "Active",
        },
        {
            id: 3,
            name: "Dr. Anjali",
            specialty: "Dermatologist",
            department: "Dermatology",
            status: "Active",
        },
    ]);

    // =====================================================
    // STATES
    // =====================================================

    const [searchTerm, setSearchTerm] = useState("");

    const [departmentFilter, setDepartmentFilter] =
        useState("All Departments");

    const [openMenu, setOpenMenu] = useState(null);

    const [menuPosition, setMenuPosition] = useState({
        top: 0,
        right: 0,
    });

    const [showModal, setShowModal] = useState(false);

    const [editingDoctor, setEditingDoctor] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        specialty: "",
        department: "",
    });

    // =====================================================
    // CLOSE ACTION MENU WHEN CLICKING OUTSIDE
    // =====================================================

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedInsideAction =
                event.target.closest("[data-doctor-action]");

            if (!clickedInsideAction) {
                setOpenMenu(null);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // =====================================================
    // CLOSE ACTION MENU WHEN SCROLLING / RESIZING
    // =====================================================

    useEffect(() => {
        if (openMenu === null) {
            return;
        }

        const handleScroll = () => {
            setOpenMenu(null);
        };

        const handleResize = () => {
            setOpenMenu(null);
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            true
        );

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
                true
            );

            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, [openMenu]);

    // =====================================================
    // DEPARTMENTS
    // =====================================================

    const departments = [
        "Cardiology & Heart Care",
        "Orthopedics",
        "Dermatology",
    ];

    // =====================================================
    // SEARCH + FILTER
    // =====================================================

    const filteredDoctors = doctors.filter((doctor) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            doctor.name.toLowerCase().includes(search) ||
            doctor.specialty.toLowerCase().includes(search) ||
            doctor.department.toLowerCase().includes(search);

        const matchesDepartment =
            departmentFilter === "All Departments" ||
            doctor.department === departmentFilter;

        return matchesSearch && matchesDepartment;
    });

    // =====================================================
    // OPEN ACTION DROPDOWN
    // =====================================================

    const handleActionMenu = (doctorId, event) => {
        if (openMenu === doctorId) {
            setOpenMenu(null);
            return;
        }

        const buttonRect =
            event.currentTarget.getBoundingClientRect();

        const menuWidth = 176;
        const menuHeight = 150;
        const gap = 8;
        const screenPadding = 8;

        // Space available below the button
        const spaceBelow =
            window.innerHeight - buttonRect.bottom;

        // Space available above the button
        const spaceAbove = buttonRect.top;

        let top;

        // =================================================
        // OPEN BELOW IF THERE IS ENOUGH SPACE
        // =================================================

        if (spaceBelow >= menuHeight + gap) {
            top = buttonRect.bottom + gap;
        }

        // =================================================
        // OTHERWISE OPEN ABOVE
        // =================================================

        else if (spaceAbove >= menuHeight + gap) {
            top =
                buttonRect.top -
                menuHeight -
                gap;
        }

        // =================================================
        // FALLBACK - KEEP INSIDE SCREEN
        // =================================================

        else {
            top = Math.max(
                screenPadding,
                Math.min(
                    buttonRect.bottom + gap,
                    window.innerHeight -
                    menuHeight -
                    screenPadding
                )
            );
        }

        // =================================================
        // KEEP DROPDOWN INSIDE RIGHT SIDE OF SCREEN
        // =================================================

        let right =
            window.innerWidth -
            buttonRect.right;

        if (
            right + menuWidth >
            window.innerWidth - screenPadding
        ) {
            right = screenPadding;
        }

        if (right < screenPadding) {
            right = screenPadding;
        }

        setMenuPosition({
            top,
            right,
        });

        setOpenMenu(doctorId);
    };

    // =====================================================
    // OPEN ADD DOCTOR
    // =====================================================

    const handleAddDoctor = () => {
        setOpenMenu(null);

        setEditingDoctor(null);

        setFormData({
            name: "",
            specialty: "",
            department: "",
        });

        setShowModal(true);
    };

    // =====================================================
    // OPEN EDIT DOCTOR
    // =====================================================

    const handleEditDoctor = (doctor) => {
        setEditingDoctor(doctor);

        setFormData({
            name: doctor.name,
            specialty: doctor.specialty,
            department: doctor.department,
        });

        setOpenMenu(null);

        setShowModal(true);
    };

    // =====================================================
    // FORM INPUT
    // =====================================================

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // =====================================================
    // SAVE DOCTOR
    // =====================================================

    const handleSaveDoctor = (event) => {
        event.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.specialty.trim() ||
            !formData.department
        ) {
            return;
        }

        // =================================================
        // EDIT DOCTOR
        // =================================================

        if (editingDoctor) {
            setDoctors((previous) =>
                previous.map((doctor) =>
                    doctor.id === editingDoctor.id
                        ? {
                            ...doctor,
                            name: formData.name,
                            specialty: formData.specialty,
                            department: formData.department,
                        }
                        : doctor
                )
            );
        }

        // =================================================
        // ADD DOCTOR
        // =================================================

        else {
            const newDoctor = {
                id:
                    doctors.length > 0
                        ? Math.max(
                            ...doctors.map(
                                (doctor) => doctor.id
                            )
                        ) + 1
                        : 1,

                name: formData.name,

                specialty: formData.specialty,

                department: formData.department,

                status: "Active",
            };

            setDoctors((previous) => [
                ...previous,
                newDoctor,
            ]);
        }

        setShowModal(false);

        setEditingDoctor(null);

        setFormData({
            name: "",
            specialty: "",
            department: "",
        });
    };

    // =====================================================
    // TOGGLE STATUS WITH CONFIRMATION
    // =====================================================

    const handleToggleStatus = (doctorId) => {
        const doctor = doctors.find(
            (item) => item.id === doctorId
        );

        if (!doctor) {
            return;
        }

        const newStatus =
            doctor.status === "Active"
                ? "Inactive"
                : "Active";

        const confirmChange = window.confirm(
            `Are you sure you want to set ${doctor.name} as ${newStatus}?`
        );

        if (!confirmChange) {
            return;
        }

        setDoctors((previous) =>
            previous.map((item) =>
                item.id === doctorId
                    ? {
                        ...item,
                        status: newStatus,
                    }
                    : item
            )
        );

        setOpenMenu(null);
    };

    // =====================================================
    // DELETE DOCTOR WITH CONFIRMATION
    // =====================================================

    const handleDeleteDoctor = (doctorId) => {
        const doctor = doctors.find(
            (item) => item.id === doctorId
        );

        if (!doctor) {
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${doctor.name}?`
        );

        if (!confirmDelete) {
            return;
        }

        setDoctors((previous) =>
            previous.filter(
                (item) => item.id !== doctorId
            )
        );

        setOpenMenu(null);
    };

    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const handleCloseModal = () => {
        setShowModal(false);

        setEditingDoctor(null);

        setFormData({
            name: "",
            specialty: "",
            department: "",
        });
    };

    // =====================================================
    // ACTION DROPDOWN COMPONENT
    // =====================================================

    const ActionDropdown = ({ doctor }) => {
        if (openMenu !== doctor.id) {
            return null;
        }

        return createPortal(
            <div
                data-doctor-action
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
                style={{
                    position: "fixed",
                    top: `${menuPosition.top}px`,
                    right: `${menuPosition.right}px`,
                }}
                className="z-[99999] w-44 overflow-hidden rounded-xl border border-[#dcebf5] bg-white py-1 shadow-[0_15px_40px_rgba(41,75,104,0.20)]"
            >

                {/* EDIT */}

                <button
                    type="button"
                    data-doctor-action
                    onMouseDown={(event) =>
                        event.stopPropagation()
                    }
                    onClick={() =>
                        handleEditDoctor(doctor)
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#294b68] transition hover:bg-[#f8fbfd] hover:text-[#1976c8]"
                >
                    <Pencil size={16} />

                    Edit
                </button>

                {/* TOGGLE STATUS */}

                <button
                    type="button"
                    data-doctor-action
                    onMouseDown={(event) =>
                        event.stopPropagation()
                    }
                    onClick={() =>
                        handleToggleStatus(doctor.id)
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#294b68] transition hover:bg-[#f8fbfd] hover:text-[#1976c8]"
                >
                    <Power size={16} />

                    {doctor.status === "Active"
                        ? "Set Inactive"
                        : "Set Active"}
                </button>

                {/* DELETE */}

                <button
                    type="button"
                    data-doctor-action
                    onMouseDown={(event) =>
                        event.stopPropagation()
                    }
                    onClick={() =>
                        handleDeleteDoctor(doctor.id)
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                    <Trash2 size={16} />

                    Delete
                </button>

            </div>,

            document.body
        );
    };

    return (
        <div className="space-y-6">

            {/* =====================================================
                PAGE HEADER
                ===================================================== */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="!m-0 !text-2xl !font-bold !text-[#294b68] sm:!text-3xl">
                        Doctors
                    </h1>

                    <p className="!mb-0 mt-1.5 text-sm text-gray-500">
                        Manage hospital doctors and their departments.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={handleAddDoctor}
                    className="flex items-center justify-center gap-2 !rounded-xl bg-[#1976c8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1565a8] hover:shadow-md"
                >

                    <Plus
                        size={18}
                        strokeWidth={2.2}
                    />

                    Add Doctor

                </button>

            </div>

            {/* =====================================================
                SEARCH & FILTER
                ===================================================== */}

            <div className="rounded-2xl border border-[#dcebf5] bg-white p-4 shadow-[0_4px_20px_rgba(41,75,104,0.04)]">

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    {/* SEARCH */}

                    <div className="relative w-full md:max-w-md">

                        <Search
                            size={18}
                            strokeWidth={2}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                            placeholder="Search doctors..."
                            className="w-full rounded-xl border border-[#dcebf5] bg-[#f8fbfd] py-3 pl-11 pr-4 text-sm text-[#294b68] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                        />

                    </div>

                    {/* DEPARTMENT FILTER */}

                    <select
                        value={departmentFilter}
                        onChange={(event) =>
                            setDepartmentFilter(
                                event.target.value
                            )
                        }
                        className="w-full rounded-xl border border-[#dcebf5] bg-[#f8fbfd] px-4 py-3 text-sm font-medium text-[#294b68] outline-none transition-all duration-200 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10 md:w-auto"
                    >

                        <option>
                            All Departments
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department}
                                value={department}
                            >
                                {department}
                            </option>
                        ))}

                    </select>

                </div>

            </div>

            {/* =====================================================
                DOCTORS LIST CONTAINER
                ===================================================== */}

            <div className="relative z-10 overflow-hidden rounded-2xl border border-[#dcebf5] bg-white shadow-[0_4px_20px_rgba(41,75,104,0.04)]">

                {/* =================================================
                    DESKTOP TABLE
                    ================================================= */}

                <div className="hidden h-[610px] overflow-auto md:block">

                    <table className="w-full min-w-[800px] text-left">

                        {/* STICKY TABLE HEADER */}

                        <thead className="sticky top-0 z-20">

                            <tr className="border-b border-[#edf3f7] bg-[#f8fbfd]">

                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[#294b68]">
                                    Doctor
                                </th>

                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[#294b68]">
                                    Specialty
                                </th>

                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[#294b68]">
                                    Department
                                </th>

                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[#294b68]">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-[#294b68]">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredDoctors.length > 0 ? (

                                filteredDoctors.map((doctor) => (

                                    <tr
                                        key={doctor.id}
                                        className="border-b border-[#edf3f7] transition-all duration-200 last:border-b-0 hover:bg-[#f8fbfd]"
                                    >

                                        {/* DOCTOR */}

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] shadow-sm">

                                                    <Stethoscope
                                                        size={20}
                                                        strokeWidth={2}
                                                    />

                                                </div>

                                                <div>

                                                    <p className="!mb-0 text-sm font-bold text-[#294b68]">
                                                        {doctor.name}
                                                    </p>

                                                    <p className="!mb-0 mt-1 text-xs text-gray-400">
                                                        Doctor ID: DOC-
                                                        {doctor.id
                                                            .toString()
                                                            .padStart(3, "0")}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* SPECIALTY */}

                                        <td className="px-6 py-5">

                                            <span className="text-sm font-medium text-gray-600">
                                                {doctor.specialty}
                                            </span>

                                        </td>

                                        {/* DEPARTMENT */}

                                        <td className="px-6 py-5">

                                            <span className="text-sm text-gray-500">
                                                {doctor.department}
                                            </span>

                                        </td>

                                        {/* STATUS */}

                                        <td className="px-6 py-5">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleToggleStatus(
                                                        doctor.id
                                                    )
                                                }
                                                className={`inline-flex items-center gap-1.5 !rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${doctor.status ===
                                                    "Active"
                                                    ? "bg-green-50 text-green-600 hover:bg-green-100"
                                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                                    }`}
                                            >

                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${doctor.status ===
                                                        "Active"
                                                        ? "bg-green-500"
                                                        : "bg-gray-400"
                                                        }`}
                                                ></span>

                                                {doctor.status}

                                            </button>

                                        </td>

                                        {/* ACTION */}

                                        <td className="px-6 py-5">

                                            <div
                                                data-doctor-action
                                                className="relative inline-block"
                                            >

                                                <button
                                                    type="button"
                                                    data-doctor-action
                                                    onClick={(event) =>
                                                        handleActionMenu(
                                                            doctor.id,
                                                            event
                                                        )
                                                    }
                                                    className={`relative z-50 flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all duration-200 ${openMenu ===
                                                        doctor.id
                                                        ? "bg-[#eaf5fb] text-[#1976c8]"
                                                        : "hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                                                        }`}
                                                >

                                                    <MoreVertical
                                                        size={19}
                                                        strokeWidth={2}
                                                    />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-6 py-12 text-center"
                                    >

                                        <div className="flex flex-col items-center">

                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf5fb] text-[#1976c8]">

                                                <Stethoscope size={25} />

                                            </div>

                                            <p className="!mb-0 mt-4 text-sm font-semibold text-[#294b68]">
                                                No doctors found
                                            </p>

                                            <p className="!mb-0 mt-1 text-xs text-gray-400">
                                                Try changing your search or filter.
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* =================================================
                    MOBILE CARDS
                    ================================================= */}

                <div className="divide-y divide-[#edf3f7] md:hidden">

                    {filteredDoctors.length > 0 ? (

                        filteredDoctors.map((doctor) => (

                            <div
                                key={doctor.id}
                                className="relative p-5 transition-all duration-200 hover:bg-[#f8fbfd]"
                            >

                                <div className="flex items-start justify-between gap-3">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] shadow-sm">

                                            <Stethoscope
                                                size={20}
                                                strokeWidth={2}
                                            />

                                        </div>

                                        <div>

                                            <p className="!mb-0 text-sm font-bold text-[#294b68]">
                                                {doctor.name}
                                            </p>

                                            <p className="!mb-0 mt-1 text-xs text-gray-400">
                                                DOC-
                                                {doctor.id
                                                    .toString()
                                                    .padStart(3, "0")}
                                            </p>

                                        </div>

                                    </div>

                                    {/* MOBILE ACTION */}

                                    <div
                                        data-doctor-action
                                        className="relative"
                                    >

                                        <button
                                            type="button"
                                            data-doctor-action
                                            onClick={(event) =>
                                                handleActionMenu(
                                                    doctor.id,
                                                    event
                                                )
                                            }
                                            className={`relative z-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition-all duration-200 ${openMenu ===
                                                doctor.id
                                                ? "bg-[#eaf5fb] text-[#1976c8]"
                                                : "hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                                                }`}
                                        >

                                            <MoreVertical
                                                size={19}
                                            />

                                        </button>

                                    </div>

                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                    <div>

                                        <p className="!mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                            Specialty
                                        </p>

                                        <p className="!mb-0 text-sm font-medium text-gray-600">
                                            {doctor.specialty}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="!mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                            Department
                                        </p>

                                        <p className="!mb-0 text-sm text-gray-500">
                                            {doctor.department}
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-4">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleToggleStatus(
                                                doctor.id
                                            )
                                        }
                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${doctor.status ===
                                            "Active"
                                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                            }`}
                                    >

                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${doctor.status ===
                                                "Active"
                                                ? "bg-green-500"
                                                : "bg-gray-400"
                                                }`}
                                        ></span>

                                        {doctor.status}

                                    </button>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="px-5 py-12 text-center">

                            <div className="flex flex-col items-center">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf5fb] text-[#1976c8]">

                                    <Stethoscope size={25} />

                                </div>

                                <p className="!mb-0 mt-4 text-sm font-semibold text-[#294b68]">
                                    No doctors found
                                </p>

                                <p className="!mb-0 mt-1 text-xs text-gray-400">
                                    Try changing your search or filter.
                                </p>

                            </div>

                        </div>

                    )}

                </div>

            </div>

            {/* =====================================================
                ACTION DROPDOWN
                RENDERED OUTSIDE TABLE USING PORTAL
                ===================================================== */}

            {openMenu !== null && (
                <ActionDropdown
                    doctor={doctors.find(
                        (doctor) =>
                            doctor.id === openMenu
                    )}
                />
            )}

            {/* =====================================================
                ADD / EDIT DOCTOR MODAL
                ===================================================== */}

            {showModal && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102a43]/40 px-4 backdrop-blur-sm">

                    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#dcebf5] bg-white shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between border-b border-[#edf3f7] px-6 py-5">

                            <div>

                                <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                                    {editingDoctor
                                        ? "Edit Doctor"
                                        : "Add Doctor"}
                                </h2>

                                <p className="!mb-0 mt-1 text-xs text-gray-400">
                                    {editingDoctor
                                        ? "Update doctor information."
                                        : "Add a new doctor to the hospital."}
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                            >

                                <X size={19} />

                            </button>

                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={handleSaveDoctor}
                            className="space-y-5 p-6"
                        >

                            {/* NAME */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Doctor Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter doctor name"
                                    className="w-full rounded-xl border border-[#dcebf5] bg-[#f8fbfd] px-4 py-3 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                />

                            </div>

                            {/* SPECIALTY */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Specialty
                                </label>

                                <input
                                    type="text"
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleInputChange}
                                    placeholder="Enter specialty"
                                    className="w-full rounded-xl border border-[#dcebf5] bg-[#f8fbfd] px-4 py-3 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                />

                            </div>

                            {/* DEPARTMENT */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Department
                                </label>

                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-[#dcebf5] bg-[#f8fbfd] px-4 py-3 text-sm font-medium text-[#294b68] outline-none transition focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                >

                                    <option value="">
                                        Select Department
                                    </option>

                                    {departments.map(
                                        (department) => (
                                            <option
                                                key={department}
                                                value={department}
                                            >
                                                {department}
                                            </option>
                                        )
                                    )}

                                </select>

                            </div>

                            {/* BUTTONS */}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="!rounded-xl border border-[#dcebf5] px-5 py-3 text-sm font-semibold text-[#294b68] transition hover:bg-[#f8fbfd]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="!rounded-xl bg-[#1976c8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1565a8]"
                                >
                                    {editingDoctor
                                        ? "Update Doctor"
                                        : "Add Doctor"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Doctors;