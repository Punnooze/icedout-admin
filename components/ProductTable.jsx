// 'use client';
// import React, { useEffect, useState } from 'react';
// import ProductCard from './ProductCard';
// import { useRouter } from 'next/navigation';
// import { PlusIcon } from '@heroicons/react/24/solid';

// function ProductTable({ data }) {
//   const router = useRouter();
//   return (
//     <div className="tw-ml-[70px] tw-bg-background tw-h-[100vh] tw-p-[10px] md:tw-p-[20px] tw-overflow-y-auto">
//       <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between">
//         <h1 className="tw-text-darkergrey">PRODUCTS</h1>
//         <div className=" tw-flex ">
//           <button
//             onClick={() => router.push('/productinput')}
//             className="tw-bg-violet  tw-z-40 tw-rounded-md tw-flex tw-justify-around tw-items-center tw-p-[10px] tw-px-[15px] "
//           >
//             <PlusIcon className="tw-w-5 tw-h-5" />
//             <p className="tw-font-medium tw-ml-[5px] tw-text-[15px]">
//               Create Product
//             </p>
//           </button>
//         </div>
//       </div>
//       <div className="md:tw-ml-[70px] ">
//         <div className="tw-w-[100%] tw-mt-[20px] tw-justify-center tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-[15px] lg:tw-gap-[20px]">
//           {data.map((product, index) => {
//             return <ProductCard key={index} data={product} edit={true} />;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductTable;

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';

function ProductTable({ data }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data);

  useEffect(() => {
    // Filter products based on search input
    const filtered = data.filter((product) => {
      const { name, sku } = product;
      const search = searchInput.toLowerCase();
      return (
        name.toLowerCase().includes(search) ||
        sku.toLowerCase().includes(search)
      );
    });
    setFilteredProducts(filtered);
  }, [searchInput, data]);

  return (
    <div className="tw-ml-[70px] tw-bg-background tw-h-[100vh] tw-p-[10px] md:tw-p-[20px] tw-overflow-y-auto">
      <h1 className="tw-text-darkergrey">PRODUCTS</h1>
      <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-around tw-items-center">
        <div className="tw-rounded-md tw-flex tw-items-center tw-justify-center tw-overflow-clip md:tw-mr-[20px] tw-shadow-md hover:tw-shadow-lg tw-duration-200 tw-order-2 md:tw-order-1">
          <button className="tw-w-[40px] tw-h-[44px] tw-bg-violet tw-flex tw-justify-center tw-items-center">
            <MagnifyingGlassIcon className="tw-w-5 tw-h-5 tw-stroke-[2px] tw-stroke-darkgrey tw-text-darkgrey" />
          </button>
          <input
            type="text"
            placeholder="Search by name or SKU"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="tw-p-[10px] md:tw-px-[30px] lg:tw-ps-[60px] tw-rounded-r-md  tw-outline-none tw-text-lightgrey tw-bg-darkgrey"
          />
        </div>
        <div className="tw-my-[10px] tw-order-1 md:tw-order-2">
          <button
            onClick={() => router.push('/productinput')}
            className=" tw-z-40 tw-rounded-md tw-flex tw-justify-around tw-items-center tw-p-[10px]  tw-px-[54px] tw-text-violet tw-border-[2px] hover:tw-bg-violet hover:tw-text-background tw-bg-background tw-duration-200 tw-shadow-md hover:tw-shadow-lg"
          >
            <PlusIcon className="tw-w-5 tw-h-5" />
            <p className=" tw-font-medium tw-ml-[5px] tw-text-[15px]">
              Create Product
            </p>
          </button>
        </div>
      </div>
      <div className="md:tw-ml-[70px] ">
        <div className="tw-w-[100%] tw-mt-[20px] tw-justify-center tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-[15px] lg:tw-gap-[20px] ">
          {/* Search bar */}

          {/* Render filtered products */}
          {filteredProducts.map((product, index) => {
            return <ProductCard key={index} data={product} edit={true} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
