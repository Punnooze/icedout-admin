'use client';
import React, { useState } from 'react';

function Coupons() {
  const [isPercentage, setIsPercentage] = useState(false);

  const handleRadioChange = (e) => {
    setIsPercentage(e.target.value === 'YES');
  };

  return (
    <div className="tw-h-[100vh] tw-bg-background tw-w-[100%]  tw-ml-[70px] tw-overflow-y-auto tw-pl-5 tw-pr-5 ">
      <h1 className="tw-font-medium tw-text-black dark:tw-text-white">
        Coupons Creation
      </h1>
      <div className="tw-bg-grey tw-rounded-md tw-shadow-md tw-hover:shadow-lg tw-duration-200 tw-mb-[30px] ">
        <form action="#">
          <div className="tw-p-6.5">
            <div className="tw-mb-4.5">
              <div className="tw-mb-6.5">
                <label className="tw-mb-2.5 tw-block tw-text-black dark:tw-text-white">
                  Coupon Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Coupon Name"
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition focus:tw-border-primary active:tw-border-primary disabled:tw-cursor-default disabled:tw-bg-whiter dark:tw-border-form-strokedark dark:tw-bg-form-input dark:focus:tw-border-primary"
                  pattern="[A-Za-z0-9]*"
                  maxLength="6"
                  style={{ textTransform: 'uppercase' }}
                  title="Only letters allowed and maximum length is 6 characters"
                />
              </div>

              <div className="tw-mb-6.5">
                <label className="tw-mb-2.5 tw-block tw-text-black dark:tw-text-white">
                  Coupon ID
                </label>
                <input
                  type="text"
                  placeholder="Enter Coupon ID"
                  style={{ textTransform: 'uppercase' }}
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition focus:tw-border-primary active:tw-border-primary disabled:tw-cursor-default disabled:tw-bg-whiter dark:tw-border-form-strokedark dark:tw-bg-form-input dark:focus:tw-border-primary"
                />
              </div>
            </div>
            <div className="tw-mb-4.5">
              <div className="tw-mb-6.5">
                <label className="tw-mb-2.5 tw-block tw-text-black dark:tw-text-white">
                  Expiry
                </label>
                <input
                  type="date"
                  placeholder="Enter Expiry"
                  style={{ textTransform: 'uppercase' }}
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition focus:tw-border-primary active:tw-border-primary disabled:tw-cursor-default disabled:tw-bg-whiter dark:tw-border-form-strokedark dark:tw-bg-form-input dark:focus:tw-border-primary"
                />
              </div>

              <div className="tw-mb-6.5">
                <label className="tw-mb-2.5 tw-block tw-text-black dark:tw-text-white">
                  Flat Discount
                </label>
                <input
                  type="number"
                  placeholder="Enter Discount Amount"
                  style={{ textTransform: 'uppercase' }}
                  min="0"
                  max="800"
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition focus:tw-border-primary active:tw-border-primary disabled:tw-cursor-default disabled:tw-bg-whiter dark:tw-border-form-strokedark dark:tw-bg-form-input dark:focus:tw-border-primary"
                />
              </div>
            </div>
            <div className="tw-mb-4.5">
              <div className="tw-mb-6.5">
                <label className="tw-mb-2.5 tw-block tw-text-black dark:tw-text-white">
                  Percentage
                </label>
                <input
                  type="radio"
                  id="yes"
                  name="isPercentage"
                  value="YES"
                  checked={isPercentage}
                  onChange={handleRadioChange}
                />
                <label htmlFor="yes">YES</label>
                <br />
                <input
                  type="radio"
                  id="no"
                  name="isPercentage"
                  value="NO"
                  checked={!isPercentage}
                  onChange={handleRadioChange}
                />
                <label htmlFor="no">NO</label>
              </div>

              {isPercentage && (
                <div className="tw-mb-6.5">
                  <label className="tw-mb-2.5 tw-block tw-text-black dark:tw-text-white">
                    Percentage Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Percentage Amount"
                    style={{ textTransform: 'uppercase' }}
                    min="5"
                    max="75"
                    className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition focus:tw-border-primary active:tw-border-primary disabled:tw-cursor-default disabled:tw-bg-whiter dark:tw-border-form-strokedark dark:tw-bg-form-input dark:focus:tw-border-primary"
                  />
                </div>
              )}
            </div>

            <button className="tw-flex tw-w-full tw-justify-center tw-rounded tw-bg-bluepurple tw-p-3 tw-font-medium tw-text-gray">
              Create Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Coupons;
