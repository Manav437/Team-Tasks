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
            <div className="relative z-10 w-24/25 max-w-md mx-auto">
                <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-8">
                    <div className="flex flex-col items-center">
                        <Image
                            onClick={() => router.push('/')}
                            src="/team-tasks.png"
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
                                className="w-full cursor-pointer bg-slate-700 border border-gray-300 shadow-sm hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex text-center gap-2 items-center justify-center mb-4 transition-all duration-300 ease-in-out"
                                onClick={() => signIn("google", { callbackUrl: "/teams" })}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M20.855 10.361a.2.2 0 0 0-.194-.161H12.2a.2.2 0 0 0-.2.2v3.2c0 .11.09.2.2.2h4.886A5.398 5.398 0 0 1 6.6 12A5.4 5.4 0 0 1 12 6.6a5.37 5.37 0 0 1 3.44 1.245a.205.205 0 0 0 .276-.01l2.266-2.267a.197.197 0 0 0-.007-.286A8.95 8.95 0 0 0 12 3a9 9 0 1 0 9 9c0-.547-.051-1.113-.145-1.639" /></svg>
                                <span className="text-[#fff] font-medium">Sign in with Google</span>
                            </button>

                            <div className="flex items-center my-4">
                                <div className="flex-grow h-px bg-gray-400" />
                                <span className="mx-3 text-gray-600 text-xs">or</span>
                                <div className="flex-grow h-px bg-gray-400" />
                            </div>

                            <label className="block mb-1 text-slate-700">Email</label>
                            <input
                                className="w-full px-3 py-2 mb-4 border border-slate-400 rounded"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="manager@taskteams.com"
                                required
                            />

                            <label className="block mb-1 text-slate-700">Password</label>
                            <input
                                className="w-full px-3 py-2 mb-4 border border-slate-400 rounded"
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
