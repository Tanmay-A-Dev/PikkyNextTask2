"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); // Add state for email
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password  }), // Include email in the request
            });

            if (response.ok) {
                toast.success("Registration successful! You can now log in.");
                setTimeout(() => {
                    router.push("/auth/login");
                }, 3000);
            } else {
                const errorData = await response.json();
                toast.error(`Registration failed: ${errorData.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded"
            />
            <input
                type="email"
                placeholder="Email" // Add email input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded"
            />
            <button onClick={handleRegister} className="bg-green-500 text-white p-2 rounded mb-4">
                Register
            </button>
            <p>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                    Login here
                </Link>
            </p>
            <ToastContainer />
        </div>
    );
};

export default RegisterPage;
