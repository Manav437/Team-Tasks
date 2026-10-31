"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import ConfirmModal from "@/components/confirm-modal";
import styles from "@/components/dashboard/dashboard.module.css";
import { selectTheme, selectOptionStyles } from "@/utils/select-theme";
import PageHeader from "@/components/dashboard/page-header";
import { notFound } from "next/navigation";
import { IoIosAdd } from "react-icons/io";
import { MdSearch, MdEdit, MdDelete } from "react-icons/md";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { RiTaskLine, RiCloseLine, RiCalendarLine, RiFilter3Line } from "react-icons/ri";
import { Sidebar } from "../../../components/Sidebar";
import { SkeletonBoard } from "../../../components/loading-state";

import { formatDueDate, isTaskOverdue } from "@/utils/due-date.mjs";

const STAGES = ["Not Started", "In Progress", "Completed"];

function getStatusClasses(status) {
    if (status === "Not Started") return "text-muted";
    if (status === "In Progress") return "text-progress";
    if (status === "Completed") return "text-success";
    return "";
}
function getDotColor(status) {
    if (status === "Not Started") return "bg-slate-400";
    if (status === "In Progress") return "bg-progress";
    if (status === "Completed") return "bg-emerald-500";
    return "";
}

const filterOptions = [
    {
        value: "All",
        label: (
            <span className="flex items-center">
                <RiFilter3Line aria-hidden="true" className="mr-2 shrink-0 text-muted" size={14} />
                All Status
            </span>
        ),
    },
    ...STAGES.map((s) => ({
        value: s,
        label: (
            <span className="flex items-center">
                <span
                    className={`inline-block w-2 h-2 mr-2 shrink-0 rounded-full ${getDotColor(s)}`}
                />
                {s}
            </span>
        ),
    })),
];

const options = STAGES.map((s) => ({
    value: s,
    label: (
        <span className="flex items-center">
            <span
                className={`inline-block rounded-full w-2 h-2 mr-2 shrink-0 ${getDotColor(s)}`}
            />
            {s}
        </span>
    ),
}));

export default function TeamPage({ params }) {
    const { id } = React.use(params);

    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(STAGES[0]);
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    // Edit Task Modal State
    const [showEditForm, setShowEditForm] = useState(false);
    const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);
    const [editIdx, setEditIdx] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editStatus, setEditStatus] = useState(STAGES[0]);
    const [editDescription, setEditDescription] = useState("");
    const [editDueDate, setEditDueDate] = useState("");
    const [isSavingTask, setIsSavingTask] = useState(false);
    const [taskSaveError, setTaskSaveError] = useState("");
    const savingTaskRef = useRef(false);

    const [addTaskError, setAddTaskError] = useState("");

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const [collapsed, setCollapsed] = useState({
        "Not Started": false,
        "In Progress": false,
        Completed: false,
    });

    useEffect(() => {
        async function fetchTeam() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/teams/${id}`);
                if (res.status === 404) {
                    setTeam(null);
                    setLoading(false);
                    return;
                }
                if (!res.ok) throw new Error("Failed to fetch team");
                const data = await res.json();
                setTeam(data);
            } catch (err) {
                setError("Failed to load team");
            } finally {
                setLoading(false);
            }
        }
        fetchTeam();
    }, [id]);

    async function handleAddTask(e) {
        e.preventDefault();
        if (!title.trim()) return;
        setAddTaskError("");
        try {
            const res = await fetch(`/api/teams/${id}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, status, description, dueDate: dueDate || null }),
            });
            if (!res.ok) throw new Error("Failed to add task");
            const newTask = await res.json();
            setTeam((prev) =>
                prev
                    ? { ...prev, tasks: [...(prev.tasks ?? []), newTask] }
                    : prev,
            );
            setTitle("");
            setStatus(STAGES[0]);
            setDescription("");
            setDueDate("");
            setShowAddForm(false);
        } catch (err) {
            setAddTaskError("Couldn't create task. Please try again.");
        }
    }

    function openEditModal(idx) {
        if (!team || !team.tasks[idx]) return;
        const task = team.tasks[idx];
        setTaskSaveError("");
        setEditIdx(idx);
        setEditTitle(task.title);
        setEditStatus(task.status);
        setEditDescription(task.description || "");
        setEditDueDate(task.dueDate?.slice(0, 10) || "");
        setShowEditForm(true);
    }

    async function handleEditTask(e) {
        e.preventDefault();
        if (
            editIdx === null ||
            !editTitle.trim() ||
            !team ||
            savingTaskRef.current
        )
            return;
        const taskId = team.tasks[editIdx].id || team.tasks[editIdx]._id;
        savingTaskRef.current = true;
        setIsSavingTask(true);
        setTaskSaveError("");
        try {
            const res = await fetch(`/api/teams/${id}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: editTitle,
                    status: editStatus,
                    description: editDescription,
                    dueDate: editDueDate || null,
                }),
            });
            const updatedTask = await res.json();
            if (!res.ok) throw new Error(updatedTask.error || "Failed to update task");
            setTeam((prev) => {
                if (!prev) return prev;
                const updatedTasks = prev.tasks.map(task =>
                    (task.id || task._id) === taskId ? updatedTask : task,
                );
                return { ...prev, tasks: updatedTasks };
            });
            setShowEditForm(false);
            setEditIdx(null);
            setEditTitle("");
            setEditStatus(STAGES[0]);
            setEditDescription("");
            setEditDueDate("");
        } catch (err) {
            setTaskSaveError(err.message || "Couldn’t save this task. Please try again.");
        } finally {
            savingTaskRef.current = false;
            setIsSavingTask(false);
        }
    }

    async function handleDeleteTask() {
        if (editIdx === null || !team) return;
        try {
            const taskId = team.tasks[editIdx].id || team.tasks[editIdx]._id;
            const res = await fetch(`/api/teams/${id}/tasks/${taskId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete task");
            setTeam((prev) => {
                if (!prev) return prev;
                const updatedTasks = prev.tasks.filter(
                    (t) => (t.id || t._id) !== taskId,
                );
                return { ...prev, tasks: updatedTasks };
            });
            setShowEditForm(false);
            setEditIdx(null);
            setEditTitle("");
            setEditStatus(STAGES[0]);
            setEditDescription("");
            setEditDueDate("");
        } catch {
            throw new Error("Couldn’t delete this task. Please try again.");
        }
    }

    const toggleCollapse = (stage) => {
        setCollapsed((prev) => ({
            ...prev,
            [stage]: !prev[stage],
        }));
    };

    // Editing a field should not recalculate the board's search and grouping.
    const filteredTasks = useMemo(() => (team?.tasks || [])
        .map((task, idx) => ({ ...task, idx }))
        .filter(task => {
            const query = search.toLowerCase();
            return (filterStatus === "All" || task.status === filterStatus)
                && (task.title.toLowerCase().includes(query)
                    || (task.description || "").toLowerCase().includes(query));
        }), [team, search, filterStatus]);

    const tasksByStatus = useMemo(() => {
        const grouped = { "Not Started": [], "In Progress": [], Completed: [] };
        filteredTasks.forEach(task => {
            if (grouped[task.status]) grouped[task.status].push(task);
        });
        return grouped;
    }, [filteredTasks]);

    if (!loading && (error || !team)) notFound();

    const getOptionByValue = (val) => options.find((opt) => opt.value === val);

    return (
        <div className="dashboard-theme flex min-h-screen bg-canvas">
            <Sidebar />

            <main className={`${styles.mainFrame} ${styles.boardFrame}`}>
                <div className={styles.boardHeader}>
                    <PageHeader
                        title={team?.name || "Team board"}
                        parent={{ label: "Teams", href: "/teams" }}
                        actions={<>
                                <div className="relative group w-full min-w-0 sm:w-56">
                                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-subtle transition-colors">
                                        <MdSearch size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        aria-label="Search tasks"
                                        className="pl-11 pr-10 py-2.5 bg-panel border border-line rounded-xs text-sm focus:ring focus:ring-blue-100 outline-none w-full transition-colors"
                                        placeholder="Search tasks..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {search && (
                                        <button
                                            onClick={() => setSearch("")}
                                            aria-label="Clear search"
                                            className="absolute inset-y-0 right-3.5 flex items-center text-subtle hover:text-ink transition-colors cursor-pointer"
                                        >
                                            <RiCloseLine size={20} />
                                        </button>
                                    )}
                                </div>

                                <div className="w-full min-w-0 sm:w-40">
                                    <Select
                                        theme={selectTheme}
                                        instanceId="status-filter"
                                        aria-label="Filter tasks by status"
                                        options={filterOptions}
                                        value={filterOptions.find(opt => opt.value === filterStatus)}
                                        onChange={opt => setFilterStatus(opt.value)}
                                        className="text-sm"
                                        classNamePrefix="react-select"
                                        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                                        styles={{ option: selectOptionStyles,
                                            control: (base) => ({
                                                ...base,
                                                borderRadius: '0.125rem',
                                                minHeight: 42,
                                                borderColor: 'var(--app-border)',
                                                '&:hover': { borderColor: 'var(--app-focus)' },
                                                boxShadow: 'none',
                                            }),
                                            menuPortal: (base) => ({ ...base, zIndex: 9999 })
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={() => { setStatus(STAGES[0]); setShowAddForm(true); }}
                                    className="cursor-pointer flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xs bg-accent text-on-accent font-medium hover:bg-accent/90 transition-colors text-sm focus-visible:ring-2 focus-visible:ring-blue-300"
                                >
                                    <IoIosAdd size={24} />
                                    Create Task
                                </button>
                        </>}
                    />
                </div>

                {/* Scrollable Content Area */}
                <div className={styles.boardArea}>
                    <div className="w-full max-w-full mx-auto">
                        {loading ? (
                            <SkeletonBoard />
                        ) : (
                            <>
                                {search && (
                                    <div className="mb-4 flex flex-wrap items-center gap-3">
                                        <span className="text-sm text-muted flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-info"></span>
                                            {filteredTasks.length} {filteredTasks.length === 1 ? 'match' : 'matches'} found
                                        </span>
                                        <button
                                            onClick={() => setSearch("")}
                                            className="text-sm text-info hover:text-ink transition-colors flex items-center gap-1 cursor-pointer"
                                        >
                                            <RiCloseLine />
                                            Clear Search
                                        </button>
                                    </div>
                                )}

                                {search && filteredTasks.length === 0 && (
                                    <div className="max-w-sm rounded-md border border-line bg-panel px-5 py-8">
                                        <h2 className="text-sm font-medium text-ink">No matching tasks</h2>
                                        <p className="mt-1 text-sm text-muted">Try another search or change the status filter.</p>
                                    </div>
                                )}
                                <div className="grid min-w-0 grid-cols-[repeat(3,minmax(280px,1fr))] gap-4 items-start overflow-x-auto pb-2">
                                    {STAGES.filter(stage => search === "" || tasksByStatus[stage].length > 0).map(stage => (
                                        <div key={stage} className={styles.column}>
                                            <div className={styles.columnHeading}>
                                                <div className="flex items-center gap-2.5">
                                                    <span className={`flex items-center text-sm font-medium ${getStatusClasses(stage)}`}>
                                                        <span className={`w-2 h-2 rounded-full mr-2 ${getDotColor(stage)}`} />
                                                        {stage}
                                                    </span>
                                                    <span className="text-xs text-muted bg-raised px-2 py-0.5 rounded-md">
                                                        {tasksByStatus[stage].length}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => { setStatus(stage); setShowAddForm(true); }} aria-label={`Add task to ${stage}`} className="p-1 rounded-md hover:bg-raised transition-colors text-muted hover:text-ink cursor-pointer">
                                                        <IoIosAdd size={22} />
                                                    </button>
                                                    <button onClick={() => toggleCollapse(stage)} aria-label={`${collapsed[stage] ? 'Expand' : 'Collapse'} ${stage}`} aria-expanded={!collapsed[stage]} className="p-1 rounded-md hover:bg-raised transition-colors text-muted cursor-pointer">
                                                        {collapsed[stage] ? <HiChevronDown size={18} /> : <HiChevronUp size={18} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={collapsed[stage] ? "hidden" : "flex-1 min-w-0"}>
                                                <div className="p-3 flex flex-col gap-3 min-h-[200px]">
                                                    {tasksByStatus[stage].length === 0 ? (
                                                        <div className="flex flex-col items-center justify-center py-8 px-3 text-center">
                                                            <RiTaskLine className="text-subtle text-2xl mb-2" />
                                                            <p className="text-muted text-sm">No tasks in {stage}</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-3">
                                                            {tasksByStatus[stage].map(task => (
                                                                <button type="button" key={task.id || task._id} onClick={() => openEditModal(task.idx)} className={`group ${styles.taskCard}`} aria-label={`Edit ${task.title}`}>
                                                                    <div className="flex justify-between items-start gap-3">
                                                                        <span className="min-w-0 break-words font-medium text-ink leading-snug text-sm">
                                                                            {task.title}
                                                                        </span>
                                                                        <MdEdit className="text-subtle group-hover:text-ink transition-colors text-base shrink-0" />
                                                                    </div>
                                                                    {task.dueDate && (
                                                                        <div className={`mt-3 flex flex-wrap items-center gap-1.5 text-xs ${isTaskOverdue(task) ? "text-danger" : "text-muted"}`}>
                                                                            <RiCalendarLine aria-hidden="true" className="shrink-0" size={14} />
                                                                            <time dateTime={task.dueDate.slice(0, 10)}>Due {formatDueDate(task.dueDate)}</time>
                                                                            {isTaskOverdue(task) && <span className="rounded bg-danger-bg px-1.5 py-0.5 font-medium">Overdue</span>}
                                                                        </div>
                                                                    )}
                                                                    {task.description && (
                                                                        <span className="text-muted text-sm break-words line-clamp-3 leading-relaxed mt-2">
                                                                            {task.description}
                                                                        </span>
                                                                    )}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Modals */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-slate-900/30 flex items-center justify-center z-[70] p-4">
                        <form className="bg-panel rounded-md border border-line flex flex-col w-full min-w-0 max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto" onSubmit={handleAddTask}>
                            <div className="px-5 py-4 border-b border-line flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-ink">Create New Task</h2>
                                <button type="button" onClick={() => { setShowAddForm(false); setAddTaskError(""); }} aria-label="Close create task" className="text-muted hover:text-ink transition-colors"><RiCloseLine size={22} /></button>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="task-title" className="text-sm font-medium text-muted">Task Title</label>
                                    <input id="task-title" type="text" className="min-w-0 px-3 py-2 bg-panel border border-line rounded-md text-sm text-ink focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" placeholder="Enter title..." value={title} onChange={e => setTitle(e.target.value)} required />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="task-status" className="text-sm font-medium text-muted">Status</label>
                                    <Select
                                        theme={selectTheme} inputId="task-status" className="text-sm" options={options} value={getOptionByValue(status)} onChange={opt => setStatus(opt.value)} menuPortalTarget={typeof document !== 'undefined' ? document.body : null} styles={{ option: selectOptionStyles, control: (base) => ({ ...base, borderRadius: '0.5rem', borderColor: 'var(--app-border)', backgroundColor: 'var(--app-panel)' }), menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="task-due-date" className="text-sm font-medium text-muted">Due date <span className="font-normal text-subtle">(optional)</span></label>
                                    <input id="task-due-date" type="date" className="min-w-0 w-full px-3 py-2 bg-panel border border-line rounded-md text-sm text-ink focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="task-description" className="text-sm font-medium text-muted">Description <span className="font-normal text-subtle">(optional)</span></label>
                                    <textarea id="task-description" className="min-w-0 px-3 py-2 bg-panel border border-line rounded-md text-sm text-ink focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors min-h-[100px] resize-none" placeholder="Describe the task..." value={description} onChange={e => setDescription(e.target.value)} />
                                </div>
                            </div>
                            {addTaskError && (
                                <p role="alert" className="mx-5 mb-2 rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-xs text-danger">{addTaskError}</p>
                            )}
                            <div className="px-5 py-4 border-t border-line flex flex-wrap gap-3 justify-end">
                                <button type="button" className="px-4 py-2 rounded-md bg-panel border border-line text-muted font-medium hover:bg-raised transition-colors text-sm" onClick={() => { setShowAddForm(false); setAddTaskError(""); }}>Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded-md bg-accent text-on-accent font-medium hover:bg-accent/90 transition-colors text-sm">Create Task</button>
                            </div>
                        </form>
                    </div>
                )}

                {showEditForm && (
                    <div className="fixed inset-0 bg-slate-900/30 flex items-center justify-center z-[70] p-4">
                        <form className="bg-panel rounded-md border border-line flex flex-col w-full min-w-0 max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto" onSubmit={handleEditTask} aria-busy={isSavingTask}>
                            <fieldset disabled={isSavingTask} className="min-w-0 m-0 border-0 p-0">
                                <div className="px-5 py-4 border-b border-line flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-ink">Edit Task</h2>
                                    <button type="button" onClick={() => setDeleteTaskOpen(true)} aria-label="Delete task" className="p-2 rounded-md text-muted hover:text-danger transition-colors hover:bg-danger-bg"><MdDelete size={20} /></button>
                                </div>
                                <div className="p-5 flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="edit-task-title" className="text-sm font-medium text-muted">Task Title</label>
                                        <input id="edit-task-title" type="text" className="min-w-0 px-3 py-2 bg-panel border border-line rounded-md text-sm text-ink focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="edit-task-status" className="text-sm font-medium text-muted">Status</label>
                                        <Select
                                            theme={selectTheme} isDisabled={isSavingTask} inputId="edit-task-status" className="text-sm" options={options} value={getOptionByValue(editStatus)} onChange={opt => setEditStatus(opt.value)} menuPortalTarget={typeof document !== 'undefined' ? document.body : null} styles={{ option: selectOptionStyles, control: (base) => ({ ...base, borderRadius: '0.5rem', borderColor: 'var(--app-border)', backgroundColor: 'var(--app-panel)' }), menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="edit-task-due-date" className="text-sm font-medium text-muted">Due date <span className="font-normal text-subtle">(optional)</span></label>
                                        <input id="edit-task-due-date" type="date" className="min-w-0 w-full px-3 py-2 bg-panel border border-line rounded-md text-sm text-ink focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" value={editDueDate} onChange={e => setEditDueDate(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="edit-task-description" className="text-sm font-medium text-muted">Description <span className="font-normal text-subtle">(optional)</span></label>
                                        <textarea id="edit-task-description" className="min-w-0 px-3 py-2 bg-panel border border-line rounded-md text-sm text-ink focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors min-h-[100px] resize-none" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                                    </div>
                                </div>
                                {taskSaveError && <p role="alert" className="mx-5 mb-4 rounded-md border border-danger-border bg-danger-bg px-3 py-2 text-xs text-danger">{taskSaveError}</p>}
                                <div className="px-5 py-4 border-t border-line flex flex-wrap gap-3 justify-end">
                                    <button type="button" className="px-4 py-2 rounded-md bg-panel border border-line text-muted font-medium hover:bg-raised transition-colors text-sm" onClick={() => { setShowEditForm(false); setTaskSaveError(""); }}>Cancel</button>
                                    <button type="submit" className="px-4 py-2 rounded-md bg-accent text-on-accent font-medium hover:bg-accent/90 transition-colors text-sm">{isSavingTask ? <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-4 w-4 rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin" />Saving…</span> : "Save Changes"}</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )}
                <ConfirmModal
                    open={deleteTaskOpen}
                    title="Delete task?"
                    description={`Permanently delete “${team?.tasks[editIdx]?.title || "this task"}”? This action cannot be undone.`}
                    confirmLabel="Delete task"
                    pendingLabel="Deleting…"
                    destructive
                    onConfirm={handleDeleteTask}
                    onClose={() => setDeleteTaskOpen(false)}
                />
            </main>
        </div>
    );
}
