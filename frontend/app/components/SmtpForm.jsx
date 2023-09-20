"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomSMTPForm from "./CustomSMTPForm";

export default function SmtpForm() {
  const [selectedConfig, setSelectedConfig] = useState(null);
  const smtpConfigurations = [
    {
      username: "gmail",
      alias: "Gmail",
      password: "gmail-password",
      smtpServer: "smtp.gmail.com",
      smtpPort: "587",
      smtpRate: "100",
    },
    {
      username: "yahoo",
      alias: "Yahoo",
      password: "yahoo-password",
      smtpServer: "smtp.mail.yahoo.com",
      smtpPort: "465",
      smtpRate: "100",
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userName, alias, smtpServer, smtpPort, smtpRate);
  }

  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 items-center bg-white rounded mx-auto overflow-hidden">
        <div className="w-full lg:w-1/2 flex flex-col p-12">
          {smtpConfigurations.length === 0 ? (
            <p className="text-center">
              You have not set up any SMTP configurations yet.
            </p>
          ) : (
            <p className="mb-4">
              Select an SMTP configuration to use for your mail merge.
            </p>
          )}
          {smtpConfigurations.map((config, index) => (
            <div className="flex flex-col mb-5" key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={config.username}
                    name="smtpConfig"
                    value={config.username}
                    checked={selectedConfig === config.username}
                    onChange={() => setSelectedConfig(config.username)}
                    style={{ width: "16px", height: "16px" }}
                    className="mr-2"
                  />
                  <h2 className="text-2xl">{config.alias}</h2>
                </div>
                <div className="flex">
                  <button className="w-fit bg-blue text-white rounded px-3 text-center border hover:border-blue hover:bg-white hover:text-blue transition ease-out duration-300">
                    Edit
                  </button>
                  <button className="w-fit bg-red-500 text-white rounded px-3 text-center border hover:border-red-500 hover:bg-white hover:text-red-500 ml-2 transition ease-out duration-300">
                    Delete
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p className="">Username:</p>
                  <p className="">{config.username}</p>
                </div>
                <div className="flex justify-between">
                  <p className="">SMTP Server:</p>
                  <p className="">{config.smtpServer}</p>
                </div>
                <div className="flex justify-between">
                  <p className="">SMTP Port:</p>
                  <p className="">{config.smtpPort}</p>
                </div>
                <div className="flex justify-between">
                  <p className="">SMTP Rate:</p>
                  <p className="">{config.smtpRate}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-2">
            <Link href="/home">
              <button className="w-full bg-blue py-3 text-center text-white hover:bg-white hover:text-blue border hover:border-blue transition ease-out duration-300">
                Save SMTP Configuration
              </button>
            </Link>
          </div>
        </div>
        <CustomSMTPForm />
      </div>
    </div>
  );
}
