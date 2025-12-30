import React from "react";

const Home = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Home Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          This is a dummy home page. You can replace this with real dashboard
          data later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#F4F6FF] p-4 rounded-xl">
            <h3 className="text-sm text-gray-500">Total Merchants</h3>
            <p className="text-2xl font-bold text-[#27234d] mt-1">120</p>
          </div>

          <div className="bg-[#F4F6FF] p-4 rounded-xl">
            <h3 className="text-sm text-gray-500">Total Transactions</h3>
            <p className="text-2xl font-bold text-[#27234d] mt-1">₹ 2,45,000</p>
          </div>

          <div className="bg-[#F4F6FF] p-4 rounded-xl">
            <h3 className="text-sm text-gray-500">Active Services</h3>
            <p className="text-2xl font-bold text-[#27234d] mt-1">8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
