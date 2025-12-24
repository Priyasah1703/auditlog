import React, { useEffect, useState } from "react";
import Table from "../component/Table";
import Pagination from "../component/Pagination";
import axios from "axios";
import {
  Clock4,
  CircleCheck,
  CircleX,
  Search,
  Filter,
  RefreshCcw,
} from "lucide-react";

const ActivityLogs = () => {
  const tabs = [
    { name: "Authentication", value: "admin", disabled: false },
    { name: "Onboarding", value: "onboarding", disabled: true },
    { name: "Collections", value: "collections", disabled: true },
    { name: "Payout", value: "payout", disabled: true },
    { name: "Connected Banking", value: "banking", disabled: true },
  ];

  const [activeTab, setActiveTab] = useState("admin");
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [successTotal, setSuccessTotal] = useState(0);
  const [failureTotal, setFailureTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAuditLogs = async (
    page = 1,
    service_name = "admin",
    is_audit_log = false
  ) => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://api.allorigins.win/raw?url=" +
          encodeURIComponent(
            `https://formatjsononline.com/api/json/get-audit-logs?service_name=${service_name}&is_audit_log=${is_audit_log}&page=${page}&limit=10`
          )
      );

      const response = res.data;

      setAuditLogs(response?.data || []);
      setTotalCount(response?.total_count || 0);
      setSuccessTotal(response?.success || 0);
      setFailureTotal(response?.failure || 0);
      setTotalPages(response?.total_page || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs(currentPage, activeTab, false);
  }, [currentPage, activeTab]);

  const searchedLogs = auditLogs.filter((item) => {
    const value = searchTerm.toLowerCase();
    return (
      item.actor_name?.toLowerCase().includes(value) ||
      item.actor_uid?.toLowerCase().includes(value) ||
      item.event_description?.toLowerCase().includes(value) ||
      item.ip_address?.toLowerCase().includes(value) ||
      item.status?.toLowerCase().includes(value)
    );
  });

  const hasData = searchedLogs.length > 0;

  return (
    <div className="pr-2">
      <div className="w-full p-1">
        <div className="w-full bg-[#221F47] rounded-b-3xl p-2 flex gap-4 items-center pr-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            const isDisabled = tab.disabled;

            return (
              <button
                key={tab.name}
                disabled={isDisabled}
                onClick={() => {
                  if (!isDisabled) {
                    setActiveTab(tab.value);
                    setCurrentPage(1);
                    setSearchTerm("");
                  }
                }}
                className={`px-5 py-3 rounded-full text-sm font-medium transition-all
                  ${
                    isDisabled
                      ? "bg-white/5 text-white/30 opacity-50 cursor-not-allowed"
                      : isActive
                      ? "bg-white text-[#1A1A2E] shadow-md"
                      : "bg-white/10 text-white/40 hover:bg-white hover:text-[#1A1A2E]"
                  }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-3 pt-3 gap-2">
          <StatCard title="Events" value={totalCount} Icon={Clock4} loading={loading} />
          <StatCard title="Success" value={successTotal} Icon={CircleCheck} loading={loading} />
          <StatCard title="Failed" value={failureTotal} Icon={CircleX} loading={loading} />
        </div>

        <div className="bg-white rounded-xl p-6 mt-3 shadow-md">
          <div className="flex justify-between items-center w-full mb-4">
            <h1 className="text-[#25253c] font-semibold text-[1rem]">
              Activity Logs
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-full w-64">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full outline-none text-sm"
                />
              </div>

              <button className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-full text-sm cursor-pointer hover:border-purple-900">
                <Filter size={16} />
                Filter
              </button>

              <button
                onClick={() => fetchAuditLogs(currentPage, activeTab, false)}
                className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-full text-sm cursor-pointer hover:border-purple-900"
              >
                <RefreshCcw size={16} />
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <Table filteredLogs={searchedLogs} loading={false} />
          )}

          {!loading && !hasData && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No data available
            </div>
          )}

          {hasData && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, Icon, loading }) => (
  <div className="bg-white rounded-4xl p-6 shadow-md flex items-center gap-4">
    <div className="w-12 h-12 rounded-full border border-[#D5D4F6] flex items-center justify-center">
      <Icon className="text-[#3b31a1]" size={20} strokeWidth={3} />
    </div>
    <div>
      <h2 className="text-xs font-bold text-gray-400">{title}</h2>
      {loading ? (
        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mt-1" />
      ) : (
        <h2 className="font-bold">{value}</h2>
      )}
    </div>
  </div>
);

export default ActivityLogs;
