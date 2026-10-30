"use client";
import ThemeSwitch from "@/components/theme-switch";
import { Sidebar } from "@/components/Sidebar";
import PageHeader from "@/components/dashboard/page-header";
import styles from "@/components/dashboard/dashboard.module.css";
import { RiUserLine, RiNotification3Line, RiShieldLine, RiGlobalLine } from "react-icons/ri";

const sections = [
    { title: "Profile", icon: RiUserLine, description: "Your personal details and profile photo." },
    { title: "Security", icon: RiShieldLine, description: "Sign-in settings and workspace privacy." },
    { title: "Messaging", icon: RiNotification3Line, description: "Notifications and alert preferences." },
    { title: "Global preferences", icon: RiGlobalLine, description: "Language, time zone, and regional defaults." },
];
export default function SettingsPage() {
    return <div className="dashboard-theme flex min-h-dvh bg-canvas"><Sidebar />
        <main className={styles.mainFrame}><div className={styles.content}>
            <PageHeader title="Settings" description="A workspace that feels like yours." />
            <section className={styles.panel} aria-labelledby="appearance-heading">
                <div className={styles.panelHeading}>
                    <h2 id="appearance-heading">
                        Appearance
                    </h2>
                    {/* <span>PERSONAL PREFERENCE</span>*/}
                </div>
                <div className={styles.appearance}><div><h3>Color theme</h3><p>Choose a light workspace or a softer dark view. Your choice is saved on this device.</p></div><ThemeSwitch /></div>
            </section>
            <section className={`${styles.panel} mt-6`} aria-labelledby="preferences-heading"><div className={styles.panelHeading}><h2 id="preferences-heading">Account & preferences</h2></div>
                <ul>{sections.map(({ title, icon: Icon, description }) => <li key={title} className={styles.pipelineRow}><div className="flex items-start gap-3"><Icon size={17} className="mt-0.5 shrink-0 text-subtle" aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div></div><span>Coming soon</span></li>)}</ul>
            </section>
            {/* <p className={styles.settingsNote}>More preferences are on the way. Appearance is available now.</p>*/}
        </div></main>
    </div>;
}
