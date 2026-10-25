// Deadlines are calendar dates, stored at UTC midnight to avoid timezone shifts.
export function parseDueDate(value) {
    if (value === null || value === "") return null;
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error("Due date must be a valid date in YYYY-MM-DD format");
    }
    const date = new Date(`${value}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
        throw new Error("Due date must be a valid date in YYYY-MM-DD format");
    }
    return date;
}

export function isTaskOverdue(task, today = new Date()) {
    if (!task.dueDate || task.status === "Completed") return false;
    const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    return task.dueDate.slice(0, 10) < localToday;
}

export function formatDueDate(value) {
    return new Date(value).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
    });
}
