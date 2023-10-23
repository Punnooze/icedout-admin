'use client';
import React, { useEffect, useState } from 'react';
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Square3Stack3DIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

import { TrashIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

import { Dialog } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BannersInput({ data }) {
  const router = useRouter();
  const [selectedPicture, setSelectedPicture] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    bannerName: '',
    images: [
      {
        imageLink: '',
        redirect: '',
      },
    ],
  });

  useEffect(() => {
    if (data)
      // console.log('data', data);
      setFormValues(data);
  }, [data]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const newImages = Array.from(selectedFiles);
    setImages(newImages);
  };

  useEffect(() => {
    if (images.length == 0) setFiles(false);
    else setFiles(true);
  }, [images]);

  const handleFilesSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert('Please Select images to Upload');
    } else {
      setUploading(true);
      try {
        const response = await axios.get('/api/sign');
        if (response.data && response.data.data) {
          const timestamp = response.data.data[0];
          const signature = response.data.data[1];

          let Resources = [];

          for (let i = 0; i < images.length; i++) {
            const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
            const formData = new FormData();
            formData.append('file', images[i]);
            formData.append(
              'api_key',
              process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
            );
            formData.append('timestamp', timestamp);
            formData.append('signature', signature);
            const { data } = await axios.post(url, formData);
            console.log(data.secure_url);
            Resources.push({
              ResourceName: images[i].name,
              ResourceLink: data.secure_url,
            });
          }

          if (formValues.images[0].imageLink === '') {
            const newImages = Resources.map((item) => ({
              imageLink: item.ResourceLink,
              redirect: '',
            }));

            setFormValues((prevFormValues) => ({
              ...prevFormValues,
              images: newImages,
            }));
          } else {
            Resources.map((item) => {
              formValues.images.push({
                imageLink: item.ResourceLink,
                redirect: '',
              });
            });
          }
          console.log('formvalues', formValues);
        } else {
          console.error('Error: Unable to obtain timestamp and signature');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setImages([]);
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isDataValid = formValues.images.every((imageData) => {
      return (
        imageData.imageLink.trim() !== '' && imageData.redirect.trim() !== ''
      );
    });

    if (!isDataValid) {
      alert('Please fill in image links and redirects for all images!');
      return;
    }
    try {
      const res = await fetch('/api/banners', {
        method: data ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formValues }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.data == 'Successfully Created') {
          setIsSuccessOpen(true);
        } else alert(data.data);
      } else {
        console.log('Error:', res.statusText);
      }
    } catch (error) {
      console.log('Error', error);
    }
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
              (img) => img.imageLink !== selectedPicture
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
    if (selectedPicture) handleDeletePicture();
  }, [selectedPicture]);

  return (
    <div className="tw-h-[100vh] tw-bg-background  tw-px-5 tw-overflow-y-auto">
      <h1 className="tw-hidden md:tw-block tw-ml-[20px] tw-font-medium tw-text-darkgrey">
        BANNER CREATION
      </h1>
      <h1 className=" md:tw-hidden tw-ml-[20px] tw-font-medium tw-text-darkgrey">
        BANNER
      </h1>

      <div className="tw-bg-darkergrey tw-rounded-md tw-shadow-md tw-hover:shadow-lg tw-duration-200 tw-mb-[30px] md:tw-mx-5 lg:tw-mx-10 tw-pt-[20px] ">
        <form className="tw-p-[10px]" onSubmit={handleSubmit}>
          <div className="tw-mb-6">
            <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
              Banner Name
            </label>
            <input
              required
              type="text"
              onChange={(e) => {
                if (data === null)
                  setFormValues({ ...formValues, bannerName: e.target.value });
              }}
              value={formValues.bannerName}
              placeholder="Enter Banner Name"
              className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[13px] md:tw-text-[15px]"
            />
          </div>

          <div className="tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center">
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
                          className="tw-relative tw-my-4 tw-flex  tw-justify-around tw-items-center tw-pb-[10px] tw-border-b tw-border-lightgrey tw-space-x-2 md:tw-space-x-0"
                          key={index}
                        >
                          <Image
                            height="50"
                            width="100"
                            src={img.imageLink}
                            alt="Image"
                            className=" md:tw-w-[150px] tw-rounded-md tw-shadow-md hover:tw-shadow-lg"
                          />
                          <div className="">
                            <label className="tw-mb-1 tw-text-[12px] md:tw-text-[15px] tw-block tw-text-bluepurple tw-font-medium">
                              Redirect Link
                            </label>
                            <input
                              placeholder="Enter the redirection Link"
                              className="tw-w-[100px] md:tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[13px] md:tw-text-[15px]"
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
                          <div
                            className="tw-cursor-pointer"
                            onClick={() => setSelectedPicture(img.imageLink)}
                          >
                            <TrashIcon className="tw-w-5 tw-wh-5 tw-text-lightgrey" />
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            <div className=" tw-w-full md:tw-w-2/3 lg:tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Attach Image
              </label>
              <div className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px] tw-flex tw-justify-center">
                <input type="file" multiple onChange={handleFileChange} />
                <button
                  className={`${uploading ? 'tw-hidden' : 'tw-block'} ${
                    files
                      ? 'tw-bg-violet tw-text-darkgrey'
                      : 'tw-bg-grey tw-text-white'
                  } tw-p-[5px] tw-rounded-md tw-px-[10px]`}
                  onClick={handleFilesSubmit}
                  type="submit"
                >
                  Upload
                </button>
                {uploading && (
                  <p className="tw-text-bluepurple">Uploading...</p>
                )}
              </div>
            </div>
          </div>
          <div className="tw-w-full tw-flex tw-justify-around tw-items-center">
            <div
              className="tw-w-1/3 tw-p-[10px] tw-bg-violet tw-rounded-md tw-flex tw-justify-center tw-cursor-pointer"
              onClick={() => setIsCancelOpen(true)}
            >
              <XMarkIcon className="tw-stroke-[2px] tw-w-5 tw-h-5" />
              <p>Cancel</p>
            </div>
            <div className="tw-w-1/3 tw-p-[10px] tw-bg-violet tw-rounded-md tw-flex tw-justify-center">
              <BookmarkIcon className="tw-w-5 tw-h-5" />
              <p>Save</p>
            </div>
          </div>
        </form>

        <Dialog
          open={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
          maxWidth="xs"
        >
          <div className="tw-bg-darkgrey tw-p-[15px]">
            <h2 className="tw-text-bluepurple">Changes made successfuly!</h2>
            <br />
            <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around ">
              <button
                onClick={() => setIsSuccessOpen(false)}
                className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
              >
                <PlusIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[16px] tw-font-medium]">Create</p>
              </button>
              <button
                onClick={() => router.push('/banners')}
                className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
              >
                <Square3Stack3DIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[16px] tw-font-medium]">Banners</p>
              </button>
            </div>
          </div>
        </Dialog>
        <Dialog
          open={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          maxWidth="xs"
        >
          <div className="tw-bg-darkgrey tw-p-[15px]">
            <h2 className="tw-text-bluepurple">
              Are you sure you want to cancel creation?
            </h2>
            <p className="tw-text-[15px] tw-text-bluepurple">
              All changes will be lost
            </p>
            <br />
            <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around ">
              <button
                onClick={() => setIsCancelOpen(false)}
                className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
              >
                <XMarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px] tw-stroke-[2px] " />
                <p className="tw-text-[16px] tw-font-medium]">Close</p>
              </button>
              <button
                onClick={() => router.push('/banners')}
                className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
              >
                <Square3Stack3DIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[16px] tw-font-medium]">Banner Page</p>
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
