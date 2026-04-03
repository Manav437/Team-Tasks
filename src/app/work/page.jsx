"use client";
import { Sidebar } from "../../components/Sidebar";
import { RiBriefcase4Line, RiTimeLine, RiCheckboxCircleLine, RiFlag2Line } from "react-icons/ri";
import { MdOutlineWorkOutline, MdArrowForward } from "react-icons/md";

export default function WorkPage() {
    const stats = [
        { label: "Active Tasks", value: "12", icon: <RiBriefcase4Line />, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Hours Logged", value: "32.5", icon: <RiTimeLine />, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Completion Rate", value: "84%", icon: <RiCheckboxCircleLine />, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Urgent Flags", value: "2", icon: <RiFlag2Line />, color: "text-rose-600", bg: "bg-rose-50" },
    ];

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            <Sidebar />

            <main className="flex-1 h-screen flex flex-col overflow-hidden">
                {/* Fixed Header Section */}
                <div className="pt-24 md:pt-10 px-4 sm:px-8 shrink-0">
                    <div className="w-full max-w-full mx-auto">
                        <div className="mb-10">
                            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
                                Work
                            </h1>
                            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                <span>Platform</span>
                                <span>/</span>
                                <span className="text-blue-600 font-semibold">Project Pipeline</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-12 custom-scrollbar">
                    <div className="w-full max-w-full mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl text-xl shadow-sm group-hover:scale-110 transition-transform`}>
                                        {stat.icon}
                                    </div>
                                    <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Live Metrics</span>
                                </div>
                                <h3 className="text-3xl font-black text-slate-800 mb-1">{stat.value}</h3>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                    <MdOutlineWorkOutline className="text-blue-600" />
                                    Current Pipeline
                                </h3>
                                <button className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">View full roadmap</button>
                            </div>

                            <div className="space-y-4">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                                        <div className="w-2 h-12 bg-blue-500 rounded-full" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800">Operational System Audit - Phase {i + 1}</h4>
                                            <p className="text-sm text-slate-400 font-medium">Internal Project • Due in {i + 2} days</p>
                                        </div>
                                        <MdArrowForward className="text-slate-200 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-blue-600 rounded-[40px] p-8 text-white shadow-xl shadow-blue-100 relative overflow-hidden flex flex-col justify-end min-h-[300px]">
                            <div className="absolute top-0 right-0 p-8 opacity-20">
                                <RiBriefcase4Line size={120} />
                            </div>
                            <h3 className="text-3xl font-black mb-4 relative z-10">Maximize Productivity</h3>
                            <p className="text-blue-100 font-medium mb-6 relative z-10 leading-relaxed">
                                You’ve completed 84% of your weekly targets. Just 2 more tasks to reach your goal!
                            </p>
                            <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-[50px] [corner-shape:squircle] hover:bg-slate-50 transition-all active:scale-95 shadow-lg relative z-10">
                                Launch Focus Mode
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
