export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between mb-10">
            <div id="pageheader-left" className="flex flex-col gap-2">
                <h1 id="page-title" className="font-poppins text-[32px] font-bold text-gray-900 leading-none">
                    {title}
                </h1>
                <div id="breadcrumb-links" className="flex items-center gap-2 text-sm">
                    {Array.isArray(breadcrumb) ? (
                        breadcrumb.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="font-semibold text-hijau cursor-pointer hover:underline">
                                    {item}
                                </span>
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
            <div id="action-button">
                {children}
            </div>
        </div>
    );
}