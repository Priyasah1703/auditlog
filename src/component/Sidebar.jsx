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
import { useNavigate, useLocation } from "react-router-dom";

const icons = [
  { id: "home", component: House, label: "Dashboard", path: "/" },
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
  const [active, setActive] = useState("home");
  const [openLogs, setOpenLogs] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const logsRef = useRef(null);
  const reportsRef = useRef(null);

 
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setActive("home");
    } else if (path.startsWith("/reports")) {
      setActive("report");
    } else if (
      path.startsWith("/audit-logs") ||
      path.startsWith("/activity-logs")
    ) {
      setActive("logs");
    }
  }, [location.pathname]);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (logsRef.current && !logsRef.current.contains(e.target)) {
        setOpenLogs(false);
      }
      if (reportsRef.current && !reportsRef.current.contains(e.target)) {
        setOpenReports(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed left-[10px] top-[12px] bottom-[12px] z-50 font-semibold">
      <div className="bg-white w-[3.625rem] h-full rounded-full p-3 flex flex-col gap-3">
        <img src={logo} alt="Logo" className="w-8 h-8 mb-6" />

        {icons.map((icon) => {
          const Icon = icon.component;
          const isActive = active === icon.id;

          if (icon.id === "logs") {
            return (
              <div key="logs" ref={logsRef} className="relative group">
                <div
                  onClick={() => {
                    setActive("logs");
                    setOpenLogs((p) => !p);
                    setOpenReports(false);
                  }}
                  className={`p-2 rounded-full cursor-pointer ${
                    isActive
                      ? "bg-[#27234d] text-white"
                      : "text-gray-500 hover:bg-[#E4E6F5]"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <span className="sidebar-label">{icon.label}</span>

                {openLogs && (
                  <div className="absolute left-[56px] top-10 bg-[#27234d] p-2 rounded-2xl w-44">
                    <button
                      onClick={() => {
                        navigate("/audit-logs");
                        setOpenLogs(false);
                      }}
                      className="dropdown-btn"
                    >
                      Audit Log
                    </button>
                    <button
                      onClick={() => {
                        navigate("/activity-logs");
                        setOpenLogs(false);
                      }}
                      className="dropdown-btn"
                    >
                      Activity Log
                    </button>
                  </div>
                )}
              </div>
            );
          }

          if (icon.id === "report") {
            return (
              <div key="report" ref={reportsRef} className="relative group">
                <div
                  onClick={() => {
                    setActive("report");
                    setOpenReports((p) => !p);
                    setOpenLogs(false);
                  }}
                  className={`p-2 rounded-full cursor-pointer ${
                    isActive
                      ? "bg-[#27234d] text-white"
                      : "text-gray-500 hover:bg-[#E4E6F5]"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <span className="sidebar-label">{icon.label}</span>

                {openReports && (
                  <div className="absolute left-[56px] top-10 bg-[#27234d] p-2 rounded-2xl w-56">
                    <button className="dropdown-btn">Collection</button>
                    <button className="dropdown-btn">Payout</button>
                    <button
                      onClick={() => {
                        navigate("/reports/connected-banking");
                        setOpenReports(false);
                      }}
                      className="dropdown-btn"
                    >
                      Connected Banking
                    </button>
                    <button className="dropdown-btn">
                      GST Statement (Payout)
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
                setActive(icon.id);     // ✅ FIX: makes tab clickable
                if (icon.path) navigate(icon.path);
                setOpenLogs(false);
                setOpenReports(false);
              }}
              className={`relative group p-2 rounded-full cursor-pointer ${
                isActive
                  ? "bg-[#27234d] text-white"
                  : "text-gray-500 hover:bg-[#E4E6F5]"
              }`}
            >
              <Icon size={20} />
              <span className="sidebar-label">{icon.label}</span>
            </div>
          );
        })}
      </div>

      <style>
        {`
          .dropdown-btn {
            width: 100%;
            background: #3a3566;
            color: white;
            padding: 10px 14px;
            border-radius: 12px;
            margin-bottom: 6px;
            text-align: left;
            transition: 0.2s;
          }
          .dropdown-btn:hover {
            background: #4b4580;
          }

          .sidebar-label {
            position: absolute;
            left: 56px;
            top: 50%;
            transform: translateY(-50%);
            background: #27234d;
            color: white;
            font-size: 12px;
            padding: 6px 10px;
            border-radius: 10px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: 0.2s;
          }

          .group:hover .sidebar-label {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
