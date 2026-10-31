import Link from "next/link";
import { RiArrowRightLine, RiCalendarLine } from "react-icons/ri";
import { formatDueDate } from "@/utils/due-date.mjs";
import styles from "./dashboard.module.css";

export default function WorkOverview({ overview }) {
    const { groups, activeTasks, today, endOfWeek } = overview;
    const sections = [
        { key: "overdue", title: "Overdue", description: "Past due · unfinished", empty: "No overdue tasks. You’re all caught up.", color: "text-danger" },
        { key: "today", title: "Due today", description: formatDueDate(today), empty: "No tasks due today.", color: "text-ink" },
        { key: "thisWeek", title: "Due this week", description: today === endOfWeek ? "No later days this week" : `After today · through ${formatDueDate(endOfWeek)}`, empty: "No more tasks due this week.", color: "text-ink" },
    ];
    const stats = [{ label: "Active tasks", value: activeTasks }, ...sections.map(section => ({ label: section.title, value: groups[section.key].length }))];
    return <>
        <dl className={styles.stats}>{stats.map(stat => <div key={stat.label} className={styles.stat}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
        <p className="mt-3 text-xs leading-relaxed text-subtle">Across all your teams. Active tasks include work without a due date; the lists below show unfinished tasks with deadlines.</p>
        <div className="mt-6 grid min-w-0 grid-cols-1 items-start gap-4 xl:grid-cols-3">
            {sections.map(section => <section key={section.key} className={styles.panel} aria-labelledby={`work-${section.key}`}>
                <div className={styles.panelHeading}><div><h2 id={`work-${section.key}`} style={section.key === "overdue" ? { color: "var(--app-danger)" } : undefined}>{section.title}</h2><p className="mt-1.5 text-[10px] text-subtle">{section.description}</p></div><span className="tabular-nums">{groups[section.key].length} {groups[section.key].length === 1 ? "TASK" : "TASKS"}</span></div>
                {groups[section.key].length === 0 ? <p className="px-5 py-8 text-xs leading-relaxed text-muted">{section.empty}</p> : <ul className="divide-y divide-line">{groups[section.key].map(task => <li key={task.id} className="min-w-0 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2"><span className="min-w-0 break-words text-[10px] text-subtle">{task.team.name}</span><span className={`shrink-0 text-[10px] ${task.status === "In Progress" ? "text-progress" : "text-muted"}`}>{task.status}</span></div>
                    <h3 className="mt-2 break-words text-sm font-medium text-ink"><Link className="hover:underline underline-offset-4" href={`/teams/${task.team.id}`}>{task.title}</Link></h3>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><time dateTime={task.dueDate.slice(0, 10)} className={`inline-flex items-center gap-1.5 text-[10px] ${section.color}`}><RiCalendarLine aria-hidden="true" />{formatDueDate(task.dueDate)}</time><Link href={`/teams/${task.team.id}`} aria-label={`Open ${task.team.name} board for ${task.title}`} className="inline-flex min-h-8 items-center gap-1.5 text-[10px] text-muted hover:text-ink">Open board<RiArrowRightLine aria-hidden="true" /></Link></div>
                </li>)}</ul>}
            </section>)}
        </div>
        {activeTasks === 0 && <p className="mt-5 text-xs text-muted">No active tasks yet. <Link className="text-ink underline underline-offset-4" href="/teams">Open Teams</Link> to add work or review completed tasks.</p>}
    </>;
}
