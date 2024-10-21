"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Dashboard from "./components/Dashboard";
import AddFlightForm from "./components/AddFlightForm";

export default function Home() {
    const { data: session } = useSession();
    const [flights, setFlights] = useState([]);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!session && pathname !== "/auth/register" && pathname !== "/auth/login") {
            router.push("/login");
        }

        const fetchFlights = async () => {
            try {
                const res = await fetch("/api/flights");
                const data = await res.json();
                setFlights(data);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        };

        fetchFlights();
    }, [session]);

    if (!session) {
        return null; 
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Flight Management Dashboard</h1>
            <AddFlightForm />
            <Dashboard flights={flights} />
            <button onClick={() => signOut()} className="text-red-500 mt-4">
                Logout
            </button>
        </main>
    );
}
