import { connectMongoDB } from '../../../lib/mongodb';
import Misc from '../../../models/miscModels';
import Products from '../../../models/productModels';
import Profit from '../../../models/profitsModels';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get('sku');
    const product = await Products.find({ sku: sku });
    if (product) {
      return NextResponse.json(
        { data: product, message: 'Successfully Created' },
        { status: 200 }
      );
    }
    else
    return NextResponse.json({ data: false }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}
