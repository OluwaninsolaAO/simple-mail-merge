"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";

export default function ToggleMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="text-amber-500 md:flex text-center fixed ml-auto mr-8 mt-5 top-0 right-0">
      <button
        className="sm:hidden btn"
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
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {menuOpen ? (
        <div className="sm:hidden flex flex-col font-semibold">
          <Link href="/signup" className="my-2">
            Sign Up
          </Link>
          <Link href="/signin" className="mb-4">
            Sign In
          </Link>
        </div>
      ) : null}
    </div>
  );
}
