import { MdOutlineLocalPharmacy, MdOutlineLocalShipping, MdOutlineCancel, MdAttachMoney } from "react-icons/md";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    const stats = [
        { label: "Total Orders", value: "75", icon: <MdOutlineLocalPharmacy />, color: "bg-blue-50 text-biru" },
        { label: "Total Delivered", value: "357", icon: <MdOutlineLocalShipping />, color: "bg-green-50 text-green-600" },
        { label: "Total Canceled", value: "65", icon: <MdOutlineCancel />, color: "bg-red-50 text-red-500" },
        { label: "Total Revenue", value: "$128", icon: <MdAttachMoney />, color: "bg-yellow-50 text-yellow-600" },
    ];

    return (
        <div>
            <PageHeader title="Dashboard" breadcrumb={["Apotek", "Analisis Overview"]} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                        <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl ${item.color}`}>
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tambahkan Chart atau Tabel di bawah sini nanti */}
        </div>
    );
}