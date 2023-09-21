"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const SendMail = () => {
  const [body, setBody] = useState("");
  const [htmlFileInput, setHtmlFileInput] = useState(null);
  const [subject, setSubject] = useState("");
  const [recipients, setRecipients] = useState("");
  const [contactFileInput, setContactFileInput] = useState(null);
  const [userConfigs, setUserConfigs] = useState([]);
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
    }
    fetchUserConfigs();
  }, []);

  const handleInputChange = (event) => {
    setBody(event.target.value);
  };

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
            className="w-full border-4 border-blue hover:border-orange-300 rounded hover:shadow-md"
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
            className="w-full border-4 hover:border-orange-300 border-blue rounded"
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
        <div className="text-center.0">
          <button type="select" className="">
            Select SMTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMail;
