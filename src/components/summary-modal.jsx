// SummaryModal.jsx
"use client";
import { marked } from "marked";

export default function SummaryModal({ open, isLoading, summary, onClose }) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-2xl p-6 relative overflow-y-auto max-h-[80vh]">
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-2 right-3 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-2xl font-bold transition"
                    aria-label="Close"
                    tabIndex={0}
                >
                    &times;
                </button>
                <h1 className="flex items-center mb-4 mx-auto w-fit text-2xl font-extrabold text-slate-800 gap-2">
                    <span className="decoration-slate-600">AI Summary</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path fill="orange" d="M34 6c-1.368 4.944-3.13 6.633-8 8c4.87 1.367 6.632 3.056 8 8c1.368-4.944 3.13-6.633 8-8c-4.87-1.367-6.632-3.056-8-8m-14 8c-2.395 8.651-5.476 11.608-14 14c8.524 2.392 11.605 5.349 14 14c2.395-8.651 5.476-11.608 14-14c-8.524-2.392-11.605-5.349-14-14" />
                    </svg>
                </h1>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="loader3" aria-label="Loading" />
                        <p className="text-gray-600 mt-2">Thinking...</p>
                    </div>
                ) : (
                    <div
                        className="prose border-2 border-blue-100 bg-linear-to-b from-[#ddf2f4] to-white rounded-lg p-4 max-w-none"
                        dangerouslySetInnerHTML={{ __html: marked(summary) }}
                    />
                )}

                <a
                    href="https://gemini.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-end gap-1 text-xs text-gray-500 hover:underline transition"
                    aria-label="Powered by Gemini (opens in new tab)"
                >
                    <span className="flex items-center gap-1">
                        Response generated using
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                            className="inline-block align-middle"
                        >
                            <path fill="orange" d="M34 6c-1.368 4.944-3.13 6.633-8 8c4.87 1.367 6.632 3.056 8 8c1.368-4.944 3.13-6.633 8-8c-4.87-1.367-6.632-3.056-8-8m-14 8c-2.395 8.651-5.476 11.608-14 14c8.524 2.392 11.605 5.349 14 14c2.395-8.651 5.476-11.608 14-14c-8.524-2.392-11.605-5.349-14-14" />
                        </svg>
                        <span className="ml-0 font-semibold text-black">Gemini</span>
                    </span>
                </a>
            </div>
        </div>
    );
}