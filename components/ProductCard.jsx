'use client';
import {
  CheckIcon,
  EyeIcon,
  NoSymbolIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
// import { TrashIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@mui/material';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';

function ProductCard({ data, edit }) {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  // const openDeleteConfirmation = () => {
  //   setIsDeleteConfirmationOpen(true);
  //   handleMenuClose();
  // };

  // const handleEdit = () => {
  //   router.push({
  //     pathname: '/productEdit',
  //     query: { data: data },
  //   });
  // };

  const handleDelete = async () => {
    try {
      const res = await fetch('/api/product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message === 'Successfully Deleted') {
          window.location.reload();
        }
      } else {
        console.log('Error:', res.statusText);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };
  return (
    <div
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
      className="tw-bg-darkgrey tw-w-[250px] tw-h-[420px] tw-rounded-md  tw-shadow-md hover:tw-shadow-lg tw-overflow-y-auto "
    >
      {/* <div className="tw-flex tw-justify-around tw-mb-[5px] tw-h-[20px] tw-mt-[5px]">
        <p className="tw-text-violet tw-font-medium tw-text-[15px] ">{data.sku}</p>
  */}

      <p className="tw-w-[100%]  tw-relative tw-top-[5px] tw-right-[5px] tw-flex tw-justify-end tw-z-40">
        {data.unavailable ? (
          <NoSymbolIcon className=" tw-w-[20px] tw-h-[20px] tw-font-medium tw-text-darkgrey tw-stroke-darkgrey  " />
        ) : (
          <CheckIcon className=" tw-w-[20px] tw-h-[20px] tw-font-medium tw-text-darkgrey tw-stroke-darkgrey  " />
        )}
      </p>
      {/* </div> */}
      <div className="tw-w-[100%] tw-h-[300px] tw-mt-[-25px] tw-bg-bluepurple tw-rounded-t-md tw-relative ">
        {data.isFeatured && (
          <div className="tw-absolute tw-bg-darkgrey tw-top-[30px]  tw-rounded-r-sm">
            <p className="tw-text-lightgrey tw-py-[3px] tw-px-[5px]">{data.featuremsg}</p>
          </div>
        )}
        {
          data.images && (
            // data.images.map((img, index) => {
            //   return (
            <div className="tw-h-[300px] tw-w-[250px]">
              {console.log('images', data.images[0])}
              <Image
                width="250"
                height="300"
                src={toggle ? data.images[1] : data.images[0]}
                alt="image"
              />
              {/*               
               <CldImage
               // key={index}
                width="250"
                height="300"
                src={data.images[0]}
                alt={data.images[0]}
               /> */}
            </div>
          )
          // );
          // })
        }
        {/* 
        {console.log('img', data.images[0].url)} */}
      </div>
      <div
      // onMouseEnter={() => setToggle(true)}
      // onMouseLeave={() => setToggle(false)}
      >
        {toggle && edit ? (
          <div className=" tw-relative tw-bottom-0 tw-h-[120px]  tw-flex tw-justify-around tw-items-center tw-align-middle ">
            <button className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-w-1/3 tw-bg-darkgrey tw-text-violet tw-border-[2px]">
              <Link
                className="tw-flex tw-justify-center tw-items-center"
                href={{
                  pathname: '/productEdit',
                  query: {
                    sku: data.sku,
                  },
                }}
              >
                <PencilIcon className="tw-w-4 tw-h-4 tw-mr-[5px]" />
                <p className="tw-text-[13px] tw-font-medium">Edit</p>
              </Link>
            </button>
            {/* <button className="md:tw-hidden tw-p-[2px] tw-rounded-md tw-text-violet hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200">
              <PencilIcon className="tw-w-6 tw-h-6" />
            </button> */}
            <button
              onClick={() => setIsDeleteConfirmationOpen(true)}
              className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-w-1/3 tw-bg-darkgrey tw-text-violet tw-border-[2px]"
            >
              <TrashIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
              <p className="tw-text-[13px] tw-font-medium">Delete</p>
            </button>
            {/* <button className="md:tw-hidden tw-p-[2px] tw-rounded-md tw-text-violet hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200">
              <TrashIcon className="tw-w-6 tw-h-6" />
            </button> */}
          </div>
        ) : (
          <div className="tw-p-[5px]">
            {/* <p className="tw-text-violet tw-font-medium tw-text-[15px] ">
              {data.sku}
            </p> */}
            <p className="tw-text-violet tw-mt-[5px] tw-text-[15px]">
              {data.name} -{' '}
              <span className="tw-text-[14px] tw-text-bluepurple">
                {data.sku}
              </span>
            </p>
            <p className="tw-text-lightgrey tw-text-[14px]">{data.drop}</p>
            <p className="tw-text-lightgrey tw-text-[12px]">{data.category}</p>
            <p>
              <span className="tw-text-lightgrey tw-mr-[10px] tw-line-through">
                {data.price}
              </span>
              <span className="tw-text-teal">
                {Number(data.price) - Number(data.discount)}
              </span>
            </p>

            {/* <div className="tw-w-[100%] tw-flex tw-justify-around tw-mt-[5px]">
              {Object.entries(data.countInStock).map(([size, value]) => (
                <div key={size}>
                  {value !== null && (
                    <button
                      className={` tw-p-[3px] tw-px-[10px] tw-text-[12px] tw-rounded-md ${
                        value === 0 ? 'tw-bg-darkergrey tw-text-lightgrey' : 'tw-bg-bluepurple tw-text-darkgrey'
                      }
                      `}
                    >
                      {size}
                    </button>
                  )}
                </div>
              ))}
            </div> */}
          </div>
        )}
      </div>

      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={closeDeleteConfirmation}
        maxWidth="xs"
      >
        <div className="tw-bg-darkgrey tw-p-[15px]">
          <h2 className="tw-text-bluepurple tw-mb-[5px]">
            Are you sure you want to delete this product?
          </h2>
          <p className="tw-text-lightgrey tw-text-[15px]">
            NAME :{' '}
            <span className="tw-text-teal tw-text-[14px]">{data.name}</span>
          </p>
          <p className="tw-text-lightgrey tw-text-[15px]">
            SKU :{' '}
            <span className="tw-text-teal tw-text-[14px]">{data.sku}</span>
          </p>
          <br />
          <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around">
            <button
              onClick={closeDeleteConfirmation}
              className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px] "
            >
              <XMarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
              <p className="tw-text-[16px] tw-font-medium]">Cancel</p>
            </button>
            <button
              onClick={handleDelete}
              className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
            >
              <TrashIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
              <p className="tw-text-[16px] tw-font-medium]">Delete</p>
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ProductCard;
