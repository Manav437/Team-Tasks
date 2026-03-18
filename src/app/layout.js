import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
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
    title: "Task Pilot",
    description:
        "The ultimate dashboard for managers to track progress and assign tasks.",
    icons: {
        icon: "/TaskPilot-favicon.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
            >
                <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute top-[15%] left-[15%] h-[500px] w-[500px] rounded-full bg-blue-500/30 blur-[90px] animate-blob" />

                        <div className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-emerald-400/30 blur-[80px] animate-blob [animation-delay:2s]" />

                        <div className="absolute top-[40%] left-[40%] h-[400px] w-[400px] rounded-full bg-slate-400/20 blur-[90px] animate-blob [animation-delay:4s]" />
                    </div>

                    <div
                        className="absolute top-0 left-0 h-full w-[10%] md:w-[5%] opacity-10"
                        style={{
                            backgroundImage: `repeating-linear-gradient(45deg, #64748b 0px, #64748b 1px, transparent 1px, transparent 25px)`,
                            maskImage: `linear-gradient(to right, black 60%, transparent 100%)`,
                        }}
                    />

                    <div
                        className="absolute top-0 right-0 h-full w-[10%] md:w-[5%] opacity-10"
                        style={{
                            backgroundImage: `repeating-linear-gradient(-45deg, #64748b 0px, #64748b 1px, transparent 1px, transparent 25px)`,
                            maskImage: `linear-gradient(to left, black 60%, transparent 100%)`,
                        }}
                    />
                </div>

                <SessionProviderWrapper>{children}</SessionProviderWrapper>
            </body>
        </html>
    );
}
