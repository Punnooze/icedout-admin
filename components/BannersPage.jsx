import { PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function BannersPage({ data }) {
  const router = useRouter();
  const [selectedBanner, setSelectedBanner] = useState('All'); // Default to display all banners

  // Function to filter banners based on selected bannerName
  const filteredData = data.filter((item) => {
    if (selectedBanner === 'All') {
      return true; // Display all banners
    } else {
      return item.bannerName === selectedBanner;
    }
  });

  // Get distinct bannerNames from data
  const distinctBannerNames = [...new Set(data.map((item) => item.bannerName))];

  return (
    <div className="tw-ml-[70px] tw-bg-background tw-h-[100vh] tw-p-[15px] tw-overflow-y-auto">
      <h1 className="md:tw-hidden tw-text-darkergrey md:tw-ml-[20px] tw-mr-[20px] tw-[10vh] md:tw-mr-[40px]">
        BANNERS
      </h1>
      <h1 className="tw-hidden md:tw-block tw-text-darkergrey md:tw-ml-[20px] tw-mr-[20px] tw-[10vh] md:tw-mr-[40px] tw-mb-[10px]">
        BANNERS PAGE
      </h1>
      <div className="tw-w-full tw-flex tw-flex-col md:tw-flex-row tw-justify-around  tw-items-center ">
        <select
          value={selectedBanner}
          onChange={(e) => setSelectedBanner(e.target.value)}
          className="tw-order-2 md:tw-order-1 tw-w-[250px] tw-p-[10px] tw-rounded-md tw-border tw-shadow-md hover:tw-shadow-lg tw-border-darkergrey tw-duration-200 focus:tw-border-violet tw-bg-darkergrey tw-text-lightgrey tw-mb-[10px]"
        >
          <option value="All">All</option>
          {distinctBannerNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          onClick={() => router.push('/bannerInput')}
          className="tw-order-1 md:tw-order-2 tw-flex tw-w-[250px] tw-justify-center tw-items-center tw-shadow-md hover:tw-shadow-lg tw-duration-200 tw-p-[10px] tw-bg-violet tw-rounded-md tw-mb-[10px]"
        >
          <PlusIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
          <p className="tw-text-[15px]">Create Banner</p>
        </button>
      </div>
      <div className="tw-p-[10px]  tw-rounded-md tw-mt-[10px]">
        {/* Dropdown to select bannerName */}

        {filteredData.map((item, index) => {
          return (
            <div className="tw-mb-[20px] tw-p-[5px]" key={index}>
              <div className="tw-flex tw-justify-between tw-mb-[5px]">
                <h2 className="tw-text-violet">{item.bannerName}</h2>
                <button className="tw-flex md:tw-border-[2px] tw-border-violet tw-text-violet tw-p-[5px] md:tw-p-[10px] tw-rounded-md hover:tw-text-background hover:tw-bg-violet ">
                  <Link
                    className="tw-flex tw-justify-center tw-items-center"
                    href={{
                      pathname: '/bannerInput',
                      query: {
                        id: item._id,
                      },
                    }}
                  >
                    <PencilIcon className="tw-w-5 tw-h-5 md:tw-mr-[5px]" />
                    <p className="tw-hidden md:tw-block tw-text-[16px]">
                      Edit Banner
                    </p>
                  </Link>
                </button>
              </div>
              <div>
                <div className="carousel rounded-box">
                  {item.images.map((imgs, index) => {
                    return (
                      <div key={index} className="carousel-item ">
                        <Image
                          className="tw-w-[300px] tw-h-[150px] md:tw-w-[700px] md:tw-h-[300px] "
                          src={imgs.imageLink}
                          width="400"
                          height="100"
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
