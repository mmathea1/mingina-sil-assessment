"use client";

import { CircleUser, Mail, Search, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AppLogo from "./AppLogo";

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
    <nav className="navbar bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 navbar-header shadow-md bg-base-100 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="navbar-start flex-1">
          <AppLogo />
        </div>
        <div className="navbar-center hidden md:flex flex-none flex items-center gap-4">
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
        </div>
        <div className="flex items-center gap-2 navbar-end">
          <button className="btn btn-ghost md:hidden">☰</button>
          <div className="hidden md:flex gap-2">
            <button className="btn btn-ghost btn-circle">
              <Mail className="w-5 h-5 text-white-500 hover:text-blue-500 transition-colors" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <CircleUser className="w-5 h-5 text-white-500 hover:text-blue-500 transition-colors" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <Settings className="w-5 h-5 text-white-500 hover:text-blue-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
