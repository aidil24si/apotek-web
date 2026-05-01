import PageHeader from "../components/PageHeader";
// Import data JSON yang berisi 30 data customer
import customerData from "../data/customers.json"; 

export default function Customers() {
    return (
        <div id="customers-container" className="p-10 animate-in fade-in duration-700">   
            
            {/* Menggunakan PageHeader yang sudah menerima props */}
            <PageHeader 
                title="Customers" 
                breadcrumb={["Dashboard", "Customer List"]}
            >
                {/*children*/}
                <button 
                    id="add-customer-button" 
                    className="bg-hijau hover:bg-green-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-green-100 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Add Customer
                </button>
            </PageHeader>

            <div id="customers-table" className="mt-10 overflow-x-auto rounded-[2rem] border border-gray-50 bg-white shadow-sm">
                <table className="w-full table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Customer ID</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Loyalty</th>
                            <th className="px-6 py-5 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* Melakukan mapping 30 data customer */}
                        {customerData.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                    #{customer.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {customer.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {customer.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {customer.phone}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                        customer.loyalty === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 
                                        customer.loyalty === 'Silver' ? 'bg-slate-100 text-slate-700' : 
                                        'bg-orange-100 text-orange-700'
                                    }`}>
                                        {customer.loyalty}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <button className="text-hijau hover:underline font-bold">Edit</button>
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