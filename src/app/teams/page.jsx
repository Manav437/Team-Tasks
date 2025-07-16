"use client";
import Link from "next/link";
import Image from 'next/image'
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
                const res = await fetch("/api/teams");      //by default GET req
                if (!res.ok) {
                    // If unauthorized, redirect to login
                    // if (res.status === 401) {
                    //     router.push("/auth/login");
                    //     return;
                    // }
                    throw new Error("Failed to fetch teams");
                }
                const data = await res.json();
                setTeams(Array.isArray(data) ? data : []);
                // console.log(data);
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

    function Sidebar() {
        return (
            <>
                {/* Desktop Sidebar */}
                <aside
                    className={`hidden md:flex h-screen fixed top-0 left-0 z-40 bg-white border-r border-gray-200 shadow transition-all duration-300
                    w-54 flex-col`}
                >
                    <div className="flex items-center gap-2 justify-start h-16 px-4 border-b border-gray-200">
                        <Image alt="task-teams-logo" height={30} width={30} src="/team-tasks.png" />
                        <span className="text-gray-400">|</span>
                        <span className="font-bold text-lg text-[#000]">Admin Panel</span>
                    </div>
                    <nav className="flex-1 flex flex-col gap-2 mt-4 border-b-1 border-gray-200">
                        <Link
                            href="/teams"
                            className="flex items-center gap-2 px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-gray-700 font-semibold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M1 17.577v-.863q0-.922.985-1.53q.984-.607 2.534-.607q.229 0 .49.022q.262.022.556.072q-.234.41-.342.84q-.107.431-.107.864v1.202zm6 0v-1.125q0-.604.351-1.105q.351-.5 1.036-.866q.684-.365 1.595-.548t2.01-.183q1.121 0 2.032.183t1.595.548t1.033.866t.348 1.105v1.125zm11.885 0v-1.196q0-.479-.105-.902t-.314-.808q.313-.05.562-.072t.472-.022q1.55 0 2.525.605T23 16.714v.863zM4.514 13.635q-.589 0-1.003-.418q-.415-.418-.415-1.005q0-.581.418-.993t1.005-.411q.581 0 1.002.411q.421.412.421.998q0 .57-.41.994q-.411.424-1.018.424m14.986 0q-.575 0-.999-.424t-.424-.994q0-.586.424-.998t1.003-.411q.596 0 1.008.411t.411.993q0 .587-.409 1.005q-.41.418-1.014.418M12.007 13q-.91 0-1.555-.64q-.644-.639-.644-1.552q0-.932.639-1.562q.64-.63 1.553-.63q.932 0 1.562.628t.63 1.557q0 .91-.628 1.555T12.007 13" /></svg>
                            Groups
                        </Link>
                        <Link
                            href="/projects"
                            className="flex items-center gap-2 px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-gray-700 font-semibold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.616 20q-.691 0-1.153-.462T3 18.384V8.616q0-.691.463-1.153T4.615 7H9V5.615q0-.69.463-1.153T10.616 4h2.769q.69 0 1.153.462T15 5.615V7h4.385q.69 0 1.152.463T21 8.616v9.769q0 .69-.463 1.153T19.385 20zM10 7h4V5.615q0-.23-.192-.423T13.385 5h-2.77q-.23 0-.423.192T10 5.615z" /></svg>
                            Work
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center gap-2 px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-gray-700 font-semibold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10.96 21q-.349 0-.605-.229q-.257-.229-.319-.571l-.263-2.092q-.479-.145-1.036-.454q-.556-.31-.947-.664l-1.915.824q-.317.14-.644.03t-.504-.415L3.648 15.57q-.177-.305-.104-.638t.348-.546l1.672-1.25q-.045-.272-.073-.559q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626l-1.672-1.25q-.275-.213-.338-.555t.113-.648l1.06-1.8q.177-.287.504-.406t.644.021l1.896.804q.448-.373.97-.673q.52-.3 1.013-.464l.283-2.092q.061-.342.318-.571T10.96 3h2.08q.349 0 .605.229q.257.229.319.571l.263 2.112q.575.202 1.016.463t.909.654l1.992-.804q.318-.14.645-.021t.503.406l1.06 1.819q.177.306.104.638t-.348.547L18.36 10.92q.082.31.092.569t.01.51q0 .233-.02.491q-.019.259-.088.626l1.69 1.27q.275.213.358.546t-.094.638l-1.066 1.839q-.176.306-.513.415q-.337.11-.654-.03l-1.923-.824q-.467.393-.94.673t-.985.445l-.264 2.111q-.061.342-.318.571t-.605.23zm1.013-6.5q1.046 0 1.773-.727T14.473 12t-.727-1.773t-1.773-.727q-1.052 0-1.776.727T9.473 12t.724 1.773t1.776.727" /></svg>
                            Settings
                        </Link>
                    </nav>
                    <div className="flex flex-row items-center justify-between mt-4 mb-4 min-w-11/12 mx-2 gap-2 bg-slate-200 rounded-lg">
                        <div className="flex gap-1 items-center pl-2">
                            <img className='bg-white p-0.5 size-8 rounded-4xl border-1 border-gray-600' src="https://img.icons8.com/?size=100&id=81139&format=png&color=000000" alt="" />
                            <span className="font-semibold text-slate-600">Admin - ABC</span>
                        </div>
                        <button
                            className="cursor-pointer flex items-center px-2 py-2 rounded transition-colors border-1 border-transparent hover:border-1 hover:border-red-600 hover:bg-red-200 text-red-600 font-semibold"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to log out?")) {
                                    signOut({ callbackUrl: "/auth/login" });
                                }
                            }}
                        >
                            <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                            </svg>
                        </button>

                    </div>
                </aside>
                {/* Mobile Sidebar Overlay & Panel */}
                <div className="fixed inset-0 z-50 flex md:hidden pointer-events-none">
                    {/* Overlay background */}
                    <div
                        className={`
                        fixed inset-0 bg-slate-200/60 transition-opacity duration-300
                        ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                    `}
                        onClick={() => setSidebarOpen(false)}
                    />
                    {/* Sidebar panel */}
                    <aside
                        className={`
                        relative w-64 bg-white h-full shadow-lg flex flex-col z-50 transition-transform duration-300
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-80"}
                    `}
                        style={{ minWidth: "16rem" }}
                    >
                        <div className="flex items-center justify-between h-16 border-b border-gray-100">
                            <div className="flex items-center gap-2 h-16 px-4">
                                <Image alt="task-teams-logo" height={30} width={30} src="/team-tasks.png" />
                                <span className="text-gray-400">|</span>
                                <span className="font-bold text-lg text-[#000]">Admin Panel</span>
                            </div>
                            <button
                                className="ml-auto pr-4 text-gray-500 hover:text-indigo-700 focus:outline-none"
                                onClick={() => setSidebarOpen(false)}
                                aria-label="Close sidebar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <nav className="flex-1 flex flex-col gap-2 mt-4">
                            <Link
                                href="/teams"
                                className="flex items-center gap-2 px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-gray-700 font-semibold"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M1 17.577v-.863q0-.922.985-1.53q.984-.607 2.534-.607q.229 0 .49.022q.262.022.556.072q-.234.41-.342.84q-.107.431-.107.864v1.202zm6 0v-1.125q0-.604.351-1.105q.351-.5 1.036-.866q.684-.365 1.595-.548t2.01-.183q1.121 0 2.032.183t1.595.548t1.033.866t.348 1.105v1.125zm11.885 0v-1.196q0-.479-.105-.902t-.314-.808q.313-.05.562-.072t.472-.022q1.55 0 2.525.605T23 16.714v.863zM4.514 13.635q-.589 0-1.003-.418q-.415-.418-.415-1.005q0-.581.418-.993t1.005-.411q.581 0 1.002.411q.421.412.421.998q0 .57-.41.994q-.411.424-1.018.424m14.986 0q-.575 0-.999-.424t-.424-.994q0-.586.424-.998t1.003-.411q.596 0 1.008.411t.411.993q0 .587-.409 1.005q-.41.418-1.014.418M12.007 13q-.91 0-1.555-.64q-.644-.639-.644-1.552q0-.932.639-1.562q.64-.63 1.553-.63q.932 0 1.562.628t.63 1.557q0 .91-.628 1.555T12.007 13" /></svg>
                                Groups
                            </Link>
                            <Link
                                href="/projects"
                                className="flex items-center gap-2 px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-gray-700"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.616 20q-.691 0-1.153-.462T3 18.384V8.616q0-.691.463-1.153T4.615 7H9V5.615q0-.69.463-1.153T10.616 4h2.769q.69 0 1.153.462T15 5.615V7h4.385q.69 0 1.152.463T21 8.616v9.769q0 .69-.463 1.153T19.385 20zM10 7h4V5.615q0-.23-.192-.423T13.385 5h-2.77q-.23 0-.423.192T10 5.615z" /></svg>
                                Work
                            </Link>
                            <Link
                                href="/settings"
                                className="flex items-center gap-2 px-4 py-2 rounded transition-colors hover:bg-indigo-50 text-gray-700"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10.96 21q-.349 0-.605-.229q-.257-.229-.319-.571l-.263-2.092q-.479-.145-1.036-.454q-.556-.31-.947-.664l-1.915.824q-.317.14-.644.03t-.504-.415L3.648 15.57q-.177-.305-.104-.638t.348-.546l1.672-1.25q-.045-.272-.073-.559q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626l-1.672-1.25q-.275-.213-.338-.555t.113-.648l1.06-1.8q.177-.287.504-.406t.644.021l1.896.804q.448-.373.97-.673q.52-.3 1.013-.464l.283-2.092q.061-.342.318-.571T10.96 3h2.08q.349 0 .605.229q.257.229.319.571l.263 2.112q.575.202 1.016.463t.909.654l1.992-.804q.318-.14.645-.021t.503.406l1.06 1.819q.177.306.104.638t-.348.547L18.36 10.92q.082.31.092.569t.01.51q0 .233-.02.491q-.019.259-.088.626l1.69 1.27q.275.213.358.546t-.094.638l-1.066 1.839q-.176.306-.513.415q-.337.11-.654-.03l-1.923-.824q-.467.393-.94.673t-.985.445l-.264 2.111q-.061.342-.318.571t-.605.23zm1.013-6.5q1.046 0 1.773-.727T14.473 12t-.727-1.773t-1.773-.727q-1.052 0-1.776.727T9.473 12t.724 1.773t1.776.727" />
                                </svg>
                                Settings
                            </Link>
                        </nav>
                    </aside>
                </div>
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
                    <span className="font-bold text-lg text-[#000]">Admin Panel</span>
                    <button
                        className=" p-1 ml-2 text-red-600 hover:text-red-800 hover:bg-red-200 rounded-lg"
                        // onClick={() => signOut({ callbackUrl: "/auth/login" })}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to log out?')) {
                                signOut({ callbackUrl: "/auth/login" })
                            }
                        }}
                        aria-label="Logout"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                        </svg>
                    </button >
                </nav >
            </>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex flex-col items-center min-h-screen bg-gray-50 justify-center">
                <div className="loader1 mb-4"></div>
                <div className="text-lg text-gray-600">Loading teams...</div>
            </div>
        );
    }


    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
                <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-8">
                    <svg
                        className="w-12 h-12 text-red-500 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                    </svg>
                    <div className="text-xl font-semibold text-red-600 mb-2" role="alert">
                        Error: {error}
                    </div>
                    <div className="mb-4 text-gray-700">
                        Please{" "}
                        <Link
                            className="underline underline-offset-2 hover:text-green-600 transition-colors"
                            href="/auth/login"
                        >
                            Log in
                        </Link>{" "}
                        first.
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

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
                    <h1 className="text-2xl underline underline-offset-2 sm:text-3xl font-extrabold text-slate-800 tracking-tight">Teams & Work Status</h1>

                    {teams.length > 0 && (
                        <button
                            className="cursor-pointer px-4 py-2 rounded-lg font-semibold transition-colors shadow bg-green-600 text-white hover:bg-green-700 text-sm sm:text-base"
                            onClick={() => setShowForm(true)}
                        >
                            + Add New Team
                        </button>
                    )}
                </div>

                {/* Modal */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/70">
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-lg border border-gray-200 relative">
                            <button
                                className="cursor-pointer absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                                onClick={() => setShowForm(false)}
                                aria-label="Close"
                                type="button"
                            >
                                &times;
                            </button>
                            <h2 className="underline underline-offset-2 text-xl font-bold mb-4 text-slate-800">Add New Team</h2>
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
                                    className="cursor-pointer mt-2 px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
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
                        <div className="text-lg text-gray-600 mb-2">No teams found yet.</div>
                        <div className="text-sm text-gray-400 mb-4 italic">
                            It's quieter than a library in here... Time to start your first team!
                        </div>
                        <button
                            className="cursor-pointer px-5 py-2 rounded-lg font-semibold transition-colors shadow bg-green-600 text-white hover:bg-green-700"
                            onClick={() => setShowForm(true)}
                        >
                            + Add Your First Team
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
                                        <th className="p-4 border-b border-gray-200 border-r text-center">S.No.</th>
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
                                        <span className="text-xs text-green-600">#{teamIdx + 1}</span>
                                    </div>
                                    {(team.tasks && team.tasks.length > 0) ? (
                                        team.tasks.map((task, idx) => (
                                            <div key={task.id || task._id}>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="font-medium text-slate-700">{task.title}</div>
                                                    <span className={`flex items-center ml-2 px-2 py-1 rounded text-xs ${getStatusClasses(task.status)}`}>
                                                        <span className={`inline-block w-2 h-2 rounded-full mr-1 align-middle ${getDotColor(task.status)}`} />
                                                        {task.status}
                                                    </span>
                                                </div>
                                                {/* Separator after each task except the last */}
                                                {idx < team.tasks.length - 1 && (
                                                    <hr className="my-2 border-t border-gray-200" />
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="italic text-gray-400 mt-2">No task assigned</div>
                                    )}
                                    <Link
                                        href={`/teams/${team.id || team._id}`}
                                        className="text-end block mt-3 text-gray-500 hover:text-slate-800 underline text-sm"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div >
    );
}