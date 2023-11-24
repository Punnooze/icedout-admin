'use client';
import BannersInput from '../../components/BannersInput';
import React, { useEffect, useState } from 'react';

export default function BannerInput({ searchParams }) {
  const id = searchParams.id;
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`api/bannerEdit?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const response = await res.json();
        if (res.ok) {
          setData((prevState) => {
            return {
              ...prevState,
              ...response.data,
            };
          });
        } else {
          console.log('Error:', res.statusText);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
    if (id) getData();
  }, [id]);

  return (
    <div className="tw-ml-[70px] tw-bg-background tw-h-[100vh] ">
      <BannersInput data={data} />
    </div>
  );
}
