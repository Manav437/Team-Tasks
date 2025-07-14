"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [initialTaskTitle, setInitialTaskTitle] = useState("");
    const [initialTaskStage, setInitialTaskStage] = useState("Not Started");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const STAGES = ["Not Started", "In Progress", "Completed"];

    const router = useRouter();


    function getStatusClasses(stage) {
        if (stage === "Not Started") return "text-gray-700 bg-gray-100";
        if (stage === "In Progress") return "text-yellow-800 bg-yellow-100";
        if (stage === "Completed") return "text-green-800 bg-green-100";
        return "";
    }
    function getDotColor(stage) {
        if (stage === "Not Started") return "bg-gray-400";
        if (stage === "In Progress") return "bg-yellow-400";
        if (stage === "Completed") return "bg-green-500";
        return "";
    }

    useEffect(() => {
        async function fetchTeams() {
            try {
                const res = await fetch("/api/teams");
                if (!res.ok) {
                    // If unauthorized, redirect to login
                    if (res.status === 401) {
                        router.push("/auth/login");
                        return;
                    }
                    throw new Error("Failed to fetch teams");
                }
                const data = await res.json();
                setTeams(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTeams();
    }, [router]);

    async function handleAddTeam(e) {
        e.preventDefault();
        const tasks = initialTaskTitle.trim()
            ? [{
                title: initialTaskTitle,
                status: initialTaskStage,
            }]
            : [];
        if (!teamName.trim()) return;
        try {
            const res = await fetch("/api/teams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: teamName,
                    tasks,
                }),
            });
            if (!res.ok) throw new Error("Failed to add team");
            const newTeam = await res.json();
            setTeams((prev) => [...prev, newTeam]);
            setTeamName("");
            setInitialTaskTitle("");
            setInitialTaskStage("Not Started");
            setShowForm(false);
        } catch (err) {
            alert("Failed to add team");
        }
    }

    // Sidebar content (responsive)
    function Sidebar() {
        return (
            <>
                {/* Desktop Sidebar */}
                <aside
                    className={`hidden md:flex h-screen fixed top-0 left-0 z-40 bg-white border-r border-gray-200 shadow transition-all duration-300
                    w-54 flex-col`}
                >
                    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
                        <span className="font-bold text-lg text-indigo-700">Admin Panel</span>
                    </div>
                    <nav className="flex-1 flex flex-col gap-2 mt-4">
                        <Link
                            href="/teams"
                            className="flex items-center px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-indigo-700 font-semibold"
                        >
                            <span className="material-icons mr-2">Groups</span>
                        </Link>
                        <Link
                            href="/projects"
                            className="flex items-center px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-gray-700"
                        >
                            <span className="material-icons mr-2">Work</span>
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-gray-700"
                        >
                            <span className="material-icons mr-2">Settings</span>
                        </Link>
                    </nav>
                    <div className="flex flex-row items-center justify-between mb-10 w-full gap-2">
                        <div className="flex gap-2 items-center pl-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
                            <span>Mr. manav</span>
                        </div>
                        <button
                            className="cursor-pointer flex items-center px-4 py-2 rounded transition-colors hover:bg-red-50 text-red-600 font-semibold"
                            onClick={() => signOut({ callbackUrl: "/auth/login" })}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                            </svg>
                        </button>
                    </div>
                </aside>
                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 flex md:hidden">
                        {/* Overlay background */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-30"
                            onClick={() => setSidebarOpen(false)}
                        />
                        {/* Sidebar panel */}
                        <aside className="relative w-64 bg-white h-full shadow-lg flex flex-col z-50">
                            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
                                <span className="font-bold text-lg text-indigo-700">Admin Panel</span>
                                <button
                                    className="ml-auto text-gray-500 hover:text-indigo-700 focus:outline-none"
                                    onClick={() => setSidebarOpen(false)}
                                    aria-label="Close sidebar"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <nav className="flex-1 flex flex-col gap-2 mt-4">
                                <Link
                                    href="/teams"
                                    className="flex items-center px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-indigo-700 font-semibold"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="material-icons mr-2">groups</span>
                                </Link>
                                <Link
                                    href="/projects"
                                    className="flex items-center px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-gray-700"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="material-icons mr-2">work</span>
                                </Link>
                                <Link
                                    href="/settings"
                                    className="flex items-center px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-gray-700"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="material-icons mr-2">settings</span>
                                </Link>
                            </nav>
                            <button
                                className="flex items-center px-4 py-2 rounded transition-colors hover:bg-red-50 text-red-600 font-semibold mb-6 mt-4"
                                onClick={() => {
                                    setSidebarOpen(false);
                                    signOut({ callbackUrl: "/auth/login" });
                                }}
                            >
                                <span className="material-icons mr-2">Logout</span>
                            </button>
                        </aside>
                    </div>
                )}
                {/* Mobile Top Bar */}
                <nav className="md:hidden flex items-center justify-between w-full h-14 px-4 bg-white border-b border-gray-200 shadow fixed top-0 left-0 z-40">
                    <button
                        className="cursor-pointer text-gray-500 hover:text-indigo-700 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <rect x="4" y="6" width="16" height="2" rx="1" fill="currentColor" />
                            <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor" />
                            <rect x="4" y="16" width="16" height="2" rx="1" fill="currentColor" />
                        </svg>
                    </button>
                    <span className="font-bold text-lg text-indigo-700">Admin Panel</span>
                    <button
                        className="ml-2 text-red-600 hover:text-red-800"
                        onClick={() => signOut({ callbackUrl: "/auth/login" })}
                        aria-label="Logout"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                        </svg>
                    </button>
                </nav>
            </>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex flex-col items-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center justify-center text-lg min-h-screen text-gray-600">Loading teams...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8">
                <div className="text-lg text-red-600">Error: {error}</div>
            </div>
        );
    }

    // Main UI
    return (
        <div className="flex min-h-screen min-w-screen bg-gradient-to-br from-slate-100 via-gray-50 to-white">
            <Sidebar />
            <div
                className={`
                    flex flex-col items-center w-full max-w-8xl px-2 sm:px-4 py-8 mx-auto transition-all duration-300
                    ${"pt-20 md:pt-0"} ${"md:ml-54"}
                `}
            >
                <div className="w-full flex flex-row justify-between items-center mb-6 mt-4">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">Teams & Work Status</h1>

                    {teams.length > 0 && (
                        <button
                            className="cursor-pointer px-4 py-2 rounded-lg font-semibold transition-colors shadow bg-green-600 text-white hover:bg-green-700 text-sm sm:text-base"
                            onClick={() => setShowForm(true)}
                        >
                            Add New Team
                        </button>
                    )}
                </div>

                {/* Modal */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/70">
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-lg border border-gray-200 relative">
                            <button
                                className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                                onClick={() => setShowForm(false)}
                                aria-label="Close"
                                type="button"
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-slate-800">Add New Team</h2>
                            <form onSubmit={handleAddTeam} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        placeholder="Team Name"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Initial Task Title <span className="text-gray-400 font-normal">(optional)</span></label>
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        placeholder="Initial Task Title (optional)"
                                        value={initialTaskTitle}
                                        onChange={(e) => setInitialTaskTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Initial Task Stage</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        value={initialTaskStage}
                                        onChange={(e) => setInitialTaskStage(e.target.value)}
                                        disabled={!initialTaskTitle.trim()}
                                    >
                                        {STAGES.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="mt-2 px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
                                >
                                    Add Team
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* No teams state */}
                {teams.length === 0 && (
                    <div className="flex flex-col items-center w-full py-16">
                        <div className="text-lg text-gray-600 mb-4">No teams found yet.</div>
                        <button
                            className="cursor-pointer px-5 py-2 rounded-lg font-semibold transition-colors shadow bg-green-600 text-white hover:bg-green-700"
                            onClick={() => setShowForm(true)}
                        >
                            Add Your First Team
                        </button>
                    </div>
                )}

                {/* Teams Table (desktop) or Card List (mobile) */}
                {teams.length > 0 && (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block w-full rounded-2xl overflow-x-auto border border-gray-200 shadow bg-white">
                            <table className="min-w-full text-sm border-collapse">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="p-4 border-b border-gray-200 border-r text-left">S.No.</th>
                                        <th className="p-4 border-b border-gray-200 border-r text-left">Team Name</th>
                                        <th className="p-4 border-b border-gray-200 border-r text-left">Task Title</th>
                                        <th className="p-4 border-b border-gray-200 text-left">Stage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((team, teamIdx) => {
                                        const tasks = team.tasks ?? [];
                                        if (tasks.length === 0) {
                                            return (
                                                <tr key={team.id || team._id} className="even:bg-gray-50">
                                                    <td className="p-4 border-b border-gray-100 border-r align-top text-center font-semibold bg-slate-50">
                                                        {teamIdx + 1}
                                                    </td>
                                                    <td className="p-4 border-b border-gray-100 border-r align-top bg-slate-50">
                                                        <Link
                                                            className="font-semibold underline underline-offset-1 decoration-1 decoration-indigo-700 hover:decoration-green-700 text-indigo-700 hover:text-green-700 transition break-words"
                                                            href={`/teams/${team.id || team._id}`}
                                                        >
                                                            {team.name}
                                                        </Link>
                                                    </td>
                                                    <td className="p-4 border-b border-gray-100 border-r break-words italic text-gray-400">
                                                        No task assigned
                                                    </td>
                                                    <td className="p-4 border-b border-gray-100 italic text-gray-400">
                                                        <span className="inline-block w-3 h-3 rounded-full mr-2 align-middle bg-gray-300" />
                                                        —
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return tasks.map((task, idx) => (
                                            <tr key={task.id || task._id} className="even:bg-gray-50">
                                                {idx === 0 && (
                                                    <>
                                                        <td
                                                            rowSpan={tasks.length}
                                                            className="p-4 border-b border-gray-100 border-r align-top text-center font-semibold bg-slate-50"
                                                        >
                                                            {teamIdx + 1}
                                                        </td>
                                                        <td
                                                            rowSpan={tasks.length}
                                                            className="p-4 border-b border-gray-100 border-r align-top bg-slate-50"
                                                        >
                                                            <Link
                                                                className="font-semibold underline underline-offset-1 decoration-1 decoration-indigo-700 hover:decoration-green-700 text-indigo-700 hover:text-green-700 transition break-words"
                                                                href={`/teams/${team.id || team._id}`}
                                                            >
                                                                {team.name}
                                                            </Link>
                                                        </td>
                                                    </>
                                                )}
                                                <td className="p-4 border-b border-gray-100 border-r break-words">{task.title}</td>
                                                <td
                                                    className={
                                                        "p-4 border-b border-gray-100 " +
                                                        getStatusClasses(task.status)
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            "inline-block w-3 h-3 rounded-full mr-2 align-middle " +
                                                            getDotColor(task.status)
                                                        }
                                                    />
                                                    {task.status}
                                                </td>
                                            </tr>
                                        ));
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Mobile Card List */}
                        <div className="md:hidden w-full flex flex-col gap-4">
                            {teams.map((team, teamIdx) => (
                                <div key={team.id || team._id} className="bg-white rounded-xl shadow border border-gray-200 p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-bold text-indigo-700 text-lg">{team.name}</div>
                                        <span className="text-xs text-gray-400">#{teamIdx + 1}</span>
                                    </div>
                                    {(team.tasks && team.tasks.length > 0) ? (
                                        team.tasks.map((task, idx) => (
                                            <div key={task.id || task._id} className="flex items-center justify-between mt-2">
                                                <div className="font-medium text-slate-700">{task.title}</div>
                                                <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusClasses(task.status)}`}>
                                                    <span className={`inline-block w-2 h-2 rounded-full mr-1 align-middle ${getDotColor(task.status)}`} />
                                                    {task.status}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="italic text-gray-400 mt-2">No task assigned</div>
                                    )}
                                    <Link
                                        href={`/teams/${team.id || team._id}`}
                                        className="block mt-3 text-indigo-600 underline text-sm"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
