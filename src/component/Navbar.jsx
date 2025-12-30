import React, { useState, useEffect, useRef } from "react";
import { BellDot, CircleUserRound, Calendar, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

const NAVBAR_CONFIG = {
  "/": {
    section: "Dashboard",
    title: "Overview",
    showDateFilter: false,
  },
  "/audit-logs": {
    section: "Logs",
    title: "Audit Log",
    showDateFilter: false,
  },
  "/activity-logs": {
    section: "Logs",
    title: "Activity Log",
    showDateFilter: false,
  },
  "/reports/connected-banking": {
    section: "Reports",
    title: "Connected Banking",
    showDateFilter: true,
  },
};

const Navbar = () => {
  const location = useLocation();

  
  const current =
    NAVBAR_CONFIG[location.pathname] || {
      section: "Dashboard",
      title: "Overview",
      showDateFilter: false,
    };

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Today");
  const dropdownRef = useRef(null);

  const menuItems = [
    "All",
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-[12px] left-18 right-4 z-50">
      <div className="flex items-center justify-between bg-white px-6 py-2 rounded-full shadow-md">

        <div className="flex items-center text-sm">
          <h2 className="font-semibold text-gray-800">
            {current.section}
          </h2>
          <span className="mx-1 text-gray-400">/</span>
          <h2 className="text-gray-500">
            {current.title}
          </h2>
        </div>

        <div className="flex items-center gap-3">

          {/* Date filter (only when we needed ) */}
          {current.showDateFilter && (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 cursor-pointer text-[13px]
                  bg-white px-3 py-1 rounded-full border border-gray-400"
              >
                <Calendar size={16} />
                <span>{selected}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>

              {open && (
                <div className="absolute top-9 right-0 bg-white shadow-md border rounded-md py-2 w-40 z-50">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelected(item);
                        setOpen(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

       
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-gray-200 cursor-pointer hover:bg-gray-100 transition">
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
