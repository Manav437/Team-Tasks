"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoIosAdd } from "react-icons/io";
import { MdSearch, MdEdit, MdDelete, MdArrowForward } from "react-icons/md";
import { HiChevronLeft, HiChevronDown, HiChevronUp, HiDotsVertical } from "react-icons/hi";
import { RiTaskLine, RiCloseLine, RiGeminiFill } from "react-icons/ri";
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
function getColumnBg(status) {
    if (status === "Not Started") return "bg-slate-50/50";
    if (status === "In Progress") return "bg-blue-50/50";
    if (status === "Completed") return "bg-emerald-50/50";
    return "";
}
function getColumnHeaderBg(status) {
    if (status === "Not Started") return "bg-slate-100";
    if (status === "In Progress") return "bg-blue-100/80";
    if (status === "Completed") return "bg-emerald-100/80";
    return "";
}

const filterOptions = [
    {
        value: "All",
        label: (
            <span className="flex items-center">
                <span className="inline-block w-2 h-4 mr-1 align-middle bg-gray-300 rounded" />
                All Status
            </span>
        ),
    },
    ...STAGES.map((s) => ({
        value: s,
        label: (
            <span className="flex items-center">
                <span
                    className={`inline-block w-2 h-4 mr-1 align-middle rounded ${getDotColor(s)}`}
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
                className={`inline-block rounded w-2 h-4 mr-1 align-middle ${getDotColor(s)}`}
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
        <div className="flex min-h-screen bg-[#f8fafc] overflow-hidden">
            <Sidebar />

            <main className="flex-1 h-screen flex flex-col overflow-hidden">
                {/* Fixed Header Section */}
                <div className="pt-24 md:pt-10 px-4 sm:px-8 shrink-0">
                    <div className="w-full max-w-full mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/teams"
                                    className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50/50 transition-all shadow-sm active:scale-90"
                                    title="Back to Teams"
                                >
                                    <HiChevronLeft className="text-2xl" />
                                </Link>
                                <div>
                                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
                                        Board: {team?.name}
                                    </h1>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                        <Link href="/teams" className="hover:text-slate-600 transition-colors underline-offset-4 hover:underline">Teams</Link>
                                        <span>/</span>
                                        <span className="text-blue-600 font-semibold">{team?.name}</span>
                                    </div>
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
                                        placeholder="Search tasks..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {search && (
                                        <button
                                            onClick={() => setSearch("")}
                                            className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                                        >
                                            <RiCloseLine size={20} />
                                        </button>
                                    )}
                                </div>

                                <div className="min-w-[180px]">
                                    <Select
                                        instanceId="status-filter"
                                        options={filterOptions}
                                        value={filterOptions.find(opt => opt.value === filterStatus)}
                                        onChange={opt => setFilterStatus(opt.value)}
                                        className="text-sm"
                                        classNamePrefix="react-select"
                                        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                borderRadius: '0.75rem',
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
                                    className="cursor-pointer flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-[50px] [corner-shape:squircle] bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95 text-sm"
                                >
                                    <IoIosAdd size={24} />
                                    Create Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-8 pb-12 custom-scrollbar">
                    <div className="w-full max-w-full mx-auto">
                        {loading ? (
                            <SkeletonBoard />
                        ) : (
                            <>
                                {search && (
                                    <div className="mb-8 flex items-center gap-3 animate-fade-in translate-y-[-12px]">
                                        <span className="text-xs font-black tracking-wider uppercase text-slate-400 bg-white border border-slate-200/50 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                            {filteredTasks.length} {filteredTasks.length === 1 ? 'match' : 'matches'} found
                                        </span>
                                        <button
                                            onClick={() => setSearch("")}
                                            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group cursor-pointer"
                                        >
                                            <RiCloseLine className="group-hover:rotate-90 transition-transform" />
                                            Clear Search
                                        </button>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                                    {STAGES.filter(stage => search === "" || tasksByStatus[stage].length > 0).map(stage => (
                                        <div key={stage} className={`flex flex-col w-full rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm transition-all animate-fade-in ${getColumnBg(stage)}`}>
                                            <div className={`p-4 flex items-center justify-between border-b border-slate-200/50 ${getColumnHeaderBg(stage)}`}>
                                                <div className="flex items-center gap-2.5">
                                                    <span className={`flex items-center px-2.5 py-1 rounded-lg text-xs font-black tracking-wider uppercase ${getStatusClasses(stage)} bg-white/60 shadow-sm border border-slate-100`}>
                                                        <span className={`w-2 h-2 rounded-full mr-2 ${getDotColor(stage)}`} />
                                                        {stage}
                                                    </span>
                                                    <span className="text-xs font-bold text-slate-400 bg-white/40 px-2 py-0.5 rounded-md">
                                                        {tasksByStatus[stage].length}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => { setStatus(stage); setShowAddForm(true); }} className="p-1.5 rounded-lg hover:bg-white/80 transition-colors text-slate-500 hover:text-blue-600 cursor-pointer">
                                                        <IoIosAdd size={22} />
                                                    </button>
                                                    <button onClick={() => toggleCollapse(stage)} className="p-1.5 rounded-lg hover:bg-white/80 transition-colors text-slate-400 hover:text-slate-600 cursor-pointer">
                                                        {collapsed[stage] ? <HiChevronDown size={18} /> : <HiChevronUp size={18} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={`flex-1 transition-all duration-300 ease-in-out ${collapsed[stage] ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"}`}>
                                                <div className="p-3 flex flex-col gap-3 min-h-[200px]">
                                                    {tasksByStatus[stage].length === 0 ? (
                                                        <div className="flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                                                            <RiTaskLine className="text-slate-300 text-3xl mb-2" />
                                                            <p className="text-slate-400 text-xs font-medium italic">No tasks in {stage}</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-3">
                                                            {tasksByStatus[stage].map(task => (
                                                                <div key={task.id || task._id} onClick={() => openEditModal(task.idx)} className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer relative hover:-translate-y-1 duration-300">
                                                                    <div className="flex justify-between items-start mb-3">
                                                                        <h3 className="font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors text-lg">
                                                                            {task.title}
                                                                        </h3>
                                                                        <MdEdit className="text-slate-300 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all text-xl shrink-0" />
                                                                    </div>
                                                                    {task.description && (
                                                                        <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-4">
                                                                            {task.description}
                                                                        </p>
                                                                    )}
                                                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                                                        <div className="flex items-center gap-1.5 text-[10px] font-black tracking-wider text-slate-300 group-hover:text-blue-400 transition-colors">
                                                                            <HiDotsVertical />
                                                                            <span>DETAILS</span>
                                                                        </div>
                                                                        <MdArrowForward className="text-slate-200 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                                                    </div>
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
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                        <form className="bg-white rounded-3xl shadow-2xl flex flex-col w-full max-w-md overflow-hidden modal-animate-in" onSubmit={handleAddTask}>
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Create New Task</h2>
                                <button type="button" onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><RiCloseLine size={24} /></button>
                            </div>
                            <div className="p-6 flex flex-col gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Task Title</label>
                                    <input type="text" className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" placeholder="Enter title..." value={title} onChange={e => setTitle(e.target.value)} required />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Status</label>
                                    <Select options={options} value={getOptionByValue(status)} onChange={opt => setStatus(opt.value)} menuPortalTarget={typeof document !== 'undefined' ? document.body : null} styles={{ control: (base) => ({ ...base, borderRadius: '0.75rem', borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }), menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                                    <textarea className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all min-h-[120px] resize-none" placeholder="Describe the task..." value={description} onChange={e => setDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
                                <button type="button" className="px-5 py-2 rounded-[50px] [corner-shape:squircle] bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-all text-sm" onClick={() => setShowAddForm(false)}>Cancel</button>
                                <button type="submit" className="px-6 py-2 rounded-[50px] [corner-shape:squircle] bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 text-sm">Create Task</button>
                            </div>
                        </form>
                    </div>
                )}

                {showEditForm && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                        <form className="bg-white rounded-3xl shadow-2xl flex flex-col w-full max-w-md overflow-hidden modal-animate-in" onSubmit={handleEditTask}>
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Edit Task</h2>
                                </div>
                                <button type="button" onClick={handleDeleteTask} className="p-2 rounded-lg text-slate-400 hover:text-red-500 transition-all hover:bg-red-50"><MdDelete size={22} /></button>
                            </div>
                            <div className="p-6 flex flex-col gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Task Title</label>
                                    <input type="text" className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Status</label>
                                    <Select options={options} value={getOptionByValue(editStatus)} onChange={opt => setEditStatus(opt.value)} menuPortalTarget={typeof document !== 'undefined' ? document.body : null} styles={{ control: (base) => ({ ...base, borderRadius: '0.75rem', borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }), menuPortal: base => ({ ...base, zIndex: 9999 }) }} />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                                    <textarea className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all min-h-[120px] resize-none" value={editDescription} onChange={e => setEditDescription(e.target.value)} required />
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
                                <button type="button" className="px-5 py-2 rounded-[50px] [corner-shape:squircle] bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-all text-sm" onClick={() => setShowEditForm(false)}>Cancel</button>
                                <button type="submit" className="px-6 py-2 rounded-[50px] [corner-shape:squircle] bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 text-sm">Save Changes</button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
