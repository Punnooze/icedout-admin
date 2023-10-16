'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/solid';

function ProductTable({ data }) {
  const router = useRouter();
  return (
    <div className="tw-ml-[70px] tw-bg-background tw-h-[100vh] tw-p-[10px] md:tw-p-[20px] tw-overflow-y-auto">
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between">
        <h1 className="tw-text-darkergrey">PRODUCTS</h1>
        <div className=" tw-flex ">
          <button
            onClick={() => router.push('/productinput')}
            className="tw-bg-violet  tw-z-40 tw-rounded-md tw-flex tw-justify-around tw-items-center tw-p-[10px] tw-px-[15px] "
          >
            <PlusIcon className="tw-w-5 tw-h-5" />
            <p className="tw-font-medium tw-ml-[5px] tw-text-[15px]">
              Create Product
            </p>
          </button>
        </div>
      </div>
      <div className="md:tw-ml-[70px] ">
        <div className="tw-w-[100%] tw-mt-[20px] tw-justify-center tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-[15px] lg:tw-gap-[20px]">
          {data.map((product, index) => {
            return <ProductCard key={index} data={product} edit={true} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
