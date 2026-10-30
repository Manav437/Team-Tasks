"use client";
import Link from "next/link";
import PageHeader from "@/components/dashboard/page-header";
import styles from "@/components/dashboard/dashboard.module.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { STAGES } from "@/constants";
import { Sidebar } from "../../components/Sidebar";
import { buildTeamSummaryPrompt } from "@/utils/prompt";
import ConfirmModal from "@/components/confirm-modal";
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
    const [teamToDelete, setTeamToDelete] = useState(null);

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
            setError(null);

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
        setDeletingTeamId(teamId);
        try {
            const res = await fetch(`/api/teams/${teamId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete");
            setTeams((prev) => prev.filter((t) => (t.id || t._id) !== teamId));
            fetchTeams(page, { silent: true });
        } catch {
            throw new Error("Couldn’t delete this team. Please try again.");
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

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to generate summary");
            setSummaryContent(data.summary);
        } catch (err) {
            console.error("Failed to get AI summary:", err);
            setSummaryContent(`⚠️ ${err.message || "Failed to generate summary."}`);
        } finally {
            setIsSummarizing(false);
        }
    }

    return (
        <div className="dashboard-theme flex min-h-screen bg-canvas md:h-dvh md:min-h-0 md:overflow-hidden">
            <Sidebar />

            <main className={`${styles.mainFrame} ${styles.teamsMain}`}>
                <div className={`${styles.content} ${styles.teamsContent}`}>
                    <PageHeader title="Teams" description="Your teams, their tasks, and the bigger picture." actions={<>
                        <div className="relative group w-full sm:w-64">
                            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-subtle transition-colors">
                                <MdSearch size={20} />
                            </div>
                            <input
                                type="text"
                                className="pl-11 pr-10 py-2.5 bg-panel border border-line rounded-xs text-sm focus:ring focus:ring-blue-100 outline-none w-full transition-colors"
                                placeholder="Search teams…"
                                aria-label="Search teams on this page"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute inset-y-0 right-3.5 flex items-center text-subtle hover:text-ink transition-colors cursor-pointer"
                                    title="Clear search"
                                >
                                    <RiCloseLine size={20} />
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="cursor-pointer flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xs bg-accent text-on-accent font-medium hover:bg-accent/90 transition-colors text-sm focus-visible:ring-2 focus-visible:ring-blue-300"
                        >
                            <IoIosAdd size={24} />
                            Create Team
                        </button>
                    </>} />
                    <div className={styles.directoryBar}>
                        <span>Team directory</span>
                        {/* <span>{loading ? "Loading teams…" : `${filteredTeams.length} teams on this page`}</span>*/}
                    </div>

                    <div className={styles.teamsList}>
                        <div className="w-full">
                            {error && (
                                <p role="alert" className="mb-5 rounded-md border border-danger-border bg-danger-bg px-4 py-3 text-sm text-danger">{error}</p>
                            )}
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
                                    {!error && teams.length === 0 && (
                                        <NoTeamsModal setShowForm={setShowForm} />
                                    )}

                                    {teams.length > 0 && (
                                        <>
                                            {search && filteredTeams.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center py-16 px-5 bg-panel rounded-md border border-line text-center">
                                                    <MdSearch className="mb-3 text-subtle text-2xl" />
                                                    <h3 className="text-base font-medium text-ink break-all">No teams found for &ldquo;{search}&rdquo;</h3>
                                                    <button
                                                        onClick={() => setSearch("")}
                                                        className="mt-3 text-sm font-medium text-info hover:underline cursor-pointer"
                                                    >
                                                        Clear search filter
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                                    {filteredTeams.map((team) => {
                                                        const totalTasks = team.tasks?.length || 0;
                                                        const completedTasks = team.tasks?.filter(t => t.status === "Completed").length || 0;

                                                        return (
                                                            <div
                                                                key={team.id || team._id}
                                                                className={styles.teamCard}
                                                            >
                                                                <div className="flex justify-between items-start gap-3 mb-5">
                                                                    <div className="min-w-0"><p className={styles.teamLabel}>{totalTasks} {totalTasks === 1 ? "task" : "tasks"}</p>
                                                                        <h2 className="min-w-0 text-ink break-words">
                                                                            <Link href={`/teams/${team.id || team._id}`} className="hover:text-ink transition-colors">{team.name}</Link>
                                                                        </h2></div>
                                                                    <div className="flex shrink-0 items-center gap-1">
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                handleAISummary(team);
                                                                            }}
                                                                            disabled={isSummarizing}
                                                                            className="p-2 rounded-md text-subtle hover:bg-raised hover:text-ink transition-colors cursor-pointer disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-blue-300"
                                                                            title="AI Summary"
                                                                            aria-label={`Summarize ${team.name}`}
                                                                        >
                                                                            {isSummarizing ? (
                                                                                <AiOutlineLoading3Quarters className="animate-spin text-sm" />
                                                                            ) : (
                                                                                <RiGeminiFill className="text-sm" />
                                                                            )}
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setTeamToDelete(team)}
                                                                            disabled={deletingTeamId === (team.id || team._id)}
                                                                            className="p-2 rounded-md text-subtle hover:bg-danger-bg hover:text-danger transition-colors cursor-pointer disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-blue-300"
                                                                            title="Delete Team"
                                                                            aria-label={`Delete ${team.name}`}
                                                                        >
                                                                            {deletingTeamId === (team.id || team._id) ? <AiOutlineLoading3Quarters className="animate-spin text-sm" /> : <MdDelete className="text-sm" />}
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div className="flex-1 mb-5">
                                                                    <div className="flex flex-col gap-2.5">
                                                                        <div className={`flex justify-between gap-2 text-muted ${styles.progressLabel}`}>
                                                                            <span>{completedTasks} of {totalTasks} tasks complete</span>
                                                                            <span>{totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%</span>
                                                                        </div>
                                                                        <div className="w-full h-1 bg-raised overflow-hidden">
                                                                            <div
                                                                                className="h-full bg-accent"
                                                                                style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <Link
                                                                    href={`/teams/${team.id || team._id}`}
                                                                    className="flex items-center justify-between border-t border-line pt-4 text-muted hover:text-ink transition-colors mt-auto"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="text-sm font-medium">Open board</span>
                                                                    </div>
                                                                    <MdArrowForward aria-hidden="true" />
                                                                </Link>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {!loading && teams.length > 0 && (
                        <div className={styles.teamsPagination}>
                            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
                        </div>
                    )}

                    <ConfirmModal
                        open={Boolean(teamToDelete)}
                        title="Delete team?"
                        description={`This will remove “${teamToDelete?.name || "this team"}” from your workspace. This action cannot be undone.`}
                        confirmLabel="Delete team"
                        pendingLabel="Deleting…"
                        destructive
                        onConfirm={() => handleDeleteTeam(teamToDelete.id || teamToDelete._id)}
                        onClose={() => setTeamToDelete(null)}
                    />

                    <SummaryModal
                        open={summaryModalOpen}
                        isLoading={isSummarizing}
                        summary={summaryContent}
                        onClose={() => {
                            setSummaryModalOpen(false);
                            setSummaryContent("");
                        }}
                    />
                </div>
            </main>
        </div>
    );
}
