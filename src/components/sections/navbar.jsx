"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { PiList, PiX, PiArrowUpRight } from "react-icons/pi";
import ThemeSwitch from "../theme-switch";
import styles from "./landing.module.css";

export const Navbar = () => {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const dialogRef = useRef(null);
    const links = [...(session ? [] : [{ label: "Sign in", href: "/auth/login" }])];

    useEffect(() => {
        if (!menuOpen) return;
        const dialog = dialogRef.current;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();
        const desktop = window.matchMedia("(min-width: 640px)");
        const handleResize = () => { if (desktop.matches) setMenuOpen(false); };
        desktop.addEventListener("change", handleResize);
        return () => {
            desktop.removeEventListener("change", handleResize);
            dialog.close();
            document.body.style.overflow = previous;
        };
    }, [menuOpen]);

    return (
        <>
            <header className={styles.navbar}>
                <Link href="/" className={styles.brand}><Image src="/TaskPilot-favicon.png" alt="" width={30} height={30} priority />Team Tasks</Link>
                <div className={styles.navControls}>
                    <ThemeSwitch />
                    <nav className={styles.desktopNav} aria-label="Main navigation">{links.map(link => <Link href={link.href} key={link.label}>{link.label}</Link>)}<Link href={session ? "/teams" : "/auth/signup"} className={styles.navCta}>{session ? "Open dashboard" : "Get started"}<PiArrowUpRight aria-hidden="true" /></Link></nav>
                    <button type="button" className={styles.menuButton} onClick={() => setMenuOpen(true)} aria-label="Open navigation" aria-controls="landing-navigation" aria-expanded={menuOpen}><PiList size={24} /></button></div>
            </header>
            <dialog ref={dialogRef} id="landing-navigation" className={styles.mobileMenu} onClose={() => setMenuOpen(false)} onClick={event => { if (event.target === event.currentTarget) setMenuOpen(false); }} aria-label="Main navigation">
                <button type="button" className={styles.closeMenu} aria-label="Close navigation" onClick={() => setMenuOpen(false)}><PiX size={25} /></button>
                <nav>{links.map(link => <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}<Link href={session ? "/teams" : "/auth/signup"} className={styles.primary} onClick={() => setMenuOpen(false)}>{session ? "Open dashboard" : "Get started"}<PiArrowUpRight aria-hidden="true" /></Link></nav>
            </dialog>
        </>
    );
};
