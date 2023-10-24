'use client';
import { BookmarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PencilIcon, XMarkIcon, TagIcon } from '@heroicons/react/24/solid';
import { Dialog, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Coupons({ data }) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    couponName: '',
    couponID: '',
    expiry: '',
    percentage: false,
    percentageDiscount: '',
    flatDiscount: '',
    minPurchase: '',
    deliveryFree: false,
  });
  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = useState(false);

  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);

  const [isDeleteConfConfirmationOpen, setIsDeleteConfConfirmationOpen] =
    useState(false);

  const closeSaveConfirmation = () => {
    setIsSaveConfirmationOpen(false);
  };
  const closeCancelConfirmation = () => {
    setIsCancelConfirmationOpen(false);
  };
  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };
  const closeDeleteConfConfirmation = () => {
    setIsDeleteConfConfirmationOpen(false);
  };

  useEffect(() => {
    if (data) setFormValues(data);
  }, [data]);

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
    try {
      const res = await fetch('/api/coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formValues }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.data == 'Successfully Created') {
          setIsSaveConfirmationOpen(true);
        } else alert(data.data);
      } else {
        console.log('Error:', res.statusText);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/coupon', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formValues }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.data == 'Successfully Created') {
          setIsSaveConfirmationOpen(true);
        } else alert(data.data);
      } else {
        console.log('Error:', res.statusText);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/coupon', {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formValues }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message == 'Successfully Deleted') {
          setIsDeleteConfConfirmationOpen(true);
        } else alert(data.data);
      } else {
        console.log('Error:', res.statusText);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className="tw-h-[100vh] tw-bg-background tw-overflow-y-auto tw-px-5">
      <h1 className="tw-font-medium tw-text-darkgrey">COUPONS CREATION</h1>
      <div className="tw-bg-darkergrey tw-rounded-md tw-shadow-md tw-hover:shadow-lg tw-duration-200 tw-mb-[30px]  md:tw-mx-5 lg:tw-mx-10  ">
        <form onSubmit={handleSubmit} className="tw-p-[10px]">
          <div className="tw-mb-6">
            <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
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
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
            />
          </div>

          <div className="tw-mb-6">
            <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
              Coupon ID
            </label>
            <input
              required
              type="text"
              pattern="[A-Za-z0-9]*"
              maxLength="10"
              title="Only letters allowed and maximum length is 10 characters"
              value={formValues.couponID}
              onChange={(e) =>
                setFormValues({ ...formValues, couponID: e.target.value })
              }
              placeholder="Enter Coupon ID"
              className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
            />
          </div>

          <div className="tw-mb-6">
            <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
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
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
            />
          </div>

          <div className="tw-mb-6">
            <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
              Flat Discount
            </label>
            <input
              type="number"
              value={formValues.flatDiscount}
              onChange={(e) =>
                setFormValues({ ...formValues, flatDiscount: e.target.value })
              }
              placeholder="Enter Discount Amount"
              min="0"
              max="800"
              className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
            />
          </div>

          <div className="tw-mb-6 tw-flex">
            <div className="tw-w-1/2">
              <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
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
                    className="tw-text-lightgrey tw-text-[12px] md:tw-text-[15px]"
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
                    className="tw-text-lightgrey tw-text-[12px] md:tw-text-[15px]"
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
                  <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
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
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="tw-mb-6 tw-flex">
            <div className="tw-w-1/2">
              <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
                Free Delivery
              </label>
              <ThemeProvider theme={theme}>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                  <FormControlLabel
                    checked={formValues.deliveryFree === true}
                    name="Delivery Fee"
                    className="tw-text-lightgrey tw-text-[12px] md:tw-text-[15px]"
                    value="true"
                    control={<Radio />}
                    label="YES"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        deliveryFree: true,
                      })
                    }
                  />
                  <FormControlLabel
                    checked={formValues.deliveryFree === false}
                    name="Delivery Fee"
                    className="tw-text-lightgrey tw-text-[12px] md:tw-text-[15px]"
                    value="false"
                    control={<Radio />}
                    label="NO"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        deliveryFree: false,
                      })
                    }
                  />
                </RadioGroup>
              </ThemeProvider>
            </div>

            <div className="tw-w-1/2">
              <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
                Minimum Purchase Amount
              </label>
              <input
                required
                type="number"
                value={formValues.minPurchase}
                onChange={(e) =>
                  setFormValues({ ...formValues, minPurchase: e.target.value })
                }
                placeholder="Enter Minimum Purchase Amount"
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
              />
            </div>
          </div>

          <div
            className={`tw-w-full tw-flex md:tw-justify-around ${
              data ? 'tw-justify-between' : 'tw-justify-around'
            }`}
          >
            <div
              onClick={() => setIsCancelConfirmationOpen(true)}
              className=" tw-flex md:tw-w-1/4 tw-justify-center tw-rounded tw-bg-bluepurple tw-p-2 tw-px-3 md:tw-p-3 tw-font-medium tw-text-gray tw-items-center tw-cursor-pointer"
            >
              <XMarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px] tw-stroke-background " />
              <p className=" tw-text-[12px]md:tw-text-[14px]">Cancel</p>
            </div>
            {data ? (
              <div
                onClick={handleEdit}
                className=" tw-flex md:tw-w-1/4 tw-justify-center tw-rounded tw-bg-bluepurple tw-p- tw-p-2 tw-px-33md: tw-font-medium tw-text-gray tw-items-center tw-cursor-pointer"
              >
                <BookmarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px] tw-stroke-background " />
                <p className=" tw-text-[12px]md:tw-text-[14px]">Save</p>
              </div>
            ) : (
              <button
                type="submit"
                className=" tw-flex md:tw-w-1/4 tw-justify-center tw-rounded tw-bg-bluepurple tw-p-2 tw-px-3 md:tw-p-3 tw-font-medium tw-text-gray tw-items-center tw-cursor-pointer"
              >
                <BookmarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className=" tw-text-[12px]md:tw-text-[14px]">Create</p>
              </button>
            )}
            {data ? (
              <div
                onClick={() => setIsDeleteConfirmationOpen(true)}
                className=" tw-flex md:tw-w-1/4 tw-justify-center tw-rounded tw-bg-bluepurple tw-p- tw-p-2 tw-px-33md: tw-font-medium tw-text-gray tw-items-center tw-cursor-pointer"
              >
                <TrashIcon className="tw-w-5 tw-h-5 tw-mr-[5px] tw-stroke-background " />
                <p className=" tw-text-[12px]md:tw-text-[14px]">Delete</p>
              </div>
            ) : null}
          </div>
        </form>
        <Dialog
          open={isSaveConfirmationOpen}
          onClose={closeSaveConfirmation}
          maxWidth="xs"
        >
          <div className="tw-bg-darkgrey tw-p-[15px]">
            <br />
            <h2 className="tw-text-bluepurple">Coupon created Successfully!</h2>
            <br />
            <p className="tw-text-lightgrey tw-text-[14px]">
              Coupon ID :{' '}
              <span className="tw-text-teal tw-text-[15px]">
                {formValues.couponID}
              </span>
            </p>
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

        <Dialog
          open={isDeleteConfirmationOpen}
          onClose={closeDeleteConfirmation}
          maxWidth="xs"
        >
          <div className="tw-bg-darkgrey tw-p-[15px]">
            <br />
            <h2 className="tw-text-violet">
              Are you sure you want to delete this coupon
            </h2>
            <br />
            <p className="tw-text-lightgrey tw-text-[14px]">
              Coupon ID :{' '}
              <span className="tw-text-teal tw-text-[15px]">
                {formValues.couponID}
              </span>
            </p>
            <p className="tw-text-lightgrey tw-text-[14px]">
              Coupon Name :{' '}
              <span className="tw-text-teal tw-text-[15px]">
                {formValues.couponName}
              </span>
            </p>
            <p className="tw-text-lightgrey tw-text-[14px]">
              Expiring on :{' '}
              <span className="tw-text-teal tw-text-[15px]">
                {formValues.expiry.slice(0, 10)}
              </span>
            </p>
            <br />
            <div className="tw-w-[100%] tw-mt-[10px] tw-flex tw-justify-around ">
              <button
                onClick={closeDeleteConfirmation}
                className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] tw-flex tw-items-center tw-mr-[5px] md:tw-mr-[0px]"
              >
                <XMarkIcon className="tw-w-5- tw-h-5 tw-mr-[5px]" />
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] tw-flex tw-items-center"
              >
                <TrashIcon className="tw-w-5- tw-h-5 tw-mr-[5px]" />
                Delete
              </button>
            </div>
          </div>
        </Dialog>
        <Dialog
          open={isDeleteConfConfirmationOpen}
          onClose={closeDeleteConfConfirmation}
          maxWidth="xs"
        >
          <div className="tw-bg-darkgrey tw-p-[15px]">
            <br />
            <h2 className="tw-text-bluepurple">Coupon deleted Successfully!</h2>
            <br />
            <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around ">
              <button
                onClick={closeDeleteConfConfirmation}
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
      </div>
    </div>
  );
}

export default Coupons;
