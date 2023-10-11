import Order from '@/models/ordersModel';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await Order.find();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}


