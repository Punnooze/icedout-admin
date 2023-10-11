'use client';
import Orders from '@/components/Orders';
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
  }, []);
  return (
    <>
      {data ? (
        <Orders data={data} />
      ) : (
        <div className="tw-h-[100vh] tw-p-[100px] tw-flex tw-items-center tw-bg-background ">
          <Image src={logo} alt="logo" />
        </div>
      )}
    </>
  );
}

// import { useRouter } from 'next/router';

// export default function YourPage() {
//   const router = useRouter();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const res = await fetch('api/orders', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const result = await res.json();
//         if (result.data) {
//           setData(result.data);

//           // Check if router is available before using it
//           if (router) {
//             router.push({
//               pathname: '/orders',
//               query: { data: JSON.stringify(result.data) },
//             });
//           }
//         }
//       } catch (error) {
//         console.log('Error', error);
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <div className="tw-h-[100vh] tw-p-[100px] tw-flex tw-items-center tw-bg-background">
//       <Image src={logo} alt="logo" />
//     </div>
//   );
// }
