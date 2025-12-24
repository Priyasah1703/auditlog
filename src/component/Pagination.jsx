import React from "react";

const PAGE_WINDOW = 5;

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const getPageNumbers = () => {
        let start = Math.max(1, currentPage - Math.floor(PAGE_WINDOW / 2));
        let end = start + PAGE_WINDOW - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - PAGE_WINDOW + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const goPrevBlock = () => {
        setCurrentPage((p) => Math.max(1, p - PAGE_WINDOW));
    };

    const goNextBlock = () => {
        setCurrentPage((p) => Math.min(totalPages, p + PAGE_WINDOW));
    };

    return (
        <div className="flex justify-end items-center gap-2 mt-6">

            <button
                onClick={goPrevBlock}
                disabled={currentPage === 1}
                className="px-3 py-0 rounded-full border flex items-center justify-center text-gray-600 border-gray-300 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
                ≪
            </button>


            <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-0 rounded-full border flex items-center justify-center text-gray-600 border-gray-300 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
                ‹
            </button>

            {getPageNumbers()[0] > 1 && <span className="px-1 text-gray-400 ">…</span>}

            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 py-0 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer
                        ${currentPage === page
                            ? "bg-[#1A1A2E] text-white"
                            : "border text-gray-400 hover:bg-gray-100"
                        }`}
                >
                    {page}
                </button>
            ))}

            {getPageNumbers().slice(-1)[0] < totalPages && (
                <span className="px-1 text-gray-400 ">…</span>
            )}


            <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-0 rounded-full border flex items-center justify-center text-gray-600 border-gray-300 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
                ›
            </button>


            <button
                onClick={goNextBlock}
                disabled={currentPage === totalPages}
                className="px-3 py-0 rounded-full border flex items-center justify-center text-gray-600 border-gray-300 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
                ≫
            </button>
        </div>
    );
};

export default Pagination;
