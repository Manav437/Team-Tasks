"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
                    sticky top-0 md:top-4 z-50 transition-all duration-500 ease-in-out px-6 py-4 mx-auto flex items-center justify-between
                    ${
                        scrolled
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
                    <span className="text-lg font-bold text-slate-900 font-mono tracking-tighter">
                        TaskPilot
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden sm:flex items-center gap-6">
                    {allLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="group relative text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                        >
                            {link.label}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                className="absolute -top-1 -right-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            >
                                <path
                                    fill="#2563eb"
                                    d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z"
                                />
                            </svg>
                        </Link>
                    ))}
                </nav>

                {/* Hamburger — only shown when menu is CLOSED to avoid stacking context issues */}
                {!menuOpen && (
                    <button
                        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <span className="block h-0.5 w-5 bg-slate-900" />
                        <span className="block h-0.5 w-5 bg-slate-900 my-1" />
                        <span className="block h-0.5 w-5 bg-slate-900" />
                    </button>
                )}
            </header>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-[200] bg-white transition-transform duration-500 ease-in-out sm:hidden ${
                    menuOpen ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                {/* Close button lives INSIDE the overlay so it's always above it */}
                <button
                    className="absolute top-4 right-6 flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close Menu"
                >
                    <span className="block h-0.5 w-5 bg-slate-900 rotate-45 translate-y-[1px]" />
                    <span className="block h-0.5 w-5 bg-slate-900 -rotate-45 -translate-y-[1px]" />
                </button>

                <nav className="flex flex-col items-center justify-center h-full gap-8">
                    {allLinks.map((link, i) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{ transitionDelay: `${i * 50}ms` }}
                            className={`text-3xl font-bold text-slate-900 transition-all duration-500 ${
                                menuOpen
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
