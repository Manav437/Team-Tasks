import { Geist, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Team Tasks",
    description:
        "The ultimate dashboard for managers to track progress and assign tasks.",
    icons: {
        icon: "/TaskPilot-favicon.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${geistSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <body className="antialiased selection:bg-white/20">
                <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('team-tasks-theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}` }} />
                <ThemeProvider><SessionProviderWrapper>{children}</SessionProviderWrapper></ThemeProvider>
            </body>
        </html>
    );
}
