"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdLogout, MdMenu, MdClose, MdWork } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi"
import { IoIosSettings } from "react-icons/io"

const navLinks = [
    {
        href: "/teams",
        label: "Teams",
        icon: <HiUserGroup size={20} />,
    },
    {
        href: "/work",
        label: "Work",
        icon: <MdWork size={20} />,
    },
    {
        href: "/settings",
        label: "Settings",
        icon: <IoIosSettings size={20} />,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const fallbackImage =
        "https://i.pinimg.com/736x/08/35/0c/08350cafa4fabb8a6a1be2d9f18f2d88.jpg";

    const imageSrc =
        status === "authenticated" && session?.user?.image
            ? session.user.image
            : fallbackImage;

    const NavContent = ({ mobile = false }) => (
        <nav className="flex-1 flex flex-col gap-1.5 mt-6 px-3">
            {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => mobile && setSidebarOpen(false)}
                        className={`
                            group flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 relative overflow-hidden
                            ${isActive
                                ? "text-[#2c2c2c] bg-[#2c2c2c]/10 shadow-sm shadow-[#2c2c2c]/5"
                                : "text-[#2c2c2c]/70 hover:text-slate-900 hover:bg-slate-50"
                            }
                        `}
                    >
                        <span className={`transition-all duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`}>
                            {link.icon}
                        </span>

                        <span className="text-sm tracking-tight">{link.label}</span>
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            <aside className="w-[240px] min-w-[240px] hidden md:flex h-screen sticky top-0 self-start z-40 bg-white/80 backdrop-blur-xl border-r border-slate-200/50 flex flex-col pt-4">
                <div
                    className="flex items-center gap-3 px-6 h-12 mb-4 cursor-pointer group"
                    onClick={() => router.push("/")}
                >
                    <div className="bg-[#2c2c2c] p-1.5 rounded-md shadow-lg shadow-sky-100 group-hover:scale-103 duration-300 transition-transform">
                        <Image
                            alt="task-teams-logo"
                            height={24}
                            width={24}
                            src="/team-tasks.png"
                            className="brightness-0 invert"
                        />
                    </div>
                    <span className="text-slate-900 font-black text-xl tracking-tight">
                        Team Tasks
                    </span>
                </div>

                <div className="w-full bg-slate-200 h-[1px]" />

                <NavContent />

                <div className="p-4 mt-auto border-t border-t-slate-200">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 shadow-inner group">
                        <div className="flex items-center gap-3 mb-3 px-1">
                            <div className="relative">
                                <Image
                                    src={imageSrc}
                                    alt="Profile"
                                    width={38}
                                    height={38}
                                    className="rounded-xl object-cover ring-2 ring-white shadow-sm"
                                    onError={(e) => { e.currentTarget.src = fallbackImage; }}
                                />
                                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="font-bold text-slate-800 text-sm truncate uppercase tracking-tight">
                                    {session?.user?.name || session?.user?.email?.split("@")[0] || "User"}
                                </span>
                                <span className="text-[10px] font-black text-slate-400 tracking-wide uppercase">Pro Subscription</span>
                            </div>
                        </div>

                        <button
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all cursor-pointer group/logout"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to log out?")) {
                                    signOut({ callbackUrl: "/auth/login" });
                                }
                            }}
                        >
                            <span className="text-xs font-bold uppercase tracking-wider">Sign Out</span>
                            <MdLogout className="group-hover/logout:translate-x-[1.5px] transition-transform" />
                        </button>
                    </div>
                </div>
            </aside>

            <header className="md:hidden fixed top-4 left-4 right-4 h-16 bg-white/70 backdrop-blur-md border border-white/40 shadow-xl shadow-slate-200/50 rounded-2xl z-50 flex items-center justify-between px-4 animate-fade-in">
                <button
                    className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                    onClick={() => setSidebarOpen(true)}
                >
                    <MdMenu size={24} />
                </button>

                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    <div className="bg-indigo-600 p-1 rounded-lg">
                        <Image alt="logo" height={20} width={20} src="/team-tasks.png" className="brightness-0 invert" />
                    </div>
                    <span className="font-black text-slate-900 tracking-tight text-lg">Team Tasks</span>
                </div>

                <div className="relative w-9 h-9">
                    <Image
                        src={imageSrc}
                        alt="Profile"
                        width={36}
                        height={36}
                        className="rounded-xl object-cover ring-2 ring-indigo-50/50 shadow-sm"
                    />
                </div>
            </header>

            <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div
                    className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />

                <aside className={`absolute top-0 left-0 bottom-0 w-[280px] bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 flex flex-col pt-6 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex items-center justify-between px-6 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-600 p-1.5 rounded-xl">
                                <Image alt="logo" height={22} width={22} src="/team-tasks.png" className="brightness-0 invert" />
                            </div>
                            <span className="font-black text-slate-900 tracking-tighter text-xl">Team Tasks</span>
                        </div>
                        <button
                            className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 cursor-pointer"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <MdClose size={24} />
                        </button>
                    </div>

                    <NavContent mobile />

                    <div className="p-6 mt-auto">
                        <button
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-50 text-red-600 font-bold text-sm tracking-wide active:scale-95 transition-all shadow-sm shadow-red-100/50"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to log out?")) {
                                    signOut({ callbackUrl: "/auth/login" });
                                }
                            }}
                        >
                            <MdLogout size={20} />
                            SIGN OUT
                        </button>
                    </div>
                </aside>
            </div>
        </>
    );
}
