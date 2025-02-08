import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    
    await connectDB();
    const booking = await Booking.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!booking) {
      return new NextResponse('Booking not found', { status: 404 });
    }
    
    return NextResponse.json(booking);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}