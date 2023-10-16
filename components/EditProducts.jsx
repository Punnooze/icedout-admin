import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import {
  Dialog,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { BookmarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import logo from '../public/logo.png';
import Image from 'next/image';
function EditProducts({ data }) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    sku: '',
    name: '',
    slug: '',
    seo: '',
    category: '',
    drop: '',
    images: '',
    price: '',
    discount: '',
    countInStock: {
      S: 9999,
      M: 9999,
      L: 9999,
      XL: 9999,
      XXL: 9999,
    },
    unavailable: '',
    description: [''],
    details: [''],
    isFeatured: '',
    featuremsg: '',
  });
  const [descriptionCount, setDescriptionCount] = useState(1);
  const [detailsCount, setDetailsCount] = useState(1);
  const [selectedcountInStock, setSelectedcountInStock] = useState('S');
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false);
  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = useState(false);

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

  useEffect(() => {
    if (data) setFormValues(data);
    // console.log('use Effect', formValues.unavailable);
  }, [data]);

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

  const closeSaveConfirmation = () => {
    setIsSaveConfirmationOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/productUpdate', {
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
    console.log(formValues);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch('/api/product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message === 'Successfully Deleted') {
          router.push('/products');
        }
      } else {
        console.log('Error:', res.statusText);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleStockChange = (event) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      countInStock: {
        ...prevFormValues.countInStock,
        [selectedcountInStock]: event.target.value,
      },
    }));
  };

  return (
    <div className="tw-h-[100vh] tw-p-[20px] lg:tw-p-[40px]">
      {formValues.sku != '' ? (
        <div className="tw-h-[100%] md:tw-grid  lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-[20px]  tw-rounded-md tw-p-[5px] tw-bg-darkergrey">
          <div className=" tw-hidden  tw-w-[100%] tw-h-[100%] lg:tw-flex tw-justify-center tw-items-center tw-border-r-[2px] tw-border-grey tw-p-[5px]">
            <div className="tw-p-[2px] tw-bg-grey tw-rounded-md tw-shadow-sm hover:tw-shadow-md tw-duration-200">
              {/* {data && <CardofProduct product={formValues} />} */}
              {data && <ProductCard data={formValues} edit={false} />}
            </div>
          </div>
          <div className="tw-w-[100%] tw-h-[100%] tw-shadow-none tw-overflow-y-auto tw-rounded-md lg:tw-col-span-2 xl:tw-col-span-3 ">
            <div className="tw-overflow-y-auto">
              <div className="tw-bg-darkgrey tw-rounded-md tw-shadow-md tw-hover:shadow-lg tw-duration-200 tw-mb-[30px] tw-p-[10px] ">
                <div>
                  <form>
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
                              checked={formValues.unavailable}
                              onClick={() => {
                                const tog = formValues.unavailable;
                                setFormValues({
                                  ...formValues,
                                  unavailable: !tog,
                                });
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
                          type="text"
                          value={formValues.sku}
                          // style={{ textTransform: 'uppercase' }}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              sku: e.target.value,
                            })
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
                          type="text"
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              name: e.target.value,
                            })
                          }
                          value={formValues.name}
                          // style={{ textTransform: 'uppercase' }}
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
                          type="text"
                          value={formValues.slug}
                          // style={{ textTransform: 'uppercase' }}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              slug: e.target.value,
                            })
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
                          type="text"
                          value={formValues.category}
                          // style={{ textTransform: 'uppercase' }}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              category: e.target.value,
                            })
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
                          type="text"
                          // style={{ textTransform: 'uppercase' }}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              drop: e.target.value,
                            })
                          }
                          value={formValues.drop}
                          className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                          tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
                        />
                      </div>

                      <div className="tw-w-1/2 tw-mb-[20px]">
                        <label className="tw-mb-1 tw-block tw-text-bluepurple tw-text-[13px] md:tw-text-[15px]">
                          Price
                        </label>
                        <input
                          type="number"
                          value={formValues.price}
                          // style={{ textTransform: 'uppercase' }}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              price: e.target.value,
                            })
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
                          onChange={(e) =>
                            setSelectedcountInStock(e.target.value)
                          }
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
                            type="number"
                            value={
                              formValues.countInStock[selectedcountInStock]
                            }
                            // style={{ textTransform: 'uppercase' }}
                            onChange={handleStockChange}
                            className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-text-[12px] md:tw-text-[16px]
                  tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
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
                          value={formValues.discount}
                          // style={{ textTransform: 'uppercase' }}
                          onChange={(e) =>
                            setFormValues({
                              ...formValues,
                              discount: e.target.value,
                            })
                          }
                          className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                          tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
                        />
                      </div>
                      <div className="tw-w-1/2 tw-mb-[20px]">
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
                      </div>
                    </div>

                    <div className="tw-hidden tw-mb-4.5 md:tw-flex tw-space-x-4 ">
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
                              value={formValues.featuremsg}
                              onChange={handleInputChange}
                              placeholder="Enter feature Message"
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
                          value={formValues.seo}
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

                    {/*  */}

                    {/* 















 */}

                    <div className="md:tw-hidden">
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
                            value={formValues.seo}
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
                            value={formValues.featuremsg}
                            onChange={handleInputChange}
                            placeholder="Enter feature Message"
                            className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                              tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
                          />
                        </div>
                      )}
                    </div>

                    {/* </div> */}

                    {/*  */}
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
                            // style={{ textTransform: 'uppercase' }}
                            onChange={(e) =>
                              handleDescriptionChange(index, e.target.value)
                            }
                            placeholder={`Enter Description ${index + 1}`}
                            className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-mb-[10px] tw-text-[12px] md:tw-text-[16px]"
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
                            // style={{ textTransform: 'uppercase' }}
                            onChange={(e) =>
                              handleDetailsChange(index, e.target.value)
                            }
                            placeholder={`Enter Details ${index + 1}`}
                            className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-mb-[10px] tw-text-[12px] md:tw-text-[16px]"
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
                              className="tw-text-lightgrey"
                              value="true"
                              control={<Radio />}
                              label="YES"
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
                              className="tw-text-lightgrey"
                              value="false"
                              control={<Radio />}
                              label="NO"
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
                          <label className="tw-mb-2.5 tw-block tw-text-[16px] tw-text-bluepurple">
                            Feature Message
                          </label>
                          <input
                            type="text"
                            name="featuremsg"
                            value={formValues.featuremsg}
                            // style={{ textTransform: 'uppercase' }}
                            onChange={handleInputChange}
                            placeholder="Enter feature Message"
                            className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                          tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-text-[12px] md:tw-text-[16px]"
                          />
                        </div>
                      )}
                    </div>
                    <br />
                  </form>
                  <div className="tw-flex tw-justify-around ">
                    <button
                      onClick={() => setIsCancelConfirmationOpen(true)}
                      className=" tw-flex tw-items-center  tw-justify-center tw-rounded tw-bg-bluepurple tw-p-[10px] tw-font-medium tw-text-gray 
                     md:tw-px-[30px]"
                    >
                      <XMarkIcon className="tw-h-4 tw-w-4" />
                      <p className="tw-font-medium ">Cancel</p>
                    </button>
                    <button
                      onClick={handleSubmit}
                      className=" tw-flex tw-justify-center tw-items-center tw-rounded tw-bg-bluepurple tw-p-[10px] tw-font-medium tw-text-gray md:tw-px-[30px]"
                    >
                      <BookmarkIcon className="tw-w-4 tw-h-4" />
                      <p className="tw-font-medium ">Save</p>
                    </button>
                    <button
                      onClick={() => setIsDeleteConfirmationOpen(true)}
                      className=" tw-flex tw-justify-center tw-items-center tw-rounded tw-bg-bluepurple tw-p-[10px] tw-font-medium tw-text-gray md:tw-px-[30px]"
                    >
                      <TrashIcon className="tw-w-4 tw-h-4" />
                      <p className="tw-font-medium ">Delete</p>
                    </button>
                  </div>
                </div>

                <Dialog
                  open={isSaveConfirmationOpen}
                  onClose={closeSaveConfirmation}
                  maxWidth="xs"
                >
                  <div className="tw-bg-darkgrey tw-p-[10px]">
                    <br />
                    <h2 className="tw-text-bluepurple tw-mb-[5px]">
                      Product Updated Successfully!
                    </h2>
                    <p className="tw-text-lightgrey tw-text-[15px]">
                      NAME :{' '}
                      <span className="tw-text-teal tw-text-[14px]">
                        {formValues.name}
                      </span>
                    </p>
                    <p className="tw-text-lightgrey tw-text-[15px]">
                      SKU :{' '}
                      <span className="tw-text-teal tw-text-[14px]">
                        {formValues.sku}
                      </span>
                    </p>
                    <br />
                    <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-between ">
                      <button
                        onClick={closeSaveConfirmation}
                        className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
                      >
                        <PencilIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                        <p className="tw-text-[16px] tw-font-medium]">
                          Keep Editing
                        </p>
                      </button>
                      <button
                        onClick={() => router.push('/products')}
                        className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
                      >
                        <ShoppingBagIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                        <p className="tw-text-[16px] tw-font-medium]">
                          All Products
                        </p>
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
                    <h2 className="tw-text-bluepurple tw-mb-[5px]">
                      Cancel Editing Product?
                    </h2>

                    <p className="tw-text-lightgrey tw-text-[15px]">
                      NAME :{' '}
                      <span className="tw-text-teal tw-text-[14px]">
                        {formValues.name}
                      </span>
                    </p>
                    <p className="tw-text-lightgrey tw-text-[15px]">
                      SKU :{' '}
                      <span className="tw-text-teal tw-text-[14px]">
                        {formValues.sku}
                      </span>
                    </p>
                    <h4 className="tw-text-bluepurple tw-my-[10px] tw-text-[18px]">
                      All changes will be lost
                    </h4>
                    <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-between ">
                      <button
                        onClick={closeCancelConfirmation}
                        className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px] tw-mr-[15px]"
                      >
                        <PencilIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                        <p className="tw-text-[16px] tw-font-medium]">
                          Continue Edit
                        </p>
                      </button>
                      <button
                        onClick={() => router.push('/products')}
                        className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
                      >
                        <ShoppingBagIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                        <p className="tw-text-[16px] tw-font-medium]">
                          All Products
                        </p>
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
                    <h2 className="tw-text-bluepurple tw-mb-[5px]">
                      Are you sure you want to delete this product?
                    </h2>
                    <p className="tw-text-lightgrey tw-text-[15px]">
                      NAME :{' '}
                      <span className="tw-text-teal tw-text-[14px]">
                        {formValues.name}
                      </span>
                    </p>
                    <p className="tw-text-lightgrey tw-text-[15px]">
                      SKU :{' '}
                      <span className="tw-text-teal tw-text-[14px]">
                        {formValues.sku}
                      </span>
                    </p>
                    <br />
                    <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around">
                      <button
                        onClick={closeDeleteConfirmation}
                        className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px] "
                      >
                        <XMarkIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                        <p className="tw-text-[16px] tw-font-medium]">Cancel</p>
                      </button>
                      <button
                        onClick={handleDelete}
                        className=" tw-p-[10px]   tw-rounded-md hover:tw-text-darkgrey hover:tw-bg-violet tw-duration-200 tw-flex tw-justify-center tw-items-center tw-bg-darkgrey tw-text-violet tw-border-[2px]"
                      >
                        <TrashIcon className="tw-w-5 tw-h-5 tw-mr-[5px]" />
                        <p className="tw-text-[16px] tw-font-medium]">Delete</p>
                      </button>
                    </div>
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tw-h-[100vh] tw-p-[100px] tw-flex tw-items-center tw-bg-background ">
          <Image src={logo} alt="logo" />
        </div>
      )}
    </div>
  );
}

export default EditProducts;
