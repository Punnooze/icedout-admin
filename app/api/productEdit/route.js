import { connectMongoDB } from '@/lib/mongodb';
import Misc from '@/models/miscModels';
import Products from '@/models/productModels';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get('sku');
    const data = await Products.find({ sku: sku });
    // const dataMisc = await Misc.find();
    // const data = [dataProduct, dataMisc];
    return NextResponse.json(
      { data: data, message: 'Successfully Created' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}
