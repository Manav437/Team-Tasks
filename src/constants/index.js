export const sliderImages = [
    "https://cdn.worldvectorlogo.com/logos/csgo-4.svg",
    "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Esports_organization_Fnatic_logo.svg/1200px-Esports_organization_Fnatic_logo.svg.png",
    "https://owcdn.net/img/62bbeba74d5cb.png",
    "https://img.icons8.com/?size=100&id=30888&format=png&color=000000",
    "https://upload.wikimedia.org/wikipedia/commons/1/16/100_Thieves_logo.svg",
    "https://1000logos.net/wp-content/uploads/2021/04/Pirelli-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sentinels_logo.svg/1200px-Sentinels_logo.svg.png",
    "https://doctorhead.ru/upload/dev2fun.imagecompress/webp/resize_cache/iblock/91f/smf06uteq7yibiyolyup3o2xslzbkwsn/320_198_2/pulsar_320.webp",
    "https://pbs.twimg.com/media/F6rSmGDWgAARqUX.png",
    "https://upload.wikimedia.org/wikipedia/commons/8/83/MSC_Cruises_Logo.png",
    "https://upload.wikimedia.org/wikipedia/en/1/12/Esports_organization_G2_Esports_logo.svg",
    "https://wiki.leagueoflegends.com/en-us/images/Riot_Games_logo_icon.png?5d4dd",
];

export const faqContent = [
    {
        question: "What is TaskPilot?",
        answer: "TaskPilot is a platform that helps managers assign tasks, track progress, and manage teams efficiently from a single dashboard.",
    },
    {
        question: "How do I add a new team member?",
        answer: "Go to your team dashboard, click 'Add Member', and enter the new member’s details to invite them to your team.",
    },
    {
        question: "Can I assign tasks to multiple team members?",
        answer: "Yes, you can assign a single task to one or more team members when creating or editing a task.",
    },
    {
        question: "How do I track the progress of my team?",
        answer: "Use the dashboard to view real-time updates on task completion, team activity, and overall project progress.",
    },
];

export const STAGES = [
    { value: "Not Started", label: "Not Started" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
];

export const STATUS_STYLES = {
    "Not Started": { text: "text-gray-700 bg-gray-100", dot: "bg-gray-400" },
    "In Progress": {
        text: "text-yellow-800 bg-yellow-100",
        dot: "bg-yellow-400",
    },
    Completed: { text: "text-green-800 bg-green-100", dot: "bg-green-500" },
};

export const TABLE_COLUMNS = [
    { label: "S.No.", align: "center" },
    { label: "Team Name", align: "left" },
    { label: "Task Title", align: "left" },
    { label: "Stage", align: "left" },
    { label: "Actions", align: "center" },
];
