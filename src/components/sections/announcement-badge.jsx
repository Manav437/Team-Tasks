import { useRouter } from "next/navigation";
import { GoArrowUpRight } from "react-icons/go";
import { MdRocketLaunch } from "react-icons/md";


export const AnnouncementBadge = () => {
    const router = useRouter();

    return (
        <section className="w-full flex justify-center mt-30 -mb-5 animate-fade-in-up">
            <button
                onClick={() => router.push("/auth/login")}
                className="cursor-alias group relative flex items-center gap-2.5 px-5 py-2 text-xs font-bold transition-all duration-500 rounded-full
                    bg-white/40 backdrop-blur-xl border border-white/40 ring-1 ring-slate-900/5 shadow-sm
                    hover:bg-white/80 hover:shadow-xl hover:shadow-blue-500/5 overflow-hidden"
            >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none" />

                <div className="flex items-center justify-center p-1 rounded-full bg-blue-50 text-blue-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <MdRocketLaunch size={14} />
                </div>

                <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-medium tracking-tight whitespace-nowrap">Introducing</span>
                    <span className="text-slate-900 font-semibold tracking-tight whitespace-nowrap">Beta Access</span>
                </div>

                <div className="ml-1 w-px h-3 bg-slate-200" />

                <GoArrowUpRight className="text-blue-600 size-3.5 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110" />
            </button>
        </section>
    );
};
