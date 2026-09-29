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
    // DEPARTMENT DATA
    // =====================================================

    const [departments, setDepartments] = useState([
        {
            id: 1,
            name: "Cardiology & Heart Care",
            description: "Heart and cardiovascular care",
            doctors: 6,
            status: "Active",
        },
        {
            id: 2,
            name: "Orthopedics",
            description: "Bone, joint and muscle care",
            doctors: 5,
            status: "Active",
        },
        {
            id: 3,
            name: "Dermatology",
            description: "Skin, hair and nail care",
            doctors: 4,
            status: "Active",
        },
        {
            id: 4,
            name: "Neurology",
            description: "Brain and nervous system care",
            doctors: 3,
            status: "Active",
        },
    ]);


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


    // =====================================================
    // FORM
    // =====================================================

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        doctors: "",
    });


    // =====================================================
    // FILTER
    // =====================================================

    const filteredDepartments = departments.filter((department) => {

        const searchText = search.toLowerCase();

        return (
            department.name.toLowerCase().includes(searchText) ||
            department.description.toLowerCase().includes(searchText)
        );
    });


    // =====================================================
    // CLOSE MENU ON OUTSIDE CLICK
    // =====================================================

    useEffect(() => {

        const handleClickOutside = (event) => {

            const clickedInsideAction =
                event.target.closest("[data-department-action]");

            if (!clickedInsideAction) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

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

        window.addEventListener("scroll", handleScroll, true);

        window.addEventListener("resize", handleResize);

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

    const handleActionMenu = (departmentId, event) => {

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
            window.innerHeight - buttonRect.bottom;

        const spaceAbove = buttonRect.top;

        let top;

        if (spaceBelow >= menuHeight + gap) {

            top = buttonRect.bottom + gap;

        } else if (spaceAbove >= menuHeight + gap) {

            top = buttonRect.top - menuHeight - gap;

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
            doctors: "",
        });

        setShowModal(true);
    };


    // =====================================================
    // OPEN EDIT MODAL
    // =====================================================

    const handleEditDepartment = (department) => {

        setEditingDepartment(department);

        setFormData({
            name: department.name,
            description: department.description,
            doctors: department.doctors,
        });

        setOpenMenu(null);

        setShowModal(true);
    };


    // =====================================================
    // FORM INPUT
    // =====================================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // =====================================================
    // SAVE DEPARTMENT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!formData.name.trim()) {
            return;
        }

        if (editingDepartment) {

            setDepartments((previous) =>
                previous.map((department) =>
                    department.id === editingDepartment.id
                        ? {
                            ...department,
                            name: formData.name,
                            description:
                                formData.description,
                            doctors:
                                Number(formData.doctors) || 0,
                        }
                        : department
                )
            );

        } else {

            const newDepartment = {
                id: Date.now(),
                name: formData.name,
                description: formData.description,
                doctors: Number(formData.doctors) || 0,
                status: "Active",
            };

            setDepartments((previous) => [
                ...previous,
                newDepartment,
            ]);
        }

        setShowModal(false);

        setEditingDepartment(null);

        setFormData({
            name: "",
            description: "",
            doctors: "",
        });
    };


    // =====================================================
    // DELETE DEPARTMENT
    // =====================================================

    const handleDelete = () => {

        if (!deleteDepartment) {
            return;
        }

        setDepartments((previous) =>
            previous.filter(
                (department) =>
                    department.id !== deleteDepartment.id
            )
        );

        setDeleteDepartment(null);
    };


    // =====================================================
    // TOGGLE STATUS
    // =====================================================

    const handleStatusChange = () => {

        if (!statusDepartment) {
            return;
        }

        setDepartments((previous) =>
            previous.map((department) =>
                department.id === statusDepartment.id
                    ? {
                        ...department,
                        status:
                            department.status === "Active"
                                ? "Inactive"
                                : "Active",
                    }
                    : department
            )
        );

        setStatusDepartment(null);
    };


    // =====================================================
    // ACTION DROPDOWN
    // =====================================================

    const ActionDropdown = ({ department }) => {

        if (
            !department ||
            openMenu !== department.id
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
                    top: `${menuPosition.top}px`,
                    right: `${menuPosition.right}px`,
                }}
                className="z-[99999] w-44 overflow-hidden rounded-xl border border-[#dcebf5] bg-white py-1 shadow-[0_15px_40px_rgba(41,75,104,0.20)]"
            >

                {/* Edit */}

                <button
                    type="button"
                    onClick={() =>
                        handleEditDepartment(department)
                    }
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#294b68] transition hover:bg-[#f7fafc] hover:text-[#1976c8]"
                >
                    <Pencil size={16} />
                    <span>Edit</span>
                </button>


                { }

                <button
                    type="button"
                    onClick={() => {
                        setStatusDepartment(department);
                        setOpenMenu(null);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#294b68] transition hover:bg-[#f7fafc] hover:text-[#1976c8]"
                >
                    <Power size={16} />
                    <span>
                        {department.status === "Active"
                            ? "Set Inactive"
                            : "Set Active"}
                    </span>
                </button>


                { }

                <button
                    type="button"
                    onClick={() => {
                        setDeleteDepartment(department);
                        setOpenMenu(null);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
                >
                    <Trash2 size={16} />
                    <span>Delete</span>
                </button>

            </div>,

            document.body
        );
    };


    return (
        <div className="space-y-6">

            {/* =====================================================
                HEADER
                ===================================================== */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

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
                    className="flex items-center justify-center gap-2 !rounded-lg bg-[#1976c8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]"
                >
                    <Plus size={18} />
                    Add Department
                </button>

            </div>


            {/* =====================================================
                SEARCH
                ===================================================== */}

            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">

                <div className="relative w-full md:max-w-md">

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search departments..."
                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                    />

                </div>

            </div>


            {/* =====================================================
                DEPARTMENT CARDS
                ===================================================== */}

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">

                {filteredDepartments.map((department) => (

                    <div
                        key={department.id}
                        className="group relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#dcebf5] hover:shadow-[0_12px_30px_rgba(41,75,104,0.08)]"
                    >

                        {/* Top */}

                        <div className="flex items-start justify-between">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] transition group-hover:scale-105">
                                <Building2 size={23} />
                            </div>


                            <div
                                data-department-action
                                className="relative"
                            >

                                <button
                                    type="button"
                                    onClick={(event) =>
                                        handleActionMenu(
                                            department.id,
                                            event
                                        )
                                    }
                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#1976c8]"
                                >
                                    <MoreVertical size={19} />
                                </button>

                            </div>

                        </div>


                        {/* Department Name */}

                        <div className="mt-5">

                            <h2 className="!m-0 !text-lg !font-bold !text-[#294b68]">
                                {department.name}
                            </h2>

                            <p className="!mb-0 mt-1 text-sm text-gray-500">
                                {department.description}
                            </p>

                        </div>


                        {/* Details */}

                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                            <div className="flex items-center gap-2 text-sm text-gray-500">

                                <Users size={17} />

                                <span>
                                    {department.doctors} Doctors
                                </span>

                            </div>


                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${department.status === "Active"
                                    ? "bg-green-50 text-green-600"
                                    : "bg-gray-100 text-gray-500"
                                    }`}
                            >
                                {department.status}
                            </span>

                        </div>

                    </div>

                ))}

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
                        Try searching with a different department name.
                    </p>

                </div>

            )}


            {/* =====================================================
                ACTION DROPDOWN
                ===================================================== */}

            {openMenu !== null && (
                <ActionDropdown
                    department={departments.find(
                        (department) =>
                            department.id === openMenu
                    )}
                />
            )}


            {/* =====================================================
                ADD / EDIT MODAL
                ===================================================== */}

            {showModal && (

                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#dcebf5] bg-white shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

                        {/* Modal Header */}

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


                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 p-6"
                        >

                            {/* Name */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Department Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter department name"
                                    required
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                                />

                            </div>


                            {/* Description */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter department description"
                                    rows="3"
                                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                                />

                            </div>


                            {/* Doctors */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-[#294b68]">
                                    Number of Doctors
                                </label>

                                <input
                                    type="number"
                                    name="doctors"
                                    value={formData.doctors}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="Enter number of doctors"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#294b68] outline-none transition focus:border-[#1976c8] focus:ring-2 focus:ring-[#eaf5fb]"
                                />

                            </div>


                            {/* Buttons */}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="!rounded-xl bg-[#1976c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]"
                                >
                                    {editingDepartment
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
                            {statusDepartment.status === "Active"
                                ? "Inactive"
                                : "Active"}
                            ?
                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setStatusDepartment(null)
                                }
                                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleStatusChange}
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
                                className="!rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="!rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                            >
                                Delete Department
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Departments;