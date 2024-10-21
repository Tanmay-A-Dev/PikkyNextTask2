import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Flight from '../../../models/Flight';

export async function GET() {
    try {
        await connectToDatabase();
        const flights = await Flight.find({});
        return NextResponse.json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
        return NextResponse.json({ error: 'Failed to fetch flights' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    
    try {
        await connectToDatabase();
        const flightData = await request.json();

        const newFlight = new Flight(flightData);
        await newFlight.save();

        return NextResponse.json(newFlight, { status: 201 });
    } catch (error) {
        console.error('Error adding flight:', error);
        return NextResponse.json({ error: 'Failed to add flight' }, { status: 500 });
    }
}
