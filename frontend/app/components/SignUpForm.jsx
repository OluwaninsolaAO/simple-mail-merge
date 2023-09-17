"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <div className="lg:grid grid-cols-2 text-center h-screen items-center">
      <div className="mb-10 lg:mb-0 lg:my-0">
        <h1 className="text-2xl md:text-4xl text-content font-semibold">
          Simple Mail Merge
        </h1>
      </div>
      <div className="">
        <form onSubmit={handleSubmit} className="text-center">
          <div className="mb-2">
            <label>Email</label>
            <input
              className="focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password </label>
            <input
              type="password"
              className=""
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Log In
          </button>
        </form>
        <p className="mt-3">
          Do not have an account? <Link className="text-blue-800" href="/signup">Sign Up here</Link>
        </p>
      </div>
    </div>
  );
}
