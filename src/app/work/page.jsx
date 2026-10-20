"use client";
import { Sidebar } from "../../components/Sidebar";

export default function WorkPage() {
    const stats = [
        { label: "Active tasks", value: "12" },
        { label: "Hours logged", value: "32.5" },
        { label: "Completion rate", value: "84%" },
        { label: "Urgent flags", value: "2" },
    ];

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            <Sidebar />

            <main className="min-w-0 flex-1 h-dvh overflow-auto">
                <div className="max-w-6xl mx-auto px-2 sm:px-4 pt-28 md:pt-10 pb-12">
                    <header className="mb-6 border-b border-black/30 pb-2">
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Work</h1>
                        <p className="mt-2 text-sm text-slate-500">
                            A snapshot of your tasks and project pipeline.
                        </p>
                        {/* <p className="mt-2 text-xs text-blue-600">Preview · Sample data</p>*/}
                    </header>

                    <dl className="grid grid-cols-2 divide-x divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white sm:grid-cols-4">
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`px-4 py-4 sm:px-5 ${i > 1 ? "border-t border-slate-200 sm:border-t-0" : ""} ${i === 2 ? "max-sm:border-l-0" : ""}`}
                            >
                                <dt className="text-xs text-slate-500">{stat.label}</dt>
                                <dd className="mt-1 text-xl font-semibold tabular-nums text-slate-900">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <section aria-labelledby="pipeline-heading" className="mt-6 rounded-xl border border-slate-200 bg-white">
                        <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
                            <h2 id="pipeline-heading" className="text-sm font-semibold text-slate-900">Current pipeline</h2>
                        </div>
                        <ul className="divide-y divide-slate-200">
                            {[1, 2, 3].map((phase) => (
                                <li key={phase} className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-medium text-slate-800">
                                            Operational System Audit - Phase {phase}
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-500">Internal project</p>
                                    </div>
                                    <span className="shrink-0 text-xs text-slate-500">Due in {phase + 1} days</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section aria-labelledby="weekly-progress-heading" className="mt-6 rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5">
                        <div className="flex items-center justify-between gap-4">
                            <h2 id="weekly-progress-heading" className="text-sm font-semibold text-slate-900">Weekly progress</h2>
                            <span className="text-sm font-medium tabular-nums text-blue-600">84%</span>
                        </div>
                        <div
                            role="progressbar"
                            aria-labelledby="weekly-progress-heading"
                            aria-valuenow={84}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"
                        >
                            <div className="h-full w-[84%] rounded-full bg-blue-600" />
                        </div>
                        <p className="mt-3 text-xs text-slate-500">2 more tasks to reach the weekly goal in this sample.</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
