import connectDB from '@/config/database';
import Property from '@/models/Property';
import { NextResponse } from 'next/server';
export const GET = async () => {
    try {
        await connectDB();
        const properties = await Property.find({}).lean();
        return NextResponse.json({ properties }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}