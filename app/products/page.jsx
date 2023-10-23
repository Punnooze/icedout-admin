'use client';
import ProductTable from '@/components/ProductTable';
import React, { useEffect, useState } from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';

export default function Products() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('api/product', {
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
  }, []);

  useEffect(() => {
    if (data) {
      console.log('0', data[0]);
      console.log('1', data[1]);
    }
  }, [data]);
  return (
    <>
      {data ? (
        <ProductTable data={data[0]} misc={data[1]} />
      ) : (
        <div className="tw-h-[100vh] tw-p-[100px] tw-flex tw-items-center tw-overflow-y-clip tw-bg-background ">
          <Image src={logo} alt="logo" />
        </div>
      )}
    </>
  );
}
