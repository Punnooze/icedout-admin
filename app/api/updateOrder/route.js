import Order from '@/models/ordersModel';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const { data } = await request.json();
    const updatedOrder = await Order.findByIdAndUpdate(data._id, {
      status: data.status,
      trackingLink: data.trackingLink,
    });
    return NextResponse.json({ data: updatedOrder }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: 'Error updating order' }, { status: 500 });
  }
}
