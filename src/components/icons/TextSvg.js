import React from "react";

function TextSvg(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer "
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="1.8"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path
        color=""
        d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
      ></path>
      <g strokeWidth={1.5}>
        <path d="M7 8h10"></path>
        <path d="M7 12h10"></path>
        <path d="M7 16h10"></path>
      </g>
    </svg>
  );
}

export default TextSvg;
