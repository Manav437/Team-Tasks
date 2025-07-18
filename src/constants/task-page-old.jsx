// function TasksPage() {
//     // <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-white py-8">
//     //     {/* mobile top bar */}
//     //     <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-200 shadow flex items-center justify-between px-4 h-14">
//     //         <Link
//     //             href="/teams"
//     //             className="inline-block px-3 py-1 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition shadow"
//     //         >
//     //             ←
//     //         </Link>

//     //         <Image alt="team-tasks-logo" height={35} width={35} src='/team-tasks.png' />
//     //         <button
//     //             className="cursor-pointer px-3 py-2 rounded-lg font-semibold transition-colors shadow bg-green-600 text-white hover:bg-green-700 text-sm"
//     //             onClick={() => setShowAddForm(true)}
//     //         >
//     //             <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21" /></svg>
//     //         </button>
//     //     </div>

//     //     <div className="w-19/20 max-w-4xl bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-200 mt-16 md:mt-0">
//     //         {/* Desktop header */}
//     //         <div className="hidden md:flex justify-between items-center mb-8">
//     //             <Link
//     //                 href="/teams"
//     //                 className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition shadow"
//     //             >
//     //                 ← Back to Teams
//     //             </Link>
//     //             <button
//     //                 className={`cursor-pointer px-5 py-2 rounded-lg font-semibold transition-colors shadow
//     //       ${showAddForm
//     //                         ? "bg-green-500 text-white hover:bg-red-600"
//     //                         : "bg-green-600 text-white hover:bg-green-700"
//     //                     }`}
//     //                 onClick={() => setShowAddForm(true)}
//     //             >
//     //                 + Add New Task
//     //             </button>
//     //         </div>
//     //         <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-slate-800">{team.name}</h1>
//     //         <h2 className="text-lg sm:text-xl font-semibold mb-8 text-center text-slate-600">Assigned Tasks</h2>

//     //         {/* new task modal */}
//     //         {showAddForm && (
//     //             <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/70">
//     //                 <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-md border border-gray-200 relative modal-animate-in">
//     //                     <button
//     //                         className="cursor-pointer absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
//     //                         onClick={() => setShowAddForm(false)}
//     //                         aria-label="Close"
//     //                         type="button"
//     //                     >
//     //                         &times;
//     //                     </button>
//     //                     <h2 className="underline underline-offset-2 text-xl font-bold mb-4 text-slate-800">Add New Task</h2>
//     //                     <form onSubmit={handleAddTask} className="flex flex-col gap-4">
//     //                         <div>
//     //                             <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
//     //                             <input
//     //                                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
//     //                                 placeholder="Task Title"
//     //                                 value={title}
//     //                                 onChange={(e) => setTitle(e.target.value)}
//     //                                 required
//     //                             />
//     //                         </div>
//     //                         <div>
//     //                             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//     //                             <select
//     //                                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
//     //                                 value={status}
//     //                                 onChange={(e) => setStatus(e.target.value)}
//     //                             >
//     //                                 {STAGES.map((s) => (
//     //                                     <option key={s} value={s}>{s}</option>
//     //                                 ))}
//     //                             </select>
//     //                         </div>
//     //                         <button
//     //                             type="submit"
//     //                             className="cursor-pointer mt-2 px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
//     //                         >
//     //                             Add Task
//     //                         </button>
//     //                     </form>
//     //                 </div>
//     //             </div>
//     //         )}

//     //         {/* edit task modal */}
//     //         {showEditForm && (
//     //             <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/70">
//     //                 <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-md border border-gray-200 relative modal-animate-in">
//     //                     <button
//     //                         className="cursor-pointer absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
//     //                         onClick={() => setShowEditForm(false)}
//     //                         aria-label="Close"
//     //                         type="button"
//     //                     >
//     //                         &times;
//     //                     </button>
//     //                     <h2 className="text-xl font-bold underline underline-offset-2 mb-4 text-slate-800">Edit Task</h2>
//     //                     <form onSubmit={handleEditTask} className="flex flex-col gap-4">
//     //                         <div>
//     //                             <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
//     //                             <input
//     //                                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
//     //                                 placeholder="Task Title"
//     //                                 value={editTitle}
//     //                                 onChange={(e) => setEditTitle(e.target.value)}
//     //                                 required
//     //                             />
//     //                         </div>
//     //                         <div>
//     //                             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//     //                             <select
//     //                                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
//     //                                 value={editStatus}
//     //                                 onChange={(e) => setEditStatus(e.target.value)}
//     //                             >
//     //                                 {STAGES.map((s) => (
//     //                                     <option key={s} value={s}>{s}</option>
//     //                                 ))}
//     //                             </select>
//     //                         </div>
//     //                         <div className="flex gap-2 mt-2">
//     //                             <button
//     //                                 type="button"
//     //                                 className="hidden md:flex items-center justify-center gap-1 flex-1 cursor-pointer px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-700 transition"
//     //                                 onClick={handleDeleteTask}
//     //                             >
//     //                                 <svg className="h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17" /></svg>
//     //                                 Delete Task
//     //                             </button>

//     //                             <button
//     //                                 type="submit"
//     //                                 className="flex items-center justify-center gap-1 flex-1 cursor-pointer px-4 py-2 rounded bg-indigo-500 text-white font-semibold hover:bg-indigo-700 transition"
//     //                             >
//     //                                 <svg className="h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.414A2 2 0 0 0 19.414 5L17 2.586A2 2 0 0 0 15.586 2zm10.238 8.793a1 1 0 1 0-1.414-1.414l-4.242 4.243l-1.415-1.415a1 1 0 0 0-1.414 1.414l2.05 2.051a1.1 1.1 0 0 0 1.556 0l4.88-4.879Z" /></g></svg>
//     //                                 Save Changes
//     //                             </button>
//     //                         </div>
//     //                     </form>
//     //                 </div>
//     //             </div>
//     //         )}

//     //         {/* desktop cards */}
//     //         <div className="hidden md:block overflow-x-auto rounded-xl">
//     //             <table className="min-w-full border-collapse text-sm shadow">
//     //                 <thead className="bg-slate-100">
//     //                     <tr>
//     //                         <th className="p-4 border-b border-r border-gray-200 text-left">#</th>
//     //                         <th className="p-4 border-b border-r border-gray-200 text-left">Task Title</th>
//     //                         <th className="p-4 border-b border-r border-gray-200 text-left">Status</th>
//     //                         <th className="p-4 border-b border-gray-200 text-center">Actions</th>
//     //                     </tr>
//     //                 </thead>
//     //                 <tbody>
//     //                     {team.tasks && team.tasks.length > 0 ? (
//     //                         team.tasks.map((task, idx) => (
//     //                             <tr key={task.id || task._id} className="even:bg-gray-50">
//     //                                 <td className="p-4 border-b border-r border-gray-100">{idx + 1}</td>
//     //                                 <td className="p-4 border-b border-r border-gray-100">{task.title}</td>
//     //                                 <td className={`p-4 border-b border-r border-gray-100 ${getStatusClasses(task.status)}`}>
//     //                                     <span
//     //                                         className={`inline-block w-3 h-3 rounded-full mr-2 align-middle ${getDotColor(task.status)}`}
//     //                                     />
//     //                                     {task.status}
//     //                                 </td>
//     //                                 <td className="flex items-center justify-center p-4 border-b border-gray-100">
//     //                                     <button
//     //                                         className="flex items-center justify-between gap-2 cursor-pointer px-2 py-1 rounded bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
//     //                                         onClick={() => openEditModal(idx)}
//     //                                     >
//     //                                         <img style={{ height: "15px" }} src="https://img.icons8.com/?size=100&id=9fYfwBJNoMpV&format=png&color=ffffff" alt="" /> Edit
//     //                                     </button>
//     //                                 </td>
//     //                             </tr>
//     //                         ))
//     //                     ) : (
//     //                         <tr>
//     //                             <td colSpan={4} className=" p-6 text-center text-gray-400 italic">
//     //                                 No tasks assigned yet.
//     //                             </td>
//     //                         </tr>
//     //                     )}
//     //                 </tbody>
//     //             </table>
//     //         </div>

//     //         {/* mobile cards */}
//     //         <div className="md:hidden w-full flex flex-col gap-4">
//     //             {team.tasks && team.tasks.length > 0 ? (
//     //                 team.tasks.map((task, idx) => (
//     //                     <div key={task.id || task._id} className="bg-white rounded-xl shadow border border-gray-200 p-4 flex flex-col gap-2">
//     //                         <div className="flex items-start">
//     //                             <span className="text-xs text-green-600">#{idx + 1}</span>
//     //                         </div>

//     //                         <div className="flex justify-between items-center">
//     //                             <div className="font-medium text-slate-700">{task.title}</div>
//     //                             <span className={`flex items-center justify-between ml-2 px-2 py-1 rounded text-xs ${getStatusClasses(task.status)}`}>
//     //                                 <span className={`inline-block w-2 h-2 rounded-full mr-1 align-middle ${getDotColor(task.status)}`} />
//     //                                 {task.status}
//     //                             </span>
//     //                         </div>
//     //                         <div className="flex items-center justify-between">
//     //                             <span
//     //                                 onClick={() => openEditModalMobile(idx)}
//     //                                 className="cursor-pointer text-gray-500 hover:text-slate-800 underline underline-offset-2 text-sm"
//     //                             >
//     //                                 Edit Details
//     //                             </span>
//     //                             <span
//     //                                 onClick={() => handleDeleteTaskMobile(idx)}
//     //                                 className="cursor-pointer underline underline-offset-2  text-red-500 hover:text-red-600 font-bold text-sm"
//     //                             >
//     //                                 Delete
//     //                             </span>
//     //                         </div>
//     //                     </div>
//     //                 ))
//     //             ) : (
//     //                 <div className="italic text-gray-400 mt-2 text-center">No tasks assigned yet.</div>
//     //             )}
//     //         </div>
//     //     </div>
//     // </div>
// }