import { connectMongoDB } from '../../../lib/mongodb';
import Coupon from '../../../models/couponModels';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = await Coupon.find({ _id: id });
    return NextResponse.json(
      { data: data, message: 'Successfully Created' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}
