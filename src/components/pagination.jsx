export const Pagination = ({ page, setPage, totalPages }) => (
    <div className="w-full flex justify-center items-center gap-2 mt-6 mb-4 md:mb-0">
        <button
            className="cursor-pointer px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
        >
            ←
        </button>
        <span className="px-2 text-sm text-gray-700">
            Page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages}</span>
        </span>
        <button
            className="cursor-pointer px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
        >
            →
        </button>
    </div>
);
