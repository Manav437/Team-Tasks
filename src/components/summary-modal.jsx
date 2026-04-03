"use client";
import { useEffect, useState } from "react";
import { marked } from "marked";
import { RiGeminiFill, RiCloseLine, RiFileCopyLine, RiCheckLine } from "react-icons/ri";

export default function SummaryModal({ open, isLoading, summary, onClose }) {
    const [copied, setCopied] = useState(false);

    const [displayedSummary, setDisplayedSummary] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            setCopied(false);
            if (!isLoading && summary) {
                startTypewriter(summary);
            }
        } else {
            document.body.style.overflow = "";
            setDisplayedSummary("");
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open, isLoading, summary]);

    const startTypewriter = (text) => {
        setIsTyping(true);
        setDisplayedSummary("");
        let i = 0;
        const speed = 2;

        const timer = setInterval(() => {
            setDisplayedSummary(text.slice(0, i));
            i += 5;
            if (i > text.length) {
                setDisplayedSummary(text);
                setIsTyping(false);
                clearInterval(timer);
            }
        }, 10);
    };

    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(summary);
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
        >
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] modal-animate-in">
                <div className="mx-auto px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        {/* <div className="bg-indigo-600 p-1.5 rounded-lg shadow-indigo-200 shadow-lg">
                            <RiGeminiFill className="text-white text-xl" />
                        </div> */}
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">AI Summary</h2>
                    </div>
                </div>

                <div className="border-t border-slate-200 flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                            <div className="ai-loader mb-6" />
                            <p className="text-indigo-600 font-medium tracking-wide">
                                Analyzing team performance...
                            </p>
                            <p className="text-slate-400 text-sm mt-1">Gemini is thinking</p>
                        </div>
                    ) : (
                        <div className="relative group">
                            {displayedSummary && (
                                <div
                                    className="prose prose-slate max-w-none text-slate-700 bg-indigo-50/30 rounded-xl p-5 border border-indigo-100/50 leading-relaxed animate-fade-in"
                                    dangerouslySetInnerHTML={{ __html: marked(displayedSummary) }}
                                />
                            )}

                            {!isLoading && summary && !isTyping && (
                                <button
                                    onClick={handleCopy}
                                    className="cursor-pointer absolute top-2 right-2 p-2 rounded-lg bg-white shadow-sm border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-90"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <RiCheckLine className="text-green-500" /> : <RiFileCopyLine />}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <RiGeminiFill className="text-indigo-500 text-sm" />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Powered by Gemini AI</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="cursor-pointer hover:underline underline-offset-2 text-sm font-semibold text-indigo-600 hover:bg-black/5 px-2 py-1 rounded-lg hover:text-indigo-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
