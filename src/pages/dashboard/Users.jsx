
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
    ShieldCheck,
    UserCheck,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import { createPortal } from "react-dom";

const Users = () => {

    /* =====================================================
       API
    ===================================================== */

    const API_URL =
        "http://localhost:5000/api/dashboard/users";


    /* =====================================================
       USERS
    ===================================================== */

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);


    /* =====================================================
       USER LIST REF
    ===================================================== */

    const userListRef = useRef(null);


    /* =====================================================
       TOKEN
    ===================================================== */

    const getToken = () => {
        return localStorage.getItem("token");
    };


    /* =====================================================
       FETCH USERS
    ===================================================== */

    const fetchUsers = async () => {

        try {

            setLoading(true);

            const token = getToken();

            if (!token) {

                console.error(
                    "Admin token not found"
                );

                setUsers([]);

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
                    "Failed to fetch users"
                );
            }

            const formattedUsers =
                (data.users || []).map(
                    (user) => ({
                        id: user._id,

                        name:
                            user.name ||
                            "Unknown User",

                        email:
                            user.email ||
                            "No email",

                        phone:
                            user.phone ||
                            "No phone",

                        role:
                            user.role === "admin"
                                ? "Admin"
                                : "Patient",

                        status:
                            user.status === "active"
                                ? "Active"
                                : "Inactive",
                    })
                );

            setUsers(
                formattedUsers
            );

        } catch (error) {

            console.error(
                "Fetch users error:",
                error
            );

            setUsers([]);

        } finally {

            setLoading(false);

        }
    };


    /* =====================================================
       FETCH ON PAGE LOAD
    ===================================================== */

    useEffect(() => {
        fetchUsers();
    }, []);


    /* =====================================================
       SEARCH + FILTER
    ===================================================== */

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All Status");

    const [roleFilter, setRoleFilter] =
        useState("All Roles");


    /* =====================================================
       ACTION MENU
    ===================================================== */

    const [openMenu, setOpenMenu] =
        useState(null);

    const [menuPosition, setMenuPosition] =
        useState({
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
       GET INITIALS
    ===================================================== */

    const getInitials = (name) => {

        if (!name) {
            return "U";
        }

        const words =
            name.trim().split(" ");

        if (words.length === 1) {

            return words[0]
                .substring(0, 2)
                .toUpperCase();

        }

        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();
    };


    /* =====================================================
       FILTER USERS
    ===================================================== */

    const filteredUsers =
        users.filter((user) => {

            const searchValue =
                search
                    .toLowerCase()
                    .trim();

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
                statusFilter ===
                "All Status" ||
                user.status ===
                statusFilter;

            const matchesRole =
                roleFilter ===
                "All Roles" ||
                user.role ===
                roleFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesRole
            );
        });


    /* =====================================================
       SUMMARY COUNTS
    ===================================================== */

    const totalUsers =
        users.length;

    const activeUsers =
        users.filter(
            (user) =>
                user.status ===
                "Active"
        ).length;

    const inactiveUsers =
        users.filter(
            (user) =>
                user.status ===
                "Inactive"
        ).length;


    /* =====================================================
       SCROLL USER LIST TO TOP
    ===================================================== */

    useEffect(() => {

        if (userListRef.current) {

            userListRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        }

    }, [
        search,
        statusFilter,
        roleFilter,
    ]);


    /* =====================================================
       OPEN ACTION MENU
    ===================================================== */

    const handleMenuClick = (
        event,
        userId
    ) => {

        event.stopPropagation();

        const rect =
            event.currentTarget
                .getBoundingClientRect();

        const menuWidth = 190;
        const menuHeight = 160;

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
            openMenu === userId
                ? null
                : userId
        );
    };


    /* =====================================================
       VIEW USER
    ===================================================== */

    const handleViewUser = (
        user
    ) => {

        setSelectedUser(user);

        setShowDetails(true);

        setOpenMenu(null);
    };


    /* =====================================================
       CHANGE USER STATUS
    ===================================================== */

    const handleChangeStatus =
        async () => {

            if (!statusUser) {
                return;
            }

            try {

                const token =
                    getToken();

                if (!token) {

                    alert(
                        "Admin token not found"
                    );

                    return;
                }

                const newStatus =
                    statusUser.status ===
                        "Active"
                        ? "inactive"
                        : "active";

                const response =
                    await fetch(
                        `${API_URL}/${statusUser.id}`,
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
                        "Failed to change user status"
                    );

                }

                await fetchUsers();

                setStatusUser(null);

            } catch (error) {

                console.error(
                    "Change user status error:",
                    error
                );

                alert(
                    error.message
                );

            }
        };


    /* =====================================================
       DELETE USER
    ===================================================== */

    const handleDeleteUser =
        async () => {

            if (!deleteUser) {
                return;
            }

            try {

                const token =
                    getToken();

                if (!token) {

                    alert(
                        "Admin token not found"
                    );

                    return;
                }

                const response =
                    await fetch(
                        `${API_URL}/${deleteUser.id}`,
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
                        "Failed to delete user"
                    );

                }

                await fetchUsers();

                setDeleteUser(null);

            } catch (error) {

                console.error(
                    "Delete user error:",
                    error
                );

                alert(
                    error.message
                );

            }
        };


    /* =====================================================
       CLOSE MENU
    ===================================================== */

    useEffect(() => {

        const handleOutsideClick =
            (event) => {

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
            PAGE HEADER
        ===================================================== */}

            <div>
                <h1 className="!text-2xl font-bold text-[#294b68]">
                    Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage registered patients and user accounts.
                </p>
            </div>


            {/* =====================================================
            3 SUMMARY CARDS
        ===================================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                {/* TOTAL USERS */}

                <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]">

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

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#1976c8] group-hover:text-white">

                            <UsersRound size={23} />

                        </div>

                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#1976c8] transition-all duration-300 group-hover:w-full" />

                </div>


                {/* ACTIVE USERS */}

                <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]">

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

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-all duration-300 group-hover:scale-105">

                            <CheckCircle2 size={23} />

                        </div>

                    </div>

                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />

                </div>


                {/* INACTIVE USERS */}

                <div className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]">

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

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition-all duration-300 group-hover:scale-105">

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
                                setSearch(event.target.value)
                            }
                            placeholder="Search name, email or phone..."
                            className="w-full rounded-xl border border-gray-200 bg-[#fafcfd] py-2.5 pl-10 pr-4 text-sm text-gray-600 outline-none transition focus:border-[#1976c8] focus:bg-white"
                        />

                    </div>


                    {/* FILTER */}

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                        className="rounded-xl border border-gray-200 bg-[#fafcfd] px-4 py-2.5 text-sm text-gray-600 outline-none transition focus:border-[#1976c8] focus:bg-white"
                    >

                        <option>All Status</option>

                        <option>Active</option>

                        <option>Inactive</option>

                    </select>

                </div>

            </div>


            {/* =====================================================
            TABLE
        ===================================================== */}

            {/* =====================================================
    DESKTOP TABLE
===================================================== */}

            <div className="hidden overflow-hidden rounded-2xl border border-[#e5edf3] bg-white shadow-sm lg:block">

                {/* FIXED TABLE HEADER */}

                <div className="overflow-hidden">

                    <table className="w-full min-w-[900px] table-fixed text-left">

                        <thead className="border-b border-gray-100 bg-[#f8fafc]">

                            <tr>

                                <th className="w-[30%] px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    User
                                </th>

                                <th className="w-[30%] px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    Contact
                                </th>

                                <th className="w-[15%] px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    Role
                                </th>

                                <th className="w-[15%] px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    Status
                                </th>

                                <th className="w-[10%] px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    Action
                                </th>

                            </tr>

                        </thead>

                    </table>

                </div>


                {/* SCROLLABLE TABLE BODY */}

                <div
                    ref={userListRef}
                    className="h-[640px] overflow-auto scroll-smooth"
                >

                    <table className="w-full min-w-[900px] table-fixed text-left">

                        <tbody className="divide-y divide-gray-100">

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-6 py-14 text-center"
                                    >

                                        <div className="flex flex-col items-center justify-center">

                                            <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#eaf5fb] border-t-[#1976c8]" />

                                            <p className="mt-3 text-sm text-gray-500">
                                                Loading users...
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            ) : filteredUsers.length > 0 ? (

                                    filteredUsers.map((user) => (

                        <tr
                            key={user.id}
                            className="group transition hover:bg-[#f9fcfe]"
                        >

                            {/* USER */}

                            <td className="w-[30%] px-6 py-5">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] transition group-hover:bg-[#1976c8] group-hover:text-white">

                                        <UserRound size={19} />

                                    </div>

                                    <div className="min-w-0">

                                        <p className="truncate font-semibold text-[#294b68]">
                                            {user.name}
                                        </p>

                                        <p className="mt-0.5 truncate text-xs text-gray-400">
                                            User ID: {user.id}
                                        </p>

                                    </div>

                                </div>

                            </td>


                            {/* CONTACT */}

                            <td className="w-[30%] px-6 py-5">

                                <div className="space-y-1.5">

                                    <div className="flex items-center gap-2 text-sm text-gray-600">

                                        <Mail
                                            size={14}
                                            className="shrink-0 text-[#1976c8]"
                                        />

                                        <span className="truncate">
                                            {user.email}
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-400">

                                        <Phone
                                            size={14}
                                            className="shrink-0"
                                        />

                                        {user.phone}

                                    </div>

                                </div>

                            </td>


                            {/* ROLE */}

                            <td className="w-[15%] px-6 py-5">

                                <span className="inline-flex rounded-full bg-[#eaf5fb] px-3 py-1.5 text-xs font-semibold text-[#1976c8]">
                                    {user.role}
                                </span>

                            </td>


                            {/* STATUS */}

                            <td className="w-[15%] px-6 py-5">

                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${user.status === "Active"
                                            ? "bg-green-50 text-green-600"
                                            : "bg-gray-100 text-gray-500"
                                        }`}
                                >

                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${user.status === "Active"
                                                ? "bg-green-500"
                                                : "bg-gray-400"
                                            }`}
                                    />

                                    {user.status}

                                </span>

                            </td>


                            {/* ACTION */}

                            <td className="w-[10%] px-6 py-5">

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

                                    <MoreVertical size={18} />

                                </button>

                            </td>

                        </tr>

                    ))

                                ) : (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="px-6 py-14 text-center"
                                            >

                                                <UsersRound
                                                    size={40}
                                                    className="mx-auto text-gray-300"
                                                />

                                                <h3 className="mt-4 !text-lg font-semibold text-[#294b68]">
                                                    No users found
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Try changing your search or filter.
                                                </p>

                                            </td>

                                        </tr>

                )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* =====================================================
    MOBILE USER CARDS
===================================================== */}

            <div className="space-y-4 lg:hidden">

                {loading ? (

                    <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">

                        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#eaf5fb] border-t-[#1976c8]" />

                        <p className="mt-3 text-sm text-gray-500">
                            Loading users...
                        </p>

                    </div>

                ) : filteredUsers.length > 0 ? (

                        filteredUsers.map((user) => (

            <div
                key={user.id}
                className="group relative overflow-hidden rounded-2xl border border-[#e5edf3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe5f5] hover:shadow-[0_12px_30px_rgba(25,118,200,0.12)]"
            >

                {/* TOP */}

                <div className="flex items-start justify-between">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf5fb] text-[#1976c8] transition-all duration-300 group-hover:bg-[#1976c8] group-hover:text-white">

                            <UserRound size={19} />

                        </div>

                        <div className="min-w-0">

                            <h2 className="!text-base truncate font-bold text-[#294b68] transition-colors duration-300 group-hover:text-[#1976c8]">
                                {user.name}
                            </h2>

                            <p className="mt-0.5 truncate text-xs text-gray-400">
                                User ID: {user.id}
                            </p>

                        </div>

                    </div>


                    {/* ACTION */}

                    <button
                        type="button"
                        data-user-menu
                        onClick={(event) =>
                            handleMenuClick(
                                event,
                                user.id
                            )
                        }
                        className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#1976c8]"
                    >

                        <MoreVertical size={18} />

                    </button>

                </div>


                {/* CONTACT */}

                <div className="mt-5 space-y-3">

                    {/* EMAIL */}

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f4f8fb] text-[#1976c8]">

                            <Mail size={15} />

                        </div>

                        <div className="min-w-0">

                            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                Email
                            </p>

                            <p className="mt-0.5 break-all text-sm text-gray-600">
                                {user.email}
                            </p>

                        </div>

                    </div>


                    {/* PHONE */}

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f4f8fb] text-[#1976c8]">

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
                            className={`h-1.5 w-1.5 rounded-full ${user.status === "Active"
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

        ))

                    ) : (

                            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">

                                <UsersRound
                                    size={40}
                                    className="mx-auto text-gray-300"
                                />

                                <h3 className="mt-4 !text-lg font-semibold text-[#294b68]">
                                    No users found
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Try changing your search or filter.
                                </p>

                            </div>

                )}

            </div>
        </div>
    );
};

export default Users;
