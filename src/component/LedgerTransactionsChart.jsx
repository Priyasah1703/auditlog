import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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

  const depositData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const deductionData = [0, 0, 118, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const data = {
    labels,
    datasets: [
      {
        label: "Deposit",
        data: depositData,
        backgroundColor: "#4ade80",
        borderRadius: 6,
        barThickness: 30,
      },
      {
        label: "Deduction",
        data: deductionData,
        backgroundColor: "#ef4444",
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
          pointStyle: "rect",
          boxWidth: 10,
          font: { size: 12 },
        },
      },

      // Tooltip
      tooltip: {
        backgroundColor: "#2f2f2f",
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label; // e.g. 15:00
          },
          label: (context) => {
            const value = context.raw ?? 0;
            return `${context.dataset.label}: ₹${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 140,
        ticks: {
          stepSize: 20,
        },
        grid: {
          color: "#f1f5f9",
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
