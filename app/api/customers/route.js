import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/usersModels';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDB();
    const data = await User.find();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}
