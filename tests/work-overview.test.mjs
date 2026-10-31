import test from "node:test";
import assert from "node:assert/strict";
import { buildWorkOverview, getWorkWindow, getLocalDateKey } from "../src/utils/work-overview.mjs";

const task = (id, dueDate, status = "Not Started") => ({ id, title: id, dueDate, status });

test("deadline lists are disjoint and exclude completed/undated tasks", () => {
    const { groups } = buildWorkOverview([
        task("overdue", "2026-10-30T00:00:00Z"),
        task("today", "2026-10-31T00:00:00Z"),
        task("upcoming", new Date("2026-11-01T00:00:00Z")),
        task("next-week", "2026-11-02T00:00:00Z"),
        task("done", "2026-10-20T00:00:00Z", "Completed"),
        task("no-date", null),
    ], "2026-10-31");
    assert.deepEqual(groups.overdue.map(t => t.id), ["overdue"]);
    assert.deepEqual(groups.today.map(t => t.id), ["today"]);
    assert.deepEqual(groups.thisWeek.map(t => t.id), ["upcoming"]);
});

test("week ends on Sunday, excluding the following Monday", () => {
    assert.equal(getWorkWindow("2026-11-01").before.toISOString(), "2026-11-02T00:00:00.000Z");
    assert.equal(buildWorkOverview([task("monday", "2026-11-02")], "2026-11-01").groups.thisWeek.length, 0);
    assert.equal(getWorkWindow("2026-11-02").endOfWeek, "2026-11-08");
});

test("week calculation crosses years and leap days", () => {
    assert.equal(getWorkWindow("2026-12-31").endOfWeek, "2027-01-03");
    assert.equal(getWorkWindow("2028-02-29").endOfWeek, "2028-03-05");
});

test("invalid calendar dates are rejected", () => {
    for (const date of [null, "", "2026-02-29", "bad"]) assert.throws(() => getWorkWindow(date));
});

test("uses the viewer's local calendar date", () => {
    assert.equal(getLocalDateKey(new Date(2026, 9, 31, 23, 59)), "2026-10-31");
});

test("overdue tasks sort oldest first with stable tie breaking", () => {
    const { groups } = buildWorkOverview([task("b", "2026-10-29"), task("c", "2026-10-01"), task("a", "2026-10-29")], "2026-10-31");
    assert.deepEqual(groups.overdue.map(t => t.id), ["c", "a", "b"]);
});

test("empty data produces empty deadline lists", () => {
    assert.deepEqual(buildWorkOverview([], "2026-10-31").groups, { overdue: [], today: [], thisWeek: [] });
});
