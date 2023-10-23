'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ProductPage from '@/components/ProductPage';

export default function ProductInput() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('api/fetchMisc', {
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
  return (
    <div>
      <ProductPage misc={data} />
    </div>
  );
}
