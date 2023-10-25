import { connectMongoDB } from '@/lib/mongodb';
import Misc from '@/models/miscModels';
import Order from '@/models/ordersModel';
import Products from '@/models/productModels';
import Profit from '@/models/profitsModels';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDB();
    const dataProducts = await Products.find();
    const dataOrders = await Order.find();
    const dataProfits = await Profit.find();
    const data = [dataOrders, dataProducts, dataProfits];
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}
