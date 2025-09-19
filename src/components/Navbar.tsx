"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };
  return (
    <nav className="navbar navbar-header shadow-md relative bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Ming Movies
        </Link>
      </div>
      <div className="flex-none flex items-center gap-4">
        <form className="form-control flex items-center w-full max-w-sm" onSubmit={handleSearch}>
          <label className="input input-bordered flex items-center gap-2 !rounded-full w-64 md:w-80 hover:border-blue-500 focus:outline-none focus:ring-0 focus-within:border-blue-500 focus-within:shadow-none transition-colors duration-200 group">
            <Search className="w-5 h-5 opacity-50 group-focus-within:text-blue-500" />
            <input
              type="text"
              className="grow focus:outline-none focus:ring-0 focus:shadow-none"
              name="Movie Search"
              id="movie-search-bar"
              placeholder="Search movies..."
              aria-label="Search movies"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </form>
        <ul className="menu menu-horizontal px-1">
          <li className="px-1">Messages</li>
          <li className="px-1">Account</li>
          <li className="px-1">Settings</li>
        </ul>
      </div>
    </nav>
  );
}
