"use client";
import { Sidebar } from "@/components/Sidebar";
import PageHeader from "@/components/dashboard/page-header";
import styles from "@/components/dashboard/dashboard.module.css";

export default function WorkPage() {
    const stats = [
        { label: "Active tasks", value: "12" },
        { label: "Hours logged", value: "32.5" },
        { label: "Completion rate", value: "84%" },
        { label: "Urgent flags", value: "2" },
    ];
    return <div className="dashboard-theme flex min-h-screen bg-canvas"><Sidebar />
        <main className={styles.mainFrame}><div className={styles.content}>
            <PageHeader title="Work" description="The bigger picture, without losing the details." badge="Sample data" />
            <dl className={styles.stats}>{stats.map(stat => <div key={stat.label} className={styles.stat}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
            <div className={styles.workGrid}>
                <section className={styles.panel} aria-labelledby="pipeline-heading"><div className={styles.panelHeading}><h2 id="pipeline-heading">Current pipeline</h2><span>03 PROJECT PHASES</span></div>
                    <ul>{[1, 2, 3].map(phase => <li className={styles.pipelineRow} key={phase}><div><h3>Operational System Audit · Phase {phase}</h3><p>Internal project</p></div><span>Due in {phase + 1} days</span></li>)}</ul>
                </section>
                <section className={styles.panel} aria-labelledby="weekly-progress-heading"><div className={styles.panelHeading}><h2 id="weekly-progress-heading">Weekly progress</h2><span>THIS WEEK</span></div>
                    <div className={styles.progressBody}><p className={styles.progressValue}>84<span className="text-xl text-subtle">%</span></p>
                        <div role="progressbar" aria-labelledby="weekly-progress-heading" aria-valuenow={84} aria-valuemin={0} aria-valuemax={100} className="mt-5 h-1 overflow-hidden bg-raised"><div className="h-full w-[84%] bg-accent" /></div>
                        <p>2 more tasks to reach the weekly goal in this sample. This overview uses example data.</p>
                    </div>
                </section>
            </div>
        </div></main>
    </div>;
}
