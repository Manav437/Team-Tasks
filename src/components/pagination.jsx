import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export const Pagination = ({ page, setPage, totalPages }) => (
    <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-1.5 shadow-sm">
        <button
            className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:text-slate-400"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
        >
            <HiChevronLeft size={20} />
        </button>
        
        <div className="flex items-center gap-1.5 px-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Page</span>
            <span className="text-[13px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg min-w-[28px] text-center">{page}</span>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">of</span>
            <span className="text-[13px] font-black text-slate-800">{totalPages}</span>
        </div>

        <button
            className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-30 disabled:hover:bg-slate-50 disabled:hover:text-slate-400"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
        >
            <HiChevronRight size={20} />
        </button>
    </div>
);
