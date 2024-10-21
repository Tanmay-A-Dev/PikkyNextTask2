// app/api/flights/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import Flight from '../../../../models/Flight';


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    debugger;
    const flightId = params.id;
    console.log("c id",flightId)
    const { status } = await request.json();

    try {
        await connectToDatabase();
        const updatedFlight = await Flight.findByIdAndUpdate(flightId, { status } , { new: true });

        if (!updatedFlight) {
            return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
        }

        return NextResponse.json(updatedFlight);
    } catch (error) {
        console.error('Error updating flight status:', error);
        return NextResponse.json({ error: 'Failed to update flight status' }, { status: 500 });
    }
}