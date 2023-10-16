import { connectMongoDB } from '@/lib/mongodb';
import Order from '@/models/ordersModel';
import Products from '@/models/productModels';
import { NextResponse } from 'next/server';

await connectMongoDB();

export async function POST(request) {
  try {
    const { data } = await request.json();
    const product = await Products.create(data);

    if (product)
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

export async function GET() {
  try {
    const data = await Products.find();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { data } = await request.json();
    const product = await Products.findByIdAndDelete(data._id);
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
