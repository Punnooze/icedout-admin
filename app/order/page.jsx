'use client';
import Orders from '@/components/Orders';
import Sidebar from '@/components/Sidebar';
import React, { useEffect, useState } from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';

export default function page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('api/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.data) setData(data.data);
      } catch (error) {
        console.log('Error', error);
      }
    };
    getData();

    setData('hello');
  }, []);
  return (
    <>
      {data ? (
      <div className="flex ">
        <Sidebar />
        <Orders data={data} />
      </div>
       ) : (
        <div className="h-[100vh] p-[100px] flex items-center ">
          <Image src={logo} alt="logo" />
        </div>
      )} 
    </>
  );
}
