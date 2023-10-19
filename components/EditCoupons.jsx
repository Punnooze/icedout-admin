'use client';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { PencilIcon, XMarkIcon, TagIcon } from '@heroicons/react/24/solid';
import { Dialog, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function EditCoupons({ data }) {
  const router = useRouter();
  console.log(data);
  const [formValues, setFormValues] = useState({
    couponName: '',
    couponID: '',
    expiry: '',
    percentage: false,
    percentageDiscount: '',
    flatDiscout: '',
    minPurchase: '',
    deliveryFee: true,
  });
  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = useState(false);

  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false);

  const closeSaveConfirmation = () => {
    setIsSaveConfirmationOpen(false);
  };
  const closeCancelConfirmation = () => {
    setIsCancelConfirmationOpen(false);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#bb86fc',
      },
      secondary: {
        main: '#363535',
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await fetch('/api/coupon', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ data: formValues }),
    //   });

    //   if (res.ok) {
    //     const data = await res.json();
    //     if (data.data == 'Successfully Created') {
    //       setIsSaveConfirmationOpen(true);
    //     } else alert(data.data);
    //   } else {
    //     console.log('Error:', res.statusText);
    //   }
    // } catch (error) {
    //   console.log('Error', error);
    // }
  };

  return (
    <div className="tw-h-[100vh] tw-bg-background   tw-ml-[70px] tw-overflow-y-auto tw-px-5">
      <h1 className="tw-font-medium tw-text-darkgrey">COUPONS CREATION</h1>
      <div className="tw-bg-darkergrey tw-rounded-md tw-shadow-md tw-hover:shadow-lg tw-duration-200 tw-mb-[30px]  md:tw-mx-5 lg:tw-mx-10  ">
        <form onSubmit={handleSubmit} className="tw-p-[10px]">
          <div className="tw-mb-6">
            <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
              Coupon Name
            </label>
            <input
              required
              type="text"
              value={formValues.couponName}
              onChange={(e) =>
                setFormValues({ ...formValues, couponName: e.target.value })
              }
              placeholder="Enter Coupon Name"
              className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
              pattern="[A-Za-z0-9]*"
              maxLength="6"
              title="Only letters allowed and maximum length is 6 characters"
            />
          </div>

          <div className="tw-mb-6">
            <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
              Coupon ID
            </label>
            <input
              required
              type="text"
              value={formValues.couponID}
              onChange={(e) =>
                setFormValues({ ...formValues, couponID: e.target.value })
              }
              placeholder="Enter Coupon ID"
              className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
            />
          </div>

          <div className="tw-mb-6">
            <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
              Expiry
            </label>
            <input
              required
              type="date"
              value={formValues.expiry}
              onChange={(e) =>
                setFormValues({ ...formValues, expiry: e.target.value })
              }
              placeholder="Enter Expiry"
              className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
            />
          </div>

          <div className="tw-mb-6">
            <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
              Flat Discount
            </label>
            <input
              type="number"
              value={formValues.flatDiscout}
              onChange={(e) =>
                setFormValues({ ...formValues, flatDiscout: e.target.value })
              }
              placeholder="Enter Discount Amount"
              min="0"
              max="800"
              className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
            />
          </div>

          <div className="tw-mb-6 tw-flex">
            <div className="tw-w-1/2">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
                Percentage
              </label>
              <ThemeProvider theme={theme}>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                  <FormControlLabel
                    checked={formValues.percentage === true}
                    name="percentage"
                    className="tw-text-lightgrey"
                    value="true"
                    control={<Radio />}
                    label="YES"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        percentage: true,
                      })
                    }
                  />
                  <FormControlLabel
                    checked={formValues.percentage === false}
                    name="percentage"
                    className="tw-text-lightgrey"
                    value="false"
                    control={<Radio />}
                    label="NO"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        percentage: false,
                      })
                    }
                  />
                </RadioGroup>
              </ThemeProvider>
            </div>

            <div className="tw-w-1/2">
              {formValues.percentage && (
                <div>
                  <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
                    Percentage Amount
                  </label>
                  <input
                    type="number"
                    value={formValues.percentageDiscount}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        percentageDiscount: e.target.value,
                      })
                    }
                    placeholder="Enter Percentage Amount"
                    min="5"
                    max="75"
                    className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="tw-mb-6 tw-flex">
            <div className="tw-w-1/2">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
                Delivery Fee
              </label>
              <ThemeProvider theme={theme}>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                  <FormControlLabel
                    checked={formValues.deliveryFee === true}
                    name="Delivery Fee"
                    className="tw-text-lightgrey"
                    value="true"
                    control={<Radio />}
                    label="Delivery Fee"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        deliveryFee: true,
                      })
                    }
                  />
                  <FormControlLabel
                    checked={formValues.deliveryFee === false}
                    name="Delivery Fee"
                    className="tw-text-lightgrey"
                    value="false"
                    control={<Radio />}
                    label="Free Delivery"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        deliveryFee: false,
                      })
                    }
                  />
                </RadioGroup>
              </ThemeProvider>
            </div>

            <div className="tw-w-1/2">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
                Minimum Purchase Amount
              </label>
              <input
                type="number"
                value={formValues.minPurchase}
                onChange={(e) =>
                  setFormValues({ ...formValues, minPurchase: e.target.value })
                }
                placeholder="Enter Minimum Purchase Amount"
                min="0"
                max="800"
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
              />
            </div>
          </div>

          <div className="tw-w-full tw-flex tw-justify-around">
            <div
              onClick={() => setIsCancelConfirmationOpen(true)}
              className=" tw-flex tw-w-1/3 tw-justify-center tw-rounded tw-bg-bluepurple tw-p-3 tw-font-medium tw-text-gray tw-items-center tw-cursor-pointer"
            >
              <XMarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px] tw-stroke-background " />
              <p className="tw-text-[14px]">Cancel</p>
            </div>
            <button
              type="submit"
              className=" tw-flex tw-w-1/3 tw-justify-center tw-rounded tw-bg-bluepurple tw-p-3 tw-font-medium tw-text-gray tw-items-center"
            >
              <BookmarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
              <p className="tw-text-[14px]">Save</p>
            </button>
          </div>
        </form>
        <Dialog
          open={isSaveConfirmationOpen}
          onClose={closeSaveConfirmation}
          maxWidth="xs"
        >
          <div className="tw-bg-darkgrey tw-p-[15px]">
            <br />
            <h2 className="tw-text-bluepurple">Coupon Created Successfuly</h2>
            <br />
            <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around ">
              <button
                onClick={closeSaveConfirmation}
                className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] tw-flex tw-items-center tw-mr-[5px] md:tw-mr-[0px]"
              >
                <PencilIcon className="tw-w-5- tw-h-5 tw-mr-[5px]" />
                Create
              </button>
              <button
                onClick={() => router.push('/coupons')}
                className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] tw-flex tw-items-center"
              >
                <TagIcon className="tw-w-5- tw-h-5 tw-mr-[5px]" />
                All Coupons
              </button>
            </div>
          </div>
        </Dialog>

        <Dialog
          open={isCancelConfirmationOpen}
          onClose={closeCancelConfirmation}
          maxWidth="xs"
        >
          <div className="tw-bg-darkgrey tw-p-[15px]">
            <br />
            <h2 className="tw-text-violet">
              Are you sure you want to cancel creation of this coupon?
            </h2>
            <h4 className="tw-text-bluepurple">
              All the changes made will be lost
            </h4>
            <br />
            <div className="tw-w-[100%] tw-mt-[10px] tw-flex tw-justify-around ">
              <button
                onClick={closeCancelConfirmation}
                className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] tw-flex tw-items-center tw-mr-[5px] md:tw-mr-[0px]"
              >
                <PencilIcon className="tw-w-5- tw-h-5 tw-mr-[5px]" />
                Continue Creation
              </button>
              <button
                onClick={() => router.push('/coupons')}
                className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] tw-flex tw-items-center"
              >
                <TagIcon className="tw-w-5- tw-h-5 tw-mr-[5px]" />
                All Coupons
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default EditCoupons;
