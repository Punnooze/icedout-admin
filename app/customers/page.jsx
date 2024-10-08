'use client';
import CustomersCard from '../../components/CustomersCard';
import React, { useEffect, useState } from 'react';
import logo from '../../public/logo.png';
import Image from 'next/image';

export default function Customers() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('api/customers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.data) {
          setData(data.data);
          console.log(data.data);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
    getData();

    // setData('hello');
  }, []);
  return (
    <>
      {data ? (
        <CustomersCard data={data} />

      ) : (
        <div className="tw-h-[100vh] tw-p-[100px] tw-flex tw-items-center tw-bg-background ">
          <Image src={logo} alt="logo" />
        </div>
      )}
    </>
  );
}
