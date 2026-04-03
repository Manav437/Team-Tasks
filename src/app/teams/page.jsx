"use client";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { STAGES } from "@/constants";
import { Sidebar } from "../../components/Sidebar";
import { buildTeamSummaryPrompt } from "@/utils/prompt";
import SummaryModal from "@/components/summary-modal";
import { AddTeamModal } from "@/components/add-team-modal";
import { Pagination } from "../../components/pagination";
import { NoTeamsModal } from "@/components/no-teams-modal";
import { SkeletonGrid } from "../../components/loading-state";
import { IoIosAdd } from "react-icons/io";
import { RiGeminiFill, RiCloseLine } from "react-icons/ri";
import { MdDelete, MdSearch, MdArrowForward } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [initialTaskTitle, setInitialTaskTitle] = useState("");
    const [initialTaskStage, setInitialTaskStage] = useState(STAGES[0]);

    const [deletingTeamId, setDeletingTeamId] = useState(null);

    const [page, setPage] = useState(1);
    const [limit] = useState(9);
    const [totalPages, setTotalPages] = useState(1);

    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summaryModalOpen, setSummaryModalOpen] = useState(false);
    const [summaryContent, setSummaryContent] = useState("");

    const [search, setSearch] = useState("");

    const teamNameInputRef = useRef(null);

    useEffect(() => {
        if (showForm && teamNameInputRef.current) {
            teamNameInputRef.current.focus();
        }
    }, [showForm]);

    const fetchTeams = useCallback(
        async (pageNum = 1, { silent = false } = {}) => {
            if (!silent) setLoading(true);

            try {
                const res = await fetch(
                    `/api/teams?page=${pageNum}&limit=${limit}`,
                );
                if (!res.ok) throw new Error("Failed to fetch teams");
                const data = await res.json();

                if (Array.isArray(data)) {
                    setTeams(data);
                    setTotalPages(1);
                    setPage(1);
                } else if (Array.isArray(data.teams)) {
                    setTeams(data.teams);
                    setTotalPages(data.totalPages || 1);
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
        },
        [limit],
    );

    useEffect(() => {
        fetchTeams(page);
    }, [page, fetchTeams]);

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(search.toLowerCase())
    );

    async function handleAddTeam(e) {
        e.preventDefault();
        const tasks = initialTaskTitle.trim()
            ? [{ title: initialTaskTitle, status: initialTaskStage.value }]
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

            setTeams((prev) => [...prev, newTeam]);

            setShowForm(false);
            setTeamName("");
            setInitialTaskTitle("");
            setInitialTaskStage(STAGES[0]);

            fetchTeams(page, { silent: true });
        } catch (err) {
            alert("Failed to add team");
        }
    }

    async function handleDeleteTeam(teamId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this team?\nThis action cannot be undone.",
        );
        if (!confirmed) return;

        setDeletingTeamId(teamId);
        try {
            const res = await fetch(`/api/teams/${teamId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete");
            setTeams((prev) => prev.filter((t) => (t.id || t._id) !== teamId));
            fetchTeams(page, { silent: true });
        } catch (err) {
            alert("Failed to delete");
        } finally {
            setDeletingTeamId(null);
        }
    }

    async function handleAISummary(team) {
        setIsSummarizing(true);
        setSummaryModalOpen(true);
        setSummaryContent("");

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: buildTeamSummaryPrompt(team).trim(),
                }),
            });

            const { summary } = await res.json();
            setSummaryContent(summary);
        } catch (err) {
            console.error("Failed to get AI summary:", err);
            setSummaryContent("⚠️ Failed to generate summary.");
        } finally {
            setIsSummarizing(false);
        }
    }

    return (
        <div className="flex min-h-screen bg-[#f8fafc] overflow-hidden">
            <Sidebar />

            <main className="flex-1 h-screen flex flex-col overflow-hidden">
                <div className="pt-24 md:pt-4 px-4 sm:px-8 shrink-0 border-b border-b-slate-200">
                    <div className="w-full max-w-full mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                            <div>
                                <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
                                    Teams
                                </h1>
                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <span>Platform</span>
                                    <span>/</span>
                                    <span className="text-blue-600 font-semibold">Workspace Directory</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <div className="relative group min-w-[300px]">
                                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <MdSearch size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        className="pl-11 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none w-full transition-all shadow-sm"
                                        placeholder="Search by team name..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {search && (
                                        <button
                                            onClick={() => setSearch("")}
                                            className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                                            title="Clear search"
                                        >
                                            <RiCloseLine size={20} />
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={() => setShowForm(true)}
                                    className="cursor-pointer flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-[50px] [corner-shape:squircle] bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95 text-sm"
                                >
                                    <IoIosAdd size={24} />
                                    Create Team
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 sm:px-8 pt-4 pb-12 custom-scrollbar">
                    <div className="w-full max-w-full mx-auto">
                        {showForm && (
                            <AddTeamModal
                                show={showForm}
                                onClose={() => setShowForm(false)}
                                onSubmit={handleAddTeam}
                                teamName={teamName}
                                setTeamName={setTeamName}
                                initialTaskTitle={initialTaskTitle}
                                setInitialTaskTitle={setInitialTaskTitle}
                                initialTaskStage={initialTaskStage}
                                setInitialTaskStage={setInitialTaskStage}
                                STAGES={STAGES}
                                teamNameInputRef={teamNameInputRef}
                            />
                        )}

                        {loading ? (
                            <SkeletonGrid count={6} />
                        ) : (
                            <>
                                {teams.length === 0 && (
                                    <NoTeamsModal setShowForm={setShowForm} />
                                )}

                                {teams.length > 0 && (
                                    <>
                                        {search && filteredTeams.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-3xl border border-slate-100 shadow-sm animate-fade-in">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                                    <MdSearch className="text-slate-200 text-5xl" />
                                                </div>
                                                <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">No teams found for "{search}"</h3>
                                                <button
                                                    onClick={() => setSearch("")}
                                                    className="mt-6 text-sm font-bold text-blue-600 hover:underline cursor-pointer"
                                                >
                                                    Clear search filter
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                                                {filteredTeams.map((team, idx) => {
                                                    const totalTasks = team.tasks?.length || 0;
                                                    const completedTasks = team.tasks?.filter(t => t.status === "Completed").length || 0;

                                                    return (
                                                        <div
                                                            key={team.id || team._id}
                                                            className="group relative bg-white/70 backdrop-blur-sm border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 h-full flex flex-col"
                                                        >
                                                            <div className="flex justify-between items-start mb-6">
                                                                <div className="bg-slate-100 text-slate-400 text-[10px] font-black px-2 py-1 rounded-md tracking-widest uppercase">
                                                                    #{((page - 1) * limit) + idx + 1}
                                                                </div>
                                                                <div className="flex items-center gap-1.5 translate-y-[-4px]">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleAISummary(team);
                                                                        }}
                                                                        disabled={isSummarizing}
                                                                        className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm cursor-pointer"
                                                                        title="AI Summary"
                                                                    >
                                                                        {isSummarizing ? (
                                                                            <AiOutlineLoading3Quarters className="animate-spin text-sm" />
                                                                        ) : (
                                                                            <RiGeminiFill className="text-sm" />
                                                                        )}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            if (window.confirm(`Delete ${team.name}?`)) {
                                                                                handleDeleteTeam(team.id || team._id);
                                                                            }
                                                                        }}
                                                                        className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm cursor-pointer"
                                                                        title="Delete Team"
                                                                    >
                                                                        <MdDelete className="text-sm" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="flex-1 mb-6">
                                                                <h3 className="text-2xl font-bold text-slate-800 tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                                                                    {team.name}
                                                                </h3>

                                                                <div className="flex flex-col gap-2">
                                                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-wider">
                                                                        <span className="text-slate-400">Board Progress</span>
                                                                        <span className="text-blue-600">{totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%</span>
                                                                    </div>
                                                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                                        <div
                                                                            className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                                                            style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Link
                                                                href={`/teams/${team.id || team._id}`}
                                                                className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent group-hover:border-blue-100 group-hover:bg-blue-50 transition-all mt-auto"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-sm font-bold text-slate-700">Open Task Board</span>
                                                                </div>
                                                                <MdArrowForward className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                                            </Link>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        <div className="mt-12 flex justify-center">
                                            <Pagination
                                                page={page}
                                                setPage={setPage}
                                                totalPages={totalPages}
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <SummaryModal
                    open={summaryModalOpen}
                    isLoading={isSummarizing}
                    summary={summaryContent}
                    onClose={() => {
                        setSummaryModalOpen(false);
                        setSummaryContent("");
                    }}
                />
            </main>
        </div>
    );
}