import PageHeader from "../components/PageHeader";
// Pastikan path import ini sesuai dengan tempat kamu menyimpan file JSON tadi
import orderData from "../data/orders.json"; 

export default function Orders() {
    return (
        <div id="orders-container" className="p-10 animate-in fade-in duration-700">   
            
            {/* Mengaktifkan PageHeader dengan props baru */}
            <PageHeader 
                title="Orders" 
                breadcrumb={["Dashboard", "Order List"]}
            >
                {/* Tombol Add Order dimasukkan sebagai children */}
                <button 
                    id="add-button" 
                    className="bg-hijau hover:bg-green-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-green-100 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Add New Order
                </button>
            </PageHeader>

            <div id="orders-table" className="mt-10 overflow-x-auto rounded-[2rem] border border-gray-50 bg-white shadow-sm">           
                <table className="w-full table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Customer Name</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Total Price</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Order Date</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* Iterasi 30 data dari JSON */}
                        {orderData.map((order) => (
                            <tr key={order.orderId} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                    #{order.orderId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {order.customerName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                        order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                    {order.totalPrice}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.orderDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <button className="text-hijau hover:underline font-bold">View</button>
                                    <button className="ml-4 text-red-500 hover:underline font-bold">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}