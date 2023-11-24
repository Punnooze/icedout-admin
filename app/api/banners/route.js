import { connectMongoDB } from '../../../lib/mongodb';
import Banner from '../../../models/bannersModels';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDB();
    const banner = await Banner.find();
    return NextResponse.json({ data: banner }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: 'Could Not Fetch' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { data } = await request.json();
    const product = await Banner.create(data);
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

export async function PUT(request) {
  try {
    const { data } = await request.json();
 
    const product = await Banner.findByIdAndUpdate(data._id, {
      bannerName: data.bannerName,
      images: data.images,
    });
    if (product)
    return NextResponse.json({ data: 'Successfully Created' }, { status: 200 });
    else
      return NextResponse.json({ data: 'Could Not Create' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: 'Could Not Create' }, { status: 500 });
  }
}
