import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { authStore } from "../store/authStore";
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const { isLoading, login, error, } = authStore();

    const handleLogin = async (e) => {
        e.preventDefault();

        await login(email, password);
        navigate('/');



    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10"
            >
                <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin}>
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex justify-end mb-6">
                        <Link
                            to="/forgot-password"
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {error && (
                        <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-green-500 text-white font-bold rounded-full shadow-lg hover:from-indigo-700 hover:to-green-600 transition"
                    >
                        {isLoading ? (
                            <Loader className="w-6 h-6 animate-spin mx-auto" />
                        ) : (
                            "Login"
                        )}
                    </motion.button>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
