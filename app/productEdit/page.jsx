'use client';
import EditProducts from '@/components/EditProducts';
import ProductCard from '@/components/ProductCard';
import React, { useState, useEffect } from 'react';
export default function ProductEdit({ searchParams }) {
  const sku = searchParams.sku;
  const [data, setData] = useState({
    category: '',
    countInStock: {
      S: '',
      M: '',
      L: '',
      XL: '',
      XXL: '',
    },
    createdAt: '',
    description: [''],
    details: [''],
    discount: '',
    drop: '',
    featuremsg: '',
    name: '',
    price: '',
    sku: '',
    slug: '',
    unavailable: '',
    updatedAt: '',
    _id: '',
    _v: '',
  });
  const [misc, setMisc] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`api/productEdit?sku=${sku}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const response = await res.json();
        // const product = response.data;
        if (res.ok) {
          setData((prevState) => {
            return {
              ...prevState,
              ...response.data[0],
            };
          });
        } else {
          console.log('Error:', res.statusText);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
    if (sku) getData();
  }, [sku]);

  useEffect(() => {
    const getMisc = async () => {
      try {
        const res = await fetch('api/fetchMisc', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.data) setMisc(data.data);
      } catch (error) {
        console.log('Error', error);
      }
    };
    getMisc();
  }, []);


  return (
    <div className="tw-h-[100vh] tw-bg-background tw-ml-[70px]">
      {data && <EditProducts data={data} misc={misc} />}
    </div>
  );
}
