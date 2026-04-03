import { Geist, JetBrains_Mono } from "next/font/google";
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
            <body className="antialiased selection:bg-blue-500/20">
                <div className="fixed inset-0 -z-10 h-full w-full bg-[#f0f4f8] overflow-hidden">
                    {/* Atmospheric Glow Components - Soft Light Balance */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="absolute top-[5%] left-[10%] h-[650px] w-[650px] rounded-full bg-blue-400/20 blur-[130px] animate-blob" />
                        <div className="absolute bottom-[0%] right-[5%] h-[550px] w-[550px] rounded-full bg-emerald-400/15 blur-[110px] animate-blob [animation-delay:2s]" />
                        <div className="absolute top-[40%] left-[45%] h-[500px] w-[500px] rounded-full bg-indigo-400/15 blur-[120px] animate-blob [animation-delay:4s]" />
                    </div>

                    {/* Left Side Lines - Muted for Light Mode */}
                    <div
                        className="absolute top-0 left-0 h-full w-[12%] md:w-[6%] opacity-30 pointer-events-none"
                        style={{
                            backgroundImage: `repeating-linear-gradient(45deg, #cbd5e1 0px, #cbd5e1 1px, transparent 1px, transparent 32px)`,
                            maskImage: `linear-gradient(to right, black 30%, transparent 100%)`,
                        }}
                    />

                    {/* Right Side Lines - Muted for Light Mode */}
                    <div
                        className="absolute top-0 right-0 h-full w-[12%] md:w-[6%] opacity-30 pointer-events-none"
                        style={{
                            backgroundImage: `repeating-linear-gradient(-45deg, #cbd5e1 0px, #cbd5e1 1px, transparent 1px, transparent 32px)`,
                            maskImage: `linear-gradient(to left, black 30%, transparent 100%)`,
                        }}
                    />
                </div>

                <SessionProviderWrapper>{children}</SessionProviderWrapper>
            </body>
        </html>
    );
}
