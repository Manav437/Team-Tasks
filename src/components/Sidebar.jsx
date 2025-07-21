import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
    {
        href: "/teams",
        label: "Groups",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#808080" d="M2.596 16.97q0-.697.36-1.198q.361-.5.97-.8q1.301-.62 2.584-.988q1.282-.369 3.086-.369t3.087.369t2.584.987q.608.3.969.801q.36.501.36 1.197v.608q0 .382-.299.71t-.74.328H3.636q-.44 0-.74-.299q-.299-.299-.299-.739zm15.777 1.646q.102-.239.163-.504q.06-.264.06-.535v-.654q0-.87-.352-1.641q-.351-.772-.998-1.324q.737.15 1.42.416t1.35.599q.65.327 1.019.837t.369 1.113v.654q0 .44-.3.74q-.298.298-.738.298zm-8.777-7.231q-1.237 0-2.118-.882t-.882-2.118t.882-2.12t2.118-.88t2.119.88t.881 2.12t-.881 2.118t-2.119.882m7.27-3q0 1.237-.882 2.118t-2.118.882q-.064 0-.162-.015t-.162-.031q.509-.623.781-1.382q.273-.758.273-1.575t-.285-1.56q-.286-.745-.769-1.391q.081-.029.162-.038t.162-.009q1.237 0 2.118.882t.882 2.118" /></svg>),
    },
    {
        href: "/projects",
        label: "Work",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#808080" d="M4.616 20q-.691 0-1.153-.462T3 18.384V8.616q0-.691.463-1.153T4.615 7H9V5.615q0-.69.463-1.153T10.616 4h2.769q.69 0 1.153.462T15 5.615V7h4.385q.69 0 1.152.463T21 8.616v9.769q0 .69-.463 1.153T19.385 20zM10 7h4V5.615q0-.23-.192-.423T13.385 5h-2.77q-.23 0-.423.192T10 5.615z" /></svg>
        ),
    },
    {
        href: "/settings",
        label: "Settings",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#808080" d="m10.135 21l-.362-2.892q-.479-.145-1.035-.454q-.557-.31-.947-.664l-2.668 1.135l-1.865-3.25l2.306-1.739q-.045-.27-.073-.558q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626L3.258 9.126l1.865-3.212L7.771 7.03q.448-.373.97-.673q.52-.3 1.013-.464L10.134 3h3.732l.361 2.912q.575.202 1.016.463t.909.654l2.725-1.115l1.865 3.211l-2.382 1.796q.082.31.092.569t.01.51q0 .233-.02.491q-.019.259-.088.626l2.344 1.758l-1.865 3.25l-2.681-1.154q-.467.393-.94.673t-.985.445L13.866 21zm1.838-6.5q1.046 0 1.773-.727T14.473 12t-.727-1.773t-1.773-.727q-1.052 0-1.776.727T9.473 12t.724 1.773t1.776.727" /></svg>
        ),
    },
];

export function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <aside
                className="hidden md:flex h-screen fixed top-0 left-0 z-40 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-r border-gray-200 shadow-lg w-50 flex-col"
                style={{ width: "200px", minWidth: "205px" }}
            >
                <div className="flex items-center gap-2 justify-start h-16 px-4 border-b border-gray-200">
                    <Image className="cursor-pointer rounded hover:bg-black/10 transition duration-300" onClick={() => router.push('/')} alt="task-teams-logo" height={32} width={32} src="/team-tasks.png" />
                    <span className="text-gray-800 font-bold text-xl tracking-tight">Admin Panel</span>
                </div>
                <nav className="flex-1 flex flex-col gap-1 mt-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group flex items-center gap-3 px-5 py-2 rounded-lg mx-2 my-1 font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition relative"
                        >
                            <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-indigo-500 opacity-0 group-hover:opacity-100 transition" />
                            <span className="text-indigo-500 group-hover:scale-110 transition">{link.icon}</span>
                            <span className="">{link.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="flex flex-row items-center justify-between mt-4 mb-4 mx-3 gap-2 border-1 border-slate-300 bg-slate-100 rounded-lg p-1 shadow-inner">
                    <div className="flex gap-1 items-center">
                        <img className="bg-white p-0.5 size-8 rounded-full border border-gray-300" src="https://i.pinimg.com/736x/08/35/0c/08350cafa4fabb8a6a1be2d9f18f2d88.jpg" alt="" />
                        <span className="font-semibold text-slate-700 text-sm">Admin-ABC</span>
                    </div>
                    <button
                        className="cursor-pointer flex items-center px-2 py-2 rounded-full transition-colors border border-transparent hover:border-red-600 hover:bg-red-100 text-red-600 font-semibold"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to log out?")) {
                                signOut({ callbackUrl: "/auth/login" });
                            }
                        }}
                        title="Log out"
                    >
                        <svg className="rotate-180 w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                        </svg>
                    </button>
                </div>
            </aside>

            <div className="fixed inset-0 z-50 flex md:hidden pointer-events-none">

                <div
                    className={`
            fixed inset-0 bg-slate-200/60 transition-opacity duration-300
            ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
                    onClick={() => setSidebarOpen(false)}
                />

                <aside
                    className={`
            relative bg-gradient-to-b from-white via-slate-50 to-slate-100 h-full shadow-lg flex flex-col z-50 transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-80"}
          `}
                    style={{ minWidth: "240px", width: "200px" }}
                >
                    <div className="flex items-center justify-between h-16 border-b border-gray-100 px-4">
                        <div className="flex items-center gap-2">
                            <Image alt="task-teams-logo" height={32} width={32} src="/team-tasks.png" />
                            <span className="text-gray-800 font-bold text-xl tracking-tight">Admin Panel</span>
                        </div>
                        <button
                            className="ml-auto text-gray-500 hover:text-indigo-700 focus:outline-none"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close sidebar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <nav className="flex-1 flex flex-col gap-1 mt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group flex items-center gap-3 px-5 py-2 rounded-lg mx-2 my-1 font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition relative"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-indigo-500 opacity-0 group-hover:opacity-100 transition" />
                                <span className="text-indigo-500 group-hover:scale-110 transition">{link.icon}</span>
                                <span className="">{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                    <div className="flex flex-row items-center justify-between mt-4 mb-4 mx-3 gap-2 bg-slate-100 rounded-lg p-2 shadow-inner">
                        <div className="flex gap-2 items-center">
                            <img className="bg-white p-0.5 size-8 rounded-full border border-gray-300" src="https://i.pinimg.com/736x/08/35/0c/08350cafa4fabb8a6a1be2d9f18f2d88.jpg" alt="" />
                            <span className="font-semibold text-slate-700 text-sm">Admin-ABC</span>
                        </div>
                        <button
                            className="cursor-pointer flex items-center px-2 py-2 rounded transition-colors border border-transparent hover:border-red-600 hover:bg-red-100 text-red-600 font-semibold"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to log out?")) {
                                    signOut({ callbackUrl: "/auth/login" });
                                }
                            }}
                            title="Log out"
                        >
                            <svg className="rotate-180 w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                            </svg>
                        </button>
                    </div>
                </aside>
            </div>

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
                <Image alt="team-tasks-logo" height={32} width={32} src="/team-tasks.png" />
                <button
                    className="p-1 ml-2 text-red-600 hover:text-red-800 hover:bg-red-200 rounded-lg"
                    onClick={() => {
                        if (window.confirm("Are you sure you want to log out?")) {
                            signOut({ callbackUrl: "/auth/login" });
                        }
                    }}
                    aria-label="Logout"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                    </svg>
                </button>
            </nav>
        </>
    );
}