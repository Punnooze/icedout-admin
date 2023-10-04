import { connectMongoDB } from '@/lib/mongodb';
import Address from '@/models/addressModels';
import Order from '@/models/ordersModel';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDB();
    const data = await Address.find();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}
