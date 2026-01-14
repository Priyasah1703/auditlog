import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import api from "../axiosInstance";

// Register chart modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const LedgerTransactionsChart = () => {
  const labels = [
    "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00",
  ];

  const [depositData, setDepositData] = useState(
    Array(labels.length).fill(0)
  );
  const [deductionData, setDeductionData] = useState(
    Array(labels.length).fill(0)
  );

  const formatAmount = (value) => {
    if (value >= 1_000_000) return `${value / 1_000_000}M`;
    if (value >= 1_000) return `${value / 1_000}K`;
    return value;
  };

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const res = await api.get(
          "https://api.allorigins.win/raw?url=" +
            encodeURIComponent(
              "https://formatjsononline.com/api/json/cb-reports-bar-chart"
            )
        );

        const response = res.data;

        const depositArr = Array(labels.length).fill(0);
        const deductionArr = Array(labels.length).fill(0);

        response.forEach((item) => {
          if (item.tag === "deposit") {
            item.data.forEach((d) => {
              const index = labels.indexOf(d.hour);
              if (index !== -1) {
                depositArr[index] = Number(d.amount);
              }
            });
          }

          if (item.tag === "deduction") {
            item.data.forEach((d) => {
              const index = labels.indexOf(d.hour);
              if (index !== -1) {
                deductionArr[index] = Number(d.amount);
              }
            });
          }
        });

        setDepositData(depositArr);
        setDeductionData(deductionArr);
      } catch (error) {
        console.error("Bar chart API error", error);
      }
    };

    fetchBarChartData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Deposit",
        data: depositData,
        backgroundColor: "#6FB070",
        borderRadius: 6,
        barThickness: 30,
      },
      {
        label: "Deduction",
        data: deductionData,
        backgroundColor: "#E0645C",
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 9,
          },
        },
      },
      tooltip: {
        backgroundColor: "#2f2f2f",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const value = context.raw ?? 0;
            return `${context.dataset.label}: ₹${formatAmount(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f1f5f9",
        },
        ticks: {
          callback: (value) => formatAmount(value),
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-[360px] flex flex-col">
      <h2 className="font-semibold text-gray-800 mb-4">
        Ledger Transactions
      </h2>

      <div className="flex-1">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default LedgerTransactionsChart;
