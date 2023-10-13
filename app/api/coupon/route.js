import { connectMongoDB } from '@/lib/mongodb';
import Coupon from '@/models/couponModels';
import Order from '@/models/ordersModel';
import Products from '@/models/productModels';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { data } = await request.json();
    await connectMongoDB();
    const coupon = await Coupon.create(data);
    if (coupon)
      return NextResponse.json(
        { data: 'Successfully Created' },
        { status: 200 }
      );
    else
      return NextResponse.json({ data: 'Could Not Create' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: 'Could Not Create' }, { status: 500 });
  }
}
