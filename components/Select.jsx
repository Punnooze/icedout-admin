import React from 'react';

const Select = ({ label, options, value, onChange }) => {
  return (
    <div className="flex items-center space-x-2 outline-none w-[100%] justify-center ">
      <label>{label}</label>
      <select
        className="border rounded-md w-[75%] px-2 py-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
