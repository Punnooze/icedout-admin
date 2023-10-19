import { connectMongoDB } from '@/lib/mongodb';
import Banner from '@/models/bannersModels';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDB();
    const coupon = await Banner.find();
    return NextResponse.json({ data: coupon }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: 'Could Not Fetch' }, { status: 500 });
  }
}
