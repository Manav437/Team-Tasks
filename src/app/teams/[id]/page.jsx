"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoIosAdd } from "react-icons/io";
import { MdSearch, MdEdit, MdDelete } from "react-icons/md";
import { HiChevronLeft, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { RiTaskLine, RiCloseLine } from "react-icons/ri";
import { Sidebar } from "../../../components/Sidebar";
import { SkeletonBoard } from "../../../components/loading-state";

const STAGES = ["Not Started", "In Progress", "Completed"];

function getStatusClasses(status) {
    if (status === "Not Started") return "text-slate-600";
    if (status === "In Progress") return "text-blue-600";
    if (status === "Completed") return "text-emerald-600";
    return "";
}
function getDotColor(status) {
    if (status === "Not Started") return "bg-slate-400";
    if (status === "In Progress") return "bg-blue-500";
    if (status === "Completed") return "bg-emerald-500";
    return "";
}

const filterOptions = [
    {
        value: "All",
        label: (
            <span className="flex items-center">
                <span className="inline-block w-2 h-2 mr-2 shrink-0 bg-slate-400 rounded-full" />
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

    // Edit Task Modal State
    const [showEditForm, setShowEditForm] = useState(false);
    const [editIdx, setEditIdx] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editStatus, setEditStatus] = useState(STAGES[0]);
    const [editDescription, setEditDescription] = useState("");

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
        try {
            const res = await fetch(`/api/teams/${id}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, status, description }),
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
            setShowAddForm(false);
        } catch (err) {
            alert("Failed to add task");
        }
    }

    function openEditModal(idx) {
        if (!team || !team.tasks[idx]) return;
        const task = team.tasks[idx];
        setEditIdx(idx);
        setEditTitle(task.title);
        setEditStatus(task.status);
        setEditDescription(task.description || "");
        setShowEditForm(true);
    }

    async function handleEditTask(e) {
        e.preventDefault();
        if (
            editIdx === null ||
            !editTitle.trim() ||
            !team
        )
            return;
        try {
            const taskId = team.tasks[editIdx].id || team.tasks[editIdx]._id;
            const res = await fetch(`/api/teams/${id}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: editTitle,
                    status: editStatus,
                    description: editDescription,
                }),
            });
            if (!res.ok) throw new Error("Failed to update task");
            const updatedTask = await res.json();
            setTeam((prev) => {
                if (!prev) return prev;
                const updatedTasks = [...prev.tasks];
                updatedTasks[editIdx] = updatedTask;
                return { ...prev, tasks: updatedTasks };
            });
            setShowEditForm(false);
            setEditIdx(null);
            setEditTitle("");
            setEditStatus(STAGES[0]);
            setEditDescription("");
        } catch (err) {
            alert("Failed to edit task");
        }
    }

    async function handleDeleteTask() {
        if (editIdx === null || !team) return;
        const confirmed = window.confirm(
            "Are you sure you want to delete the task?\nThis action cannot be undone.",
        );
        if (!confirmed) return;
        try {
            const taskId = team.tasks[editIdx].id || team.tasks[editIdx]._id;
            const res = await fetch(`/api/teams/${id}/tasks/${taskId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete task");
            setTeam((prev) => {
                if (!prev) return prev;
                const updatedTasks = [...prev.tasks];
                updatedTasks.splice(editIdx, 1);
                return { ...prev, tasks: updatedTasks };
            });
            setShowEditForm(false);
            setEditIdx(null);
            setEditTitle("");
            setEditStatus(STAGES[0]);
            setEditDescription("");
        } catch (err) {
            alert("Failed to delete task");
        }
    }

    const toggleCollapse = (stage) => {
        setCollapsed((prev) => ({
            ...prev,
            [stage]: !prev[stage],
        }));
    };

    // Full-page loader removed to allow shell visibility

    // Only redirect to 404 if loading is complete and no team was found
    if (!loading && (error || !team)) {
        notFound();
    }

    let filteredTasks = team ? (team.tasks || []).filter((task) => {
        const matchesStatus =
            filterStatus === "All" || task.status === filterStatus;
        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            (task.description || "")
                .toLowerCase()
                .includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    }) : [];

    const tasksByStatus = {
        "Not Started": [],
        "In Progress": [],
        Completed: [],
    };

    if (team) {
        filteredTasks.forEach((task) => {
            if (tasksByStatus[task.status]) {
                const origIdx = team.tasks.findIndex(
                    (t) => (t.id || t._id) === (task.id || task._id),
                );
                tasksByStatus[task.status].push({ ...task, idx: origIdx });
            }
        });
    }

    const getOptionByValue = (val) => options.find((opt) => opt.value === val);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="min-w-0 flex-1 h-dvh flex flex-col overflow-hidden">
                {/* Fixed Header Section */}
                <div className="pt-24 md:pt-8 px-4 sm:px-6 shrink-0">
                    <div className="w-full max-w-full mx-auto">
                        <div className="flex min-w-0 flex-col xl:flex-row xl:items-center justify-between gap-5 mb-6">
                            <div className="flex min-w-0 items-center gap-3">
                                <Link
                                    href="/teams"
                                    className="flex shrink-0 items-center justify-center w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                                    title="Back to Teams"
                                >
                                    <HiChevronLeft className="text-xl" />
                                </Link>
                                <div className="min-w-0">
                                    <h1 className="text-2xl font-semibold text-slate-900 break-words mb-1">
                                        Board: {team?.name}
                                    </h1>
                                    <div className="flex min-w-0 items-center gap-2 text-slate-500 text-sm">
                                        <Link href="/teams" className="hover:text-slate-600 transition-colors underline-offset-4 hover:underline">Teams</Link>
                                        <span>/</span>
                                        <span className="truncate text-slate-600">{team?.name}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex min-w-0 flex-wrap items-center gap-3">
                                <div className="relative group w-full min-w-0 sm:w-60">
                                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <MdSearch size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        aria-label="Search tasks"
                                        className="pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none w-full transition-colors"
                                        placeholder="Search tasks..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {search && (
                                        <button
                                            onClick={() => setSearch("")}
                                            aria-label="Clear search"
                                            className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                                        >
                                            <RiCloseLine size={20} />
                                        </button>
                                    )}
                                </div>

                                <div className="w-full min-w-0 sm:w-44">
                                    <Select
                                        instanceId="status-filter"
                                        aria-label="Filter tasks by status"
                                        options={filterOptions}
                                        value={filterOptions.find(opt => opt.value === filterStatus)}
                                        onChange={opt => setFilterStatus(opt.value)}
                                        className="text-sm"
                                        classNamePrefix="react-select"
                                        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                borderRadius: '0.5rem',
                                                borderColor: '#e2e8f0',
                                                '&:hover': { borderColor: '#2563eb' },
                                                boxShadow: 'none',
                                            }),
                                            menuPortal: (base) => ({ ...base, zIndex: 9999 })
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={() => { setStatus(STAGES[0]); setShowAddForm(true); }}
                                    className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm"
                                >
                                    <IoIosAdd size={24} />
                                    Create Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 sm:px-6 pb-8">
                    <div className="w-full max-w-full mx-auto">
                        {loading ? (
                            <SkeletonBoard />
                        ) : (
                            <>
                                {search && (
                                    <div className="mb-4 flex flex-wrap items-center gap-3">
                                        <span className="text-sm text-slate-500 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                            {filteredTasks.length} {filteredTasks.length === 1 ? 'match' : 'matches'} found
                                        </span>
                                        <button
                                            onClick={() => setSearch("")}
                                            className="text-sm text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                                        >
                                            <RiCloseLine />
                                            Clear Search
                                        </button>
                                    </div>
                                )}

                                {search && filteredTasks.length === 0 && (
                                    <div className="max-w-sm rounded-xl border border-slate-200 bg-white px-5 py-8">
                                        <h2 className="text-sm font-medium text-slate-800">No matching tasks</h2>
                                        <p className="mt-1 text-sm text-slate-500">Try another search or change the status filter.</p>
                                    </div>
                                )}
                                <div className="grid min-w-0 grid-cols-[repeat(3,minmax(280px,1fr))] gap-4 items-start overflow-x-auto pb-2">
                                    {STAGES.filter(stage => search === "" || tasksByStatus[stage].length > 0).map(stage => (
                                        <div key={stage} className="flex min-w-0 flex-col w-full rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                                            <div className="p-3 flex items-center justify-between gap-2 border-b border-slate-200 bg-white">
                                                <div className="flex items-center gap-2.5">
                                                    <span className={`flex items-center text-sm font-medium ${getStatusClasses(stage)}`}>
                                                        <span className={`w-2 h-2 rounded-full mr-2 ${getDotColor(stage)}`} />
                                                        {stage}
                                                    </span>
                                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                                        {tasksByStatus[stage].length}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => { setStatus(stage); setShowAddForm(true); }} aria-label={`Add task to ${stage}`} className="p-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-blue-600 cursor-pointer">
                                                        <IoIosAdd size={22} />
                                                    </button>
                                                    <button onClick={() => toggleCollapse(stage)} aria-label={`${collapsed[stage] ? 'Expand' : 'Collapse'} ${stage}`} aria-expanded={!collapsed[stage]} className="p-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 cursor-pointer">
                                                        {collapsed[stage] ? <HiChevronDown size={18} /> : <HiChevronUp size={18} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={collapsed[stage] ? "hidden" : "flex-1 min-w-0"}>
                                                <div className="p-3 flex flex-col gap-3 min-h-[200px]">
                                                    {tasksByStatus[stage].length === 0 ? (
                                                        <div className="flex flex-col items-center justify-center py-8 px-3 text-center">
                                                            <RiTaskLine className="text-slate-400 text-2xl mb-2" />
                                                            <p className="text-slate-500 text-sm">No tasks in {stage}</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-3">
                                                            {tasksByStatus[stage].map(task => (
                                                                <div key={task.id || task._id} onClick={() => openEditModal(task.idx)} className="group min-w-0 bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer">
                                                                    <div className="flex justify-between items-start gap-3">
                                                                        <h3 className="min-w-0 break-words font-medium text-slate-800 leading-snug text-sm">
                                                                            {task.title}
                                                                        </h3>
                                                                        <MdEdit className="text-slate-400 group-hover:text-blue-600 transition-colors text-base shrink-0" />
                                                                    </div>
                                                                    {task.description && (
                                                                        <p className="text-slate-500 text-sm break-words line-clamp-3 leading-relaxed mt-2">
                                                                            {task.description}
                                                                        </p>
                                                                    )}
                                                                </div>
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
                        <form className="bg-white rounded-xl border border-slate-200 flex flex-col w-full min-w-0 max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto" onSubmit={handleAddTask}>
                            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-900">Create New Task</h2>
                                <button type="button" onClick={() => setShowAddForm(false)} aria-label="Close create task" className="text-slate-500 hover:text-slate-700 transition-colors"><RiCloseLine size={22} /></button>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="task-title" className="text-sm font-medium text-slate-600">Task Title</label>
                                    <input id="task-title" type="text" className="min-w-0 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" placeholder="Enter title..." value={title} onChange={e => setTitle(e.target.value)} required />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="task-status" className="text-sm font-medium text-slate-600">Status</label>
                                    <Select inputId="task-status" className="text-sm" options={options} value={getOptionByValue(status)} onChange={opt => setStatus(opt.value)} menuPortalTarget={typeof document !== 'undefined' ? document.body : null} styles={{ control: (base) => ({ ...base, borderRadius: '0.5rem', borderColor: '#e2e8f0', backgroundColor: '#ffffff' }), menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="task-description" className="text-sm font-medium text-slate-600">Description</label>
                                    <textarea id="task-description" className="min-w-0 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors min-h-[100px] resize-none" placeholder="Describe the task..." value={description} onChange={e => setDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className="px-5 py-4 border-t border-slate-200 flex flex-wrap gap-3 justify-end">
                                <button type="button" className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm" onClick={() => setShowAddForm(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm">Create Task</button>
                            </div>
                        </form>
                    </div>
                )}

                {showEditForm && (
                    <div className="fixed inset-0 bg-slate-900/30 flex items-center justify-center z-[70] p-4">
                        <form className="bg-white rounded-xl border border-slate-200 flex flex-col w-full min-w-0 max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto" onSubmit={handleEditTask}>
                            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-900">Edit Task</h2>
                                <button type="button" onClick={handleDeleteTask} aria-label="Delete task" className="p-2 rounded-lg text-slate-500 hover:text-red-600 transition-colors hover:bg-red-50"><MdDelete size={20} /></button>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="edit-task-title" className="text-sm font-medium text-slate-600">Task Title</label>
                                    <input id="edit-task-title" type="text" className="min-w-0 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors" value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="edit-task-status" className="text-sm font-medium text-slate-600">Status</label>
                                    <Select inputId="edit-task-status" className="text-sm" options={options} value={getOptionByValue(editStatus)} onChange={opt => setEditStatus(opt.value)} menuPortalTarget={typeof document !== 'undefined' ? document.body : null} styles={{ control: (base) => ({ ...base, borderRadius: '0.5rem', borderColor: '#e2e8f0', backgroundColor: '#ffffff' }), menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="edit-task-description" className="text-sm font-medium text-slate-600">Description</label>
                                    <textarea id="edit-task-description" className="min-w-0 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-colors min-h-[100px] resize-none" value={editDescription} onChange={e => setEditDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className="px-5 py-4 border-t border-slate-200 flex flex-wrap gap-3 justify-end">
                                <button type="button" className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm" onClick={() => setShowEditForm(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm">Save Changes</button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
