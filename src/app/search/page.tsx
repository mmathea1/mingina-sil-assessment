import SearchResultsPage from "@/components/SearchResultsPage";

export default async function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  return <SearchResultsPage searchParams={searchParams} />;
}
