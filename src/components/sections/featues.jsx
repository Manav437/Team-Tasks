"use client";
import Image from "next/image";

const FEATURES = [
    {
        title: "Secured Login",
        description:
            "Protect your data with secure authentication. Supports email/password and Google OAuth.",
        image: "/login-page.png",
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Team Management",
        description:
            "Easily create, organize, and manage teams. Assign roles and keep everyone in sync.",
        image: "/teams-page.png",
        className: "md:col-span-2 md:row-span-1",
    },
    {
        title: "AI-Powered Summaries",
        description:
            "Get instant AI-generated summaries of team activity and project status.",
        image: "/ai-summary.png",
        className: "md:col-span-2 md:row-span-1",
    },
    {
        title: "Task Assignment",
        description:
            "Set deadlines and track progress in real time with a clear dashboard.",
        image: "/tasks-page.png",
        className: "md:col-span-1 md:row-span-1",
    },
];

export default function Features() {
    return (
        <section className="mt-20 flex flex-col items-center w-full px-4 mb-20">
            <div className="max-w-6xl w-full">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-slate-900 tracking-tight">
                    Everything you need to <br className="hidden md:block" />
                    <span className="text-slate-600">manage like a pro.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FEATURES.map((feature, idx) => (
                        <div
                            key={feature.title}
                            className={`${feature.className} group relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-500 hover:shadow-2xl flex flex-col`}
                        >
                            <div className="p-8 pb-0">
                                <span className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3 block">
                                    Feature {idx + 1}
                                </span>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed max-w-[90%]">
                                    {feature.description}
                                </p>
                            </div>

                            <div className="relative mt-8 w-[90%] mx-auto h-full min-h-[200px] overflow-hidden rounded-t-2xl border-x border-t border-slate-200/50 bg-slate-50/50">
                                <Image
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-102"
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
