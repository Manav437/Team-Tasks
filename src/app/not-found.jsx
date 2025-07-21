// src/app/not-found.jsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-[url('/landing-page-bg.png')] px-4">
            <section className="bg-white/40 rounded-lg shadow-lg p-8 max-w-sm w-full flex flex-col gap-4 items-start">
                <div className="flex items-start justify-between gap-3 mb-2 w-full">
                    <Image
                        className="cursor-pointer"
                        onClick={() => router.push('/')}
                        height={41}
                        width={45}
                        alt="TaskTeams logo"
                        src="/TaskTeams-favicon.png"
                        aria-label="Go to home"
                        title="Go to home"
                        priority
                    />
                    <div className="flex flex-col">
                        <h1 className="text-xl mr-0  border-b-2 border-slate-500 text-end font-extrabold text-slate-800 leading-tight">404</h1>
                        <h2 className="text-lg font-bold text-slate-800">
                            Page Not Found
                        </h2>
                    </div>
                </div>
                <p className="text-slate-600 mb-2 text-start rounded-l-sm text-md border-l-4 border-indigo-400 pl-1.5">
                    This page took a wrong turn at{' '}
                    <a
                        className="text-indigo-400 italic hover:text-indigo-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://en.wikipedia.org/wiki/Breaking_Bad"
                    >
                        Albuquerque.
                    </a>{' '}
                    (Or maybe it just doesn&apos;t exist.)
                    Either way, let&apos;s get you back on track!
                </p>
                <Link
                    href="/"
                    className="flex items-center mx-auto justify-between gap-1 hover:gap-1.5 overflow-hidden duration-200 bg-gradient-to-r from-blue-500 via-black-500 to-gray-300 text-white px-3 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:via-black-600 hover:to-slate-200 transition-all"
                >
                    Go back Home
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#fff" d="M10.5 16.3q-.2 0-.35-.137T10 15.8V8.2q0-.225.15-.362t.35-.138q.05 0 .35.15l3.625 3.625q.125.125.175.25t.05.275t-.05.275t-.175.25L10.85 16.15q-.075.075-.162.113t-.188.037" /></svg>
                </Link>
            </section>
        </main>
    );
}
