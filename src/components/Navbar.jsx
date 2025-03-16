import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full text-black px-16 py-10 flex justify-between items-center z-10">
      
      <div className="text-3xl font-extrabold tracking-wide font-mono">
        QuickFlights
      </div>

      {/* Navbar Links */}
      <div className="flex space-x-6 text-md font-medium">
        <a href="#" className="hover:underline py-4">About</a>
        <a href="#" className="hover:underline py-4">Contact Us</a>
        <Link to="/saved" className="hover:underline py-4">Saved</Link>
       <button className="border border-black px-4 mt-2 h-9 rounded-md hover:bg-black hover:text-white transition">
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
