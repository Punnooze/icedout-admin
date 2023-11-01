'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import {
  Dialog,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CldImage, CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { React, useState, useEffect } from 'react';
import axios from 'axios';

function ProductPage({ data, misc }) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    sku: null,
    name: null,
    slug: null,
    seo: null,
    category: null,
    drop: null,
    images: [''],
    price: null,
    discount: 0,
    countInStock: {
      S: null,
      M: null,
      L: null,
      XL: null,
      XXL: null,
    },
    gender: 'male',
    unavailable: false,
    description: [''],
    details: [''],
    isFeatured: false,
    featuremsg: '',
  });
  const [descriptionCount, setDescriptionCount] = useState(1);
  const [detailsCount, setDetailsCount] = useState(1);
  const [selectedcountInStock, setSelectedcountInStock] = useState('S');
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false);
  const [profits, setProfits] = useState('');

  const [selectedPicture, setSelectedPicture] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState(false);
  const [picture, setPicture] = useState(false);
  const [categs, setCategs] = useState([]);
  const [drp, setDrp] = useState([]);

  useEffect(() => {
    if (data) setFormValues(data);
  }, [data]);

  useEffect(() => {
    if (misc) {
      const categoriesElement = misc.find(
        (item) => item.miscName === 'categories'
      );
      const collectionsElement = misc.find(
        (item) => item.miscName === 'collections'
      );
      const categs = categoriesElement ? categoriesElement.miscData : [];
      setCategs(categs);

      const drp = collectionsElement ? collectionsElement.miscData : [];
      setDrp(drp);
    }
  }, [misc]);

  const handleCategoryChange = (e) => {
    setFormValues({ ...formValues, category: e.target.value });
  };

  const handleDropChange = (e) => {
    setFormValues({ ...formValues, drop: e.target.value });
  };

  useEffect(() => {
    const handleDeletePicture = async () => {
      const parts = selectedPicture.split('/');
      const publicIdWithExtension = parts[parts.length - 1];
      const publicId = publicIdWithExtension.split('.')[0];
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
            Resources.push({
              ResourceName: images[i].name,
              ResourceLink: data.secure_url,
            });
          }

          if (formValues.images[0] === '') {
            const ResourceLinks = Resources.map(
              (resource) => resource.ResourceLink
            );
            setFormValues({ ...formValues, images: ResourceLinks });
          } else {
            Resources.map((item) => {
              formValues.images.push(item.ResourceLink);
            });
          }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDescriptionChange = (index, value) => {
    const description = [...formValues.description];
    description[index] = value;
    setFormValues({ ...formValues, description });
  };

  const handleDetailsChange = (index, value) => {
    const details = [...formValues.details];
    details[index] = value;
    setFormValues({ ...formValues, details });
  };

  const handleAddDescriptionField = () => {
    const { description } = formValues;
    if (descriptionCount < 9) {
      description.push('');
      setFormValues({
        ...formValues,
        description,
      });
      setDescriptionCount(descriptionCount + 1);
    }
  };

  const handleRemoveDescriptionField = () => {
    const { description } = formValues;
    if (descriptionCount < 9) {
      description.pop('');
      setFormValues({
        ...formValues,
        description,
      });
      setDescriptionCount(descriptionCount - 1);
    }
  };

  const handleAddDetailsField = () => {
    const { details } = formValues;
    if (detailsCount < 9) {
      details.push('');
      setFormValues({
        ...formValues,
        details,
      });
      setDetailsCount(detailsCount + 1);
    }
  };

  const handleRemoveDetailsField = () => {
    const { details } = formValues;
    if (detailsCount < 9) {
      details.pop('');
      setFormValues({
        ...formValues,
        details,
      });
      setDetailsCount(detailsCount - 1);
    }
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const closeCancelConfirmation = () => {
    setIsCancelConfirmationOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const countInStock = {};
    for (const size in formValues.countInStock) {
      if (formValues.countInStock[size] !== null) {
        countInStock[size] = formValues.countInStock[size];
      }
    }
    const updatedFormValues = {
      ...formValues,
      countInStock,
    };
    if (formValues.category !== null && formValues.drop !== null) {
      try {
        const data = [formValues, profits];
        const res = await fetch('/api/product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: data }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.data == 'Successfully Created') {
            setIsDeleteConfirmationOpen(true);
          } else alert(data.data);
        } else {
          console.log('Error:', res.statusText);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else alert('Please choose Category and Drop');
  };
  const handleStockChange = (event) => {
    const selectedSize = selectedcountInStock;
    const stockValue = event.target.value;

    // Only update the selected size
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      countInStock: {
        ...prevFormValues.countInStock,
        [selectedSize]: stockValue,
      },
    }));
  };

  return (
    <div className="tw-h-[100vh] tw-bg-background   tw-ml-[70px] tw-overflow-y-auto tw-pl-5 tw-pr-5 ">
      <h1 className="tw-font-medium tw-text-darkergrey">PRODUCTS FORM</h1>
      <div className="tw-bg-darkgrey tw-rounded-md tw-shadow-md tw-hover:shadow-lg tw-duration-200 tw-mb-[30px] tw-p-[10px] ">
        <form onSubmit={handleSubmit}>
          <div className="tw-w-[100%] tw-justify-end tw-items-center tw-flex">
            <label className="tw-mr-[20px] ">
              {formValues.unavailable ? (
                <p className="tw-text-[15px] tw-text-bluepurple">
                  Product is Unavailable
                </p>
              ) : (
                <p className="tw-text-[15px] tw-text-bluepurple">
                  Product is Available
                </p>
              )}
            </label>
            <ThemeProvider theme={theme}>
              <FormControlLabel
                control={
                  <Switch
                    onClick={() => {
                      const tog = formValues.unavailable;
                      setFormValues({ ...formValues, unavailable: !tog });
                    }}
                  />
                }
              />
            </ThemeProvider>
          </div>
          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                SKU
              </label>
              <input
                required
                type="text"
                placeholder="Enter SKU"
                onChange={(e) =>
                  setFormValues({ ...formValues, sku: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              />
            </div>

            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Name
              </label>
              <input
                required
                type="text"
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
                placeholder="Enter product name"
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              />
            </div>
          </div>
          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Slug
              </label>
              <input
                required
                type="text"
                placeholder="Enter slug"
                onChange={(e) =>
                  setFormValues({ ...formValues, slug: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              />
            </div>
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Category
              </label>
              <select
                required
                value={formValues.category || ''}
                onChange={handleCategoryChange}
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categs.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Drop
              </label>
              <select
                required
                value={formValues.drop || ''}
                onChange={handleDropChange}
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              >
                <option value="" disabled>
                  Select a Drop
                </option>
                {drp.map((drops) => (
                  <option key={drops} value={drops}>
                    {drops}
                  </option>
                ))}
              </select>
            </div>
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Price
              </label>
              <input
                required
                type="number"
                placeholder="Enter Product Price"
                onChange={(e) =>
                  setFormValues({ ...formValues, price: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              />
            </div>
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Select Size
              </label>
              <select
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-text-[12px] md:tw-text-[16px]
                 tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
                onChange={(e) => setSelectedcountInStock(e.target.value)}
                value={selectedcountInStock}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            <div className="tw-w-1/2 relative z-20 bg-transparent dark:bg-form-input">
              <div>
                <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                  Stock for :{' '}
                  <span className="tw-text-violet tw-font-medium">
                    {selectedcountInStock}
                  </span>
                </label>
                <input
                  required
                  type="number"
                  value={
                    formValues.countInStock[selectedcountInStock] !== null
                      ? formValues.countInStock[selectedcountInStock]
                      : ''
                  }
                  onChange={handleStockChange}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
      tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
                />
              </div>
            </div>
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Discount
              </label>
              <input
                type="number"
                placeholder="Enter Discount (if any)"
                onChange={(e) =>
                  setFormValues({ ...formValues, discount: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              />
            </div>

            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Product Images
              </label>
              <div
                className='   className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 md:tw-px-5 tw-px-1 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[8px] md:tw-text-[12px] tw-flex tw-justify-around '
              >
                <input
                  type="file"
                  multiple
                  placeholder="Enter Discount (if any)"
                  onChange={handleFileChange}
                />
                <button
                  className={`${uploading ? 'tw-hidden' : 'tw-block'} ${
                    files
                      ? 'tw-bg-violet tw-text-darkgrey'
                      : 'tw-bg-grey tw-text-white'
                  } tw-p-[3px] tw-rounded-md tw-px-[10px]`}
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
          {formValues.images[0] !== '' && (
            <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
              Uploaded Images
            </label>
          )}
          <div className="tw-mb-4.5 tw-flex tw-space-x-4  tw-justify-around">
            {formValues.images &&
              formValues.images.map((img, index) => {
                return (
                  <div
                    className="tw-relative tw-my-4"
                    onMouseEnter={() => setPicture(true)}
                    onMouseLeave={() => setPicture(false)}
                    key={index}
                  >
                    {picture && (
                      <div
                        onClick={() => setSelectedPicture(img)}
                        className="tw-absolute tw-bottom-0 tw-flex tw-justify-center tw-w-[100%] tw-items-center tw-bg-lightgrey tw-py-[5px] md:tw-py-[10px]  tw-rounded-b-md tw-cursor-pointer"
                      >
                        <TrashIcon className="tw-w-3 tw-h-3 md:tw-w-4 md:tw-h-4" />
                        <p className="tw-text-[10px] md:tw-text-[12px] ">
                          Delete
                        </p>
                      </div>
                    )}
                    <Image
                      height="50"
                      width="100"
                      src={img}
                      alt="Image"
                      className=" tw-rounded-md tw-shadow-md hover:tw-shadow-lg"
                    />
                  </div>
                );
              })}
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                SEO
              </label>
              <input
                required
                type="text"
                placeholder="Enter SEO"
                onChange={(e) =>
                  setFormValues({ ...formValues, seo: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              />
            </div>
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Select Gender
              </label>
              <select
                required
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-text-[12px] md:tw-text-[16px] tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
                onChange={(e) =>
                  setFormValues({ ...formValues, gender: e.target.value })
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Featured?
              </label>

              <ThemeProvider theme={theme}>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                >
                  <FormControlLabel
                    checked={formValues.isFeatured === true}
                    name="isFeatured"
                    className="tw-text-lightgrey tw-text-[12px] md:tw-text-[16px]"
                    value="true"
                    control={<Radio />}
                    label="Yes"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        isFeatured: true,
                      })
                    }
                  />
                  <FormControlLabel
                    checked={formValues.isFeatured === false}
                    name="isFeatured"
                    className="tw-text-lightgrey tw-text-[12px] md:tw-text-[16px]"
                    value="false"
                    control={<Radio />}
                    label="No"
                    onChange={() =>
                      setFormValues({
                        ...formValues,
                        isFeatured: false,
                      })
                    }
                  />
                </RadioGroup>
              </ThemeProvider>
            </div>
            {formValues.isFeatured === true && (
              <div className="tw-w-1/2 ">
                <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                  Feature Message
                </label>
                <input
                  required
                  type="text"
                  name="featuremsg"
                  onChange={handleInputChange}
                  placeholder="Enter Feature Message"
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                              tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
                />
              </div>
            )}
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Description
              </label>
              {formValues.description.map((description, index) => (
                <input
                  key={index}
                  type="text"
                  value={description}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  placeholder={`Enter Description ${index + 1}`}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-mb-[10px] tw-text-[12px] md:tw-text-[16px]"
                />
              ))}
              {descriptionCount < 5 && (
                <div className="tw-flex tw-w-[100%] tw-justify-around">
                  <button
                    type="button"
                    onClick={handleAddDescriptionField}
                    className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
                  >
                    <PlusIcon className=" tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                    <p className="tw-text-[15px] tw-hidden md:tw-block">
                      Add Field
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveDescriptionField}
                    className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
                  >
                    <MinusIcon className=" tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                    <p className="tw-text-[15px] tw-hidden md:tw-block">
                      Remove Field
                    </p>
                  </button>
                </div>
              )}
            </div>

            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Details
              </label>
              {formValues.details.map((details, index) => (
                <input
                  key={index}
                  type="text"
                  value={details}
                  onChange={(e) => handleDetailsChange(index, e.target.value)}
                  placeholder={`Enter Details ${index + 1}`}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-mb-[10px] tw-text-[12px] md:tw-text-[16px]"
                />
              ))}
              {detailsCount < 5 && (
                <div className="tw-flex tw-w-[100%] tw-justify-around">
                  <button
                    type="button"
                    onClick={handleAddDetailsField}
                    className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
                  >
                    <PlusIcon className=" tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                    <p className="tw-text-[15px] tw-hidden md:tw-block">
                      Add Field
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveDetailsField}
                    className="tw-text-primary tw-hover:underline tw-flex tw-items-center"
                  >
                    <MinusIcon className=" tw-w-6 tw-h-7 md:tw-mr-[5px]" />
                    <p className="tw-text-[15px] tw-hidden md:tw-block">
                      Remove Field
                    </p>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Profits
              </label>
              <input
                type="number"
                requied
                placeholder="Enter Profit"
                onChange={(e) => setProfits(e.target.value)}
                value={profits}
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              />
            </div>
          </div>

          <br />
          <div className="tw-flex tw-justify-around ">
            <div
              onClick={() => setIsCancelConfirmationOpen(true)}
              className=" tw-flex tw-items-center  tw-justify-center tw-rounded tw-bg-bluepurple tw-p-[10px] tw-font-medium tw-text-gray tw-px-[30px]"
            >
              <XMarkIcon className="tw-h-5 tw-w-5" />
              <p className="tw-font-medium tw-text-[15px] ">Cancel</p>
            </div>
            <button
              type="submit"
              className=" tw-flex tw-items-center  tw-justify-center tw-rounded tw-bg-bluepurple tw-p-[10px] tw-font-medium tw-text-gray tw-px-[30px]"
            >
              <PlusIcon className="tw-h-5 tw-w-5" />
              <p className="tw-font-medium ">Add</p>
            </button>
          </div>
        </form>

        <Dialog
          open={isDeleteConfirmationOpen}
          onClose={closeDeleteConfirmation}
          maxWidth="xs"
        >
          <div className="tw-bg-darkgrey tw-p-[15px]">
            <h2 className="tw-text-bluepurple">Product created successfuly!</h2>
            <br />
            <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around ">
              <button
                onClick={closeDeleteConfirmation}
                className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
              >
                <PlusIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[16px] tw-font-medium]">Create</p>
              </button>
              <button
                onClick={() => router.push('/products')}
                className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
              >
                <ShoppingBagIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[16px] tw-font-medium]">Products</p>
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
            <h2 className="tw-text-violet tw-mb-[5px]">
              Are you sure you want to cancel creation of this product?
            </h2>
            <h4 className="tw-text-bluepurple tw-my-[10px] tw-text-[18px]">
              All changes will be lost
            </h4>
            <br />
            <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around ">
              <button
                onClick={closeCancelConfirmation}
                className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
              >
                <PencilIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[16px] tw-font-medium]">Continue Edit</p>
              </button>
              <button
                onClick={() => router.push('/products')}
                className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
              >
                <ShoppingBagIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                <p className="tw-text-[16px] tw-font-medium]">View Products</p>
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default ProductPage;
