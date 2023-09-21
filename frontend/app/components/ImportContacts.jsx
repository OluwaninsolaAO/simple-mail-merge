"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";
import "font-awesome/css/font-awesome.min.css";

export default function ImportContacts() {
    const [file, setFile] = useState(null);
    const [fileContents, setFileContents] = useState("");

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    {/* We want to display the contents of the file that the user has uploaded. */}
    const handleImport = () => {
        if (!file) {
            return;
        }
        {/* We check the file type and then use the appropriate library to parse the file. */}
        if (file.type === "csv") {
            Papa.parse(file, {
                complete: function(results) {
                    setFileContents(JSON.stringify(results.data));
                }
            });
        } else {
            readXlsxFile(file).then((rows) => {
                setFileContents(JSON.stringify(rows));
            });
        }
    }

    return (
        <div className="container mx-auto p-6">
          <div className="flex">
            <div className="w-1/2 p-4">
              <h2 className="text-xl">Import your contacts</h2>
              <p className="text-gray-500 italic mb-4">
                Upload a CSV or Excel file containing your contacts.
              </p>
                <div className="flex">
                    <div
                        className="flex items-center justify-center border border-blue p-4 rounded-lg"
                        style={{ width: "60%", height: "50px" }}>
                        <label className="text-gray-500 cursor-pointer">
                            <input
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileUpload}
                            style={{ display: "none" }}
                            />
                            <span>
                                <i className="fa fa-upload fa-2x" aria-hidden="true"></i>
                            </span>
                                <span className="ml-2">Upload File</span>
                        </label>
                    </div>
                    <button
                        onClick={handleImport}
                        className="ml-3 bg-blue text-white py-2 px-4 rounded border-2 border-blue hover:bg-white hover:text-blue transition ease-out duration-300">
                        Import
                    </button>
                </div>
                {file && (
                    <div className="mt-2">
                        <span className="text-gray-500 italic">
                            {file.name}
                        </span>
                    </div>
                )}
            </div>
          </div>
          <div className="flex">
            <div className="w-full p-4" style={{ height: "300px", overflowY: "auto" }}>
                <h2 className="text-xl">Your contacts will be displayed here</h2>
                {fileContents && (
                <div className="mt-4">
                    <table className="table-auto w-full border-2 border-blue text-left">
                    <thead className="bg-blue text-white">
                        <tr>
                        {JSON.parse(fileContents)[0].map((header, index) => (
                            <th key={index} className="border border-white py-2 px-4">{header}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {JSON.parse(fileContents).slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex} className="border border-blue">
                            {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="border border-blue py-2 px-4">{cell}</td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                )}
            </div>
          </div>
        </div>
    );
}
