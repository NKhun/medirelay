"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 flex items-start md:items-center md:justify-end w-screen md:h-[74px]">
      <nav className=" z-10 px-6">
    {/* Burger Button */}
    <div
      id="burger"
      className="md:hidden absolute flex flex-col gap-1 cursor-pointer mt-8"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`w-6 h-1 bg-gray-800 duration-300 transition-all ease-in-out ${
          isOpen ? "-rotate-45 translate-y-[8px]" : ""
        }`}
      ></div>
      <div className={`w-6 h-1 transition-all ease-in-out duration-300 bg-gray-800 ${isOpen ? "opacity-0" : "opacity-100"}`}></div>
      <div
        className={`w-6 h-1 bg-gray-800 duration-300 transition-all ease-in-out 
          ${isOpen ? " rotate-45 -translate-y-[8px]" : ""}`}
      ></div>
    </div>

    {/* Menu Items */}
    <ul
      id="nav-list"
      className={`bg-white/20 md:opacity-100 border md:translate-y-0 border-gray-200 backdrop-blur-sm flex items-center md:justify-end text-center flex-col md:flex-row gap-6 duration-300 transition-all ease-in-out w-[100vw] p-6 absolute md:fixed top-18 left-0 md:top-0
        ${isOpen ? "opacity-100 translate-y-[20px]" : "opacity-0 translate-y-[0]"}`
      }
    >
      <Link
        href="/"
        className=" px-[15px] py-[5px] rounded-lg md:bg-white  md:shadow-sm md:hover:shadow-md hover:scale-105 duration-300 ease-in-out"
      >
        Home
      </Link>
      <Link
        href="/signin"
        className="px-[15px] py-[5px] rounded-lg md:bg-white md:shadow-sm md:hover:shadow-md hover:scale-105 duration-300 ease-in-out"
      >
        Sign in
      </Link>
      <Link
        href="/signup"
        className="px-[15px] py-[5px] w-full md:w-auto rounded-lg bg-red-800 hover:bg-red-700 shadow-red-300/0 hover:shadow-red-300 hover:scale-105 text-white font-medium shadow-lg duration-300 ease-in-out md:mr-8"
      >
        Sign up
      </Link>
    </ul>
  </nav>
  </div>

    
  );
}
