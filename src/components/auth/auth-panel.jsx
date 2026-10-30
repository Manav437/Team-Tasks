"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { MdArrowBackIosNew } from "react-icons/md";
import DitherBackground from "./dither-background";
import ThemeSwitch from "../theme-switch";
import styles from "./auth-panel.module.css";

function GoogleIcon() {
    return (
        <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z" />
            <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.81-1.76-5.6-4.12H3.06v2.59A10 10 0 0 0 12 22Z" />
            <path fill="#FBBC05" d="M6.4 13.92a6 6 0 0 1 0-3.84V7.49H3.06a10 10 0 0 0 0 9.02l3.34-2.59Z" />
            <path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.94 5.49l3.34 2.59A5.98 5.98 0 0 1 12 5.96Z" />
        </svg>
    );
}

export default function AuthPanel({ signup = false, form, onChange, onSubmit, error, loading, showPassword, onTogglePassword }) {
    return (
        <main className={styles.page}>
            <DitherBackground className={styles.background} />
            <div className={styles.vignette} aria-hidden="true" />
            <Link href="/" className={styles.back}><MdArrowBackIosNew size={12} aria-hidden="true" /> Back</Link>
            <div className={styles.themeControl}><ThemeSwitch /></div>
            <section className={styles.panel} aria-labelledby="auth-heading">
                <span className={`${styles.corner} ${styles.topLeft}`} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.topRight}`} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.bottomLeft}`} aria-hidden="true" />
                <span className={`${styles.corner} ${styles.bottomRight}`} aria-hidden="true" />
                <Link href="/" className={styles.brand} aria-label="Team Tasks home">
                    <Image src="/TaskPilot-favicon.png" alt="" width={36} height={36} className={styles.brandLogo} />
                    <span>Team Tasks</span>
                </Link>
                <h1 id="auth-heading" className={styles.heading}>{signup ? "Create your account" : "Sign in to Team Tasks"}</h1>
                <button type="button" className={styles.google} disabled={loading} onClick={() => signIn("google", { callbackUrl: "/teams" })}>
                    <GoogleIcon /> Continue with Google
                </button>
                <div className={styles.divider}><span />or<span /></div>
                <form className={styles.form} onSubmit={onSubmit} aria-busy={loading}>
                    <label htmlFor="auth-email" className={styles.srOnly}>Email</label>
                    <input id="auth-email" className={styles.input} type="email" name="email" autoComplete="email" placeholder="Email" value={form.email} onChange={onChange} required disabled={loading} />
                    <label htmlFor="auth-password" className={styles.srOnly}>Password</label>
                    <div className={styles.password}>
                        <input id="auth-password" className={styles.input} type={showPassword ? "text" : "password"} name="password" autoComplete={signup ? "new-password" : "current-password"} placeholder="Password" value={form.password} onChange={onChange} required disabled={loading} />
                        <button type="button" className={styles.eye} onClick={onTogglePassword} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
                            {showPassword ? <PiEyeSlash size={21} /> : <PiEye size={21} />}
                        </button>
                    </div>
                    {!signup && <Link href="/forgot-password" className={styles.forgot}>Forgot password?</Link>}
                    {error && <p className={styles.error} role="alert">{error}</p>}
                    <button className={styles.submit} type="submit" disabled={loading}>
                        {loading && <span className={styles.spinner} aria-hidden="true" />}
                        {loading ? (signup ? "Creating account…" : "Signing in…") : (signup ? "Create account" : "Sign in")}
                    </button>
                </form>
                <p className={styles.switchAccount}>
                    {signup ? "Already have an account? " : "Don’t have an account? "}
                    <Link href={signup ? "/auth/login" : "/auth/signup"}>{signup ? "Sign in" : "Sign up"}</Link>
                </p>
                {/* <p className={styles.footer}>A little less admin. A little more progress.</p>*/}
            </section>
        </main>
    );
}
