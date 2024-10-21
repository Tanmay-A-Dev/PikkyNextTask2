"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (result && !result.error) {
            router.push("/"); 
        } else {
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded"
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded mb-4">
                Login
            </button>
            <p>
                Don’t have an account?{" "}
                <Link href="register" className="text-blue-600 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
