import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function BannersPage({ data }) {
  const router = useRouter();
  return (
    <div className="tw-ml-[70px] tw-bg-background tw-h-[100vh] tw-p-[10px]">
      <h1 className="tw-text-darkergrey md:tw-ml-[20px] tw-mr-[20px] tw-[10vh] md:tw-mr-[40px]">
        BANNERS
      </h1>
      <button
        onClick={() => router.push('/bannerInput')}
        className="tw-flex  tw-p-[10px] tw-bg-violet tw-rounded-md"
      >
        <PlusIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
        <p>Create Banner</p>
      </button>
      <div>{console.log(data)}</div>
    </div>
  );
}
