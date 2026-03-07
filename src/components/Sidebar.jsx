import { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
    {
        href: "/teams",
        label: "Groups",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users-icon lucide-users"
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx="9" cy="7" r="4" />
            </svg>
        ),
    },
    {
        href: "/projects",
        label: "Work",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-briefcase-business-icon lucide-briefcase-business"
            >
                <path d="M12 12h.01" />
                <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                <rect width="20" height="14" x="2" y="6" rx="2" />
            </svg>
        ),
    },
    {
        href: "/settings",
        label: "Settings",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-settings-icon lucide-settings"
            >
                <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session, status } = useSession();

    const fallbackImage =
        "https://i.pinimg.com/736x/08/35/0c/08350cafa4fabb8a6a1be2d9f18f2d88.jpg";

    const imageSrc =
        status === "authenticated" && session?.user?.image
            ? session.user.image
            : fallbackImage;

    const router = useRouter();
    return (
        <>
            <aside className="w-[225px] min-w-[225px] hidden md:flex h-screen sticky top-0 self-start z-40 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-r border-gray-200 shadow-lg flex-col">
                <div className="flex items-center gap-2 justify-start h-16 px-4 border-b border-gray-200">
                    <Image
                        className="cursor-pointer rounded transition duration-300"
                        onClick={() => router.push("/")}
                        alt="task-teams-logo"
                        height={32}
                        width={32}
                        src="/team-tasks.png"
                    />
                    <span className="text-gray-800 font-bold text-xl tracking-tight">
                        Admin Panel
                    </span>
                </div>
                <nav className="flex-1 flex flex-col gap-1 mt-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`
                                        group flex items-center gap-3 px-4 py-1.5 rounded-lg mx-3 my-0.5 font-medium transition-all duration-200 relative
                                        ${
                                            isActive
                                                ? "text-gray-950 bg-gray-600/10 shadow-sm font-semibold"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                                        }
                                    `}
                            >
                                <span
                                    className={`
                                        transition-transform duration-200
                                        ${isActive ? "text-gray-800 scale-110" : "text-gray-900 group-hover:text-gray-800"}
                                    `}
                                >
                                    {link.icon}
                                </span>

                                <span
                                    className={`transition-transform duration-200 group-hover:translate-x-0.5`}
                                >
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex flex-row items-center justify-between mt-4 mb-4 mx-1.5 gap-2 border border-slate-300 bg-slate-100 rounded-lg p-1 shadow-inner">
                    <div className="flex gap-1.5 items-center overflow-hidden">
                        {" "}
                        <div className="flex-shrink-0 m-1 rounded-full ring-2 ring-black/20">
                            {status === "loading" ? (
                                <div className="rounded-full h-10 w-10 bg-slate-300 animate-pulse" />
                            ) : (
                                <Image
                                    src={imageSrc}
                                    alt="Profile"
                                    width={35}
                                    height={35}
                                    className="rounded-full object-cover shadow-sm"
                                    onError={(e) => {
                                        e.currentTarget.src = fallbackImage;
                                    }}
                                />
                            )}
                        </div>
                        <div className="flex flex-col min-w-0">
                            {" "}
                            {status === "loading" ? (
                                <div className="h-4 w-20 bg-slate-300 animate-pulse rounded-full" />
                            ) : (
                                <span
                                    className="font-semibold text-slate-700 text-sm truncate px-1"
                                    title={
                                        session?.user?.name ||
                                        session?.user?.email ||
                                        "User"
                                    }
                                >
                                    {session?.user?.name ||
                                        session?.user?.email?.split("@")[0] ||
                                        "User"}
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        className="cursor-pointer flex items-center p-1.5 rounded-md transition-all duration-200
                                   text-slate-400 hover:text-red-600 hover:bg-red-50 active:scale-95"
                        onClick={() => {
                            if (
                                window.confirm(
                                    "Are you sure you want to log out?",
                                )
                            ) {
                                signOut({ callbackUrl: "/auth/login" });
                            }
                        }}
                        title="Log out"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                            />
                        </svg>
                    </button>
                </div>
            </aside>

            <div className="fixed inset-0 z-50 flex md:hidden pointer-events-none">
                <div
                    className={`
            fixed inset-0 bg-slate-200/60 transition-opacity duration-300
            ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
                    onClick={() => setSidebarOpen(false)}
                />

                <aside
                    className={`
            relative bg-gradient-to-b from-white via-slate-200 to-slate-100 h-full shadow-lg flex flex-col z-50 transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-80"}
          `}
                    style={{ width: "240px" }}
                >
                    <div className="flex items-center justify-between h-16 border-b border-gray-100 px-4">
                        <div className="flex items-center gap-2">
                            <Image
                                alt="task-teams-logo"
                                height={32}
                                width={32}
                                src="/team-tasks.png"
                            />
                            <span className="text-gray-800 font-bold text-xl tracking-tight">
                                Admin Panel
                            </span>
                        </div>
                        <button
                            className="ml-auto text-gray-500 hover:text-gray-800 focus:outline-none"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close sidebar"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <nav className="flex-1 flex flex-col gap-1 mt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group flex items-center gap-3 px-5 py-2 rounded-lg mx-2 my-1 font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition relative"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-gray-900 opacity-0 group-hover:opacity-100 transition" />
                                <span className="text-gray-800 group-hover:scale-110 transition">
                                    {link.icon}
                                </span>
                                <span className="">{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                    <div className="flex flex-row items-center justify-between mt-4 mb-4 mx-3 gap-2 bg-slate-100 rounded-lg p-2 shadow-inner">
                        <div className="flex gap-2 items-center overflow-hidden">
                            {status === "loading" ? (
                                <div className="h-8 w-8 rounded-full bg-slate-300 animate-pulse" />
                            ) : (
                                <Image
                                    src={imageSrc}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover border border-white"
                                    onError={(e) => {
                                        e.currentTarget.src = fallbackImage;
                                    }}
                                />
                            )}
                            <span className="font-semibold text-slate-700 text-sm truncate">
                                {session?.user?.name ||
                                    session?.user?.email?.split("@")[0] ||
                                    "User"}
                            </span>
                        </div>
                        {/* <button
                            className="cursor-pointer flex items-center px-2 py-2 rounded transition-colors border border-transparent hover:border-red-600 hover:bg-red-100 text-red-600 font-semibold"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Are you sure you want to log out?",
                                    )
                                ) {
                                    signOut({ callbackUrl: "/auth/login" });
                                }
                            }}
                            title="Log out"
                        >
                            <svg
                                className="rotate-0 w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                                />
                            </svg>
                        </button>*/}
                    </div>
                </aside>
            </div>

            <nav className="md:hidden flex items-center justify-between w-full h-14 px-4 bg-white border-b border-gray-200 shadow fixed top-0 left-0 z-40">
                <button
                    className="cursor-pointer text-gray-500 hover:text-gray-800 focus:outline-none"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open menu"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <rect
                            x="4"
                            y="6"
                            width="16"
                            height="2"
                            rx="1"
                            fill="currentColor"
                        />
                        <rect
                            x="4"
                            y="11"
                            width="16"
                            height="2"
                            rx="1"
                            fill="currentColor"
                        />
                        <rect
                            x="4"
                            y="16"
                            width="16"
                            height="2"
                            rx="1"
                            fill="currentColor"
                        />
                    </svg>
                </button>
                <Image
                    alt="team-tasks-logo"
                    height={32}
                    width={32}
                    src="/team-tasks.png"
                />
                <button
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-200 rounded-lg"
                    onClick={() => {
                        if (
                            window.confirm("Are you sure you want to log out?")
                        ) {
                            signOut({ callbackUrl: "/auth/login" });
                        }
                    }}
                    aria-label="Logout"
                >
                    <svg
                        className="rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                        />
                    </svg>
                </button>
            </nav>
        </>
    );
}
