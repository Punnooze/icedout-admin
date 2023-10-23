import { connectMongoDB } from '@/lib/mongodb';
import Misc from '@/models/miscModels';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await Misc.find();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}
