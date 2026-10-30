"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { PiArrowRight, PiCheck, PiSparkle, PiUsersThree, PiListChecks, PiLockKey } from "react-icons/pi";
import { Navbar } from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import FaqSection from "@/components/sections/faq-section";
import DitherBackground from "@/components/auth/dither-background";
import styles from "@/components/sections/landing.module.css";

const features = [
    { icon: PiUsersThree, title: "A home for every team.", text: "Organize your teams into dedicated boards. Keep every workstream in view without jumping between tools." },
    { icon: PiListChecks, title: "Know what moves next.", text: "Capture tasks, set deadlines, and track work from not started to completed. Spot overdue tasks before they slip." },
    { icon: PiSparkle, title: "The update, already written.", text: "Turn your team's task progress into a concise AI summary, with suggested next steps for your review." },
    { icon: PiLockKey, title: "Your workspace, protected.", text: "Sign in with Google or email and password. Your teams and tasks stay connected to your account." },
];
const columns = [
    { title: "Not Started", color: "#a3a3a3", tasks: [{ title: "Plan the next sprint", note: "Outline priorities for the team", date: "Due 12 Nov" }, { title: "Review onboarding flow", note: "Gather feedback and next steps", date: "Due 14 Nov" }] },
    { title: "In Progress", color: "var(--app-progress)", tasks: [{ title: "Update the product brief", note: "Bring the latest decisions together", date: "Due 10 Nov" }] },
    { title: "Completed", color: "#6ee7b7", tasks: [{ title: "Publish release notes", note: "Ready for the next chapter", date: "Completed" }] },
];

export default function Home() {
    const { data: session } = useSession();
    const destination = session ? "/teams" : "/auth/signup";
    const landingRef = useRef(null);
    useEffect(() => {
        const sections = [...landingRef.current.querySelectorAll("[data-reveal]")];
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (motion.matches || !("IntersectionObserver" in window)) return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.dataset.reveal = "visible";
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });
        sections.forEach(section => {
            section.dataset.reveal = section.getBoundingClientRect().top >= window.innerHeight ? "pending" : "visible";
            observer.observe(section);
        });
        const revealAll = () => {
            if (!motion.matches) return;
            observer.disconnect();
            sections.forEach(section => { section.dataset.reveal = "visible"; });
        };
        motion.addEventListener("change", revealAll);
        return () => {
            observer.disconnect();
            motion.removeEventListener("change", revealAll);
            sections.forEach(section => { section.dataset.reveal = "visible"; });
        };
    }, []);
    return (
        <main ref={landingRef} className={styles.landing}>
            <Navbar />
            <section className={styles.hero}>
                <DitherBackground className={styles.dither} />
                <div className={styles.heroShade} aria-hidden="true" />
                <div className={styles.heroContent}>
                    <p className={styles.eyebrow}>
                        <span className={styles.signal} /> A little less admin. A little more progress.
                    </p>
                    <h1>Less chasing.<br /><span>More moving forward.</span></h1>
                    <p className={styles.lead}>A quieter way to manage your teams. Keep tasks organized,<br className={styles.desktopBreak} /> deadlines visible, and progress in focus - all in one place.</p>
                    <div className={styles.actions}>
                        <Link href={destination} className={styles.primary}>
                            {session ? "Open workspace" : "Create your workspace"}
                            <PiArrowRight aria-hidden="true" />
                        </Link>
                        {/* <Link href="#workspace-preview" className={styles.secondary}>Take a look <span aria-hidden="true">↘</span></Link>*/}
                    </div>
                    <p className={styles.heroNote}>Built for managers. Designed to stay out of your way.</p>
                </div>
            </section>

            <section data-reveal="visible" id="workspace-preview" className={styles.previewSection} aria-label="Example task board">
                <div className={styles.previewCaption}><span>YOUR WORK, AT A GLANCE</span><span>EXAMPLE WORKSPACE</span></div>
                <div className={styles.preview}>
                    <div className={styles.previewBar}><span className={styles.previewBreadcrumb}>Workspace <span>/</span> Product team</span><span className={styles.previewTag}>Task board</span></div>
                    <div className={styles.boardHeading}>
                        <div>
                            {/* <p className={styles.eyebrow}>KEEP THE TEAM MOVING</p>*/}
                            <h2>Product team</h2>
                        </div>
                        <span className={styles.taskCount}>4 tasks · 1 completed</span>
                    </div>
                    <div className={styles.board}>
                        {columns.map(column => <div className={styles.column} key={column.title}>
                            <div className={styles.columnTitle}><span><i style={{ background: column.color }} />{column.title}</span><span>{column.tasks.length}</span></div>
                            {column.tasks.map(task => <div className={styles.task} key={task.title}><h3>{task.title}</h3><p>{task.note}</p><span className={styles.taskDate}>{column.title === "Completed" && <PiCheck aria-hidden="true" />}{task.date}</span></div>)}
                        </div>)}
                    </div>
                    <div className={styles.previewFoot}>
                        <PiSparkle aria-hidden="true" /><span>The details in one place. The bigger picture, always in reach.</span>
                    </div>
                </div>
            </section>

            <section data-reveal="visible" id="features" className={styles.features}>
                <div className={styles.sectionHeading}><p className={styles.eyebrow}>FOCUS ON WHAT MATTERS</p><h2>Everything in order.<br /><span>Nothing in your way.</span></h2><p>Just the tools you need to keep your teams on track.</p></div>
                <div className={styles.featureGrid}>{features.map(({ icon: Icon, title, text }, index) => <article key={title} className={styles.feature}><div className={styles.featureTop}><Icon size={25} aria-hidden="true" /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
            </section>

            <FaqSection />

            <section data-reveal="visible" className={styles.cta}>
                {/* <p className={styles.eyebrow}>
                    MAKE ROOM FOR BETTER WORK
                </p>*/}
                <h2 className="p-3">Your next clear day<br /><span>starts here.</span></h2>
                <Link href={destination} className={styles.primary}>
                    {session ? "Back to your workspace" : "Get started with Team Tasks"}
                    <PiArrowRight aria-hidden="true" />
                </Link>
            </section>

            <Footer />
        </main>
    );
}
