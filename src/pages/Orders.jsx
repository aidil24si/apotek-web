import { useState } from "react";
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";

export default function Order() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // Fungsi helper untuk warna badge status
    const getStatusColor = (status) => {
        switch (status) {
            case "Completed": return "bg-green-100 text-green-600";
            case "Pending": return "bg-yellow-100 text-yellow-600";
            case "Cancelled": return "bg-red-100 text-red-600";
            default: return "bg-gray-100 text-gray-600";
        }
    };

    // Logika Filtering
    const filteredOrders = ordersData.filter(order => {
        const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-8">
            <PageHeader title="Order List" breadcrumb={["Dashboard", "Order List"]} />

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                {/* Toolbar: Search & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <input 
                        type="text"
                        placeholder="Search customer or ID..."
                        className="w-full md:w-80 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 border border-transparent focus:border-green-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex gap-2">
                        {["All", "Completed", "Pending", "Cancelled"].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                    filterStatus === status 
                                    ? "bg-hijau text-white shadow-lg shadow-green-100" 
                                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-50">
                                <th className="pb-4 font-semibold">Order ID</th>
                                <th className="pb-4 font-semibold">Customer</th>
                                <th className="pb-4 font-semibold">Date</th>
                                <th className="pb-4 font-semibold">Price</th>
                                <th className="pb-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.map((order) => (
                                <tr key={order.orderId} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="py-4 font-bold text-hijau">{order.orderId}</td>
                                    <td className="py-4 font-medium text-gray-700">{order.customerName}</td>
                                    <td className="py-4 text-gray-500 text-sm">{order.orderDate}</td>
                                    <td className="py-4 font-bold text-gray-800">{order.totalPrice}</td>
                                    <td className="py-4">
                                        <span className={`px-4 py-1.5 rounded-lg text-xs font-bold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredOrders.length === 0 && (
                        <div className="text-center py-10 text-gray-400 italic">No orders found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}