import React, { useState } from "react";
import LedgerTransactionsChart from "./LedgerTransactionsChart";
import { Hourglass, Search, IdCard } from "lucide-react";

const ConnectedBankingReport = () => {
  const [activeTab, setActiveTab] = useState("Bank Summary");

  const summaryCards = [
    { title: "Deposit", amount: 0, count: 0, icon: IdCard },
    { title: "Bank Payout", amount: 0, count: 0, icon: Hourglass },
    { title: "Net Fee", amount: 0, count: 0, icon: IdCard },
    { title: "Pending", amount: 0, count: 0, icon: Hourglass },
  ];

  const tabs = [
    "Bank Summary",
    "Ledger Summary",
    "GST Statement",
    "Downloads",
  ];

  return (
    <div className="p-4 space-y-6">
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center">
              <card.icon size={20} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className="text-lg font-semibold">
                ₹ {card.amount.toFixed(2)}{" "}
                <span className="text-sm text-gray-400">
                  ({card.count})
                </span>
              </h2>
            </div>
          </div>
        ))}
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LedgerTransactionsChart />

        {/* BANK STATUS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm h-[360px] flex flex-col">
          <h2 className="font-semibold mb-4">Bank Status</h2>

          <div className="flex-1 flex items-center justify-center relative">
            <svg width="240" height="240">
              {/* RED HALF */}
              <circle
                cx="120"
                cy="120"
                r="90"
                fill="none"
                stroke="#E0645C"
                strokeWidth="22"
                strokeDasharray="282.5 565"
                strokeDashoffset="0"
                transform="rotate(-90 120 120)"
              />

              {/* GREEN HALF */}
              <circle
                cx="120"
                cy="120"
                r="90"
                fill="none"
                stroke="#6FB070"
                strokeWidth="22"
                strokeDasharray="282.5 565"
                strokeDashoffset="-282.5"
                transform="rotate(-90 120 120)"
              />
            </svg>

            {/* CENTER TEXT */}
            <div className="absolute flex flex-col items-center">
              <p className="text-sm text-gray-500">Payout Initiated</p>
              <h1 className="text-2xl font-bold mt-1">₹ 0.00</h1>
              <p className="text-sm text-gray-400">(0)</p>
            </div>
          </div>

          {/* LEGEND */}
          <div className="flex flex-col gap-3 ml-auto mr-28 mb-8 text-sm -translate-y-40">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              Success
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full" />
              Pending
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              Failed
            </div>
          </div>
        </div>
      </div>

      {/* TABS + SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center  md:justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm border transition
                ${
                  activeTab === tab
                    ? "bg-[#1E1B4B] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 cursor-pointer "
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-64">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-full text-sm"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-5 px-6 py-4 text-sm font-medium text-gray-500 bg-gray-50">
          <div>DATE</div>
          <div>IRN</div>
          <div>PAYOUT</div>
          <div>PENDING</div>
          <div>ACTION</div>
        </div>

        <div className="text-center py-10 text-gray-400 text-sm">
          No records available
        </div>
      </div>
    </div>
  );
};

export default ConnectedBankingReport;
