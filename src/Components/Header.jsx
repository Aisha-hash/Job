import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center p-4 border-b-4 border-stone-300 w-full h-[8vh]">
      {/* Header Title */}
      <div className="flex-1 text-center text-3xl font-semibold">
        Job Application Tracker
      </div>
      {/* Navbar Component */}
      <Navbar />
    </div>
  );
};

export default Header;
