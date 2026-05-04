import { BiRun } from "react-icons/bi"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai"; 
import { GiTerror } from "react-icons/gi"; 
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Login() {
    /* navigate, state & handleChange*/
    const navigate = useNavigate() 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    /* process form */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.message);
                    return; 
                }
                navigate("/");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message || "An error occurred");
                } else {
                    setError(err.message || "An unknown error occurred");
                }
            })
            .finally(() => {
                setLoading(false); 
            });
    }

    /* error & loading status */
    const errorInfo = error ? (
        <div className="bg-red-50 mb-5 p-4 text-sm font-medium text-red-600 rounded-xl flex items-center border border-red-100">
            <GiTerror className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null
    
    const loadingInfo = loading ? (
        // FOKUS: Mengganti ke nuansa biru transparan
        <div className="bg-biru/10 mb-5 p-4 text-sm font-medium text-biru rounded-xl flex items-center border border-biru/20">
            <AiOutlineLoading3Quarters className="me-2 animate-spin" />
            Memvalidasi Akun...
        </div>
    ) : null        

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Welcome Back 👋
            </h2>
             {errorInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        // FOKUS: Tambahkan focus biru
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400 outline-none focus:ring-2 focus:ring-biru/20 focus:border-biru transition-all"
                        placeholder="you@example.com"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        // FOKUS: Tambahkan focus biru
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm
                            placeholder-gray-400 outline-none focus:ring-2 focus:ring-biru/20 focus:border-biru transition-all"
                        placeholder="********"
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    // FOKUS: Ganti bg-green ke bg-biru
                    className="w-full bg-biru hover:bg-biru/90 disabled:bg-gray-300 text-white font-semibold py-2 px-4
                        rounded-lg transition duration-300 shadow-lg shadow-biru/20 active:scale-[0.98]"
                >
                    {loading ? "Sabar ya..." : "Login"}
                </button>
            </form>
        </div>
    )
}