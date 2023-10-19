import { connectMongoDB } from '@/lib/mongodb';
import Coupon from '@/models/couponModels';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDB();
    const coupon = await Coupon.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: coupon }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: 'Could Not Fetch' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { data } = await request.json();
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

export async function DELETE(request) {
  try {
    const { data } = await request.json();
    console.log(data);
    const product = await Coupon.findByIdAndDelete(data._id);
    if (product)
      return NextResponse.json(
        { message: 'Successfully Deleted' },
        { status: 200 }
      );
    else
      return NextResponse.json({ data: 'Could Not Delete' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: 'Could Not Delete' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { data } = await request.json();
    const product = await Coupon.findByIdAndUpdate(
      data._id,
      {
        couponID: data.couponID,
        couponName: data.couponName,
        expiry: data.expiry,
        percentage: data.percentage,
        minPurchase: data.minPurchase,
        deliverFee: data.deliverFee,
        percentageDiscount: data.percentageDiscount,
      },
      { new: true }
    );
    // const product = await Coupon.findById(data._id);
    console.log(product);
    if (product)
      return NextResponse.json(
        { data: 'Successfully Created' },
        { status: 200 }
      );

    return NextResponse.json(
      { data: 'Error Updating Product' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ data: 'Error updating order' }, { status: 500 });
  }
}
