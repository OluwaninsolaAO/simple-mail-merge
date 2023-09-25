"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

const SendMail = () => {
  const [body, setBody] = useState("");
  const [htmlFileInput, setHtmlFileInput] = useState(null);
  const [subject, setSubject] = useState("");
  const [recipients, setRecipients] = useState("");
  const [contactFileInput, setContactFileInput] = useState(null);
  const [userConfigs, setUserConfigs] = useState([]);
  const [smtpConfig, setSmtpConfig] = useState(null);
  const token =
    sessionStorage.token &&
    sessionStorage.getItem("token").replace(/["']/g, "");
  const url = "http://0.0.0.0:5000/api/v1";
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      alert("Login required!!");
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

  function processCsv(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    let csvArray;
    Papa.parse(recipients, {
      complete: function (results) {
        results.error && setError("Invalid CSV");
        csvArray = results.data;
      },
    });

    const headers = csvArray[0];
    if (!headers.includes("email")) {
      setError("Email field is mandatory!");
      return;
    }
    csvArray.splice(-1, 1);
    const result = csvArray.slice(1).map((data) => {
      if (data.length !== headers.length) {
        setError("Incomplete values");
        return;
      }
      const obj = {};
      headers.forEach((field, index) => {
        obj[field] = data[index];
      });
      return obj;
    });
    !error && sendMail(result);
  }

  async function sendMail(recipientsJson) {
    const emailData = {
      subject,
      config_id: JSON.parse(smtpConfig).id,
      body,
      recipients: recipientsJson,
    };

    try {
      const response = await axios.post(`${url}/sendmail`, emailData, {
        headers: {
          "auth-token": token
        }
      });
      setSuccess(response.data?.message);
      console.log(response);
      setTimeout(() => {
        router.push('/confirmation');
      }, 3000);
    } catch(err) {
      setError(err.data?.message);
      console.log(err);
    }
  }

  return (
    <form className="my-48" onSubmit={processCsv}>
      {error && (
        <div className="w-1/2 mx-auto">
          <ErrorAlert message={error} setError={setError} />
        </div>
      )}
      {success && (
        <div className="w-1/2 mx-auto">
          <SuccessAlert message={success} setSuccess={setSuccess} />
        </div>
      )}
      <h2 className="text-3xl text-center">Send Mail</h2>
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
            required
            onChange={(e) => setBody(e.target.value)}
            className="w-full border-4 border-blue hover:border-indigo-300 rounded hover:shadow-md"
          />
          <div className="btn w-fit mx-auto">
            <input
              type="file"
              accept=".html"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setBody(e.target.result);
                  };
                  reader.readAsText(file);
                }
              }}
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
            required
            onChange={(e) => setRecipients(e.target.value)}
            className="w-full border-4 hover:border-indigo-300 border-blue rounded"
          />
          <div className="btn w-fit mx-auto">
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
          {smtpConfig && (
            <div className="flex w-3/5 flex-col mb-5 rounded mx-20 text-indigo-900 bg-indigo-200 p-5">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p className="">Username:</p>
                  <p className="">
                    {smtpConfig && JSON.parse(smtpConfig).username}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="">Alias:</p>
                  <p className="">
                    {smtpConfig && JSON.parse(smtpConfig).alias}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="mr-auto">Server:</p>
                  <p className="">
                    {smtpConfig && JSON.parse(smtpConfig).server}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="">Port:</p>
                  <p className="">
                    {smtpConfig && JSON.parse(smtpConfig).port}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="">Rate:</p>
                  <p className="">
                    {smtpConfig && JSON.parse(smtpConfig).rate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="col-span-2 w-2/5 mx-auto mt-12 bg-blue hover:bg-white text-white hover:text-black hover:border border-indigo-600 py-3 rounded-lg transition ease-in duration-200 text-lg"
        >
          Send Now
        </button>
      </div>
    </form>
  );
};

export default SendMail;
