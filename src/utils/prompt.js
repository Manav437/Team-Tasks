export function buildTeamSummaryPrompt(team) {
    const taskList =
        team.tasks.length > 0
            ? team.tasks
                  .map((t) => {
                      const due = t.dueDate
                          ? `, due ${new Date(t.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                          : "";
                      const desc = t.description ? ` — ${t.description}` : "";
                      return `- ${t.title}: ${t.status}${due}${desc}`;
                  })
                  .join("\n")
            : "No tasks assigned.";

    return `You are a project management assistant.
Analyze the following team and respond in **Markdown** with:
- A bold team name as a heading and underline, fit-content
- A bullet summary of task progress
- A bullet for risks or blockers
- A bullet for suggested next actions
Team Name: ${team.name}
Tasks:
${taskList}
Keep it concise and formatted nicely.`;
}
