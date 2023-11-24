import Products from '../../../models/productModels';
import Profit from '../../../models/profitsModels';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    const { data } = await request.json();
    const productData = data[0];
    const profitData = data[1];
    const product = await Products.findByIdAndUpdate(
      productData._id,
      {
        sku: productData.sku,
        name: productData.name,
        slug: productData.slug,
        category: productData.category,
        drop: productData.drop,
        price: productData.price,
        discount: productData.discount,
        countInStock: productData.countInStock,
        description: productData.description,
        details: productData.details,
        unavailable: productData.unavailable,
        isFeatured: productData.isFeatured,
        featuremsg: productData.featuremsg,
        seo: productData.seo,
        images: productData.images,
      },
      { new: true }
    );
    const profit = await Profit.findByIdAndUpdate(profitData._id, {
      profit: profitData.profit,
    });
    if (product && profit)
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
