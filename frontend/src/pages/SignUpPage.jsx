import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Mail, User, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { authStore } from "../store/authStore";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { signup, error, isLoading } = authStore();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
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
                    Create Account
                </h2>

                <form onSubmit={handleSignUp}>
                    <Input
                        icon={User}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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

                    {error && (
                        <p className="text-red-600 font-semibold mt-2 text-center">{error}</p>
                    )}

                    <PasswordStrengthMeter password={password} />

                    <motion.button
                        className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-green-500 text-white font-bold rounded-full shadow-lg hover:from-indigo-700 hover:to-green-600 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader className="animate-spin mx-auto" size={24} />
                        ) : (
                            "Sign Up"
                        )}
                    </motion.button>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                        Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
