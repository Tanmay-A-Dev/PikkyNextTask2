import mongoose, { Schema, Document } from 'mongoose';

interface IFlight extends Document {
    flightNumber: string;
    origin: string;
    destination: string;
    scheduledDeparture: Date;
    status: string;
}

const FlightSchema: Schema = new Schema({
    flightNumber: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    scheduledDeparture: { type: Date, required: true },
    status: { type: String, required: true, enum: ['Scheduled', 'Delayed', 'Cancelled', 'In-flight'] }
});

export default mongoose.models.Flight || mongoose.model<IFlight>('Flight', FlightSchema);
