"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomSMTPForm from "./CustomSMTPForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SmtpForm() {
  const url = "http://0.0.0.0:5000/api/v1";
  const router = useRouter();
  const token =
    sessionStorage.token &&
    sessionStorage.getItem("token").replace(/["']/g, "");
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [smtpConfig, setConfig] = useState(null);
  const [username, setUsername] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("");
  const [port, setPort] = useState("");
  const [rate, setRate] = useState("");
  const [error, setError] = useState("");
  const [added, setAdded] = useState("");
  const [userConfigs, setUserConfigs] = useState([]);
  const smtpConfigurations = [
    {
      predefined: true,
      username: "gmail",
      alias: "Gmail",
      password: "",
      server: "smtp.gmail.com",
      port: "587",
      rate: "100",
    },
    {
      predefined: true,
      username: "yahoo",
      alias: "Yahoo",
      password: "",
      server: "smtp.mail.yahoo.com",
      port: "465",
      rate: "100",
    },
    {
      predefined: false,
      username: "Custom Config",
      alias: "",
      password: "",
      server: "",
      port: "",
      rate: "",
    },
  ];

  useEffect(() => {
    if (selectedConfig) {
      const selected = smtpConfigurations.find(
        (config) => config.username === selectedConfig
      );
      if (selected) {
        setUsername(selected.username);
        setAlias(selected.alias);
        setPassword(selected.password);
        setServer(selected.server);
        setPort(selected.port);
        setRate(selected.rate);
      }
    } else {
      setUsername("");
      setAlias("");
      setPassword("");
      setServer("");
      setPort("");
      setRate("");
    }
  }, [selectedConfig]);

  useEffect(() => {
    if (!token) {
      router.push("/signin");
      return;
    }
    async function fetchUserConfigs() {
      const response = await axios.get(`${url}/configs`, {
        headers: {
          "auth-token": token,
        },
      });
      console.log(response.data.message);
      setUserConfigs(response.data.data.configs);
    }
    fetchUserConfigs();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(config);
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
                    onChange={() => {
                      setSelectedConfig(config.username);
                      setConfig(config);
                      handleChange();
                    }}
                    style={{ width: "16px", height: "16px" }}
                    className="mr-2"
                  />
                  <h2 className="text-2xl">
                    {config.predefined ? config.alias : "Custom Configuration"}
                  </h2>
                </div>
              </div>
              {config.predefined && (
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="">Username:</p>
                    <p className="">{config.username}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">SMTP Server:</p>
                    <p className="">{config.server}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">SMTP Port:</p>
                    <p className="">{config.port}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">SMTP Rate:</p>
                    <p className="">{config.rate}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="mt-2">
            <button
              className="w-full bg-blue py-3 text-center text-white hover:bg-white hover:text-blue border hover:border-blue transition ease-out duration-300"
              onClick={handleSubmit}
            >
              Save SMTP Configuration
            </button>
          </div>
        </div>
        {/* <CustomSMTPForm /> */}
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setServer(e.target.value)}
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
                onChange={(e) => setPort(e.target.value)}
                required
                className="border border-blue py-1 px-2 w-full"
                disabled={smtpConfig && smtpConfig.predefined ? true : false}
              />
            </div>
            <div className="mt-2">
              <input
                type="text"
                placeholder="SMTP Rate"
                id="smtpRate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                required
                disabled={smtpConfig && smtpConfig.predefined ? true : false}
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
      </div>
    </div>
  );
}
