import Image from "next/image";
import Link from "next/link";

const FOOTER_SECTIONS = [
    {
        title: "Index",
        links: [
            { label: "Explore", href: "#" },
            { label: "Services", href: "#" },
            { label: "About", href: "#" },
        ],
    },
    {
        title: "Products",
        links: [
            { label: "Supply", href: "#" },
            { label: "Dashboard", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Feed", href: "#" },
            { label: "Thoughts", href: "#" },
            { label: "Stack", href: "#" },
        ],
    },
    {
        title: "Connect",
        links: [
            {
                label: "Twitter",
                href: "https://x.com/Manav437",
                external: true,
            },
            {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/manav-gusain/",
                external: true,
            },
            {
                label: "Portfolio",
                href: "https://manav-gusain.onrender.com/",
                external: true,
            },
        ],
    },
];

const ArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        className="absolute right-[-18px] opacity-0 group-hover:opacity-100 transition-all duration-300"
    >
        <path
            fill="currentColor"
            d="m16 8.4l-8.9 8.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7L14.6 7H7q-.425 0-.712-.288T6 6t.288-.712T7 5h10q.425 0 .713.288T18 6v10q0 .425-.288.713T17 17t-.712-.288T16 16z"
        />
    </svg>
);

export default function Footer() {
    return (
        <footer className="w-11/12 max-w-6xl mx-auto mb-8 rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 bg-slate-800/95 text-slate-200">
            <div className="flex items-center gap-4 mb-8 md:mb-0">
                <Image
                    alt="Globe icon"
                    height={40}
                    width={40}
                    src="/footer-icon-1.png"
                />
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Image
                        alt="TaskPilot logo"
                        height={40}
                        width={40}
                        src="/footer-icon-2.png"
                    />
                </Link>
            </div>

            <nav className="flex-1 w-full">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                    {FOOTER_SECTIONS.map((section) => (
                        <div
                            key={section.title}
                            className="flex flex-col items-center md:items-start gap-4"
                        >
                            <h4 className="font-bold text-white underline underline-offset-8 decoration-slate-600">
                                {section.title}
                            </h4>
                            <ul className="flex flex-col gap-2.5 items-center md:items-start">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            target={
                                                link.external
                                                    ? "_blank"
                                                    : "_self"
                                            }
                                            className="relative flex items-center gap-1 cursor-pointer hover:text-blue-300 transition-colors group text-sm"
                                        >
                                            {link.label}
                                            {link.external && <ArrowIcon />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl mt-10 h-16 ring-2 ring-white bg-gradient-to-r from-blue-800 via-indigo-200 to-slate-400 opacity-50"></div>
            </nav>
        </footer>
    );
}
