import { connectMongoDB } from '@/lib/mongodb';
import Products from '@/models/productModels';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get('sku');
    const data = await Products.find({ sku: sku });
    return NextResponse.json(
      { data: data, message: 'Successfully Created' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}

