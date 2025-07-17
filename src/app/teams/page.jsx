"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Sidebar } from "../../components/Sidebar";

export default function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [initialTaskTitle, setInitialTaskTitle] = useState("");
    const [initialTaskStage, setInitialTaskStage] = useState("Not Started");

    const [deletingTeamId, setDeletingTeamId] = useState(null);
    const STAGES = ["Not Started", "In Progress", "Completed"];

    // Pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const teamNameInputRef = useRef(null);

    const router = useRouter();

    useEffect(() => {
        fetchTeams(page);
    }, [page]);

    useEffect(() => {
        if (showForm && teamNameInputRef.current) {
            teamNameInputRef.current.focus();
        }
    }, [showForm]);

    async function fetchTeams(pageNum = 1, { silent = false } = {}) {
        if (!silent) setLoading(true);

        try {
            const res = await fetch(`/api/teams?page=${pageNum}&limit=${limit}`);
            if (!res.ok) throw new Error("Failed to fetch teams");
            const data = await res.json();

            if (Array.isArray(data)) {
                setTeams(data);
                setTotalPages(1);
                setPage(1);
            } else if (Array.isArray(data.teams)) {
                setTeams(data.teams);
                setTotalPages(data.totalPages || 1);
                // setPage(data.page || 1);
            } else {
                setTeams([]);
                setTotalPages(1);
                setPage(1);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            if (!silent) setLoading(false);
        }
    }

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

    async function handleAddTeam(e) {
        e.preventDefault();
        const tasks = initialTaskTitle.trim()
            ? [{ title: initialTaskTitle, status: initialTaskStage }]
            : [];
        if (!teamName.trim()) return;

        try {
            const res = await fetch("/api/teams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: teamName, tasks }),
            });
            if (!res.ok) throw new Error("Failed to add team");
            const newTeam = await res.json();

            setTeams(prev => [...prev, newTeam]);

            setShowForm(false);
            setTeamName("");
            setInitialTaskTitle("");
            setInitialTaskStage("Not Started");

            fetchTeams(page, { silent: true });
        } catch (err) {
            alert("Failed to add team");
        }
    }

    async function handleDeleteTeam(teamId) {
        if (!window.confirm("Are you sure you want to delete this team?\nThis action cannot be undone.")) return;
        setDeletingTeamId(teamId);
        try {
            const res = await fetch(`/api/teams/${teamId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");

            setTeams(prev => prev.filter(t => (t.id || t._id) !== teamId));

            fetchTeams(page, { silent: true });
        } catch (err) {
            alert("Failed to delete");
        } finally {
            setDeletingTeamId(null);
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center min-h-screen bg-gray-50 justify-center">
                <div className="loader1 mb-4"></div>
                <div className="text-lg text-gray-600">Loading teams...</div>
            </div>
        );
    }

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
            <div className=" flex flex-col items-center w-full max-w-7xl px-2 sm:px-4 py-3
                  ml-0 md:ml-50 ">
                <div className="w-full flex flex-row justify-between items-center mb-6 mt-15 md:mt-0">
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
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-lg border border-gray-200 relative modal-animate-in">
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
                                    <input ref={teamNameInputRef}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                                        placeholder="Team Name"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Initial Task Title <span className="text-gray-400 font-normal">(optional)</span></label>
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                                        placeholder="Initial Task Title"
                                        value={initialTaskTitle}
                                        onChange={(e) => setInitialTaskTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Initial Task Stage</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
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

                {/* when no teams are present */}
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

                {teams.length > 0 && (
                    <>
                        {/* desktop div */}
                        <div className="hidden md:block w-full rounded-lg overflow-x-auto border border-gray-200 shadow bg-white">
                            <table className="min-w-full text-sm border-collapse">
                                <thead className="bg-slate-100">
                                    <tr>
                                        <th className="p-4 border-b border-gray-200 border-r text-center">S.No.</th>
                                        <th className="p-4 border-b border-gray-200 border-r text-left">Team Name</th>
                                        <th className="p-4 border-b border-gray-200 border-r text-left">Task Title</th>
                                        <th className="p-4 border-b border-gray-200 border-r text-left">Stage</th>
                                        {/* --- NEW: Actions column --- */}
                                        <th className="p-4 border-b border-gray-200  text-center">Actions</th>
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
                                                    <td className="p-4 border-b border-gray-100 border-r italic text-gray-400">
                                                        <span className="inline-block w-3 h-3 rounded-full mr-2 align-middle bg-gray-300" />
                                                        —
                                                    </td>
                                                    <td className="flex items-center justify-center p-4 border-b border-gray-100 text-center">
                                                        <button
                                                            className="cursor-pointer flex items-center justify-center p-1 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50"
                                                            onClick={() => handleDeleteTeam(team.id || team._id)}
                                                            disabled={deletingTeamId === team.id || deletingTeamId === team._id}
                                                            title="Delete Team"
                                                        >
                                                            {deletingTeamId === (team.id || team._id) ? (
                                                                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                                    <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17" />
                                                                </svg>
                                                            )}
                                                        </button>
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

                                                {idx === 0 && (
                                                    <td
                                                        rowSpan={tasks.length}
                                                        className="flex items-center justify-center p-4 border-b border-gray-100 text-center align-top"
                                                    >
                                                        <button
                                                            className="cursor-pointer flex items-center justify-center p-1 rounded-lg text-white bg-red-600 hover:bg-red-700 font-semibold disabled:opacity-50"
                                                            onClick={() => handleDeleteTeam(team.id || team._id)}
                                                            disabled={deletingTeamId === team.id || deletingTeamId === team._id}
                                                            title="Delete Team"
                                                        >
                                                            {deletingTeamId === (team.id || team._id) ? (
                                                                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                                                </svg>
                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                                    <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ));
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* mobile div */}
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
                                    <div className="flex justify-between items-center mt-3">
                                        <Link
                                            href={`/teams/${team.id || team._id}`}
                                            className="text-gray-500 hover:text-slate-800 underline underline-offset-2 text-sm"
                                        >
                                            View Details
                                        </Link>
                                        <button
                                            className="cursor-pointer underline underline-offset-2  text-red-500 hover:text-red-600 font-bold text-sm"
                                            onClick={() => handleDeleteTeam(team.id || team._id)}
                                            title="Delete Team"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full flex justify-end items-center gap-2 mt-6 mb-4 md:mb-0">
                            <button
                                className="cursor-pointer px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                ←
                            </button>
                            <span className="px-2 text-gray-700">
                                Page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages}</span>
                            </span>
                            <button
                                className="cursor-pointer px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}