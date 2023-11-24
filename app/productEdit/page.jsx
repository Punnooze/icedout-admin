'use client';
import EditProducts from '../../components/EditProducts';
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
  const [profit, setProfit] = useState(0);

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
          console.log('HHHHHHHHHH', response.data[0]._id);
          if (response.data[0]) {
            console.log('AHHHHHHHHHH', response.data[0]._id);
            try {
              const resp = await fetch(
                `api/fetchProfit?id=${response.data[0]._id}`,
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
              const respon = await resp.json();
              const da = respon.data;
              console.log('profits', da[0]);
              if (res.ok) {
                setProfit(da[0]);
              } else {
                console.log('Error:', resp.statusText);
              }
            } catch (error) {
              console.log('Error', error);
            }
          }
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
      {data && misc && <EditProducts data={data} misc={misc} profit={profit} />}
    </div>
  );
}
