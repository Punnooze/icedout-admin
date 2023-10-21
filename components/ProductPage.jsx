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

function ProductPage() {
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
    discount: null,
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
  const [imgUrls, setImgUrls] = useState([]);
  const [picture, setPicture] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState('');

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

  const handleUpload = (result) => {
    const { images } = formValues;
    images.push(result.info.secure_url);
    setFormValues({
      ...formValues,
      images,
    });
    // const newImages = [...formValues.images, result.info.secure_url];
    // setFormValues({ ...formValues, images: newImages });
    console.log('upload', formValues);
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

    // Iterate through the sizes and include only those with non-null values
    for (const size in formValues.countInStock) {
      if (formValues.countInStock[size] !== null) {
        countInStock[size] = formValues.countInStock[size];
      }
    }

    // Create a new formValues object with the filtered countInStock
    const updatedFormValues = {
      ...formValues,
      countInStock,
    };

    console.log(updatedFormValues);

    // Log the updated formValues
    try {
      const res = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: updatedFormValues }),
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
              <input
                required
                type="text"
                placeholder="Enter Category"
                onChange={(e) =>
                  setFormValues({ ...formValues, category: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              />
            </div>
          </div>
          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Drop
              </label>
              <input
                required
                type="text"
                onChange={(e) =>
                  setFormValues({ ...formValues, drop: e.target.value })
                }
                placeholder="Enter Drop"
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              />
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
            {/* <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Attached Image
              </label>
              //  <input
              //   type="file"
              //   className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
              //   tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              //   accept="image/jpeg, image/png, image/jpg"
              // /> 
              <CldUploadButton
                uploadPreset="ti9avygr"
                onUpload={handleUpload}
              />
              <div className="tw-flex">
                {imgUrls.map((img, index) => (
                  <div
                    key={index}
                    className="tw-w-[200px] tw-h-[200px] tw-mx-2"
                  >
                    <CldImage
                      width="200"
                      height="200"
                      src={img.url}
                      sizes="100vw"
                      alt={`Image ${index}`}
                    />
                    <div onClick={() => handleDelete(img.public_id)}>
                      Delete
                    </div>
                  </div>
                ))}
              </div>
              <output></output>
            </div>
          </div> */}
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                Attached Image
              </label>
              {/* <input
                type="file"
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
                accept="image/jpeg, image/png, image/jpg"
              /> */}
              <div className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px] tw-flex tw-justify-center">
                <CldUploadButton
                  uploadPreset="ti9avygr"
                  onUpload={handleUpload}
                />
              </div>
              {/* <div className="tw-flex">
                          {imgUrls.map((img, index) => (
                            <div
                              key={index}
                              className="tw-w-[200px] tw-h-[200px] tw-mx-2"
                            >
                              <CldImage
                                width="200"
                                height="200"
                                src={img.url}
                                sizes="100vw"
                                alt={`Image ${index}`}
                              />
                              <div onClick={() => handleDelete(img.public_id)}>
                                Delete
                              </div>
                            </div>
                          ))}
                        </div> */}
              <output></output>
            </div>
            {/* <div className="tw-w-1/2 tw-mb-[20px]">
                        <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                          Attached Image
                        </label>
                        <input
                          type="file"
                          className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                          tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
                          accept="image/jpeg, image/png, image/jpg"
                        />
                        <output></output>
                      </div> */}
          </div>
          {formValues.images[0] != null && (
            <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
              Images
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
                        className="tw-absolute tw-bottom-0 tw-flex tw-justify-center tw-w-[100%] tw-items-center tw-bg-lightgrey tw-py-[10px]  tw-rounded-b-md tw-cursor-pointer"
                      >
                        <TrashIcon className="tw-w-4 tw-h-4" />
                        <p>Delete</p>
                      </div>
                    )}
                    <Image
                      height="200"
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

          {/* <div className="tw-hidden tw-mb-4.5 md:tw-flex tw-space-x-4 ">
            <div className="tw-w-1/2 tw-flex tw-mb-[20px] tw-pr-2">
              <div className="tw-w-1/3 ">
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
                <div className="tw-w-2/3 ">
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
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                SEO
              </label>
              <input
                required
                type="text"
                placeholder="Enter SEO"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    seo: e.target.value,
                  })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                          tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
              />
            </div>
          </div> */}

          {/* <div className="md:tw-hidden">
            <div className="tw-mb-4.5 tw-flex tw-space-x-4">
              <div className="tw-w-1/2">
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

              <div className="tw-w-1/2 tw-mb-[20px]">
                <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                  SEO
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter SEO"
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      seo: e.target.value,
                    })
                  }
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                          tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
                />
              </div>
            </div>
            {formValues.isFeatured === true && (
              <div className="tw-mb-[20px] ">
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
          </div> */}

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
