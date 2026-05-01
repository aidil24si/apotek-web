export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div className="flex items-center justify-between mb-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">
                    {title}
                </h1>
                <div className="flex items-center gap-2 text-sm">
                    {breadcrumb.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className={`font-semibold ${index === breadcrumb.length - 1 ? 'text-biru' : 'text-gray-400'}`}>
                                {item}
                            </span>
                            {index < breadcrumb.length - 1 && <span className="text-gray-300">/</span>}
                        </div>
                    ))}
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
}