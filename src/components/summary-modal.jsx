"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { RiGeminiFill, RiCloseLine, RiFileCopyLine, RiCheckLine } from "react-icons/ri";

export default function SummaryModal({ open, isLoading, summary, onClose }) {
    const [copied, setCopied] = useState(false);

    const [displayedSummary, setDisplayedSummary] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        setCopied(false);
        setDisplayedSummary("");
        setIsTyping(false);
        let timer;
        if (!isLoading && summary) {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                setDisplayedSummary(summary);
            } else {
                setIsTyping(true);
                let length = 0;
                timer = setInterval(() => {
                    length += 5;
                    setDisplayedSummary(summary.slice(0, length));
                    if (length >= summary.length) {
                        setIsTyping(false);
                        clearInterval(timer);
                    }
                }, 10);
            }
        }
        return () => {
            clearInterval(timer);
            document.body.style.overflow = previousOverflow;
        };
    }, [open, isLoading, summary]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-summary-title"
        >
            <div className="bg-white w-full max-w-xl rounded-md shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] modal-animate-in">
                <div className="mx-auto px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        {/* <div className="bg-indigo-600 p-1.5 rounded-lg shadow-indigo-200 shadow-lg">
                            <RiGeminiFill className="text-white text-xl" />
                        </div> */}
                        <h2 id="ai-summary-title" className="text-xl font-bold text-black tracking-normal">A.I. Summary</h2>
                    </div>
                </div>

                <div className="border-t border-slate-200 flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div role="status" aria-live="polite" className="flex flex-col items-center justify-center py-16">
                            <div aria-hidden="true" className="relative mb-6 flex h-20 w-20 items-center justify-center">
                                <span className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600 motion-safe:animate-spin" />
                                <span className="absolute inset-3 rounded-full bg-indigo-50 motion-safe:animate-pulse" />
                                <RiGeminiFill className="relative text-3xl text-indigo-600" />
                            </div>
                            <p className="text-black font-medium tracking-wide">
                                Analyzing team performance...
                            </p>
                            <p className="text-slate-400 text-sm mt-1">Gemini is thinking</p>
                        </div>
                    ) : (
                        <div className="relative group">
                            {displayedSummary && (
                                <div
                                    className="prose prose-slate max-w-none text-slate-700 bg-indigo-50/30 rounded-xl p-5 border border-indigo-100/50 leading-relaxed animate-fade-in"
                                >
                                    <ReactMarkdown skipHtml disallowedElements={["img"]}>{displayedSummary}</ReactMarkdown>
                                </div>
                            )}

                            {!isLoading && summary && !isTyping && (
                                <button
                                    onClick={handleCopy}
                                    className="cursor-pointer absolute top-2 right-2 p-1.5 rounded-md border hover:shadow-sm  border-slate-200 text-slate-500 hover:text-slate-700 hover:border-indigo-200"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <RiCheckLine size={16} className="text-green-500" /> : <RiFileCopyLine size={16} />}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <RiGeminiFill className="text-slate-700 text-sm" />
                        <span className="text-xs font-semibold text-slate-400">Powered by <span className="text-slate-600 font-bold tracking-wide underline uppercase underline-offset-2">Gemini AI</span></span>
                    </div>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-sm ring-2 ring-rose-200 font-semibold text-rose-600 bg-rose-100 hover:bg-rose-200 px-2 py-1 rounded-md hover:text-rose-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
