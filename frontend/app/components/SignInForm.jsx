"use client";

import { useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <div className="md:grid grid-cols-2 text-center h-screen items-center">
      <div className="">
        <h1 className="text-3xl">Simple Mail Merge</h1>
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
      </div>
    </div>
  );
}
