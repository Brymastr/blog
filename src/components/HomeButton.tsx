import Link from 'next/link';
import React from 'react';

export default function HomeButton() {
  return (
    <div className="flex justify-between text-gray-400 p-5">
      <Link href="/">
        <a
          className="
            rounded-full border-solid border p-2 px-4 transition-colors
            border-gray-400 hover:border-red-400
            hover:text-red-400
          "
        >
          &#60; Home
        </a>
      </Link>
    </div>
  );
}
