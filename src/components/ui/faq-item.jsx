"use client";

export const FaqItem = ({ item, isOpen, onToggle }) => {
    return (
        <div className="border border-slate-200/60 rounded-xl bg-white/50 backdrop-blur-sm overflow-hidden transition-all duration-300">
            <button
                onClick={onToggle}
                className="cursor-pointer w-full flex justify-between items-center px-6 py-5 text-left group"
                aria-expanded={isOpen}
            >
                <span className="font-medium text-slate-900 transition-colors">
                    {item.question}
                </span>

                <div className="flex items-center justify-center ml-4">
                    <svg
                        className={`w-5 h-5 text-slate-800 transition-transform duration-300 ease-in-out ${
                            isOpen ? "rotate-180 text-blue-600" : "rotate-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100/50 mt-1 pt-4">
                        {item.answer}
                    </div>
                </div>
            </div>
        </div>
    );
};
