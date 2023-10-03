import React from 'react';

const Select = ({ label, options, value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label>{label}:</label>
      <select
        className="border rounded-md px-2 py-1"
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
