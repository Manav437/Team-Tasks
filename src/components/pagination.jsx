import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export const Pagination = ({ page, setPage, totalPages }) => (
    <nav aria-label="Pagination" className="flex items-center gap-3 text-sm text-slate-500">
        <button
            className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-30 disabled:cursor-default focus-visible:ring-2 focus-visible:ring-blue-300"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
        >
            <HiChevronLeft size={18} />
        </button>
        <span className="tabular-nums">Page <span className="font-medium text-slate-800">{page}</span> of {totalPages}</span>
        <button
            className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-30 disabled:cursor-default focus-visible:ring-2 focus-visible:ring-blue-300"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
        >
            <HiChevronRight size={18} />
        </button>
    </nav>
);
