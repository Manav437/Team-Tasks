"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const STAGES = ["Not Started", "In Progress", "Completed"];

export default function TeamPage({ params }) {
    const unwrappedParams = React.use(params);
    const id = unwrappedParams.id;

    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Add Task Modal State
    const [showAddForm, setShowAddForm] = useState(false);
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(STAGES[0]);

    // Edit Task Modal State
    const [showEditForm, setShowEditForm] = useState(false);
    const [editIdx, setEditIdx] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editStatus, setEditStatus] = useState(STAGES[0]);

    function getStatusClasses(status) {
        if (status === "Not Started") return "text-gray-700 bg-gray-100";
        if (status === "In Progress") return "text-yellow-800 bg-yellow-100";
        if (status === "Completed") return "text-green-800 bg-green-100";
        return "";
    }
    function getDotColor(status) {
        if (status === "Not Started") return "bg-gray-400";
        if (status === "In Progress") return "bg-yellow-400";
        if (status === "Completed") return "bg-green-500";
        return "";
    }

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
                body: JSON.stringify({ title, status }),
            });
            if (!res.ok) throw new Error("Failed to add task");
            const newTask = await res.json();
            setTeam((prev) => ({
                ...prev,
                tasks: [...(prev.tasks ?? []), newTask],
            }));
            setTitle("");
            setStatus(STAGES[0]);
            setShowAddForm(false);
        } catch (err) {
            alert("Failed to add task");
        }
    }

    function openEditModal(idx) {
        const task = team.tasks[idx];
        setEditIdx(idx);
        setEditTitle(task.title);
        setEditStatus(task.status);
        setShowEditForm(true);
    }

    async function handleEditTask(e) {
        e.preventDefault();
        if (editIdx === null || !editTitle.trim()) return;
        try {
            const taskId = team.tasks[editIdx].id || team.tasks[editIdx]._id;
            const res = await fetch(`/api/teams/${id}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: editTitle, status: editStatus }),
            });
            if (!res.ok) throw new Error("Failed to update task");
            const updatedTask = await res.json();
            setTeam((prev) => {
                const updatedTasks = [...prev.tasks];
                updatedTasks[editIdx] = updatedTask;
                return { ...prev, tasks: updatedTasks };
            });
            setShowEditForm(false);
            setEditIdx(null);
            setEditTitle("");
            setEditStatus(STAGES[0]);
        } catch (err) {
            alert("Failed to edit task");
        }
    }

    async function handleDeleteTask() {
        if (editIdx === null) return;
        try {
            const taskId = team.tasks[editIdx].id || team.tasks[editIdx]._id;
            const res = await fetch(`/api/teams/${id}/tasks/${taskId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete task");
            setTeam((prev) => {
                const updatedTasks = [...prev.tasks];
                updatedTasks.splice(editIdx, 1);
                return { ...prev, tasks: updatedTasks };
            });
            setShowEditForm(false);
            setEditIdx(null);
            setEditTitle("");
            setEditStatus(STAGES[0]);
        } catch (err) {
            alert("Failed to delete task");
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <span className="text-gray-500 text-lg">Loading...</span>
            </div>
        );
    }

    if (error || !team) {
        notFound();
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-white py-8">
            {/* Sticky Top Bar for Mobile */}
            <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-200 shadow flex items-center justify-between px-4 h-14">
                <Link
                    href="/teams"
                    className="inline-block px-3 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition shadow"
                >
                    ← Back
                </Link>
                <span className="font-bold text-indigo-700 text-lg">{team.name}</span>
                <button
                    className="cursor-pointer px-4 py-2 rounded-lg font-semibold transition-colors shadow bg-green-600 text-white hover:bg-green-700 text-sm"
                    onClick={() => setShowAddForm(true)}
                >
                    Add Task
                </button>
            </div>

            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-200 mt-16 md:mt-0">
                {/* Desktop header */}
                <div className="hidden md:flex justify-between items-center mb-8">
                    <Link
                        href="/teams"
                        className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition shadow"
                    >
                        ← Back to Teams
                    </Link>
                    <button
                        className={`cursor-pointer px-5 py-2 rounded-lg font-semibold transition-colors shadow
                                    ${showAddForm ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-600 text-white hover:bg-green-700"}`}
                        onClick={() => setShowAddForm(true)}
                    >

                        + Add New Task
                    </button>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-slate-800">{team.name}</h1>
                <h2 className="text-lg sm:text-xl font-semibold mb-8 text-center text-slate-600">Assigned Tasks</h2>

                {/* Modal for Add New Task */}
                {showAddForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/70">
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-md border border-gray-200 relative">
                            <button
                                className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                                onClick={() => setShowAddForm(false)}
                                aria-label="Close"
                                type="button"
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-slate-800">Add New Task</h2>
                            <form onSubmit={handleAddTask} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        placeholder="Task Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
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
                                    Add Task
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modal for Edit Task */}
                {showEditForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/70">
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-md border border-gray-200 relative">
                            <button
                                className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                                onClick={() => setShowEditForm(false)}
                                aria-label="Close"
                                type="button"
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-slate-800">Edit Task</h2>
                            <form onSubmit={handleEditTask} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        placeholder="Task Title"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                    >
                                        {STAGES.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 cursor-pointer px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 cursor-pointer px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                                        onClick={handleDeleteTask}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-xl">
                    <table className="min-w-full border-collapse text-sm shadow">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-4 border-b border-gray-200 text-left">#</th>
                                <th className="p-4 border-b border-gray-200 text-left">Task Title</th>
                                <th className="p-4 border-b border-gray-200 text-left">Status</th>
                                <th className="p-4 border-b border-gray-200 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(team.tasks && team.tasks.length > 0) ? (
                                team.tasks.map((task, idx) => (
                                    <tr key={task.id || task._id} className="even:bg-gray-50">
                                        <td className="p-4 border-b border-gray-100">{idx + 1}</td>
                                        <td className="p-4 border-b border-gray-100">{task.title}</td>
                                        <td className={`p-4 border-b border-gray-100 ${getStatusClasses(task.status)}`}>
                                            <span
                                                className={`inline-block w-3 h-3 rounded-full mr-2 align-middle ${getDotColor(task.status)}`}
                                            />
                                            {task.status}
                                        </td>
                                        <td className="flex items-center justify-center p-4 border-b border-gray-100">
                                            <button
                                                className="flex items-center justify-between gap-2 cursor-pointer px-2 py-1 rounded bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
                                                onClick={() => openEditModal(idx)}
                                            >
                                                <img style={{ height: "15px" }} src="https://img.icons8.com/?size=100&id=9fYfwBJNoMpV&format=png&color=ffffff" alt="" /> Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className=" p-6 text-center text-gray-400 italic">
                                        No tasks assigned yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Mobile Card List */}
                <div className="md:hidden w-full flex flex-col gap-4">
                    {(team.tasks && team.tasks.length > 0) ? (
                        team.tasks.map((task, idx) => (
                            <div key={task.id || task._id} className="bg-white rounded-xl shadow border border-gray-200 p-4 flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <div className="font-medium text-slate-700">{task.title}</div>
                                    <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusClasses(task.status)}`}>
                                        <span className={`inline-block w-2 h-2 rounded-full mr-1 align-middle ${getDotColor(task.status)}`} />
                                        {task.status}
                                    </span>
                                </div>
                                <button
                                    className="flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition text-xs"
                                    onClick={() => openEditModal(idx)}
                                >
                                    <img style={{ height: "15px" }} src="https://img.icons8.com/?size=100&id=9fYfwBJNoMpV&format=png&color=ffffff" alt="" /> Edit
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="italic text-gray-400 mt-2 text-center">No tasks assigned yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
