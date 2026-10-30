import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export const Pagination = ({ page, setPage, totalPages }) => (
    <nav aria-label="Pagination" className="flex items-center gap-3 text-sm text-muted">
        <button
            className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-md hover:text-ink hover:bg-raised transition-colors disabled:opacity-30 disabled:cursor-default focus-visible:ring-2 focus-visible:ring-blue-300"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
        >
            <HiChevronLeft size={18} />
        </button>
        <span className="tabular-nums">Page <span className="font-medium text-ink">{page}</span> of {totalPages}</span>
        <button
            className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-md hover:text-ink hover:bg-raised transition-colors disabled:opacity-30 disabled:cursor-default focus-visible:ring-2 focus-visible:ring-blue-300"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
        >
            <HiChevronRight size={18} />
        </button>
    </nav>
);
