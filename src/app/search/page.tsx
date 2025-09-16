"use client";

import { useSearchParams } from "next/navigation";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <div className="p-6">
      <h1>Search results for: {query} </h1>
      {/* displaying results will be implemented later */}
    </div>
  );
}
