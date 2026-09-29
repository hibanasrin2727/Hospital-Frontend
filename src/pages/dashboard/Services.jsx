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

const Services = () => {
    /* =====================================================
       SERVICES DATA
    ===================================================== */

    const [services, setServices] = useState([
        {
            id: 1,
            name: "Cardiology",
            description:
                "Complete heart and cardiovascular services.",
            image: "",
            icon: "",
            price: 500,
            status: "active",
        },
        {
            id: 2,
            name: "Orthopedic Care",
            description:
                "Diagnosis and treatment of bone and joint conditions.",
            image: "",
            icon: "",
            price: 400,
            status: "active",
        },
        {
            id: 3,
            name: "Dermatology",
            description:
                "Medical care for skin, hair and nail conditions.",
            image: "",
            icon: "",
            price: 350,
            status: "active",
        },
        {
            id: 4,
            name: "General Consultation",
            description:
                "General medical consultation and health checkups.",
            image: "",
            icon: "",
            price: 300,
            status: "active",
        },
        {
            id: 5,
            name: "Emergency Care",
            description:
                "Immediate medical attention for emergency cases.",
            image: "",
            icon: "",
            price: 1000,
            status: "active",
        },
        {
            id: 6,
            name: "Health Checkup",
            description:
                "Routine health screening and preventive care.",
            image: "",
            icon: "",
            price: 750,
            status: "active",
        },
    ]);

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

    const [formData, setFormData] =
        useState({
            name: "",
            description: "",
            image: "",
            icon: "",
            price: "",
        });

    /* =====================================================
       CLOSE ACTION MENU
    ===================================================== */

    useEffect(() => {
        const handleOutsideClick = (event) => {
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

    const filteredServices = services.filter(
        (service) => {
            const searchValue =
                search.toLowerCase().trim();

            const matchesSearch =
                service.name
                    .toLowerCase()
                    .includes(searchValue) ||
                service.description
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                statusFilter === "all" ||
                service.status === statusFilter;

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

    const openEditModal = (service) => {
        setEditingService(service);

        setFormData({
            name: service.name,
            description: service.description,
            image: service.image || "",
            icon: service.icon || "",
            price: service.price || "",
        });

        setOpenMenu(null);
        setShowModal(true);
    };

    /* =====================================================
       FORM CHANGE
    ===================================================== */

    const handleFormChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* =====================================================
       ADD / EDIT SERVICE
    ===================================================== */

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.name.trim()) {
            return;
        }

        if (!formData.description.trim()) {
            return;
        }

        if (editingService) {
            setServices((prev) =>
                prev.map((service) =>
                    service.id ===
                        editingService.id
                        ? {
                            ...service,
                            name:
                                formData.name,
                            description:
                                formData.description,
                            image:
                                formData.image,
                            icon:
                                formData.icon,
                            price:
                                Number(
                                    formData.price
                                ) || 0,
                        }
                        : service
                )
            );
        } else {
            const newService = {
                id: Date.now(),
                name: formData.name,
                description:
                    formData.description,
                image:
                    formData.image,
                icon:
                    formData.icon,
                price:
                    Number(
                        formData.price
                    ) || 0,
                status: "active",
            };

            setServices((prev) => [
                ...prev,
                newService,
            ]);
        }

        setShowModal(false);
        setEditingService(null);
    };

    /* =====================================================
       STATUS CONFIRMATION
    ===================================================== */

    const handleToggleStatus = (
        serviceId
    ) => {
        const service = services.find(
            (item) =>
                item.id === serviceId
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

    const handleStatusChange = () => {
        if (!statusService) {
            return;
        }

        setServices((prev) =>
            prev.map((service) =>
                service.id ===
                    statusService.id
                    ? {
                        ...service,
                        status:
                            service.status ===
                                "active"
                                ? "inactive"
                                : "active",
                    }
                    : service
            )
        );

        setStatusService(null);
    };

    /* =====================================================
       DELETE CONFIRMATION
    ===================================================== */

    const handleDeleteService = (
        serviceId
    ) => {
        const service = services.find(
            (item) =>
                item.id === serviceId
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

    const handleDelete = () => {
        if (!deleteService) {
            return;
        }

        setServices((prev) =>
            prev.filter(
                (service) =>
                    service.id !==
                    deleteService.id
            )
        );

        setDeleteService(null);
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
            event.currentTarget.getBoundingClientRect();

        const menuWidth = 170;
        const menuHeight = 125;

        let left =
            rect.right - menuWidth;

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

    const formatPrice = (price) => {
        return Number(
            price || 0
        ).toLocaleString("en-IN");
    };

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

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">

                {filteredServices.map((service) => (
                    <div
                        key={service.id}
                        className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c9dfed] hover:shadow-[0_12px_30px_rgba(41,75,104,0.12)]"
                    >

                        {/* =========================================
                TOP SECTION
            ========================================= */}

                        <div className="flex items-start justify-between">

                            {/* ICON */}

                            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-[#eaf5fb] text-[#1976c8] transition-all duration-300 group-hover:bg-[#1976c8] group-hover:text-white">

                                {service.icon ? (
                                    <img
                                        src={service.icon}
                                        alt={service.name}
                                        className="h-full w-full object-contain p-2.5"
                                    />
                                ) : (
                                    <Stethoscope size={26} />
                                )}

                            </div>

                            {/* STATUS + MENU */}

                            <div className="flex items-center gap-1">

                                <span
                                    className={
                                        service.status === "active"
                                            ? "rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-600"
                                            : "rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-500"
                                    }
                                >
                                    {service.status === "active"
                                        ? "Active"
                                        : "Inactive"}
                                </span>

                                <button
                                    type="button"
                                    data-service-menu
                                    onClick={(event) =>
                                        handleMenuClick(
                                            event,
                                            service.id
                                        )
                                    }
                                    className="rounded-lg p-1.5 text-gray-400 transition hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                                >
                                    <MoreVertical size={18} />
                                </button>

                            </div>

                        </div>

                        {/* =========================================
                SERVICE INFORMATION
            ========================================= */}

                        <div className="mt-5">

                            <h2 className="truncate text-[17px] font-bold text-[#294b68]">
                                {service.name}
                            </h2>

                            <p className="mt-2 min-h-[48px] line-clamp-2 text-[13px] leading-6 text-gray-500">
                                {service.description}
                            </p>

                        </div>

                        {/* =========================================
                PRICE SECTION
            ========================================= */}

                        <div className="mt-5 border-t border-gray-100 pt-4">

                            <div className="flex items-end justify-between">

                                {/* PRICE */}

                                <div>

                                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Service Price
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-[#294b68]">
                                        ₹{formatPrice(service.price)}
                                    </p>

                                </div>

                                {/* SERVICE LABEL */}

                                <div className="flex h-8 items-center rounded-lg bg-[#f6f9fc] px-2.5">

                                    <span className="text-[10px] font-semibold text-[#1976c8]">
                                        Medical
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* =========================================
                BOTTOM HOVER LINE
            ========================================= */}

                        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

                    </div>
                ))}

            </div>

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {filteredServices.length ===
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
                            top: menuPosition.top,
                            left: menuPosition.left,
                        }}
                        className="z-[100] w-[170px] overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_12px_35px_rgba(41,75,104,0.18)]"
                    >

                        {(() => {
                            const service =
                                services.find(
                                    (item) =>
                                        item.id ===
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
                                                service.id
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
                                                service.id
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
                                    className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="!rounded-xl bg-[#1976c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]"
                                >
                                    {editingService
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
                                Delete Service
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Services;