'use client'
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white p-4 text-green-900 shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="w-64 h-32 flex justify-start">
        <h1 className="text-green-950" style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>GENiXL</h1>
        </div>

        {/* Hamburger icon for smaller screens */}
        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </div>
      </div>

      {/* Links for smaller screens */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-right mt-4">
          <Link href="/" className="mb-2" onClick={toggleNavbar}>
            Home
          </Link>
          <Link href="/about" className="mb-2 hover:underline" onClick={toggleNavbar}>
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
