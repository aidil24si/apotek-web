// src/components/Loading.jsx
export default function Loading() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50/50 backdrop-blur-sm">
            {/* Spinner Biru Medis */}
            <div className="h-16 w-16 animate-spin rounded-full border-8 border-gray-200 border-t-biru"></div>
            <p className="mt-4 font-poppins font-bold text-gray-500 animate-pulse">
                Menyiapkan Data Apotek...
            </p>
        </div>
    );
}