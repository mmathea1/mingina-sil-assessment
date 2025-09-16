"use client";

import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar shadow-md relative bg-base-100">
      <div className="flex-1">
        <a href="" className="btn btn-ghost text-xl">
          Ming Movies
        </a>
      </div>
      <div className="flex-none flex items-center gap-4">
        <div className="form-control">
          <input
            type="text"
            className="input input-bordered w-24 md:w-auto"
            name="Movie Search"
            id="movie-search-bar"
            placeholder="Search movies..."
            aria-label="Search movies"
          />
        </div>
        <ul className="menu menu-horizontal px-1">
          <li className="px-1">Messages</li>
          <li className="px-1">Account</li>
          <li className="px-1">Settings</li>
        </ul>
      </div>
    </nav>
  );
}
