export default function ErrorPage({ errorCode, errorTitle, errorImg }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in zoom-in duration-500">
            <img 
                src={errorImg || "https://illustrations.popsy.co/gray/error-404.svg"} 
                alt={`Error ${errorCode}`} 
                className="w-64 mb-8 drop-shadow-md" 
            />
            <h1 className="text-8xl font-black text-gray-900 leading-none">{errorCode}</h1>
            <p className="text-xl text-gray-500 mt-4 font-medium max-w-md mx-auto">{errorTitle}</p>
            <button 
                onClick={() => window.history.back()}
                className="mt-10 bg-hijau hover:bg-green-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-100 transition-all active:scale-95"
            >
                Back to Previous Page
            </button>
        </div>
    );
}