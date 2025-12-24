import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/paywize.png";
import {
  House,
  CircleUserRound,
  ArrowUpRight,
  Landmark,
  HandCoins,
  FileChartColumnIncreasing,
  ShieldUser,
  Logs,
  Headset,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const icons = [
  { id: "home", component: House, label: "Home" },
  { id: "Profile", component: CircleUserRound, label: "Merchant" },
  { id: "arrow", component: ArrowUpRight, label: "Payout" },
  { id: "bank", component: Landmark, label: "Connected Banking" },
  { id: "Collection", component: HandCoins, label: "Collection" },
  { id: "report", component: FileChartColumnIncreasing, label: "Reports" },
  { id: "team", component: ShieldUser, label: "Team Management" },
  { id: "logs", component: Logs, label: "Logs" },
  { id: "support", component: Headset, label: "Support" },
  { id: "settings", component: Settings, label: "Settings" },
];

const Sidebar = () => {
  const [active, setActive] = useState("Homee");
  const [openLogs, setOpenLogs] = useState(false);
  const navigate = useNavigate();
  const logsRef = useRef(null);

  // ✅ RESTORE ACTIVE TAB AFTER REFRESH
  useEffect(() => {
    const savedTab = localStorage.getItem("activeSidebarTab");
    if (savedTab) {
      setActive(savedTab);
    }
  }, []);

  // ✅ CLICK OUTSIDE LOGS DROPDOWN
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (logsRef.current && !logsRef.current.contains(e.target)) {
        setOpenLogs(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed left-[10px] top-[12px] bottom-[12px] z-50">
      <div className="bg-white w-[3.625rem] h-full rounded-full p-3 flex flex-col gap-3">
        <img
          src={logo}
          alt="Logo"
          className="w-8 h-8 rounded-full object-cover mb-6"
        />

        {icons.map((icon) => {
          const IconComp = icon.component;
          const isActive = active === icon.id;

          if (icon.id === "logs") {
            return (
              <div key="logs" ref={logsRef} className="relative">
                <div
                  onClick={() => {
                    setActive("logs");
                    localStorage.setItem("activeSidebarTab", "logs");
                    setOpenLogs((p) => !p);
                  }}
                  className={`relative group cursor-pointer flex items-center justify-center p-2 rounded-full transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#27234d] text-white"
                        : "text-gray-500 hover:bg-[#E4E6F5] hover:text-[#3F387F]"
                    }
                  `}
                >
                  <IconComp size={20} />

                  <span className="absolute left-[56px] top-1/2 -translate-y-1/2 bg-[#27234d] text-white text-[12px] px-2 py-1.5 rounded-lg shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
                    Logs
                  </span>
                </div>

                {openLogs && (
                  <div className="absolute left-[56px] top-0 bg-[#27234d] rounded-2xl p-2 w-44 shadow-2xl flex flex-col gap-2 z-50">
                    <button
                      onClick={() => {
                        navigate("/audit-logs");
                        setActive("logs");
                        localStorage.setItem("activeSidebarTab", "logs");
                        setOpenLogs(false);
                      }}
                      className="w-full bg-[#3a3566] text-white text-sm py-2.5 px-4 rounded-xl text-left transition-all duration-200 hover:bg-[#4b4580] cursor-pointer"
                    >
                      Audit Log
                    </button>

                    <button
                      onClick={() => {
                        navigate("/activity-logs");
                        setActive("logs");
                        localStorage.setItem("activeSidebarTab", "logs");
                        setOpenLogs(false);
                      }}
                      className="w-full bg-[#3a3566] text-white text-sm py-2.5 px-4 rounded-xl text-left transition-all duration-200 hover:bg-[#4b4580] cursor-pointer"
                    >
                      Activity Log
                    </button>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div
              key={icon.id}
              onClick={() => {
                setActive(icon.id);
                localStorage.setItem("activeSidebarTab", icon.id);
                setOpenLogs(false);
              }}
              className={`relative group cursor-pointer flex items-center justify-center p-2 rounded-full transition-all duration-200
                ${
                  isActive
                    ? "bg-[#27234d] text-white"
                    : "text-gray-500 hover:bg-[#E4E6F5] hover:text-[#3F387F]"
                }
              `}
            >
              <IconComp size={20} />

              <span className="absolute left-[56px] top-1/2 -translate-y-1/2 bg-[#27234d] text-white text-[12px] px-2 py-1.5 rounded-lg shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
                {icon.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
