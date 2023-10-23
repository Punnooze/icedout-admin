import crypto from 'crypto';
import { NextResponse } from 'next/server';

const generateSHA1 = (data) => {
  const hash = crypto.createHash('sha1');
  hash.update(data);
  return hash.digest('hex');
};

const generateSignature = (timestamp, apiSecret) => {
  return `timestamp=${timestamp}${apiSecret}`;
};
export async function GET() {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = generateSHA1(
      generateSignature(
        timestamp,
        process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
      )
    );

    const resp = {
      success: true,
      data: [timestamp, signature],
    };
    return NextResponse.json(resp);
  } catch (err) {
    console.log(err);
    const resp = {
      success: false,
      error: JSON.stringify(err),
    };
    return NextResponse.json(resp);
  }
}

// // import { v2 as cloudinary } from 'cloudinary';

// // export default async function handler(req, res) {
// //   const body = JSON.parse(req.body) || {};
// //   const { paramsToSign } = body;

// //   const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;

// //   try {
// //     const signature = cloudinary.utils.api_sign_request(
// //       paramsToSign,
// //       apiSecret
// //     );
// //     res.json({ signature });
// //   } catch (error) {
// //     console.log(error);
// //     res.send(error);
// //   }
// // }
