import {
    Search,
    MoreVertical,
    UserRound,
    Mail,
    Phone,
    Eye,
    Power,
    Trash2,
    X,
    CheckCircle2,
    UsersRound,
} from "lucide-react";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Users = () => {

    /* =====================================================
       USERS
    ===================================================== */

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Arjun Kumar",
            email: "arjun@example.com",
            phone: "+91 98765 43210",
            role: "Patient",
            status: "Active",
        },
        {
            id: 2,
            name: "Anjali Nair",
            email: "anjali@example.com",
            phone: "+91 98765 12345",
            role: "Patient",
            status: "Active",
        },
        {
            id: 3,
            name: "Muhammed Shamil",
            email: "shamil@example.com",
            phone: "+91 98765 67890",
            role: "Patient",
            status: "Active",
        },
        {
            id: 4,
            name: "Sneha Thomas",
            email: "sneha@example.com",
            phone: "+91 98765 24680",
            role: "Patient",
            status: "Inactive",
        },
    ]);

    /* =====================================================
       SEARCH + FILTER
    ===================================================== */

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All Status");

    /* =====================================================
       ACTION MENU
    ===================================================== */

    const [openMenu, setOpenMenu] = useState(null);

    const [menuPosition, setMenuPosition] = useState({
        top: 0,
        left: 0,
    });

    /* =====================================================
       MODALS
    ===================================================== */

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [showDetails, setShowDetails] =
        useState(false);

    const [statusUser, setStatusUser] =
        useState(null);

    const [deleteUser, setDeleteUser] =
        useState(null);

    /* =====================================================
       FILTER USERS
    ===================================================== */

    const filteredUsers = users.filter((user) => {

        const searchValue =
            search.toLowerCase().trim();

        const matchesSearch =
            user.name
                .toLowerCase()
                .includes(searchValue) ||
            user.email
                .toLowerCase()
                .includes(searchValue) ||
            user.phone
                .toLowerCase()
                .includes(searchValue);

        const matchesStatus =
            statusFilter === "All Status" ||
            user.status === statusFilter;

        return (
            matchesSearch &&
            matchesStatus
        );
    });

    /* =====================================================
       SUMMARY COUNTS
    ===================================================== */

    const totalUsers = users.length;

    const activeUsers = users.filter(
        (user) => user.status === "Active"
    ).length;

    const inactiveUsers = users.filter(
        (user) => user.status === "Inactive"
    ).length;

    /* =====================================================
       OPEN ACTION MENU
    ===================================================== */

    const handleMenuClick = (
        event,
        userId
    ) => {

        event.stopPropagation();

        const rect =
            event.currentTarget.getBoundingClientRect();

        const menuWidth = 185;
        const menuHeight = 160;

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
            openMenu === userId
                ? null
                : userId
        );
    };

    /* =====================================================
       VIEW USER
    ===================================================== */

    const handleViewUser = (user) => {

        setSelectedUser(user);

        setShowDetails(true);

        setOpenMenu(null);
    };

    /* =====================================================
       CHANGE USER STATUS
    ===================================================== */

    const handleChangeStatus = () => {

        if (!statusUser) {
            return;
        }

        const newStatus =
            statusUser.status === "Active"
                ? "Inactive"
                : "Active";

        setUsers((prev) =>
            prev.map((user) =>
                user.id === statusUser.id
                    ? {
                        ...user,
                        status: newStatus,
                    }
                    : user
            )
        );

        setStatusUser(null);
    };

    /* =====================================================
       DELETE USER
    ===================================================== */

    const handleDeleteUser = () => {

        if (!deleteUser) {
            return;
        }

        setUsers((prev) =>
            prev.filter(
                (user) =>
                    user.id !== deleteUser.id
            )
        );

        setDeleteUser(null);
    };

    /* =====================================================
       CLOSE MENU
    ===================================================== */

    useEffect(() => {

        const handleOutsideClick = (
            event
        ) => {

            if (
                !event.target.closest(
                    "[data-user-menu]"
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

    return (
        <div className="space-y-6">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div>
                <h1 className="text-2xl font-bold text-[#294b68]">
                    Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage registered patients and user accounts.
                </p>
            </div>

            {/* =====================================================
                SUMMARY CARDS
            ===================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {/* TOTAL */}

                <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(41,75,104,0.10)]">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                Total Users
                            </p>

                            <p className="mt-2 text-2xl font-bold text-[#294b68]">
                                {totalUsers}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Registered accounts
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">
                            <UsersRound size={23} />
                        </div>

                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

                </div>

                {/* ACTIVE */}

                <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(41,75,104,0.10)]">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                Active Users
                            </p>

                            <p className="mt-2 text-2xl font-bold text-green-600">
                                {activeUsers}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Currently active
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                            <CheckCircle2 size={23} />
                        </div>

                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />

                </div>

                {/* INACTIVE */}

                <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(41,75,104,0.10)]">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                Inactive Users
                            </p>

                            <p className="mt-2 text-2xl font-bold text-gray-500">
                                {inactiveUsers}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Disabled accounts
                            </p>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                            <Power size={23} />
                        </div>

                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gray-500 transition-all duration-300 group-hover:w-full" />

                </div>

            </div>

            {/* =====================================================
                SEARCH + FILTER
            ===================================================== */}

            <div className="rounded-2xl border border-[#e5edf3] bg-white p-4 shadow-sm">

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
                            placeholder="Search name, email or phone..."
                            className="w-full rounded-xl border border-gray-200 bg-[#fafcfd] py-2.5 pl-10 pr-4 text-sm text-gray-600 outline-none transition focus:border-[#1976c8] focus:bg-white"
                        />

                    </div>

                    {/* FILTER */}

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                        className="rounded-xl border border-gray-200 bg-[#fafcfd] px-4 py-2.5 text-sm text-gray-600 outline-none transition focus:border-[#1976c8] focus:bg-white"
                    >

                        <option>
                            All Status
                        </option>

                        <option>
                            Active
                        </option>

                        <option>
                            Inactive
                        </option>

                    </select>

                </div>

            </div>

            {/* =====================================================
                DESKTOP TABLE
            ===================================================== */}

            <div className="hidden overflow-hidden rounded-2xl border border-[#e5edf3] bg-white shadow-sm lg:block">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px] text-left">

                        <thead className="border-b border-gray-100 bg-[#f8fafc]">

                            <tr>

                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    User
                                </th>

                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    Contact
                                </th>

                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {filteredUsers.map((user) => (

                                <tr
                                    key={user.id}
                                    className="group transition hover:bg-[#f9fcfe]"
                                >

                                    {/* USER */}

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] transition group-hover:bg-[#1976c8] group-hover:text-white">
                                                <UserRound size={19} />
                                            </div>

                                            <div>

                                                <p className="font-semibold text-[#294b68]">
                                                    {user.name}
                                                </p>

                                                <p className="mt-0.5 text-xs text-gray-400">
                                                    User ID: USR-
                                                    {user.id
                                                        .toString()
                                                        .padStart(
                                                            3,
                                                            "0"
                                                        )}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* CONTACT */}

                                    <td className="px-6 py-5">

                                        <div className="space-y-1.5">

                                            <div className="flex items-center gap-2 text-sm text-gray-600">

                                                <Mail
                                                    size={14}
                                                    className="text-[#1976c8]"
                                                />

                                                {user.email}

                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-gray-400">

                                                <Phone size={14} />

                                                {user.phone}

                                            </div>

                                        </div>

                                    </td>

                                    {/* ROLE */}

                                    <td className="px-6 py-5">

                                        <span className="rounded-full bg-[#eaf5fb] px-3 py-1.5 text-xs font-semibold text-[#1976c8]">
                                            {user.role}
                                        </span>

                                    </td>

                                    {/* STATUS */}

                                    <td className="px-6 py-5">

                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${user.status === "Active"
                                                ? "bg-green-50 text-green-600"
                                                : "bg-gray-100 text-gray-500"
                                                }`}
                                        >

                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${user.status ===
                                                    "Active"
                                                    ? "bg-green-500"
                                                    : "bg-gray-400"
                                                    }`}
                                            />

                                            {user.status}

                                        </span>

                                    </td>

                                    {/* ACTION */}

                                    <td className="px-6 py-5">

                                        <button
                                            type="button"
                                            data-user-menu
                                            onClick={(event) =>
                                                handleMenuClick(
                                                    event,
                                                    user.id
                                                )
                                            }
                                            className="rounded-lg p-2 text-gray-400 transition hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                                        >
                                            <MoreVertical
                                                size={18}
                                            />
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* =====================================================
                EMPTY DESKTOP STATE
            ===================================================== */}

            {filteredUsers.length === 0 && (

                <div className="hidden rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm lg:block">

                    <UsersRound
                        size={40}
                        className="mx-auto text-gray-300"
                    />

                    <h3 className="mt-4 text-lg font-semibold text-[#294b68]">
                        No users found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filter.
                    </p>

                </div>

            )}

            {/* =====================================================
                MOBILE CARDS
            ===================================================== */}

            <div className="space-y-4 lg:hidden">

                {filteredUsers.map((user) => (

                    <div
                        key={user.id}
                        className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md"
                    >

                        {/* TOP */}

                        <div className="flex items-start justify-between">

                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">
                                    <UserRound size={19} />
                                </div>

                                <div>

                                    <h2 className="font-bold text-[#294b68]">
                                        {user.name}
                                    </h2>

                                    <p className="mt-0.5 text-xs text-gray-400">
                                        User ID: USR-
                                        {user.id
                                            .toString()
                                            .padStart(
                                                3,
                                                "0"
                                            )}
                                    </p>

                                </div>

                            </div>

                            <button
                                type="button"
                                data-user-menu
                                onClick={(event) =>
                                    handleMenuClick(
                                        event,
                                        user.id
                                    )
                                }
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#1976c8]"
                            >
                                <MoreVertical
                                    size={18}
                                />
                            </button>

                        </div>

                        {/* CONTACT */}

                        <div className="mt-5 space-y-3">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4f8fb] text-[#1976c8]">
                                    <Mail size={15} />
                                </div>

                                <div>

                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                        Email
                                    </p>

                                    <p className="mt-0.5 text-sm text-gray-600">
                                        {user.email}
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4f8fb] text-[#1976c8]">
                                    <Phone size={15} />
                                </div>

                                <div>

                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                        Phone
                                    </p>

                                    <p className="mt-0.5 text-sm text-gray-600">
                                        {user.phone}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* ROLE + STATUS */}

                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                            <span className="rounded-full bg-[#eaf5fb] px-3 py-1.5 text-xs font-semibold text-[#1976c8]">
                                {user.role}
                            </span>

                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${user.status === "Active"
                                    ? "bg-green-50 text-green-600"
                                    : "bg-gray-100 text-gray-500"
                                    }`}
                            >

                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${user.status ===
                                        "Active"
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                        }`}
                                />

                                {user.status}

                            </span>

                        </div>

                        {/* BOTTOM ACCENT */}

                        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

                    </div>

                ))}

            </div>

            {/* =====================================================
                EMPTY MOBILE STATE
            ===================================================== */}

            {filteredUsers.length === 0 && (

                <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm lg:hidden">

                    <UsersRound
                        size={40}
                        className="mx-auto text-gray-300"
                    />

                    <h3 className="mt-4 text-lg font-semibold text-[#294b68]">
                        No users found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filter.
                    </p>

                </div>

            )}

            {/* =====================================================
                ACTION MENU
            ===================================================== */}

            {openMenu &&
                createPortal(

                    <div
                        data-user-menu
                        style={{
                            position: "fixed",
                            top: menuPosition.top,
                            left: menuPosition.left,
                        }}
                        className="z-[100] w-[185px] overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_12px_35px_rgba(41,75,104,0.18)]"
                    >

                        {(() => {

                            const user =
                                users.find(
                                    (item) =>
                                        item.id ===
                                        openMenu
                                );

                            if (!user) {
                                return null;
                            }

                            return (
                                <>
                                    {/* VIEW */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleViewUser(
                                                user
                                            )
                                        }
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-[#eaf5fb] hover:text-[#1976c8]"
                                    >
                                        <Eye size={16} />

                                        View Details
                                    </button>

                                    {/* STATUS */}

                                    <button
                                        type="button"
                                        onClick={() => {

                                            setStatusUser(
                                                user
                                            );

                                            setOpenMenu(
                                                null
                                            );

                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-600"
                                    >

                                        <Power size={16} />

                                        {user.status ===
                                            "Active"
                                            ? "Set Inactive"
                                            : "Set Active"}

                                    </button>

                                    {/* DELETE */}

                                    <button
                                        type="button"
                                        onClick={() => {

                                            setDeleteUser(
                                                user
                                            );

                                            setOpenMenu(
                                                null
                                            );

                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                                    >

                                        <Trash2
                                            size={16}
                                        />

                                        Delete

                                    </button>

                                </>
                            );

                        })()}

                    </div>,

                    document.body
                )}

            {/* =====================================================
                VIEW DETAILS MODAL
            ===================================================== */}

            {showDetails &&
                selectedUser && (

                    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                        <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

                            {/* HEADER */}

                            <div className="flex items-start justify-between">

                                <div>

                                    <h2 className="!text-lg font-bold text-[#294b68]">
                                        User Details
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        User ID: USR-
                                        {selectedUser.id
                                            .toString()
                                            .padStart(
                                                3,
                                                "0"
                                            )}
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowDetails(
                                            false
                                        )
                                    }
                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#294b68]"
                                >
                                    <X size={19} />
                                </button>

                            </div>

                            {/* USER PROFILE */}

                            <div className="mt-6 flex items-center gap-4 rounded-xl bg-[#f6f9fc] p-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">
                                    <UserRound
                                        size={24}
                                    />
                                </div>

                                <div>

                                    <h3 className="font-bold text-[#294b68]">
                                        {
                                            selectedUser.name
                                        }
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {
                                            selectedUser.role
                                        }
                                    </p>

                                </div>

                            </div>

                            {/* DETAILS */}

                            <div className="mt-5 space-y-4">

                                <div>

                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Email
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        {
                                            selectedUser.email
                                        }
                                    </p>

                                </div>

                                <div>

                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        {
                                            selectedUser.phone
                                        }
                                    </p>

                                </div>

                                <div>

                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Status
                                    </p>

                                    <span
                                        className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${selectedUser.status ===
                                            "Active"
                                            ? "bg-green-50 text-green-600"
                                            : "bg-gray-100 text-gray-500"
                                            }`}
                                    >

                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${selectedUser.status ===
                                                "Active"
                                                ? "bg-green-500"
                                                : "bg-gray-400"
                                                }`}
                                        />

                                        {
                                            selectedUser.status
                                        }

                                    </span>

                                </div>

                            </div>

                            {/* CLOSE */}

                            <div className="mt-6 flex justify-end">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowDetails(
                                            false
                                        )
                                    }
                                    className="!rounded-xl bg-[#1976c8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1565a8]"
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            {/* =====================================================
                CHANGE STATUS MODAL
            ===================================================== */}

            {statusUser && (

                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

                        {/* ICON */}

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8]">
                            <Power size={22} />
                        </div>

                        {/* TITLE */}

                        <h2 className="mt-4 !text-lg font-bold text-[#294b68]">
                            Change User Status?
                        </h2>

                        {/* MESSAGE */}

                        <p className="mt-2 text-sm leading-6 text-gray-500">

                            Are you sure you want to set{" "}

                            <span className="font-semibold text-[#294b68]">
                                {statusUser.name}
                            </span>{" "}

                            to{" "}

                            <span className="font-semibold text-[#1976c8]">
                                {statusUser.status ===
                                    "Active"
                                    ? "Inactive"
                                    : "Active"}
                            </span>
                            ?

                        </p>

                        {/* BUTTONS */}

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setStatusUser(
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
                                    handleChangeStatus
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
                DELETE CONFIRMATION MODAL
            ===================================================== */}

            {deleteUser && (

                <div className="fixed inset-0 z-[130] flex items-center justify-center bg-[#102a43]/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#dcebf5] bg-white p-6 shadow-[0_20px_60px_rgba(41,75,104,0.20)]">

                        {/* ICON */}

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                            <Trash2 size={22} />
                        </div>

                        {/* TITLE */}

                        <h2 className="mt-4 !text-lg font-bold text-[#294b68]">
                            Delete User?
                        </h2>

                        {/* MESSAGE */}

                        <p className="mt-2 text-sm leading-6 text-gray-500">

                            Are you sure you want to delete{" "}

                            <span className="font-semibold text-[#294b68]">
                                {deleteUser.name}
                            </span>
                            ?

                            <br />

                            This action cannot be undone.

                        </p>

                        {/* BUTTONS */}

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteUser(
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
                                    handleDeleteUser
                                }
                                className="!rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                            >
                                Delete User
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Users;