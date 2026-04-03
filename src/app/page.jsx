"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./globals.css";

import { Navbar } from "@/components/sections/navbar";
import { AnnouncementBadge } from "@/components/sections/announcement-badge";
import { Hero } from "@/components/sections/hero";
import { LogoSlider } from "@/components/sections/logo-slider";
import Footer from "@/components/sections/footer";
import FaqSection from "@/components/sections/faq-section";
import Features from "@/components/sections/features";

import { PiArrowRight } from "react-icons/pi";

export default function Home() {
    const router = useRouter();

    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <AnnouncementBadge />
            <Hero />

            <section className="mt-8">
                <div className="flex w-19/20 max-w-lg gap-2 sm:gap-4 mx-auto text-slate-700 items-center px-2">
                    <div className="flex-grow h-px bg-gray-400" />
                    <span className="w-auto px-2 sm:px-4 text-center tracking-wider text-xs sm:text-base whitespace-nowrap">
                        TRUSTED BY
                    </span>
                    <div className="flex-grow h-px bg-gray-400" />
                </div>
            </section>

            <LogoSlider />

            <section className="flex items-center justify-center mx-auto mt-16 mb-20">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                    <Image
                        className="relative border border-white/20 p-1.5 bg-white/10 backdrop-blur-sm shadow-2xl rounded-2xl
                                   transition-transform duration-700 ease-out"
                        height={500}
                        width={900}
                        alt="TaskPilot dashboard mockup"
                        src="/team-tasks-mockup.png"
                        priority
                    />
                </div>
            </section>
            <Features />

            <section className="flex flex-col items-center justify-center w-full mt-16 mb-16 px-4">
                <div className="max-w-xl w-full flex flex-col items-center gap-10">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl text-center font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                        Start your journey <br />
                        <span className="bg-gradient-to-r from-black/70 to-slate-500 bg-clip-text text-transparent">
                            with Team Tasks
                        </span>
                    </h2>
                    <button
                        onClick={() => router.push("/auth/login")}
                        className="group flex items-center gap-2 cursor-pointer text-base ring-2 ring-black/30 px-8 py-4 rounded-[50px] [corner-shape:squircle] bg-black/80 text-white hover:bg-[#2c2c2c] font-semibold shadow transition"
                    >
                        GET STARTED
                        <PiArrowRight className="text-md transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </button>
                </div>
            </section>

            <FaqSection />

            <Footer />
        </main>
    );
}
