"use client";

import { CircleUser, Mail, Search, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AppLogo from "./AppLogo";
import { useSession } from "next-auth/react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [isAuthOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div>
      <nav className="navbar bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 px-4 md:px-8 navbar-header">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1 navbar-start">
            <AppLogo />
          </div>
          <div className="flex-1 flex justify-center navbar-center">
            <form
              className="form-control w-full max-w-2xl flex items-center w-full max-w-sm"
              onSubmit={handleSearch}
            >
              <label className="input flex items-center gap-2 !rounded-full w-64 md:w-80 hover:bg-blue-100 focus:outline-none focus:ring-0 focus-within:border-blue-200 focus-within:shadow-none transition-colors duration-200 group">
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
          <div className="flex-1 flex justify-end gap-2 navbar-end">
            <button className="btn btn-ghost md:hidden">☰</button>
            <div className="hidden md:flex gap-2">
              <button
                className="btn btn-ghost btn-circle hover:bg-blue-100 group tooltip tooltip-bottom focus:outline-none focus:ring-0 border-0 shadow-none"
                data-tip="Messages"
              >
                <Mail className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
              </button>
              <button
                className="btn btn-ghost btn-circle hover:bg-blue-100 group tooltip tooltip-bottom focus:outline-none focus:ring-0 border-0 shadow-none"
                data-tip={session ? session.user?.name : "Profile"}
                onClick={() => setAuthModalOpen(true)}
              >
                <CircleUser className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
              </button>
              <button
                className="btn btn-ghost btn-circle hover:bg-blue-100 group tooltip tooltip-bottom focus:outline-none focus:ring-0 border-0 shadow-none"
                data-tip="Settings"
              >
                <Settings className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <LoginModal isOpen={isAuthOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
