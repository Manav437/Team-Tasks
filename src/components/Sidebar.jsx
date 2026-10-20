"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiCloseLine, RiGroupLine, RiLogoutBoxRLine, RiMenuLine, RiSettings3Line, RiBriefcase4Line } from "react-icons/ri";

const navLinks = [
    { href: "/teams", label: "Teams", icon: RiGroupLine },
    { href: "/work", label: "Work", icon: RiBriefcase4Line },
    { href: "/settings", label: "Settings", icon: RiSettings3Line },
];

const focusRing = "focus-visible:ring-2 focus-visible:ring-blue-300";

function Brand({ onClick }) {
    return (
        <Link href="/" onClick={onClick} className={`flex w-fit items-center gap-2.5 rounded-lg ${focusRing}`}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800">
                <Image src="/team-tasks.png" alt="" width={21} height={21} className="brightness-0 invert" />
            </span>
            <span className="text-base font-semibold tracking-tight text-slate-900">Team Tasks</span>
        </Link>
    );
}

function Avatar({ src, name }) {
    const [failed, setFailed] = useState(false);
    const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

    return (
        <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-xs font-medium text-slate-600">
            {src && !failed ? (
                <Image src={src} alt="" width={32} height={32} className="h-full w-full object-cover" onError={() => setFailed(true)} />
            ) : initials}
        </span>
    );
}

function Navigation({ pathname, onNavigate }) {
    return (
        <nav aria-label="Main navigation" className="flex-1 space-y-1 px-3 py-6">
            {navLinks.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                    <Link
                        key={href}
                        href={href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${focusRing} ${active
                            ? "bg-blue-50 font-medium text-blue-700"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        <Icon size={18} aria-hidden="true" />
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}

function Account({ name, email, image }) {
    return (
        <div className="mx-4 border-t border-slate-200 py-4">
            <div className="flex items-center gap-2.5 px-1 py-1">
                <Avatar key={image || "initials"} src={image} name={name} />
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800" title={name}>{name}</p>
                    {email && <p className="mt-0.5 truncate text-xs text-slate-500" title={email}>{email}</p>}
                </div>
            </div>
            <button
                type="button"
                className={`mt-3 flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 ${focusRing}`}
                onClick={() => {
                    if (window.confirm("Are you sure you want to log out?")) {
                        signOut({ callbackUrl: "/auth/login" });
                    }
                }}
            >
                <RiLogoutBoxRLine size={17} aria-hidden="true" />
                Sign out
            </button>
        </div>
    );
}

export function Sidebar() {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dialogRef = useRef(null);
    const { data: session } = useSession();
    const name = session?.user?.name || session?.user?.email?.split("@")[0] || "User";
    const email = session?.user?.email;
    const image = session?.user?.image;
    const closeSidebar = () => setSidebarOpen(false);

    useEffect(() => {
        if (!sidebarOpen) return;

        const dialog = dialogRef.current;
        dialog.showModal();
        const desktop = window.matchMedia("(min-width: 768px)");
        const handleResize = () => {
            if (desktop.matches) setSidebarOpen(false);
        };
        handleResize();
        desktop.addEventListener("change", handleResize);

        return () => {
            desktop.removeEventListener("change", handleResize);
            dialog.close();
        };
    }, [sidebarOpen]);

    return (
        <>
            <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 self-start flex-col overflow-y-auto border-r border-slate-200 bg-white md:flex">
                <div className="px-6 pt-8 pb-2">
                    <Brand />
                </div>
                <Navigation pathname={pathname} />
                <Account name={name} email={email} image={image} />
            </aside>

            <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 md:hidden">
                <button
                    type="button"
                    aria-label="Open navigation"
                    aria-expanded={sidebarOpen}
                    aria-controls="mobile-sidebar"
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 ${focusRing}`}
                    onClick={() => setSidebarOpen(true)}
                >
                    <RiMenuLine size={21} />
                </button>
                <Brand />
                <Avatar key={image || "initials"} src={image} name={name} />
            </header>

            <dialog
                ref={dialogRef}
                id="mobile-sidebar"
                aria-label="Navigation"
                onClose={closeSidebar}
                onClick={(event) => {
                    if (event.target === event.currentTarget) closeSidebar();
                }}
                className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-slate-900/30"
            >
                <div className="flex h-full w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-slate-200 bg-white">
                    <div className="flex items-center justify-between gap-3 px-5 pt-6 pb-2">
                        <Brand onClick={closeSidebar} />
                        <button
                            type="button"
                            aria-label="Close navigation"
                            className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 ${focusRing}`}
                            onClick={closeSidebar}
                        >
                            <RiCloseLine size={21} />
                        </button>
                    </div>
                    <Navigation pathname={pathname} onNavigate={closeSidebar} />
                    <Account name={name} email={email} image={image} />
                </div>
            </dialog>
        </>
    );
}
