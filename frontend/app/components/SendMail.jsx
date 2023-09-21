"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import SMTPCard from "./SMTPCard";

const SendMail = () => {
  const [body, setBody] = useState("");
  const [htmlFileInput, setHtmlFileInput] = useState(null);
  const [subject, setSubject] = useState("");
  const [recipients, setRecipients] = useState("");
  const [contactFileInput, setContactFileInput] = useState(null);
  const [userConfigs, setUserConfigs] = useState([]);
  const [smtpConfig, setSmtpConfig] = useState(null);
  const token = sessionStorage.getItem("token").replace(/["']/g, "");
  const url = "http://0.0.0.0:5000/api/v1";

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
      console.log(response.data.data.configs);
    }
    fetchUserConfigs();
  }, []);

  const handleInputChange = (event) => {
    setBody(event.target.value);
  };
  // console.log(smtpConfig)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBody(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="my-48">
      <h2 className="text3xl">Send Email</h2>
      <div className="lg:grid grid-cols-2 items-center justify-center ms-auto">
        <div className="px-20 mt-10">
          <input
            className="mb-2"
            placeholder="Subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            placeholder="Paste HTML template here"
            rows="16"
            cols="50"
            value={body}
            onChange={handleInputChange}
            className="w-full border-4 border-blue hover:border-indigo-300 rounded hover:shadow-md"
          />
          <div className="btn w-fit ">
            <input
              type="file"
              accept=".html"
              onChange={handleFileChange}
              ref={(input) => setHtmlFileInput(input)}
              style={{ display: "none" }}
            />
            <button onClick={() => htmlFileInput.click()}>
              Import Template from File
            </button>
          </div>
        </div>
        <div className="lg:pl-0 px-20 mt-5">
          <h3 className="text-xl text-center mb-2">Email Preview</h3>
          <div className="border-4 w-full border-blue rounded">
            <iframe
              title="HTML Preview"
              width="100%"
              height="400"
              srcDoc={body}
            />
          </div>
        </div>
      </div>
      <div className="lg:grid grid-cols-2 items-center justify-center ms-auto mt-8">
        <div className="px-20">
          <textarea
            placeholder="Paste comma separated recipients here"
            value={recipients}
            rows={10}
            col={10}
            onChange={(e) => setRecipients(e.target.value)}
            className="w-full border-4 hover:border-indigo-300 border-blue rounded"
          />
          <div className="btn w-fit ">
            <input
              type="file"
              accept=".csv"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setRecipients(e.target.result);
                  };
                  reader.readAsText(file);
                }
              }}
              ref={(input) => setContactFileInput(input)}
              style={{ display: "none" }}
            />
            <button onClick={() => contactFileInput.click()}>
              Import Contacts from File
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="flex w-3/5 flex-col mb-5 text-center rounded text-indigo-900 bg-indigo-200 p-5">
            <h2>SMTP Configuration</h2>
            <select
              id="smtp-config"
              value={smtpConfig}
              onChange={(e) => setSmtpConfig(e.target.value)}
              required
              className="text-center mt-2 p-3 border-indigo-900"
            >
              <option value="">Select SMTP Configuration</option>
              {userConfigs.map((config) => (
                <option key={config.id} value={JSON.stringify(config)}>
                  {config.alias}
                </option>
              ))}
            </select>
            <p className="text-center m-3">
              {smtpConfig
                ? `Using ${JSON.parse(smtpConfig).alias} SMTP Configuration`
                : "No Configuration Selected"}
            </p>
          </div>
          {smtpConfig && <div className="flex w-3/5 flex-col mb-5 rounded mx-20 text-indigo-900 bg-indigo-200 p-5">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="">Username:</p>
                <p className="">{smtpConfig && JSON.parse(smtpConfig).username}</p>
              </div>
              <div className="flex justify-between">
                <p className="">Alias:</p>
                <p className="">{smtpConfig && JSON.parse(smtpConfig).alias}</p>
              </div>
              <div className="flex justify-between">
                <p className="mr-auto">Server:</p>
                <p className="">{smtpConfig && JSON.parse(smtpConfig).server}</p>
              </div>
              <div className="flex justify-between">
                <p className="">Port:</p>
                <p className="">{smtpConfig && JSON.parse(smtpConfig).port}</p>
              </div>
              <div className="flex justify-between">
                <p className="">Rate:</p>
                <p className="">{smtpConfig && JSON.parse(smtpConfig).rate}</p>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default SendMail;
