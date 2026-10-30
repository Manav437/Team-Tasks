"use client";

import { useEffect, useId, useRef, useState } from "react";
import { RiAlertLine, RiLogoutBoxRLine } from "react-icons/ri";
import styles from "./confirm-modal.module.css";

export default function ConfirmModal({ open, title, description, confirmLabel = "Confirm", pendingLabel = "Working…", destructive = false, onConfirm, onClose }) {
    const dialogRef = useRef(null);
    const cancelRef = useRef(null);
    const busyRef = useRef(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const id = useId();

    useEffect(() => {
        if (!open) return;
        const dialog = dialogRef.current;
        const opener = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        setError("");
        dialog.showModal();
        cancelRef.current?.focus();
        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
            if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
        };
    }, [open]);

    const close = () => { if (!busyRef.current) onClose(); };
    const confirm = async () => {
        if (busyRef.current) return;
        busyRef.current = true;
        setBusy(true);
        setError("");
        try {
            await onConfirm();
            onClose();
        } catch (failure) {
            setError(failure instanceof Error ? failure.message : "Something went wrong. Please try again.");
        } finally {
            busyRef.current = false;
            setBusy(false);
        }
    };

    if (!open) return null;
    const Icon = destructive ? RiAlertLine : RiLogoutBoxRLine;
    return <dialog ref={dialogRef} className={styles.modal} role="alertdialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} aria-busy={busy} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
        <div className={styles.content}>
            <div className={`${styles.icon} ${destructive ? styles.dangerIcon : ""}`}><Icon size={21} aria-hidden="true" /></div>
            <h2 id={`${id}-title`}>{title}</h2>
            <p id={`${id}-description`}>{description}</p>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <div className={styles.actions}>
                <button ref={cancelRef} type="button" className={styles.cancel} disabled={busy} onClick={close}>Cancel</button>
                <button type="button" className={`${styles.confirm} ${destructive ? styles.destructive : ""}`} disabled={busy} onClick={confirm}>{busy && <span className={styles.spinner} aria-hidden="true" />}{busy ? pendingLabel : confirmLabel}</button>
            </div>
            <span className={styles.srOnly} role="status">{busy ? pendingLabel : ""}</span>
        </div>
    </dialog>;
}
