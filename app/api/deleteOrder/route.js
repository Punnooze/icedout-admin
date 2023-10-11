import Order from '@/models/ordersModel';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  try {
    const { data } = await request.json();
    const updatedOrder = await Order.findByIdAndDelete(data._id);

    console.log(updatedOrder);
    return NextResponse.json({ message: 'Successfully Deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: 'Error updating order' }, { status: 500 });
  }
}
