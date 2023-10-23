import { NextResponse } from 'next/server';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});
export async function DELETE(request) {
  try {
    const { public_id } = await request.json();

    cloudinary.uploader.destroy(public_id, async function (error, result) {
      if (error) {
        return NextResponse.json(
          { message: 'Error Deleting from Cloudinary' },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: 'Successfully Deleted' },
          { status: 200 }
        );
      }
    });
    return NextResponse.json(
      { message: 'Successfully Deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Could Not Delete' }, { status: 500 });
  }
}
