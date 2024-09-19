"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  {
    link: "/new-order",
    text: "הזמנה חדשה (New Order)",
  },
  {
    link: "/new-order",
    text: "עדכון הזמנה (Update Order)",
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`bg-gray-800 p-4 text-left shadow-2xl`}>
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center">
          <Image
            src="https://oksimple.co.il/wp-content/uploads/2018/06/logo.svg"
            alt="Logo"
            width={120}
            height={60}
            className="mr-4"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((menuItem) => (
            <Link
              href={menuItem.link}
              className="text-white hover:text-gray-300"
            >
              {menuItem.text}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-8 h-8"
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
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          {menuItems.map((menuItem) => (
            <Link
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              href={menuItem.link}
              className="block text-white hover:text-gray-300"
            >
              {menuItem.text}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
