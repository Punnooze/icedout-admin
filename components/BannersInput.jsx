'use client';
import React, { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function BannersInput() {
  const [imageCount, setImageCount] = useState(1);
  const [picture, setPicture] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState('');
  const [formValues, setFormValues] = useState({
    bannerName: '',
    images: [
      {
        imageLink:
          'https://res.cloudinary.com/dvpputlkr/image/upload/v1697911714/jajfw7tqsovdtf7lfu8z.jpg',
        redirect: '',
      },
      {
        imageLink:
          'https://res.cloudinary.com/dvpputlkr/image/upload/v1697911714/tokqg2krvc3h91g0arls.jpg',
        redirect: '',
      },
      {
        imageLink:
          'https://res.cloudinary.com/dvpputlkr/image/upload/v1697911714/tokqg2krvc3h91g0arls.jpg',
        redirect: '',
      },
      // {
      //   imageLink:
      //     'https://res.cloudinary.com/dvpputlkr/image/upload/v1697911320/bzmlerxau6eqe76j1huz.jpg',  string
      //   redirect: '',  string
      // },
      // {
      //   imageLink:
      //     'https://res.cloudinary.com/dvpputlkr/image/upload/v1697911320/bzmlerxau6eqe76j1huz.jpg',  string
      //   redirect: '',  string
      // },
    ],
  });

  const handleUpload = (result) => {
    const { images } = formValues;
    images.push({ imageLink: result.info.secure_url, redirect: '' }); // You can specify the redirect value if needed
    setFormValues({
      ...formValues,
      images,
    });
  };

  useEffect(() => {
    const handleDeletePicture = async () => {
      console.log('selected', selectedPicture);

      const parts = selectedPicture.split('/');
      const publicIdWithExtension = parts[parts.length - 1];
      const publicId = publicIdWithExtension.split('.')[0];
      console.log('publicid', publicId);
      try {
        const res = await fetch('/api/cloudinary', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ public_id: publicId }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.message == 'Successfully Deleted') {
            const updatedUrls = formValues.images.filter(
              (img) => img !== selectedPicture
            );
            setFormValues({ ...formValues, images: updatedUrls });
          } else alert(data.message);
        } else {
          console.log('Error:', res.statusText);
        }
      } catch (error) {
        console.log('Error', error);
      }
    };
    handleDeletePicture();
  }, [selectedPicture]);

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
    <div className="tw-h-[100vh] tw-bg-background  tw-px-5">
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
              className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[13px] md:tw-text-[15px]"
            />
          </div>

          <div className="carousel rounded-box tw-w-[300px]">
            <div className="carousel-item">
              <Image
                height="100"
                width="300"
                src={formValues.images[0].imageLink}
                alt="Image"
                className=" tw-rounded-md tw-shadow-md hover:tw-shadow-lg"
              />
            </div>
            <div className="carousel-item">
              <Image
                height="100"
                width="300"
                src={formValues.images[1].imageLink}
                alt="Image"
                className=" tw-rounded-md tw-shadow-md hover:tw-shadow-lg"
              />
            </div>
            <div className="carousel-item">
              <Image
                height="100"
                width="300"
                src={formValues.images[2].imageLink}
                alt="Image"
                className=" tw-rounded-md tw-shadow-md hover:tw-shadow-lg"
              />
            </div>
          </div>

          {/* <div className="carousel rounded-box">
            {formValues.images &&
              formValues.images.map((img, index) => {
                return (
                  <div key={index} className="carousel-item">
                    <Image
                      height="100"
                      width="300"
                      src={img.imageLink}
                      alt="Image"
                      className=" tw-rounded-md tw-shadow-md hover:tw-shadow-lg"
                    />
                  </div>
                );
              })}
          </div> */}

          <div className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Attach Image
              </label>
              <div className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px] tw-flex tw-justify-center">
                <CldUploadButton
                  uploadPreset="ti9avygr"
                  onUpload={handleUpload}
                />
              </div>
            </div>
            <div className="tw-w-full tw-p-[20px]">
              {formValues.images[0].imageLink != '' && (
                <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                  Banners
                </label>
              )}
              <div className="tw-mb-4.5 tw-flex tw-flex-col  tw-justify-around ">
                {formValues.images &&
                  formValues.images.map((img, index) => {
                    if (img.imageLink !== '') {
                      return (
                        <div
                          className="tw-relative tw-my-4 tw-flex  tw-justify-around tw-items-center tw-pb-[10px] tw-border-b tw-border-lightgrey"
                          onMouseEnter={() => setPicture(true)}
                          onMouseLeave={() => setPicture(false)}
                          key={index}
                        >
                          <p className="tw-text-lightgrey">{index + 1}</p>
                          <Image
                            height="50"
                            width="100"
                            src={img.imageLink}
                            alt="Image"
                            className=" tw-rounded-md tw-shadow-md hover:tw-shadow-lg"
                          />
                          <div className="">
                            <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
                              Redirect Link
                            </label>
                            <input
                              placeholder="Enter the redirection Link"
                              className=" tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[13px] md:tw-text-[15px]"
                              type="text"
                              onChange={(e) => {
                                const newImages = [...formValues.images];
                                newImages[index].redirect = e.target.value;
                                setFormValues({
                                  ...formValues,
                                  images: newImages,
                                });
                              }}
                              value={img.redirect}
                            />
                          </div>
                          <button>
                            <TrashIcon className="tw-w-5 tw-wh-5 tw-text-lightgrey" />
                          </button>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

{
  /* <div>
{formValues.images.map((images, index) => {
  if (images.imageLink || images.redirect) {
    return (
      <div key={index} className="tw-flex">
        {/* <Image src={images.imageLink} alt="heelo" /> 
        // <p>{images.imageLink}</p>
        // <p>{images.redirect}</p>
//       </div>
//     );
//   }
// })}
// </div>

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
      className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[13px] md:tw-text-[15px]"
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
      className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[13px] md:tw-text-[15px]"
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
)} */
}
