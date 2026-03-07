"use client";
import { useRouter } from "next/navigation";

export const AnnouncementBadge = () => {
    const router = useRouter();

    return (
        <section className="w-full flex justify-center mt-15 mb-4 animate-fade-in-up">
            <button
                onClick={() => router.push("/auth/login")}
                className="group relative flex items-center gap-2 px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded-full
                    bg-white/40 backdrop-blur-md border border-white/20 shadow-sm
                    hover:bg-white/60 hover:shadow-md active:scale-95"
            >
                <span className="flex items-center justify-center h-5 w-5 rounded-full text-md">
                    🚀
                </span>

                <span className="text-slate-800 ml-1">Beta version out.</span>

                <svg
                    className="size-4 text-blue-800 transition-transform duration-300 group-hover:translate-x-0.25 group-hover:-translate-y-0.25"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </button>
        </section>
    );
};
