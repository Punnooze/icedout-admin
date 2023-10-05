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
    <div className="h-[100vh] w-[100vw] overflow-y-auto pl-5 pr-5 ">
      <h1 className="font-medium text-black dark:text-white">Products Form</h1>
      <div className="bg-lightgrey rounded-md shadow-md hover:shadow-lg duration-200 mb-[30px] ">
        <form action="#" onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex space-x-4">
              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  SKU
                </label>
                <input
                  type="text"
                  placeholder="Enter SKU"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4.5 flex space-x-4">
              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="Enter slug"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Enter Category"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4.5 flex space-x-4">
              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Drop
                </label>
                <input
                  type="text"
                  placeholder="Enter Drop"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter Product Price"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex space-x-4">
              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Size
                </label>
                <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                  <option placeholder="Select"></option>
                  <option value="">S</option>
                  <option value="">M</option>
                  <option value="">L</option>
                  <option value="">XL</option>
                  <option value="">XXL</option>
                </select>
              </div>

              <div className="w-1/2 relative z-20 bg-transparent dark:bg-form-input">
                <label className="mb-2.5 block text-black dark:text-white">
                  Stock
                </label>
                <input
                  type="boolean"
                  placeholder="Yes/No"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex space-x-4">
              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Discount
                </label>
                <input
                  type="number"
                  placeholder="Enter Discount (if any)"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Details
                </label>
                <input
                  type="text"
                  placeholder="Enter Product Details"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex space-x-4">
              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                {formValues.descriptions.map((description, index) => (
                  <input
                    key={index}
                    type="text"
                    value={description}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                    placeholder={`Enter Description ${index + 1}`}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                ))}
                {formValues.descriptionCount < 5 && (
                  <button
                    type="button"
                    onClick={handleAddDescriptionField}
                    className="text-primary hover:underline"
                  >
                    Add Description Field
                  </button>
                )}
              </div>

              <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Attached Image
                </label>
                <input
                  type="file"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
                  multiple="multiple"
                  accept="image/jpeg, image/png, image/jpg"
                />
                <output></output>
              </div>
            </div>

            <div className="mb-4.5 flex space-x-4">
            <div className="w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
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
                <div className="">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Feature Message
                  </label>
                  <input
                  type="text"
                  name="featureMessage"
                  value={formValues.featureMessage}
                  onChange={handleInputChange}
                  placeholder="Enter feature Message"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                </div>
              </div>
            )}
            </div>
            <br/>
            
            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductPage;
