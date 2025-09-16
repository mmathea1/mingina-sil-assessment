"use client";

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
    <nav className="navbar shadow-md relative bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Ming Movies
        </Link>
      </div>
      <div className="flex-none flex items-center gap-4">
        <form className="form-control" onSubmit={handleSearch}>
          <input
            type="text"
            className="input input-bordered w-24 md:w-auto"
            name="Movie Search"
            id="movie-search-bar"
            placeholder="Search movies..."
            aria-label="Search movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
