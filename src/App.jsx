import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Home from "./component/Home";
import Auditlog from "./component/Auditlog";
import ActivityLogs from "./component/ActivityLogs";
import Reports from "./component/reports";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="bg-gray-100 h-screen pt-18 pl-18">
          <div className="bg-gray-100 h-[calc(100vh-88px)] overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />

          
              <Route path="/audit-logs" element={<Auditlog />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />

              <Route
                path="/reports/connected-banking"
                element={<Reports />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
