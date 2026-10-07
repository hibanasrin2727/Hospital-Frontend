
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

// =====================================================
// API URL
// =====================================================

    const API_URL =
        "http://localhost:5000/api/dashboard/services";


    // =====================================================
    // SERVICE DATA
    // =====================================================

    const [services, setServices] = useState([]);


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

    const [editingService, setEditingService] = useState(null);

    const [deleteService, setDeleteService] = useState(null);

    const [statusService, setStatusService] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    // =====================================================
    // FORM
    // =====================================================

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        icon: "",
        price: "",
    });


    // =====================================================
    // GET TOKEN
    // =====================================================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // =====================================================
    // FETCH SERVICES
    // =====================================================

    const fetchServices = async () => {

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
                "Something went wrong while loading services."
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // FETCH ON PAGE LOAD
    // =====================================================

    useEffect(() => {

        fetchServices();

    }, []);


    // =====================================================
    // FILTER
    // =====================================================

    const filteredServices =
        services.filter(
            (service) => {

                const searchText =
                    search
                        .toLowerCase()
                        .trim();


                return (

                    service.name
                        ?.toLowerCase()
                        .includes(searchText) ||

                    service.description
                        ?.toLowerCase()
                        .includes(searchText)

                );

            }
        );


    // =====================================================
    // CLOSE MENU ON OUTSIDE CLICK
    // =====================================================

    useEffect(() => {

        const handleClickOutside =
            (event) => {

                const clickedInsideAction =
                    event.target.closest(
                        "[data-service-action]"
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
        serviceId,
        event
    ) => {

        if (openMenu === serviceId) {

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


        setOpenMenu(serviceId);

    };


    // =====================================================
    // OPEN ADD MODAL
    // =====================================================

    const handleAddService = () => {

        setEditingService(null);

        setFormData({
            name: "",
            description: "",
            image: "",
            icon: "",
            price: "",
        });

        setError("");

        setShowModal(true);

    };


    // =====================================================
    // OPEN EDIT MODAL
    // =====================================================

    const handleEditService = (
        service
    ) => {

        setEditingService(service);

        setFormData({
            name:
                service.name || "",

            description:
                service.description || "",

            image:
                service.image || "",

            icon:
                service.icon || "",

            price:
                service.price ?? "",
        });


        setOpenMenu(null);

        setError("");

        setShowModal(true);

    };


    // =====================================================
    // FORM INPUT
    // =====================================================

    const handleChange = (
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
    // SAVE SERVICE
    // CREATE / UPDATE
    // =====================================================

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


            const token =
                getToken();


            if (!token) {

                setError(
                    "Authentication token not found. Please login again."
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


            // =================================================
            // UPDATE
            // =================================================

            if (editingService) {

                const response =
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


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to update service"
                    );

                }


                setServices(
                    (previous) =>
                        previous.map(
                            (service) =>
                                service._id ===
                                    editingService._id
                                    ? data.service
                                    : service
                        )
                );

            }


            // =================================================
            // CREATE
            // =================================================

            else {

                const response =
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


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to create service"
                    );

                }


                setServices(
                    (previous) => [
                        data.service,
                        ...previous,
                    ]
                );

            }


            // =================================================
            // RESET
            // =================================================

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
                "Something went wrong while saving service."
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // STATUS CONFIRMATION
    // =====================================================

    const handleStatusClick = (
        service
    ) => {

        setStatusService(service);

        setOpenMenu(null);

    };


    // =====================================================
    // CHANGE STATUS
    // =====================================================

    const handleStatusChange = async () => {

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
                    "Authentication token not found. Please login again."
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


            setServices(
                (previous) =>
                    previous.map(
                        (service) =>
                            service._id ===
                                statusService._id
                                ? data.service
                                : service
                    )
            );


            setStatusService(null);


        } catch (error) {

            console.error(
                "Status change error:",
                error
            );


            setError(
                error.message ||
                "Something went wrong while changing service status."
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // DELETE CONFIRMATION
    // =====================================================

    const handleDeleteClick = (
        service
    ) => {

        setDeleteService(service);

        setOpenMenu(null);

    };


    // =====================================================
    // DELETE SERVICE
    // =====================================================

    const handleDelete = async () => {

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
                    "Authentication token not found. Please login again."
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


            setServices(
                (previous) =>
                    previous.filter(
                        (service) =>
                            service._id !==
                            deleteService._id
                    )
            );


            setDeleteService(null);


        } catch (error) {

            console.error(
                "Delete service error:",
                error
            );


            setError(
                error.message ||
                "Something went wrong while deleting service."
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================================
    // FORMAT PRICE
    // =====================================================

    const formatPrice = (
        price
    ) => {

        return Number(
            price || 0
        ).toLocaleString(
            "en-IN"
        );

    };


    // =====================================================
    // ACTION DROPDOWN
    // =====================================================

    const ActionDropdown = ({
        service,
    }) => {

        if (
            !service ||
            openMenu !== service._id
        ) {

            return null;

        }


        return createPortal(

            <div
                data-service-action
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
                        handleEditService(
                            service
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
                    onClick={() =>
                        handleStatusClick(
                            service
                        )
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#294b68] transition hover:bg-[#f7fafc] hover:text-[#1976c8]"
                >

                    <Power size={16} />

                    <span>
                        {service.status ===
                            "active"
                            ? "Set Inactive"
                            : "Set Active"}
                    </span>

                </button>


                {/* DELETE */}

                <button
                    type="button"
                    onClick={() =>
                        handleDeleteClick(
                            service
                        )
                    }
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
                        Loading services...
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
                        Services
                    </h1>

                    <p className="!mb-0 mt-1 text-sm text-gray-500">
                        Manage hospital services,
                        pricing and availability.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={handleAddService}
                    className="flex shrink-0 items-center justify-center gap-2 !rounded-lg bg-[#1976c8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]"
                >

                    <Plus size={18} />

                    Add Service

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
                SEARCH + RESULT COUNT
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
                            placeholder="Search services..."
                            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                        />

                    </div>


                    {/* RESULT COUNT */}

                    <div className="flex items-center justify-between gap-3">

                        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500">

                            <span className="font-semibold text-[#294b68]">
                                {filteredServices.length}
                            </span>

                            <span className="ml-1">
                                Services
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                SERVICE CARDS
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

                    {filteredServices.map((service) => (

            <div
                key={service._id}
                className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]"
            >

                {/* =================================================
                    TOP
                ================================================= */}

                <div className="flex items-start justify-between">

                    {/* SERVICE IMAGE + ICON */}

                    <div className="relative">

                        {/* SERVICE IMAGE */}

                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-[#eaf5fb]">

                            {service.image ? (

                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(event) => {
                                        event.currentTarget.style.display =
                                            "none";
                                    }}
                                />

                            ) : (

                                <Stethoscope
                                    size={28}
                                    className="text-[#1976c8]"
                                />

                            )}

                        </div>


                        {/* SERVICE ICON */}

                        {service.icon && (

                            <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-[#1976c8] shadow-sm">

                                <img
                                    src={service.icon}
                                    alt=""
                                    className="h-full w-full object-contain p-1.5"
                                    onError={(event) => {
                                        event.currentTarget.style.display =
                                            "none";
                                    }}
                                />

                            </div>

                        )}

                    </div>


                    {/* ACTION */}

                    <div
                        data-service-action
                        className="relative"
                    >

                        <button
                            type="button"
                            onClick={(event) =>
                                handleActionMenu(
                                    service._id,
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


                {/* =================================================
                    SERVICE NAME
                ================================================= */}

                <div className="mt-5">

                    <h2 className="!m-0 !text-lg !font-bold !text-[#294b68] transition-colors duration-300 group-hover:text-[#1976c8]">
                        {service.name}
                    </h2>

                    <p className="!mb-0 mt-1 line-clamp-2 text-sm leading-6 text-gray-500">
                        {service.description ||
                            "Professional healthcare service provided by our experienced medical team."}
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
                            ₹
                            {formatPrice(
                                service.price
                            )}
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


                {/* BLUE HOVER LINE */}

                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

            </div>

        ))}

                </div>

</div>





            {/* =====================================================
                EMPTY SEARCH RESULT
            ===================================================== */}

            {filteredServices.length === 0 && (

                <div className="rounded-2xl border border-dashed border-[#dcebf5] bg-white px-6 py-12 text-center">

                    <Stethoscope
                        size={40}
                        className="mx-auto text-gray-300"
                    />

                    <h3 className="!mb-0 mt-4 text-base font-bold text-[#294b68]">
                        No services found
                    </h3>

                    <p className="!mb-0 mt-1 text-sm text-gray-400">

                        {search
                            ? "Try searching with a different service name."
                            : "Add your first hospital service."}

                    </p>

                </div>

            )}


            {/* =====================================================
                ACTION DROPDOWN
            ===================================================== */}

            {openMenu !== null && (

                <ActionDropdown
                    service={
                        services.find(
                            (service) =>
                                service._id ===
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

                                    {editingService
                                        ? "Edit Service"
                                        : "Add Service"}

                                </h2>

                                <p className="!mb-0 mt-1 text-xs text-gray-400">

                                    {editingService
                                        ? "Update service information below."
                                        : "Enter service information below."}

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
                            className="max-h-[75vh] space-y-5 overflow-y-auto p-6"
                        >

                            {/* SERVICE NAME */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Service Name
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
                                    placeholder="Enter service name"
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
                                    placeholder="Enter service description"
                                    rows="3"
                                    required
                                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                                />

                            </div>


                            {/* IMAGE */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Image URL
                                </label>

                                <input
                                    type="text"
                                    name="image"
                                    value={
                                        formData.image
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter image URL"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                                />

                            </div>


                            {/* ICON */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Icon URL
                                </label>

                                <input
                                    type="text"
                                    name="icon"
                                    value={
                                        formData.icon
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter icon URL"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                                />

                            </div>


                            {/* PRICE */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
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
                                            handleChange
                                        }
                                        min="0"
                                        placeholder="Enter service price"
                                        className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                                    />

                                </div>

                            </div>


                            {/* BUTTONS */}

                            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">

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
                                        : editingService
                                            ? "Update Service"
                                        : "Add Service"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* =====================================================
                STATUS CONFIRMATION
            ===================================================== */}

            {statusService && (

                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">


                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">

                            <Power size={22} />

                        </div>


                        <h2 className="!mb-0 mt-4 !text-lg !font-bold !text-[#294b68]">
                            Change Service Status?
                        </h2>


                        <p className="!mb-0 mt-2 text-sm leading-6 text-gray-500">

                            Are you sure you want to set{" "}

                            <span className="font-semibold text-[#294b68]">
                                {statusService.name}
                            </span>{" "}

                            to{" "}

                            {statusService.status ===
                                "active"
                                ? "Inactive"
                                : "Active"}?

                        </p>


                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setStatusService(null)
                                }
                                disabled={saving}
                                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                Cancel

                            </button>


                            <button
                                type="button"
                                onClick={
                                    handleStatusChange
                                }
                                disabled={saving}
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


            {/* =====================================================
                DELETE CONFIRMATION
            ===================================================== */}

            {deleteService && (

                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">


                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">

                            <Trash2 size={22} />

                        </div>


                        <h2 className="!mb-0 mt-4 !text-lg !font-bold !text-[#294b68]">
                            Delete Service?
                        </h2>


                        <p className="!mb-0 mt-2 text-sm leading-6 text-gray-500">

                            Are you sure you want to delete{" "}

                            <span className="font-semibold text-[#294b68]">
                                {deleteService.name}
                            </span>

                            ? This action cannot be undone.

                        </p>


                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteService(null)
                                }
                                disabled={saving}
                                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                Cancel

                            </button>


                            <button
                                type="button"
                                onClick={
                                    handleDelete
                                }
                                disabled={saving}
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