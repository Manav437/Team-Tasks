// app/auth/login/page.jsx (or wherever your LoginPage component is)
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import "../../globals.css"

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/teams");
        }
    }, [status, router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
            callbackUrl: "/teams",
        });

        setLoading(false);

        if (res?.error) {
            setError(res.error || "Login failed");
        } else if (res?.ok) {
            router.push("/teams");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[url('/landing-page-bg.png')] bg-cover bg-center bg-no-repeat relative">
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/5 z-0" />
            <div className="relative z-10 w-full max-w-md mx-auto">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
                    <div className="flex flex-col items-center">
                        <Image
                            onClick={() => router.push('/')}
                            src="/tasks-teams.png"
                            alt="TaskTeams Logo"
                            width={48}
                            height={48}
                            className="cursor-pointer mb-2 rounded"
                        />
                        <h1 className="text-2xl font-bold text-[#36465D] mb-2">Log in to TaskTeams</h1>
                        <p className="mb-4 text-slate-600">
                            Don&apos;t have an account?{" "}
                            <Link className="text-green-600 font-semibold hover:underline" href="/auth/signup">
                                Register
                            </Link>
                        </p>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <button
                                type="button"
                                className="w-full cursor-pointer bg-white border border-gray-300 shadow-sm hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mb-4 transition"
                                onClick={() => signIn("google", { callbackUrl: "/teams" })}
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                                    <g>
                                        <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.86-6.86C36.68 2.36 30.77 0 24 0 14.82 0 6.71 5.06 2.69 12.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z" />
                                        <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.66 7.01l7.2 5.6C43.98 37.13 46.1 31.36 46.1 24.55z" />
                                        <path fill="#FBBC05" d="M10.67 28.64A14.5 14.5 0 0 1 9.5 24c0-1.6.28-3.15.77-4.64l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.77.9 7.34 2.49 10.48l8.18-6.34z" />
                                        <path fill="#EA4335" d="M24 48c6.48 0 11.92-2.15 15.89-5.85l-7.2-5.6c-2.01 1.35-4.6 2.15-8.69 2.15-6.38 0-11.87-3.63-14.33-8.9l-8.18 6.34C6.71 42.94 14.82 48 24 48z" />
                                        <path fill="none" d="M0 0h48v48H0z" />
                                    </g>
                                </svg>
                                <span className="text-[#000] font-medium">Sign in with Google</span>
                            </button>

                            <div className="flex items-center my-4">
                                <div className="flex-grow h-px bg-gray-200" />
                                <span className="mx-3 text-gray-400 text-xs">or</span>
                                <div className="flex-grow h-px bg-gray-200" />
                            </div>

                            <label className="block mb-1 text-slate-700">Email</label>
                            <input
                                className="w-full px-3 py-2 mb-4 border border-slate-300 rounded"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="manager@taskteams.com"
                                required
                            />

                            <label className="block mb-1 text-slate-700">Password</label>
                            <input
                                className="w-full px-3 py-2 mb-4 border border-slate-300 rounded"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="********"
                                required
                            />

                            {error && (
                                <div className="text-red-600 text-sm mb-2">{error}</div>
                            )}

                            <button
                                className="cursor-pointer flex items-center justify-center w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 transition:.3s ease-in-out hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? <div className="loader"></div> : "Log In"}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M10.5 16.3q-.2 0-.35-.137T10 15.8V8.2q0-.225.15-.362t.35-.138q.05 0 .35.15l3.625 3.625q.125.125.175.25t.05.275t-.05.275t-.175.25L10.85 16.15q-.075.075-.162.113t-.188.037" /></svg>
                            </button>
                        </form>

                        <Link
                            href="/forgot-password"
                            className="block text-sm text-blue-500 hover:underline mt-4 self-end"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
