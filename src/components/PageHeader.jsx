import React from "react";
import { ChevronRight } from "lucide-react"; // Shadcn default menggunakan lucide untuk ikon

// Import komponen Breadcrumb dari ekosistem Shadcn UI
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div 
            id="pageheader-container" 
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10 font-sans"
        >
            <div id="pageheader-left" className="flex flex-col gap-1.5 md:gap-2">
                {/* Judul Halaman Dashboard */}
                <h1 
                    id="page-title" 
                    className="text-2xl md:text-[32px] font-black text-gray-900 leading-tight tracking-tight"
                >
                    {title}
                </h1>
                
                {/* Navigasi Rekam Jejak (Breadcrumb Shadcn UI) */}
                <Breadcrumb>
                    <BreadcrumbList className="flex-wrap gap-1.5 md:gap-2 text-xs md:text-sm font-medium">
                        {Array.isArray(breadcrumb) ? (
                            breadcrumb.map((item, index) => {
                                const isLast = index === breadcrumb.length - 1;
                                return (
                                    <React.Fragment key={index}>
                                        <BreadcrumbItem>
                                            {isLast ? (
                                                <BreadcrumbPage className="font-semibold text-gray-500">
                                                    {item}
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink 
                                                    href="#" 
                                                    className="font-bold text-[#2563EB] hover:text-blue-700 hover:underline transition-colors"
                                                >
                                                    {item}
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                        
                                        {/* Menampilkan separator otomatis jika bukan elemen terakhir */}
                                        {!isLast && (
                                            <BreadcrumbSeparator>
                                                <ChevronRight className="h-3.5 w-3.5 text-gray-300 stroke-[3]" />
                                            </BreadcrumbSeparator>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-semibold text-gray-400">
                                    {breadcrumb}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Wadah Tombol Aksi Kanan (Tambah Data, Export, dll) */}
            {children && (
                <div id="action-button" className="mt-1 md:mt-0 flex shrink-0 items-center">
                    {children}
                </div>
            )}
        </div>
    );
}