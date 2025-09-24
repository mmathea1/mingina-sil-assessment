import SearchResultsPage from "@/components/SearchResultsPage";
import { Suspense } from "react";

export default async function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResultsPage />
    </Suspense>
  );
}
