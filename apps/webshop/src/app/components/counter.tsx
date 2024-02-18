import React from "react";

const Counter = ({
  max = 100,
  value,
  onChange,
}: {
  max?: number;
  value: number;
  onChange: (n: number) => void;
}) => {
  return (
    <form className="h-10 max-w-xs">
      <div className="relative flex h-full max-w-[8rem] items-center border border-border">
        <button
          type="button"
          onClick={() => onChange(Math.min(Math.max(0, value - 1), max))}
          className="h-full border-r border-border  bg-gray-100 p-3 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <svg
            className="h-3 w-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          value={value}
          onChange={(e) => {
            onChange(
              e.target.value && !isNaN(+e.target.value) ? +e.target.value : 1,
            );
          }}
          min="1"
          step="1"
          type="numeric"
          name="quantity"
          className="dark:focus:ring-main-500 dark:focus:border-border-500 block h-full w-full min-w-[2.5rem] border-x-0 border-border bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500  focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="1"
          required
        />
        <button
          type="button"
          onClick={() => onChange(Math.min(Math.max(0, value + 1), max))}
          className="h-full border-l border-border bg-gray-100 p-3 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <svg
            className="h-3 w-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Counter;
