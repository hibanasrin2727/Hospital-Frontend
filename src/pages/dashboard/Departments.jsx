
import {
    Search,
    Plus,
    MoreVertical,
    Building2,
    Users,
    Pencil,
    Trash2,
    Power,
    X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Departments = () => {

    // =====================================================
    // API URL
    // =====================================================

    const API_URL =
        "http://localhost:5000/api/dashboard/departments";


    // =====================================================
    // DOCTOR API URL
    // =====================================================

    const DOCTOR_API_URL =
        "http://localhost:5000/api/dashboard/doctors";


    // =====================================================
    // DEPARTMENT DATA
    // =====================================================

    const [departments, setDepartments] = useState([]);


    // =====================================================
    // DOCTOR COUNT DATA
    // =====================================================

    const [doctorCounts, setDoctorCounts] = useState({});


    // =====================================================
    // STATES
    // =====================================================

    const [search, setSearch] = useState("");

    const [openMenu, setOpenMenu] = useState(null);

    const [menuPosition, setMenuPosition] = useState({
        top: 0,
        right: 0,
    });

    const [showModal, setShowModal] = useState(false);

    const [editingDepartment, setEditingDepartment] = useState(null);

    const [deleteDepartment, setDeleteDepartment] = useState(null);

    const [statusDepartment, setStatusDepartment] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    // =====================================================
    // FORM
    // =====================================================

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });


    // =====================================================
    // GET TOKEN
    // =====================================================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // =====================================================
    // FETCH DEPARTMENTS
    // =====================================================

    const fetchDepartments = async () => {

        try {

            setLoading(true);

            setError("");

            const token = getToken();

            if (!token) {

                setError(
                    "Authentication token not found. Please login again."
                );

                return;
            }


            const response = await fetch(API_URL, {
                method: "GET",

                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to fetch departments"
                );

            }


            setDepartments(data.departments || []);

        } catch (error) {

            console.error(
                "Fetch departments error:",
                error
            );

            setError(
                error.message ||
                "Something went wrong while loading departments."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // FETCH DOCTORS AND CALCULATE DEPARTMENT COUNTS
    // =====================================================

    const fetchDoctorCounts = async () => {

        try {

            const token = getToken();

            if (!token) {
                return;
            }


            const response = await fetch(
                DOCTOR_API_URL,
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",
                    },
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to fetch doctors"
                );

            }


            const doctors =
                data.doctors || [];


            // =================================================
            // COUNT DOCTORS BY DEPARTMENT
            // =================================================

            const counts = {};


            doctors.forEach((doctor) => {

                let departmentId = null;


                if (
                    doctor.departmentId &&
                    typeof doctor.departmentId === "object"
                ) {

                    departmentId =
                        doctor.departmentId._id;

                } else {

                    departmentId =
                        doctor.departmentId;

                }


                if (departmentId) {

                    const id =
                        String(departmentId);


                    counts[id] =
                        (counts[id] || 0) + 1;

                }

            });


            setDoctorCounts(counts);


        } catch (error) {

            console.error(
                "Fetch doctor counts error:",
                error
            );

            // Do not break department page
            // if doctor count request fails.

            setDoctorCounts({});

        }

    };


    // =====================================================
    // GET DOCTOR COUNT
    // =====================================================

    const getDoctorCount = (departmentId) => {

        if (!departmentId) {
            return 0;
        }


        return (
            doctorCounts[String(departmentId)] || 0
        );

    };


    // =====================================================
    // FETCH ON PAGE LOAD
    // =====================================================

    useEffect(() => {

        fetchDepartments();

        fetchDoctorCounts();

    }, []);


    // =====================================================
    // FILTER
    // =====================================================

    const filteredDepartments = departments.filter(
        (department) => {

            const searchText =
                search.toLowerCase();

            return (
                department.name
                    ?.toLowerCase()
                    .includes(searchText) ||

                department.description
                    ?.toLowerCase()
                    .includes(searchText)
            );

        }
    );


    // =====================================================
    // CLOSE MENU ON OUTSIDE CLICK
    // =====================================================

    useEffect(() => {

        const handleClickOutside = (event) => {

            const clickedInsideAction =
                event.target.closest(
                    "[data-department-action]"
                );


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
    // CLOSE MENU ON SCROLL / RESIZE
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
    // OPEN ACTION MENU
    // =====================================================

    const handleActionMenu = (
        departmentId,
        event
    ) => {

        if (openMenu === departmentId) {

            setOpenMenu(null);

            return;

        }


        const buttonRect =
            event.currentTarget.getBoundingClientRect();


        const menuWidth = 176;

        const menuHeight = 150;

        const gap = 8;

        const screenPadding = 8;


        const spaceBelow =
            window.innerHeight -
            buttonRect.bottom;


        const spaceAbove =
            buttonRect.top;


        let top;


        if (
            spaceBelow >=
            menuHeight + gap
        ) {

            top =
                buttonRect.bottom +
                gap;

        } else if (
            spaceAbove >=
            menuHeight + gap
        ) {

            top =
                buttonRect.top -
                menuHeight -
                gap;

        } else {

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


        let right =
            window.innerWidth -
            buttonRect.right;


        if (
            right + menuWidth >
            window.innerWidth -
            screenPadding
        ) {

            right =
                screenPadding;

        }


        if (
            right <
            screenPadding
        ) {

            right =
                screenPadding;

        }


        setMenuPosition({
            top,
            right,
        });


        setOpenMenu(departmentId);

    };


    // =====================================================
    // OPEN ADD MODAL
    // =====================================================

    const handleAddDepartment = () => {

        setEditingDepartment(null);

        setFormData({
            name: "",
            description: "",
        });

        setShowModal(true);

    };


    // =====================================================
    // OPEN EDIT MODAL
    // =====================================================

    const handleEditDepartment = (
        department
    ) => {

        setEditingDepartment(department);

        setFormData({
            name: department.name || "",
            description:
                department.description || "",
        });

        setOpenMenu(null);

        setShowModal(true);

    };


    // =====================================================
    // FORM INPUT
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;


        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // =====================================================
    // SAVE DEPARTMENT
    // CREATE / UPDATE
    // =====================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!formData.name.trim()) {
            return;
        }


        if (!formData.description.trim()) {
            return;
        }


        try {

            setSaving(true);

            setError("");


            const token = getToken();


            if (!token) {

                setError(
                    "Authentication token not found. Please login again."
                );

                return;

            }


            // =============================================
            // UPDATE
            // =============================================

            if (editingDepartment) {

                const response = await fetch(
                    `${API_URL}/${editingDepartment._id}`,
                    {
                        method: "PUT",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({

                            name:
                                formData.name.trim(),

                            description:
                                formData.description.trim(),

                        }),

                    }
                );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to update department"
                    );

                }


                setDepartments(
                    (previous) =>
                        previous.map(
                            (department) =>
                                department._id ===
                                    editingDepartment._id
                                    ? data.department
                                    : department
                        )
                );

            }


            // =============================================
            // CREATE
            // =============================================

            else {

                const response = await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({

                            name:
                                formData.name.trim(),

                            description:
                                formData.description.trim(),

                        }),

                    }
                );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to create department"
                    );

                }


                setDepartments(
                    (previous) => [
                        data.department,
                        ...previous,
                    ]
                );

            }


            // =============================================
            // RESET
            // =============================================

            setShowModal(false);

            setEditingDepartment(null);

            setFormData({
                name: "",
                description: "",
            });

        } catch (error) {

            console.error(
                "Save department error:",
                error
            );

            setError(
                error.message ||
                "Something went wrong."
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // DELETE DEPARTMENT
    // =====================================================

    const handleDelete = async () => {

        if (!deleteDepartment) {
            return;
        }


        try {

            setSaving(true);

            setError("");


            const token = getToken();


            if (!token) {

                setError(
                    "Authentication token not found. Please login again."
                );

                return;

            }


            const response = await fetch(
                `${API_URL}/${deleteDepartment._id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",
                    },
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to delete department"
                );

            }


            // Remove from UI

            setDepartments(
                (previous) =>
                    previous.filter(
                        (department) =>
                            department._id !==
                            deleteDepartment._id
                    )
            );


            // Remove doctor count

            setDoctorCounts((previous) => {

                const updated = {
                    ...previous,
                };


                delete updated[
                    String(deleteDepartment._id)
                ];


                return updated;

            });


            setDeleteDepartment(null);

        } catch (error) {

            console.error(
                "Delete department error:",
                error
            );

            setError(
                error.message ||
                "Something went wrong while deleting."
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // TOGGLE STATUS
    // =====================================================

    const handleStatusChange = async () => {

        if (!statusDepartment) {
            return;
        }


        try {

            setSaving(true);

            setError("");


            const token = getToken();


            if (!token) {

                setError(
                    "Authentication token not found. Please login again."
                );

                return;

            }


            const newStatus =
                statusDepartment.status === "active"
                    ? "inactive"
                    : "active";


            const response = await fetch(
                `${API_URL}/${statusDepartment._id}`,
                {
                    method: "PUT",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to change department status"
                );

            }


            setDepartments(
                (previous) =>
                    previous.map(
                        (department) =>
                            department._id ===
                                statusDepartment._id
                                ? data.department
                                : department
                    )
            );


            setStatusDepartment(null);

        } catch (error) {

            console.error(
                "Status change error:",
                error
            );

            setError(
                error.message ||
                "Something went wrong while changing status."
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // ACTION DROPDOWN
    // =====================================================

    const ActionDropdown = ({
        department,
    }) => {

        if (
            !department ||
            openMenu !== department._id
        ) {

            return null;

        }


        return createPortal(

            <div
                data-department-action
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
                style={{
                    position: "fixed",
                    top:
                        `${menuPosition.top}px`,
                    right:
                        `${menuPosition.right}px`,
                }}
                className="z-[99999] w-44 overflow-hidden rounded-xl border border-[#dcebf5] bg-white py-1 shadow-[0_15px_40px_rgba(41,75,104,0.20)]"
            >

                {/* EDIT */}

                <button
                    type="button"
                    onClick={() =>
                        handleEditDepartment(
                            department
                        )
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#294b68] transition hover:bg-[#f7fafc] hover:text-[#1976c8]"
                >

                    <Pencil size={16} />

                    <span>
                        Edit
                    </span>

                </button>


                {/* STATUS */}

                <button
                    type="button"
                    onClick={() => {

                        setStatusDepartment(
                            department
                        );

                        setOpenMenu(null);

                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#294b68] transition hover:bg-[#f7fafc] hover:text-[#1976c8]"
                >

                    <Power size={16} />

                    <span>
                        {department.status === "active"
                            ? "Set Inactive"
                            : "Set Active"}
                    </span>

                </button>


                {/* DELETE */}

                <button
                    type="button"
                    onClick={() => {

                        setDeleteDepartment(
                            department
                        );

                        setOpenMenu(null);

                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >

                    <Trash2 size={16} />

                    <span>
                        Delete
                    </span>

                </button>

            </div>,

            document.body

        );

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="flex min-h-[400px] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#eaf5fb] border-t-[#1976c8]" />

                    <p className="mt-4 text-sm text-gray-500">
                        Loading departments...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // MAIN UI
    // =====================================================

    return (

        <div className="space-y-6">


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="min-w-0">

                    <h1 className="!m-0 !text-2xl !font-bold !text-[#294b68]">
                        Departments
                    </h1>

                    <p className="!mb-0 mt-1 text-sm text-gray-500">
                        Manage hospital departments and their doctors.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={handleAddDepartment}
                    className="flex shrink-0 items-center justify-center gap-2 !rounded-lg bg-[#1976c8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]"
                >

                    <Plus size={18} />

                    Add Department

                </button>

            </div>


            {/* =====================================================
                ERROR
            ===================================================== */}

            {error && (

                <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">

                    <span>
                        {error}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                        className="ml-4"
                    >

                        <X size={18} />

                    </button>

                </div>

            )}


            {/* =====================================================
                SEARCH + FILTER
            ===================================================== */}

            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    {/* SEARCH */}

                    <div className="relative w-full md:max-w-md">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search departments..."
                            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                        />

                    </div>


                    {/* FILTER / RESULT COUNT */}

                    <div className="flex items-center justify-between gap-3">

                        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500">

                            <span className="font-semibold text-[#294b68]">
                                {filteredDepartments.length}
                            </span>

                            <span className="ml-1">
                                Departments
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                DEPARTMENT CARDS
            ===================================================== */}

            <div className="overflow-hidden rounded-xl">

                <div
                    className="
                        grid
                        max-h-[calc(100vh-310px)]
                        min-h-[300px]
                        grid-cols-1
                        gap-2
                        overflow-y-auto
                        pr-1
                        md:grid-cols-2
                        xl:grid-cols-4

                        [&::-webkit-scrollbar]:w-1.5
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-[#cfe5f5]
                        hover:[&::-webkit-scrollbar-thumb]:bg-[#1976c8]
                    "
                >

                    {filteredDepartments.map(
                        (department) => (

                            <div
                                key={department._id}
                                className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]"
                            >

                                {/* TOP */}

                                <div className="flex items-start justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#1976c8] group-hover:text-white">

                                        <Building2
                                            size={23}
                                        />

                                    </div>


                                    <div
                                        data-department-action
                                        className="relative"
                                    >

                                        <button
                                            type="button"
                                            onClick={(event) =>
                                                handleActionMenu(
                                                    department._id,
                                                    event
                                                )
                                            }
                                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#1976c8]"
                                        >

                                            <MoreVertical
                                                size={19}
                                            />

                                        </button>

                                    </div>

                                </div>


                                {/* DEPARTMENT NAME */}

                                <div className="mt-5">

                                    <h2 className="!m-0 !text-lg !font-bold !text-[#294b68] transition-colors duration-300 group-hover:text-[#1976c8]">
                                        {department.name}
                                    </h2>

                                    <p className="!mb-0 mt-1 text-sm text-gray-500">
                                        {department.description}
                                    </p>

                                </div>


                                {/* DETAILS */}

                                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                                    <div className="flex items-center gap-2 text-sm text-gray-500">

                                        <Users
                                            size={17}
                                        />

                                        <span>
                                            {getDoctorCount(
                                                department._id
                                            )} Doctors
                                        </span>

                                    </div>


                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${department.status === "active"
                                                ? "bg-green-50 text-green-600"
                                                : "bg-gray-100 text-gray-500"
                                            }`}
                                    >

                                        {department.status ===
                                            "active"
                                            ? "Active"
                                            : "Inactive"}

                                    </span>

                                </div>


                                {/* BLUE HOVER LINE */}

                                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

                            </div>

                        )
                    )}

                </div>

            </div>


            {/* =====================================================
                EMPTY SEARCH RESULT
            ===================================================== */}

            {filteredDepartments.length === 0 && (

                <div className="rounded-2xl border border-dashed border-[#dcebf5] bg-white px-6 py-12 text-center">

                    <Building2
                        size={40}
                        className="mx-auto text-gray-300"
                    />

                    <h3 className="!mb-0 mt-4 text-base font-bold text-[#294b68]">
                        No departments found
                    </h3>

                    <p className="!mb-0 mt-1 text-sm text-gray-400">

                        {search
                            ? "Try searching with a different department name."
                            : "Add your first hospital department."}

                    </p>

                </div>

            )}


            {/* =====================================================
                ACTION DROPDOWN
            ===================================================== */}

            {openMenu !== null && (

                <ActionDropdown
                    department={
                        departments.find(
                            (department) =>
                                department._id ===
                                openMenu
                        )
                    }
                />

            )}


            {/* =====================================================
                ADD / EDIT MODAL
            ===================================================== */}

            {showModal && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#dcebf5] bg-white shadow-[0_20px_60px_rgba(41,75,104,0.20)]">


                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between border-b border-[#edf3f7] px-6 py-5">

                            <div>

                                <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">

                                    {editingDepartment
                                        ? "Edit Department"
                                        : "Add Department"}

                                </h2>

                                <p className="!mb-0 mt-1 text-xs text-gray-400">
                                    Enter department information below.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setShowModal(false)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                            >

                                <X size={19} />

                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-6"
                        >


                            {/* NAME */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Department Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        formData.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter department name"
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter department description"
                                    rows="3"
                                    required
                                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                                />

                            </div>


                            {/* BUTTONS */}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    disabled={saving}
                                    className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="!rounded-xl bg-[#1976c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8] disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    {saving
                                        ? "Saving..."
                                        : editingDepartment
                                        ? "Update Department"
                                        : "Add Department"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* =====================================================
                STATUS CONFIRMATION
            ===================================================== */}

            {statusDepartment && (

                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">


                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">

                            <Power size={22} />

                        </div>


                        <h2 className="!mb-0 mt-4 !text-lg !font-bold !text-[#294b68]">
                            Change Department Status?
                        </h2>


                        <p className="!mb-0 mt-2 text-sm leading-6 text-gray-500">

                            Are you sure you want to set{" "}

                            <span className="font-semibold text-[#294b68]">
                                {statusDepartment.name}
                            </span>{" "}

                            to{" "}

                            {statusDepartment.status ===
                                "active"
                                ? "Inactive"
                                : "Active"}?

                        </p>


                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setStatusDepartment(null)
                                }
                                disabled={saving}
                                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                onClick={
                                    handleStatusChange
                                }
                                disabled={saving}
                                className="!rounded-xl bg-[#1976c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8] disabled:opacity-60"
                            >

                                {saving
                                    ? "Updating..."
                                    : "Confirm"}

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =====================================================
                DELETE CONFIRMATION
            ===================================================== */}

            {deleteDepartment && (

                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">


                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">

                            <Trash2 size={22} />

                        </div>


                        <h2 className="!mb-0 mt-4 !text-lg !font-bold !text-[#294b68]">
                            Delete Department?
                        </h2>


                        <p className="!mb-0 mt-2 text-sm leading-6 text-gray-500">

                            Are you sure you want to delete{" "}

                            <span className="font-semibold text-[#294b68]">
                                {deleteDepartment.name}
                            </span>

                            ? This action cannot be undone.

                        </p>


                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteDepartment(null)
                                }
                                disabled={saving}
                                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={saving}
                                className="!rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                {saving
                                    ? "Deleting..."
                                    : "Delete Department"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};

export default Departments;
