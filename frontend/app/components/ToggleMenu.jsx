"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ToggleMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="text-blue md:flex text-center mr-12 h-20">
      <button
        className="sm:hidden btn mt-4"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {menuOpen ? (
        <div className="sm:hidden flex flex-col">
          <Link
            href="/signup"
            className={`my-2 text-sm font-semibold ${
              pathname == "/signup" ? "border-b-2 border-blue pb-1" : ""
            }`}
          >
            Sign Up
          </Link>
          <Link
            href="/signin"
            className={`my-2 text-sm font-semibold ${
              pathname == "/signin" ? "border-b-2 border-blue pb-1" : ""
            }`}
          >
            Sign In
          </Link>
        </div>
      ) : null}
    </div>
  );
}
