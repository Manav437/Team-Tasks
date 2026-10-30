"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { RiCloseLine, RiFileCopyLine, RiCheckLine } from "react-icons/ri";
import styles from "./summary-modal.module.css";

export default function SummaryModal({ open, isLoading, summary, onClose }) {
    const [copied, setCopied] = useState(false);
    const dialogRef = useRef(null);
    const copyTimer = useRef(null);

    useEffect(() => {
        if (!open) return;
        const dialog = dialogRef.current;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    useEffect(() => {
        setCopied(false);
        return () => clearTimeout(copyTimer.current);
    }, [open, summary]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(summary);
            setCopied(true);
            clearTimeout(copyTimer.current);
            copyTimer.current = setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy summary:", error);
        }
    };

    if (!open) return null;
    return <dialog ref={dialogRef} className={styles.modal} aria-labelledby="ai-summary-title" onCancel={onClose} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
        <div className={styles.content}>
            <header className={styles.header}><div><p>TEAM OVERVIEW</p><h2 id="ai-summary-title">AI summary</h2></div><button type="button" onClick={onClose} aria-label="Close AI summary" className={styles.iconButton}><RiCloseLine size={20} /></button></header>
            <div className={styles.body} aria-busy={isLoading}>
                {isLoading ? <div className={styles.loading} role="status" aria-live="polite"><span className={styles.spinner} aria-hidden="true" /><span>Preparing your team summary…</span></div> : <div className={styles.markdown}><ReactMarkdown skipHtml disallowedElements={["img"]}>{summary || "No summary was returned. Please try again."}</ReactMarkdown></div>}
            </div>
            <footer className={styles.footer}><span>Powered by Gemini</span><div>{!isLoading && summary && <button type="button" className={styles.copyButton} onClick={handleCopy}>{copied ? <RiCheckLine size={14} /> : <RiFileCopyLine size={14} />}<span aria-live="polite">{copied ? "Copied" : "Copy"}</span></button>}<button type="button" className={styles.closeButton} onClick={onClose}>Close</button></div></footer>
        </div>
    </dialog>;
}
