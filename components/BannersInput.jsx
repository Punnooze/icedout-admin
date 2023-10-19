'use client';
import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

export default function BannersInput() {
  const [imageCount, setImageCount] = useState(1);

  const [formValues, setFormValues] = useState({
    bannerName: '',
    images: [
      {
        imageLink: '', // Initialize with an empty string
        redirect: '', // Initialize with an empty string
      },
    ],
  });

  const handleAddImageField = () => {
    if (imageCount < 9) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        images: [...prevFormValues.images, { imageLink: '', redirect: '' }],
      }));
      setImageCount(imageCount + 1);
    }
  };

  const handleRemoveImageField = () => {
    if (imageCount > 1) {
      setFormValues((prevFormValues) => {
        const updatedImages = [...prevFormValues.images];
        updatedImages.pop();
        return { ...prevFormValues, images: updatedImages };
      });
      setImageCount(imageCount - 1);
    }
  };

  const handleImageLinkChange = (index, value) => {
    setFormValues((prevFormValues) => {
      const updatedImages = [...prevFormValues.images];
      updatedImages[index].imageLink = value;
      return { ...prevFormValues, images: updatedImages };
    });
  };

  const handleRedirectChange = (index, value) => {
    setFormValues((prevFormValues) => {
      const updatedImages = [...prevFormValues.images];
      updatedImages[index].redirect = value;
      return { ...prevFormValues, images: updatedImages };
    });
  };

  return (
    <div className="tw-h-[100vh] tw-bg-background tw-overflow-y-clip tw-px-5">
      <div className="tw-bg-darkergrey tw-rounded-md tw-shadow-md tw-hover:shadow-lg tw-duration-200 tw-mb-[30px] md:tw-mx-5 lg:tw-mx-10  ">
        <form className="tw-p-[10px]">
          <div className="tw-mb-6">
            <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
              Banner Name
            </label>
            <input
              required
              type="text"
              placeholder="Enter Banner Name"
              className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
            />
          </div>
          <div>
            {formValues.images.map((images, index) => {
              if (images.imageLink || images.redirect) {
                return (
                  <div key={index} className="tw-flex">
                    {/* <Image src={images.imageLink} alt="heelo" /> */}
                    <p>{images.imageLink}</p>
                    <p>{images.redirect}</p>
                  </div>
                );
              }
            })}
          </div>

          {formValues.images.map((image, index) => (
            <div key={index} className="tw-mb-6 tw-flex tw-space-x-4">
              <div className="tw-w-1/2">
                <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
                  Image Link
                </label>
                <input
                  required
                  type="text"
                  value={image.imageLink}
                  placeholder="Image Link"
                  onChange={(e) => handleImageLinkChange(index, e.target.value)}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
                />
              </div>
              <div className="tw-w-1/2">
                <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
                  Redirection Link
                </label>
                <input
                  required
                  type="text"
                  value={image.redirect}
                  placeholder="Redirect"
                  onChange={(e) => handleRedirectChange(index, e.target.value)}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[14px] md:tw-text-[15px]"
                />
              </div>
            </div>
          ))}
          {imageCount < 5 && (
            <div className="tw-flex tw-w-[100%] tw-justify-around">
              <button
                type="button"
                onClick={handleAddImageField}
                className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
              >
                <PlusIcon className="tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                <p className="tw-text-[15px] tw-hidden md:tw-block">
                  Add Field
                </p>
              </button>
              <button
                type="button"
                onClick={handleRemoveImageField}
                className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
              >
                <MinusIcon className="tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                <p className="tw-text-[15px] tw-hidden md:tw-block">
                  Remove Field
                </p>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
