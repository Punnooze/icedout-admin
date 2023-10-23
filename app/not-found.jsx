'use client';
import React from 'react';
import notFound from '../public/404.gif';
import Image from 'next/image';
import loader from '../public/404Loader.json';
import Lottie from 'react-lottie-player';
import { useRouter } from 'next/navigation';
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="tw-ml-[70px] tw-bg-background tw-h-[100vh] tw-flex tw-flex-col tw-justify-center tw-items-center">
      <div className=" tw-relative tw-w-[80%] tw-h-[80vh]">
        <Lottie loop animationData={loader} play />
        <div className="tw-absolute tw-w-[100%] tw-bottom-[50px] tw-flex tw-justify-center tw-items-center tw-flex-col">
          <p className="tw-text-teal tw-text-[24px] tw-mb-[20px]">
            The page you are looking for does not exist!
          </p>

          <button
            className="tw-p-[10px] tw-rounded-md hover:tw-bg-violet tw-text-violet tw-border-[2px] tw-border-violet hover:tw-text-background tw-duration-200 tw-shadow-md hover:tw-shadow-lg"
            onClick={() => router.push('/')}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
