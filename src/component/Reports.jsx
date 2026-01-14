import React, { useEffect, useState } from "react";
import LedgerTransactionsChart from "./LedgerTransactionsChart";
import { Hourglass, Search, IdCard } from "lucide-react";
import CBReportsTable from "./CBReportsTable";
import api from "../axiosInstance";

const ConnectedBankingReport = () => {
  const [activeTab, setActiveTab] = useState("Bank Summary");
  const [pieData, setPieData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const tabs = [
    "Bank Summary",
    "Ledger Summary",
    "GST Statement",
    "Downloads",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [pieRes, statsRes] = await Promise.all([
          api.get(
            "https://api.allorigins.win/raw?url=" +
            encodeURIComponent(
              "https://formatjsononline.com/api/json/cb-reports-pie-chart"
            )
          ),
          api.get(
            "https://api.allorigins.win/raw?url=" +
            encodeURIComponent(
              "https://formatjsononline.com/api/json/cb-reports-stats"
            )
          ),
        ]);

        setPieData(pieRes.data);
        setStatsData(statsRes.data);
      } catch (error) {
        console.error("API error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const summaryCards = [
    {
      title: "Deposit",
      amount: Number(statsData?.depositSuccess?.amount || 0),
      count: statsData?.depositSuccess?.count || 0,
      icon: IdCard,
    },
    {
      title: "Bank Payout",
      amount: Number(statsData?.transferSuccess?.amount || 0),
      count: statsData?.transferSuccess?.count || 0,
      icon: Hourglass,
    },
    {
      title: "Net Fee",
      amount: Number(statsData?.netFee?.amount || 0),
      count: statsData?.netFee?.count || 0,
      icon: IdCard,
    },
    {
      title: "Pending",
      amount: Number(statsData?.transferPending?.amount || 0),
      count: statsData?.transferPending?.count || 0,
      icon: Hourglass,
    },
  ];

  const successCount = pieData?.bankTransfer?.count || 0;
  const pendingCount = pieData?.pending?.count || 0;
  const failedCount = pieData?.failed?.count || 0;

  const total = successCount + pendingCount + failedCount || 1;

  const successRatio = (successCount / total) * 565;
  const pendingRatio = (pendingCount / total) * 565;
  const failedRatio = (failedCount / total) * 565;

  return (
    <div className="p-2 space-y-6 font-semibold">


      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-4xl p-5 shadow-sm animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-300 rounded w-32" />
                </div>
              </div>
            </div>
          ))
          : summaryCards.map((card, i) => (

            <div
              key={i}
              className="bg-white rounded-4xl p-5 flex items-center gap-4 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center">
                <card.icon size={20} className="text-indigo-600" />
              </div>
             <div>
  {/* Title ALWAYS visible */}
  <p className="text-sm text-gray-500">{card.title}</p>

  {/* Amount + Count */}
  {loading ? (
    <div className="flex items-center gap-2 mt-1">
      <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
      <div className="h-3 w-10 bg-gray-200 rounded animate-pulse" />
    </div>
  ) : (
    <h2 className="text-lg font-semibold">
      ₹ {card.amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}{" "}
      <span className="text-xs text-gray-400">
        ({card.count})
      </span>
    </h2>
  )}
</div>

            </div>
          ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LedgerTransactionsChart />

        <div className="bg-white rounded-2xl p-6 shadow-sm h-[360px] flex flex-col font-semibold">
          <h2 className="font-semibold mb-4">Bank Status</h2>

          <div className="flex-1 flex items-center justify-center relative">
            {loading ? (
              <div className="w-full flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gray-200 animate-pulse" />
              </div>
            ) : (

              <>
                <svg width="240" height="240">
                  <circle
                    cx="120"
                    cy="120"
                    r="90"
                    fill="none"
                    stroke="#6FB070"
                    strokeWidth="22"
                    strokeDasharray={`${successRatio} 565`}
                    transform="rotate(-90 120 120)"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="90"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="22"
                    strokeDasharray={`${pendingRatio} 565`}
                    strokeDashoffset={`-${successRatio}`}
                    transform="rotate(-90 120 120)"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="90"
                    fill="none"
                    stroke="#E0645C"
                    strokeWidth="22"
                    strokeDasharray={`${failedRatio} 565`}
                    strokeDashoffset={`-${successRatio + pendingRatio}`}
                    transform="rotate(-90 120 120)"
                  />
                </svg>

                {/* Center Text */}
                <div className="absolute flex flex-col items-center">
                  <p className="text-sm text-gray-500">Payout Initiated</p>
                  <h1 className="text-2xl font-bold mt-1">
                    ₹ {pieData?.initiated?.amount || "0.00"}
                  </h1>
                  <p className="text-sm text-gray-400">
                    ({pieData?.initiated?.count || 0})
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Legend (OLD CODE) */}
          <div className="flex flex-col gap-3 ml-auto mr-28 mb-8 text-sm -translate-y-40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              Success ({successCount})
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full" />
              Pending ({pendingCount})
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              Failed ({failedCount})
            </div>
          </div>
        </div>
      </div>


      {/* 🔥 Tabs + Table */}
      <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">

        {/* Tabs + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm border transition cursor-pointer ${activeTab === tab
                  ? "bg-[#1E1B4B] text-white"
                  : "bg-white border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            />
            <input
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <CBReportsTable activeTab={activeTab} searchText={searchText} />
      </div>
    </div>
  );
};

export default ConnectedBankingReport;
