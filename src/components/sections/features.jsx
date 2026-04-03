"use client";
import Image from "next/image";
import { PiLockKey, PiUsersThree, PiSparkle, PiListChecks } from "react-icons/pi";

const FEATURES = [
    {
        title: "AI Summaries",
        description:
            "Get instant AI-generated summaries of team activity and project status.",
        image: "/ai-summaryv2.png",
        icon: PiSparkle,
        className: "md:col-span-1 md:row-span-1",
        gradient: "from-purple-50 to-pink-50/50",
    },
    {
        title: "Team Management",
        description:
            "Easily create, organize, and manage teams. Assign roles and keep everyone in sync.",
        image: "/teams-pagev2.png",
        icon: PiUsersThree,
        className: "md:col-span-2 md:row-span-1",
        gradient: "from-emerald-50 to-teal-50/50",
    },
    {
        title: "Task Tracking",
        description:
            "Set deadlines and track progress in real time with a clear dashboard.",
        image: "/tasks-pagev2.png",
        icon: PiListChecks,
        className: "md:col-span-2 md:row-span-1",
        gradient: "from-orange-50 to-amber-50/50",
    },
    {
        title: "Secured Login",
        description:
            "Protect your data with secure authentication. Supports email/password and Google OAuth.",
        image: "/loginv2.png",
        icon: PiLockKey,
        className: "md:col-span-1 md:row-span-1",
        gradient: "from-blue-50 to-indigo-50/50",
    },
];

export default function Features() {
    return (
        <section className="mt-24 flex flex-col items-center w-full px-4 mb-24">
            <div className="max-w-5xl w-full">
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100/50 shadow-sm">
                        Powerful Features
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-center text-slate-900 tracking-tight leading-[1.1]">
                        Everything you need to <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900 bg-clip-text text-transparent">
                            manage like a pro.
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200/60 border border-slate-200/60 overflow-hidden shadow-2xl shadow-slate-200/50">
                    {FEATURES.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className={`${feature.className} group relative bg-white flex flex-col transition-all duration-700 ease-in-out hover:z-10`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                <div className="relative p-8 pb-0 z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                                            <Icon className="text-xl" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-500 transition-colors">
                                            0{idx + 1}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed max-w-[90%] group-hover:text-slate-600 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>

                                <div className="relative mt-auto pt-8 px-6 pb-6 z-10">
                                    <div className={`relative group/image overflow-hidden rounded-md border border-slate-200/50 bg-slate-50/50 shadow-xl shadow-slate-200/20 aspect-[4/3] md:aspect-auto md:h-64`}>
                                        <Image
                                            className="object-cover object-top transition-all duration-1000 group-hover:scale-101"
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* <div className="mt-12 flex justify-center text-slate-400 text-sm font-medium tracking-tight animate-bounce">
                    <p className="flex items-center gap-2">
                        Scroll to explore more <span className="text-lg">↓</span>
                    </p>
                </div> */}
            </div>
        </section>
    );
}
