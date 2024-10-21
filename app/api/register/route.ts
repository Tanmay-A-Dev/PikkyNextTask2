import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../models/User'; 
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json(); 

        await connectToDatabase();
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword }); 
        await newUser.save();

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
    }
}
