
import {
    Search,
    Plus,
    MoreVertical,
    Pencil,
    Trash2,
    Power,
    X,
    Stethoscope,
} from "lucide-react";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const API_URL =
    "http://localhost:5000/api/dashboard/services";

const Services = () => {

    /* =====================================================
       SERVICES DATA
    ===================================================== */

    const [services, setServices] = useState([]);

    /* =====================================================
       STATES
    ===================================================== */

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [openMenu, setOpenMenu] =
        useState(null);

    const [menuPosition, setMenuPosition] =
        useState({
            top: 0,
            left: 0,
        });

    const [showModal, setShowModal] =
        useState(false);

    const [editingService, setEditingService] =
        useState(null);

    const [statusService, setStatusService] =
        useState(null);

    const [deleteService, setDeleteService] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [formData, setFormData] =
        useState({
            name: "",
            description: "",
            image: "",
            icon: "",
            price: "",
        });

    /* =====================================================
       GET TOKEN
    ===================================================== */

    const getToken = () => {
        return localStorage.getItem("token");
    };

    /* =====================================================
       FETCH SERVICES
    ===================================================== */

    const fetchServices = async () => {

        try {

            setLoading(true);
            setError("");

            const token = getToken();

            if (!token) {
                setError(
                    "Authentication token not found."
                );
                return;
            }

            const response = await fetch(
                API_URL,
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
                    "Failed to fetch services"
                );
            }

            setServices(
                data.services || []
            );

        } catch (error) {

            console.error(
                "Fetch services error:",
                error
            );

            setError(
                error.message ||
                "Failed to load services."
            );

        } finally {

            setLoading(false);

        }
    };

    /* =====================================================
       LOAD SERVICES
    ===================================================== */

    useEffect(() => {
        fetchServices();
    }, []);

    /* =====================================================
       CLOSE ACTION MENU
    ===================================================== */

    useEffect(() => {

        const handleOutsideClick =
            (event) => {

                if (
                    !event.target.closest(
                        "[data-service-menu]"
                    )
                ) {
                    setOpenMenu(null);
                }
            };

        const handleScroll = () => {
            setOpenMenu(null);
        };

        const handleResize = () => {
            setOpenMenu(null);
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

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

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

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

    }, []);

    /* =====================================================
       FILTER SERVICES
    ===================================================== */

    const filteredServices =
        services.filter(
            (service) => {

                const searchValue =
                    search
                        .toLowerCase()
                        .trim();

                const serviceName =
                    service.name ||
                    "";

                const serviceDescription =
                    service.description ||
                    "";

                const matchesSearch =
                    serviceName
                        .toLowerCase()
                        .includes(
                            searchValue
                        ) ||
                    serviceDescription
                        .toLowerCase()
                        .includes(
                            searchValue
                        );

                const matchesStatus =
                    statusFilter === "all" ||
                    service.status ===
                    statusFilter;

                return (
                    matchesSearch &&
                    matchesStatus
                );
            }
        );

    /* =====================================================
       OPEN ADD MODAL
    ===================================================== */

    const openAddModal = () => {

        setEditingService(null);

        setFormData({
            name: "",
            description: "",
            image: "",
            icon: "",
            price: "",
        });

        setShowModal(true);
    };

    /* =====================================================
       OPEN EDIT MODAL
    ===================================================== */

    const openEditModal = (
        service
    ) => {

        setEditingService(service);

        setFormData({
            name:
                service.name || "",

            description:
                service.description ||
                "",

            image:
                service.image || "",

            icon:
                service.icon || "",

            price:
                service.price ?? "",
        });

        setOpenMenu(null);
        setShowModal(true);
    };

    /* =====================================================
       FORM CHANGE
    ===================================================== */

    const handleFormChange = (
        event
    ) => {

        const {
            name,
            value,
        } = event.target;

        setFormData(
            (prev) => ({
                ...prev,
                [name]: value,
            })
        );
    };

    /* =====================================================
       ADD / EDIT SERVICE
    ===================================================== */

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        if (
            !formData.name.trim()
        ) {
            return;
        }

        if (
            !formData.description.trim()
        ) {
            return;
        }

        try {

            setSaving(true);
            setError("");

            const token = getToken();

            if (!token) {
                setError(
                    "Authentication token not found."
                );
                return;
            }

            const requestBody = {
                name:
                    formData.name.trim(),

                description:
                    formData.description.trim(),

                image:
                    formData.image.trim(),

                icon:
                    formData.icon.trim(),

                price:
                    Number(
                        formData.price
                    ) || 0,
            };

            let response;

            if (editingService) {

                response =
                    await fetch(
                        `${API_URL}/${editingService._id}`,
                        {
                            method: "PUT",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(
                                    requestBody
                                ),
                        }
                    );

            } else {

                response =
                    await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`,

                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(
                                    requestBody
                                ),
                        }
                    );
            }

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to save service"
                );
            }

            /* Refresh from database */

            await fetchServices();

            setShowModal(false);
            setEditingService(null);

            setFormData({
                name: "",
                description: "",
                image: "",
                icon: "",
                price: "",
            });

        } catch (error) {

            console.error(
                "Save service error:",
                error
            );

            setError(
                error.message ||
                "Failed to save service."
            );

        } finally {

            setSaving(false);

        }
    };

    /* =====================================================
       STATUS CONFIRMATION
    ===================================================== */

    const handleToggleStatus = (
        serviceId
    ) => {

        const service =
            services.find(
                (item) =>
                    item._id ===
                    serviceId
            );

        if (!service) {
            return;
        }

        setOpenMenu(null);
        setStatusService(service);
    };

    /* =====================================================
       CHANGE STATUS
    ===================================================== */

    const handleStatusChange =
        async () => {

            if (!statusService) {
                return;
            }

            try {

                setSaving(true);
                setError("");

                const token =
                    getToken();

                if (!token) {
                    setError(
                        "Authentication token not found."
                    );
                    return;
                }

                const newStatus =
                    statusService.status ===
                        "active"
                        ? "inactive"
                        : "active";

                const response =
                    await fetch(
                        `${API_URL}/${statusService._id}`,
                        {
                            method: "PUT",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`,

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
                        "Failed to change service status"
                    );
                }

                await fetchServices();

                setStatusService(null);

            } catch (error) {

                console.error(
                    "Status change error:",
                    error
                );

                setError(
                    error.message ||
                    "Failed to change service status."
                );

            } finally {

                setSaving(false);

            }
        };

    /* =====================================================
       DELETE CONFIRMATION
    ===================================================== */

    const handleDeleteService = (
        serviceId
    ) => {

        const service =
            services.find(
                (item) =>
                    item._id ===
                    serviceId
            );

        if (!service) {
            return;
        }

        setOpenMenu(null);
        setDeleteService(service);
    };

    /* =====================================================
       DELETE SERVICE
    ===================================================== */

    const handleDelete =
        async () => {

            if (!deleteService) {
                return;
            }

            try {

                setSaving(true);
                setError("");

                const token =
                    getToken();

                if (!token) {
                    setError(
                        "Authentication token not found."
                    );
                    return;
                }

                const response =
                    await fetch(
                        `${API_URL}/${deleteService._id}`,
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
                        "Failed to delete service"
                    );
                }

                await fetchServices();

                setDeleteService(null);

            } catch (error) {

                console.error(
                    "Delete service error:",
                    error
                );

                setError(
                    error.message ||
                    "Failed to delete service."
                );

            } finally {

                setSaving(false);

            }
        };

    /* =====================================================
       ACTION MENU POSITION
    ===================================================== */

    const handleMenuClick = (
        event,
        serviceId
    ) => {

        event.stopPropagation();

        const rect =
            event.currentTarget
                .getBoundingClientRect();

        const menuWidth = 170;
        const menuHeight = 125;

        let left =
            rect.right -
            menuWidth;

        let top =
            rect.bottom + 6;

        if (left < 10) {
            left = 10;
        }

        if (
            left + menuWidth >
            window.innerWidth - 10
        ) {

            left =
                window.innerWidth -
                menuWidth -
                10;
        }

        if (
            top + menuHeight >
            window.innerHeight - 10
        ) {

            top =
                rect.top -
                menuHeight -
                6;
        }

        setMenuPosition({
            top,
            left,
        });

        setOpenMenu(
            openMenu === serviceId
                ? null
                : serviceId
        );
    };

    /* =====================================================
       FORMAT PRICE
    ===================================================== */

    const formatPrice = (
        price
    ) => {

        return Number(
            price || 0
        ).toLocaleString(
            "en-IN"
        );
    };

    /* =====================================================
       RETURN
    ===================================================== */

    return (
        <div className="space-y-6">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-[#294b68]">
                        Services
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage hospital services,
                        pricing and availability.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="flex items-center justify-center gap-2 !rounded-lg bg-[#1976c8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]"
                >
                    <Plus size={18} />
                    Add Service
                </button>

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* =================================================
                SEARCH + FILTER
            ================================================= */}

            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    {/* Search */}

                    <div className="relative w-full sm:max-w-md">

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
                            placeholder="Search services..."
                            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#1976c8]"
                        />

                    </div>

                    {/* Status Filter */}

                    <select
                        value={
                            statusFilter
                        }
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                        className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#1976c8]"
                    >
                        <option value="all">
                            All Status
                        </option>

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>
                    </select>

                </div>

            </div>

            {/* =================================================
    SERVICES GRID
================================================= */}

            {loading ? (

                <div className="rounded-xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#eaf5fb] border-t-[#1976c8]" />

                    <p className="mt-4 text-sm text-gray-500">
                        Loading services...
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">

                    {filteredServices.map(
                        (service) => (

                <div
                    key={service._id}
                    className="group relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#dcebf5] hover:shadow-[0_12px_30px_rgba(41,75,104,0.08)]"
                >

                    {/* =================================================
                        TOP
                    ================================================= */}

                    <div className="flex items-start justify-between">

                        {/* SERVICE ICON */}

                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#eaf5fb] text-[#1976c8] transition group-hover:scale-105">

                            {service.icon ? (

                                <img
                                    src={service.icon}
                                    alt={service.name}
                                    className="h-full w-full object-contain p-2.5"
                                />

                            ) : (

                                <Stethoscope
                                    size={23}
                                />

                            )}

                        </div>


                        {/* ACTION MENU */}

                        <div
                            data-service-menu
                            className="relative"
                        >

                            <button
                                type="button"
                                onClick={(event) =>
                                    handleMenuClick(
                                        event,
                                        service._id
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


                    {/* =================================================
                        SERVICE NAME
                    ================================================= */}

                    <div className="mt-5">

                        <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                            {service.name}
                        </h2>

                        <p className="!mb-0 mt-1 line-clamp-2 text-sm leading-6 text-gray-500">
                            {service.description}
                        </p>

                    </div>


                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                        {/* PRICE */}

                        <div>

                            <p className="!mb-0 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                                Price
                            </p>

                            <p className="!mb-0 mt-1 text-base font-bold text-[#294b68]">
                                ₹{formatPrice(service.price)}
                            </p>

                        </div>


                        {/* STATUS */}

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${service.status === "active"
                                    ? "bg-green-50 text-green-600"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                        >

                            {service.status === "active"
                                ? "Active"
                                : "Inactive"}

                        </span>

                    </div>


                    {/* =================================================
                        BLUE HOVER LINE
                    ================================================= */}

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 rounded-b-xl bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

                </div>

            )
        )}

                    </div>

            )}

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!loading &&
                filteredServices.length ===
                0 && (

                    <div className="rounded-xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">

                        <Stethoscope
                            size={40}
                            className="mx-auto text-gray-300"
                        />

                    <h3 className="mt-4 text-lg font-semibold text-[#294b68]">
                        No services found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Try changing your
                        search or status
                        filter.
                    </p>

                </div>
                )}

            {/* =================================================
                ACTION MENU
            ================================================= */}

            {openMenu &&
                createPortal(

                    <div
                        data-service-menu
                        style={{
                            position:
                                "fixed",

                            top:
                                menuPosition.top,

                            left:
                                menuPosition.left,
                        }}
                        className="z-[100] w-[170px] overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_12px_35px_rgba(41,75,104,0.18)]"
                    >

                        {(() => {

                            const service =
                                services.find(
                                    (item) =>
                                        item._id ===
                                        openMenu
                                );

                            if (!service) {
                                return null;
                            }

                            return (
                                <>

                                    {/* EDIT */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openEditModal(
                                                service
                                            )
                                        }
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                                    >
                                        <Pencil
                                            size={
                                                16
                                            }
                                        />

                                        Edit
                                    </button>

                                    {/* STATUS */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleToggleStatus(
                                                service._id
                                            )
                                        }
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                                    >
                                        <Power
                                            size={
                                                16
                                            }
                                        />

                                        {service.status ===
                                            "active"
                                            ? "Set Inactive"
                                            : "Set Active"}
                                    </button>

                                    {/* DELETE */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteService(
                                                service._id
                                            )
                                        }
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                    >
                                        <Trash2
                                            size={
                                                16
                                            }
                                        />

                                        Delete
                                    </button>

                                </>
                            );

                        })()}

                    </div>,

                    document.body
                )}

            {/* =================================================
                ADD / EDIT MODAL
            ================================================= */}

            {showModal && (

                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

                        {/* HEADER */}

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="!mb-0 !text-lg !font-bold !text-[#294b68]">
                                    {editingService
                                        ? "Edit Service"
                                        : "Add Service"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {editingService
                                        ? "Update service information."
                                        : "Add a new hospital service."}
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowModal(
                                        false
                                    )
                                }
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#294b68]"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="mt-6 space-y-4"
                        >

                            {/* SERVICE NAME */}

                            <div>

                                <label className="mb-1.5 block text-sm font-semibold text-[#294b68]">
                                    Service Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        formData.name
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    placeholder="Enter service name"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#1976c8]"
                                    required
                                />

                            </div>

                            {/* DESCRIPTION */}

                            <div>

                                <label className="mb-1.5 block text-sm font-semibold text-[#294b68]">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    placeholder="Enter service description"
                                    rows="3"
                                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#1976c8]"
                                    required
                                />

                            </div>

                            {/* IMAGE */}

                            <div>

                                <label className="mb-1.5 block text-sm font-semibold text-[#294b68]">
                                    Image URL
                                </label>

                                <input
                                    type="text"
                                    name="image"
                                    value={
                                        formData.image
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    placeholder="Enter image URL"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#1976c8]"
                                />

                            </div>

                            {/* ICON */}

                            <div>

                                <label className="mb-1.5 block text-sm font-semibold text-[#294b68]">
                                    Icon URL
                                </label>

                                <input
                                    type="text"
                                    name="icon"
                                    value={
                                        formData.icon
                                    }
                                    onChange={
                                        handleFormChange
                                    }
                                    placeholder="Enter icon URL"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#1976c8]"
                                />

                            </div>

                            {/* PRICE */}

                            <div>

                                <label className="mb-1.5 block text-sm font-semibold text-[#294b68]">
                                    Price
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        name="price"
                                        value={
                                            formData.price
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        min="0"
                                        placeholder="Enter service price"
                                        className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-[#1976c8]"
                                    />

                                </div>

                            </div>

                            {/* BUTTONS */}

                            <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(
                                            false
                                        )
                                    }
                                    disabled={
                                        saving
                                    }
                                    className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        saving
                                    }
                                    className="!rounded-xl bg-[#1976c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingService
                                        ? "Save Changes"
                                        : "Add Service"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {/* =================================================
                CHANGE STATUS CONFIRMATION
            ================================================= */}

            {statusService && (

                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">
                            <Power size={22} />
                        </div>

                        <h2 className="!mb-0 mt-4 !text-lg !font-bold !text-[#294b68]">
                            Change Service Status?
                        </h2>

                        <p className="!mb-0 mt-2 text-sm leading-6 text-gray-500">

                            Are you sure you
                            want to set{" "}

                            <span className="font-semibold text-[#294b68]">
                                {
                                    statusService.name
                                }
                            </span>{" "}

                            to{" "}

                            {statusService.status ===
                                "active"
                                ? "Inactive"
                                : "Active"}
                            ?

                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setStatusService(
                                        null
                                    )
                                }
                                disabled={
                                    saving
                                }
                                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleStatusChange
                                }
                                disabled={
                                    saving
                                }
                                className="!rounded-xl bg-[#1976c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving
                                    ? "Updating..."
                                    : "Confirm"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* =================================================
                DELETE CONFIRMATION
            ================================================= */}

            {deleteService && (

                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                            <Trash2 size={22} />
                        </div>

                        <h2 className="!mb-0 mt-4 !text-lg !font-bold !text-[#294b68]">
                            Delete Service?
                        </h2>

                        <p className="!mb-0 mt-2 text-sm leading-6 text-gray-500">

                            Are you sure you
                            want to delete{" "}

                            <span className="font-semibold text-[#294b68]">
                                {
                                    deleteService.name
                                }
                            </span>

                            ? This action
                            cannot be undone.

                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteService(
                                        null
                                    )
                                }
                                disabled={
                                    saving
                                }
                                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleDelete
                                }
                                disabled={
                                    saving
                                }
                                className="!rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving
                                    ? "Deleting..."
                                    : "Delete Service"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Services;
