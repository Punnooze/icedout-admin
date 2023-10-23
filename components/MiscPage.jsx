'use client';

import { BookmarkIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function MiscPage({ data }) {
  const [categories, setCategories] = useState({
    miscName: 'categories',
    miscData: [''],
  });
  const [collections, setCollections] = useState({
    miscName: 'collections',
    miscData: [''],
  });
  const [headers, setHeaders] = useState({
    miscName: 'headers',
    miscData: [''],
  });
  const [shippingCost, setShippingCost] = useState({
    miscName: 'shippingCost',
    miscData: {
      cod: '',
      prepaid: '',
    },
  });
  const [formValues, setFormValues] = useState({
    miscName: null,
    miscData: null,
  });

  const [categoriesCount, setCategoriesCount] = useState(1);
  const [collectionsCount, setCollectionsCount] = useState(1);
  const [headersCount, setHeadersCount] = useState(1);

  const handleCategoriesChange = (index, value) => {
    const updatedMiscData = [...categories.miscData];
    updatedMiscData[index] = value;
    setCategories({
      ...categories,
      miscData: updatedMiscData,
    });
  };
  const handleCollectionsChange = (index, value) => {
    const updatedMiscData = [...collections.miscData];
    updatedMiscData[index] = value;
    setCollections({
      ...collections,
      miscData: updatedMiscData,
    });
  };
  const handleHeadersChange = (index, value) => {
    const updatedMiscData = [...headers.miscData];
    updatedMiscData[index] = value;
    setHeaders({
      ...headers,
      miscData: updatedMiscData,
    });
  };

  const handleAddCategoriesField = () => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      miscData: [...prevCategories.miscData, ''],
    }));
    setCategoriesCount(categoriesCount + 1);
  };
  const handleAddCollectionsField = () => {
    setCollections((prevCollections) => ({
      ...prevCollections,
      miscData: [...prevCollections.miscData, ''],
    }));
    setCollectionsCount(collectionsCount + 1);
  };
  const handleAddHeadersField = () => {
    setHeaders((prevHeaders) => ({
      ...prevHeaders,
      miscData: [...prevHeaders.miscData, ''],
    }));
    setHeadersCount(headersCount + 1);
  };

  const handleRemoveCategoriesField = () => {
    if (categoriesCount > 1) {
      setCategories((prevCategories) => {
        const updatedMiscData = [...prevCategories.miscData];
        updatedMiscData.pop();
        return {
          ...prevCategories,
          miscData: updatedMiscData,
        };
      });
      setCategoriesCount(categoriesCount - 1);
    }
  };

  const handleRemoveCollectionsField = () => {
    if (collectionsCount > 1) {
      setCollections((prevCollections) => {
        const updatedMiscData = [...prevCollections.miscData];
        updatedMiscData.pop();
        return {
          ...prevCollections,
          miscData: updatedMiscData,
        };
      });
      setCollectionsCount(collectionsCount - 1);
    }
  };

  const handleRemoveHeadersField = () => {
    if (headersCount > 1) {
      setCollections((prevHeaders) => {
        const updatedMiscData = [...prevHeaders.miscData];
        updatedMiscData.pop();
        return {
          ...prevHeaders,
          miscData: updatedMiscData,
        };
      });
      setHeadersCount(headersCount - 1);
    }
  };

  const handleCodChange = (value) => {
    setShippingCost((prevShippingCost) => ({
      ...prevShippingCost,
      miscData: {
        ...prevShippingCost.miscData,
        cod: value,
      },
    }));
  };

  const handlePrepaidChange = (value) => {
    setShippingCost((prevShippingCost) => ({
      ...prevShippingCost,
      miscData: {
        ...prevShippingCost.miscData,
        prepaid: value,
      },
    }));
  };

  const handleSubmit = async (p, e) => {
    e.preventDefault();
    if (p === 1) setFormValues(categories);
    if (p === 2) {
      const lastCollections =
        collections.miscData[collections.miscData.length - 1];
      const sortedCollections = [...collections.miscData.slice(0, -1)];
      sortedCollections.sort();
      sortedCollections.unshift(lastCollections);
      setCollections({
        ...collections,
        miscData: sortedCollections,
      });
      setFormValues({
        ...formValues,
        miscName: 'collections',
        miscData: sortedCollections,
      });
    }
    if (p === 3) setFormValues(headers);
    if (p === 4) setFormValues(shippingCost);
  };
  useEffect(() => {
    if (data) {
      data.map((item) => {
        if (item.miscName === 'categories') {
          setCategories({ ...categories, miscData: item.miscData });
          setCategoriesCount(item.miscData.length);
        }
        if (item.miscName === 'collections') {
          setCollections({ ...collections, miscData: item.miscData });
          setCollectionsCount(item.miscData.length);
        }
        if (item.miscName === 'headers') {
          setHeaders({ ...headers, miscData: item.miscData });
          setHeadersCount(item.miscData.length);
        }
        if (item.miscName === 'shippingCost')
          setShippingCost({ ...shippingCost, miscData: item.miscData });
      });
    }
  }, [data]);

  useEffect(() => {
    const submitData = async () => {
      try {
        const res = await fetch('/api/miscRoute', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: formValues }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.data == 'Successfully Created') {
            alert('Updated Successfully!');
          } else alert(data.data);
        } else {
          console.log('Error:', res.statusText);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
    if (formValues.miscName !== null) submitData();
  }, [formValues]);

  return (
    <div className="tw-h-[100vh] tw-bg-background tw-p-[10px] md:tw-px-[20px] lg:tw-px-[40px] tw-overflow-y-auto">
      <h1 className="md:tw-ml-[20px] tw-font-medium tw-text-darkgrey">
        <span className="tw-hidden md:tw-block">MISCELLANEOUS</span>
        <span className="md:tw-hidden">MISC</span>
      </h1>
      <div className="tw-bg-darkergrey tw-rounded-md tw-p-[10px]">
        <div className="tw-mb-4.5 tw-flex tw-flex-col">
          <div className="tw-flex">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-bluepurple tw-text-[16px] tw-font-medium tw-flex tw-justify-center">
                Categories
              </label>
              {categories.miscData.map((category, index) => (
                <input
                  key={index}
                  type="text"
                  value={category}
                  onChange={(e) =>
                    handleCategoriesChange(index, e.target.value)
                  }
                  placeholder={`Enter categories ${index + 1}`}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                    tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-mb-[10px] tw-text-[12px] md:tw-text-[16px]"
                />
              ))}

              <div className="tw-flex tw-w-[100%] tw-justify-around">
                <button
                  type="button"
                  onClick={handleAddCategoriesField}
                  className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
                >
                  <PlusIcon className=" tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                  <p className="tw-text-[15px] tw-hidden md:tw-block">
                    Add Field
                  </p>
                </button>
                <button
                  type="button"
                  onClick={handleRemoveCategoriesField}
                  className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
                >
                  <MinusIcon className=" tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                  <p className="tw-text-[15px] tw-hidden md:tw-block">
                    Remove Field
                  </p>
                </button>
              </div>
            </div>
            <div className="tw-w-1/2 tw-flex tw-justify-center tw-items-center ">
              <button
                className="hover:tw-bg-violet 
                tw-text-violet hover:tw-text-darkgrey tw-border-[2px] tw-border-violet tw-p-[10px] tw-px-[15px] tw-rounded-md tw-flex tw-shadow-md hover:tw-shadow-lg tw-duration-200"
                onClick={(e) => handleSubmit(1, e)}
              >
                <BookmarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[15px] md:tw-text-[16px] tw-flex">
                  <span className="tw-mr-[5px] tw-hidden md:tw-block">
                    Save
                  </span>
                  Categories
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className="tw-mb-4.5 tw-flex tw-flex-col">
          <div className="tw-flex">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className=" tw-text-bluepurple tw-text-[16px] tw-font-medium tw-flex tw-justify-center tw-mb-[5px]">
                Collections
              </label>
              {collections.miscData.map((collections, index) => (
                <input
                  key={index}
                  type="text"
                  value={collections}
                  onChange={(e) =>
                    handleCollectionsChange(index, e.target.value)
                  }
                  placeholder={`Enter collections ${index + 1}`}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                    tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-mb-[10px] tw-text-[12px] md:tw-text-[16px]"
                />
              ))}

              <div className="tw-flex tw-w-[100%] tw-justify-around">
                <button
                  type="button"
                  onClick={handleAddCollectionsField}
                  className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
                >
                  <PlusIcon className=" tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                  <p className="tw-text-[15px] tw-hidden md:tw-block">
                    Add Field
                  </p>
                </button>
                <button
                  type="button"
                  onClick={handleRemoveCollectionsField}
                  className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
                >
                  <MinusIcon className=" tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                  <p className="tw-text-[15px] tw-hidden md:tw-block">
                    Remove Field
                  </p>
                </button>
              </div>
            </div>
            <div className="tw-w-1/2 tw-flex tw-justify-center tw-items-center ">
              <button
                className="hover:tw-bg-violet 
                tw-text-violet hover:tw-text-darkgrey tw-border-[2px] tw-border-violet tw-p-[10px] tw-px-[15px] tw-rounded-md tw-flex tw-shadow-md hover:tw-shadow-lg tw-duration-200"
                onClick={(e) => handleSubmit(2, e)}
              >
                <BookmarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[15px] md:tw-text-[16px] tw-flex">
                  <span className="tw-mr-[5px] tw-hidden md:tw-block">
                    Save
                  </span>
                  Collections
                </p>
              </button>
            </div>
          </div>
        </div>

        <div className="tw-mb-4.5 tw-flex tw-flex-col">
          <div className="tw-flex">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-bluepurple tw-text-[16px] tw-font-medium tw-flex tw-justify-center">
                Headers
              </label>
              {headers.miscData.map((headers, index) => (
                <input
                  key={index}
                  type="text"
                  value={headers}
                  onChange={(e) => handleHeadersChange(index, e.target.value)}
                  placeholder={`Enter headers ${index + 1}`}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                    tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-mb-[10px] tw-text-[12px] md:tw-text-[16px]"
                />
              ))}

              <div className="tw-flex tw-w-[100%] tw-justify-around">
                <button
                  type="button"
                  onClick={handleAddHeadersField}
                  className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
                >
                  <PlusIcon className=" tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                  <p className="tw-text-[15px] tw-hidden md:tw-block">
                    Add Field
                  </p>
                </button>
                <button
                  type="button"
                  onClick={handleRemoveHeadersField}
                  className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
                >
                  <MinusIcon className=" tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                  <p className="tw-text-[15px] tw-hidden md:tw-block">
                    Remove Field
                  </p>
                </button>
              </div>
            </div>
            <div className="tw-w-1/2 tw-flex tw-justify-center tw-items-center ">
              <button
                className="hover:tw-bg-violet 
                tw-text-violet hover:tw-text-darkgrey tw-border-[2px] tw-border-violet tw-p-[10px] tw-px-[15px] tw-rounded-md tw-flex tw-shadow-md hover:tw-shadow-lg tw-duration-200"
                onClick={(e) => handleSubmit(3, e)}
              >
                <BookmarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[15px] md:tw-text-[16px] tw-flex">
                  <span className="tw-mr-[5px] tw-hidden md:tw-block">
                    Save
                  </span>
                  Headers
                </p>
              </button>
            </div>
          </div>

          <form onSubmit={(e) => handleSubmit(4, e)} className="tw-flex ">
            <div className="tw-w-1/2 tw-flex tw-flex-col">
              <label className="tw-mb-1 tw-text-bluepurple tw-text-[16px] tw-font-medium tw-flex tw-justify-center">
                Shipping Cost
              </label>
              <div className="tw-w-full tw-mb-[20px]">
                <label className="tw-mb-1 tw-text-[12px] tw-block tw-text-bluepurple tw-font-medium">
                  COD
                </label>
                <input
                  required
                  type="number"
                  value={shippingCost.miscData.cod}
                  onChange={(e) => handleCodChange(e.target.value)}
                  placeholder="COD Shipping Cost"
                  min="0"
                  max="800"
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                    tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
                />
              </div>
              <div className="tw-w-full tw-mb-[20px]">
                <label className="tw-mb-1 tw-text-[12px]  tw-block tw-text-bluepurple tw-font-medium">
                  Pre-paid
                </label>
                <input
                  required
                  type="number"
                  value={shippingCost.miscData.prepaid}
                  onChange={(e) => handlePrepaidChange(e.target.value)}
                  placeholder="Prepaid Shipping Cost"
                  min="0"
                  max="800"
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                    tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
                />
              </div>
            </div>
            <div className="tw-w-1/2 tw-flex tw-justify-center tw-items-center ">
              <button
                className="hover:tw-bg-violet 
            tw-text-violet hover:tw-text-darkgrey tw-border-[2px] tw-border-violet tw-p-[10px] tw-px-[15px] tw-rounded-md tw-flex tw-shadow-md hover:tw-shadow-lg tw-duration-200"
                type="submit"
              >
                <BookmarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[15px] md:tw-text-[16px] tw-flex">
                  <span className="tw-mr-[5px] tw-hidden md:tw-block">
                    Save
                  </span>
                  Shipping
                </p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
