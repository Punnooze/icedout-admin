import { connectMongoDB } from '../../../lib/mongodb';
import Profit from '../../../models/profitsModels';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log('id',id);
    const data = await Profit.find({ productId: id });
    console.log(data);
    return NextResponse.json(
      { data: data, message: 'Successfully Created' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}
