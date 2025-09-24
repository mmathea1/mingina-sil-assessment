"use client";

import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate 5 page numbers on every page load

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    // include current page, two before and two after
    let startPage = Math.max(1, currentPage - 2);
    let endPage = startPage + maxVisible - 1;

    // if endPage exceed totalPages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <aside className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 flex gap-3 shadow-lg items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 transition"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded-full transition ${
            p === currentPage
              ? "bg-blue-500 text-white font-bold text-lg scale-105"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 transition"
      >
        Next
      </button>
    </aside>
  );
}
