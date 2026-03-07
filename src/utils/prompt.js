export function buildTeamSummaryPrompt(team) {
    const taskList =
        team.tasks.length > 0
            ? team.tasks.map((t) => `- ${t.title}: ${t.status}`).join("\n")
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
