"use client";
import Link from "next/link";
import { useState } from "react";

export const SearchOrder = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="mb-5 flex items-center space-x-4 flex-row-reverse">
      <label className="ml-5">מספר הזמנה</label>
      <input
        type="text"
        className="mt-1 block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-right"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Link
        href={{
          pathname: `/edit-order/${inputValue}`,
        }}
      >
        <button className="mr-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-600">
          חיפוש
        </button>
      </Link>
    </div>
  );
};
