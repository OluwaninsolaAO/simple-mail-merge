import Link from "next/link";
import React from "react";

export default function MailConfirmation() {
  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div className="bg-indigo-200 p-12 rounded-lg shadow-lg">
        <h2 className="text-4xl my-2">Merge Successful!!!</h2>
        <h3 className="text-2xl my-2">Your mail is on it's way</h3>
        <h5 className="text-xl">
          Check the <Link className="text-blue hover:underline" href="#">progress</Link> page to track how mail is progressing
        </h5>
      </div>
    </div>
  );
}
