import React from 'react';

const Select = ({ label, options, value, onChange }) => {
  return (
    <div className="tw-flex tw-items-center tw-space-x-2 tw-outline-none tw-w-[100%] tw-justify-center ">
      <label>{label}</label>
      <select
        className="tw-border tw-rounded-md tw-w-[75%] tw-px-2 tw-py-1"
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
