// TeamPage.js
"use client";
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import Link from "next/link";
import { notFound } from "next/navigation";

const STAGES = ["Not Started", "In Progress", "Completed"];

function getStatusClasses(status) {
    if (status === "Not Started") return "text-gray-700";
    if (status === "In Progress") return "text-yellow-800";
    if (status === "Completed") return "text-green-800";
    return "";
}
function getDotColor(status) {
    if (status === "Not Started") return "bg-gray-400";
    if (status === "In Progress") return "bg-yellow-400";
    if (status === "Completed") return "bg-green-500";
    return "";
}

const filterOptions = [
    { value: "All", label: <span className="flex items-center"><span className="inline-block w-2 h-4 mr-1 align-middle bg-gray-300 rounded" />All Status</span> },
    ...STAGES.map(s => ({
        value: s,
        label: (
            <span className="flex items-center">
                <span className={`inline-block w-2 h-4 mr-1 align-middle rounded ${getDotColor(s)}`} />
                {s}
            </span>
        )
    }))
];

const options = STAGES.map(s => ({
    value: s,
    label: (
        <span className="flex items-center">
            <span className={`inline-block rounded w-2 h-4 mr-1 align-middle ${getDotColor(s)}`} />
            {s}
        </span>
    )
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
        "Completed": false,
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
        if (!title.trim() || !description.trim()) return;
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
                    : prev
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
        if (editIdx === null || !editTitle.trim() || !editDescription.trim() || !team) return;
        try {
            const taskId = team.tasks[editIdx].id || team.tasks[editIdx]._id;
            const res = await fetch(`/api/teams/${id}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: editTitle, status: editStatus, description: editDescription }),
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
            "Are you sure you want to delete the task?\nThis action cannot be undone."
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
        setCollapsed(prev => ({
            ...prev,
            [stage]: !prev[stage]
        }));
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center min-h-screen bg-gray-50 justify-center">
                <div className="loader1 mb-4"></div>
                <div className="text-lg text-gray-600">Loading tasks...</div>
            </div>
        );
    }

    if (error || !team) {
        notFound();
    }


    let filteredTasks = (team.tasks || []).filter((task) => {
        const matchesStatus = filterStatus === "All" || task.status === filterStatus;
        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            (task.description || "").toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });


    const tasksByStatus = {
        "Not Started": [],
        "In Progress": [],
        "Completed": [],
    };

    filteredTasks.forEach((task, idx) => {
        if (tasksByStatus[task.status]) {
            // Find the original index in team.tasks for editing
            const origIdx = team.tasks.findIndex(
                t => (t.id || t._id) === (task.id || task._id)
            );
            tasksByStatus[task.status].push({ ...task, idx: origIdx });
        }
    });


    const getOptionByValue = (val) => options.find(opt => opt.value === val);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-300 py-4 px-2">
            <div className="w-full max-w-6xl mx-auto">
                <div className="w-full max-w-6xl mx-auto mb-4">
                    <div className="flex items-center justify-between">

                        <Link
                            href="/teams"
                            className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition shadow"
                        >
                            ←
                        </Link>

                        <h1 className="flex-1 text-black text-2xl font-bold text-center">
                            Team : <span className="text-slate-700 underline underline-offset-2">{team.name}</span>
                        </h1>

                        <div className="w-[48px]" />
                    </div>
                </div>

                <div className="flex flex-row sm:flex-row gap-2 sm:gap-4 justify-between items-center mb-4">
                    <input
                        type="text"
                        className="focus:outline-none focus:border-slate-400 border-1 border-slate-300 rounded px-3 py-1.5 w-1/2 sm:w-1/3"
                        placeholder="Search tasks / description"
                        value={search}
                        onChange={e => {
                            const value = e.target.value;
                            setSearch(value);
                            if (value.trim() !== '') {
                                setCollapsed(true);
                            }
                        }}
                    />

                    <Select
                        options={filterOptions}
                        value={filterOptions.find(opt => opt.value === filterStatus)}
                        onChange={opt => setFilterStatus(opt.value)}
                        isSearchable
                        className="rounded caret-transparent w-1/2 sm:w-1/3"
                        classNamePrefix="react-select"
                    />
                </div>
            </div>

            <div className="w-full max-w-6xl flex flex-col md:flex-row items-start gap-4 justify-center">
                {STAGES.map((stage) => (
                    <div key={stage} className="flex-1 flex flex-col gap-2 w-full md:min-w-[250px]">
                        <div className="flex items-center justify-between rounded-t-sm py-1 bg-slate-200">
                            <span className={`flex items-center w-fit justify-between pl-2 py-1 rounded text-xs ${getStatusClasses(stage)}`}>
                                <span className={`inline-block rounded w-2 h-4 mr-1 align-middle ${getDotColor(stage)}`} />
                                {stage}
                                <span className="ml-2 text-xs text-gray-500 font-semibold">
                                    ({tasksByStatus[stage].length})
                                </span>
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    aria-label={collapsed[stage] ? "Expand" : "Collapse"}
                                    onClick={() => toggleCollapse(stage)}
                                    className="cursor-pointer p-1 rounded hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <svg
                                        className={`transition-transform duration-200 ${collapsed[stage] ? "rotate-180" : "rotate-0"}`}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M6 8L10 12L14 8" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    aria-label={`Add task to ${stage}`}
                                    onClick={() => {
                                        setStatus(stage);
                                        setShowAddForm(true);
                                    }}
                                    className="p-1 mr-1 cursor-pointer rounded hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 5v14M5 12h14"
                                            stroke="#555"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div
                            className={`rounded-b-sm bg-slate-200 overflow-hidden transition-all duration-300 ${collapsed[stage] ? "max-h-0 p-0" : "min-h-36.5 pt-2"}`}
                            style={{
                                maxHeight: collapsed[stage] ? 0 : 1000, // Large enough for most lists
                                paddingTop: collapsed[stage] ? 0 : undefined,
                                paddingBottom: collapsed[stage] ? 0 : undefined,
                            }}
                        >
                            {!collapsed[stage] && (
                                <>
                                    {tasksByStatus[stage].length === 0 && (
                                        <div className="text-gray-400 text-center rounded-md p-1 bg-gray-100 mx-auto w-19/20 text-sm px-2 h-full">No tasks</div>
                                    )}
                                    <ul>
                                        {tasksByStatus[stage].map((task, i) => (
                                            <li
                                                key={task.id || task._id || i}
                                                className="flex mx-auto w-19/20 flex-col px-2 py-2 bg-slate-100 rounded shadow mb-2 cursor-pointer transition hover:bg-blue-50"
                                                onClick={() => openEditModal(task.idx)}
                                            >
                                                <div className="flex items-center justify-between border-b border-slate-300">
                                                    <span className="font-medium">{task.title}</span>
                                                    <span className="hover:underline text-xs text-gray-400 hover:text-gray-600">Edit</span>
                                                </div>
                                                {task.description && (
                                                    <div className="text-xs ml-1 text-gray-500 mt-1">{task.description}</div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* modal add task */}
            {showAddForm && (
                <div className="fixed inset-0 bg-gray-400/40 bg-opacity-30 flex items-center justify-center z-50">
                    <form
                        className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 w-[90vw] max-w-md"
                        onSubmit={handleAddTask}
                    >
                        <h2 className="text-lg font-bold">Add Task</h2>
                        <input
                            type="text"
                            className="focus:outline-0 focus:border-slate-400 border-1 border-slate-300 rounded px-2 py-1"
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <Select className="caret-transparent"
                            options={options}
                            value={getOptionByValue(status)}
                            onChange={opt => setStatus(opt.value)}
                            classNamePrefix="react-select"
                        />
                        <textarea
                            className="focus:outline-0 min-h-25 max-h-50 focus:border-slate-400 border-1 border-slate-300 rounded px-2 py-1"
                            placeholder="Task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                className="cursor-pointer px-3 py-1 rounded bg-gray-200"
                                onClick={() => setShowAddForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="cursor-pointer px-3 py-1 rounded bg-blue-600 text-white"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* modal edit task */}
            {showEditForm && (
                <div className="fixed inset-0 bg-gray-400/40 bg-opacity-30 flex items-center justify-center z-50">
                    <form
                        className="bg-white p-6 rounded shadow-md flex flex-col gap-4 w-[90vw] max-w-md"
                        onSubmit={handleEditTask}
                    >
                        <h2 className="text-lg font-bold">Edit Task</h2>
                        <input
                            type="text"
                            className="focus:outline-none border-1 border-slate-300 focus:border-slate-400 rounded px-2 py-1"
                            placeholder="Task title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                        />
                        <Select className="focus:outline-none caret-transparent"
                            options={options}
                            value={getOptionByValue(editStatus)}
                            onChange={opt => setEditStatus(opt.value)}
                            classNamePrefix="react-select"
                        />
                        <textarea
                            className="focus:outline-none min-h-25 max-h-50 border-1 border-slate-300 focus:border-slate-400 rounded px-2 py-1"
                            placeholder="Task description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            required
                        />
                        <div className="flex gap-2 justify-between">
                            <button
                                type="button"
                                className="cursor-pointer px-3 py-1 rounded bg-red-500 text-white"
                                onClick={handleDeleteTask}
                            >
                                Delete
                            </button>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="cursor-pointer px-3 py-1 rounded bg-gray-200"
                                    onClick={() => setShowEditForm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="cursor-pointer px-3 py-1 rounded bg-blue-600 text-white"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
