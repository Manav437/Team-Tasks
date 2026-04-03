"use client";
import { Sidebar } from "../../components/Sidebar";
import { RiUserLine, RiNotification3Line, RiShieldLine, RiMoonLine, RiGlobalLine } from "react-icons/ri";

export default function SettingsPage() {
    const sections = [
        { title: "Profile", icon: <RiUserLine />, description: "Personal domain settings and avatar configuration." },
        { title: "Security", icon: <RiShieldLine />, description: "Authentication protocols and workspace privacy." },
        { title: "Messaging", icon: <RiNotification3Line />, description: "Real-time sync and alert prioritization." },
        { title: "Global Preferences", icon: <RiGlobalLine />, description: "Language, timezone, and regional defaults." },
        { title: "Visual Theme", icon: <RiMoonLine />, description: "Dark mode and interface accents." },
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
                                Settings
                            </h1>
                            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                <span>Platform</span>
                                <span>/</span>
                                <span className="text-blue-600 font-semibold">Workspace Configuration</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-12 custom-scrollbar">
                    <div className="w-full max-w-full mx-auto">

                        <div className="flex flex-col gap-6">
                            {sections.map((section, i) => (
                                <div
                                    key={i}
                                    className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="bg-slate-50 text-blue-600 p-4 rounded-2xl text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                            {section.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                                                {section.title}
                                            </h3>
                                            <p className="text-slate-400 font-medium text-sm">
                                                {section.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-black text-slate-300 uppercase tracking-widest group-hover:text-blue-400 transition-colors">Configure</span>
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all border border-transparent group-hover:border-blue-100">
                                            <RiUserLine />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-10 bg-blue-50 border-2 border-blue-100/50 border-dashed rounded-[40px] text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-blue-100 flex items-center justify-center mx-auto mb-6 text-blue-600 animate-bounce">
                                <RiNotification3Line size={24} />
                            </div>
                            <h4 className="text-xl font-black text-slate-800 mb-2">Platform Controls In Progress</h4>
                            <p className="text-slate-400 font-medium max-w-sm mx-auto">
                                We’re building a comprehensive settings suite. Advanced workspace management and security controls will be available in the next deployment.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
