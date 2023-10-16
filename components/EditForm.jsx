'use client';
import {
  Dialog,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { React, useState } from 'react';

function EditForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    sku: null,
    name: null,
    slug: null,
    category: null,
    drop: null,
    images: null,
    price: null,
    discount: null,
    countInStock: {
      S: 9999,
      M: 9999,
      L: 9999,
      XL: 9999,
      '2XL': 9999,
    },
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

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formValues }),
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
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      countInStock: {
        ...prevFormValues.countInStock,
        [selectedcountInStock]: event.target.value,
      },
    }));
  };

  return (
    <div className="tw-overflow-y-auto">
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
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                SKU
              </label>
              <input
                type="text"
                placeholder="Enter SKU"
                style={{ textTransform: 'uppercase' }}
                onChange={(e) =>
                  setFormValues({ ...formValues, sku: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
              />
            </div>

            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                Name
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
                placeholder="Enter product name"
                style={{ textTransform: 'uppercase' }}
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
              />
            </div>
          </div>
          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                Slug
              </label>
              <input
                type="text"
                placeholder="Enter slug"
                style={{ textTransform: 'uppercase' }}
                onChange={(e) =>
                  setFormValues({ ...formValues, slug: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
              />
            </div>

            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                Category
              </label>
              <input
                type="text"
                placeholder="Enter Category"
                style={{ textTransform: 'uppercase' }}
                onChange={(e) =>
                  setFormValues({ ...formValues, category: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
              />
            </div>
          </div>
          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                Drop
              </label>
              <input
                type="text"
                style={{ textTransform: 'uppercase' }}
                onChange={(e) =>
                  setFormValues({ ...formValues, drop: e.target.value })
                }
                placeholder="Enter Drop"
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
              />
            </div>

            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                Price
              </label>
              <input
                type="number"
                placeholder="Enter Product Price"
                style={{ textTransform: 'uppercase' }}
                onChange={(e) =>
                  setFormValues({ ...formValues, price: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
              />
            </div>
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                Select countInStock
              </label>
              <select
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
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
                <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                  Stock for countInStock :{' '}
                  <span className="tw-text-violet tw-font-medium">
                    {selectedcountInStock}
                  </span>
                </label>
                <input
                  type="number"
                  value={formValues.countInStock[selectedcountInStock]}
                  style={{ textTransform: 'uppercase' }}
                  onChange={handleStockChange}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                  tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
                />
              </div>
            </div>
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                Discount
              </label>
              <input
                type="number"
                placeholder="Enter Discount (if any)"
                style={{ textTransform: 'uppercase' }}
                onChange={(e) =>
                  setFormValues({ ...formValues, discount: e.target.value })
                }
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
              />
            </div>
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                Attached Image
              </label>
              <input
                type="file"
                className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
                accept="image/jpeg, image/png, image/jpg"
              />
              <output></output>
            </div>
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                Description
              </label>
              {formValues.description.map((description, index) => (
                <input
                  key={index}
                  type="text"
                  value={description}
                  style={{ textTransform: 'uppercase' }}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  placeholder={`Enter Description ${index + 1}`}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-mb-[10px]"
                />
              ))}
              {descriptionCount < 5 && (
                <button
                  type="button"
                  onClick={handleAddDescriptionField}
                  className="tw-text-primary tw-hover:underline"
                >
                  Add Description Field
                </button>
              )}
            </div>

            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
                Details
              </label>
              {formValues.details.map((details, index) => (
                <input
                  key={index}
                  type="text"
                  value={details}
                  style={{ textTransform: 'uppercase' }}
                  onChange={(e) => handleDetailsChange(index, e.target.value)}
                  placeholder={`Enter Details ${index + 1}`}
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple tw-mb-[10px]"
                />
              ))}
              {detailsCount < 5 && (
                <button
                  type="button"
                  onClick={handleAddDetailsField}
                  className="tw-text-primary tw-hover:underline"
                >
                  Add Another Detail
                </button>
              )}
            </div>
          </div>

          <div className="tw-mb-4.5 tw-flex tw-space-x-4">
            <div className="tw-w-1/2 tw-mb-[20px]">
              <label className="tw-mb-1 tw-text-[15px] tw-block tw-text-bluepurple">
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
                  style={{ textTransform: 'uppercase' }}
                  onChange={handleInputChange}
                  placeholder="Enter feature Message"
                  className="tw-w-full tw-rounded tw-border tw-border-lightgrey tw-bg-darkergrey tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-duration-200 tw-text-lightgrey
                tw-shadow-md hover:tw-shadow-lg focus:tw-border-bluepurple"
                />
              </div>
            )}
          </div>
          <br />

          <button className=" tw-flex tw-w-full tw-justify-center tw-rounded tw-bg-bluepurple tw-p-3 tw-font-medium tw-text-gray">
            Add Product
          </button>
        </form>
        <Dialog
          open={isDeleteConfirmationOpen}
          onClose={closeDeleteConfirmation}
          maxWidth="xs"
        >
          <div className="tw-bg-darkgrey tw-p-[15px]">
            <br />
            <h2 className="tw-text-bluepurple">Product Created Successfuly</h2>
            <br />
            <div className="tw-w-[100%] tw-mt-[15px] tw-flex tw-justify-around ">
              <button
                onClick={closeDeleteConfirmation}
                className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
              >
                Create Product
              </button>
              <button
                onClick={() => router.push('/products')}
                className="tw-border-2 tw-border-violet tw-text-violet hover:tw-text-darkgrey tw-rounded-md hover:tw-bg-violet tw-p-[5px] "
              >
                View Products
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default EditForm;
