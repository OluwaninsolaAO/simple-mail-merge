import React from "react";

export default function ErrorAlert(props) {
  return (
    <div className="mb-3 flex justify-center rounded bg-red-100 text-red-500 text-sm p-3.5">
      <p className="ml-auto">{props.message}</p>
      <button className="ml-auto" onClick={() => setError(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}
