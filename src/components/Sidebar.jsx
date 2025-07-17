import { useState } from "react";
import Image from 'next/image'
import { signOut } from "next-auth/react";
import Link from "next/link";

export function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:flex h-screen fixed top-0 left-0 z-40 bg-white border-r border-gray-200 shadow transition-all duration-300
                    w-50 flex-col`}
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
                        <span className="font-semibold text-slate-600">Admin-ABC</span>
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
                        relative w-24 bg-white h-full shadow-lg flex flex-col z-50 transition-transform duration-300
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-80"}
                    `}
                    style={{ minWidth: "15rem" }}
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
                <Image alt="team-tasks-logo" height={30} width={30} src='/team-tasks.png' />
                <button
                    className=" p-1 ml-2 text-red-600 hover:text-red-800 hover:bg-red-200 rounded-lg"
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
            </nav>
        </>
    );
}