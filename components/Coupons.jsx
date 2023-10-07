"use client";
import React, { useState } from "react";

function Coupons() {
  const [isPercentage, setIsPercentage] = useState(false);

  const handleRadioChange = (e) => {
    setIsPercentage(e.target.value === "YES");
  };

  return (
    <div className="h-[100vh] ml-[70px] overflow-y-auto pl-5 pr-5 ">
      <h1 className="font-medium text-black dark:text-white">
        Coupons Creation
      </h1>
      <div className="bg-lightgrey rounded-md shadow-md hover:shadow-lg duration-200 mb-[30px] ">
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5">
              <div className="mb-6.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Coupon Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Coupon Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  pattern="[A-Za-z0-9]*"
                  maxLength="6"
                  style={{ textTransform: "uppercase" }}
                  title="Only letters allowed and maximum length is 6 characters"
                />
              </div>

              <div className="mb-6.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Coupon ID
                </label>
                <input
                  type="text"
                  placeholder="Enter Coupon ID"
                  style={{ textTransform: "uppercase" }}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4.5">
              <div className="mb-6.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Expiry
                </label>
                <input
                  type="date"
                  placeholder="Enter Expiry"
                  style={{ textTransform: "uppercase" }}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-6.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Flat Discount
                </label>
                <input
                  type="number"
                  placeholder="Enter Discount Amount"
                  style={{ textTransform: "uppercase" }}
                  min="0"
                  max="800"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4.5">
              <div className="mb-6.5">
                <label className="mb-2.5 block text-black dark:text-white">
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
                <div className="mb-6.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Percentage Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Percentage Amount"
                    style={{ textTransform: "uppercase" }}
                    min="5"
                    max="75"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              )}
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
              Create Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Coupons;
