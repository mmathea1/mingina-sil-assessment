"use client";

import { Clapperboard } from "lucide-react";
import Link from "next/link";

export default function AppLogo() {
  return (
    <Link
      href="/"
      className="btn btn-ghost flex items-center gap-2 px-3 normal-case text-2xl font-bold logo-font rounded-full hover:bg-blue-100 transition-colors"
    >
      <Clapperboard className="w-7 h-7 mr-2 text-blue-500" />
      <span className="logo-font text-2xl font-bold tracking-wide">
        <span className="text-blue-500">Ming</span>
        <span className="text-gray-800">Movies</span>
      </span>
    </Link>
  );
}
