"use client";

import { useState } from "react";
import Link from "next/link";

export default function SmtpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password, firstName, lastName);
  }

  return (
    <div className="lg:grid grid-cols-2 text-center h-screen items-center">
      <div className="mb-10 lg:mb-0 lg:my-0">
        <h1 className="text-2xl md:text-4xl text-content font-semibold text-amber-600">
          SMTP Configuration
        </h1>
      </div>
      <div className="">
        <form onSubmit={handleSubmit} className="text-center">
        <div className="mb-2">
            <label>Username</label>
            <input
              className="focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Alias</label>
            <input
              className="focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
            <label>Auth Password </label>
            <input
              type="password"
              className=""
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email Volume</label>
            <input
              type="password"
              className=""
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Add Configuration
          </button>
        </form>
        <p className="mt-3">
          Already have an account? <Link className="text-amber-600" href="/signin">Sign In here</Link>
        </p>
      </div>
    </div>
  );
}
