"use client";

import React, { useState } from "react";

const SendMail = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [fileInput, setFileInput] = useState(null);

  const handleInputChange = (event) => {
    setHtmlContent(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setHtmlContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="">
      <div className="lg:grid grid-cols-2 items-center my-52 justify-center ms-auto">
        <div className="px-20 mt-10">
          <h3 className="text-xl text-center mb-2">Template</h3>
          <textarea
            placeholder="Paste HTML content here"
            rows="16"
            cols="50"
            value={htmlContent}
            onChange={handleInputChange}
            className="w-full border-2 border-blue rounded hover:shadow-md"
          />
          <div className="">
            <input
              type="file"
              accept=".html"
              onChange={handleFileChange}
              ref={(input) => setFileInput(input)}
              style={{ display: "none" }}
            />
            <button onClick={() => fileInput.click()}>Upload HTML File</button>
          </div>
        </div>
        <div className="lg:pl-0 px-20 mt-5">
          <h3 className="text-xl text-center mb-2">Email Preview</h3>
          <div className="border-2 w-full border-orange-200 rounded">
            <iframe
              title="HTML Preview"
              width="100%"
              height="400"
              srcDoc={htmlContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMail;
