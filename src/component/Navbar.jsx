import React from "react";
import { BellDot, CircleUserRound } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const pageTitle =
    location.pathname === "/activity-logs"
      ? "Activity Log"
      : "Audit Log";

  return (
    <div className="fixed top-[12px] left-18 right-4 z-50">
      <div className="flex items-center justify-between bg-white px-6 py-2 rounded-full shadow-md">

        <div className="flex items-center text-sm">
          <h2 className="font-semibold text-gray-800">Logs</h2>
          <span className="mx-1 text-gray-400">/</span>
          <h2 className="text-gray-500">{pageTitle}</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-gray-200 hover:bg-gray-100 transition">
            <BellDot size={18} />
          </div>
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-gray-100 transition">
            <CircleUserRound size={18} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
