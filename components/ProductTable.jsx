import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';

function ProductTable({ data, misc }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default to 'All' category
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [columns, setColumns] = useState(['All']);

  useEffect(() => {
    const columns = ['All'];
    data.forEach((item) => {
      if (item.category && !columns.includes(item.category)) {
        columns.push(item.category);
      }
    });
    setColumns(columns);
  }, [data]);

  useEffect(() => {
    // Filter products based on search input and selected category
    const filtered = data.filter((product) => {
      const { name, sku, category } = product;
      const search = searchInput.toLowerCase();
      const categoryFilter =
        selectedCategory === 'All' || selectedCategory === category;
      return (
        (name.toLowerCase().includes(search) ||
          sku.toLowerCase().includes(search)) &&
        categoryFilter
      );
    });
    setFilteredProducts(filtered);
  }, [searchInput, selectedCategory, data]);

  return (
    <div className="tw-ml-[70px] tw-bg-background tw-h-[100vh] tw-p-[10px] md:tw-p-[20px] tw-overflow-y-auto">
      <h1 className="tw-text-darkergrey">PRODUCTS</h1>
      <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-around lg:tw-justify-between md:tw-px-[15px] tw-items-center md:tw-border-b md:tw-border-darkergrey md:tw-pb-[15px]">
        <div className="tw-rounded-md tw-flex tw-items-center tw-justify-center tw-overflow-clip md:tw-mr-[20px] tw-shadow-md hover:tw-shadow-lg tw-duration-200 tw-order-2 tw-my-[5px] md:tw-order-1">
          <button className="md:tw-hidden lg:tw-flex tw-w-[40px] tw-h-[44px] tw-bg-violet tw-flex tw-justify-center tw-items-center">
            <MagnifyingGlassIcon className="tw-w-5 tw-h-5 tw-stroke-[2px] tw-stroke-darkgrey tw-text-darkgrey" />
          </button>
          <input
            type="text"
            placeholder="Search by name or SKU"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="tw-p-[10px]  md:tw-px-[30px] lg:tw-ps-[60px] tw-rounded-r-md  tw-outline-none tw-text-lightgrey tw-bg-darkgrey"
          />
        </div>
        <div className="tw-my-[5px] tw-order-1 md:tw-order-2">
          <button
            onClick={() => router.push('/productinput')}
            className="tw-z-40 tw-rounded-md tw-flex tw-justify-around tw-items-center tw-p-[10px]  tw-px-[54px] md:tw-ml-[20px] lg:tw-ml-0 tw-text-violet tw-border-[2px] hover:tw-bg-violet hover:tw-text-background tw-bg-background tw-duration-200 tw-shadow-md hover:tw-shadow-lg"
          >
            <PlusIcon className="tw-w-5 tw-h-5" />
            <p className="md:tw-hidden lg:tw-block tw-font-medium tw-ml-[5px] tw-text-[15px]">
              Create Product
            </p>
            <p className="tw-hidden md:tw-block lg:tw-hidden tw-font-medium tw-ml-[5px] tw-text-[15px]">
              Create
            </p>
          </button>
        </div>
        <div className="tw-my-[5px] tw-order-3 md:tw-order-1">
          {columns && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="tw-p-[10px] tw-pr-[85px] tw-rounded-md tw-outline-none tw-bg-darkgrey tw-text-lightgrey"
            >
              {columns.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      {/* Rest of the code remains the same */}
      <div className="md:tw-ml-[70px] ">
        <div className="tw-w-[100%] tw-mt-[20px] tw-justify-center tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-[15px] lg:tw-gap-[20px] ">
          {filteredProducts.map((product, index) => {
            return <ProductCard key={index} data={product} edit={true} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductTable;
