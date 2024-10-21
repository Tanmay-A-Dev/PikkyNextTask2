"use client"; 

import React, { useState } from 'react';

const AddFlightForm = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [scheduledDeparture, setScheduledDeparture] = useState('');
    const [status, setStatus] = useState('Scheduled');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const flightData = {
            flightNumber,
            origin,
            destination,
            scheduledDeparture,
            status,
        };

        try {
            const response = await fetch('/api/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flightData),
            });

            if (response.ok) {
                alert('Flight added successfully!');
                setFlightNumber('');
                setOrigin('');
                setDestination('');
                setScheduledDeparture('');
                setStatus('Scheduled');
            } else {
                alert('Failed to add flight');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the flight');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
                type="text"
                placeholder="Flight Number"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <input
                type="text"
                placeholder="Origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <input
                type="datetime-local"
                placeholder="Scheduled Departure"
                value={scheduledDeparture}
                onChange={(e) => setScheduledDeparture(e.target.value)}
                className="border p-2 rounded"
                required
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="Scheduled">Scheduled</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="In-flight">In-flight</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add Flight
            </button>
        </form>
    );
};

export default AddFlightForm;
