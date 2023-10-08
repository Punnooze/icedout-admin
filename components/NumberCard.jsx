import React from 'react';

export default function NumberCard({ header, number }) {
  return (
    <>
      <div className="tw-p-[10px] md:tw-p-0 md:tw-w-[200px] md:tw-h-[110px] tw-bg-darkergrey tw-rounded-md tw-shadow-md tw-flex tw-flex-col tw-justify-center tw-items-center tw-align-middle">
        <h2 className="tw-text-lightgrey tw-text-[12px] md:tw-text-[20px]">
          {header}
        </h2>
        <h3 className="tw-text-teal tw-text-[30px] md:tw-text-[40px]">
          {number}
        </h3>
      </div>
    </>
  );
}
