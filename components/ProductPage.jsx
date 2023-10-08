"use client";
import { React, useState } from "react";

function ProductPage() {
  const [formValues, setFormValues] = useState({
    sku: "",
    name: "",
    slug: "",
    category: "",
    drop: "",
    price: "",
    size: "",
    stock: "",
    discount: "",
    details: "",
    descriptionCount: 1, 
    descriptions: [""], 
    isFeature: "NO", 
    featureMessage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDescriptionChange = (index, value) => {
    const descriptions = [...formValues.descriptions];
    descriptions[index] = value;
    setFormValues({ ...formValues, descriptions });
  };

  const handleAddDescriptionField = () => {
    const { descriptionCount, descriptions } = formValues;
    if (descriptionCount < 9) {
      descriptions.push("");
      setFormValues({
        ...formValues,
        descriptionCount: descriptionCount + 1,
        descriptions,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here with formValues
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormValues({ ...formValues, isFeature: value });
  };

  return (
    <div className="tw-h-[100vh] tw-ml-[70px] tw-overflow-y-auto tw-pl-5 tw-pr-5 ">
      <h1 className="tw-font-medium tw-text-black tw-dark:text-white">Products Form</h1>
      <div className="tw-bg-lightgrey tw-rounded-md tw-shadow-md tw-hover:shadow-lg tw-duration-200 tw-mb-[30px] ">
        <form action="#" onSubmit={handleSubmit}>
          <div className="tw-p-6.5">
            <div className="tw-mb-4.5 tw-flex tw-space-x-4">
              <div className="w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  SKU
                </label>
                <input
                  type="text"
                  placeholder="Enter SKU"
                  style={{ textTransform: "uppercase" }}
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                />
              </div>

              <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  style={{ textTransform: "uppercase" }}
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="tw-mb-4.5 tw-flex tw-space-x-4">
              <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="Enter slug"
                  style={{ textTransform: "uppercase" }}
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                />
              </div>

              <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Enter Category"
                  style={{ textTransform: "uppercase" }}
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="tw-mb-4.5 tw-flex tw-space-x-4">
              <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Drop
                </label>
                <input
                  type="text"
                  style={{ textTransform: "uppercase" }}
                  placeholder="Enter Drop"
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                />
              </div>

              <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter Product Price"
                  style={{ textTransform: "uppercase" }}
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="tw-mb-4.5 tw-flex tw-space-x-4">
              <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Select Size
                </label>
                <select className="tw-relative tw-z-20 tw-w-full tw-appearance-none tw-rounded tw-border tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary">
                  <option placeholder="Select"></option>
                  <option value="">S</option>
                  <option value="">M</option>
                  <option value="">L</option>
                  <option value="">XL</option>
                  <option value="">XXL</option>
                </select>
              </div>

              <div className="tw-w-1/2 relative z-20 bg-transparent dark:bg-form-input">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Stock
                </label>
                <input
                  type="boolean"
                  placeholder="Yes/No"
                  style={{ textTransform: "uppercase" }}
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="tw-mb-4.5 tw-flex tw-space-x-4">
              <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Discount
                </label>
                <input
                  type="number"
                  placeholder="Enter Discount (if any)"
                  style={{ textTransform: "uppercase" }}
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                />
              </div>

              <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Details
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Details"
                  style={{ textTransform: "uppercase" }}
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="tw-mb-4.5 tw-flex tw-space-x-4">
              <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Description
                </label>
                {formValues.descriptions.map((description, index) => (
                  <input
                    key={index}
                    type="text"
                    value={description}
                    style={{ textTransform: "uppercase" }}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                    placeholder={`Enter Description ${index + 1}`}
                    className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                  />
                ))}
                {formValues.descriptionCount < 5 && (
                  <button
                    type="button"
                    onClick={handleAddDescriptionField}
                    className="tw-text-primary tw-hover:underline"
                  >
                    Add Description Field
                  </button>
                )}
              </div>

              <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Attached Image
                </label>
                <input
                  type="file"
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary tw-file:mr-4 tw-file:py-2 tw-file:px-4 tw-file:rounded-full tw-file:border-0 tw-file:text-sm tw-file:font-semibold"
                  multiple="multiple"
                  accept="image/jpeg, image/png, image/jpg"
                />
                <output></output>
              </div>
            </div>

            <div classNametw-="mb-4.tw-5 tw-flex space-x-4">
            <div className="tw-w-1/2">
                <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                  Is Feature
                </label>
                <input
                  type="radio"
                  id="yes"
                  name="isFeature"
                  value="YES"
                  checked={formValues.isFeature === "YES"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="yes">YES</label><br/>
                <input
                  type="radio"
                  id="no"
                  name="isFeature"
                  value="NO"
                  checked={formValues.isFeature === "NO"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="no">NO</label>
              </div>
            

            {/* Conditionally render the Feature Message input */}
            {formValues.isFeature === "YES" && (
              <div className="w-1/2">
                <div classNtw-ame="">
                  <label className="tw-mb-2.5 tw-block tw-text-black tw-dark:text-white">
                    Feature Message
                  </label>
                  <input
                  type="text"
                  name="featureMessage"
                  value={formValues.featureMessage}
                  style={{ textTransform: "uppercase" }}
                  onChange={handleInputChange}
                  placeholder="Enter feature Message"
                  className="tw-w-full tw-rounded tw-border-[1.5px] tw-border-stroke tw-bg-transparent tw-py-3 tw-px-5 tw-font-medium tw-outline-none tw-transition tw-focus:border-primary tw-active:border-primary tw-disabled:cursor-default tw-disabled:bg-whiter tw-dark:border-form-strokedark tw-dark:bg-form-input tw-dark:focus:border-primary"
                />
                </div>
              </div>
            )}
            </div>
            <br/>
            
            <button className="tw-flex tw-w-full tw-justify-center tw-rounded tw-bg-primary tw-p-3 tw-font-medium tw-text-gray">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductPage;
