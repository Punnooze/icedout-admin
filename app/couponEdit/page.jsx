'use client';

import Coupons from '@/components/Coupons';
import EditCoupons from '@/components/EditCoupons';
import React, { useState, useEffect } from 'react';
export default function CouponEdit({ searchParams }) {
  const idCoupon = searchParams.id;
  console.log(idCoupon);
  const [data, setData] = useState({
    couponName: '',
    couponID: '',
    expiry: '',
    percentage: false,
    percentageDiscount: '',
    flatDiscout: '',
    minPurchase: '',
    deliveryFee: true,
    _id: '',
    _v: '',
  });
  // const countInStock = searchParams.countInStock;

  // console.log(id);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`api/couponEdit?id=${idCoupon}`, {
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
    if (idCoupon) getData();
  }, [idCoupon]);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return (
    <div className="tw-h-[100vh] tw-bg-background tw-ml-[70px]">
      {data && <Coupons data={data} />}
    </div>
  );
}
