export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div 
            id="pageheader-container" 
            // Ubah menjadi flex-col di mobile, dan sejajar (flex-row) di layar medium ke atas (md:)
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10"
        >
            <div id="pageheader-left" className="flex flex-col gap-1.5 md:gap-2">
                <h1 
                    id="page-title" 
                    // Perkecil sedikit di mobile (text-2xl), kembali ke 32px di layar md ke atas
                    className="font-poppins text-2xl md:text-[32px] font-black text-gray-900 leading-tight tracking-tight"
                >
                    {title}
                </h1>
                
                <div id="breadcrumb-links" className="flex items-center flex-wrap gap-2 text-xs md:text-sm">
                    {Array.isArray(breadcrumb) ? (
                        breadcrumb.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                {/* Konsisten menggunakan biru #2563EB */}
                                <span className="font-semibold text-[#2563EB] cursor-pointer hover:underline transition-all">
                                    {item}
                                </span>
                                {/* Pemisah Breadcrumb */}
                                {index < breadcrumb.length - 1 && (
                                    <span className="font-bold text-gray-300">/</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <span className="font-medium text-gray-400">{breadcrumb}</span>
                    )}
                </div>
            </div>

            {/* Tempat untuk tombol aksi (seperti tombol "Tambah Pasien" atau "Export PDF") */}
            {children && (
                <div id="action-button" className="mt-2 md:mt-0 flex shrink-0">
                    {children}
                </div>
            )}
        </div>
    );
}