import { connectMongoDB } from '../../../lib/mongodb';
import Misc from '../../../models/miscModels';
import Products from '../../../models/productModels';
import Profit from '../../../models/profitsModels';
import { NextResponse } from 'next/server';

await connectMongoDB();

export async function POST(request) {
  try {
    const { data } = await request.json();
    console.log(data[0], data[1]);
    const product = await Products.create(data[0]);
    if (product) {
      const prof = {
        productId: product._id,
        profit: data[1],
      };
      const profit = await Profit.create(prof);

      if (profit)
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

export async function GET() {
  try {
    const dataProducts = await Products.find().sort({ updatedAt: -1 });
    const dataMisc = await Misc.find();
    const data = [dataProducts, dataMisc];
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: false }, { status: 500 });
  }
}

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function DELETE(request) {
  try {
    const { data } = await request.json();

    data.images.forEach((image) => {
      const parts = image.split('/');
      const publicIdWithExtension = parts[parts.length - 1];
      const public_id = publicIdWithExtension.split('.')[0];

      cloudinary.uploader.destroy(public_id, async function (error, result) {
        if (error) {
          return NextResponse.json(
            { message: 'Error Deleting from Cloudinary' },
            { status: 200 }
          );
        }
      });
    });

    const product = await Products.findByIdAndDelete(data._id);
    const findProfit = await Profit.find({ productId: data._id });
    const profit = await Profit.findByIdAndDelete(findProfit[0]._id);

    if (product && profit)
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
