"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import AuthPanel from "@/components/auth/auth-panel";

export default function SignUp() {
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
        document.title = "Sign up • Team Tasks";
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Registration failed");
                setLoading(false);
                return;
            }

            router.replace("/auth/login");
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <AuthPanel
            signup
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            error={error}
            loading={loading}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((visible) => !visible)}
        />
    );
}
