"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const sliderImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Logitech_logo.svg/1024px-Logitech_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Esports_organization_Fnatic_logo.svg/1200px-Esports_organization_Fnatic_logo.svg.png",
    "https://owcdn.net/img/62bbeba74d5cb.png",
    "https://img.icons8.com/?size=100&id=30888&format=png&color=000000",
    "https://upload.wikimedia.org/wikipedia/commons/1/16/100_Thieves_logo.svg",
    "https://1000logos.net/wp-content/uploads/2021/04/Pirelli-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sentinels_logo.svg/1200px-Sentinels_logo.svg.png",
    "https://doctorhead.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/91f/smf06uteq7yibiyolyup3o2xslzbkwsn/320_198_2/pulsar_320.webp",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cloud9_logo_c._2023.svg/640px-Cloud9_logo_c._2023.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/8/83/MSC_Cruises_Logo.png",
    "https://upload.wikimedia.org/wikipedia/en/1/12/Esports_organization_G2_Esports_logo.svg",
]

const faqContent = [
    {
        question: "What is TaskPilot?",
        answer: "TaskPilot is a platform that helps managers assign tasks, track progress, and manage teams efficiently from a single dashboard."
    },
    {
        question: "How do I add a new team member?",
        answer: "Go to your team dashboard, click 'Add Member', and enter the new member’s details to invite them to your team."
    },
    {
        question: "Can I assign tasks to multiple team members?",
        answer: "Yes, you can assign a single task to one or more team members when creating or editing a task."
    },
    {
        question: "How do I track the progress of my team?",
        answer: "Use the dashboard to view real-time updates on task completion, team activity, and overall project progress."
    },
];


export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="flex flex-col min-h-screen bg-[url('/landing-page-bg.png')]">
            <header
                className="w-full px-4 py-4 flex items-center justify-between max-w-6xl mx-auto"
                style={{ fontFamily: "Fragment Mono" }}
            >
                <div className="flex items-center gap-2">
                    <Image onClick={() => router.push('/')}
                        height={40}
                        width={40}
                        alt="TaskTeams logo"
                        src="/team-tasks.png"
                        className="cursor-pointer mx-auto"
                        priority
                    />

                    <span style={{ color: "black", fontFamily: "JetBrains Mono" }} className="text-[23px]">TaskPilot</span>
                </div>

                {/* Desktop nav links */}
                <div className="hidden sm:flex items-center gap-4 text-gray-600">
                    <Link
                        className="hover:underline underline-offset-4 hover:text-[#000] hover:scale-x-103 px-2 py-1 ease-in-out transition duration-300"
                        href="#"
                    >
                        Pricing
                    </Link>
                    <Link
                        className="hover:underline underline-offset-4 hover:text-[#000] hover:scale-x-103 px-2 py-1 transition-all ease-in-out duration-300"
                        href="#"
                    >
                        Blogs
                    </Link>
                    <Link
                        className="hover:underline underline-offset-4 hover:text-[#000] hover:scale-x-103 px-2 py-1 transition-all ease-in-out duration-300"
                        href="/auth/login"
                    >
                        Log In
                    </Link>
                    <Link
                        className="hover:underline underline-offset-4 hover:text-[#000] hover:scale-x-103 px-2 py-1 transition-all ease-in-out duration-300"
                        href="/auth/signup"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Hamburger for mobile */}
                <button
                    className="cursor-pointer z-1000 sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-200 transition"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span
                        className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-black my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                            }`}
                    />
                </button>

                {/* Mobile menu */}
                <nav
                    className={`
    absolute top-0 left-0 rounded-b-3xl w-full bg-white shadow-lg z-50 sm:hidden
    transition-all duration-300 ease-in-out
    ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-8 pointer-events-none"}
  `}
                >
                    <ul className="flex flex-col items-center gap-4 py-10">
                        <li>
                            <Link
                                href="/"
                                className="block px-4 py-2 text-lg bg-blue-50 rounded"
                                onClick={() => setMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/"
                                className="block px-4 py-2 text-lg bg-blue-50 rounded"
                                onClick={() => setMenuOpen(false)}
                            >
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/auth/login"
                                className="block px-4 py-2 text-lg bg-blue-50 rounded"
                                onClick={() => setMenuOpen(false)}
                            >
                                Log In
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/auth/signup"
                                className="block px-4 py-2 text-lg bg-blue-50 rounded"
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </nav>


            </header>

            {/* Beta Banner */}
            <section className="w-full flex justify-center mt-10">
                <span onClick={() => router.push('/auth/login')} className="cursor-pointer text-sm flex items-center gap-2 w-fit bg-white rounded-4xl px-3 py-1 shadow transition-all duration-300 hover:gap-3 hover:bg-gray-100">
                    <span>🚀</span>
                    Beta version out.
                    <svg className="size-5 rotate-45" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z" /></svg>
                </span>
            </section>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center w-full px-4 mt-4">
                <div className="max-w-2xl w-full flex flex-col items-center">
                    <h1 className="text-4xl sm:text-5xl text-center mt-4 mb-4 pb-4 border-b border-slate-400 font-bold">
                        Manage Your Teams, Assign Tasks, Track Progress
                    </h1>
                    <h2 className="text-slate-600 text-lg sm:text-xl text-center">
                        TaskPilot gives managers a clear overview of every team, every member, and every task. Assign work, monitor progress, and keep your teams aligned — all in one powerful dashboard.
                    </h2>
                </div>
            </section>

            <section className="mt-10">
                <div className="flex w-fit gap-4 mx-auto text-slate-700">
                    <div className="text-slate-400">⎯⎯⎯⎯⎯⎯⎯⎯⎯</div>
                    <span className="w-fit mx-auto">TRUSTED BY</span>
                    <div className="text-slate-400">⎯⎯⎯⎯⎯⎯⎯⎯⎯</div>
                </div>

            </section>

            <section className="w-[90%] sm:w-3/4 md:w-1/2 mx-auto overflow-hidden py-4 mt-4 mb-8 px-2">
                <div className="flex animate-slider-left" style={{ width: "max-content" }}>
                    {[...sliderImages, ...sliderImages].map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            alt=""
                            className="h-8 sm:h-10 md:h-8 w-auto grayscale opacity-50 select-none pointer-events-none transition-opacity duration-200 hover:opacity-100 mr-12"
                            draggable={false}
                        />
                    ))}
                </div>
            </section>

            {/* test image */}
            <section className="flex items-center justify-center w-full mt-8">
                <Image
                    className="border-2 border-gray-300 p-1 bg-slate-200 shadow-2xl rounded-xl"
                    height={400}
                    width={750}
                    alt="TaskTeams dashboard mockup"
                    src="/taskteam-mockup-dashboard.png"
                    priority
                />
            </section>

            {/* cta */}
            <section className="flex flex-col items-center justify-center w-full mt-10 mb-0 px-4">
                <div className="max-w-xl w-full flex flex-col items-center gap-6">
                    <h1 className="text-3xl sm:text-4xl text-center font-semibold">
                        Start your journey <br /> with TaskPilot
                    </h1>
                    <button
                        onClick={() => router.push("/auth/login")}
                        className="cursor-pointer text-base px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 hover:scale-102 hover:font-semibold shadow font-medium transition"
                    >
                        GET STARTED
                    </button>
                </div>
            </section>


            <section className="w-9/10 sm:w-1/2 mx-auto my-12">
                <h2 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqContent.map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl shadow-sm bg-white"
                        >
                            <button
                                className={`cursor-pointer w-full flex justify-between items-center px-6 py-4 text-lg hover:bg-slate-200 rounded-lg font-medium border border-transparent ${openIndex == index ? "bg-slate-100 border-b border-b-slate-300 rounded-b-none" : ""} text-left focus:outline-none transition-all duration-300`}
                                onClick={() => toggle(index)}
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span>{item.question}</span>
                                <span
                                    className="flex items-center justify-center ml-4 text-2xl transition-all duration-300"
                                >
                                    {openIndex === index ? '–' : '+'}
                                </span>
                            </button>

                            <div
                                id={`faq-answer-${index}`}
                                className={`overflow-hidden transition-all duration-500 px-6 ${openIndex === index
                                    ? "max-h-40 opacity-100 py-2"
                                    : "max-h-0 opacity-0 py-0"
                                    }`}
                                style={{ transitionProperty: "max-height, opacity, padding" }}
                                aria-hidden={openIndex !== index}
                            >
                                <div className="text-gray-600 py-3">{item.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <footer
                className="w-11/12 max-w-6xl mx-auto mb-8 rounded-3xl px-6 py-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-8"
                style={{ background: "#2c2c2c", color: "#B6B09F" }}
            >
                {/* Logo Section */}
                <div className="flex items-center gap-4 mb-6 md:mb-0">
                    <Image alt="globe-footer-icon" height={45} width={45} src="/footer-icon-1.png" />
                    {/* <img
                        className="w-12 h-12"
                        src="https://img.icons8.com/?size=100&id=2963&format=png&color=ffffff"
                        alt="TaskTeams Logo"
                    /> */}
                    <Image alt="taskpilot-icon" height={45} width={45} src="/footer-icon-2.png" />
                    {/* <img
                        className="w-12 h-12"
                        src="https://img.icons8.com/?size=100&id=00FunGC1QVpi&format=png&color=ffffff"
                        alt="Alternate Logo"
                    /> */}
                </div>
                {/* Navigation Section */}
                <nav className="flex-1 w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <ul className="flex flex-col gap-2 items-center">
                            <li className="font-bold text-white mb-1 underline underline-offset-4">Index</li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" href="#">Explore</a>
                            </li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" href="#">Services</a>
                            </li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" href="#">About</a>
                            </li>
                        </ul>
                        <ul className="flex flex-col gap-2 items-center">
                            <li className="font-bold text-white mb-1 underline underline-offset-4">Products</li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" href="#">Supply</a>
                            </li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" href="#">blablabla</a>
                            </li>
                        </ul>
                        <ul className="flex flex-col gap-2 items-center">
                            <li className="font-bold text-white mb-1 underline underline-offset-4">Resources</li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" href="#">Feed</a>
                            </li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" href="#">Thoughts</a>
                            </li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" href="#">Stack</a>
                            </li>
                        </ul>
                        <ul className="flex flex-col gap-2 items-center">
                            <li className="font-bold text-white mb-1 underline underline-offset-4">Connect</li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" target="_blank" href="https://x.com/Manav437">Twitter</a>
                            </li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" target="_blank" href="https://www.linkedin.com/in/manav-gusain/">Linkedin</a>
                            </li>
                            <li>
                                <a className="cursor-pointer hover:text-slate-300 transition-colors" target="_blank" href="https://manav-gusain.onrender.com/">Portfolio</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </footer>
        </main>
    );
}