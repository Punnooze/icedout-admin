import React from 'react';
import Select from './Select';
import SelectInput from '@mui/material/Select/SelectInput';

function ProductPage() {
  return (
    <div className="h-[100vh] w-[100vw]">
      <form>
        <input type="text" placeholder="sku" />
        <input type="text" placeholder="name" />
        <input type="text" placeholder="slug" />
        <input type="text" placeholder="category" />
        <input type="text" placeholder="drop" />
        {/* images */}
        <input type="number" placeholder="price" />
        <input type="number" placeholder="discount" />
        {/* check, input for each size */}
        <label>count in stock</label>
        <SelectInput 
        placeholder='select'/>
        <input type="boolean" placeholder="unavailable" />
        <input type="text" placeholder="description" />
        <input type="text" placeholder="details" />
        <input type="text" placeholder="isFeatured" />
        <input type="text" placeholder="feature message" />
      </form>
    </div>
  );
}

export default ProductPage;
