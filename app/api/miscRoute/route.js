import { connectMongoDB } from '@/lib/mongodb';
import Misc from '@/models/miscModels';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { data } = await request.json();
    // console.log(data);
    const misc = await Misc.create(data);
    if (misc)
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
    console.log(data);
    const misc = await Misc.findOne({ miscName: data.miscName });
    console.log(misc);
    if (misc) {
      const miscelleneous = await Misc.findByIdAndUpdate(misc._id, {
        miscData: data.miscData,
      });
      if (miscelleneous)
        return NextResponse.json(
          { data: 'Successfully Created' },
          { status: 200 }
        );
      else
        return NextResponse.json({ data: 'Could Not Create' }, { status: 200 });
    } else
      return NextResponse.json({ data: 'Could Not Create' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: 'Could Not Create' }, { status: 500 });
  }
}
