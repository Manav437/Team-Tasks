import { parseDueDate } from "./due-date.mjs";

export function getLocalDateKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getWorkWindow(today) {
    const start = parseDueDate(today);
    if (!start) throw new Error("A valid local date is required");
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + (7 - end.getUTCDay()) % 7);
    const before = new Date(end);
    before.setUTCDate(before.getUTCDate() + 1);
    return { today, endOfWeek: end.toISOString().slice(0, 10), before };
}

export function buildWorkOverview(tasks, today) {
    const { endOfWeek } = getWorkWindow(today);
    const groups = { overdue: [], today: [], thisWeek: [] };
    const dateKey = (value) => value instanceof Date ? value.toISOString().slice(0, 10) : value.slice(0, 10);
    const sorted = tasks.filter(task => task.status !== "Completed" && task.dueDate)
        .sort((a, b) => dateKey(a.dueDate).localeCompare(dateKey(b.dueDate)) || a.title.localeCompare(b.title) || a.id.localeCompare(b.id));
    for (const task of sorted) {
        const due = dateKey(task.dueDate);
        if (due < today) groups.overdue.push(task);
        else if (due === today) groups.today.push(task);
        else if (due <= endOfWeek) groups.thisWeek.push(task);
    }
    return { today, endOfWeek, groups };
}
