
import {
    Search,
    Plus,
    MoreVertical,
    Stethoscope,
    Pencil,
    Trash2,
    Power,
    X,
    CheckCircle2,
    Upload,
    Image as ImageIcon,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import { createPortal } from "react-dom";

const Doctors = () => {

    // =====================================================
    // DOCTORS DATA
    // =====================================================

    const [doctors, setDoctors] = useState([]);

    const [departments, setDepartments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    // =====================================================
    // API CONFIGURATION
    // =====================================================

    const API_URL =
        "http://localhost:5000/api/dashboard";

    const BACKEND_URL =
        "http://localhost:5000";

    // =====================================================
    // AUTH HEADERS
    // =====================================================

    const getAuthHeaders = () => {
        const token =
            localStorage.getItem("token");

        return {
            Authorization:
                `Bearer ${token}`,
        };
    };

    // =====================================================
    // IMAGE URL HELPER
    // =====================================================

    const getImageUrl = (image) => {

        if (!image) {
            return "";
        }

        if (
            image.startsWith("http://") ||
            image.startsWith("https://") ||
            image.startsWith("data:")
        ) {
            return image;
        }

        if (image.startsWith("/")) {
            return `${BACKEND_URL}${image}`;
        }

        return `${BACKEND_URL}/${image}`;
    };

    // =====================================================
    // CONVERT BACKEND DOCTOR TO FRONTEND FORMAT
    // =====================================================

    const formatDoctor = (doctor) => ({

        ...doctor,

        id:
            doctor._id,

        specialty:
            doctor.specialization || "",

        department:
            doctor.departmentId?.name ||
            doctor.departmentId?.departmentName ||
            "",

        image:
            doctor.image || "",

        status:
            doctor.status === "active"
                ? "Active"
                : "Inactive",

    });

    // =====================================================
    // LOAD DOCTORS
    // =====================================================

    const fetchDoctors = async () => {

        try {

            setLoading(true);

            setErrorMessage("");

            const response =
                await fetch(
                    `${API_URL}/doctors`,
                    {
                        method: "GET",
                        headers:
                            getAuthHeaders(),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to load doctors."
                );
            }

            setDoctors(
                (data.doctors || [])
                    .map(formatDoctor)
            );

        } catch (error) {

            console.error(
                "Error loading doctors:",
                error
            );

            setErrorMessage(
                error.message ||
                "Failed to load doctors."
            );

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // LOAD DEPARTMENTS
    // =====================================================

    const fetchDepartments = async () => {

        try {

            const response =
                await fetch(
                    `${API_URL}/departments`,
                    {
                        method: "GET",
                        headers:
                            getAuthHeaders(),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to load departments."
                );
            }

            setDepartments(
                data.departments || []
            );

        } catch (error) {

            console.error(
                "Error loading departments:",
                error
            );
        }
    };

    // =====================================================
    // LOAD DATA ON PAGE OPEN
    // =====================================================

    useEffect(() => {

        fetchDoctors();

        fetchDepartments();

    }, []);

    // =====================================================
    // SEARCH / FILTER STATES
    // =====================================================

    const [searchTerm, setSearchTerm] =
        useState("");

    const [
        departmentFilter,
        setDepartmentFilter,
    ] = useState("All Departments");

    // =====================================================
    // ACTION MENU STATES
    // =====================================================

    const [openMenu, setOpenMenu] =
        useState(null);

    const [
        menuPosition,
        setMenuPosition,
    ] = useState({
        top: 0,
        right: 0,
    });

    // =====================================================
    // MODAL STATES
    // =====================================================

    const [showModal, setShowModal] =
        useState(false);

    const [editingDoctor, setEditingDoctor] =
        useState(null);

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] =
        useState({
            name: "",
            specialty: "",
            departmentId: "",
            qualification: "",
            experience: "",
            phone: "",
            email: "",
            schedule: "",
        });

    // =====================================================
    // IMAGE STATES
    // =====================================================

    const [selectedImage, setSelectedImage] =
        useState(null);

    const [imagePreview, setImagePreview] =
        useState("");

    // =====================================================
    // SAVING STATE
    // =====================================================

    const [saving, setSaving] =
        useState(false);

    // =====================================================
    // SEARCHABLE DEPARTMENT / SPECIALTY STATES
    // =====================================================

    const [
        departmentSearch,
        setDepartmentSearch,
    ] = useState("");

    const [
        showDepartmentOptions,
        setShowDepartmentOptions,
    ] = useState(false);

    const [
        specialtySearch,
        setSpecialtySearch,
    ] = useState("");

    const [
        showSpecialtyOptions,
        setShowSpecialtyOptions,
    ] = useState(false);

    // =====================================================
    // CONFIRMATION STATES
    // =====================================================

    const [statusDoctor, setStatusDoctor] =
        useState(null);

    const [deleteDoctor, setDeleteDoctor] =
        useState(null);

    // =====================================================
    // DEPARTMENT OPTIONS
    // =====================================================

    const defaultDepartments = [
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Dermatology",
        "Pediatrics",
        "Gynecology",
        "Obstetrics",
        "General Medicine",
        "General Surgery",
        "ENT",
        "Ophthalmology",
        "Urology",
        "Nephrology",
        "Gastroenterology",
        "Pulmonology",
        "Oncology",
        "Psychiatry",
        "Radiology",
        "Anesthesiology",
        "Emergency Medicine",
        "Dentistry",
        "Endocrinology",
        "Rheumatology",
        "Pathology",
        "Physiotherapy",
        "Internal Medicine",
        "Neurosurgery",
        "Plastic Surgery",
        "Cardiothoracic Surgery",
    ];

    // =====================================================
    // SPECIALTY OPTIONS
    // =====================================================

    const specialtyOptions = [
        "Cardiologist",
        "Neurologist",
        "Orthopedic Surgeon",
        "Dermatologist",
        "Pediatrician",
        "Gynecologist",
        "Obstetrician",
        "General Physician",
        "General Surgeon",
        "ENT Specialist",
        "Ophthalmologist",
        "Urologist",
        "Nephrologist",
        "Gastroenterologist",
        "Pulmonologist",
        "Oncologist",
        "Psychiatrist",
        "Radiologist",
        "Anesthesiologist",
        "Emergency Medicine Specialist",
        "Dentist",
        "Endocrinologist",
        "Rheumatologist",
        "Pathologist",
        "Physiotherapist",
        "Neurosurgeon",
        "Plastic Surgeon",
        "Cardiothoracic Surgeon",
    ];

    // =====================================================
    // COMBINE BACKEND + DEFAULT DEPARTMENTS
    // =====================================================

    const availableDepartments = [
        ...departments.map(
            (department) => ({
                id: department._id,
                name: department.name,
                isBackend: true,
            })
        ),

        ...defaultDepartments.map(
            (name) => ({
                id: `default-${name}`,
                name,
                isBackend: false,
            })
        ),

    ].filter(
        (department, index, array) =>
            array.findIndex(
                (item) =>
                    item.name.toLowerCase() ===
                    department.name.toLowerCase()
            ) === index
    );

    // =====================================================
    // FILTER DEPARTMENT OPTIONS
    // =====================================================

    const filteredDepartmentOptions =
        availableDepartments.filter(
            (department) =>
                department.name
                    .toLowerCase()
                    .includes(
                        departmentSearch
                            .toLowerCase()
                    )
        );

    // =====================================================
    // FILTER SPECIALTY OPTIONS
    // =====================================================

    const filteredSpecialtyOptions =
        specialtyOptions.filter(
            (specialty) =>
                specialty
                    .toLowerCase()
                    .includes(
                        specialtySearch
                            .toLowerCase()
                    )
        );

    // =====================================================
    // CLOSE ACTION MENU WHEN CLICKING OUTSIDE
    // =====================================================

    useEffect(() => {

        const handleClickOutside =
            (event) => {

                const clickedInsideAction =
                    event.target.closest(
                        "[data-doctor-action]"
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
    // CLOSE ACTION MENU ON SCROLL / RESIZE
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
    // SEARCH + FILTER
    // =====================================================

    const filteredDoctors =
        doctors.filter((doctor) => {

            const search =
                searchTerm.toLowerCase();

            const matchesSearch =
                doctor.name
                    .toLowerCase()
                    .includes(search) ||

                doctor.specialty
                    .toLowerCase()
                    .includes(search) ||

                doctor.department
                    .toLowerCase()
                    .includes(search);

            const matchesDepartment =
                departmentFilter ===
                "All Departments" ||

                doctor.department ===
                departmentFilter;

            return (
                matchesSearch &&
                matchesDepartment
            );
        });

    // =====================================================
    // SUMMARY COUNTS
    // =====================================================

    const totalDoctors =
        doctors.length;

    const activeDoctors =
        doctors.filter(
            (doctor) =>
                doctor.status === "Active"
        ).length;

    const inactiveDoctors =
        doctors.filter(
            (doctor) =>
                doctor.status === "Inactive"
        ).length;

    // =====================================================
    // OPEN ACTION DROPDOWN
    // =====================================================

    const handleActionMenu = (
        doctorId,
        event
    ) => {

        if (openMenu === doctorId) {

            setOpenMenu(null);

            return;
        }

        const buttonRect =
            event.currentTarget
                .getBoundingClientRect();

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
                    buttonRect.bottom +
                    gap,
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

        setOpenMenu(doctorId);
    };

    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setFormData({
            name: "",
            specialty: "",
            departmentId: "",
            qualification: "",
            experience: "",
            phone: "",
            email: "",
            schedule: "",
        });

        setDepartmentSearch("");

        setSpecialtySearch("");

        setSelectedImage(null);

        setImagePreview("");

        setShowDepartmentOptions(false);

        setShowSpecialtyOptions(false);
    };

    // =====================================================
    // OPEN ADD DOCTOR
    // =====================================================

    const handleAddDoctor = () => {

        setOpenMenu(null);

        setEditingDoctor(null);

        resetForm();

        setShowModal(true);
    };

    // =====================================================
    // OPEN EDIT DOCTOR
    // =====================================================

    const handleEditDoctor = (
        doctor
    ) => {

        setEditingDoctor(doctor);

        const departmentId =
            doctor.departmentId?._id ||
            doctor.departmentId ||
            "";

        const specialty =
            doctor.specialization ||
            doctor.specialty ||
            "";

        const departmentName =
            doctor.departmentId?.name ||
            doctor.department ||
            "";

        setFormData({

            name:
                doctor.name || "",

            specialty:
                specialty,

            departmentId:
                departmentId,

            qualification:
                doctor.qualification ||
                "",

            experience:
                doctor.experience ??
                "",

            phone:
                doctor.phone || "",

            email:
                doctor.email || "",

            schedule:
                doctor.schedule ||
                "",

        });

        setDepartmentSearch(
            departmentName
        );

        setSpecialtySearch(
            specialty
        );

        // Existing backend image
        setSelectedImage(null);

        setImagePreview(
            doctor.image
                ? getImageUrl(
                    doctor.image
                )
                : ""
        );

        setShowDepartmentOptions(
            false
        );

        setShowSpecialtyOptions(
            false
        );

        setOpenMenu(null);

        setShowModal(true);
    };

    // =====================================================
    // FORM INPUT
    // =====================================================

    const handleInputChange = (
        event
    ) => {

        const {
            name,
            value,
        } = event.target;

        setFormData(
            (previous) => ({
                ...previous,
                [name]: value,
            })
        );
    };

    // =====================================================
    // IMAGE CHANGE
    // =====================================================

    const handleImageChange = (
        event
    ) => {

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        // Basic image validation
        if (!file.type.startsWith("image/")) {

            setErrorMessage(
                "Please select a valid image file."
            );

            return;
        }

        // 5 MB limit
        if (
            file.size >
            5 * 1024 * 1024
        ) {

            setErrorMessage(
                "Doctor photo must be less than 5 MB."
            );

            return;
        }

        setErrorMessage("");

        setSelectedImage(file);

        const previewUrl =
            URL.createObjectURL(file);

        setImagePreview(
            previewUrl
        );
    };

    // =====================================================
    // REMOVE SELECTED IMAGE
    // =====================================================

    const handleRemoveImage = () => {

        if (
            selectedImage &&
            imagePreview.startsWith(
                "blob:"
            )
        ) {

            URL.revokeObjectURL(
                imagePreview
            );
        }

        setSelectedImage(null);

        setImagePreview("");
    };

    // =====================================================
    // SELECT DEPARTMENT
    // =====================================================

    const handleSelectDepartment = (
        department
    ) => {

        if (!department.isBackend) {
            return;
        }

        setFormData(
            (previous) => ({
                ...previous,
                departmentId:
                    department.id,
            })
        );

        setDepartmentSearch(
            department.name
        );

        setShowDepartmentOptions(
            false
        );
    };

    // =====================================================
    // SELECT SPECIALTY
    // =====================================================

    const handleSelectSpecialty = (
        specialty
    ) => {

        setFormData(
            (previous) => ({
                ...previous,
                specialty,
            })
        );

        setSpecialtySearch(
            specialty
        );

        setShowSpecialtyOptions(
            false
        );
    };

    // =====================================================
    // SAVE DOCTOR
    // =====================================================

    const handleSaveDoctor = async (
        event
    ) => {

        event.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.specialty.trim() ||
            !formData.departmentId ||
            !formData.qualification.trim() ||
            formData.experience === "" ||
            !formData.phone.trim() ||
            !formData.email.trim() ||
            !formData.schedule.trim()
        ) {

            setErrorMessage(
                "Please fill in all doctor details."
            );

            return;
        }

        try {

            setSaving(true);

            setErrorMessage("");

            // =================================================
            // USE FORMDATA BECAUSE IMAGE IS BEING UPLOADED
            // =================================================

            const payload =
                new FormData();

            payload.append(
                "name",
                formData.name.trim()
            );

            payload.append(
                "specialization",
                formData.specialty.trim()
            );

            payload.append(
                "departmentId",
                formData.departmentId
            );

            payload.append(
                "qualification",
                formData.qualification.trim()
            );

            payload.append(
                "experience",
                Number(
                    formData.experience
                )
            );

            payload.append(
                "phone",
                formData.phone.trim()
            );

            payload.append(
                "email",
                formData.email.trim()
            );

            payload.append(
                "schedule",
                formData.schedule.trim()
            );

            // Add only if a new photo is selected
            if (selectedImage) {

                payload.append(
                    "image",
                    selectedImage
                );
            }

            // =================================================
            // EDIT DOCTOR
            // =================================================

            if (editingDoctor) {

                const response =
                    await fetch(
                        `${API_URL}/doctors/${editingDoctor.id}`,
                        {
                            method: "PUT",
                            headers:
                                getAuthHeaders(),
                            body:
                                payload,
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to update doctor."
                    );
                }

            }

                // =================================================
                // ADD DOCTOR
                // =================================================

            else {

                const response =
                    await fetch(
                        `${API_URL}/doctors`,
                        {
                            method: "POST",
                            headers:
                                getAuthHeaders(),
                            body:
                                payload,
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to add doctor."
                    );
                }
            }

            await fetchDoctors();

            setShowModal(false);

            setEditingDoctor(null);

            resetForm();

        } catch (error) {

            console.error(
                "Error saving doctor:",
                error
            );

            setErrorMessage(
                error.message ||
                "Failed to save doctor."
            );

        } finally {

            setSaving(false);
        }
    };

    // =====================================================
    // OPEN STATUS CONFIRMATION
    // =====================================================

    const handleToggleStatus = (
        doctorId
    ) => {

        const doctor =
            doctors.find(
                (item) =>
                    item.id ===
                    doctorId
            );

        if (!doctor) {
            return;
        }

        setOpenMenu(null);

        setStatusDoctor(doctor);
    };

    // =====================================================
    // CONFIRM STATUS CHANGE
    // =====================================================

    const handleStatusChange =
        async () => {

            if (!statusDoctor) {
                return;
            }

            const newStatus =
                statusDoctor.status ===
                    "Active"
                    ? "inactive"
                    : "active";

            try {

                const response =
                    await fetch(
                        `${API_URL}/doctors/${statusDoctor.id}`,
                        {
                            method: "PUT",
                            headers: {
                                ...getAuthHeaders(),
                                "Content-Type":
                                    "application/json",
                            },
                            body:
                                JSON.stringify({
                                    status:
                                        newStatus,
                                }),
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to change doctor status."
                    );
                }

                setDoctors(
                    (previous) =>
                        previous.map(
                            (doctor) =>
                                doctor.id ===
                                    statusDoctor.id
                                    ? {
                                        ...doctor,
                                        status:
                                            newStatus ===
                                                "active"
                                                ? "Active"
                                                : "Inactive",
                                    }
                                    : doctor
                        )
                );

                setStatusDoctor(null);

            } catch (error) {

                console.error(
                    "Error changing doctor status:",
                    error
                );

                setErrorMessage(
                    error.message ||
                    "Failed to change doctor status."
                );
            }
        };

    // =====================================================
    // OPEN DELETE CONFIRMATION
    // =====================================================

    const handleDeleteDoctor = (
        doctorId
    ) => {

        const doctor =
            doctors.find(
                (item) =>
                    item.id ===
                    doctorId
            );

        if (!doctor) {
            return;
        }

        setOpenMenu(null);

        setDeleteDoctor(doctor);
    };

    // =====================================================
    // CONFIRM DELETE
    // =====================================================

    const handleDelete = async () => {

        if (!deleteDoctor) {
            return;
        }

        try {

            const response =
                await fetch(
                    `${API_URL}/doctors/${deleteDoctor.id}`,
                    {
                        method: "DELETE",
                        headers:
                            getAuthHeaders(),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to delete doctor."
                );
            }

            setDoctors(
                (previous) =>
                    previous.filter(
                        (doctor) =>
                            doctor.id !==
                            deleteDoctor.id
                    )
            );

            setDeleteDoctor(null);

        } catch (error) {

            console.error(
                "Error deleting doctor:",
                error
            );

            setErrorMessage(
                error.message ||
                "Failed to delete doctor."
            );
        }
    };

    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const handleCloseModal = () => {

        if (
            selectedImage &&
            imagePreview.startsWith(
                "blob:"
            )
        ) {

            URL.revokeObjectURL(
                imagePreview
            );
        }

        setShowModal(false);

        setEditingDoctor(null);

        resetForm();
    };

    // =====================================================
    // ACTION DROPDOWN COMPONENT
    // =====================================================

    const ActionDropdown = ({
        doctor,
    }) => {

        if (
            !doctor ||
            openMenu !== doctor.id
        ) {

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
                    top:
                        `${menuPosition.top}px`,
                    right:
                        `${menuPosition.right}px`,
                }}
                className="z-[99999] w-44 overflow-hidden rounded-xl border border-[#dcebf5] bg-white py-1 shadow-[0_15px_40px_rgba(41,75,104,0.20)]"
            >

                <button
                    type="button"
                    data-doctor-action
                    onMouseDown={(event) =>
                        event.stopPropagation()
                    }
                    onClick={() =>
                        handleEditDoctor(
                            doctor
                        )
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#294b68] transition hover:bg-[#f8fbfd] hover:text-[#1976c8]"
                >

                    <Pencil size={16} />

                    Edit

                </button>

                <button
                    type="button"
                    data-doctor-action
                    onMouseDown={(event) =>
                        event.stopPropagation()
                    }
                    onClick={() =>
                        handleToggleStatus(
                            doctor.id
                        )
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#294b68] transition hover:bg-[#f8fbfd] hover:text-[#1976c8]"
                >

                    <Power size={16} />

                    {doctor.status ===
                        "Active"
                        ? "Set Inactive"
                        : "Set Active"}

                </button>

                <button
                    type="button"
                    data-doctor-action
                    onMouseDown={(event) =>
                        event.stopPropagation()
                    }
                    onClick={() =>
                        handleDeleteDoctor(
                            doctor.id
                        )
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

    // =====================================================
    // RETURN
    // =====================================================

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

                    <p className="!mb-0 mt-1 text-sm text-gray-500">
                        Manage hospital doctors
                        and their departments.
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
                SUMMARY CARDS
            ===================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {/* TOTAL */}

                <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">

                            <Stethoscope size={23} />

                        </div>

                        <div>

                            <p className="!mb-0 text-sm font-medium text-gray-500">
                                Total Doctors
                            </p>

                            <h3 className="!mb-0 mt-1 !text-2xl !font-bold !text-[#294b68]">
                                {totalDoctors}
                            </h3>

                        </div>

                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

                </div>

                {/* ACTIVE */}

                <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">

                            <CheckCircle2 size={23} />

                        </div>

                        <div>

                            <p className="!mb-0 text-sm font-medium text-gray-500">
                                Active Doctors
                            </p>

                            <h3 className="!mb-0 mt-1 !text-2xl !font-bold !text-[#294b68]">
                                {activeDoctors}
                            </h3>

                        </div>

                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />

                </div>

                {/* INACTIVE */}

                <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">

                            <Power size={23} />

                        </div>

                        <div>

                            <p className="!mb-0 text-sm font-medium text-gray-500">
                                Inactive Doctors
                            </p>

                            <h3 className="!mb-0 mt-1 !text-2xl !font-bold !text-[#294b68]">
                                {inactiveDoctors}
                            </h3>

                        </div>

                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full" />

                </div>

            </div>

            {/* =====================================================
                ERROR MESSAGE
            ===================================================== */}

            {errorMessage && (

                <div className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">

                    <span>
                        {errorMessage}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setErrorMessage("")
                        }
                        className="ml-4 text-red-400 hover:text-red-600"
                    >
                        <X size={17} />
                    </button>

                </div>

            )}

            {/* =====================================================
                SEARCH & FILTER
            ===================================================== */}

            <div className="rounded-2xl border border-[#e5edf3] bg-white p-4 shadow-sm">

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <div className="relative w-full lg:max-w-md">

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

                    <select
                        value={
                            departmentFilter
                        }
                        onChange={(event) =>
                            setDepartmentFilter(
                                event.target.value
                            )
                        }
                        className="w-full rounded-xl border border-[#dcebf5] bg-[#f8fbfd] px-4 py-3 text-sm font-medium text-[#294b68] outline-none transition-all duration-200 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10 lg:w-auto"
                    >

                        <option>
                            All Departments
                        </option>

                        {departments.map(
                            (department) => (

                                <option
                                    key={
                                        department._id
                                    }
                                    value={
                                        department.name
                                    }
                                >
                                    {
                                        department.name
                                    }
                                </option>

                            )
                        )}

                    </select>

                </div>

            </div>

            {/* =====================================================
                DOCTORS LIST
            ===================================================== */}

            <div className="overflow-hidden rounded-2xl border border-[#e5edf3] bg-white shadow-sm">

                {/* =================================================
                    DESKTOP TABLE
                ================================================= */}

                <div className="hidden lg:block">

                    {/* TABLE HEADER */}

                    <div className="overflow-hidden">

                        <table className="w-full min-w-[900px] table-fixed text-left">

                            <thead>

                                <tr className="border-b border-[#edf3f7] bg-[#f8fafc]">

                                    <th className="w-[30%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Doctor
                                    </th>

                                    <th className="w-[20%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Specialty
                                    </th>

                                    <th className="w-[20%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Department
                                    </th>

                                    <th className="w-[15%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Status
                                    </th>

                                    <th className="w-[15%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                        </table>

                    </div>

                    {/* TABLE BODY */}

                    <div className="h-[640px] overflow-auto scroll-smooth">

                        <table className="w-full min-w-[900px] table-fixed text-left">

                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="px-6 py-16 text-center text-sm text-gray-400"
                                        >
                                            Loading doctors...
                                        </td>

                                    </tr>

                                ) : filteredDoctors.length > 0 ? (

                                        filteredDoctors.map(
                                            (doctor) => (

                                            <tr
                                                key={
                                                    doctor.id
                                                }
                                                className="group border-b border-[#edf3f7] transition hover:bg-[#f9fcfe]"
                                            >

                                                {/* DOCTOR */}

                                                <td className="w-[30%] px-6 py-5">

                                                    <div className="flex items-center gap-3">

                                                        {/* PHOTO */}

                                                        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#eaf5fb]">

                                                            {doctor.image ? (

                                                                <img
                                                                    src={getImageUrl(
                                                                        doctor.image
                                                                    )}
                                                                    alt={
                                                                        doctor.name
                                                                    }
                                                                    className="h-full w-full object-cover"
                                                                    onError={(
                                                                        event
                                                                    ) => {
                                                                        event.currentTarget.style.display =
                                                                            "none";
                                                                    }}
                                                                />

                                                            ) : (

                                                                <div className="flex h-full w-full items-center justify-center text-[#1976c8]">

                                                                        <Stethoscope
                                                                            size={
                                                                                20
                                                                            }
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                        />

                                                                </div>

                                                            )}

                                                        </div>

                                                        <div className="min-w-0">

                                                            <p className="!mb-0 truncate text-sm font-bold text-[#294b68]">
                                                                {
                                                                    doctor.name
                                                                }
                                                            </p>

                                                            <p className="!mb-0 mt-1 truncate text-xs text-gray-400">

                                                                Doctor ID:
                                                                DOC-
                                                                {String(
                                                                    doctor.id ||
                                                                    ""
                                                                )
                                                                    .slice(
                                                                        -6
                                                                    )
                                                                    .toUpperCase()}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* SPECIALTY */}

                                                <td className="w-[20%] px-6 py-5">

                                                    <span className="text-sm font-medium text-gray-600">
                                                        {
                                                            doctor.specialty
                                                        }
                                                    </span>

                                                </td>

                                                {/* DEPARTMENT */}

                                                <td className="w-[20%] px-6 py-5">

                                                    <span className="text-sm text-gray-500">
                                                        {
                                                            doctor.department
                                                        }
                                                    </span>

                                                </td>

                                                {/* STATUS */}

                                                <td className="w-[15%] px-6 py-5">

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
                                                        />

                                                        {
                                                            doctor.status
                                                        }

                                                    </button>

                                                </td>

                                                {/* ACTION */}

                                                <td className="w-[15%] px-6 py-5">

                                                    <div
                                                        data-doctor-action
                                                        className="relative inline-block"
                                                    >

                                                        <button
                                                            type="button"
                                                            data-doctor-action
                                                            onClick={(
                                                                event
                                                            ) =>
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
                                                                size={
                                                                    19
                                                                }
                                                                strokeWidth={
                                                                    2
                                                                }
                                                            />

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                    ) : (

                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    className="px-6 py-16 text-center"
                                                >

                                                    <div className="flex flex-col items-center">

                                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf5fb] text-[#1976c8]">

                                                            <Stethoscope
                                                                size={25}
                                                            />

                                                        </div>

                                                        <p className="!mb-0 mt-4 text-sm font-semibold text-[#294b68]">
                                                            No doctors found
                                                        </p>

                                                        <p className="!mb-0 mt-1 text-xs text-gray-400">
                                                            Try changing your
                                                            search or filter.
                                                        </p>

                                                    </div>

                                                </td>

                                            </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* =================================================
                    MOBILE CARDS
                ================================================= */}

                <div className="space-y-4 p-4 lg:hidden">

                    {loading ? (

                        <div className="px-5 py-12 text-center text-sm text-gray-400">
                            Loading doctors...
                        </div>

                    ) : filteredDoctors.length > 0 ? (

                        filteredDoctors.map(
                            (doctor) => (

                                <div
                                    key={
                                        doctor.id
                                    }
                                    className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.10)]"
                                >

                                    <div className="flex items-start justify-between gap-3">

                                        <div className="flex min-w-0 items-center gap-3">

                                            {/* MOBILE PHOTO */}

                                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#eaf5fb]">

                                                {doctor.image ? (

                                                    <img
                                                        src={getImageUrl(
                                                            doctor.image
                                                        )}
                                                        alt={
                                                            doctor.name
                                                        }
                                                        className="h-full w-full object-cover"
                                                        onError={(
                                                            event
                                                        ) => {
                                                            event.currentTarget.style.display =
                                                                "none";
                                                        }}
                                                    />

                                                ) : (

                                                    <div className="flex h-full w-full items-center justify-center text-[#1976c8]">

                                                            <Stethoscope
                                                                size={
                                                                    20
                                                                }
                                                            />

                                                    </div>

                                                )}

                                            </div>

                                            <div className="min-w-0">

                                                <p className="!mb-0 truncate text-sm font-bold text-[#294b68]">
                                                    {
                                                        doctor.name
                                                    }
                                                </p>

                                                <p className="!mb-0 mt-1 text-xs text-gray-400">

                                                    DOC-
                                                    {String(
                                                        doctor.id ||
                                                        ""
                                                    )
                                                        .slice(
                                                            -6
                                                        )
                                                        .toUpperCase()}

                                                </p>

                                            </div>

                                        </div>

                                        <div
                                            data-doctor-action
                                            className="relative shrink-0"
                                        >

                                            <button
                                                type="button"
                                                data-doctor-action
                                                onClick={(
                                                    event
                                                ) =>
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
                                                />

                                            </button>

                                        </div>

                                    </div>

                                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                                        <div>

                                            <p className="!mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                                Specialty
                                            </p>

                                            <p className="!mb-0 text-sm font-medium text-gray-600">
                                                {
                                                    doctor.specialty
                                                }
                                            </p>

                                        </div>

                                        <div>

                                            <p className="!mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                                Department
                                            </p>

                                            <p className="!mb-0 text-sm text-gray-500">
                                                {
                                                    doctor.department
                                                }
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
                                            />

                                            {
                                                doctor.status
                                            }

                                        </button>

                                    </div>

                                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

                                </div>

                            )
                        )

                    ) : (

                                <div className="rounded-2xl border border-[#e5edf3] bg-white px-5 py-12 text-center">

                            <div className="flex flex-col items-center">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf5fb] text-[#1976c8]">

                                            <Stethoscope
                                                size={25}
                                            />

                                </div>

                                <p className="!mb-0 mt-4 text-sm font-semibold text-[#294b68]">
                                    No doctors found
                                </p>

                                <p className="!mb-0 mt-1 text-xs text-gray-400">
                                            Try changing your
                                            search or filter.
                                </p>

                            </div>

                        </div>

                    )}

                </div>

            </div>

            {/* =====================================================
                ACTION DROPDOWN
            ===================================================== */}

            {openMenu !== null && (

                <ActionDropdown
                    doctor={doctors.find(
                        (doctor) =>
                            doctor.id ===
                            openMenu
                    )}
                />

            )}

            {/* =====================================================
                ADD / EDIT DOCTOR MODAL
            ===================================================== */}

            {showModal && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102a43]/40 px-4 backdrop-blur-sm">

                    <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#dcebf5] bg-white shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

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
                                onClick={
                                    handleCloseModal
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                            >

                                <X size={19} />

                            </button>

                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={
                                handleSaveDoctor
                            }
                            className="max-h-[75vh] overflow-y-auto p-6"
                        >

                            <div className="space-y-4">

                                {/* =================================================
                                    DOCTOR PHOTO
                                ================================================= */}

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start">

                                    <label className="w-full shrink-0 pt-3 text-sm font-semibold text-[#294b68] sm:w-40">
                                        Doctor Photo
                                    </label>

                                    <div className="w-full">

                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                                            {/* IMAGE PREVIEW */}

                                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-[#dcebf5] bg-[#eaf5fb]">

                                                {imagePreview ? (

                                                    <img
                                                        src={
                                                            imagePreview
                                                        }
                                                        alt="Doctor preview"
                                                        className="h-full w-full object-cover"
                                                        onError={(
                                                            event
                                                        ) => {
                                                            event.currentTarget.style.display =
                                                                "none";
                                                        }}
                                                    />

                                                ) : (

                                                    <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-[#1976c8]">

                                                        <ImageIcon
                                                            size={
                                                                25
                                                            }
                                                        />

                                                        <span className="text-[9px] font-semibold uppercase tracking-wide">
                                                            Photo
                                                        </span>

                                                    </div>

                                                )}

                                            </div>

                                            {/* UPLOAD AREA */}

                                            <div className="flex-1">

                                                <label className="flex min-h-[96px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#c9ddea] bg-[#f8fbfd] px-4 py-4 text-center transition hover:border-[#1976c8] hover:bg-[#f1f8fc]">

                                                    <Upload
                                                        size={
                                                            21
                                                        }
                                                        className="text-[#1976c8]"
                                                    />

                                                    <p className="!mb-0 mt-2 text-sm font-semibold text-[#294b68]">
                                                        {selectedImage
                                                            ? "Change photo"
                                                            : "Upload doctor photo"}
                                                    </p>

                                                    <p className="!mb-0 mt-1 text-xs text-gray-400">
                                                        JPG, PNG or WEBP · Max 5 MB
                                                    </p>

                                                    <input
                                                        type="file"
                                                        accept="image/png,image/jpeg,image/jpg,image/webp"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        className="hidden"
                                                    />

                                                </label>

                                                {selectedImage && (

                                                    <div className="mt-2 flex items-center justify-between">

                                                        <p className="!mb-0 max-w-[75%] truncate text-xs text-gray-400">
                                                            {
                                                                selectedImage.name
                                                            }
                                                        </p>

                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleRemoveImage
                                                            }
                                                            className="text-xs font-semibold text-red-500 transition hover:text-red-600"
                                                        >
                                                            Remove
                                                        </button>

                                                    </div>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* DOCTOR NAME */}

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                                    <label className="w-full shrink-0 text-sm font-semibold text-[#294b68] sm:w-40">
                                        Doctor Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                        placeholder="Enter doctor name"
                                        className="h-12 w-full rounded-lg border border-[#dcebf5] bg-[#f8fbfd] px-4 text-sm text-[#294b68] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                    />

                                </div>

                                {/* SPECIALTY */}

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                                    <label className="w-full shrink-0 text-sm font-semibold text-[#294b68] sm:w-40">
                                        Specialty
                                    </label>

                                    <div className="relative w-full">

                                        <input
                                            type="text"
                                            name="specialty"
                                            value={
                                                formData.specialty
                                            }
                                            onChange={(
                                                event
                                            ) => {

                                                handleInputChange(
                                                    event
                                                );

                                                setSpecialtySearch(
                                                    event
                                                        .target
                                                        .value
                                                );

                                                setShowSpecialtyOptions(
                                                    true
                                                );
                                            }}
                                            onFocus={() => {

                                                setSpecialtySearch(
                                                    formData.specialty
                                                );

                                                setShowSpecialtyOptions(
                                                    true
                                                );
                                            }}
                                            onBlur={() => {

                                                setTimeout(
                                                    () => {

                                                        setShowSpecialtyOptions(
                                                            false
                                                        );

                                                    },
                                                    150
                                                );
                                            }}
                                            placeholder="Search or enter specialty"
                                            className="h-12 w-full rounded-lg border border-[#dcebf5] bg-[#f8fbfd] px-4 text-sm text-[#294b68] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                        />

                                        {showSpecialtyOptions &&
                                            filteredSpecialtyOptions.length >
                                            0 && (

                                                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[1000] max-h-56 overflow-y-auto rounded-xl border border-[#dcebf5] bg-white py-1 shadow-[0_15px_40px_rgba(41,75,104,0.15)]">

                                                    {filteredSpecialtyOptions.map(
                                                        (
                                                            specialty
                                                        ) => (

                                                            <button
                                                                key={
                                                                    specialty
                                                                }
                                                                type="button"
                                                                onMouseDown={() =>
                                                                    handleSelectSpecialty(
                                                                        specialty
                                                                    )
                                                                }
                                                                className="flex w-full items-center px-4 py-3 text-left text-sm text-[#294b68] transition hover:bg-[#f8fbfd] hover:text-[#1976c8]"
                                                            >

                                                                <Stethoscope
                                                                    size={
                                                                        16
                                                                    }
                                                                    className="mr-3 text-[#1976c8]"
                                                                />

                                                                {
                                                                    specialty
                                                                }

                                                            </button>

                                                        )
                                                    )}

                                                </div>

                                            )}

                                    </div>

                                </div>

                                {/* DEPARTMENT */}

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                                    <label className="w-full shrink-0 text-sm font-semibold text-[#294b68] sm:w-40">
                                        Department
                                    </label>

                                    <div className="relative w-full">

                                        <input
                                            type="text"
                                            value={
                                                departmentSearch
                                            }
                                            onChange={(
                                                event
                                            ) => {

                                                const value =
                                                    event
                                                        .target
                                                        .value;

                                                setDepartmentSearch(
                                                    value
                                                );

                                                setShowDepartmentOptions(
                                                    true
                                                );

                                                setFormData(
                                                    (
                                                        previous
                                                    ) => ({
                                                        ...previous,
                                                        departmentId:
                                                            "",
                                                    })
                                                );
                                            }}
                                            onFocus={() =>
                                                setShowDepartmentOptions(
                                                    true
                                                )
                                            }
                                            onBlur={() => {

                                                setTimeout(
                                                    () => {

                                                        setShowDepartmentOptions(
                                                            false
                                                        );

                                                    },
                                                    150
                                                );
                                            }}
                                            placeholder="Search department..."
                                            className="h-12 w-full rounded-lg border border-[#dcebf5] bg-[#f8fbfd] px-4 pr-10 text-sm font-medium text-[#294b68] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                        />

                                        <Search
                                            size={17}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        {showDepartmentOptions && (

                                            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[1000] max-h-60 overflow-y-auto rounded-xl border border-[#dcebf5] bg-white py-1 shadow-[0_15px_40px_rgba(41,75,104,0.15)]">

                                                {filteredDepartmentOptions.length >
                                                    0 ? (

                                                        filteredDepartmentOptions.map(
                                                            (
                                                                department
                                                            ) => (

                                                            <button
                                                                key={
                                                                    department.id
                                                                }
                                                                type="button"
                                                                disabled={
                                                                    !department.isBackend
                                                                }
                                                                onMouseDown={() =>
                                                                    handleSelectDepartment(
                                                                        department
                                                                    )
                                                                }
                                                                className={`flex w-full items-center px-4 py-3 text-left text-sm transition ${department.isBackend
                                                                        ? "text-[#294b68] hover:bg-[#f8fbfd] hover:text-[#1976c8]"
                                                                        : "cursor-default text-gray-400"
                                                                    }`}
                                                            >

                                                                <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf5fb] text-[#1976c8]">

                                                                    <Stethoscope
                                                                        size={
                                                                            15
                                                                        }
                                                                    />

                                                                </div>

                                                                <div className="flex flex-1 items-center justify-between">

                                                                    <span>
                                                                        {
                                                                            department.name
                                                                        }
                                                                    </span>

                                                                    {!department.isBackend && (

                                                                        <span className="ml-3 text-[10px] font-medium uppercase tracking-wide text-gray-300">
                                                                            Add in Departments
                                                                        </span>

                                                                    )}

                                                                </div>

                                                            </button>

                                                        )
                                                    )

                                                ) : (

                                                    <div className="px-4 py-3 text-sm text-gray-400">
                                                        No department found
                                                    </div>

                                                )}

                                            </div>

                                        )}

                                    </div>

                                </div>

                                {/* QUALIFICATION */}

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                                    <label className="w-full shrink-0 text-sm font-semibold text-[#294b68] sm:w-40">
                                        Qualification
                                    </label>

                                    <input
                                        type="text"
                                        name="qualification"
                                        value={
                                            formData.qualification
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                        placeholder="e.g. MBBS, MD Cardiology"
                                        className="h-12 w-full rounded-lg border border-[#dcebf5] bg-[#f8fbfd] px-4 text-sm text-[#294b68] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                    />

                                </div>

                                {/* EXPERIENCE */}

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                                    <label className="w-full shrink-0 text-sm font-semibold text-[#294b68] sm:w-40">
                                        Experience
                                    </label>

                                    <div className="relative w-full">

                                        <input
                                            type="number"
                                            name="experience"
                                            min="0"
                                            value={
                                                formData.experience
                                            }
                                            onChange={
                                                handleInputChange
                                            }
                                            placeholder="Years of experience"
                                            className="h-12 w-full rounded-lg border border-[#dcebf5] bg-[#f8fbfd] px-4 pr-16 text-sm text-[#294b68] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                        />

                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                                            Years
                                        </span>

                                    </div>

                                </div>

                                {/* PHONE */}

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                                    <label className="w-full shrink-0 text-sm font-semibold text-[#294b68] sm:w-40">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={
                                            formData.phone
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                        placeholder="Enter phone number"
                                        className="h-12 w-full rounded-lg border border-[#dcebf5] bg-[#f8fbfd] px-4 text-sm text-[#294b68] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                    />

                                </div>

                                {/* EMAIL */}

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                                    <label className="w-full shrink-0 text-sm font-semibold text-[#294b68] sm:w-40">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                        placeholder="Enter email address"
                                        className="h-12 w-full rounded-lg border border-[#dcebf5] bg-[#f8fbfd] px-4 text-sm text-[#294b68] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                    />

                                </div>

                                {/* SCHEDULE */}

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                                    <label className="w-full shrink-0 text-sm font-semibold text-[#294b68] sm:w-40">
                                        Schedule
                                    </label>

                                    <input
                                        type="text"
                                        name="schedule"
                                        value={
                                            formData.schedule
                                        }
                                        onChange={
                                            handleInputChange
                                        }
                                        placeholder="e.g. Monday - Friday, 9:00 AM - 2:00 PM"
                                        className="h-12 w-full rounded-lg border border-[#dcebf5] bg-[#f8fbfd] px-4 text-sm text-[#294b68] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#1976c8] focus:bg-white focus:ring-2 focus:ring-[#1976c8]/10"
                                    />

                                </div>

                            </div>

                            {/* BUTTONS */}

                            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#edf3f7] pt-5 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={
                                        handleCloseModal
                                    }
                                    disabled={
                                        saving
                                    }
                                    className="!rounded-lg border border-[#dcebf5] px-6 py-3 text-sm font-semibold text-[#294b68] transition hover:bg-[#f8fbfd] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        saving
                                    }
                                    className="!rounded-lg bg-[#1976c8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1565a8] disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    {saving
                                        ? editingDoctor
                                            ? "Updating..."
                                            : "Adding..."
                                        : editingDoctor
                                            ? "Update Doctor"
                                            : "Add Doctor"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

            {/* =====================================================
                STATUS CONFIRMATION
            ===================================================== */}

            {statusDoctor && (

                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">

                            <Power size={22} />

                        </div>

                        <h2 className="!mb-0 mt-4 !text-lg !font-bold !text-[#294b68]">
                            Change Doctor Status?
                        </h2>

                        <p className="!mb-0 mt-2 text-sm leading-6 text-gray-500">

                            Are you sure you want to set{" "}

                            <span className="font-semibold text-[#294b68]">
                                {
                                    statusDoctor.name
                                }
                            </span>{" "}

                            to{" "}

                            {statusDoctor.status ===
                                "Active"
                                ? "Inactive"
                                : "Active"}

                            ?

                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setStatusDoctor(
                                        null
                                    )
                                }
                                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleStatusChange
                                }
                                className="!rounded-xl bg-[#1976c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]"
                            >
                                Confirm
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* =====================================================
                DELETE CONFIRMATION
            ===================================================== */}

            {deleteDoctor && (

                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">

                            <Trash2 size={22} />

                        </div>

                        <h2 className="!mb-0 mt-4 !text-lg !font-bold !text-[#294b68]">
                            Delete Doctor?
                        </h2>

                        <p className="!mb-0 mt-2 text-sm leading-6 text-gray-500">

                            Are you sure you want to delete{" "}

                            <span className="font-semibold text-[#294b68]">
                                {
                                    deleteDoctor.name
                                }
                            </span>

                            ? This action cannot be undone.

                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteDoctor(
                                        null
                                    )
                                }
                                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleDelete
                                }
                                className="!rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                            >
                                Delete Doctor
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Doctors;
