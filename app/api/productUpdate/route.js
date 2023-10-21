import Products from '@/models/productModels';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const { data } = await request.json();
    const product = await Products.findByIdAndUpdate(
      data._id,
      {
        sku: data.sku,
        name: data.name,
        slug: data.slug,
        category: data.category,
        drop: data.drop,
        price: data.price,
        discount: data.discount,
        countInStock: data.countInStock,
        description: data.description,
        details: data.details,
        unavailable: data.unavailable,
        isFeatured: data.isFeatured,
        featuremsg: data.featuremsg,
        seo: data.seo,
        images: data.images,
      },
      { new: true }
    );
    if (product)
      return NextResponse.json(
        { data: 'Successfully Created' },
        { status: 200 }
      );

    return NextResponse.json(
      { data: 'Error Updating Product' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ data: 'Error updating order' }, { status: 500 });
  }
}
