"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import AuthPanel from "@/components/auth/auth-panel";

const AUTH_ERRORS = {
    CredentialsSignin: "Incorrect email or password. If you registered with Google, use Sign in with Google.",
    OAuthSignin: "Could not connect to Google. Please try again. If this continues, check the Google OAuth configuration and server logs.",
    OAuthCallback: "Google sign-in could not be completed. Check the server logs and database connection.",
    OAuthCreateAccount: "Could not create your Google account. Check the database connection and server logs.",
    OAuthAccountNotLinked: "An account already exists with this email. Sign in using your original method; Google is not linked to that account.",
    AccessDenied: "Sign-in was denied. Please use a Google account with a verified email address.",
    Configuration: "Authentication is not configured correctly. Check the server logs.",
    Default: "Sign-in failed. Please try again or check the server logs.",
};


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
        document.title = "Sign in • Team Tasks";
        const authError = new URLSearchParams(window.location.search).get("error");
        if (authError) {
            setError(AUTH_ERRORS[authError] || AUTH_ERRORS.Default);
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: form.email.trim().toLowerCase(),
                password: form.password,
                callbackUrl: "/teams",
            });

            if (res?.error) {
                setError(AUTH_ERRORS[res.error] || AUTH_ERRORS.Default);
            } else if (res?.ok) {
                router.push("/teams");
            } else {
                setError(AUTH_ERRORS.Default);
            }
        } catch {
            setError("Unable to reach the sign-in service. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthPanel
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
