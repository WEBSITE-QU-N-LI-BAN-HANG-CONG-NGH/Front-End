"use client";
import * as React from "react";

function Pagination() {
  return (
    <div
      role="navigation"
      aria-label="pagination"
      className="flex justify-center items-center my-5 w-full"
    >
      <ul className="flex flex-row gap-2 items-center p-0 m-0">
        <li>
          <a
            className="builder-d8fa34eb36e24fdbbb430299dca64837 flex gap-1 items-center px-3 py-2 text-sm font-medium no-underline bg-transparent rounded-md border border-transparent border-solid transition-all cursor-pointer duration-[0.2s] text-zinc-500"
            href="#"
            aria-label="Go to previous page"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Previous</span>
          </a>
        </li>
        <li>
          <a
            className="builder-80687ea0492a44a7924f85e6e0f656a0 w-9 h-9 px-3 py-3 text-sm font-medium no-underline bg-transparent rounded-md border border-transparent border-solid transition-all cursor-pointer duration-[0.2s] text-zinc-500"
            href="#"
          >
            1
          </a>
        </li>
        <li>
          <a
            className="builder-0812db49182c4f2c81edf99d53d2097f w-9 h-9 px-3 py-3 text-sm font-medium text-black no-underline bg-transparent rounded-md border border border-solid transition-all cursor-pointer duration-[0.2s]"
            href="#"
            aria-current="page"
          >
            2
          </a>
        </li>
        <li>
          <a
            className="builder-72ed506a3c384899ab9bf8bdf5ce5879 w-9 h-9 px-3 py-3 text-sm font-medium no-underline bg-transparent rounded-md border border-transparent border-solid transition-all cursor-pointer duration-[0.2s] text-zinc-500"
            href="#"
          >
            3
          </a>
        </li>
        <li>
          <span
            aria-hidden="true"
            className="flex justify-center items-center w-9 h-9 px-3 py-3 text-zinc-500"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
            <span className="overflow-hidden absolute p-0 -m-px w-px h-px whitespace-nowrap">
              More pages
            </span>
          </span>
        </li>
        <li>
          <a
            className="builder-d3743279cbab4129923a0494ecdba066 w-9 h-9 px-3 py-3 text-sm font-medium no-underline bg-transparent rounded-md border border-transparent border-solid transition-all cursor-pointer duration-[0.2s] text-zinc-500"
            href="#"
          >
            8
          </a>
        </li>
        <li>
          <a
            className="builder-cedc1f50c878472b9775fed4e9773108 w-9 h-9 px-3 py-3 text-sm font-medium no-underline bg-transparent rounded-md border border-transparent border-solid transition-all cursor-pointer duration-[0.2s] text-zinc-500"
            href="#"
          >
            9
          </a>
        </li>
        <li>
          <a
            className="builder-991e2d8170ef4f37bbc95aa4d185656d w-9 h-9 px-3 py-3 text-sm font-medium no-underline bg-transparent rounded-md border border-transparent border-solid transition-all cursor-pointer duration-[0.2s] text-zinc-500"
            href="#"
          >
            10
          </a>
        </li>
        <li>
          <a
            className="builder-2957f41286ec40b9b8eefc244f007cbe flex gap-1 items-center px-3 py-2 text-sm font-medium no-underline bg-transparent rounded-md border border-transparent border-solid transition-all cursor-pointer duration-[0.2s] text-zinc-500"
            href="#"
            aria-label="Go to next page"
          >
            <span>Next</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
