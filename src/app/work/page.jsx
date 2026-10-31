"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RiRefreshLine } from "react-icons/ri";
import { Sidebar } from "@/components/Sidebar";
import PageHeader from "@/components/dashboard/page-header";
import WorkOverview from "@/components/dashboard/work-overview";
import { getLocalDateKey } from "@/utils/work-overview.mjs";
import styles from "@/components/dashboard/dashboard.module.css";

export default function WorkPage() {
    const { status } = useSession();
    const [overview, setOverview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const requestRef = useRef(null);
    const dateRef = useRef("");
    const loadWork = useCallback(async () => {
        requestRef.current?.abort();
        const controller = new AbortController();
        requestRef.current = controller;
        setRefreshing(true);
        setError("");
        const today = getLocalDateKey();
        dateRef.current = today;
        try {
            const response = await fetch(`/api/work?today=${today}`, { signal: controller.signal, cache: "no-store" });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Couldn’t load your tasks.");
            if (!controller.signal.aborted) setOverview(data);
        } catch (failure) {
            if (!controller.signal.aborted) setError(failure.message || "Couldn’t load your tasks. Please try again.");
        } finally {
            if (!controller.signal.aborted) { setLoading(false); setRefreshing(false); }
        }
    }, []);

    useEffect(() => {
        if (status === "loading") return;
        if (status !== "authenticated") { setOverview(null); setLoading(false); return; }
        setLoading(true);
        loadWork();
        const onVisible = () => { if (document.visibilityState === "visible") loadWork(); };
        const timer = setInterval(() => { if (getLocalDateKey() !== dateRef.current) loadWork(); }, 60_000);
        document.addEventListener("visibilitychange", onVisible);
        return () => {
            requestRef.current?.abort();
            clearInterval(timer);
            document.removeEventListener("visibilitychange", onVisible);
        };
    }, [status, loadWork]);

    return <div className="dashboard-theme flex min-h-screen bg-canvas"><Sidebar />
        <main className={styles.mainFrame}><div className={styles.content}>
            <PageHeader title="Work" actions={status === "authenticated" && <button type="button" onClick={loadWork} disabled={refreshing} className="inline-flex min-h-10 items-center gap-2 rounded-xs border border-line bg-panel px-3 text-xs text-muted hover:bg-raised disabled:opacity-50"><RiRefreshLine aria-hidden="true" className={refreshing ? "motion-safe:animate-spin" : ""} />{refreshing ? "Refreshing…" : "Refresh"}</button>} />
            <p className="mb-5 text-sm text-muted">What needs attention, across every team.</p>
            {status === "unauthenticated" ? <p className="border border-line bg-panel p-6 text-sm text-muted"><Link href="/auth/login" className="text-ink underline underline-offset-4">Sign in</Link> to see your teams’ deadlines.</p> : <>
                {error && <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-danger-border bg-danger-bg p-4 text-xs text-danger"><span>{error}{overview && " Showing the last loaded tasks."}</span><button type="button" disabled={refreshing} onClick={loadWork} className="underline underline-offset-4">Try again</button></div>}
                {loading ? <div role="status" aria-label="Loading work overview" className="space-y-5"><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[0,1,2,3].map(key => <div key={key} className="h-28 border border-line bg-panel motion-safe:animate-pulse" />)}</div><div className="h-52 border border-line bg-panel motion-safe:animate-pulse" /><span className="sr-only">Loading your tasks…</span></div> : overview && <WorkOverview overview={overview} />}
            </>}
        </div></main>
    </div>;
}
