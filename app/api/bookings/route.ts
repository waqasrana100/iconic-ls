import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    return NextResponse.json(bookings);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    await connectDB();
    const booking = await Booking.create(body);
    
    return NextResponse.json(booking);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}