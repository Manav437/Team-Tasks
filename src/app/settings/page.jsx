"use client";
import { Sidebar } from "../../components/Sidebar";
import { RiUserLine, RiNotification3Line, RiShieldLine, RiMoonLine, RiGlobalLine } from "react-icons/ri";

export default function SettingsPage() {
    const sections = [
        { title: "Profile", icon: <RiUserLine />, description: "Your personal details and profile photo." },
        { title: "Security", icon: <RiShieldLine />, description: "Sign-in settings and workspace privacy." },
        { title: "Messaging", icon: <RiNotification3Line />, description: "Notifications and alert preferences." },
        { title: "Global preferences", icon: <RiGlobalLine />, description: "Language, time zone, and regional defaults." },
        { title: "Visual theme", icon: <RiMoonLine />, description: "Appearance and interface colors." },
    ];

    return (
        <div className="flex min-h-dvh bg-[#f8fafc]">
            <Sidebar />

            <main className="min-w-0 flex-1 h-dvh overflow-auto">
                <div className="max-w-6xl mx-auto px-2 sm:px-4 pt-28 md:pt-10 pb-12">
                    <header className="mb-6 border-b border-black/30 pb-2">
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h1>
                        <p className="mt-2 text-sm text-slate-500">Workspace and account preferences.</p>
                    </header>

                    <section aria-labelledby="preferences-heading" className="rounded-xl border border-slate-200 bg-white">
                        <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
                            <h2 id="preferences-heading" className="text-sm font-semibold text-slate-900">Preferences</h2>
                        </div>
                        <ul className="divide-y divide-slate-200">
                            {sections.map((section) => (
                                <li key={section.title} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">
                                    <div className="flex min-w-0 items-start gap-3">
                                        <span aria-hidden="true" className="mt-0.5 shrink-0 text-base text-slate-400">
                                            {section.icon}
                                        </span>
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-medium text-slate-800">{section.title}</h3>
                                            <p className="mt-1 text-xs leading-relaxed text-slate-500">{section.description}</p>
                                        </div>
                                    </div>
                                    <span className="pl-7 text-xs text-slate-500 sm:shrink-0 sm:pl-0">Coming soon</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <p className="mt-4 text-xs leading-relaxed text-slate-500">
                        <span className="font-medium text-blue-600">Not available yet.</span>{" "}
                        These settings are still in development. No preferences can be changed here yet.
                    </p>
                </div>
            </main>
        </div>
    );
}
