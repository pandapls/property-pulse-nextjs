import connectDB from '@/config/database';
import Property from '@/models/Property';
import { NextResponse } from 'next/server';
type Params = {
    id: string
}
export const GET = async (request: Request, { parmas }: { parmas: Params }) => {
    const { id } = parmas;
    try {
        await connectDB();
        const property = await Property.findById(id).lean();
        if (!property) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }
        return NextResponse.json({ property, code: '200' }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}