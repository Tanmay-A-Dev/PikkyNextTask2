import React from 'react';

interface Flight {
    _id: string;
    flightNumber: string;
    origin: string;
    destination: string;
    scheduledDeparture: string;
    status: 'Scheduled' | 'Delayed' | 'Cancelled' | 'In-flight';
}

interface DashboardProps {
    flights: Flight[];
}

const Dashboard: React.FC<DashboardProps> = ({ flights }) => {
    const updateFlightStatus = async (flightId: string, newStatus: Flight['status']) => {
        const confirmed = window.confirm(`Are you sure you want to update the status to "${newStatus}"?`);
        if (confirmed) {
            try {
                const response = await fetch(`/api/flights/${flightId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: newStatus }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update flight status');
                }

                const updatedFlight = await response.json();
              
            } catch (error) {
                console.error('Error updating flight status:', error);
            }
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            {flights.length === 0 ? (
                <p>No flights available</p>
            ) : (
                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group">
                        <tr className="border border-gray-200 md:border-none block md:table-row">
                            <th className="p-2 md:p-4 text-left">Flight Number</th>
                            <th className="p-2 md:p-4 text-left">Origin</th>
                            <th className="p-2 md:p-4 text-left">Destination</th>
                            <th className="p-2 md:p-4 text-left">Scheduled Departure</th>
                            <th className="p-2 md:p-4 text-left">Status</th>
                            <th className="p-2 md:p-4 text-left">Actions</th> {/* New Actions Column */}
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {flights.map((flight) => (
                            <tr key={flight._id} className="border border-gray-200 md:border-none block md:table-row">
                                <td className="p-2 md:p-4">{flight.flightNumber}</td>
                                <td className="p-2 md:p-4">{flight.origin}</td>
                                <td className="p-2 md:p-4">{flight.destination}</td>
                                <td className="p-2 md:p-4">
                                    {new Date(flight.scheduledDeparture).toLocaleString()}
                                </td>
                                <td className="p-2 md:p-4">{flight.status}</td>
                                <td className="p-2 md:p-4">
                                    {/* Status Update Buttons */}
                                    <button
                                        onClick={() => updateFlightStatus(flight._id, 'Delayed')}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Delay
                                    </button>
                                    <button
                                        onClick={() => updateFlightStatus(flight._id, 'Cancelled')}
                                        className="text-red-500 hover:underline ml-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => updateFlightStatus(flight._id, 'In-flight')}
                                        className="text-green-500 hover:underline ml-2"
                                    >
                                        In-flight
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;
