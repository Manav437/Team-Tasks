"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { MdArrowBackIosNew } from "react-icons/md";
import { PiArrowRight, PiEye, PiEyeSlash } from "react-icons/pi";
import "../../globals.css";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/teams");
        }
    }, [status, router]);

    useEffect(() => {
        document.title = "Sign in • Task Pilot";
    }, []);

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
        <div className="min-h-screen w-full flex items-center justify-center bg-[url('/background-auth.webp')] bg-cover bg-center bg-no-repeat relative">
            <button
                onClick={() => router.back()}
                className="cursor-pointer text-white text-sm px-2 py-2 absolute top-6 left-6 group flex items-center justify-center gap-2 rounded-md hover:bg-white/20 transition-all duration-300 active:scale-90"
                aria-label="Go back"
            >
                <MdArrowBackIosNew />
                <span>Back</span>
            </button>

            <div className="relative z-10 w-24/25 max-w-sm mx-auto">
                <div className="backdrop-blur-md shadow-2xl">
                    <div className="flex flex-col items-center">
                        <Image
                            onClick={() => router.push("/")}
                            src="/TaskPilot-favicon.png"
                            alt="TaskPilot Logo"
                            width={48}
                            height={48}
                            className="cursor-pointer mb-4 rounded brightness-110"
                        />
                        <h1 className="text-2xl font-bold text-white">
                            Log in to TaskPilot
                        </h1>
                        <p className="mt-1 mb-6 text-white/50 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                className="text-white font-semibold hover:underline"
                                href="/auth/signup"
                            >
                                Register
                            </Link>
                        </p>

                        <button
                            type="button"
                            className="group w-full cursor-pointer bg-zinc-900 ring-2 ring-white/10 shadow-sm
                            hover:bg-white focus:ring-2 focus:outline-none focus:ring-white/20
                            font-medium [corner-shape:squircle] rounded-[50px] text-sm py-2.5 flex
                            text-center gap-2 items-center justify-center mb-4 transition-all duration-300 ease-in-out"
                            onClick={() =>
                                signIn("google", { callbackUrl: "/teams" })
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                className="fill-current text-white group-hover:text-black transition-colors"
                            >
                                <path d="M20.855 10.361a.2.2 0 0 0-.194-.161H12.2a.2.2 0 0 0-.2.2v3.2c0 .11.09.2.2.2h4.886A5.398 5.398 0 0 1 6.6 12A5.4 5.4 0 0 1 12 6.6a5.37 5.37 0 0 1 3.44 1.245a.205.205 0 0 0 .276-.01l2.266-2.267a.197.197 0 0 0-.007-.286A8.95 8.95 0 0 0 12 3a9 9 0 1 0 9 9c0-.547-.051-1.113-.145-1.639" />
                            </svg>
                            <span className="text-white group-hover:text-black font-medium transition-colors">
                                Sign in with Google
                            </span>
                        </button>

                        <div className="flex items-center mb-6 w-full opacity-30">
                            <div className="flex-grow h-px bg-white" />
                            <span className="mx-3 text-white text-xs">or</span>
                            <div className="flex-grow h-px bg-white" />
                        </div>

                        <form className="w-full" onSubmit={handleSubmit}>
                            <label className="text-sm block mb-2 text-white/60">
                                Email
                            </label>
                            <input
                                className="w-full px-4 py-2.5 mb-4 text-white focus:bg-white/5 border border-white/10 [corner-shape:squircle] rounded-[50px] duration-200 focus:ring-2 focus:ring-white/20 focus:outline-0 placeholder:text-white/20"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="manager@taskpilot.com"
                                required
                            />

                            <label className="text-sm block mb-2 text-white/60">
                                Password
                            </label>
                            <div className="relative flex items-center mb-2">
                                {" "}
                                <input
                                    className="w-full pl-4 pr-12 py-2.5 text-white focus:bg-white/5 border border-white/10
                                               [corner-shape:squircle] rounded-[50px] duration-200
                                               focus:ring-2 focus:ring-white/20 focus:outline-0
                                               placeholder:text-white/20"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-2 p-1 text-white/40 hover:text-white transition-colors cursor-pointer"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <PiEyeSlash
                                            size={20}
                                            className="animate-in fade-in zoom-in duration-200"
                                        />
                                    ) : (
                                        <PiEye
                                            size={20}
                                            className="animate-in fade-in zoom-in duration-200"
                                        />
                                    )}
                                </button>
                            </div>

                            <Link
                                href="/forgot-password"
                                title="reset password"
                                className="text-xs text-white/40 hover:text-white transition-colors block text-right mb-4"
                            >
                                Forgot password?
                            </Link>

                            {error && (
                                <div className="text-red-400 text-xs mb-4 text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                                    {error}
                                </div>
                            )}

                            <button
                                className="group flex items-center justify-center w-full py-3
                                bg-zinc-900 text-white rounded-[50px] font-semibold
                                shadow-xl ring-2 ring-white/10 [corner-shape:squircle]
                                transition-all duration-300 ease-in-out cursor-pointer
                                hover:bg-white hover:text-black disabled:opacity-70"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span>Log In</span>
                                        <PiArrowRight className="text-md transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
