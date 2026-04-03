"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { PiArrowUpRight, PiList, PiX } from "react-icons/pi";

export const Navbar = () => {
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const baseLinks = [
        { label: "Pricing", href: "#" },
        { label: "Blogs", href: "#" },
    ];

    const authLinks = session
        ? [{ label: "Dashboard", href: "/teams", isButton: true }]
        : [
            { label: "Log In", href: "/auth/login" },
            { label: "Sign Up", href: "/auth/signup", isButton: true },
        ];

    const allLinks = [...baseLinks, ...authLinks];

    useEffect(() => {
        if (menuOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
    }, [menuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`
                    sticky top-0 md:top-6 z-50 transition-all duration-500 ease-in-out px-6 py-4 mx-auto flex items-center justify-between
                    ${scrolled
                        ? "w-full max-w-4xl rounded-none md:rounded-full bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-lg py-2"
                        : "w-full max-w-6xl rounded-none bg-transparent border-transparent py-4"
                    }
                `}
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <Image
                        height={35}
                        width={35}
                        alt="Logo"
                        src="/team-tasks.png"
                        priority
                    />
                    <span className="text-lg font-bold text-slate-900 tracking-tighter">
                        Team Tasks
                    </span>
                </Link>

                <nav className="hidden sm:flex items-center gap-6">
                    {allLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="group relative text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-0.5"
                        >
                            {link.label}
                            <PiArrowUpRight className="text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    ))}
                </nav>

                {!menuOpen && (
                    <button
                        className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors text-slate-900"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <PiList className="text-2xl" />
                    </button>
                )}
            </header>

            <div
                className={`fixed inset-0 z-[200] bg-white transition-transform duration-500 ease-in-out sm:hidden ${menuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <button
                    className="absolute top-4 right-6 flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors text-slate-900"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close Menu"
                >
                    <PiX className="text-2xl" />
                </button>

                <nav className="flex flex-col items-center justify-center h-full gap-8">
                    {allLinks.map((link, i) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{ transitionDelay: `${i * 50}ms` }}
                            className={`text-3xl font-bold text-slate-900 transition-all duration-500 ${menuOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
};
