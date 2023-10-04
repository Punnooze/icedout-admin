import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function page() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-[100vw] h-[100vh] overflow-y-auto flex justify-center items-center flex-col">
          <h1>Marketing</h1>
          <div className="w-[80%] h-[80%] bg-lightgrey rounded-md ">
            <p>Form</p>
          </div>
        </div>
      </div>
    </>
  );
}
