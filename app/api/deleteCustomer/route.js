import User from '@/models/usersModels';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  try {
    const { data } = await request.json();
    const updatedOrder = await User.findByIdAndDelete(data._id);
    if (updatedOrder)
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
