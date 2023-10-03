'use client';
import Orders from '@/components/Orders';
import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function page() {
  return (
    <>
      <div className='flex '>
        <Sidebar  />
        <Orders />
      </div>
    </>
  );
}
