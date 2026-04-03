"use client";
import Image from "next/image";
import Link from "next/link";
import {
    PiTwitterLogo,
    PiLinkedinLogo,
    PiGithubLogo,
    PiGlobe
} from "react-icons/pi";

const FOOTER_LINKS = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#" },
            { label: "Dashboard", href: "/teams" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Docs", href: "#" },
            { label: "Blog", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "#" },
            { label: "Privacy", href: "#" },
        ],
    },
];

const SOCIAL_LINKS = [
    { icon: PiTwitterLogo, href: "https://x.com/Manav437", label: "Twitter" },
    { icon: PiLinkedinLogo, href: "https://www.linkedin.com/in/manav-gusain", label: "LinkedIn" },
    { icon: PiGithubLogo, href: "https://github.com/manav437", label: "GitHub" },
    { icon: PiGlobe, href: "https://manavtwt.vercel.app", label: "Portfolio" },
];

export default function Footer() {
    return (
        <footer className="w-11/12 max-w-6xl mx-auto mb-12 rounded-[50px] [corner-shape:squircle] shadow-xl p-8 md:p-12 bg-white/40 backdrop-blur-md border border-[#2c2c2c]/10 flex flex-col gap-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="flex flex-col gap-4 max-w-sm">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Image
                            height={32}
                            width={32}
                            alt="Logo"
                            src="/team-tasks.png"
                        />
                        <span className="text-lg font-bold text-slate-900 tracking-tighter">
                            Team Tasks
                        </span>
                    </Link>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        The ultimate platform for modern teams to track progress and stay in sync.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                        {SOCIAL_LINKS.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                className="text-slate-400 hover:text-blue-600 transition-colors"
                            >
                                <social.icon className="text-xl" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-3 gap-12 md:gap-20">
                    {FOOTER_LINKS.map((section) => (
                        <div key={section.title} className="flex flex-col gap-4">
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                                {section.title}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-8 border-t border-[#2c2c2c]/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-400">
                    © {new Date().getFullYear()} Team Tasks. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    <Link href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                        Terms
                    </Link>
                    <Link href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
                        Privacy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
