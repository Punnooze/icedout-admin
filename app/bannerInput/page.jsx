import BannersInput from '@/components/BannersInput';
import React from 'react';

export default function page() {
  return (
    <div className="tw-ml-[70px] tw-bg-background tw-h-[100vh] tw-overflow-y-auto ">
      <h1 className="tw-ml-[20px] tw-font-medium tw-text-darkgrey">
        BANNER CREATION
      </h1>
      <BannersInput />
    </div>
  );
}
