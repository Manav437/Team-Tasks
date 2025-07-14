"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <main className="flex flex-col min-h-screen bg-white">
            {/* Navbar */}
            <header className="w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 md:py-6 shadow-sm bg-white relative z-50">
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/tasks-teams.png"
                            alt="TaskTeams Logo"
                            width={40}
                            height={40}
                        />
                        <span className="text-2xl font-bold text-[#5d85bd] tracking-wide">
                            TaskTeams
                        </span>
                    </div>
                    {/* Hamburger for mobile */}
                    <button
                        className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open navigation"
                    >
                        {/* 3-stripe hamburger icon */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <rect x="4" y="6" width="16" height="2" rx="1" fill="currentColor" />
                            <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor" />
                            <rect x="4" y="16" width="16" height="2" rx="1" fill="currentColor" />
                        </svg>
                    </button>
                </div>
                {/* Desktop Nav links */}
                <nav
                    className={`
                        hidden md:flex flex-row
                        md:items-center md:gap-0 gap-2
                        w-full md:w-auto mt-4 md:mt-0
                    `}
                >
                    <Link
                        href="#"
                        className="text-slate-700 font-medium px-4 py-2 rounded hover:bg-slate-100 transition"
                    >
                        Features
                    </Link>
                    <Link
                        href="#"
                        className="md:ml-2 text-slate-700 font-medium px-4 py-2 rounded hover:bg-slate-100 transition"
                    >
                        Teams
                    </Link>
                    <Link
                        href="/auth/login"
                        className="md:ml-2 text-slate-700 font-medium px-4 py-2 rounded hover:bg-slate-100 transition"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/auth/signup"
                        className="md:ml-2 text-slate-700 font-medium px-4 py-2 rounded hover:bg-slate-100 transition"
                    >
                        Sign Up
                    </Link>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className={`fixed inset-0 z-50 md:hidden pointer-events-none`}>
                    {/* Overlay background */}
                    <div
                        className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
                        onClick={() => setMenuOpen(false)}
                    />
                    {/* Top slide-in menu */}
                    <nav
                        className={`
                        fixed top-0 left-0 w-full bg-white shadow-lg flex flex-col z-50
                        transition-transform duration-300
                        ${menuOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"}
                    `}
                        style={{ minHeight: "260px" }}
                    >
                        <button
                            className="ml-auto m-4 text-gray-500 hover:text-indigo-700 focus:outline-none"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <Link
                            href="#"
                            className="px-6 py-3 text-indigo-700 font-semibold hover:bg-indigo-50"
                            onClick={() => setMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="#"
                            className="px-6 py-3 text-slate-700 font-medium hover:bg-slate-100"
                            onClick={() => setMenuOpen(false)}
                        >
                            Teams
                        </Link>
                        <Link
                            href="/auth/login"
                            className="px-6 py-3 text-slate-700 font-medium hover:bg-slate-100"
                            onClick={() => setMenuOpen(false)}
                        >
                            Log In
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="px-6 py-3 text-slate-700 font-medium hover:bg-slate-100"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </nav>
                </div>
            )}

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center flex-1 py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
                <h1 className="text-5xl font-bold text-slate-900 text-center mb-4">
                    Manage Your Teams, Assign Tasks, Track Progress
                </h1>
                <p className="text-xl text-slate-600 text-center mb-8 max-w-2xl">
                    TaskTeams gives managers a clear overview of every team, every member, and every task. Assign work, monitor progress, and keep your teams aligned—all in one powerful dashboard.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-8">
                    <input
                        type="email"
                        placeholder="Enter your work email"
                        className="flex-1 px-4 py-3 rounded border border-slate-300"
                    />
                    <button className="bg-gradient-to-r from-blue-500 via-indigo-500 to-green-400 text-white px-6 py-3 rounded font-semibold transition hover:from-blue-600 hover:via-indigo-600 hover:to-green-500">
                        Try for free
                    </button>
                </form>
                <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl mx-auto mt-8">
                    <div className="flex flex-col items-center w-full md:w-1/2">
                        <Image
                            src="/tasks-desktop.png"
                            alt="Manager Dashboard - Teams Overview"
                            width={420}
                            height={260}
                            className="rounded-xl shadow border border-slate-200 w-full object-cover"
                            style={{ maxWidth: 420, height: "auto" }}
                        />
                        <span className="mt-3 text-slate-500 text-center text-sm">Manager Dashboard – Teams Overview</span>
                    </div>
                    <div className="flex flex-col items-center w-full md:w-1/2">
                        <Image
                            src="/tasks-mobile.png"
                            alt="Team Progress Tracking"
                            width={220}
                            height={160}
                            className="rounded-xl shadow border border-slate-200 w-full object-cover"
                            style={{ maxWidth: 220, height: "auto" }}
                        />
                        <span className="mt-3 text-slate-500 text-center text-sm">Team Progress Tracking (Mobile)</span>
                    </div>
                </div>

            </section>

            {/* Testimonials */}
            <section className="py-8 px-4 bg-white">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-stretch gap-8">
                    <div className="flex flex-col justify-between items-center min-h-[100px]">
                        <span className="italic text-lg text-slate-700 mb-2 text-center">
                            “I can see every team’s workload and progress at a glance.”
                        </span>
                        <Image src="/forbes-logo.png" alt="Forbes" width={80} height={24} />
                    </div>
                    <div className="flex flex-col justify-between items-center min-h-[100px]">
                        <span className="italic text-lg text-slate-700 mb-2 text-center">
                            “Assigning and tracking tasks for my teams has never been easier.”
                        </span>
                        <Image src="/techcrunch-logo.png" alt="TechCrunch" width={80} height={24} />
                    </div>
                    <div className="flex flex-col justify-between items-center min-h-[100px]">
                        <span className="italic text-lg text-slate-700 mb-2 text-center">
                            “TaskTeams keeps my teams focused and accountable.”
                        </span>
                        <Image src="/wired-logo.png" alt="Wired" width={80} height={24} />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-indigo-50">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="flex flex-col items-center">
                        <Image src="/collaborate-icon.png" alt="Teams Overview" width={60} height={60} />
                        <h3 className="font-semibold text-lg mt-4 mb-2">All Teams, One Dashboard</h3>
                        <p className="text-slate-500 text-center">
                            Instantly view all your teams, their members, and current workloads. Spot bottlenecks and balance assignments with ease.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src="/assign-tasks.png" alt="Assign Tasks" width={60} height={60} />
                        <h3 className="font-semibold text-lg mt-4 mb-2">Assign & Edit Tasks</h3>
                        <p className="text-slate-500 text-center">
                            Quickly assign tasks to team members, set priorities, and edit details as projects evolve.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src="/track-icon.png" alt="Track Progress" width={60} height={60} />
                        <h3 className="font-semibold text-lg mt-4 mb-2">Track Progress in Real Time</h3>
                        <p className="text-slate-500 text-center">
                            Monitor task completion, deadlines, and team performance with visual progress bars and reports.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-4 bg-white">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <span className="text-3xl font-bold text-[#5d85bd]">2,500+</span>
                        <p className="text-slate-500 mt-2">teams managed</p>
                    </div>
                    <div>
                        <span className="text-3xl font-bold text-[#5d85bd]">120K+</span>
                        <p className="text-slate-500 mt-2">tasks assigned</p>
                    </div>
                    <div>
                        <span className="text-3xl font-bold text-[#5d85bd]">98%</span>
                        <p className="text-slate-500 mt-2">on-time completion</p>
                    </div>
                    <div>
                        <span className="text-3xl font-bold text-[#5d85bd]">4.9/5</span>
                        <p className="text-slate-500 mt-2">manager rating</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex flex-col items-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                    Take control of your teams and projects today
                </h2>
                <p className="text-lg text-slate-600 mb-8 text-center">
                    Join thousands of managers who trust TaskTeams to keep their teams productive and accountable.
                </p>
                <Link
                    href="/teams"
                    className="bg-gradient-to-r from-blue-500 via-indigo-500 to-green-400 text-white px-8 py-4 rounded-lg font-semibold text-xl shadow hover:from-blue-600 hover:via-indigo-600 hover:to-green-500 transition"
                >
                    Get Started Free
                </Link>
            </section>

            {/* Footer */}
            <footer className="w-full py-6 text-center text-slate-400 text-sm mt-12">
                &copy; {new Date().getFullYear()} TaskTeams. All rights reserved.
            </footer>
        </main>
    );
}