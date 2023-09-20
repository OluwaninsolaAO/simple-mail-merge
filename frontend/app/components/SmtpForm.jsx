"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomSMTPForm from "./CustomSMTPForm";
import axios from "axios";

export default function SmtpForm() {
  const url = 'http://0.0.0.0:5000/api/v1';
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [config, setConfig] = useState("");
  const [error, setError] = useState("");
  const [added, setAdded] = useState("");
  const [userConfigs, setUserConfigs] = useState([]);
  const smtpConfigurations = [
    {
      username: "gmail",
      alias: "Gmail",
      password: "gmail-password",
      server: "smtp.gmail.com",
      port: "587",
      rate: "100",
    },
    {
      username: "yahoo",
      alias: "Yahoo",
      password: "yahoo-password",
      server: "smtp.mail.yahoo.com",
      port: "465",
      rate: "100",
    },
    ...userConfigs
  ];

  useEffect(() => {
    async function fetchUserConfigs() {
      const response = await axios.get(`${url}/configs`, {
        headers: {
          "auth-token": sessionStorage.getItem('token').replace(/["']/g, '')
        }
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
                    }}
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
        <CustomSMTPForm />
      </div>
    </div>
  );
}
