"use client"
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import AddFlightForm from "./components/AddFlightForm";

export default function Home() {
  const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const res = await fetch('/api/flights');
                const data = await res.json();
                setFlights(data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights();
    }, []);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Flight Management Dashboard</h1>
            <AddFlightForm />
            <Dashboard flights={flights} />
        </main>
    );
}
