import React from "react";

const Table = ({ filteredLogs }) => {
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="w-full bg-white rounded-4xl mt-4">
            <table className="min-w-full text-xs text-left">
                <thead>
                    <tr className="grid grid-cols-8 bg-[#f4f6f7] rounded-full">
                        <th className="py-3 px-4 rounded-l-[1.5rem]">DATE</th>
                        <th className="py-3 px-4">SUB-CATEGORY</th>
                        <th className="py-3 px-4">EVENT</th>
                        <th className="py-3 px-4">UID</th>
                        <th className="py-3 px-4">EVENT TYPE</th>
                        <th className="py-3 px-4">IP ADDRESS</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4 rounded-r-[1.5rem]">ACTION</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredLogs.map((item) => (
                        <tr
                            key={item.log_id}
                            className="grid grid-cols-8 my-2 items-center"
                        >
                            <td className="py-3 px-4">
                                {formatDate(item.timestamp)}
                            </td>

                            <td className="py-3 px-4">
                                {item.sub_category}
                            </td>

                            <td className="py-3 px-4">
                                {item.event_description}
                            </td>

                            <td className="py-3 px-4">
                                {item.actor_uid}
                            </td>

                            <td className="py-3 px-4">
                                {item.event_type}
                            </td>

                            <td className="py-3 px-4">
                                {item.ip_address}
                            </td>

                            <td className="py-3 px-4">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "success"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </td>

                            <td className="py-3 px-4 text-[#3b31a1] cursor-pointer">
                                View
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
