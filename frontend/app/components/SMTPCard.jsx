import React from "react";

export default function SMTPCard(config) {
  console.log(config);
  return (
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
  );
}
