"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiArrowRight } from "react-icons/pi";

export default function NotFound() {
    const router = useRouter();
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-[url('/landing-page-bg.png')] px-4">
            <section className="bg-white/40 rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col gap-4 items-start">
                <div className="flex items-start justify-between gap-3 mb-2 w-full">
                    <Image
                        className="cursor-pointer"
                        onClick={() => router.push("/")}
                        height={41}
                        width={45}
                        alt="TaskTeams logo"
                        src="/TaskPilot-favicon.png"
                        aria-label="Go to home"
                        title="Go to home"
                        priority
                    />
                    <div className="flex flex-col">
                        <h1 className="text-xl mr-0  border-b-2 border-slate-500 text-end font-extrabold text-slate-800 leading-tight">
                            404
                        </h1>
                        <h2 className="text-lg font-bold text-slate-800">
                            Page Not Found
                        </h2>
                    </div>
                </div>
                <p className="text-slate-600 mb-2 text-start rounded-md text-[15px] border-l-4 border-indigo-400 pl-1.5">
                    This page took a wrong turn at{" "}
                    <a
                        className="text-indigo-400 italic hover:text-indigo-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://en.wikipedia.org/wiki/Breaking_Bad"
                    >
                        Albuquerque.
                    </a>{" "}
                    (Or maybe it just doesn&apos;t exist.) Either way,
                    let&apos;s get you back on track!
                </p>
                <Link
                    href="/"
                    className="group flex items-center mx-auto justify-between gap-2 transition-all duration-300 bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-slate-800 active:scale-95"
                >
                    Go back Home
                    <PiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
            </section>
        </main>
    );
}
