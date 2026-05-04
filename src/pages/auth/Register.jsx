export default function Register() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account ✨
            </h2>

            <form>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        // FOKUS: Menggunakan focus:ring-biru dan focus:border-biru
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400 outline-none focus:ring-2 focus:ring-biru/20 focus:border-biru transition-all"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        // FOKUS: Menggunakan focus:ring-biru dan focus:border-biru
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400 outline-none focus:ring-2 focus:ring-biru/20 focus:border-biru transition-all"
                        placeholder="********"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        // FOKUS: Menggunakan focus:ring-biru dan focus:border-biru
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400 outline-none focus:ring-2 focus:ring-biru/20 focus:border-biru transition-all"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    // FOKUS: Ganti bg-green-500 ke bg-biru dan tambahkan shadow-biru/20
                    className="w-full bg-biru hover:bg-biru/90 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300 shadow-lg shadow-biru/20 active:scale-[0.98]"
                >
                    Register
                </button>
            </form>
        </div>
    )
}