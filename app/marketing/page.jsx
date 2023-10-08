import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function page() {
  return (
    <>
      <div className="tw-flex">
        <div className="tw-w-[100vw] tw-h-[100vh] tw-overflow-y-auto tw-flex tw-justify-center tw-items-center tw-flex-col">
          <h1>Marketing</h1>
          <div className="tw-w-[80%] tw-h-[80%] tw-bg-lightgrey tw-rounded-md ">
            <p>Form</p>
          </div>
        </div>
      </div>
    </>
  );
}
