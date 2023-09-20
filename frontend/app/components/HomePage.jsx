"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function HomePage() {
  const [html, setHtml] = useState("");
  const [subject, setSubject] = useState("");
  const [files, setFiles] = useState(null);

  const handleChange = (value) => {
    setHtml(value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleFileUpload = (e) => {
    const filesList = e.target.files;
    setFiles([...files, ...filesList]);
  };

  const PlaceholderText =
    "Hello {first_name},\n\nWelcome to our web application. We are glad to have you here.\n\nRegards,\n{sender_name}";

  return (
    <div className="container mx-auto p-6">
      <div className="flex">
        <div className="w-1/2 p-4">
          <h2 className="text-xl">Write your email here!</h2>
          <p className="text-gray-500 italic mb-4">
            You can use the following placeholders in your email template:{" "}
            {`{first_name}, {last_name}, {sender_name}, {sender_email}`}
          </p>
          <div className="mb-4">
            <input
              type="text"
              className="border border-gray-300 p-2 w-full"
              placeholder="Subject"
              value={subject}
              onChange={handleSubjectChange}
            />
            <ReactQuill
              theme="snow"
              value={html}
              onChange={handleChange}
              placeholder={PlaceholderText}
              modules={{
                toolbar: [
                  [{ size: ["small", false, "large", "huge"] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  [
                    {
                      color: [
                        "#000000",
                        "#e60000",
                        "#ff9900",
                        "#ffff00",
                        "#008a00",
                        "#0066cc",
                        "#9933ff",
                        "#ffffff",
                        "#facccc",
                        "#ffebcc",
                        "#ffffcc",
                        "#cce8cc",
                        "#cce0f5",
                        "#ebd6ff",
                        "#bbbbbb",
                        "#f06666",
                        "#ffc266",
                        "#ffff66",
                        "#66b966",
                        "#66a3e0",
                        "#c285ff",
                        "#888888",
                        "#a10000",
                        "#b26b00",
                        "#b2b200",
                        "#006100",
                        "#0047b2",
                        "#6b24b2",
                        "#444444",
                        "#5c0000",
                        "#663d00",
                        "#666600",
                        "#003700",
                        "#002966",
                        "#3d1466",
                        "custom-color",
                      ],
                    },
                  ],
                  ["link", "image"],
                ],
              }}
              style={{ height: "250px", overflowY: "auto" }}
            />
            <label className="text-gray-500 italic mt-4 cursor-pointer justify-end flex">
              <span className="mr-2 border border-gray-300 p-2">
                Add attachments
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                className="border border-gray-300 p-2 w-full mt-4 cursor-pointer"
                multiple
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
        <div className="w-px bg-blue h-96 self-center"></div>
        <div className="w-1/2 p-4">
          <h2 className="text-xl mb-4">Preview your email here!</h2>
          <div
            className="mb-4 border border-gray-300 p-2"
            style={{ height: "350px", overflowY: "auto" }}
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
          <div className="flex justify-end">
            <button className="bg-blue text-white py-2 px-4 rounded border-2 border-blue hover:bg-white hover:text-blue transition ease-out duration-300">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
