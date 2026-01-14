import React, { useEffect, useState } from "react";
import api from "../axiosInstance";

const API_MAP = {
  "Bank Summary":
    "https://mp9b2da75ccb093e918c.free.beeceptor.com/cb-reports/bank-summary",
  "Ledger Summary":
    "https://mpc5eee63f29559b8582.free.beeceptor.com/cb-reports/ledger-summary",
  "GST Statement":
    "https://mp06dc466021b08c9ae7.free.beeceptor.com/cb-reports/gst-statement",
  Downloads:
    "https://mp62579b49008ba480bd.free.beeceptor.com/cb-reports/downloads",
};

const CBReportsTable = ({ activeTab, searchText }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoading(true);
        const res = await api.get(API_MAP[activeTab]);
        setRows(res?.data?.data || []);
      } catch (error) {
        console.error("Table API error:", error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [activeTab]);

  const filteredRows = rows.filter((item) => {
    if (!searchText) return true;
    return Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const renderHeader = () => {
    switch (activeTab) {
      case "Bank Summary":
        return ["Date", "IRN", "Payout", "Pending", "Action"];
      case "Ledger Summary":
        return ["IRN", "Deposit", "Refund", "Net Fee", "GST"];
      case "GST Statement":
        return ["Month", "IRN", "Amount", "GST", "Invoice"];
      case "Downloads":
        return ["IRN", "File Name", "Type", "Status", "Action"];
      default:
        return [];
    }
  };

  const renderRows = () => {
   if (loading)
  return Array.from({ length: 5 }).map((_, i) => (
    <div
      key={i}
      className="grid grid-cols-5 px-6 py-4 border-t border-gray-300 animate-pulse"
    >
      {Array.from({ length: 5 }).map((_, j) => (
        <div key={j} className="h-3 bg-gray-200 rounded w-24" />
      ))}
    </div>
  ));


    if (!filteredRows.length)
      return (
        <div className="py-10 text-center text-gray-400 text-sm">
          No records available
        </div>
      );

    return filteredRows.map((item, i) => (
      <div
        key={i}
        className="grid grid-cols-5 px-6 py-4 text-xs border-t border-gray-300"
      >
        {activeTab === "Bank Summary" && (
          <>

            <div>
              {new Date(item.date).toLocaleDateString()}{" "}
              <span className="text-gray-400">
                {new Date(item.date).toLocaleTimeString()}
              </span>
            </div>

            <div className="text-indigo-600">{item.irn}</div>
            <div className="text-[#d95e5a]">
              ₹ {Number(item.payoutAmount).toLocaleString("en-IN")}
            </div>
            <div className="text-[#e3a93f]">
              ₹ {Number(item.pendingAmount).toLocaleString("en-IN")}
            </div>

            <div className="text-indigo-600 cursor-pointer">
              View
            </div>
          </>
        )}

        {activeTab === "Ledger Summary" && (
          <>
            <div className="text-indigo-600">{item.irn}</div>
            <div className="text-[#6FB070]">₹ {item.depositAmount}</div>
            <div>₹ {item.refundAmount}</div>
            <div>₹ {item.netfee}</div>
            <div>{item.gst}</div>
          </>
        )}

        {activeTab === "GST Statement" && (
          <>
            <div>{item.month}</div>
            <div>{item.irn}</div>
            <div>₹ {item.requestedAmount}</div>
            <div>
              CGST {item.cgst} + SGST {item.sgstOrUgst}
            </div>
            <a
              href={item.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600"
            >
              Download
            </a>
          </>
        )}

        {activeTab === "Downloads" && (
          <>
            <div className="text-indigo-600">{item.irn}</div>
            <div>{item.name}</div>
            <div>{item.type}</div>
            <div>
              {item.status === 0 ? "Processing" : "Ready"}
            </div>
            <div className="text-indigo-600 cursor-pointer">
              Download
            </div>
          </>
        )}
      </div>
    ));
  };

  return (
    <div>
      <div className="grid grid-cols-5 rounded-4xl px-6 py-4 text-sm font-semibold text-black bg-[#f4f6f7]">
        {renderHeader().map((h) => (
          <div key={h}>{h}</div>
        ))}
      </div>
      {renderRows()}
    </div>
  );
};

export default CBReportsTable;
