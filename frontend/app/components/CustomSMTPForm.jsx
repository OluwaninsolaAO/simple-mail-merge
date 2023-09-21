"use client"

import React from "react";
import { useState } from "react";

export default function CustomSMTPForm() {
  const [username, setUserName] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [server, setSmtpServer] = useState("");
  const [port, setSmtpPort] = useState("");
  const [rate, setSmtpRate] = useState("");
  const url = 'http://0.0.0.0:5000/api/v1';

  async function handleSubmit(e) {
    e.preventDefault();
    const smtpData = {
        username,
        alias,
        password,
        server,
        port,
        rate
    }
    console.log(smtpData);
  }

  return (
    <div className="w-full lg:w-1/2 py-16 pt-8 px-12 text-center">
      {/* The user will be able to set up a new SMTP configuration here */}
      <h2 className="text-3xl mb-4">Custom SMTP Configuration</h2>
      <form onSubmit={handleSubmit} className="">
        <div className="mt-2">
          <input
            type="text"
            placeholder="User Name"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="border border-blue py-1 px-2 w-full"
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Alias"
            id="alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            required
            className="border border-blue py-1 px-2 w-full"
          />
        </div>
        <div className="mt-2">
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-blue py-1 px-2 w-full"
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            placeholder="SMTP Server"
            id="smtpServer"
            value={server}
            onChange={(e) => setSmtpServer(e.target.value)}
            required
            className="border border-blue py-1 px-2 w-full"
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            placeholder="SMTP Port"
            id="smtpPort"
            value={port}
            onChange={(e) => setSmtpPort(e.target.value)}
            required
            className="border border-blue py-1 px-2 w-full"
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            placeholder="SMTP Rate"
            id="smtpRate"
            value={rate}
            onChange={(e) => setSmtpRate(e.target.value)}
            required
            className="border border-blue py-1 px-2 w-full"
          />
        </div>
        <div className="mt-3">
          <button className="w-full bg-blue py-3 text-center text-white hover:bg-white hover:text-blue border hover:border-blue transition ease-out duration-300">
            Add SMTP Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
